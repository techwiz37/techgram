// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { isWindows } from "../../internal/1.0.12/os.js";
import { basename as posixBasename } from "./posix/basename.js";
import { basename as windowsBasename } from "./windows/basename.js";
export function basename(path, suffix = "") {
    return isWindows
        ? windowsBasename(path, suffix)
        : posixBasename(path, suffix);
}
