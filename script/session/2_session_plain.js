"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionPlain = void 0;
const _0_errors_js_1 = require("../0_errors.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _1_tl_reader_js_1 = require("../tl/1_tl_reader.js");
const _1_tl_writer_js_1 = require("../tl/1_tl_writer.js");
const _1_session_js_1 = require("./1_session.js");
class SessionPlain extends _1_session_js_1.Session {
    async send(data) {
        if (!this.connected) {
            throw new _0_errors_js_1.ConnectionError("The connection is not open.");
        }
        const messageId = this.state.nextMessageId();
        const writer = new _1_tl_writer_js_1.TLWriter();
        writer.writeInt64(0n);
        writer.writeInt64(messageId);
        writer.writeInt32(data.length);
        writer.write(data);
        const payload = writer.buffer;
        await this.transport.transport.send(payload);
        return messageId;
    }
    async receive() {
        if (!this.connected) {
            throw new _0_errors_js_1.ConnectionError("The connection is not open.");
        }
        const buffer = await this.transport.transport.receive();
        if (buffer.length === 4) {
            const int = (0, _1_utilities_js_1.intFromBytes)(buffer);
            throw new _0_errors_js_1.TransportError(Number(int));
        }
        const reader = new _1_tl_reader_js_1.TLReader(buffer);
        const _authKeyId = reader.readInt64();
        const _messageId = reader.readInt64();
        const dataLength = reader.readInt32();
        const data = reader.read(dataLength);
        return data;
    }
}
exports.SessionPlain = SessionPlain;
