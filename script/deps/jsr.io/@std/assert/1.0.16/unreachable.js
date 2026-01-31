"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unreachable = unreachable;
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
const assertion_error_js_1 = require("./assertion_error.js");
function unreachable(msg) {
    const msgSuffix = msg ? `: ${msg}` : ".";
    throw new assertion_error_js_1.AssertionError(`Unreachable${msgSuffix}`);
}
