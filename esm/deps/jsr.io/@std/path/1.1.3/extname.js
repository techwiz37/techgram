// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { isWindows } from "../../internal/1.0.12/os.js";
import { extname as posixExtname } from "./posix/extname.js";
import { extname as windowsExtname } from "./windows/extname.js";
export function extname(path) {
    return isWindows ? windowsExtname(path) : posixExtname(path);
}
