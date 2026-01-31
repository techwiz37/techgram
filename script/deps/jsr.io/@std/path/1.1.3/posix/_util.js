"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPosixPathSeparator = isPosixPathSeparator;
const constants_js_1 = require("../_common/constants.js");
function isPosixPathSeparator(code) {
    return code === constants_js_1.CHAR_FORWARD_SLASH;
}
