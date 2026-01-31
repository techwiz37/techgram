export interface DeadlineOptions {
    signal?: AbortSignal;
}
export declare function deadline<T>(p: Promise<T>, ms: number, options?: DeadlineOptions): Promise<T>;
//# sourceMappingURL=deadline.d.ts.map