// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { assertArgs, lastPathSegment, stripSuffix, } from "../_common/basename.js";
import { fromFileUrl } from "./from_file_url.js";
import { stripTrailingSeparators } from "../_common/strip_trailing_separators.js";
import { isPosixPathSeparator } from "./_util.js";
export function basename(path, suffix = "") {
    if (path instanceof URL) {
        path = fromFileUrl(path);
    }
    assertArgs(path, suffix);
    const lastSegment = lastPathSegment(path, isPosixPathSeparator);
    const strippedSegment = stripTrailingSeparators(lastSegment, isPosixPathSeparator);
    return suffix ? stripSuffix(strippedSegment, suffix) : strippedSegment;
}
