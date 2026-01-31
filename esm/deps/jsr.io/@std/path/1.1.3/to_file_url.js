// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { isWindows } from "../../internal/1.0.12/os.js";
import { toFileUrl as posixToFileUrl } from "./posix/to_file_url.js";
import { toFileUrl as windowsToFileUrl } from "./windows/to_file_url.js";
export function toFileUrl(path) {
    return isWindows ? windowsToFileUrl(path) : posixToFileUrl(path);
}
