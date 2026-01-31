"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.pooledMap = pooledMap;
const ERROR_WHILE_MAPPING_MESSAGE = "Cannot complete the mapping as an error was thrown from an item";
function pooledMap(poolLimit, array, iteratorFn) {
    const res = new TransformStream({
        async transform(p, controller) {
            try {
                const s = await p;
                controller.enqueue(s);
            }
            catch (e) {
                if (e instanceof AggregateError &&
                    e.message === ERROR_WHILE_MAPPING_MESSAGE) {
                    controller.error(e);
                }
            }
        },
    });
    (async () => {
        const writer = res.writable.getWriter();
        const executing = [];
        try {
            for await (const item of array) {
                const p = Promise.resolve().then(() => iteratorFn(item));
                writer.write(p);
                const e = p.then(() => executing.splice(executing.indexOf(e), 1));
                executing.push(e);
                if (executing.length >= poolLimit) {
                    await Promise.race(executing);
                }
            }
            await Promise.all(executing);
            writer.close();
        }
        catch {
            const errors = [];
            for (const result of await Promise.allSettled(executing)) {
                if (result.status === "rejected") {
                    errors.push(result.reason);
                }
            }
            writer.write(Promise.reject(new AggregateError(errors, ERROR_WHILE_MAPPING_MESSAGE))).catch(() => { });
        }
    })();
    return Symbol.asyncIterator in res.readable &&
        typeof res.readable[Symbol.asyncIterator] === "function"
        ? res.readable[Symbol.asyncIterator]()
        : (async function* () {
            const reader = res.readable.getReader();
            while (true) {
                const { done, value } = await reader.read();
                if (done)
                    break;
                yield value;
            }
            reader.releaseLock();
        })();
}
