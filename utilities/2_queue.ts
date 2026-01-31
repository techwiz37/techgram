import { getLogger, type Logger } from "./1_logger.ts";

export class Queue {
  #logger: Logger;
  functions = new Array<() => Promise<void>>();
  #throw: boolean;

  constructor(name: string, throw_ = false) {
    this.#logger = getLogger(`q/${name}`);
    this.#throw = throw_;
  }

  add(fn: () => Promise<void>) {
    this.functions.push(fn);
    this.#check();
  }

  #busy = false;
  #check() {
    if (this.#busy) {
      return;
    } else {
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
    } else {
      this.#busy = false;
    }
  }
}
