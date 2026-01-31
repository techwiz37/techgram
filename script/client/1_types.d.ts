import type { Api, Mtproto } from "../2_tl.js";
import type { ConnectionState, ID, ParseMode, PeerGetter, Update } from "../3_types.js";
import type { InvokeParams } from "./0_params.js";
import type { StorageOperations } from "./0_storage_operations.js";
export interface C {
    id: number;
    getUploadPoolSize: () => Promise<number>;
    storage: StorageOperations;
    messageStorage: StorageOperations;
    guaranteeUpdateDelivery: boolean;
    setConnectionState: (connectionState: ConnectionState) => void;
    resetConnectionState: () => void;
    getSelfId: () => Promise<number>;
    getInputPeer: (id: ID) => Promise<Api.InputPeer>;
    getInputChannel: (id: ID) => Promise<Api.inputChannel | Api.inputChannelFromMessage>;
    getInputUser: (id: ID) => Promise<Api.inputUserSelf | Api.inputUser | Api.inputUserFromMessage>;
    getInputPeerChatId: (inputPeer: Api.InputPeer | Api.InputUser | Api.InputChannel) => Promise<number>;
    getPeer: PeerGetter;
    handleUpdate: (update: Update) => void;
    parseMode: ParseMode;
    outgoingMessages: boolean;
    dropPendingUpdates: boolean | undefined;
    disconnected: () => boolean;
    langPack: string | undefined;
    langCode: string | undefined;
    invoke<T extends Api.AnyFunction | Mtproto.ping, R = T extends Mtproto.ping ? Mtproto.pong : T extends Api.AnyGenericFunction<infer X> ? Api.ReturnType<X> : T["_"] extends keyof Api.Functions ? Api.ReturnType<T> extends never ? Api.ReturnType<Api.Functions[T["_"]]> : never : never>(function_: T, params?: InvokeParams & {
        businessConnectionId?: string;
    }): Promise<R>;
}
//# sourceMappingURL=1_types.d.ts.map