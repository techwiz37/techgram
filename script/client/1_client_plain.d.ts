import { Mtproto } from "../2_tl.js";
import { type DC } from "../3_transport.js";
import { type PublicKeys } from "../4_constants.js";
import { type SessionParams, SessionPlain } from "../4_session.js";
import { ClientAbstract } from "./0_client_abstract.js";
export interface ClientPlainParams extends SessionParams {
    publicKeys?: PublicKeys;
}
export declare class ClientPlain extends ClientAbstract implements ClientAbstract {
    #private;
    session: SessionPlain;
    constructor(dc: DC, params?: ClientPlainParams);
    invoke<T extends Mtproto.AnyObject, R = T["_"] extends keyof Mtproto.Functions ? Mtproto.ReturnType<T> extends never ? Mtproto.ReturnType<Mtproto.Functions[T["_"]]> : never : never>(function_: T): Promise<R>;
    createAuthKey(): Promise<[Uint8Array<ArrayBuffer>, bigint]>;
}
//# sourceMappingURL=1_client_plain.d.ts.map