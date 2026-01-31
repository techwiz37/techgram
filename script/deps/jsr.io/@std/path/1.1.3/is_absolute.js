"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAbsolute = isAbsolute;
const os_js_1 = require("../../internal/1.0.12/os.js");
const is_absolute_js_1 = require("./posix/is_absolute.js");
const is_absolute_js_2 = require("./windows/is_absolute.js");
function isAbsolute(path) {
    return os_js_1.isWindows ? (0, is_absolute_js_2.isAbsolute)(path) : (0, is_absolute_js_1.isAbsolute)(path);
}
