import { getLogger } from "./1_logger.js";
export class Queue {
    #logger;
    functions = new Array();
    #throw;
    constructor(name, throw_ = false) {
        this.#logger = getLogger(`q/${name}`);
        this.#throw = throw_;
    }
    add(fn) {
        this.functions.push(fn);
        this.#check();
    }
    #busy = false;
    #check() {
        if (this.#busy) {
            return;
        }
        else {
            this.#busy = true;
        }
        const fn = this.functions.shift();
        if (fn !== undefined) {
            const promise = fn()
                .finally(() => {
                this.#busy = false;
                this.#check();
            });
            if (!this.#throw) {
                promise.catch((err) => {
                    this.#logger.error((typeof err === "object" && err !== null && "stack" in err) ? err.stack : err);
                });
            }
        }
        else {
            this.#busy = false;
        }
    }
}
