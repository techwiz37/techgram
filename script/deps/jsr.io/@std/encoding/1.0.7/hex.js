"use strict";
// Copyright 2009 The Go Authors. All rights reserved.
// https://github.com/golang/go/blob/master/LICENSE
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeHex = encodeHex;
exports.decodeHex = decodeHex;
const _validate_binary_like_js_1 = require("./_validate_binary_like.js");
const hexTable = new TextEncoder().encode("0123456789abcdef");
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
function errInvalidByte(byte) {
    return new TypeError(`Invalid byte '${String.fromCharCode(byte)}'`);
}
function errLength(len) {
    return new RangeError(`Cannot decode the hex string as the input length should be even: length is ${len}`);
}
function fromHexChar(byte) {
    if (48 <= byte && byte <= 57)
        return byte - 48;
    if (97 <= byte && byte <= 102)
        return byte - 97 + 10;
    if (65 <= byte && byte <= 70)
        return byte - 65 + 10;
    throw errInvalidByte(byte);
}
function encodeHex(src) {
    const u8 = (0, _validate_binary_like_js_1.validateBinaryLike)(src);
    const dst = new Uint8Array(u8.length * 2);
    for (let i = 0; i < u8.length; i++) {
        const v = u8[i];
        dst[i * 2] = hexTable[v >> 4];
        dst[i * 2 + 1] = hexTable[v & 0x0f];
    }
    return textDecoder.decode(dst);
}
function decodeHex(src) {
    const u8 = textEncoder.encode(src);
    const dst = new Uint8Array(u8.length / 2);
    for (let i = 0; i < dst.length; i++) {
        const a = fromHexChar(u8[i * 2]);
        const b = fromHexChar(u8[i * 2 + 1]);
        dst[i] = (a << 4) | b;
    }
    if (u8.length % 2 === 1) {
        fromHexChar(u8[dst.length * 2]);
        throw errLength(u8.length);
    }
    return dst;
}
