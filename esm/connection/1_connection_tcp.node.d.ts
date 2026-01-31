import type { Connection } from "./0_connection.js";
export declare class ConnectionTCP implements Connection {
    #private;
    stateChangeHandler?: Connection["stateChangeHandler"];
    constructor(hostname: string, port: number);
    open(): Promise<void> | undefined;
    get connected(): boolean;
    read(p: Uint8Array): Promise<void>;
    write(p: Uint8Array): Promise<void>;
    close(): void;
}
//# sourceMappingURL=1_connection_tcp.node.d.ts.map