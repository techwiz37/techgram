"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.join = join;
const assert_path_js_1 = require("../_common/assert_path.js");
const from_file_url_js_1 = require("./from_file_url.js");
const normalize_js_1 = require("./normalize.js");
function join(path, ...paths) {
    if (path === undefined)
        return ".";
    if (path instanceof URL) {
        path = (0, from_file_url_js_1.fromFileUrl)(path);
    }
    paths = path ? [path, ...paths] : paths;
    paths.forEach((path) => (0, assert_path_js_1.assertPath)(path));
    const joined = paths.filter((path) => path.length > 0).join("/");
    return joined === "" ? "." : (0, normalize_js_1.normalize)(joined);
}
