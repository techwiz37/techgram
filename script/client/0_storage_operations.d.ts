import { type MaybePromise } from "../1_utilities.js";
import { type Storage, type StorageKeyPart } from "../2_storage.js";
import { Api } from "../2_tl.js";
import type { DC } from "../3_transport.js";
import { type ChatP, type Translation, type VoiceTranscription } from "../3_types.js";
export declare const K: {
    session: {
        P: (string: string) => string;
        serverSalt: () => StorageKeyPart[];
    };
    auth: {
        P: (string: string) => string;
        isPremium: () => StorageKeyPart[];
    };
    updates: {
        P: (string: string) => string;
        state: () => StorageKeyPart[];
        all: () => StorageKeyPart[];
        updates: (boxId: bigint) => StorageKeyPart[];
        update: (boxId: bigint, id: bigint) => StorageKeyPart[];
    };
    cache: {
        P: (string: string) => string;
        stickerSetNames: () => StorageKeyPart[];
        stickerSetName: (id: bigint, accessHash: bigint) => StorageKeyPart[];
        files: () => StorageKeyPart[];
        file: (fileId: bigint) => StorageKeyPart[];
        fileParts: () => StorageKeyPart[];
        filePart: (fileId: bigint, n: number) => StorageKeyPart[];
        customEmojiDocuments: () => StorageKeyPart[];
        customEmojiDocument: (id: bigint) => StorageKeyPart[];
        businessConnections: () => StorageKeyPart[];
        businessConnection: (id: string) => StorageKeyPart[];
        inlineQueryAnswers: () => StorageKeyPart[];
        inlineQueryAnswer: (userId: number, chatId: number, query: string, offset: string) => StorageKeyPart[];
        callbackQueryAnswers: () => StorageKeyPart[];
        callbackQueryAnswer: (chatId: number, messageId: number, question: string) => StorageKeyPart[];
        fullChats: () => StorageKeyPart[];
        fullChat: (chatId: number) => StorageKeyPart[];
        groupCalls: () => StorageKeyPart[];
        groupCall: (id: bigint) => StorageKeyPart[];
        groupCallAccessHashes: () => StorageKeyPart[];
        groupCallAccessHash: (id: bigint) => StorageKeyPart[];
        pollResults: () => string[];
        pollResult: (pollId: bigint) => (string | bigint)[];
        polls: () => string[];
        poll: (pollId: bigint) => (string | bigint)[];
        voiceTranscriptions: () => string[];
        voiceTranscription: (transcriptionId: bigint) => (string | bigint)[];
        voiceTranscriptionReferences: () => string[];
        voiceTranscriptionReference: (chatId: number, messageId: number, messageEditDate: number) => (string | number)[];
    };
    messages: {
        P: (string: string) => string;
        messages: (chatId: number) => StorageKeyPart[];
        message: (chatId: number, messageId: number) => StorageKeyPart[];
        allMessageRefs: () => StorageKeyPart[];
        messageRef: (messageId: number) => StorageKeyPart[];
    };
};
export declare class StorageOperations {
    #private;
    auth: StorageAuth;
    channelPts: StorageMap<[bigint], number>;
    peers: StorageMap<[number], [ChatP, bigint]>;
    usernames: StorageMap<[string], [number, Date]>;
    translations: StorageMap<[string, string], {
        version: number;
        translations: Translation[];
        date: Date;
    }>;
    constructor(storage: Storage);
    get provider(): Storage;
    get supportsFiles(): boolean;
    initialize(): Promise<void>;
    set(...args: Parameters<Storage["set"]>): ReturnType<Storage["set"]>;
    incr(...args: Parameters<Storage["incr"]>): ReturnType<Storage["incr"]>;
    get<T>(...args: Parameters<Storage["get"]>): ReturnType<Storage["get"]>;
    exportAuthString(apiId_?: number | null): Promise<string>;
    importAuthString(string: string): Promise<void>;
    commit(force?: boolean): Promise<void>;
    setTlObject(key: readonly StorageKeyPart[], value: Api.AnyType | null): Promise<void>;
    getTlObject(keyOrBuffer: Api.AnyType | Uint8Array | readonly StorageKeyPart[]): Promise<Api.DeserializedType | null>;
    setState(state: Api.updates_State): Promise<void>;
    getState(): Promise<Api.updates_State | null>;
    setMessage(chatId: number, messageId: number, message: Api.Message | null): Promise<void>;
    deleteMessages(): Promise<void>;
    getMessageChat(messageId: number): MaybePromise<number | null>;
    getMessage(chatId: number, messageId: number): Promise<Api.Message | null>;
    setPeer(peer_: Api.user | Api.chat | Api.chatForbidden | Api.channel | Api.channelForbidden): void;
    setPeer2(chatP: ChatP, accessHash: bigint): void;
    getAccountId(): Promise<number | null>;
    setIsPremium(isPremium: boolean): Promise<void>;
    getIsPremium(): Promise<boolean | null>;
    updateStickerSetName(id: bigint, accessHash: bigint, name: string): Promise<void>;
    getStickerSetName(id: bigint, accessHash: bigint): MaybePromise<[string, Date] | null>;
    setServerSalt(serverSalt: bigint): Promise<void>;
    getServerSalt(): MaybePromise<bigint | null>;
    getHistory(chatId: number, offsetId: number, limit: number): Promise<Api.Message[]>;
    getFile(id: bigint): Promise<[number, number] | null>;
    iterFileParts(id: bigint, partCount: number, offset: number, signal: AbortSignal | undefined): AsyncGenerator<Uint8Array>;
    saveFilePart(id: bigint, index: number, bytes: Uint8Array): Promise<void>;
    setFilePartCount(id: bigint, partCount: number, chunkSize: number): Promise<void>;
    setCustomEmojiDocument(id: bigint, document: Api.document): Promise<void>;
    getCustomEmojiDocument(id: bigint): Promise<[Api.document, Date] | null>;
    setBusinessConnection(id: string, connection: Api.botBusinessConnection | null): Promise<void>;
    getBusinessConnection(id: string): Promise<Api.botBusinessConnection | null>;
    setInlineQueryAnswer(userId: number, chatId: number, query: string, offset: string, results: Api.messages_botResults, date: Date): Promise<void>;
    getInlineQueryAnswer(userId: number, chatId: number, query: string, offset: string): Promise<[Api.messages_botResults, Date] | null>;
    setCallbackQueryAnswer(chatId: number, messageId: number, question: string, answer: Api.messages_botCallbackAnswer): Promise<void>;
    getCallbackQueryAnswer(chatId: number, messageId: number, question: string): Promise<[Api.messages_botCallbackAnswer, Date] | null>;
    setFullChat(chatId: number, fullChat: Api.userFull | Api.channelFull | Api.chatFull | null): Promise<void>;
    getFullChat(chatId: number): Promise<Api.userFull | Api.channelFull | Api.chatFull | null>;
    setGroupCall(id: bigint, groupCall: Api.groupCall | null): Promise<void>;
    getGroupCall(id: bigint): Promise<Api.groupCall | null>;
    setGroupCallAccessHash(id: bigint, accessHash: bigint | null): Promise<void>;
    getGroupCallAccessHash(id: bigint): Promise<bigint | null>;
    setUpdate(boxId: bigint, update: Api.Update): Promise<void>;
    deleteUpdates(): Promise<void>;
    getFirstUpdate(boxId: bigint): Promise<[readonly StorageKeyPart[], Api.Update] | null>;
    assertUser(source: string): void;
    assertBot(source: string): void;
    get isBot(): boolean;
    getChannelAccessHash(id: number): Promise<bigint | null>;
    getUserAccessHash(id: number): Promise<bigint | null>;
    deleteFiles(): Promise<void>;
    deleteCustomEmojiDocuments(): Promise<void>;
    deleteBusinessConnections(): Promise<void>;
    deleteInlineQueryAnswers(): Promise<void>;
    deleteCallbackQueryAnswers(): Promise<void>;
    deleteFullChats(): Promise<void>;
    deleteGroupCalls(): Promise<void>;
    deleteStickerSetNames(): Promise<void>;
    clear(): Promise<void>;
    reset(): Promise<void>;
    setPollResults(pollId: bigint, pollResults: Api.pollResults): Promise<void>;
    getPollResults(pollId: bigint): Promise<Api.pollResults | null>;
    deletePollResults(): Promise<void>;
    setPoll(pollId: bigint, poll: Api.poll): Promise<void>;
    getPoll(pollId: bigint): Promise<Api.poll | null>;
    deletePolls(): Promise<void>;
    setVoiceTranscription(voiceTranscription: VoiceTranscription): Promise<void>;
    getVoiceTranscription(transcriptionId: bigint): Promise<VoiceTranscription | null>;
    deleteVoiceTranscriptions(): Promise<void>;
    setVoiceTranscriptionReference(chatId: number, messageId: number, messageEditDate: Date, transcriptionId: bigint): Promise<void>;
    getVoiceTranscriptionReference(chatId: number, messageId: number, messageEditDate: Date): Promise<bigint | null>;
    deleteVoiceTranscriptionReferences(): Promise<void>;
}
declare class StorageMap<K extends StorageKeyPart[], V> {
    #private;
    constructor(storage: Storage, path: StorageKeyPart);
    set(key: K, value: V): void;
    get pendingUpdateCount(): number;
    mustGet(key: K): (V & {}) | null;
    clear(): Promise<void>;
    get(key: K): Promise<V | null>;
    commit(): Promise<void>;
}
declare class StorageValue<T> {
    #private;
    constructor(storage: Storage, path: StorageKeyPart);
    set(value: T | null): void;
    get isUpdatePending(): boolean;
    mustGet(): T | null;
    get(): Promise<T | null>;
    commit(): Promise<void>;
}
interface Auth {
    apiId: number;
    authKey: Uint8Array<ArrayBuffer> | null;
    dc: DC | null;
    isBot: boolean;
    userId: number;
}
declare class StorageAuth extends StorageValue<Auth> {
    #private;
    constructor(storage: Storage);
    get(): Promise<Auth | null>;
    mustGet(): Auth;
    set(auth: Auth | null): Promise<void>;
    update(fn: (auth: Auth) => void): Promise<void>;
    get authKeyId(): bigint | null;
}
export {};
//# sourceMappingURL=0_storage_operations.d.ts.map