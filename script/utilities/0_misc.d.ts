export declare function drop(maybePromise: unknown): void;
export declare function mustPrompt(message: string): string;
export declare function mustPromptNumber(message: string): number;
export declare function mustPromptOneOf<T extends readonly string[]>(message: string, choices: T): T[number];
export declare const ZERO_CHANNEL_ID = -1000000000000;
export declare function toUnixTimestamp(date: Date): number;
export declare function fromUnixTimestamp(date: number): Date;
export declare function iterateReadableStream(stream: ReadableStream): AsyncGenerator<any, void, unknown>;
export declare function awaitablePooledMap<T, R>(poolLimit: number, array: Iterable<T> | AsyncIterable<T>, iteratorFn: (data: T) => Promise<R>): Promise<R[]>;
//# sourceMappingURL=0_misc.d.ts.map