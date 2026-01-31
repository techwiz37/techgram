// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { isWindows } from "../../internal/1.0.12/os.js";
import { join as posixJoin } from "./posix/join.js";
import { join as windowsJoin } from "./windows/join.js";
export function join(path, ...paths) {
    return isWindows ? windowsJoin(path, ...paths) : posixJoin(path, ...paths);
}
