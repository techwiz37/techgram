import type { MemoizationCache } from "./memoize.js";
export type { MemoizationCache };
export declare class LruCache<K, V> extends Map<K, V> implements MemoizationCache<K, V> {
    #private;
    maxSize: number;
    constructor(maxSize: number, options?: {
        onEject: (ejectedKey: K, ejectedValue: V) => void;
    });
    has(key: K): boolean;
    get(key: K): V | undefined;
    set(key: K, value: V): this;
    delete(key: K): boolean;
}
//# sourceMappingURL=lru_cache.d.ts.map