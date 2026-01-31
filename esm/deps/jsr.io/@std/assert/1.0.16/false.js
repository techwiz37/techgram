// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { AssertionError } from "./assertion_error.js";
export function assertFalse(expr, msg = "") {
    if (expr) {
        throw new AssertionError(msg);
    }
}
