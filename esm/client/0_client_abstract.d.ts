import type { Connection, ConnectionCallback } from "../2_connection.js";
import type { DC } from "../3_transport.js";
import type { Session } from "../4_session.js";
export declare abstract class ClientAbstract {
    abstract session: Session;
    get dc(): DC;
    get cdn(): boolean;
    set serverSalt(serverSalt: bigint);
    get serverSalt(): bigint;
    get connected(): boolean;
    connect(): Promise<void>;
    get disconnected(): boolean;
    disconnect(): void;
    set connectionCallback(connectionCallback: ConnectionCallback | undefined);
    set onConnectionStateChange(onConnectionStateChange: Connection["stateChangeHandler"]);
}
//# sourceMappingURL=0_client_abstract.d.ts.map