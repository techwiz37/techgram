"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.join = join;
const os_js_1 = require("../../internal/1.0.12/os.js");
const join_js_1 = require("./posix/join.js");
const join_js_2 = require("./windows/join.js");
function join(path, ...paths) {
    return os_js_1.isWindows ? (0, join_js_2.join)(path, ...paths) : (0, join_js_1.join)(path, ...paths);
}
