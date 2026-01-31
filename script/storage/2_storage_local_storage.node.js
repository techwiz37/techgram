"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageLocalStorage = void 0;
const node_localstorage_1 = require("node-localstorage");
const _1_utilities_js_1 = require("./1_utilities.js");
class StorageLocalStorage {
    #prefix;
    #path;
    #storage;
    constructor(path) {
        this.#prefix = "main";
        this.#storage = new node_localstorage_1.LocalStorage(this.#path = path);
    }
    get prefix() {
        return this.#prefix;
    }
    branch(id) {
        const storage = new StorageLocalStorage(this.#path);
        storage.#prefix = this.prefix + "S__" + id;
        return storage;
    }
    initialize() {
    }
    get supportsFiles() {
        return false;
    }
    get mustSerialize() {
        return true;
    }
    get isMemory() {
        return false;
    }
    get(key_) {
        const key = this.prefix + (0, _1_utilities_js_1.toString)(key_);
        const value = this.#storage.getItem(key);
        if (value !== null) {
            return (0, _1_utilities_js_1.fromString)(value);
        }
        else {
            return null;
        }
    }
    *getMany(filter, params) {
        let entries = Object.entries(this.#storage).sort(([a], [b]) => a.localeCompare(b));
        if (params?.reverse) {
            entries.reverse();
        }
        if (params?.limit !== undefined) {
            entries = entries.slice(0, params.limit <= 0 ? 1 : params.limit);
        }
        entries: for (let [key, value] of entries) {
            if (key.startsWith(this.prefix)) {
                key = key.slice(this.prefix.length);
            }
            const parts = (0, _1_utilities_js_1.fromString)(key);
            if (Array.isArray(parts)) {
                if ("prefix" in filter) {
                    for (const [i, p] of filter.prefix.entries()) {
                        if ((0, _1_utilities_js_1.toString)(p) !== (0, _1_utilities_js_1.toString)(parts[i])) {
                            continue entries;
                        }
                    }
                }
                else {
                    if (!(0, _1_utilities_js_1.isInRange)(parts, filter.start, filter.end)) {
                        continue;
                    }
                }
                yield [parts, (0, _1_utilities_js_1.fromString)(value)];
            }
        }
    }
    set(key_, value) {
        const key = this.prefix + (0, _1_utilities_js_1.toString)(key_);
        if (value !== null) {
            this.#storage.setItem(key, (0, _1_utilities_js_1.toString)(value));
        }
        else {
            this.#storage.removeItem(key);
        }
    }
    incr(key, by) {
        this.set(key, (this.get(key) || 0) + by);
    }
}
exports.StorageLocalStorage = StorageLocalStorage;
