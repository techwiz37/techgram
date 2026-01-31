export declare class RetryError extends Error {
    constructor(cause: unknown, attempts: number);
}
export interface RetryOptions {
    multiplier?: number;
    maxTimeout?: number;
    maxAttempts?: number;
    minTimeout?: number;
    jitter?: number;
}
export declare function retry<T>(fn: (() => Promise<T>) | (() => T), options?: RetryOptions): Promise<T>;
//# sourceMappingURL=retry.d.ts.map