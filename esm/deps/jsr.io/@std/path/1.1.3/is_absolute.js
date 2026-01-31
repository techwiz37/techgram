// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { isWindows } from "../../internal/1.0.12/os.js";
import { isAbsolute as posixIsAbsolute } from "./posix/is_absolute.js";
import { isAbsolute as windowsIsAbsolute } from "./windows/is_absolute.js";
export function isAbsolute(path) {
    return isWindows ? windowsIsAbsolute(path) : posixIsAbsolute(path);
}
