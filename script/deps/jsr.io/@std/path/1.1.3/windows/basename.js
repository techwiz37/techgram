"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.basename = basename;
const basename_js_1 = require("../_common/basename.js");
const constants_js_1 = require("../_common/constants.js");
const strip_trailing_separators_js_1 = require("../_common/strip_trailing_separators.js");
const _util_js_1 = require("./_util.js");
const from_file_url_js_1 = require("./from_file_url.js");
function basename(path, suffix = "") {
    if (path instanceof URL) {
        path = (0, from_file_url_js_1.fromFileUrl)(path);
    }
    (0, basename_js_1.assertArgs)(path, suffix);
    let start = 0;
    if (path.length >= 2) {
        const drive = path.charCodeAt(0);
        if ((0, _util_js_1.isWindowsDeviceRoot)(drive)) {
            if (path.charCodeAt(1) === constants_js_1.CHAR_COLON)
                start = 2;
        }
    }
    const lastSegment = (0, basename_js_1.lastPathSegment)(path, _util_js_1.isPathSeparator, start);
    const strippedSegment = (0, strip_trailing_separators_js_1.stripTrailingSeparators)(lastSegment, _util_js_1.isPathSeparator);
    return suffix ? (0, basename_js_1.stripSuffix)(strippedSegment, suffix) : strippedSegment;
}
