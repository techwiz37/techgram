"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryError = void 0;
exports.retry = retry;
const _util_js_1 = require("./_util.js");
class RetryError extends Error {
    constructor(cause, attempts) {
        super(`Retrying exceeded the maxAttempts (${attempts}).`);
        this.name = "RetryError";
        this.cause = cause;
    }
}
exports.RetryError = RetryError;
async function retry(fn, options) {
    const { multiplier = 2, maxTimeout = 60000, maxAttempts = 5, minTimeout = 1000, jitter = 1, } = options ?? {};
    if (maxTimeout <= 0) {
        throw new TypeError(`Cannot retry as 'maxTimeout' must be positive: current value is ${maxTimeout}`);
    }
    if (minTimeout > maxTimeout) {
        throw new TypeError(`Cannot retry as 'minTimeout' must be <= 'maxTimeout': current values 'minTimeout=${minTimeout}', 'maxTimeout=${maxTimeout}'`);
    }
    if (jitter > 1) {
        throw new TypeError(`Cannot retry as 'jitter' must be <= 1: current value is ${jitter}`);
    }
    let attempt = 0;
    while (true) {
        try {
            return await fn();
        }
        catch (error) {
            if (attempt + 1 >= maxAttempts) {
                throw new RetryError(error, maxAttempts);
            }
            const timeout = (0, _util_js_1.exponentialBackoffWithJitter)(maxTimeout, minTimeout, attempt, multiplier, jitter);
            await new Promise((r) => setTimeout(r, timeout));
        }
        attempt++;
    }
}
