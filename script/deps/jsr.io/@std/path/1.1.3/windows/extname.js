"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.extname = extname;
const constants_js_1 = require("../_common/constants.js");
const assert_path_js_1 = require("../_common/assert_path.js");
const _util_js_1 = require("./_util.js");
const from_file_url_js_1 = require("./from_file_url.js");
function extname(path) {
    if (path instanceof URL) {
        path = (0, from_file_url_js_1.fromFileUrl)(path);
    }
    (0, assert_path_js_1.assertPath)(path);
    let start = 0;
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    if (path.length >= 2 &&
        path.charCodeAt(1) === constants_js_1.CHAR_COLON &&
        (0, _util_js_1.isWindowsDeviceRoot)(path.charCodeAt(0))) {
        start = startPart = 2;
    }
    for (let i = path.length - 1; i >= start; --i) {
        const code = path.charCodeAt(i);
        if ((0, _util_js_1.isPathSeparator)(code)) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === constants_js_1.CHAR_DOT) {
            if (startDot === -1)
                startDot = i;
            else if (preDotState !== 1)
                preDotState = 1;
        }
        else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 ||
        end === -1 ||
        preDotState === 0 ||
        (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)) {
        return "";
    }
    return path.slice(startDot, end);
}
