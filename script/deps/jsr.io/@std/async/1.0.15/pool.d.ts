export declare function pooledMap<T, R>(poolLimit: number, array: Iterable<T> | AsyncIterable<T>, iteratorFn: (data: T) => Promise<R>): AsyncIterableIterator<R>;
//# sourceMappingURL=pool.d.ts.map