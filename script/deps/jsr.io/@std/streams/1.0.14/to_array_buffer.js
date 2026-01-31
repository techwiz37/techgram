"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArrayBuffer = toArrayBuffer;
const concat_js_1 = require("../../bytes/1.0.6/concat.js");
async function toArrayBuffer(readableStream) {
    const reader = readableStream.getReader();
    const chunks = [];
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        chunks.push(value);
    }
    return (0, concat_js_1.concat)(chunks).buffer;
}
