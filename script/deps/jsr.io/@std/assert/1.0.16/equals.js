"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertEquals = assertEquals;
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
const equal_js_1 = require("./equal.js");
const build_message_js_1 = require("../../internal/1.0.12/build_message.js");
const diff_js_1 = require("../../internal/1.0.12/diff.js");
const diff_str_js_1 = require("../../internal/1.0.12/diff_str.js");
const format_js_1 = require("../../internal/1.0.12/format.js");
const assertion_error_js_1 = require("./assertion_error.js");
function assertEquals(actual, expected, msg) {
    if ((0, equal_js_1.equal)(actual, expected)) {
        return;
    }
    const msgSuffix = msg ? `: ${msg}` : ".";
    let message = `Values are not equal${msgSuffix}`;
    const actualString = (0, format_js_1.format)(actual);
    const expectedString = (0, format_js_1.format)(expected);
    const stringDiff = (typeof actual === "string") &&
        (typeof expected === "string");
    const diffResult = stringDiff
        ? (0, diff_str_js_1.diffStr)(actual, expected)
        : (0, diff_js_1.diff)(actualString.split("\n"), expectedString.split("\n"));
    const diffMsg = (0, build_message_js_1.buildMessage)(diffResult, { stringDiff }, arguments[3])
        .join("\n");
    message = `${message}\n${diffMsg}`;
    throw new assertion_error_js_1.AssertionError(message);
}
