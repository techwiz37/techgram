"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.unescape = unescape;
exports.tokenize = tokenize;
exports.createDetails = createDetails;
exports.diffStr = diffStr;
const diff_js_1 = require("./diff.js");
function unescape(string) {
    return string
        .replaceAll("\\", "\\\\")
        .replaceAll("\b", "\\b")
        .replaceAll("\f", "\\f")
        .replaceAll("\t", "\\t")
        .replaceAll("\v", "\\v")
        .replaceAll(/\r\n|\r|\n/g, (str) => str === "\r" ? "\\r" : str === "\n" ? "\\n\n" : "\\r\\n\r\n");
}
const WHITESPACE_SYMBOLS = /((?:\\[bftv]|[^\S\r\n])+|\\[rn\\]|[()[\]{}'"\r\n]|\b)/;
function tokenize(string, wordDiff = false) {
    if (wordDiff) {
        return string
            .split(WHITESPACE_SYMBOLS)
            .filter((token) => token);
    }
    const tokens = [];
    const lines = string.split(/(\n|\r\n)/).filter((line) => line);
    for (const [i, line] of lines.entries()) {
        if (i % 2) {
            tokens[tokens.length - 1] += line;
        }
        else {
            tokens.push(line);
        }
    }
    return tokens;
}
function createDetails(line, tokens) {
    return tokens.filter(({ type }) => type === line.type || type === "common")
        .map((result, i, t) => {
        const token = t[i - 1];
        if ((result.type === "common") && token &&
            (token.type === t[i + 1]?.type) && /\s+/.test(result.value)) {
            return {
                ...result,
                type: token.type,
            };
        }
        return result;
    });
}
const NON_WHITESPACE_REGEXP = /\S/;
function diffStr(A, B) {
    const diffResult = (0, diff_js_1.diff)(tokenize(`${unescape(A)}\n`), tokenize(`${unescape(B)}\n`));
    const added = [];
    const removed = [];
    for (const result of diffResult) {
        if (result.type === "added") {
            added.push(result);
        }
        if (result.type === "removed") {
            removed.push(result);
        }
    }
    const hasMoreRemovedLines = added.length < removed.length;
    const aLines = hasMoreRemovedLines ? added : removed;
    const bLines = hasMoreRemovedLines ? removed : added;
    for (const a of aLines) {
        let tokens = [];
        let b;
        while (bLines.length) {
            b = bLines.shift();
            const tokenized = [
                tokenize(a.value, true),
                tokenize(b.value, true),
            ];
            if (hasMoreRemovedLines)
                tokenized.reverse();
            tokens = (0, diff_js_1.diff)(tokenized[0], tokenized[1]);
            if (tokens.some(({ type, value }) => type === "common" && NON_WHITESPACE_REGEXP.test(value))) {
                break;
            }
        }
        a.details = createDetails(a, tokens);
        if (b) {
            b.details = createDetails(b, tokens);
        }
    }
    return diffResult;
}
