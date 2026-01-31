export declare function setLogVerbosity(verbosity_: number): void;
export declare function setLogFilter(filter_: RegExp | null): void;
export interface LoggingProvider {
    error(...args: any[]): void;
    warn(...args: any[]): void;
    info(...args: any[]): void;
    debug(...args: any[]): void;
    log(...args: any[]): void;
}
export declare function setLoggingProvider(provider_: LoggingProvider): void;
export declare const ERROR = 1;
export declare const WARNING = 2;
export declare const INFO = 3;
export declare const DEBUG = 4;
export declare const TRACE = 5;
export declare const IN = 10;
export declare const OUT = 10;
export declare const IN_BIN = 20;
export declare const OUT_BIN = 20;
export declare function getLogger(scope: string): {
    client(id: number):  any;
    branch(name: string):  any;
    error(...args: any[]): void;
    warning(...args: any[]): void;
    info(...args: any[]): void;
    debug(...args: any[]): void;
    trace(...args: any[]): void;
    in(...args: any[]): void;
    out(...args: any[]): void;
    inBin(p: Uint8Array): void;
    outBin(p: Uint8Array): void;
    log(verbosity_: number, ...args: any[]): void;
};
export type Logger = ReturnType<typeof getLogger>;
//# sourceMappingURL=1_logger.d.ts.map