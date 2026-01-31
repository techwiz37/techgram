import type { MaybePromise } from "../1_utilities.js";
export interface ConnectionCallback {
    read(count: number): void;
    write(count: number): void;
}
export interface Connection {
    get connected(): boolean;
    stateChangeHandler?: (connected: boolean) => void;
    open(): MaybePromise<void>;
    write(p: Uint8Array): MaybePromise<void>;
    close(): MaybePromise<void>;
    callback?: ConnectionCallback;
    read(p: Uint8Array): MaybePromise<void>;
}
//# sourceMappingURL=0_connection.d.ts.map