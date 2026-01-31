"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
const _1_logger_js_1 = require("./1_logger.js");
class Queue {
    #logger;
    functions = new Array();
    #throw;
    constructor(name, throw_ = false) {
        this.#logger = (0, _1_logger_js_1.getLogger)(`q/${name}`);
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
exports.Queue = Queue;
