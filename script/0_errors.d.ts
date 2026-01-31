export declare abstract class techgramError extends Error {
}
export declare class ConnectionError extends techgramError {
    constructor(...args: ConstructorParameters<typeof Error>);
}
export declare class AccessError extends techgramError {
    constructor(...args: ConstructorParameters<typeof Error>);
}
export declare class InputError extends techgramError {
    constructor(...args: ConstructorParameters<typeof Error>);
}
export declare class TransportError extends techgramError {
    readonly code: number;
    constructor(code: number);
}
export declare class TLError extends techgramError {
    #private;
    name: string;
    constructor(message: string, path: string[]);
    get originalMessage(): string;
    get path(): string[];
}
//# sourceMappingURL=0_errors.d.ts.map