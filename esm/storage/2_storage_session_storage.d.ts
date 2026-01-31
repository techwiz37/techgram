import type { MaybePromise } from "../1_utilities.js";
import type { GetManyFilter, Storage, StorageKeyPart } from "./0_storage.js";
export declare class StorageSessionStorage implements Storage {
    #private;
    constructor(prefix: string);
    get mustSerialize(): boolean;
    get prefix(): string;
    branch(id: string): StorageSessionStorage;
    initialize(): void;
    get supportsFiles(): boolean;
    get isMemory(): boolean;
    get<T>(key_: readonly StorageKeyPart[]): T | null;
    getMany<T>(filter: GetManyFilter, params?: {
        limit?: number;
        reverse?: boolean;
    }): Generator<[readonly StorageKeyPart[], T]>;
    set(key_: readonly StorageKeyPart[], value: unknown): MaybePromise<void>;
    incr(key: readonly StorageKeyPart[], by: number): void;
}
//# sourceMappingURL=2_storage_session_storage.d.ts.map