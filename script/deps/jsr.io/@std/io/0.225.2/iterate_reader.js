"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterateReader = iterateReader;
exports.iterateReaderSync = iterateReaderSync;
const _constants_js_1 = require("./_constants.js");
async function* iterateReader(reader, options) {
    const bufSize = options?.bufSize ?? _constants_js_1.DEFAULT_BUFFER_SIZE;
    const b = new Uint8Array(bufSize);
    while (true) {
        const result = await reader.read(b);
        if (result === null) {
            break;
        }
        yield b.slice(0, result);
    }
}
function* iterateReaderSync(reader, options) {
    const bufSize = options?.bufSize ?? _constants_js_1.DEFAULT_BUFFER_SIZE;
    const b = new Uint8Array(bufSize);
    while (true) {
        const result = reader.readSync(b);
        if (result === null) {
            break;
        }
        yield b.slice(0, result);
    }
}
