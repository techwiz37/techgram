// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { assertArg } from "../_common/normalize.js";
import { CHAR_COLON } from "../_common/constants.js";
import { normalizeString } from "../_common/normalize_string.js";
import { isPathSeparator, isWindowsDeviceRoot } from "./_util.js";
import { fromFileUrl } from "./from_file_url.js";
export function normalize(path) {
    if (path instanceof URL) {
        path = fromFileUrl(path);
    }
    assertArg(path);
    const len = path.length;
    let rootEnd = 0;
    let device;
    let isAbsolute = false;
    const code = path.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator(code)) {
            isAbsolute = true;
            if (isPathSeparator(path.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for (; j < len; ++j) {
                    if (isPathSeparator(path.charCodeAt(j)))
                        break;
                }
                if (j < len && j !== last) {
                    const firstPart = path.slice(last, j);
                    last = j;
                    for (; j < len; ++j) {
                        if (!isPathSeparator(path.charCodeAt(j)))
                            break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for (; j < len; ++j) {
                            if (isPathSeparator(path.charCodeAt(j)))
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
        else if (isWindowsDeviceRoot(code)) {
            if (path.charCodeAt(1) === CHAR_COLON) {
                device = path.slice(0, 2);
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator(path.charCodeAt(2))) {
                        isAbsolute = true;
                        rootEnd = 3;
                    }
                }
            }
        }
    }
    else if (isPathSeparator(code)) {
        return "\\";
    }
    let tail;
    if (rootEnd < len) {
        tail = normalizeString(path.slice(rootEnd), !isAbsolute, "\\", isPathSeparator);
    }
    else {
        tail = "";
    }
    if (tail.length === 0 && !isAbsolute)
        tail = ".";
    if (tail.length > 0 && isPathSeparator(path.charCodeAt(len - 1))) {
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
