import { Mtproto } from "../2_tl.js";
import type { DC } from "../3_transport.js";
import { Session, type SessionParams } from "./1_session.js";
export interface Handlers {
    onUpdate?: (body: Uint8Array) => void;
    onNewServerSalt?: (serverSalt: bigint) => void;
    onMessageFailed?: (id: bigint, reason: unknown) => void;
    onPong?: (pong: Mtproto.pong) => void;
    onRpcError?: (id: bigint, error: Mtproto.rpc_error) => void;
    onRpcResult?: (id: bigint, result: Uint8Array) => void;
}
export declare class SessionEncrypted extends Session implements Session {
    #private;
    handlers: Handlers;
    constructor(dc: DC, params?: SessionParams);
    setAuthKey(key: Uint8Array<ArrayBuffer>): Promise<void>;
    get authKey(): Uint8Array<ArrayBuffer>;
    connect(): Promise<void>;
    disconnect(): void;
    send(body: Uint8Array<ArrayBuffer>): Promise<bigint>;
}
//# sourceMappingURL=2_session_encrypted.d.ts.map