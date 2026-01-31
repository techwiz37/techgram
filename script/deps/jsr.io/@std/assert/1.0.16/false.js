"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertFalse = assertFalse;
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
const assertion_error_js_1 = require("./assertion_error.js");
function assertFalse(expr, msg = "") {
    if (expr) {
        throw new assertion_error_js_1.AssertionError(msg);
    }
}
