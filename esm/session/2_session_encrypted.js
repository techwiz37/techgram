import { assertEquals, concat, delay, ige256Decrypt, ige256Encrypt, initTgCrypto, LruCache, SECOND } from "../0_deps.js";
import { ConnectionError, TransportError } from "../0_errors.js";
import { drop, getLogger, getRandomId, gunzip, intFromBytes, intToBytes, mod, sha1, sha256, toUnixTimestamp } from "../1_utilities.js";
import { deserializeMessage, Mtproto, repr, serializeMessage, TLReader, X } from "../2_tl.js";
import { AbortableLoop } from "../client/0_abortable_loop.js";
import { TLWriter } from "../tl/1_tl_writer.js";
import { SessionError } from "./0_session_error.js";
import { Session } from "./1_session.js";
// global SessionEncrypted ID counter for logs
let id = 0;
const GZIP_PACKED = 0x3072CFA1;
const RPC_RESULT = 0xF35C6D01;
const RPC_ERROR = Mtproto.schema.definitions["rpc_error"][0];
export class SessionEncrypted extends Session {
    static #TGCRYPTO_INITED = false;
    #id = getRandomId();
    handlers = {};
    #L;
    #LsendLoop;
    #LreceiveLoop;
    #LpingLoop;
    #authKey = new Uint8Array();
    #authKeyId = 0n;
    #sentMessages = new Set();
    #pendingMessages = new Array();
    #containers = new LruCache(20_000);
    #pendingPings = new Map();
    #toAcknowledge = new Array();
    #pendingAcks = new LruCache(100);
    constructor(dc, params) {
        super(dc, params);
        const L = this.#L = getLogger("SessionEncrypted").client(id++);
        this.#LsendLoop = L.branch("sendLoop");
        this.#LreceiveLoop = L.branch("receiveLoop");
        this.#LpingLoop = L.branch("pingLoop");
    }
    async setAuthKey(key) {
        const hash = await sha1(key);
        this.#authKeyId = intFromBytes(hash.slice(-8));
        this.#authKey = key;
    }
    get authKey() {
        return this.#authKey;
    }
    async connect() {
        if (!this.connected) {
            this.#rejectAllPending(new ConnectionError("The connection was closed."));
        }
        await super.connect();
        if (!SessionEncrypted.#TGCRYPTO_INITED) {
            await initTgCrypto();
            SessionEncrypted.#TGCRYPTO_INITED = true;
        }
        this.#receiveLoop.start();
        this.#sendLoop.start();
        this.#pingLoop.start();
        this.#awakeSendLoop?.();
    }
    disconnect() {
        super.disconnect();
        this.state.reset();
        this.#id = getRandomId();
        this.#pingLoop.abort();
        this.#awakeSendLoop?.();
        this.#rejectAllPending(new ConnectionError("The connection was disconnected."));
    }
    #assertNotDisconnected() {
        if (this.disconnected) {
            throw new ConnectionError("The connection was disconnected.");
        }
    }
    async #invalidateSession(reason) {
        this.#L.debug("invalidating session because of", reason);
        this.#id = getRandomId();
        this.state.reset();
        this.disconnect();
        await this.connect();
        this.#rejectAllPending(new SessionError("The session was invalidated."));
    }
    #rejectAllPending(reason) {
        for (const id of this.#sentMessages) {
            this.#onMessageFailed(id, reason);
        }
        for (const pendingPing of this.#pendingPings.values()) {
            pendingPing.promiseWithResolvers.reject(reason);
        }
        this.#sentMessages.clear();
        this.#pendingPings.clear();
        this.#containers.clear();
    }
    #onMessageFailed(id, reason) {
        this.#sentMessages.delete(id);
        const pendingContainer = this.#containers.get(id);
        if (pendingContainer) {
            for (const id of pendingContainer) {
                this.#onMessageFailed(id, reason);
            }
            this.#containers.delete(id);
            return;
        }
        const pendingAck = this.#pendingAcks.get(id);
        if (pendingAck) {
            for (const id of pendingAck) {
                this.#toAcknowledge.push(id);
            }
            this.#pendingAcks.delete(id);
            return;
        }
        const pendingPing = this.#pendingPings.get(id);
        if (pendingPing) {
            this.#pendingPings.delete(id);
            if (reason instanceof SessionError) {
                drop(this.#resendPendingPing(pendingPing));
            }
            else {
                pendingPing.promiseWithResolvers.reject(reason);
            }
            return;
        }
        this.handlers.onMessageFailed?.(id, reason);
    }
    #setServerSalt(newServerSalt) {
        this.state.serverSalt = newServerSalt;
        this.handlers.onNewServerSalt?.(newServerSalt);
    }
    async send(body) {
        if (!this.disconnected && !this.connected) {
            await super.waitUntilConnected();
        }
        this.#assertNotDisconnected();
        const pendingMessage = { body, promiseWithResolvers: Promise.withResolvers() };
        this.#pendingMessages.push(pendingMessage);
        this.#awakeSendLoop?.();
        return await pendingMessage.promiseWithResolvers.promise;
    }
    async #receive() {
        this.#assertNotDisconnected();
        const buffer = await this.transport.transport.receive();
        if (buffer.length === 4) {
            const int = intFromBytes(buffer);
            throw new TransportError(Number(int));
        }
        try {
            const decrypted = await this.#decryptMessage(buffer);
            this.#L.in(decrypted);
            return decrypted;
        }
        catch (err) {
            this.#L.error("decryption error:", err);
            await this.#invalidateSession("decryption error");
            throw err;
        }
    }
    async #encryptMessage(message) {
        const payloadWriter = new TLWriter();
        payloadWriter.writeInt64(this.state.serverSalt);
        payloadWriter.writeInt64(this.#id);
        payloadWriter.write(await serializeMessage(message));
        payloadWriter.write(new Uint8Array(mod(-(payloadWriter.buffer.length + 12), 16) + 12));
        const payload = payloadWriter.buffer;
        const messageKey = (await sha256(concat([this.#authKey.subarray(88, 120), payload]))).subarray(8, 24);
        const a = await sha256(concat([messageKey, this.#authKey.subarray(0, 36)]));
        const b = await sha256(concat([this.#authKey.subarray(40, 76), messageKey]));
        const aesKey = concat([a.subarray(0, 8), b.subarray(8, 24), a.subarray(24, 32)]);
        const aesIV = concat([b.subarray(0, 8), a.subarray(8, 24), b.subarray(24, 32)]);
        const messageWriter = new TLWriter();
        messageWriter.writeInt64(this.#authKeyId);
        messageWriter.write(messageKey);
        messageWriter.write(ige256Encrypt(payload, aesKey, aesIV));
        return messageWriter.buffer;
    }
    async #decryptMessage(buffer) {
        const reader = new TLReader(buffer);
        assertEquals(reader.readInt64(), this.#authKeyId);
        const messageKey_ = reader.readInt128();
        const messageKey = intToBytes(messageKey_, 16);
        const a = await sha256(concat([messageKey, this.#authKey.subarray(8, 44)]));
        const b = await sha256(concat([this.#authKey.subarray(48, 84), messageKey]));
        const aesKey = concat([a.subarray(0, 8), b.subarray(8, 24), a.subarray(24, 32)]);
        const aesIv = concat([b.subarray(0, 8), a.subarray(8, 24), b.subarray(24, 32)]);
        const plaintext = ige256Decrypt(reader.buffer, aesKey, aesIv);
        assertEquals(plaintext.buffer.byteLength % 4, 0);
        const plainReader = new TLReader(plaintext);
        const _salt = plainReader.readInt64();
        const _sessionId_ = plainReader.readInt64(false);
        return deserializeMessage(plainReader);
    }
    #awakeSendLoop;
    #sendLoop = new AbortableLoop(this.#sendLoopBody.bind(this), (err) => {
        this.#LsendLoop.error("unhandled receive loop error:", err);
    });
    async #sendLoopBody(loop, signal) {
        if (!this.connected) {
            this.#LsendLoop.debug("aborting as not connected");
            loop.abort();
            return;
        }
        const pendingMessage = this.#pendingMessages.shift();
        if (pendingMessage === undefined) {
            this.#LsendLoop.debug("no pending messages");
            return await new Promise((resolve) => {
                const onAbort = () => {
                    this.#LsendLoop.debug("got aborted while sleeping");
                    resolve();
                };
                signal.addEventListener("abort", onAbort);
                this.#awakeSendLoop = () => {
                    this.#LsendLoop.debug("got awaken");
                    resolve();
                    signal.removeEventListener("abort", onAbort);
                };
            });
        }
        const msg_id = this.state.nextMessageId();
        const seqno = this.state.nextSeqNo(true);
        let message = {
            _: "message",
            msg_id,
            seqno,
            body: pendingMessage.body,
        };
        this.#LsendLoop.debug("msg_id =", msg_id, "seqno =", seqno);
        if (this.#toAcknowledge.length) {
            const msg_ids = this.#toAcknowledge.splice(0, 8192);
            this.#LsendLoop.debug("acknowledging", msg_ids.length, "message(s) while sending this one");
            const ack = {
                _: "message",
                msg_id: this.state.nextMessageId(),
                seqno: this.state.nextSeqNo(false),
                body: Mtproto.serializeObject({ _: "msgs_ack", msg_ids }),
            };
            this.#LsendLoop.debug("msgs_ack msg_id =", ack.msg_id, "seqno =", seqno);
            this.#pendingAcks.set(ack.msg_id, msg_ids);
            message = {
                _: "message",
                msg_id: this.state.nextMessageId(),
                seqno: this.state.nextSeqNo(false),
                body: {
                    _: "msg_container",
                    messages: [message, ack],
                },
            };
            this.#LsendLoop.debug("container msg_id =", message.msg_id, "seqno =", message.seqno);
        }
        try {
            const payload = await this.#encryptMessage(message);
            await this.transport.transport.send(payload);
            pendingMessage.promiseWithResolvers.resolve(msg_id);
        }
        catch (err) {
            pendingMessage.promiseWithResolvers.reject(err);
            return;
        }
        this.#LsendLoop.out(message);
        this.#sentMessages.add(msg_id);
        if (!(message.body instanceof Uint8Array)) {
            const msg_ids = message.body.messages.map((v) => v.msg_id);
            this.#LsendLoop.debug("sent container", message.msg_id, "with messages", ...msg_ids);
            this.#containers.set(message.msg_id, msg_ids);
        }
        else {
            this.#LsendLoop.debug("sent message", message.msg_id);
        }
    }
    #receiveLoop = new AbortableLoop(this.#receiveLoopBody.bind(this), (err) => {
        this.#LreceiveLoop.error("unhandled receive loop error:", err);
    });
    async #receiveLoopBody(loop) {
        let message;
        try {
            this.#LreceiveLoop.debug("receiving");
            message = await this.#receive();
        }
        catch (err) {
            this.#LreceiveLoop.error("failed to receive message:", err);
            if (!this.connected) {
                this.#LreceiveLoop.debug("aborting as not connected");
                loop.abort();
                return;
            }
            else {
                return;
            }
        }
        try {
            if (message.body instanceof Uint8Array) {
                await this.#onMessage(message.msg_id, message.body, null);
            }
            else {
                await this.#onMessageContainer(message.msg_id, message.body);
            }
        }
        catch (err) {
            this.#LreceiveLoop.error("failed to handle message:", err);
        }
    }
    async #onMessage(msgId, body, containerId) {
        this.#LreceiveLoop.debug("received message with ID", msgId, "and size", body.length, "inside", ...(containerId === null ? ["no container"] : ["container", containerId]));
        const logger = this.#LreceiveLoop.branch(msgId + "");
        let reader = new TLReader(body);
        let id = reader.readInt32(false);
        if (id === GZIP_PACKED) {
            logger.debug("unpacking compressed body");
            reader = new TLReader(await gunzip(reader.readBytes()));
            id = reader.readInt32(false);
        }
        if (id === RPC_RESULT) {
            this.#onRpcResult(msgId, reader.buffer, logger);
            return;
        }
        if (!Mtproto.schema.identifierToName[id]) {
            logger.debug("identified body as a non-MTProto constructor");
            reader.unreadInt32();
            this.handlers.onUpdate?.(reader.buffer);
            return;
        }
        let type;
        try {
            reader.unreadInt32();
            type = await Mtproto.deserializeType(X, reader);
        }
        catch (err) {
            logger.error("failed to deserialize MTProto type:", err);
            return;
        }
        logger.debug("received", repr(type));
        if (Mtproto.is("new_session_created", type)) {
            this.#onNewSessionCreated(msgId, type);
        }
        else if (Mtproto.is("pong", type)) {
            this.#onPong(msgId, type);
        }
        else if (Mtproto.is("bad_server_salt", type)) {
            this.#onBadServerSalt(type);
        }
        else if (Mtproto.is("bad_msg_notification", type)) {
            await this.#onBadMsgNotification(msgId, type, logger);
        }
        else if (Mtproto.is("msg_detailed_info", type)) {
            this.#onMsgDetailedInfo(type, logger);
        }
        else if (Mtproto.is("msg_new_detailed_info", type)) {
            this.#onMsgNewDetailedInfo(type, logger);
        }
        else {
            logger.warning(`unhandled MTProto type: ${repr(type)}`);
        }
    }
    async #onRpcResult(msgId, body, logger) {
        logger.debug("received rpc_result");
        this.#toAcknowledge.push(msgId);
        let reader = new TLReader(body);
        const reqMsgId = reader.readInt64();
        let id = reader.readInt32(false);
        if (id === GZIP_PACKED) {
            logger.debug("unpacking compressed rpc_result");
            reader = new TLReader(await gunzip(reader.readBytes()));
            id = reader.readInt32(false);
            reader.unreadInt32();
        }
        else {
            reader.unreadInt32();
        }
        if (id === RPC_ERROR) {
            logger.debug("received rpc_error from message", msgId);
            const error = await Mtproto.deserializeType("rpc_error", reader);
            this.handlers.onRpcError?.(reqMsgId, error);
        }
        else {
            this.handlers.onRpcResult?.(reqMsgId, reader.buffer);
        }
    }
    #onMsgDetailedInfo(msgDetailedInfo, logger) {
        logger.debug("scheduling the acknowledgement of", msgDetailedInfo.answer_msg_id, "because of", msgDetailedInfo._);
        this.#toAcknowledge.push(msgDetailedInfo.answer_msg_id);
    }
    #onMsgNewDetailedInfo(msgNewDetailedInfo, logger) {
        logger.debug("scheduling the acknowledgement of", msgNewDetailedInfo.answer_msg_id, "because of", msgNewDetailedInfo._);
        this.#toAcknowledge.push(msgNewDetailedInfo.answer_msg_id);
    }
    async #onBadMsgNotification(msgId, badMsgNotification, logger) {
        let low = false;
        switch (badMsgNotification.error_code) {
            case 16:
                low = true;
            case 17:
                this.state.timeDifference = Math.abs(toUnixTimestamp(new Date()) - Number(msgId >> 32n));
                if (!low) {
                    this.state.timeDifference = -this.state.timeDifference;
                    logger.debug("resetting time difference to", -this.state.timeDifference, "because the ID of the message", badMsgNotification.bad_msg_id, "was too high");
                    await this.#invalidateSession("message ID too high");
                    return;
                }
                else {
                    logger.debug("resending message", badMsgNotification.bad_msg_id, "because its ID was too low");
                }
                break;
            case 48:
                this.#L.debug("resending message that caused bad_server_salt");
                break;
            default:
                await this.#invalidateSession("unexpected bad_msg_notification");
                return;
        }
        this.#onMessageFailed(badMsgNotification.bad_msg_id, new SessionError(badMsgNotification._));
    }
    #onBadServerSalt(badServerSalt) {
        this.#setServerSalt(badServerSalt.new_server_salt);
        this.#onMessageFailed(badServerSalt.bad_msg_id, new SessionError(badServerSalt._));
    }
    #onPong(msgId, pong) {
        this.#toAcknowledge.push(msgId);
        const pendingPing = this.#pendingPings.get(pong.msg_id);
        if (pendingPing) {
            pendingPing.promiseWithResolvers.resolve(pong);
            this.#pendingPings.delete(pong.msg_id);
        }
        else {
            this.handlers.onPong?.(pong);
        }
    }
    #onNewSessionCreated(msgId, newSessionCreated) {
        this.#setServerSalt(newSessionCreated.server_salt);
        this.#toAcknowledge.push(msgId);
    }
    async #onMessageContainer(msgId, msgContainer) {
        this.#LreceiveLoop.debug("received container with ID", msgId, "and", msgContainer.messages.length, "message(s)");
        for (const message of msgContainer.messages) {
            if (message.body instanceof Uint8Array) {
                await this.#onMessage(message.msg_id, message.body, msgId);
            }
            else {
                await this.#onMessageContainer(msgId, message.body);
            }
        }
    }
    #pingInterval = 56 * SECOND;
    #pingLoop = new AbortableLoop(this.#pingLoopBody.bind(this), (_, err) => {
        this.#LpingLoop.error(err);
    });
    #timeElapsed = 0;
    async #pingLoopBody(_loop, signal) {
        const ms = Math.max(0, this.#pingInterval - this.#timeElapsed);
        if (ms) {
            this.#LpingLoop.debug(`sending ping in ${ms}ms`);
            await delay(ms, { signal });
        }
        else {
            this.#LpingLoop.debug("sending ping now");
        }
        signal.throwIfAborted();
        const then = Date.now();
        try {
            await this.#sendPingDelayDisconnect(this.#pingInterval / SECOND + 15);
            this.#LpingLoop.debug("received pong");
        }
        finally {
            this.#timeElapsed = Date.now() - then;
            this.#LpingLoop.debug(`took ${this.#timeElapsed}`);
        }
        signal.throwIfAborted();
    }
    async #sendPingDelayDisconnect(disconnect_delay) {
        const ping_id = getRandomId();
        const call = { _: "ping_delay_disconnect", ping_id, disconnect_delay };
        const messageId = await this.send(Mtproto.serializeObject(call));
        const promiseWithResolvers = Promise.withResolvers();
        this.#pendingPings.set(messageId, { call, promiseWithResolvers });
        await promiseWithResolvers.promise;
    }
    async #resendPendingPing(pendingPing) {
        try {
            const messageId = await this.send(Mtproto.serializeObject(pendingPing.call));
            this.#pendingPings.set(messageId, pendingPing);
            this.#LreceiveLoop.debug("ping resent");
        }
        catch (err) {
            this.#LreceiveLoop.debug("rejecting ping because of failed resend:", err);
            pendingPing.promiseWithResolvers.reject(err);
        }
    }
}
