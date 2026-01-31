// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
export function abortable(p, signal) {
    if (p instanceof Promise) {
        return abortablePromise(p, signal);
    }
    else {
        return abortableAsyncIterable(p, signal);
    }
}
function abortablePromise(p, signal) {
    const { promise, reject } = Promise.withResolvers();
    const abort = () => reject(signal.reason);
    if (signal.aborted)
        abort();
    signal.addEventListener("abort", abort, { once: true });
    return Promise.race([promise, p]).finally(() => {
        signal.removeEventListener("abort", abort);
    });
}
async function* abortableAsyncIterable(p, signal) {
    signal.throwIfAborted();
    const { promise, reject } = Promise.withResolvers();
    const abort = () => reject(signal.reason);
    signal.addEventListener("abort", abort, { once: true });
    const it = p[Symbol.asyncIterator]();
    try {
        while (true) {
            const race = Promise.race([promise, it.next()]);
            race.catch(() => {
                signal.removeEventListener("abort", abort);
            });
            const { done, value } = await race;
            if (done) {
                signal.removeEventListener("abort", abort);
                const result = await it.return?.(value);
                return result?.value;
            }
            yield value;
        }
    }
    catch (e) {
        await it.return?.();
        throw e;
    }
}
