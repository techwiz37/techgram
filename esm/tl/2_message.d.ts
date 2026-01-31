import { TLReader } from "./1_tl_reader.js";
export interface message {
    _: "message";
    msg_id: bigint;
    seqno: number;
    body: Uint8Array | msg_container;
}
export declare function serializeMessage(message: message): Promise<Uint8Array>;
export declare function deserializeMessage(reader: TLReader): Promise<message>;
export interface msg_container {
    _: "msg_container";
    messages: message[];
}
export declare const MSG_CONTAINER_CONSTRUCTOR = 1945237724;
export declare function serializeMsgContainer(msgContainer: msg_container): Promise<Uint8Array>;
export declare function deserializeMsgContainer(buffer: Uint8Array): Promise<msg_container>;
//# sourceMappingURL=2_message.d.ts.map