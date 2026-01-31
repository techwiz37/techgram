// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
export class AssertionError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = "AssertionError";
    }
}
