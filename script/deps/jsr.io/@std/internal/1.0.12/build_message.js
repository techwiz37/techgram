"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createColor = createColor;
exports.createSign = createSign;
exports.buildMessage = buildMessage;
const styles_js_1 = require("./styles.js");
function createColor(diffType, 
background = false) {
    switch (diffType) {
        case "added":
            return (s) => background ? (0, styles_js_1.bgGreen)((0, styles_js_1.white)(s)) : (0, styles_js_1.green)((0, styles_js_1.bold)(s));
        case "removed":
            return (s) => background ? (0, styles_js_1.bgRed)((0, styles_js_1.white)(s)) : (0, styles_js_1.red)((0, styles_js_1.bold)(s));
        case "truncation":
            return styles_js_1.gray;
        default:
            return styles_js_1.white;
    }
}
function createSign(diffType) {
    switch (diffType) {
        case "added":
            return "+   ";
        case "removed":
            return "-   ";
        default:
            return "    ";
    }
}
function buildMessage(diffResult, options = {}, truncateDiff) {
    if (truncateDiff != null) {
        diffResult = truncateDiff(diffResult, options.stringDiff ?? false);
    }
    const { stringDiff = false } = options;
    const messages = [
        "",
        "",
        `    ${(0, styles_js_1.gray)((0, styles_js_1.bold)("[Diff]"))} ${(0, styles_js_1.red)((0, styles_js_1.bold)("Actual"))} / ${(0, styles_js_1.green)((0, styles_js_1.bold)("Expected"))}`,
        "",
        "",
    ];
    const diffMessages = diffResult.map((result) => {
        const color = createColor(result.type);
        const line = result.type === "added" || result.type === "removed"
            ? result.details?.map((detail) => detail.type !== "common"
                ? createColor(detail.type, true)(detail.value)
                : detail.value).join("") ?? result.value
            : result.value;
        return color(`${createSign(result.type)}${line}`);
    });
    messages.push(...(stringDiff ? [diffMessages.join("")] : diffMessages), "");
    return messages;
}
