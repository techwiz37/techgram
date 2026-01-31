export type DiffType = DiffResult<unknown>["type"];
export type DiffResult<T> = ChangedDiffResult<T> | CommonDiffResult<T>;
export type CommonDiffResult<T> = {
    type: "common" | "truncation";
    value: T;
};
export type ChangedDiffResult<T> = {
    type: "removed" | "added";
    value: T;
    details?: DiffResult<T>[];
};
//# sourceMappingURL=types.d.ts.map