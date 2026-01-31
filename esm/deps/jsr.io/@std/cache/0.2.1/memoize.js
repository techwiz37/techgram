// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { _serializeArgList } from "./_serialize_arg_list.js";
export function memoize(fn, options) {
    const cache = options?.cache ?? new Map();
    const getKey = options?.getKey ??
        _serializeArgList(cache);
    const errorIsCacheable = options?.errorIsCacheable ?? (() => false);
    const memoized = function (...args) {
        const key = getKey.apply(this, args);
        if (cache.has(key)) {
            const result = cache.get(key);
            switch (result.kind) {
                case "ok":
                case "promise":
                    return result.value;
                case "error":
                    throw result.error;
            }
        }
        try {
            let value = fn.apply(this, args);
            if (value instanceof Promise) {
                value = value.catch((reason) => {
                    if (!errorIsCacheable(reason)) {
                        cache.delete(key);
                    }
                    throw reason;
                });
                cache.set(key, { kind: "promise", value });
            }
            else {
                cache.set(key, { kind: "ok", value });
            }
            return value;
        }
        catch (e) {
            if (errorIsCacheable(e)) {
                cache.set(key, { kind: "error", error: e });
            }
            throw e;
        }
    };
    return Object.defineProperties(memoized, {
        length: { value: fn.length },
        name: { value: fn.name },
    });
}
