"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFileUrl = toFileUrl;
const os_js_1 = require("../../internal/1.0.12/os.js");
const to_file_url_js_1 = require("./posix/to_file_url.js");
const to_file_url_js_2 = require("./windows/to_file_url.js");
function toFileUrl(path) {
    return os_js_1.isWindows ? (0, to_file_url_js_2.toFileUrl)(path) : (0, to_file_url_js_1.toFileUrl)(path);
}
