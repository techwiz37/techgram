// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { abortable } from "./abortable.js";
export async function deadline(p, ms, options = {}) {
    const signals = [AbortSignal.timeout(ms)];
    if (options.signal)
        signals.push(options.signal);
    return await abortable(p, AbortSignal.any(signals));
}
