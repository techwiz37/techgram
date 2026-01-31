"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFileUrl = toFileUrl;
const to_file_url_js_1 = require("../_common/to_file_url.js");
const is_absolute_js_1 = require("./is_absolute.js");
function toFileUrl(path) {
    if (!(0, is_absolute_js_1.isAbsolute)(path)) {
        throw new TypeError(`Path must be absolute: received "${path}"`);
    }
    const url = new URL("file:///");
    url.pathname = (0, to_file_url_js_1.encodeWhitespace)(path.replace(/%/g, "%25").replace(/\\/g, "%5C"));
    return url;
}
