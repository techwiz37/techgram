import type { GetManyFilter, Storage, StorageKeyPart } from "./0_storage.js";
export interface StorageIndexedDBParams {
    storeFiles?: boolean;
}
export declare class StorageIndexedDB implements Storage {
    #private;
    database: IDBDatabase | null;
    constructor(name: string, params?: StorageIndexedDBParams);
    get name(): string;
    branch(id: string): StorageIndexedDB;
    initialize(): Promise<void>;
    get supportsFiles(): boolean;
    get mustSerialize(): boolean;
    get isMemory(): boolean;
    set(k: readonly StorageKeyPart[], v: unknown, tx_?: IDBTransaction): Promise<void>;
    get<T>(k: readonly StorageKeyPart[], tx_?: IDBTransaction | null, fix?: boolean): Promise<T | null>;
    getMany<T>(filter: GetManyFilter, params?: {
        limit?: number;
        reverse?: boolean;
    }, tx_?: IDBTransaction): AsyncGenerator<[readonly StorageKeyPart[], T]>;
    incr(key: readonly StorageKeyPart[], by: number): Promise<void>;
}
//# sourceMappingURL=2_storage_indexed_db.d.ts.map