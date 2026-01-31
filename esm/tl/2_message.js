import { TLReader } from "./1_tl_reader.js";
import { TLWriter } from "./1_tl_writer.js";
export async function serializeMessage(message) {
    let body;
    if (message.body instanceof Uint8Array) {
        body = message.body;
    }
    else {
        body = await serializeMsgContainer(message.body);
    }
    const writer = new TLWriter()
        .writeInt64(message.msg_id)
        .writeInt32(message.seqno)
        .writeInt32(body.length)
        .write(body);
    return writer.buffer;
}
export async function deserializeMessage(reader) {
    const id_ = reader.readInt64();
    const seqno = reader.readInt32();
    const length = reader.readInt32();
    reader = new TLReader(reader.read(length));
    const reader2 = new TLReader(reader.buffer);
    const id = reader2.readInt32(false);
    let body;
    {
        if (id === MSG_CONTAINER_CONSTRUCTOR) {
            body = await deserializeMsgContainer(reader2.buffer);
        }
        else {
            body = reader.buffer;
        }
    }
    return { _: "message", msg_id: id_, seqno, body };
}
export const MSG_CONTAINER_CONSTRUCTOR = 0x73F1F8DC;
export async function serializeMsgContainer(msgContainer) {
    const writer = new TLWriter();
    writer.writeInt32(MSG_CONTAINER_CONSTRUCTOR, false);
    writer.writeInt32(msgContainer.messages.length);
    for (const message of msgContainer.messages) {
        writer.write(await serializeMessage(message));
    }
    return writer.buffer;
}
export async function deserializeMsgContainer(buffer) {
    const reader = new TLReader(buffer);
    const length = reader.readInt32();
    const messages = new Array();
    for (let i = 0; i < length; i++) {
        messages.push(await deserializeMessage(reader));
    }
    return { _: "msg_container", messages };
}
