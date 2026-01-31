import type { Connection, ConnectionCallback } from "../2_connection.js";
import { type DC, type TransportProvider } from "../3_transport.js";
import { SessionState } from "./0_session_state.js";
export interface SessionParams {
    transportProvider?: TransportProvider;
    cdn?: boolean;
}
export declare abstract class Session {
    #private;
    protected state: SessionState;
    protected transport: ReturnType<TransportProvider>;
    constructor(dc: DC, params?: SessionParams);
    set onConnectionStateChange(onConnectionStateChange: Connection["stateChangeHandler"]);
    set connectionCallback(connectionCallback: ConnectionCallback | undefined);
    get dc(): DC;
    get cdn(): boolean;
    set serverSalt(serverSalt: bigint);
    get serverSalt(): bigint;
    get connected(): boolean;
    connect(): Promise<void>;
    protected waitUntilConnected(): Promise<void>;
    get disconnected(): boolean;
    disconnect(): void;
    abstract send(body: Uint8Array): Promise<bigint>;
}
//# sourceMappingURL=1_session.d.ts.map