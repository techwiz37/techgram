"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.LruCache = void 0;
class LruCache extends Map {
    maxSize;
    #eject;
    constructor(maxSize, options) {
        super();
        this.maxSize = maxSize;
        this.#eject = options?.onEject ?? (() => { });
    }
    #setMostRecentlyUsed(key, value) {
        super.delete(key);
        super.set(key, value);
    }
    #pruneToMaxSize() {
        if (this.size > this.maxSize) {
            this.delete(this.keys().next().value);
        }
    }
    has(key) {
        const exists = super.has(key);
        if (exists) {
            this.#setMostRecentlyUsed(key, super.get(key));
        }
        return exists;
    }
    get(key) {
        if (super.has(key)) {
            const value = super.get(key);
            this.#setMostRecentlyUsed(key, value);
            return value;
        }
        return undefined;
    }
    set(key, value) {
        this.#setMostRecentlyUsed(key, value);
        this.#pruneToMaxSize();
        return this;
    }
    delete(key) {
        const value = super.get(key);
        if (value) {
            this.#eject(key, value);
        }
        return super.delete(key);
    }
}
exports.LruCache = LruCache;
