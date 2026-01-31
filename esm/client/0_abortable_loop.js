import { drop } from "../1_utilities.js";
export class AbortableLoop {
    #body;
    #onError;
    constructor(body, onError) {
        this.#body = body;
        this.#onError = onError;
    }
    #controller;
    abort() {
        this.#controller?.abort();
    }
    start() {
        if (this.#controller === undefined) {
            drop(this.#loop());
        }
    }
    async #loop() {
        this.#controller?.abort();
        const controller = this.#controller = new AbortController();
        try {
            do {
                try {
                    await this.#body(this, controller.signal);
                }
                catch (err) {
                    if (!controller.signal.aborted) {
                        this.#onError(this, err);
                    }
                }
            } while (!controller.signal.aborted);
        }
        finally {
            this.#controller = undefined;
        }
    }
}
