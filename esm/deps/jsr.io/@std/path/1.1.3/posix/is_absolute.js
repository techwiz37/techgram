// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { assertPath } from "../_common/assert_path.js";
import { isPosixPathSeparator } from "./_util.js";
export function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && isPosixPathSeparator(path.charCodeAt(0));
}
