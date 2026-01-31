// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
export function delay(ms, options = {}) {
    const { signal, persistent = true } = options;
    if (signal?.aborted)
        return Promise.reject(signal.reason);
    return new Promise((resolve, reject) => {
        const abort = () => {
            clearTimeout(+i);
            reject(signal?.reason);
        };
        const done = () => {
            signal?.removeEventListener("abort", abort);
            resolve();
        };
        const i = setArbitraryLengthTimeout(done, ms);
        signal?.addEventListener("abort", abort, { once: true });
        if (persistent === false) {
            try {
                Deno.unrefTimer(+i);
            }
            catch (error) {
                if (!(error instanceof ReferenceError)) {
                    clearTimeout(+i);
                    throw error;
                }
                console.error("`persistent` option is only available in Deno");
            }
        }
    });
}
const I32_MAX = 2 ** 31 - 1;
function setArbitraryLengthTimeout(callback, delay) {
    let currentDelay = delay = Math.trunc(Math.max(delay, 0) || 0);
    const start = Date.now();
    let timeoutId;
    const queueTimeout = () => {
        currentDelay = delay - (Date.now() - start);
        timeoutId = currentDelay > I32_MAX
            ? Number(setTimeout(queueTimeout, I32_MAX))
            : Number(setTimeout(callback, currentDelay));
    };
    queueTimeout();
    return { valueOf: () => timeoutId };
}
