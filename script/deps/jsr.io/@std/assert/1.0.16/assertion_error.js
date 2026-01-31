"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssertionError = void 0;
class AssertionError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = "AssertionError";
    }
}
exports.AssertionError = AssertionError;
