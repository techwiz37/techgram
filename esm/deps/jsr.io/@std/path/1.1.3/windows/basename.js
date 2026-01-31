// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { assertArgs, lastPathSegment, stripSuffix, } from "../_common/basename.js";
import { CHAR_COLON } from "../_common/constants.js";
import { stripTrailingSeparators } from "../_common/strip_trailing_separators.js";
import { isPathSeparator, isWindowsDeviceRoot } from "./_util.js";
import { fromFileUrl } from "./from_file_url.js";
export function basename(path, suffix = "") {
    if (path instanceof URL) {
        path = fromFileUrl(path);
    }
    assertArgs(path, suffix);
    let start = 0;
    if (path.length >= 2) {
        const drive = path.charCodeAt(0);
        if (isWindowsDeviceRoot(drive)) {
            if (path.charCodeAt(1) === CHAR_COLON)
                start = 2;
        }
    }
    const lastSegment = lastPathSegment(path, isPathSeparator, start);
    const strippedSegment = stripTrailingSeparators(lastSegment, isPathSeparator);
    return suffix ? stripSuffix(strippedSegment, suffix) : strippedSegment;
}
