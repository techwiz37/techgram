import { MINUTE } from "../0_deps.js";
import { LruCache, unreachable } from "../0_deps.js";
import { InputError } from "../0_errors.js";
import { base64DecodeUrlSafe, base64EncodeUrlSafe, getLogger, intFromBytes, rleDecode, rleEncode, sha1, ZERO_CHANNEL_ID } from "../1_utilities.js";
import { awaitablePooledMap } from "../1_utilities.js";
import { fromString, toString } from "../2_storage.js";
import { Api, TLReader, TLWriter, X } from "../2_tl.js";
import { constructChatP } from "../3_types.js";
export const K = {
    session: {
        P: (string) => `session.${string}`,
        serverSalt: () => [K.session.P("serverSalt")],
    },
    auth: {
        P: (string) => `auth.${string}`,
        isPremium: () => [K.auth.P("isPremium")],
    },
    updates: {
        P: (string) => `updates.${string}`,
        state: () => [K.updates.P("state")],
        all: () => [K.updates.P("updates")],
        updates: (boxId) => [...K.updates.all(), boxId],
        update: (boxId, id) => [...K.updates.updates(boxId), id],
    },
    cache: {
        P: (string) => `cache.${string}`,
        stickerSetNames: () => [K.cache.P("stickerSetNames")],
        stickerSetName: (id, accessHash) => [...K.cache.stickerSetNames(), id, accessHash],
        files: () => [K.cache.P("files")],
        file: (fileId) => [...K.cache.files(), fileId],
        fileParts: () => [K.cache.P("fileParts")],
        filePart: (fileId, n) => [...K.cache.fileParts(), fileId, n],
        customEmojiDocuments: () => [K.cache.P("customEmojiDocuments")],
        customEmojiDocument: (id) => [...K.cache.customEmojiDocuments(), id],
        businessConnections: () => [K.cache.P("businessConnections")],
        businessConnection: (id) => [...K.cache.businessConnections(), id],
        inlineQueryAnswers: () => [K.cache.P("inlineQueryResults")],
        inlineQueryAnswer: (userId, chatId, query, offset) => [...K.cache.inlineQueryAnswers(), userId, chatId, query, offset],
        callbackQueryAnswers: () => [K.cache.P("callbackQueryAnswers")],
        callbackQueryAnswer: (chatId, messageId, question) => [...K.cache.callbackQueryAnswers(), chatId, messageId, question],
        fullChats: () => [K.cache.P("fullChats")],
        fullChat: (chatId) => [...K.cache.fullChats(), chatId],
        groupCalls: () => [K.cache.P("groupCalls")],
        groupCall: (id) => [...K.cache.groupCalls(), id],
        groupCallAccessHashes: () => [K.cache.P("groupCallAccessHashes")],
        groupCallAccessHash: (id) => [...K.cache.groupCallAccessHashes(), id],
        pollResults: () => [K.cache.P("pollResults")],
        pollResult: (pollId) => [...K.cache.pollResults(), pollId],
        polls: () => [K.cache.P("polls")],
        poll: (pollId) => [...K.cache.polls(), pollId],
        voiceTranscriptions: () => [K.cache.P("voiceTranscriptions")],
        voiceTranscription: (transcriptionId) => [...K.cache.voiceTranscriptions(), transcriptionId],
        voiceTranscriptionReferences: () => [K.cache.P("voiceTranscriptions")],
        voiceTranscriptionReference: (chatId, messageId, messageEditDate) => [...K.cache.voiceTranscriptionReferences(), chatId, messageId, messageEditDate],
    },
    messages: {
        P: (string) => `messages.${string}`,
        messages: (chatId) => [K.messages.P("messages"), chatId],
        message: (chatId, messageId) => [...K.messages.messages(chatId), messageId],
        allMessageRefs: () => [K.messages.P("messageRefs")],
        messageRef: (messageId) => [...K.messages.allMessageRefs(), messageId],
    },
};
export class StorageOperations {
    #storage;
    #supportsFiles;
    #mustSerialize;
    #L;
    #maps = new Array();
    #values = new Array();
    auth;
    channelPts;
    peers;
    usernames;
    translations;
    constructor(storage) {
        this.#storage = storage;
        this.#supportsFiles = storage.supportsFiles;
        this.#mustSerialize = storage.mustSerialize;
        this.#L = getLogger("StorageOperations");
        this.auth = this.#addValue(new StorageAuth(storage));
        this.channelPts = this.#addMap(new StorageMap(storage, "channelPts"));
        this.peers = this.#addMap(new StorageMap(storage, "peers"));
        this.usernames = this.#addMap(new StorageMap(storage, "usernames"));
        this.translations = this.#addMap(new StorageMap(storage, "translations"));
    }
    #addMap(map) {
        this.#maps.push(map);
        return map;
    }
    #addValue(value) {
        this.#values.push(value);
        return value;
    }
    get provider() {
        return this.#storage;
    }
    get supportsFiles() {
        return this.#storage.supportsFiles;
    }
    async initialize() {
        await this.#storage.initialize();
        await this.auth.get();
    }
    set(...args) {
        return this.#storage.set(...args);
    }
    incr(...args) {
        return this.#storage.incr(...args);
    }
    get(...args) {
        return this.#storage.get(...args);
    }
    async exportAuthString(apiId_) {
        if (typeof apiId_ === "number") {
            await this.auth.update((v) => v.apiId = apiId_);
        }
        const auth = this.auth.mustGet();
        if (auth.dc === null || auth.authKey === null || auth.apiId === 0 || auth.userId === 0) {
            throw new Error("Not authorized");
        }
        const writer = new TLWriter();
        writer.writeString(auth.dc);
        writer.writeBytes(auth.authKey);
        writer.writeInt32(auth.apiId);
        writer.write(new Uint8Array([auth.isBot ? 1 : 0]));
        writer.writeInt64(BigInt(auth.userId));
        const data = rleEncode(writer.buffer);
        return base64EncodeUrlSafe(data);
    }
    async importAuthString(string) {
        const data = rleDecode(base64DecodeUrlSafe(string));
        const reader = new TLReader(data);
        const dc = reader.readString();
        const authKey = reader.readBytes();
        const apiId = reader.readInt32();
        const isBot = !!reader.read(1)[0];
        const userId = Number(reader.readInt64());
        await this.auth.set({
            apiId,
            authKey,
            dc,
            isBot,
            userId,
        });
    }
    #lastCommit = null;
    async commit(force = false) {
        if (this.#storage.isMemory) {
            return;
        }
        const pending = this.#values.filter((v) => v.isUpdatePending).length + this.#maps.filter((v) => v.pendingUpdateCount > 0).length;
        if (pending <= 0) {
            this.#L.debug("nothing to commit");
            return;
        }
        let commit = false;
        if (force) {
            this.#L.debug("committing because force = true");
            commit = true;
        }
        else {
            if (!commit && pending >= 1_000) {
                this.#L.debug("committing because pending writes >= threshold");
                commit = true;
            }
            else if (this.#lastCommit === null) {
                this.#L.debug("committing because there is no last commit");
                commit = true;
            }
            else if (Date.now() - this.#lastCommit.getTime() >= 5 * MINUTE) {
                this.#L.debug("committing because last commit is older than threshold");
                commit = true;
            }
            else {
                this.#L.debug("not committing");
            }
        }
        if (commit) {
            const values = this.#values.filter((v) => v.isUpdatePending).map((v) => v.commit());
            const maps = this.#maps.filter((v) => v.pendingUpdateCount > 0).map((v) => v.commit());
            await Promise.all(values.concat(maps));
            this.#L.debug("committed", values.length, "value(s) and", maps.length, "map(s)");
            this.#lastCommit = new Date();
        }
    }
    async setTlObject(key, value) {
        if (value === null) {
            await this.#storage.set(key, null);
        }
        else {
            await this.#storage.set(key, this.#mustSerialize ? [value._, rleEncode(Api.serializeObject(value))] : value);
        }
    }
    async getTlObject(keyOrBuffer) {
        const buffer = (keyOrBuffer instanceof Uint8Array || Api.isValidObject(keyOrBuffer)) ? keyOrBuffer : await this.#storage.get(keyOrBuffer);
        if (buffer !== null) {
            if (buffer instanceof Uint8Array) {
                return await Api.deserializeType(X, rleDecode(buffer));
            }
            else if (Array.isArray(buffer)) {
                return await Api.deserializeType(buffer[0], rleDecode(buffer[1]));
            }
            else {
                return buffer;
            }
        }
        else {
            return null;
        }
    }
    async setState(state) {
        await this.setTlObject(K.updates.state(), state);
    }
    async getState() {
        return await this.getTlObject(K.updates.state());
    }
    async setMessage(chatId, messageId, message) {
        if (chatId > ZERO_CHANNEL_ID) {
            await this.#storage.set(K.messages.messageRef(messageId), message === null ? null : chatId);
        }
        await this.setTlObject(K.messages.message(chatId, messageId), message);
    }
    async deleteMessages() {
        const maybePromises = new Array();
        for await (const [k, o] of await this.#storage.getMany({ prefix: K.messages.allMessageRefs() })) {
            maybePromises.push(Promise.all([this.#storage.set(k, null), o === null ? Promise.resolve() : this.#storage.set(K.messages.message(o, k[1]), null)]));
        }
        await Promise.all(maybePromises.filter((v) => v instanceof Promise));
    }
    getMessageChat(messageId) {
        return this.#storage.get(K.messages.messageRef(messageId));
    }
    async getMessage(chatId, messageId) {
        return await this.getTlObject(K.messages.message(chatId, messageId));
    }
    setPeer(peer_) {
        const chatP = constructChatP(peer_);
        this.setPeer2(chatP, "access_hash" in peer_ ? peer_.access_hash ?? 0n : 0n);
    }
    setPeer2(chatP, accessHash) {
        this.peers.set([chatP.id], [chatP, accessHash]);
    }
    #accountId = null;
    async getAccountId() {
        if (this.#accountId !== null) {
            return this.#accountId;
        }
        else {
            return this.#accountId = (await this.auth.get())?.userId ?? null;
        }
    }
    async setIsPremium(isPremium) {
        await this.#storage.set(K.auth.isPremium(), isPremium);
    }
    async getIsPremium() {
        return await this.#storage.get(K.auth.isPremium());
    }
    async updateStickerSetName(id, accessHash, name) {
        await this.#storage.set(K.cache.stickerSetName(id, accessHash), [name, new Date()]);
    }
    getStickerSetName(id, accessHash) {
        return this.#storage.get(K.cache.stickerSetName(id, accessHash));
    }
    async setServerSalt(serverSalt) {
        await this.#storage.set(K.session.serverSalt(), serverSalt);
    }
    getServerSalt() {
        return this.#storage.get(K.session.serverSalt());
    }
    async getHistory(chatId, offsetId, limit) {
        if (offsetId === 0) {
            offsetId = Infinity;
        }
        ++limit;
        const messages = new Array();
        for await (const [_, buffer] of await this.#storage.getMany({ start: K.messages.message(chatId, 0), end: K.messages.message(chatId, offsetId) }, { limit, reverse: true })) {
            const message = await this.getTlObject(buffer);
            if ("id" in message && message.id === offsetId) {
                continue;
            }
            messages.push(message);
        }
        return messages;
    }
    async getFile(id) {
        if (!this.#supportsFiles) {
            return null;
        }
        return await this.#storage.get(K.cache.file(id));
    }
    async *iterFileParts(id, partCount, offset, signal) {
        if (!this.#supportsFiles) {
            return;
        }
        for (let i = offset; i < partCount; i++) {
            signal?.throwIfAborted();
            const part = await this.#storage.get(K.cache.filePart(id, i));
            if (part === null) {
                continue;
            }
            yield part;
        }
    }
    async saveFilePart(id, index, bytes) {
        if (!this.#supportsFiles) {
            return;
        }
        await this.#storage.set(K.cache.filePart(id, index), bytes);
    }
    async setFilePartCount(id, partCount, chunkSize) {
        if (!this.#supportsFiles) {
            return;
        }
        await this.#storage.set(K.cache.file(id), [partCount, chunkSize]);
    }
    async setCustomEmojiDocument(id, document) {
        await this.#storage.set(K.cache.customEmojiDocument(id), [this.#mustSerialize ? rleEncode(Api.serializeObject(document)) : document, new Date()]);
    }
    async getCustomEmojiDocument(id) {
        const v = await this.#storage.get(K.cache.customEmojiDocument(id));
        if (v !== null) {
            return [await this.getTlObject(v[0]), v[1]];
        }
        else {
            return null;
        }
    }
    async setBusinessConnection(id, connection) {
        await this.#storage.set(K.cache.businessConnection(id), connection === null ? null : this.#mustSerialize ? rleEncode(Api.serializeObject(connection)) : connection);
    }
    async getBusinessConnection(id) {
        const v = await this.#storage.get(K.cache.businessConnection(id));
        if (v !== null) {
            return await this.getTlObject(v);
        }
        else {
            return null;
        }
    }
    async setInlineQueryAnswer(userId, chatId, query, offset, results, date) {
        await this.#storage.set(K.cache.inlineQueryAnswer(userId, chatId, query, offset), [this.#mustSerialize ? rleEncode(Api.serializeObject(results)) : results, date]);
    }
    async getInlineQueryAnswer(userId, chatId, query, offset) {
        const peer_ = await this.#storage.get(K.cache.inlineQueryAnswer(userId, chatId, query, offset));
        if (peer_ !== null) {
            const [obj_, date] = peer_;
            return [Api.as("messages.botResults", await this.getTlObject(obj_)), date];
        }
        else {
            return null;
        }
    }
    async setCallbackQueryAnswer(chatId, messageId, question, answer) {
        await this.#storage.set(K.cache.callbackQueryAnswer(chatId, messageId, question), [this.#mustSerialize ? rleEncode(Api.serializeObject(answer)) : answer, new Date()]);
    }
    async getCallbackQueryAnswer(chatId, messageId, question) {
        const peer_ = await this.#storage.get(K.cache.callbackQueryAnswer(chatId, messageId, question));
        if (peer_ !== null) {
            const [obj_, date] = peer_;
            return [Api.as("messages.botCallbackAnswer", await this.getTlObject(obj_)), date];
        }
        else {
            return null;
        }
    }
    async setFullChat(chatId, fullChat) {
        await this.setTlObject(K.cache.fullChat(chatId), fullChat);
    }
    async getFullChat(chatId) {
        return await this.getTlObject(K.cache.fullChat(chatId));
    }
    async setGroupCall(id, groupCall) {
        await this.setTlObject(K.cache.groupCall(id), groupCall);
    }
    async getGroupCall(id) {
        return await this.getTlObject(K.cache.groupCall(id));
    }
    async setGroupCallAccessHash(id, accessHash) {
        await this.#storage.set(K.cache.groupCallAccessHash(id), accessHash);
    }
    async getGroupCallAccessHash(id) {
        return await this.#storage.get(K.cache.groupCallAccessHash(id));
    }
    #getUpdateId(update) {
        let id = BigInt(Date.now()) << 32n;
        if ("pts" in update && update.pts) {
            id |= BigInt(update.pts);
        }
        else {
            id |= BigInt(0xffffffffn);
        }
        return id;
    }
    async setUpdate(boxId, update) {
        await this.setTlObject(K.updates.update(boxId, this.#getUpdateId(update)), update);
    }
    async deleteUpdates() {
        const maybePromises = new Array();
        for await (const [k] of await this.#storage.getMany({ prefix: K.updates.all() })) {
            maybePromises.push(this.#storage.set(k, null));
        }
        await Promise.all(maybePromises.filter((v) => v instanceof Promise));
    }
    async getFirstUpdate(boxId) {
        for await (const [key, update] of await this.#storage.getMany({ prefix: K.updates.updates(boxId) }, { limit: 1 })) {
            return [key, (await this.getTlObject(update))];
        }
        return null;
    }
    assertUser(source) {
        if (this.isBot) {
            throw new InputError(`${source}: not a user client`);
        }
    }
    assertBot(source) {
        if (!this.isBot) {
            throw new InputError(`${source}: not a bot client`);
        }
    }
    get isBot() {
        return this.auth.mustGet().isBot;
    }
    async getChannelAccessHash(id) {
        const peer = await this.peers.get([id]);
        if (peer?.[0].type === "channel" || peer?.[0].type === "supergroup") {
            return peer[1];
        }
        else {
            return null;
        }
    }
    async getUserAccessHash(id) {
        const peer = await this.peers.get([id]);
        if (peer?.[0].type === "private") {
            return peer[1];
        }
        else {
            return null;
        }
    }
    async deleteFiles() {
        if (!this.#supportsFiles) {
            return;
        }
        for await (const [key] of await this.#storage.getMany({ prefix: K.cache.fileParts() })) {
            await this.#storage.set(key, null);
        }
        for await (const [key] of await this.#storage.getMany({ prefix: K.cache.files() })) {
            await this.#storage.set(key, null);
        }
    }
    async deleteCustomEmojiDocuments() {
        for await (const [key] of await this.#storage.getMany({ prefix: K.cache.customEmojiDocuments() })) {
            await this.#storage.set(key, null);
        }
    }
    async deleteBusinessConnections() {
        for await (const [key] of await this.#storage.getMany({ prefix: K.cache.businessConnections() })) {
            await this.#storage.set(key, null);
        }
    }
    async deleteInlineQueryAnswers() {
        for await (const [key] of await this.#storage.getMany({ prefix: K.cache.inlineQueryAnswers() })) {
            await this.#storage.set(key, null);
        }
    }
    async deleteCallbackQueryAnswers() {
        for await (const [key] of await this.#storage.getMany({ prefix: K.cache.callbackQueryAnswers() })) {
            await this.#storage.set(key, null);
        }
    }
    async deleteFullChats() {
        for await (const [key] of await this.#storage.getMany({ prefix: K.cache.fullChats() })) {
            await this.#storage.set(key, null);
        }
    }
    async deleteGroupCalls() {
        for await (const [key] of await this.#storage.getMany({ prefix: K.cache.groupCalls() })) {
            await this.#storage.set(key, null);
        }
    }
    async deleteStickerSetNames() {
        for await (const [key] of await this.#storage.getMany({ prefix: K.cache.stickerSetNames() })) {
            await this.#storage.set(key, null);
        }
    }
    async clear() {
        await Promise.all([
            this.deleteMessages(),
            this.deleteUpdates(),
            this.deleteFiles(),
            this.deleteCustomEmojiDocuments(),
            this.deleteBusinessConnections(),
            this.deleteInlineQueryAnswers(),
            this.deleteCallbackQueryAnswers(),
            this.deleteFullChats(),
            this.deleteGroupCalls(),
            this.deleteStickerSetNames(),
            this.peers.clear(),
            this.usernames.clear(),
            this.translations.clear(),
            this.deletePollResults(),
            this.deletePolls(),
            this.deleteVoiceTranscriptions(),
            this.deleteVoiceTranscriptionReferences(),
        ]);
    }
    async reset() {
        for await (const [key] of await this.#storage.getMany({ prefix: [] })) {
            await this.#storage.set(key, null);
        }
    }
    async setPollResults(pollId, pollResults) {
        await this.setTlObject(K.cache.pollResult(pollId), pollResults);
    }
    async getPollResults(pollId) {
        return await this.getTlObject(K.cache.pollResult(pollId));
    }
    async deletePollResults() {
        const maybePromises = new Array();
        for await (const [key] of await this.#storage.getMany({ prefix: K.cache.pollResults() })) {
            maybePromises.push(this.#storage.set(key, null));
        }
        await Promise.all(maybePromises);
    }
    async setPoll(pollId, poll) {
        await this.setTlObject(K.cache.poll(pollId), poll);
    }
    async getPoll(pollId) {
        return await this.getTlObject(K.cache.poll(pollId));
    }
    async deletePolls() {
        const maybePromises = new Array();
        for await (const [key] of await this.#storage.getMany({ prefix: K.cache.polls() })) {
            maybePromises.push(this.#storage.set(key, null));
        }
        await Promise.all(maybePromises);
    }
    async setVoiceTranscription(voiceTranscription) {
        await this.#storage.set(K.cache.voiceTranscription(BigInt(voiceTranscription.id)), voiceTranscription);
    }
    async getVoiceTranscription(transcriptionId) {
        return await this.#storage.get(K.cache.voiceTranscription(transcriptionId));
    }
    async deleteVoiceTranscriptions() {
        const maybePromises = new Array();
        for await (const [key] of await this.#storage.getMany({ prefix: K.cache.voiceTranscriptions() })) {
            maybePromises.push(this.#storage.set(key, null));
        }
        await Promise.all(maybePromises);
    }
    async setVoiceTranscriptionReference(chatId, messageId, messageEditDate, transcriptionId) {
        await this.#storage.set(K.cache.voiceTranscriptionReference(chatId, messageId, messageEditDate.getTime()), transcriptionId);
    }
    async getVoiceTranscriptionReference(chatId, messageId, messageEditDate) {
        return await this.#storage.get(K.cache.voiceTranscriptionReference(chatId, messageId, messageEditDate.getTime()));
    }
    async deleteVoiceTranscriptionReferences() {
        const maybePromises = new Array();
        for await (const [key] of await this.#storage.getMany({ prefix: K.cache.voiceTranscriptions() })) {
            maybePromises.push(this.#storage.set(key, null));
        }
        await Promise.all(maybePromises);
    }
}
class StorageMap {
    #storage;
    #path;
    constructor(storage, path) {
        this.#storage = storage;
        this.#path = path;
    }
    #pendingUpdates = new Map();
    #cache = new LruCache(20_000);
    set(key, value) {
        const key_ = toString(key);
        this.#cache.set(key_, value);
        if (!this.#storage.isMemory) {
            this.#pendingUpdates.set(key_, value);
        }
    }
    get pendingUpdateCount() {
        return this.#pendingUpdates.size;
    }
    mustGet(key) {
        const value = this.#cache.get(toString(key));
        if (value === undefined) {
            unreachable();
        }
        else {
            return value;
        }
    }
    async clear() {
        await awaitablePooledMap(10, await this.#storage.getMany({ prefix: [this.#path] }), async ([key]) => await this.#storage.set(key, null));
    }
    async get(key) {
        const key_ = toString(key);
        let value = this.#cache.get(key_);
        if (value === undefined) {
            value = await this.#storage.get([this.#path, ...key]);
            this.#cache.set(key_, value);
        }
        return value;
    }
    async commit() {
        if (this.#storage.isMemory) {
            return;
        }
        await awaitablePooledMap(2, this.#pendingUpdates, async ([key, value]) => await this.#storage.set([this.#path, ...fromString(key)], value));
        this.#pendingUpdates.clear();
    }
}
class StorageValue {
    #storage;
    #key;
    constructor(storage, path) {
        this.#storage = storage;
        this.#key = [path];
    }
    #updatePending = false;
    #value;
    set(value) {
        this.#value = value;
        if (!this.#storage.isMemory) {
            this.#updatePending = true;
        }
    }
    get isUpdatePending() {
        return this.#updatePending;
    }
    mustGet() {
        return this.#value === undefined ? unreachable() : this.#value;
    }
    async get() {
        if (this.#value === undefined) {
            this.#value = await this.#storage.get(this.#key);
        }
        return this.#value;
    }
    async commit() {
        if (this.#storage.isMemory || this.#value === undefined) {
            return;
        }
        await this.#storage.set(this.#key, this.#value);
        this.#updatePending = false;
    }
}
class StorageAuth extends StorageValue {
    constructor(storage) {
        super(storage, "auth");
    }
    async get() {
        const value = await super.get();
        await this.#resetAuthKeyId(value);
        return value;
    }
    mustGet() {
        return super.mustGet() ?? {
            apiId: 0,
            authKey: new Uint8Array(),
            dc: null,
            isBot: false,
            userId: 0,
        };
    }
    async set(auth) {
        super.set(auth);
        await this.#resetAuthKeyId(auth);
    }
    async update(fn) {
        const auth = this.mustGet();
        fn(auth);
        await this.set(auth);
    }
    #authKeyId = null;
    async #resetAuthKeyId(auth) {
        if (auth?.authKey) {
            this.#authKeyId = intFromBytes((await sha1(auth.authKey)).subarray(-8));
        }
        else {
            this.#authKeyId = null;
        }
    }
    get authKeyId() {
        return this.#authKeyId;
    }
}
