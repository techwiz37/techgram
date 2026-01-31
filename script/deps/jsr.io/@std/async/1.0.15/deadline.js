"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.deadline = deadline;
const abortable_js_1 = require("./abortable.js");
async function deadline(p, ms, options = {}) {
    const signals = [AbortSignal.timeout(ms)];
    if (options.signal)
        signals.push(options.signal);
    return await (0, abortable_js_1.abortable)(p, AbortSignal.any(signals));
}
