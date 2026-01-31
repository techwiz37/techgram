// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { concat } from "../../bytes/1.0.6/concat.js";
export async function toArrayBuffer(readableStream) {
    const reader = readableStream.getReader();
    const chunks = [];
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        chunks.push(value);
    }
    return concat(chunks).buffer;
}
