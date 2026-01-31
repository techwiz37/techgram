"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize = normalize;
const normalize_js_1 = require("../_common/normalize.js");
const constants_js_1 = require("../_common/constants.js");
const normalize_string_js_1 = require("../_common/normalize_string.js");
const _util_js_1 = require("./_util.js");
const from_file_url_js_1 = require("./from_file_url.js");
function normalize(path) {
    if (path instanceof URL) {
        path = (0, from_file_url_js_1.fromFileUrl)(path);
    }
    (0, normalize_js_1.assertArg)(path);
    const len = path.length;
    let rootEnd = 0;
    let device;
    let isAbsolute = false;
    const code = path.charCodeAt(0);
    if (len > 1) {
        if ((0, _util_js_1.isPathSeparator)(code)) {
            isAbsolute = true;
            if ((0, _util_js_1.isPathSeparator)(path.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for (; j < len; ++j) {
                    if ((0, _util_js_1.isPathSeparator)(path.charCodeAt(j)))
                        break;
                }
                if (j < len && j !== last) {
                    const firstPart = path.slice(last, j);
                    last = j;
                    for (; j < len; ++j) {
                        if (!(0, _util_js_1.isPathSeparator)(path.charCodeAt(j)))
                            break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for (; j < len; ++j) {
                            if ((0, _util_js_1.isPathSeparator)(path.charCodeAt(j)))
                                break;
                        }
                        if (j === len) {
                            return `\\\\${firstPart}\\${path.slice(last)}\\`;
                        }
                        else if (j !== last) {
                            device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                            rootEnd = j;
                        }
                    }
                }
            }
            else {
                rootEnd = 1;
            }
        }
        else if ((0, _util_js_1.isWindowsDeviceRoot)(code)) {
            if (path.charCodeAt(1) === constants_js_1.CHAR_COLON) {
                device = path.slice(0, 2);
                rootEnd = 2;
                if (len > 2) {
                    if ((0, _util_js_1.isPathSeparator)(path.charCodeAt(2))) {
                        isAbsolute = true;
                        rootEnd = 3;
                    }
                }
            }
        }
    }
    else if ((0, _util_js_1.isPathSeparator)(code)) {
        return "\\";
    }
    let tail;
    if (rootEnd < len) {
        tail = (0, normalize_string_js_1.normalizeString)(path.slice(rootEnd), !isAbsolute, "\\", _util_js_1.isPathSeparator);
    }
    else {
        tail = "";
    }
    if (tail.length === 0 && !isAbsolute)
        tail = ".";
    if (tail.length > 0 && (0, _util_js_1.isPathSeparator)(path.charCodeAt(len - 1))) {
        tail += "\\";
    }
    if (device === undefined) {
        if (isAbsolute) {
            if (tail.length > 0)
                return `\\${tail}`;
            else
                return "\\";
        }
        return tail;
    }
    else if (isAbsolute) {
        if (tail.length > 0)
            return `${device}\\${tail}`;
        else
            return `${device}\\`;
    }
    return device + tail;
}
