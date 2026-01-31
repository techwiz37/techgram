export type Tuple<T, N extends number> = N extends N ? number extends N ? T[] : TupleOf<T, N, []> : never;
export type TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N ? R : TupleOf<T, N, [T, ...R]>;
export declare function tee<T, N extends number = 2>(iterable: AsyncIterable<T>, n?: N): Tuple<AsyncIterable<T>, N>;
//# sourceMappingURL=tee.d.ts.map