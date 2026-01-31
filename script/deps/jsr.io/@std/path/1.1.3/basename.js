"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.basename = basename;
const os_js_1 = require("../../internal/1.0.12/os.js");
const basename_js_1 = require("./posix/basename.js");
const basename_js_2 = require("./windows/basename.js");
function basename(path, suffix = "") {
    return os_js_1.isWindows
        ? (0, basename_js_2.basename)(path, suffix)
        : (0, basename_js_1.basename)(path, suffix);
}
