"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.extname = extname;
const os_js_1 = require("../../internal/1.0.12/os.js");
const extname_js_1 = require("./posix/extname.js");
const extname_js_2 = require("./windows/extname.js");
function extname(path) {
    return os_js_1.isWindows ? (0, extname_js_2.extname)(path) : (0, extname_js_1.extname)(path);
}
