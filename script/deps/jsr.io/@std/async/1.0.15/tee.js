"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.tee = tee;
class Queue {
    #source;
    #queue;
    head;
    done;
    constructor(iterable) {
        this.#source = iterable[Symbol.asyncIterator]();
        this.#queue = {
            value: undefined,
            next: undefined,
        };
        this.head = this.#queue;
        this.done = false;
    }
    async next() {
        const result = await this.#source.next();
        if (!result.done) {
            const nextNode = {
                value: result.value,
                next: undefined,
            };
            this.#queue.next = nextNode;
            this.#queue = nextNode;
        }
        else {
            this.done = true;
        }
    }
}
function tee(iterable, n = 2) {
    const queue = new Queue(iterable);
    async function* generator() {
        let buffer = queue.head;
        while (true) {
            if (buffer.next) {
                buffer = buffer.next;
                yield buffer.value;
            }
            else if (queue.done) {
                return;
            }
            else {
                await queue.next();
            }
        }
    }
    return Array.from({ length: n }).map(() => generator());
}
