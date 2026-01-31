import type { MaybePromise } from "../1_utilities.js";
import type { GetManyFilter, Storage, StorageKeyPart } from "./0_storage.js";
export declare class StorageMemory implements Storage {
    #private;
    protected map: Map<string, unknown>;
    constructor();
    get mustSerialize(): boolean;
    initialize(): void;
    branch(id: string): Storage;
    get supportsFiles(): boolean;
    get isMemory(): boolean;
    get<T>(key: readonly StorageKeyPart[]): T | null;
    getMany<T>(filter: GetManyFilter, params?: {
        limit?: number;
        reverse?: boolean;
    }): Generator<[readonly StorageKeyPart[], T]>;
    set(key_: readonly StorageKeyPart[], value: unknown): MaybePromise<void>;
    incr(key: readonly StorageKeyPart[], by: number): void;
}
//# sourceMappingURL=2_storage_memory.d.ts.map