import { type MaybePromise } from "../1_utilities.js";
export declare class AbortableLoop {
    #private;
    constructor(body: (loop: AbortableLoop, signal: AbortSignal) => MaybePromise<void>, onError: (loop: AbortableLoop, err: unknown) => void);
    abort(): void;
    start(): void;
}
//# sourceMappingURL=0_abortable_loop.d.ts.map