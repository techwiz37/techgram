// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
// deno-lint-ignore no-explicit-any
export function debounce(fn, wait) {
    let timeout = null;
    let flush = null;
    const debounced = ((...args) => {
        debounced.clear();
        flush = () => {
            debounced.clear();
            fn.call(debounced, ...args);
        };
        timeout = Number(setTimeout(flush, wait));
    });
    debounced.clear = () => {
        if (typeof timeout === "number") {
            clearTimeout(timeout);
            timeout = null;
            flush = null;
        }
    };
    debounced.flush = () => {
        flush?.();
    };
    Object.defineProperty(debounced, "pending", {
        get: () => typeof timeout === "number",
    });
    return debounced;
}
