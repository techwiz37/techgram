import { drop, type MaybePromise } from "../1_utilities.ts";

export class AbortableLoop {
  #body: (loop: AbortableLoop, signal: AbortSignal) => MaybePromise<void>;
  #onError: (loop: AbortableLoop, err: unknown) => void;

  constructor(body: (loop: AbortableLoop, signal: AbortSignal) => MaybePromise<void>, onError: (loop: AbortableLoop, err: unknown) => void) {
    this.#body = body;
    this.#onError = onError;
  }

  #controller?: AbortController;

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
        } catch (err) {
          if (!controller.signal.aborted) {
            this.#onError(this, err);
          }
        }
      } while (!controller.signal.aborted);
    } finally {
      this.#controller = undefined;
    }
  }
}
