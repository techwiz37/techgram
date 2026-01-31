"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromFileUrl = fromFileUrl;
const from_file_url_js_1 = require("../_common/from_file_url.js");
function fromFileUrl(url) {
    url = (0, from_file_url_js_1.assertArg)(url);
    return decodeURIComponent(url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
