"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.join = join;
const assert_path_js_1 = require("../_common/assert_path.js");
const _util_js_1 = require("./_util.js");
const normalize_js_1 = require("./normalize.js");
const from_file_url_js_1 = require("./from_file_url.js");
function join(path, ...paths) {
    if (path instanceof URL) {
        path = (0, from_file_url_js_1.fromFileUrl)(path);
    }
    paths = path ? [path, ...paths] : paths;
    paths.forEach((path) => (0, assert_path_js_1.assertPath)(path));
    paths = paths.filter((path) => path.length > 0);
    if (paths.length === 0)
        return ".";
    let needsReplace = true;
    let slashCount = 0;
    const firstPart = paths[0];
    if ((0, _util_js_1.isPathSeparator)(firstPart.charCodeAt(0))) {
        ++slashCount;
        const firstLen = firstPart.length;
        if (firstLen > 1) {
            if ((0, _util_js_1.isPathSeparator)(firstPart.charCodeAt(1))) {
                ++slashCount;
                if (firstLen > 2) {
                    if ((0, _util_js_1.isPathSeparator)(firstPart.charCodeAt(2)))
                        ++slashCount;
                    else {
                        needsReplace = false;
                    }
                }
            }
        }
    }
    let joined = paths.join("\\");
    if (needsReplace) {
        for (; slashCount < joined.length; ++slashCount) {
            if (!(0, _util_js_1.isPathSeparator)(joined.charCodeAt(slashCount)))
                break;
        }
        if (slashCount >= 2)
            joined = `\\${joined.slice(slashCount)}`;
    }
    return (0, normalize_js_1.normalize)(joined);
}
