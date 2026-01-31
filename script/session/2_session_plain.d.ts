import { Session } from "./1_session.js";
export declare class SessionPlain extends Session implements Session {
    send(data: Uint8Array): Promise<bigint>;
    receive(): Promise<Uint8Array>;
}
//# sourceMappingURL=2_session_plain.d.ts.map