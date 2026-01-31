// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { AssertionError } from "./assertion_error.js";
export function unreachable(msg) {
    const msgSuffix = msg ? `: ${msg}` : ".";
    throw new AssertionError(`Unreachable${msgSuffix}`);
}
