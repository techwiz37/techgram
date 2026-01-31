import { fromString, isInRange, toString } from "./1_utilities.js";
export class StorageMemory {
    map = new Map();
    #id = null;
    constructor() {
    }
    get mustSerialize() {
        return false;
    }
    initialize() {
    }
    #fixKey(key) {
        if (this.#id !== null) {
            return ["__S" + this.#id, ...key];
        }
        else {
            return key;
        }
    }
    branch(id) {
        const storage = new StorageMemory();
        storage.#id = id;
        return storage;
    }
    get supportsFiles() {
        return false;
    }
    get isMemory() {
        return true;
    }
    get(key) {
        key = this.#fixKey(key);
        return this.map.get(toString(key)) ?? null;
    }
    #getEntries() {
        const entries = new Array();
        for (const entry of this.map.entries()) {
            if (this.#id !== null && !entry[0].startsWith("__S" + this.#id)) {
                continue;
            }
            entries.push(entry);
        }
        return entries;
    }
    *getMany(filter, params) {
        let entries = this.#getEntries();
        if (params?.reverse) {
            entries.reverse();
        }
        if (params?.limit !== undefined) {
            entries = entries.slice(0, params.limit <= 0 ? 1 : params.limit);
        }
        entries: for (const [key, value] of entries) {
            const parts = fromString(key);
            if (Array.isArray(parts)) {
                if ("prefix" in filter) {
                    for (const [i, p] of filter.prefix.entries()) {
                        if (toString(p) !== toString(parts[i])) {
                            continue entries;
                        }
                    }
                }
                else {
                    if (!isInRange(parts, filter.start, filter.end)) {
                        continue;
                    }
                }
                yield [parts, value];
            }
        }
    }
    set(key_, value) {
        key_ = this.#fixKey(key_);
        const key = toString(key_);
        if (value !== null) {
            this.map.set(key, value);
        }
        else {
            this.map.delete(key);
        }
    }
    incr(key, by) {
        this.set(key, (this.get(key) || 0) + by);
    }
}
