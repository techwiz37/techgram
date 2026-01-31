// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { equal } from "./equal.js";
import { buildMessage } from "../../internal/1.0.12/build_message.js";
import { diff } from "../../internal/1.0.12/diff.js";
import { diffStr } from "../../internal/1.0.12/diff_str.js";
import { format } from "../../internal/1.0.12/format.js";
import { AssertionError } from "./assertion_error.js";
export function assertEquals(actual, expected, msg) {
    if (equal(actual, expected)) {
        return;
    }
    const msgSuffix = msg ? `: ${msg}` : ".";
    let message = `Values are not equal${msgSuffix}`;
    const actualString = format(actual);
    const expectedString = format(expected);
    const stringDiff = (typeof actual === "string") &&
        (typeof expected === "string");
    const diffResult = stringDiff
        ? diffStr(actual, expected)
        : diff(actualString.split("\n"), expectedString.split("\n"));
    const diffMsg = buildMessage(diffResult, { stringDiff }, arguments[3])
        .join("\n");
    message = `${message}\n${diffMsg}`;
    throw new AssertionError(message);
}
