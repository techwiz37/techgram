"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize = normalize;
const normalize_js_1 = require("../_common/normalize.js");
const normalize_string_js_1 = require("../_common/normalize_string.js");
const _util_js_1 = require("./_util.js");
const from_file_url_js_1 = require("./from_file_url.js");
function normalize(path) {
    if (path instanceof URL) {
        path = (0, from_file_url_js_1.fromFileUrl)(path);
    }
    (0, normalize_js_1.assertArg)(path);
    const isAbsolute = (0, _util_js_1.isPosixPathSeparator)(path.charCodeAt(0));
    const trailingSeparator = (0, _util_js_1.isPosixPathSeparator)(path.charCodeAt(path.length - 1));
    path = (0, normalize_string_js_1.normalizeString)(path, !isAbsolute, "/", _util_js_1.isPosixPathSeparator);
    if (path.length === 0 && !isAbsolute)
        path = ".";
    if (path.length > 0 && trailingSeparator)
        path += "/";
    if (isAbsolute)
        return `/${path}`;
    return path;
}
