export interface DebouncedFunction<T extends Array<unknown>> {
    (...args: T): void;
    clear(): void;
    flush(): void;
    readonly pending: boolean;
}
export declare function debounce<T extends Array<any>>(fn: (this: DebouncedFunction<T>, ...args: T) => void, wait: number): DebouncedFunction<T>;
//# sourceMappingURL=debounce.d.ts.map