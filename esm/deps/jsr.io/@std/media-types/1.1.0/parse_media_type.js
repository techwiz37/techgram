// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
import { consumeMediaParam, decode2331Encoding } from "./_util.js";
const SEMICOLON_REGEXP = /^\s*;\s*$/;
export function parseMediaType(type) {
    const [base] = type.split(";");
    const mediaType = base.toLowerCase().trim();
    const params = {};
    const continuation = new Map();
    type = type.slice(base.length);
    while (type.length) {
        type = type.trimStart();
        if (type.length === 0) {
            break;
        }
        const [key, value, rest] = consumeMediaParam(type);
        if (!key) {
            if (SEMICOLON_REGEXP.test(rest)) {
                break;
            }
            throw new TypeError(`Cannot parse media type: invalid parameter "${type}"`);
        }
        let pmap = params;
        const [baseName, rest2] = key.split("*");
        if (baseName && rest2 !== undefined) {
            if (!continuation.has(baseName)) {
                continuation.set(baseName, {});
            }
            pmap = continuation.get(baseName);
        }
        if (key in pmap) {
            throw new TypeError("Cannot parse media type: duplicate key");
        }
        pmap[key] = value;
        type = rest;
    }
    let str = "";
    for (const [key, pieceMap] of continuation) {
        const singlePartKey = `${key}*`;
        const type = pieceMap[singlePartKey];
        if (type) {
            const decv = decode2331Encoding(type);
            if (decv) {
                params[key] = decv;
            }
            continue;
        }
        str = "";
        let valid = false;
        for (let n = 0;; n++) {
            const simplePart = `${key}*${n}`;
            let type = pieceMap[simplePart];
            if (type) {
                valid = true;
                str += type;
                continue;
            }
            const encodedPart = `${simplePart}*`;
            type = pieceMap[encodedPart];
            if (!type) {
                break;
            }
            valid = true;
            if (n === 0) {
                const decv = decode2331Encoding(type);
                if (decv) {
                    str += decv;
                }
            }
            else {
                const decv = decodeURI(type);
                str += decv;
            }
        }
        if (valid) {
            params[key] = str;
        }
    }
    return [mediaType, Object.keys(params).length ? params : undefined];
}
