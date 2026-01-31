export class Mutex {
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
