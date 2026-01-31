import { fromString, isInRange, toString } from "./1_utilities.js";
export class StorageSessionStorage {
    #prefix;
    constructor(prefix) {
        if (typeof sessionStorage === "undefined") {
            throw new Error("Unavailable in current environment");
        }
        if (prefix.length <= 0) {
            throw new Error("Empty prefix");
        }
        this.#prefix = prefix;
    }
    get mustSerialize() {
        return true;
    }
    get prefix() {
        return this.#prefix;
    }
    branch(id) {
        return new StorageSessionStorage(this.prefix + "S__" + id);
    }
    initialize() {
    }
    get supportsFiles() {
        return false;
    }
    get isMemory() {
        return false;
    }
    get(key_) {
        const key = this.prefix + toString(key_);
        const value = sessionStorage.getItem(key);
        if (value !== null) {
            return fromString(value);
        }
        else {
            return null;
        }
    }
    *getMany(filter, params) {
        let entries = Object.entries(sessionStorage).sort(([a], [b]) => a.localeCompare(b));
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
                yield [parts, fromString(value)];
            }
        }
    }
    set(key_, value) {
        const key = this.prefix + toString(key_);
        if (value !== null) {
            sessionStorage.setItem(key, toString(value));
        }
        else {
            sessionStorage.removeItem(key);
        }
    }
    incr(key, by) {
        this.set(key, (this.get(key) || 0) + by);
    }
}
