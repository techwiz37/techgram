"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageIndexedDB = void 0;
const _1_utilities_js_1 = require("./1_utilities.js");
const VERSION = 1;
const KV_OBJECT_STORE = "kv";
class StorageIndexedDB {
    database = null;
    #name;
    #id = null;
    #supportsFiles;
    constructor(name, params) {
        if (typeof indexedDB === "undefined") {
            throw new Error("Unavailable in current environment");
        }
        this.#name = name;
        this.#supportsFiles = params?.storeFiles ?? true;
    }
    get name() {
        return this.#name;
    }
    branch(id) {
        const storage = new StorageIndexedDB(this.name, { storeFiles: this.#supportsFiles });
        storage.#id = id;
        return storage;
    }
    initialize() {
        const db = indexedDB.open(this.name, VERSION);
        return new Promise((res, rej) => {
            db.onblocked = rej;
            db.onerror = rej;
            db.onupgradeneeded = () => {
                db.result.createObjectStore(KV_OBJECT_STORE);
            };
            db.onsuccess = () => {
                this.database = db.result;
                res();
            };
        });
    }
    get supportsFiles() {
        return this.#supportsFiles;
    }
    get mustSerialize() {
        return true;
    }
    get isMemory() {
        return false;
    }
    #fixKey(key) {
        if (this.#id !== null) {
            return ["__S" + this.#id, ...key];
        }
        else {
            return key;
        }
    }
    set(k, v, tx_) {
        k = this.#fixKey(k);
        if (!this.database) {
            throw new Error("Not initialized");
        }
        const store = (tx_ ?? this.database
            .transaction(KV_OBJECT_STORE, "readwrite"))
            .objectStore(KV_OBJECT_STORE);
        let tx;
        if (v === null) {
            tx = store.delete((0, _1_utilities_js_1.fixKey)(k));
        }
        else {
            tx = store.put(v, (0, _1_utilities_js_1.fixKey)(k));
        }
        return new Promise((res, rej) => {
            tx.onerror = rej;
            tx.onsuccess = () => {
                res();
            };
        });
    }
    get(k, tx_, fix = true) {
        if (fix) {
            k = this.#fixKey(k);
        }
        if (!this.database) {
            throw new Error("Not initialized");
        }
        const tx = (tx_ ?? this.database
            .transaction(KV_OBJECT_STORE, "readonly"))
            .objectStore(KV_OBJECT_STORE)
            .get((0, _1_utilities_js_1.fixKey)(k));
        return new Promise((res, rej) => {
            tx.onerror = rej;
            tx.onsuccess = () => {
                res(tx.result === undefined ? null : tx.result);
            };
        });
    }
    async *getMany(filter, params, tx_) {
        if ("prefix" in filter && this.#id !== null) {
            filter.prefix = this.#fixKey(filter.prefix);
        }
        if ("start" in filter && this.#id !== null) {
            filter.start = this.#fixKey(filter.start);
        }
        if ("end" in filter && this.#id !== null) {
            filter.end = this.#fixKey(filter.end);
        }
        if (!this.database) {
            throw new Error("Not initialized");
        }
        if (params?.limit !== undefined && params.limit <= 0) {
            params.limit = 1;
        }
        let keyRange;
        if ("prefix" in filter) {
            keyRange = (0, _1_utilities_js_1.getPrefixKeyRange)((0, _1_utilities_js_1.fixKey)(filter.prefix));
        }
        else {
            keyRange = IDBKeyRange.bound((0, _1_utilities_js_1.fixKey)(filter.start), (0, _1_utilities_js_1.fixKey)(filter.end), true, true);
        }
        const keys = await new Promise((res, rej) => {
            const items = new Array();
            const tx = (tx_ ?? this.database.transaction(KV_OBJECT_STORE, "readonly"))
                .objectStore(KV_OBJECT_STORE)
                .openKeyCursor(keyRange, params?.reverse ? "prev" : undefined);
            tx.onerror = rej;
            tx.onsuccess = () => {
                const cursor = tx.result;
                if (!cursor) {
                    res(items);
                    return;
                }
                items.push((0, _1_utilities_js_1.restoreKey)(cursor.key));
                if (params?.limit !== undefined && items.length >= params.limit) {
                    res(items);
                }
                else {
                    cursor.continue();
                }
            };
        });
        for (const key of keys) {
            yield [key, await this.get(key, null, false)];
        }
    }
    async incr(key, by) {
        if (!this.database) {
            throw new Error("Not initialized");
        }
        const tx = this.database
            .transaction(KV_OBJECT_STORE, "readwrite");
        const currentValue = await this.get(key, tx);
        await this.set(key, (currentValue || 0) + by, tx);
    }
}
exports.StorageIndexedDB = StorageIndexedDB;
