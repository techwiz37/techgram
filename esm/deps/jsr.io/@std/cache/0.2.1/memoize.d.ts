export type MemoizationCache<K, V> = {
    has: (key: K) => boolean;
    get: (key: K) => V | undefined;
    set: (key: K, val: V) => unknown;
    delete: (key: K) => unknown;
};
export type MemoizationCacheResult<T> = {
    kind: "ok";
    value: T;
} | {
    kind: "error";
    error: unknown;
} | (T extends Promise<unknown> ? {
    kind: "promise";
    value: T;
} : never);
export type MemoizeOptions<Fn extends (...args: never[]) => unknown, Key, Cache extends MemoizationCache<Key, MemoizationCacheResult<ReturnType<Fn>>>> = {
    cache?: Cache;
    getKey?: (this: ThisParameterType<Fn>, ...args: Parameters<Fn>) => Key;
    errorIsCacheable?: (err: unknown) => boolean;
};
export declare function memoize<Fn extends (...args: never[]) => unknown, Key = string, Cache extends MemoizationCache<Key, MemoizationCacheResult<ReturnType<Fn>>> = Map<Key, MemoizationCacheResult<ReturnType<Fn>>>>(fn: Fn, options?: MemoizeOptions<Fn, Key, Cache>): Fn;
//# sourceMappingURL=memoize.d.ts.map