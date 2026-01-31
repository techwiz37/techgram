"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutex = void 0;
class Mutex {
    #untilUnlock = Promise.resolve();
    async lock() {
        await this.#untilUnlock;
        return new Promise((resolve0) => {
            this.#untilUnlock = new Promise((resolve1) => {
                resolve0(resolve1);
            });
        });
    }
}
exports.Mutex = Mutex;
