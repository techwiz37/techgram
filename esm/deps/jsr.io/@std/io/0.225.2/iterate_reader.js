// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { DEFAULT_BUFFER_SIZE } from "./_constants.js";
export async function* iterateReader(reader, options) {
    const bufSize = options?.bufSize ?? DEFAULT_BUFFER_SIZE;
    const b = new Uint8Array(bufSize);
    while (true) {
        const result = await reader.read(b);
        if (result === null) {
            break;
        }
        yield b.slice(0, result);
    }
}
export function* iterateReaderSync(reader, options) {
    const bufSize = options?.bufSize ?? DEFAULT_BUFFER_SIZE;
    const b = new Uint8Array(bufSize);
    while (true) {
        const result = reader.readSync(b);
        if (result === null) {
            break;
        }
        yield b.slice(0, result);
    }
}
