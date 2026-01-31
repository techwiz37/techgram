// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { bgGreen, bgRed, bold, gray, green, red, white } from "./styles.js";
export function createColor(diffType, 
background = false) {
    switch (diffType) {
        case "added":
            return (s) => background ? bgGreen(white(s)) : green(bold(s));
        case "removed":
            return (s) => background ? bgRed(white(s)) : red(bold(s));
        case "truncation":
            return gray;
        default:
            return white;
    }
}
export function createSign(diffType) {
    switch (diffType) {
        case "added":
            return "+   ";
        case "removed":
            return "-   ";
        default:
            return "    ";
    }
}
export function buildMessage(diffResult, options = {}, truncateDiff) {
    if (truncateDiff != null) {
        diffResult = truncateDiff(diffResult, options.stringDiff ?? false);
    }
    const { stringDiff = false } = options;
    const messages = [
        "",
        "",
        `    ${gray(bold("[Diff]"))} ${red(bold("Actual"))} / ${green(bold("Expected"))}`,
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
