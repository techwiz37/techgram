export declare class MuxAsyncIterator<T> implements AsyncIterable<T> {
    #private;
    add(iterable: AsyncIterable<T>): void;
    iterate(): AsyncIterableIterator<T>;
    [Symbol.asyncIterator](): AsyncIterator<T>;
}
//# sourceMappingURL=mux_async_iterator.d.ts.map