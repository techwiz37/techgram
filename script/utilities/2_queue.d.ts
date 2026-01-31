export declare class Queue {
    #private;
    functions: (() => Promise<void>)[];
    constructor(name: string, throw_?: boolean);
    add(fn: () => Promise<void>): void;
}
//# sourceMappingURL=2_queue.d.ts.map