import type { GetManyFilter, Storage, StorageKeyPart } from "./0_storage.js";
export declare class StorageLocalStorage implements Storage {
    #private;
    constructor(path: string);
    get prefix(): string;
    branch(id: string): Storage;
    initialize(): void;
    get supportsFiles(): boolean;
    get mustSerialize(): boolean;
    get isMemory(): boolean;
    get<T>(key_: readonly StorageKeyPart[]): T | null;
    getMany<T>(filter: GetManyFilter, params?: {
        limit?: number;
        reverse?: boolean;
    }): Generator<[readonly StorageKeyPart[], T]>;
    set(key_: readonly StorageKeyPart[], value: unknown): void;
    incr(key: readonly StorageKeyPart[], by: number): void;
}
//# sourceMappingURL=2_storage_local_storage.node.d.ts.map