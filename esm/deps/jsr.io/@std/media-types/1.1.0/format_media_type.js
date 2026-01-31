// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
import { isIterator, isToken, needsEncoding } from "./_util.js";
export function formatMediaType(type, param) {
    let serializedMediaType = "";
    const [major = "", sub] = type.split("/");
    if (!sub) {
        if (!isToken(type)) {
            return "";
        }
        serializedMediaType += type.toLowerCase();
    }
    else {
        if (!isToken(major) || !isToken(sub)) {
            return "";
        }
        serializedMediaType += `${major.toLowerCase()}/${sub.toLowerCase()}`;
    }
    if (param) {
        param = isIterator(param) ? Object.fromEntries(param) : param;
        const attrs = Object.keys(param);
        attrs.sort();
        for (const attribute of attrs) {
            if (!isToken(attribute)) {
                return "";
            }
            const value = param[attribute];
            serializedMediaType += `; ${attribute.toLowerCase()}`;
            const needEnc = needsEncoding(value);
            if (needEnc) {
                serializedMediaType += "*";
            }
            serializedMediaType += "=";
            if (needEnc) {
                serializedMediaType += `utf-8''${encodeURIComponent(value)}`;
                continue;
            }
            if (isToken(value)) {
                serializedMediaType += value;
                continue;
            }
            serializedMediaType += `"${value.replace(/["\\]/gi, (m) => `\\${m}`)}"`;
        }
    }
    return serializedMediaType;
}
