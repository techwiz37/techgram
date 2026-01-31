// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
// A module to print ANSI terminal colors. Inspired by chalk, kleur, and colors
// on npm.
// This code is vendored from `fmt/colors.ts`.
// deno-lint-ignore no-explicit-any
import * as dntShim from "../../../../../_dnt.shims.js";
const { Deno } = dntShim.dntGlobalThis;
const noColor = typeof Deno?.noColor === "boolean"
    ? Deno.noColor
    : false;
const enabled = !noColor;
function code(open, close) {
    return {
        open: `\x1b[${open.join(";")}m`,
        close: `\x1b[${close}m`,
        regexp: new RegExp(`\\x1b\\[${close}m`, "g"),
    };
}
function run(str, code) {
    return enabled
        ? `${code.open}${str.replace(code.regexp, code.open)}${code.close}`
        : str;
}
export function bold(str) {
    return run(str, code([1], 22));
}
export function red(str) {
    return run(str, code([31], 39));
}
export function green(str) {
    return run(str, code([32], 39));
}
export function yellow(str) {
    return run(str, code([33], 39));
}
export function white(str) {
    return run(str, code([37], 39));
}
export function gray(str) {
    return brightBlack(str);
}
export function brightBlack(str) {
    return run(str, code([90], 39));
}
export function bgRed(str) {
    return run(str, code([41], 49));
}
export function bgGreen(str) {
    return run(str, code([42], 49));
}
// https://github.com/chalk/ansi-regex/blob/02fa893d619d3da85411acc8fd4e2eea0e95a9d9/index.js
const ANSI_PATTERN = new RegExp([
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TXZcf-nq-uy=><~]))",
].join("|"), "g");
export function stripAnsiCode(string) {
    return string.replace(ANSI_PATTERN, "");
}
