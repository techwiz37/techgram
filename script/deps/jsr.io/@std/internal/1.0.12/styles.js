"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
// A module to print ANSI terminal colors. Inspired by chalk, kleur, and colors
// on npm.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.bold = bold;
exports.red = red;
exports.green = green;
exports.yellow = yellow;
exports.white = white;
exports.gray = gray;
exports.brightBlack = brightBlack;
exports.bgRed = bgRed;
exports.bgGreen = bgGreen;
exports.stripAnsiCode = stripAnsiCode;
// This code is vendored from `fmt/colors.ts`.
// deno-lint-ignore no-explicit-any
const dntShim = __importStar(require("../../../../../_dnt.shims.js"));
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
function bold(str) {
    return run(str, code([1], 22));
}
function red(str) {
    return run(str, code([31], 39));
}
function green(str) {
    return run(str, code([32], 39));
}
function yellow(str) {
    return run(str, code([33], 39));
}
function white(str) {
    return run(str, code([37], 39));
}
function gray(str) {
    return brightBlack(str);
}
function brightBlack(str) {
    return run(str, code([90], 39));
}
function bgRed(str) {
    return run(str, code([41], 49));
}
function bgGreen(str) {
    return run(str, code([42], 49));
}
// https://github.com/chalk/ansi-regex/blob/02fa893d619d3da85411acc8fd4e2eea0e95a9d9/index.js
const ANSI_PATTERN = new RegExp([
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TXZcf-nq-uy=><~]))",
].join("|"), "g");
function stripAnsiCode(string) {
    return string.replace(ANSI_PATTERN, "");
}
