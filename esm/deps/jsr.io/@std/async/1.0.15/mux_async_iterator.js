// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
export class MuxAsyncIterator {
    #iteratorCount = 0;
    #yields = [];
    #throws = [];
    #signal = Promise.withResolvers();
    add(iterable) {
        ++this.#iteratorCount;
        this.#callIteratorNext(iterable[Symbol.asyncIterator]());
    }
    async #callIteratorNext(iterator) {
        try {
            const { value, done } = await iterator.next();
            if (done) {
                --this.#iteratorCount;
            }
            else {
                this.#yields.push({ iterator, value });
            }
        }
        catch (e) {
            this.#throws.push(e);
        }
        this.#signal.resolve();
    }
    async *iterate() {
        while (this.#iteratorCount > 0) {
            await this.#signal.promise;
            for (const { iterator, value } of this.#yields) {
                yield value;
                this.#callIteratorNext(iterator);
            }
            if (this.#throws.length) {
                for (const e of this.#throws) {
                    throw e;
                }
            }
            this.#yields.length = 0;
            this.#signal = Promise.withResolvers();
        }
    }
    [Symbol.asyncIterator]() {
        return this.iterate();
    }
}
