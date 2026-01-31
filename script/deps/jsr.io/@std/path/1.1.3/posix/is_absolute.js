"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAbsolute = isAbsolute;
const assert_path_js_1 = require("../_common/assert_path.js");
const _util_js_1 = require("./_util.js");
function isAbsolute(path) {
    (0, assert_path_js_1.assertPath)(path);
    return path.length > 0 && (0, _util_js_1.isPosixPathSeparator)(path.charCodeAt(0));
}
