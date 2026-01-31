import { Api, Mtproto } from "../2_tl.js";
import type { DC } from "../3_transport.js";
import { SessionEncrypted } from "../4_session.js";
import { ClientAbstract } from "./0_client_abstract.js";
import { type ClientPlainParams } from "./1_client_plain.js";
export interface ClientEncryptedParams extends ClientPlainParams {
    appVersion?: string;
    deviceModel?: string;
    langCode?: string;
    langPack?: string;
    systemLangCode?: string;
    systemVersion?: string;
    disableUpdates?: boolean;
}
export interface ClientEncryptedHandlers {
    onNewServerSalt?: (newServerSalt: bigint) => void;
    onUpdate?: (update: Api.Updates | Api.Update) => void;
    onDeserializationError?: () => void;
}
export declare class ClientEncrypted extends ClientAbstract {
    #private;
    handlers: ClientEncryptedHandlers;
    session: SessionEncrypted;
    constructor(dc: DC, apiId: number, params?: ClientEncryptedParams);
    connect(): Promise<void>;
    disconnect(): void;
    get authKey(): Uint8Array<ArrayBuffer>;
    setAuthKey(authKey: Uint8Array<ArrayBuffer>): Promise<void>;
    lastRequest?: Date;
    invoke<T extends Api.AnyFunction | Mtproto.ping, R = T extends Mtproto.ping ? Mtproto.pong : T extends Api.AnyGenericFunction<infer X> ? Api.ReturnType<X> : T["_"] extends keyof Api.Functions ? Api.ReturnType<T> extends never ? Api.ReturnType<Api.Functions[T["_"]]> : never : never>(function_: T): Promise<R>;
}
//# sourceMappingURL=2_client_encrypted.d.ts.map