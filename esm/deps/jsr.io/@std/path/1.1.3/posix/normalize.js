// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { assertArg } from "../_common/normalize.js";
import { normalizeString } from "../_common/normalize_string.js";
import { isPosixPathSeparator } from "./_util.js";
import { fromFileUrl } from "./from_file_url.js";
export function normalize(path) {
    if (path instanceof URL) {
        path = fromFileUrl(path);
    }
    assertArg(path);
    const isAbsolute = isPosixPathSeparator(path.charCodeAt(0));
    const trailingSeparator = isPosixPathSeparator(path.charCodeAt(path.length - 1));
    path = normalizeString(path, !isAbsolute, "/", isPosixPathSeparator);
    if (path.length === 0 && !isAbsolute)
        path = ".";
    if (path.length > 0 && trailingSeparator)
        path += "/";
    if (isAbsolute)
        return `/${path}`;
    return path;
}
