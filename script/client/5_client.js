"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.handleMigrationError = exports.restartAuth = void 0;
const _0_deps_js_1 = require("../0_deps.js");
const _0_errors_js_1 = require("../0_errors.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_storage_js_1 = require("../2_storage.js");
const _2_tl_js_1 = require("../2_tl.js");
const _3_transport_js_1 = require("../3_transport.js");
const _3_types_js_1 = require("../3_types.js");
const _4_constants_js_1 = require("../4_constants.js");
const _4_errors_js_1 = require("../4_errors.js");
const _2_telegram_js_1 = require("../tl/2_telegram.js");
const _0_abortable_loop_js_1 = require("./0_abortable_loop.js");
const _0_storage_operations_js_1 = require("./0_storage_operations.js");
const _0_utilities_js_1 = require("./0_utilities.js");
const _1_invoke_middleware_js_1 = require("./1_invoke_middleware.js");
const _2_account_manager_js_1 = require("./2_account_manager.js");
const _2_bot_info_manager_js_1 = require("./2_bot_info_manager.js");
const _2_business_connection_manager_js_1 = require("./2_business_connection_manager.js");
const _2_client_encrypted_js_1 = require("./2_client_encrypted.js");
const _2_file_manager_js_1 = require("./2_file_manager.js");
const _2_network_statistics_manager_js_1 = require("./2_network_statistics_manager.js");
const _2_payment_manager_js_1 = require("./2_payment_manager.js");
const _2_reaction_manager_js_1 = require("./2_reaction_manager.js");
const _2_sign_in_js_1 = require("./2_sign_in.js");
const _2_translations_manager_js_1 = require("./2_translations_manager.js");
const _2_update_manager_js_1 = require("./2_update_manager.js");
const _3_client_encrypted_pool_js_1 = require("./3_client_encrypted_pool.js");
const _3_message_manager_js_1 = require("./3_message_manager.js");
const _3_video_chat_manager_js_1 = require("./3_video_chat_manager.js");
const _4_callback_query_manager_js_1 = require("./4_callback_query_manager.js");
const _4_chat_list_manager_js_1 = require("./4_chat_list_manager.js");
const _4_chat_manager_js_1 = require("./4_chat_manager.js");
const _4_composer_js_1 = require("./4_composer.js");
const _4_forum_manager_js_1 = require("./4_forum_manager.js");
const _4_gift_manager_js_1 = require("./4_gift_manager.js");
const _4_inline_query_manager_js_1 = require("./4_inline_query_manager.js");
const _4_link_preview_manager_js_1 = require("./4_link_preview_manager.js");
const _4_poll_manager_js_1 = require("./4_poll_manager.js");
const _4_story_manager_js_1 = require("./4_story_manager.js");
var _2_sign_in_js_2 = require("./2_sign_in.js");
Object.defineProperty(exports, "restartAuth", { enumerable: true, get: function () { return _2_sign_in_js_2.restartAuth; } });
exports.handleMigrationError = Symbol("handleMigrationError");
// global Client ID counter for logs
let id = 0;
const getPeer = Symbol();
const mustGetPeer = Symbol();
class Client extends _4_composer_js_1.Composer {
    #clients = new Array();
    #downloadPools = {};
    #uploadPools = {};
    #guaranteeUpdateDelivery;
    #accountManager;
    #botInfoManager;
    #businessConnectionManager;
    #fileManager;
    #networkStatisticsManager;
    #paymentManager;
    #reactionManager;
    #translationsManager;
    #updateManager;
    #messageManager;
    #videoChatManager;
    #callbackQueryManager;
    #chatListManager;
    #chatManager;
    #forumManager;
    #giftManager;
    #inlineQueryManager;
    #linkPreviewManager;
    #pollManager;
    #storyManager;
    #managers;
    get managers() {
        return this.#managers ?? (this.#managers ??= {
            accountManager: this.#accountManager,
            botInfoManager: this.#botInfoManager,
            businessConnectionManager: this.#businessConnectionManager,
            fileManager: this.#fileManager,
            networkStatisticsManager: this.#networkStatisticsManager,
            paymentManager: this.#paymentManager,
            reactionManager: this.#reactionManager,
            translationsManager: this.#translationsManager,
            updateManager: this.#updateManager,
            messageManager: this.#messageManager,
            videoChatManager: this.#videoChatManager,
            callbackQueryManager: this.#callbackQueryManager,
            chatListManager: this.#chatListManager,
            chatManager: this.#chatManager,
            forumManager: this.#forumManager,
            giftManager: this.#giftManager,
            inlineQueryManager: this.#inlineQueryManager,
            linkPreviewManager: this.#linkPreviewManager,
            pollManager: this.#pollManager,
            storyManager: this.#storyManager,
        });
    }
    #storage_;
    #messageStorage_;
    storage;
    messageStorage;
    #parseMode;
    #apiId;
    #apiHash;
    #transportProvider;
    appVersion;
    deviceModel;
    language;
    platform;
    systemLangCode;
    systemVersion;
    #publicKeys;
    #outgoingMessages;
    #persistCache;
    #disableUpdates;
    #authString;
    #initialDc;
    #L;
    #LsignIn;
    #LupdateGapRecoveryLoop;
    #LstorageWriteLoop;
    #LhandleMigrationError;
    #Lmin;
    constructor(params) {
        super();
        this.#apiId = params?.apiId ?? 0;
        this.#apiHash = params?.apiHash ?? "";
        this.#transportProvider = params?.transportProvider;
        this.#initialDc = params?.initialDc ?? _4_constants_js_1.INITIAL_DC;
        this.#storage_ = params?.storage || new _2_storage_js_1.StorageMemory();
        this.#persistCache = params?.persistCache ?? false;
        if (!this.#persistCache) {
            this.#messageStorage_ = new _2_storage_js_1.StorageMemory();
        }
        else {
            this.#messageStorage_ = this.#storage_;
        }
        this.storage = new _0_storage_operations_js_1.StorageOperations(this.#storage_);
        this.messageStorage = new _0_storage_operations_js_1.StorageOperations(this.#messageStorage_);
        this.#parseMode = params?.parseMode ?? null;
        this.#disableUpdates = params?.disableUpdates ?? false;
        this.#authString = params?.authString;
        this.appVersion = params?.appVersion ?? _4_constants_js_1.APP_VERSION;
        this.deviceModel = params?.deviceModel ?? _4_constants_js_1.DEVICE_MODEL;
        this.language = params?.language ?? _4_constants_js_1.LANG_CODE;
        this.platform = params?.platform ?? _4_constants_js_1.LANG_PACK;
        this.systemLangCode = params?.systemLangCode ?? _4_constants_js_1.SYSTEM_LANG_CODE;
        this.systemVersion = params?.systemVersion ?? _4_constants_js_1.SYSTEM_VERSION;
        this.#publicKeys = params?.publicKeys;
        this.#outgoingMessages = params?.outgoingMessages ?? false;
        this.#guaranteeUpdateDelivery = params?.guaranteeUpdateDelivery ?? false;
        const L = this.#L = (0, _1_utilities_js_1.getLogger)("Client").client(id++);
        this.#LsignIn = L.branch("signIn");
        this.#LupdateGapRecoveryLoop = L.branch("updateGapRecoveryLoop");
        this.#LstorageWriteLoop = L.branch("storageWriteLoop");
        this.#LhandleMigrationError = L.branch("[handleMigrationError]");
        this.#Lmin = L.branch("min");
        const c = {
            id,
            getUploadPoolSize: this.#getUploadPoolSize.bind(this),
            invoke: async (function_, params) => {
                if (params?.businessConnectionId) {
                    if (_2_tl_js_1.Mtproto.is("ping", function_)) {
                        (0, _0_deps_js_1.unreachable)();
                    }
                    return await this.invoke({ _: "invokeWithBusinessConnection", connection_id: params.businessConnectionId, query: function_ }, params);
                }
                else {
                    return await this.invoke(function_, params);
                }
            },
            storage: this.storage,
            messageStorage: this.messageStorage,
            guaranteeUpdateDelivery: this.#guaranteeUpdateDelivery,
            setConnectionState: this.#propagateConnectionState.bind(this),
            resetConnectionState: () => this.#stateChangeHandler(this.connected),
            getSelfId: this.#getSelfId.bind(this),
            getIsPremium: this.#getIsPremium.bind(this),
            getInputPeer: this.getInputPeer.bind(this),
            getInputChannel: this.getInputChannel.bind(this),
            getInputUser: this.getInputUser.bind(this),
            getInputPeerChatId: this.#getInputPeerChatId.bind(this),
            getPeer: this[mustGetPeer].bind(this),
            handleUpdate: this.#queueHandleCtxUpdate.bind(this),
            parseMode: this.#parseMode,
            outgoingMessages: this.#outgoingMessages,
            dropPendingUpdates: params?.dropPendingUpdates,
            disconnected: () => this.disconnected,
            langPack: this.platform,
            langCode: this.language,
        };
        this.#accountManager = new _2_account_manager_js_1.AccountManager(c);
        this.#botInfoManager = new _2_bot_info_manager_js_1.BotInfoManager(c);
        this.#businessConnectionManager = new _2_business_connection_manager_js_1.BusinessConnectionManager(c);
        const fileManager = this.#fileManager = new _2_file_manager_js_1.FileManager(c);
        this.#networkStatisticsManager = new _2_network_statistics_manager_js_1.NetworkStatisticsManager(c);
        this.#paymentManager = new _2_payment_manager_js_1.PaymentManager(c);
        this.#reactionManager = new _2_reaction_manager_js_1.ReactionManager(c);
        this.#translationsManager = new _2_translations_manager_js_1.TranslationsManager(c);
        this.#updateManager = new _2_update_manager_js_1.UpdateManager(c);
        const messageManager = this.#messageManager = new _3_message_manager_js_1.MessageManager({ ...c, fileManager });
        this.#videoChatManager = new _3_video_chat_manager_js_1.VideoChatManager({ ...c, fileManager });
        this.#callbackQueryManager = new _4_callback_query_manager_js_1.CallbackQueryManager({ ...c, messageManager });
        this.#chatListManager = new _4_chat_list_manager_js_1.ChatListManager({ ...c, fileManager, messageManager });
        this.#chatManager = new _4_chat_manager_js_1.ChatManager({ ...c, fileManager, messageManager });
        this.#forumManager = new _4_forum_manager_js_1.ForumManager({ ...c, messageManager });
        this.#giftManager = new _4_gift_manager_js_1.GiftManager({ ...c, messageManager });
        this.#inlineQueryManager = new _4_inline_query_manager_js_1.InlineQueryManager({ ...c, messageManager });
        this.#linkPreviewManager = new _4_link_preview_manager_js_1.LinkPreviewManager({ ...c, messageManager });
        this.#pollManager = new _4_poll_manager_js_1.PollManager({ ...c, messageManager });
        this.#storyManager = new _4_story_manager_js_1.StoryManager({ ...c, fileManager, messageManager });
        this.#updateManager.setUpdateHandler(this.#handleUpdate.bind(this));
        if (params?.defaultHandlers ?? true) {
            this.invoke.use(async ({ error }, next) => {
                if (error instanceof _4_errors_js_1.FloodWait && error.seconds <= 10) {
                    L.warning("sleeping for", error.seconds, "because of:", error);
                    await (0, _0_deps_js_1.delay)(error.seconds * _0_deps_js_1.SECOND);
                    return true;
                }
                else {
                    return next();
                }
            });
        }
    }
    #setMainClient(client) {
        this.#disconnectAllClients();
        this.#clients = [client];
        client.handlers.onUpdate = (updates) => {
            this.#updateManager.processUpdates(updates, true, null);
            this.#lastUpdates = new Date();
        };
        client.handlers.onDeserializationError = async () => {
            await this.#updateManager.recoverUpdateGap("deserialization error");
        };
        client.handlers.onNewServerSalt = async (serverSalt) => {
            await this.storage.setServerSalt(serverSalt);
        };
        client.onConnectionStateChange = this.#onConnectionStateChange.bind(this);
    }
    #newClient(dc, main, cdn) {
        const client = new _2_client_encrypted_js_1.ClientEncrypted(dc, this.#apiId, {
            appVersion: this.appVersion,
            deviceModel: this.deviceModel,
            langCode: this.language,
            langPack: this.platform,
            systemLangCode: this.systemLangCode,
            systemVersion: this.systemVersion,
            transportProvider: this.#transportProvider,
            cdn,
            disableUpdates: !main || cdn,
            publicKeys: this.#publicKeys,
        });
        client.connectionCallback = this.#networkStatisticsManager.getTransportReadWriteCallback(cdn);
        return client;
    }
    #disconnectAllClients() {
        for (const client of this.#clients) {
            client.disconnect();
        }
        for (const pool of Object.values(this.#downloadPools)) {
            pool.disconnect();
        }
        for (const pool of Object.values(this.#uploadPools)) {
            pool.disconnect();
        }
    }
    get #client() {
        return this.#clients[0];
    }
    get connected() {
        return this.#client?.connected ?? false;
    }
    get disconnected() {
        return this.#client?.disconnected ?? true;
    }
    #propagateConnectionState(connectionState) {
        this.#queueHandleCtxUpdate({ connectionState });
        this.#lastPropagatedConnectionState = connectionState;
    }
    #lastPropagatedConnectionState = null;
    #stateChangeHandler = ((connected) => {
        const connectionState = connected ? "ready" : "notConnected";
        if (this.#lastPropagatedConnectionState !== connectionState) {
            this.#propagateConnectionState(connectionState);
        }
    }).bind(this);
    #storageInited = false;
    async #initStorage() {
        if (!this.#storageInited) {
            await this.storage.initialize();
            if (!this.#guaranteeUpdateDelivery) {
                await this.storage.deleteUpdates();
                await this.storage.commit(true);
            }
            this.#storageInited = true;
        }
    }
    #connectMutex = new _1_utilities_js_1.Mutex();
    async connect() {
        const unlock = await this.#connectMutex.lock();
        try {
            if (this.connected) {
                return;
            }
            await this.#initStorage();
            if (this.#authString && !this.#authStringImported) {
                await this.importAuthString(this.#authString);
            }
            const auth = this.storage.auth.mustGet();
            if (auth.authKey !== null && auth.dc !== null) {
                if (!this.#client || this.#client.dc !== auth.dc) {
                    this.#client?.disconnect();
                    this.#setMainClient(this.#newClient(auth.dc, true, false));
                }
                await this.#client.setAuthKey(auth.authKey);
                if (this.#client.serverSalt === 0n) {
                    this.#client.serverSalt = await this.storage.getServerSalt() ?? 0n;
                }
            }
            else {
                const dc = auth.dc ?? this.#initialDc;
                if (!this.#client || this.#client.dc !== dc) {
                    this.#client?.disconnect();
                    this.#setMainClient(this.#newClient(dc, true, false));
                }
            }
            await this.#client.connect();
            await this.storage.auth.update((v) => {
                v.authKey = this.#client.authKey;
                v.dc = this.#client.dc;
            });
            await this.storage.setServerSalt(this.#client.serverSalt);
            this.#updateGapRecoveryLoop.start();
            this.#clientDisconnectionLoop.start();
            if (!this.#messageStorage_.isMemory) {
                this.#storageWriteLoop.start();
            }
            else {
                this.#L.debug("not starting storageWriteLoop");
            }
            await this.storage.commit(true);
        }
        finally {
            unlock();
        }
    }
    async [exports.handleMigrationError](err) {
        let newDc = String(err.dc);
        if (Math.abs((0, _3_transport_js_1.getDcId)(this.#client.dc, this.#client.cdn)) >= 10_000) {
            newDc += "-test";
        }
        this.disconnect();
        await this.storage.auth.update((v) => {
            v.authKey = null;
            v.dc = newDc;
        });
        await this.connect();
        this.#LhandleMigrationError.debug(`migrated to DC${newDc}`);
    }
    async disconnect() {
        this.#disconnectAllClients();
        this.#clientDisconnectionLoop.abort();
        this.#updateGapRecoveryLoop.abort();
        this.#storageWriteLoop.abort();
        this.#updateManager.closeAllChats();
        await this.messageStorage.commit(true);
    }
    #lastPropagatedAuthorizationState = null;
    async #propagateAuthorizationState(authorized) {
        if (this.#lastPropagatedAuthorizationState !== authorized) {
            await this.#handleCtxUpdate({ authorizationState: { isAuthorized: authorized } });
            this.#lastPropagatedAuthorizationState = authorized;
        }
    }
    async #getSelfId() {
        const id = await this.storage.getAccountId();
        if (id === null) {
            throw new Error("Unauthorized");
        }
        return id;
    }
    async #getIsPremium() {
        const maybeIsPremium = await this.storage.getIsPremium();
        if (maybeIsPremium !== null) {
            return maybeIsPremium;
        }
        return this.#lastGetMe?.isPremium ?? false;
    }
    #lastUpdates = new Date();
    #updateGapRecoveryLoop = new _0_abortable_loop_js_1.AbortableLoop(async (loop, signal) => {
        await (0, _0_deps_js_1.delay)(60 * _0_deps_js_1.SECOND, { signal });
        if (!this.connected) {
            loop.abort();
            return;
        }
        if (Date.now() - this.#lastUpdates.getTime() >= 15 * _0_deps_js_1.MINUTE) {
            (0, _1_utilities_js_1.drop)(this.#updateManager.recoverUpdateGap("lastUpdates").then(() => {
                this.#lastUpdates = new Date();
            }));
        }
    }, (loop, err) => {
        if (!this.connected) {
            loop.abort();
        }
        else {
            this.#LupdateGapRecoveryLoop.error(err);
        }
    });
    #clientDisconnectionLoop = new _0_abortable_loop_js_1.AbortableLoop(async (loop, signal) => {
        await (0, _0_deps_js_1.delay)(60 * _0_deps_js_1.SECOND, { signal });
        if (!this.connected) {
            loop.abort();
            return;
        }
        const now = Date.now();
        const disconnectAfter = 5 * _0_deps_js_1.MINUTE;
        for (const [i, client] of this.#clients.entries()) {
            if (i > 0 && !client.disconnected && client.lastRequest && now - client.lastRequest.getTime() >= disconnectAfter) {
                client?.disconnect();
            }
        }
    }, (loop) => {
        if (!this.connected) {
            loop.abort();
        }
    });
    #storageWriteLoop = new _0_abortable_loop_js_1.AbortableLoop(async (_loop, signal) => {
        await (0, _0_deps_js_1.delay)(60 * _0_deps_js_1.SECOND, { signal });
        await this.messageStorage.commit();
        await this.storage.commit();
    }, (err) => {
        this.#LstorageWriteLoop.error(err);
    });
    async #checkAuthorization() {
        if (this.#lastGetMe) {
            return this.#lastGetMe;
        }
        try {
            await this.#updateManager.fetchState("#checkAuthorization");
            const me = await this.#getMe();
            await this.#propagateAuthorizationState(true);
            (0, _1_utilities_js_1.drop)(this.#updateManager.recoverUpdateGap("#checkAuthorization"));
            return me;
        }
        catch (err) {
            if (!(err instanceof _4_errors_js_1.AuthKeyUnregistered) && !(err instanceof _4_errors_js_1.SessionRevoked)) {
                throw err;
            }
        }
    }
    async sendCode(phoneNumber) {
        const me = await this.#checkAuthorization();
        if (me) {
            return;
        }
        try {
            await this.#accountManager.sendCode(phoneNumber, this.#apiId, this.#apiHash);
        }
        catch (err) {
            if (err instanceof _4_errors_js_1.Migrate) {
                await this[exports.handleMigrationError](err);
                await this.#accountManager.sendCode(phoneNumber, this.#apiId, this.#apiHash);
            }
            else {
                throw err;
            }
        }
    }
    async checkCode(code) {
        const result = await this.#accountManager.checkCode(code);
        if (result.type === "signed_in") {
            await this.storage.auth.update((v) => {
                v.userId = result.userId;
                v.isBot = false;
            });
            this.#LsignIn.debug("signed in as user");
            await this.#propagateAuthorizationState(true);
            await this.#updateManager.fetchState("checkCode");
        }
        return result;
    }
    async getPasswordHint() {
        return await this.#accountManager.getPasswordHint();
    }
    async checkPassword(password) {
        const result = await this.#accountManager.checkPassword(password);
        if (result.type === "signed_in") {
            await this.storage.auth.update((v) => {
                v.userId = result.userId;
                v.isBot = false;
            });
            await this.storage.commit(true);
            this.#LsignIn.debug("signed in as user");
            await this.#propagateAuthorizationState(true);
            await this.#updateManager.fetchState("checkPassword");
        }
        return result;
    }
    async checkBotToken(botToken) {
        const me = await this.#checkAuthorization();
        if (me) {
            return {
                type: "signed_in",
                userId: me.id,
            };
        }
        while (true) {
            try {
                const result = await this.#accountManager.checkBotToken(botToken, this.#apiId, this.#apiHash);
                if (result.type === "signed_in") {
                    await this.storage.auth.update((v) => {
                        v.userId = result.userId;
                        v.isBot = true;
                    });
                    await this.storage.commit(true);
                    this.#LsignIn.debug("signed in as bot");
                    await this.#propagateAuthorizationState(true);
                    await this.#updateManager.fetchState("checkBotToken");
                }
                return result;
            }
            catch (err) {
                if (err instanceof _4_errors_js_1.Migrate) {
                    await this[exports.handleMigrationError](err);
                    continue;
                }
                else {
                    throw err;
                }
            }
        }
    }
    async signIn(params) {
        await (0, _2_sign_in_js_1.signIn)(this, this.#LsignIn, params);
    }
    async signOut() {
        try {
            await Promise.all([
                this.storage.reset(),
                this.invoke({ _: "auth.logOut" }).then(() => {
                    this.#propagateAuthorizationState(false);
                }),
            ]);
        }
        finally {
            this.#lastGetMe = null;
            this.disconnect();
            await this.connect();
        }
    }
    async start(params) {
        await this.connect();
        await this.signIn(params);
    }
    async #getClient(params) {
        let client;
        switch (params.type) {
            case undefined:
                client = await this.#getMainClient(params.dc);
                break;
            case "download":
                client = await this.#getDownloadClient(params.dc);
                break;
            case "upload":
                client = await this.#getUploadClient();
                break;
        }
        if (client !== this.#client && !this.disconnected && client.disconnected) {
            await client.connect();
        }
        return client;
    }
    #getMainClientMutex = new _1_utilities_js_1.Mutex();
    async #getMainClient(dc) {
        if (dc === undefined || dc === this.#client?.dc) {
            return this.#client;
        }
        let client = this.#clients.find((v) => v.dc === dc);
        if (client) {
            return client;
        }
        const unlock = await this.#getMainClientMutex.lock();
        client = this.#clients.find((v) => v.dc === dc);
        if (client) {
            return client;
        }
        try {
            client = this.#newClient(dc, false, false);
            await this.#setupClient(client);
            this.#clients.push(client);
            return client;
        }
        finally {
            unlock();
        }
    }
    async #getDownloadClient(dc) {
        dc ??= this.#client.dc;
        const pool = this.#downloadPools[dc] ??= new _3_client_encrypted_pool_js_1.ClientEncryptedPool();
        if (!pool.size) {
            if (!pool.size) {
                for (let i = 0; i < _0_utilities_js_1.DOWNLOAD_POOL_SIZE; ++i) {
                    pool.add(this.#newClient(dc, false, true));
                }
            }
        }
        const client = pool.nextClient();
        if (client.authKey.length) {
            return client;
        }
        await this.#setupClient(client);
        return client;
    }
    async #getUploadPoolSize() {
        const dc = this.#client.dc;
        return (dc !== "2" && dc !== "4") || await this.#getIsPremium() ? 8 : 4;
    }
    async #getUploadClient() {
        const dc = this.#client.dc;
        const poolSize = await this.#getUploadPoolSize();
        const pool = this.#uploadPools[dc] ??= new _3_client_encrypted_pool_js_1.ClientEncryptedPool();
        if (!pool.size) {
            for (let i = 0; i < poolSize; ++i) {
                pool.add(await this.#newClient(dc, false, true));
            }
        }
        const client = pool.nextClient();
        if (client.authKey.length) {
            return client;
        }
        await this.#setupClient(client);
        return client;
    }
    async #setupClient(client) {
        const storage = client.dc === this.#client.dc ? this.storage : new _0_storage_operations_js_1.StorageOperations(this.storage.provider.branch(client.dc + (client.cdn ? "_cdn" : "")));
        await storage.initialize();
        const auth = storage.auth.mustGet();
        const serverSalt = await storage.getServerSalt();
        if (auth.authKey !== null) {
            await client.setAuthKey(auth.authKey);
            if (serverSalt) {
                client.serverSalt = serverSalt;
            }
        }
        await client.connect();
        if (auth.authKey === null) {
            await this.#importAuthorization(client);
        }
        await storage.auth.update((v) => v.authKey = client.authKey);
        if (client.dc !== this.#client.dc) {
            await storage.setServerSalt(client.serverSalt);
            client.handlers.onNewServerSalt = async (serverSalt) => {
                await storage.setServerSalt(serverSalt);
            };
        }
    }
    async #importAuthorization(client) {
        if (this.#client.dc === client.dc && this.#client.cdn === client.cdn) {
            const auth = this.storage.auth.mustGet();
            const serverSalt = await this.storage.getServerSalt();
            if (auth.authKey !== null) {
                await client.setAuthKey(auth.authKey);
                if (serverSalt) {
                    client.serverSalt = serverSalt;
                }
            }
            return;
        }
        const exportedAuthorization = await this.#client.invoke({ _: "auth.exportAuthorization", dc_id: (0, _3_transport_js_1.getDcId)(client.dc, client.cdn) });
        await client.invoke({ ...exportedAuthorization, _: "auth.importAuthorization" });
    }
    async #invoke(function_, params) {
        if (!this.#client) {
            throw new _0_errors_js_1.ConnectionError("The connection is not open.");
        }
        let n = 1;
        let client;
        while (true) {
            client = params ? await this.#getClient(params) : this.#client;
            const main = client === this.#client;
            try {
                const result = await client.invoke(function_);
                if (main) {
                    try {
                        await this.#updateManager.processResult(result);
                    }
                    catch (err) {
                        this.#L.error("failed to process result:", err);
                    }
                    if (_2_tl_js_1.Api.isOfEnum("Update", result) || _2_tl_js_1.Api.isOfEnum("Updates", result)) {
                        return new Promise((resolve) => {
                            this.#updateManager.processUpdates(result, true, _2_tl_js_1.Mtproto.is("ping", function_) ? null : function_, () => resolve(result));
                        });
                    }
                }
                return result;
            }
            catch (err) {
                if (err instanceof _4_errors_js_1.AuthKeyUnregistered && !main) {
                    await this.#importAuthorization(client);
                    continue;
                }
                else if (err instanceof _0_errors_js_1.ConnectionError && !main && !this.disconnected) {
                    continue;
                }
                else if (await this.#handleInvokeError(Object.freeze({ client: this, error: err, function: function_, n: n++ }), () => Promise.resolve(false))) {
                    continue;
                }
                else {
                    throw err;
                }
            }
        }
    }
    #handleInvokeError = (0, _1_invoke_middleware_js_1.skipInvoke)();
    invoke = Object.assign(this.#invoke, {
        use: (handler) => {
            const handle = this.#handleInvokeError;
            this.#handleInvokeError = async (ctx, next) => {
                let result = null;
                return await handle(ctx, async () => {
                    if (result !== null)
                        return result;
                    result = await handler(ctx, next);
                    return result;
                });
            };
        },
    });
    exportAuthString() {
        return this.storage.exportAuthString(this.#apiId);
    }
    #authStringImported = false;
    async importAuthString(authString) {
        if (this.connected) {
            throw new Error("Cannot import auth string while the client is connected");
        }
        await this.#initStorage();
        await this.storage.importAuthString(authString);
        this.#authStringImported = true;
        if (!this.#apiId) {
            this.#apiId = this.storage.auth.mustGet().apiId;
        }
    }
    async #getUserAccessHash(userId) {
        const users = await this.invoke({ _: "users.getUsers", id: [{ _: "inputUser", user_id: userId, access_hash: 0n }] });
        const user = _2_tl_js_1.Api.is("user", users[0]) ? users[0] : undefined;
        return user?.access_hash ?? 0n;
    }
    async #getChannelAccessHash(channelId) {
        const channels = await this.invoke({ _: "channels.getChannels", id: [{ _: "inputChannel", channel_id: channelId, access_hash: 0n }] });
        const channel = _2_tl_js_1.Api.is("channel", channels.chats[0]) ? channels.chats[0] : undefined;
        return channel?.access_hash ?? 0n;
    }
    async getInputPeer(id) {
        if (id === "me" || id === await this.#getSelfId()) {
            return { _: "inputPeerSelf" };
        }
        const inputPeer = await this.#getInputPeerInner(id);
        if (((_2_tl_js_1.Api.is("inputPeerUser", inputPeer) || _2_tl_js_1.Api.is("inputPeerChannel", inputPeer)) && inputPeer.access_hash === 0n) && this.storage.isBot) {
            if ("channel_id" in inputPeer) {
                inputPeer.access_hash = await this.#getChannelAccessHash(inputPeer.channel_id);
            }
            else {
                inputPeer.access_hash = await this.#getUserAccessHash(inputPeer.user_id);
            }
        }
        if ((_2_tl_js_1.Api.is("inputPeerUser", inputPeer) || _2_tl_js_1.Api.is("inputPeerChannel", inputPeer)) && inputPeer.access_hash === 0n) {
            throw new _0_errors_js_1.AccessError(`The chat ${id} cannot be accessed.`);
        }
        return inputPeer;
    }
    async #getInputPeerChatId(inputPeer) {
        if (_2_tl_js_1.Api.isOneOf(["inputPeerSelf", "inputUserSelf"], inputPeer)) {
            return await this.#getSelfId();
        }
        else if (_2_tl_js_1.Api.isOneOf(["inputPeerEmpty", "inputUserEmpty", "inputChannelEmpty"], inputPeer)) {
            (0, _0_deps_js_1.unreachable)();
        }
        else {
            return _2_tl_js_1.Api.peerToChatId(inputPeer);
        }
    }
    async getInputChannel(id) {
        const inputPeer = await this.getInputPeer(id);
        if (!(0, _0_utilities_js_1.canBeInputChannel)(inputPeer)) {
            throw new TypeError(`The chat ${id} is not a channel neither a supergroup.`);
        }
        return (0, _0_utilities_js_1.toInputChannel)(inputPeer);
    }
    async getInputUser(id) {
        const inputPeer = await this.getInputPeer(id);
        if (!(0, _0_utilities_js_1.canBeInputUser)(inputPeer)) {
            throw new TypeError(`The chat ${id} is not a private chat.`);
        }
        return (0, _0_utilities_js_1.toInputUser)(inputPeer);
    }
    async #getInputPeerInner(id) {
        const idn = Number(id);
        if (!isNaN(idn)) {
            id = idn;
        }
        let peer;
        if (typeof id === "string") {
            id = (0, _0_utilities_js_1.getUsername)(id);
            let resolvedId = 0;
            const maybeUsername = await this.messageStorage.usernames.get([id]);
            if (maybeUsername !== null && Date.now() - maybeUsername[1].getTime() < _4_constants_js_1.USERNAME_TTL) {
                const [id] = maybeUsername;
                resolvedId = id;
            }
            else {
                const resolved = await this.invoke({ _: "contacts.resolveUsername", username: id });
                this.#updateManager.processChats(resolved.chats, resolved);
                this.#updateManager.processUsers(resolved.users, resolved);
                if (_2_tl_js_1.Api.is("peerUser", resolved.peer)) {
                    resolvedId = _2_tl_js_1.Api.peerToChatId(resolved.peer);
                }
                else if (_2_tl_js_1.Api.is("peerChannel", resolved.peer)) {
                    resolvedId = _2_tl_js_1.Api.peerToChatId(resolved.peer);
                }
                else {
                    (0, _0_deps_js_1.unreachable)();
                }
            }
            const resolvedIdType = _2_tl_js_1.Api.getChatIdPeerType(resolvedId);
            if (resolvedIdType === "user") {
                const accessHash = await this.messageStorage.getUserAccessHash(resolvedId);
                peer = { _: "inputPeerUser", user_id: _2_tl_js_1.Api.chatIdToPeerId(resolvedId), access_hash: accessHash ?? 0n };
            }
            else if (resolvedIdType === "channel") {
                const accessHash = await this.messageStorage.getChannelAccessHash(resolvedId);
                peer = { _: "inputPeerChannel", channel_id: _2_tl_js_1.Api.chatIdToPeerId(resolvedId), access_hash: accessHash ?? 0n };
            }
            else {
                (0, _0_deps_js_1.unreachable)();
            }
        }
        else if (id > 0) {
            const accessHash = await this.messageStorage.getUserAccessHash(id);
            peer = { _: "inputPeerUser", user_id: _2_tl_js_1.Api.chatIdToPeerId(id), access_hash: accessHash ?? 0n };
        }
        else if (-_4_constants_js_1.MAX_CHAT_ID <= id) {
            peer = { _: "inputPeerChat", chat_id: BigInt(Math.abs(id)) };
        }
        else if (_1_utilities_js_1.ZERO_CHANNEL_ID - _4_constants_js_1.MAX_CHANNEL_ID <= id && id !== _1_utilities_js_1.ZERO_CHANNEL_ID) {
            const accessHash = await this.messageStorage.getChannelAccessHash(id);
            peer = { _: "inputPeerChannel", channel_id: _2_tl_js_1.Api.chatIdToPeerId(id), access_hash: accessHash ?? 0n };
        }
        else {
            throw new _0_errors_js_1.InputError("The ID is of an format unknown.");
        }
        if (!_2_tl_js_1.Api.is("inputPeerChat", peer) && !peer.access_hash) {
        }
        return peer;
    }
    async #getMinInputPeer(type, reference) {
        const peer_ = await this.messageStorage.peers.get([reference.chatId]);
        if (peer_ !== null && (peer_[0].type === "channel" || peer_[0].type === "supergroup")) {
            const peer = { _: "inputPeerChannel", channel_id: BigInt(peer_[0].id), access_hash: peer_[1] };
            if (type === "user") {
                return { _: "inputPeerUserFromMessage", peer, msg_id: reference.messageId, user_id: _2_tl_js_1.Api.chatIdToPeerId(reference.senderId) };
            }
            else {
                return { _: "inputPeerChannelFromMessage", peer, msg_id: reference.messageId, channel_id: _2_tl_js_1.Api.chatIdToPeerId(reference.senderId) };
            }
        }
        else {
            return null;
        }
    }
    async [getPeer](peer) {
        const id = _2_tl_js_1.Api.peerToChatId(peer);
        const entity = await this.messageStorage.peers.get([id]);
        if (entity === null) {
            if (entity === null && this.storage.isBot && _2_tl_js_1.Api.is("peerUser", peer) || _2_tl_js_1.Api.is("peerChannel", peer)) {
                await this.getInputPeer(id);
            }
            else {
                return entity;
            }
        }
        return await this.messageStorage.peers.get([id]);
    }
    [mustGetPeer](peer) {
        return this.messageStorage.peers.mustGet([(0, _2_telegram_js_1.peerToChatId)(peer)]);
    }
    async #handleCtxUpdate(update) {
        if (this.#disableUpdates && !("authorizationState" in update) && !("connectionState" in update)) {
            return;
        }
        try {
            await this.handleUpdate(this, update);
        }
        catch (err) {
            this.#L.error("Failed to handle update:", err);
            throw err;
        }
    }
    #queueHandleCtxUpdate(update) {
        this.#updateManager.getHandleUpdateQueue(_2_update_manager_js_1.UpdateManager.MAIN_BOX_ID).add(async () => {
            await this.#handleCtxUpdate(update);
        });
    }
    async #handleUpdate(update) {
        const maybePromises = new Array();
        if (_2_tl_js_1.Api.is("updateUserName", update)) {
            const value = [Number(update.user_id), new Date()];
            for (const username_ of update.usernames) {
                const username = username_.username.toLowerCase();
                this.messageStorage.usernames.set([username], value);
            }
            const peer = { ...update, _: "peerUser" };
            const peer_ = await this[getPeer](peer);
            if (peer_ !== null) {
                const username = update.usernames[0];
                if (username !== undefined) {
                    peer_[0].username = username.username;
                    const also = update.usernames.filter((v) => v !== username);
                    if (also.length) {
                        peer_[0].also = also.map((v) => v.username);
                    }
                    else {
                        delete peer_[0].also;
                    }
                }
                else {
                    delete peer_[0].username;
                }
                this.messageStorage.setPeer2(peer_[0], peer_[1]);
            }
        }
        if (this.#messageManager.canHandleUpdate(update)) {
            maybePromises.push(() => this.#messageManager.handleUpdate(update));
        }
        if (this.#chatManager.canHandleUpdate(update)) {
            maybePromises.push(() => this.#chatManager.handleUpdate(update));
        }
        if (this.#pollManager.canHandleUpdate(update)) {
            maybePromises.push(() => this.#pollManager.handleUpdate(update));
        }
        if (this.#videoChatManager.canHandleUpdate(update)) {
            maybePromises.push(() => this.#videoChatManager.handleUpdate(update));
        }
        if (this.#callbackQueryManager.canHandleUpdate(update)) {
            maybePromises.push(() => this.#callbackQueryManager.handleUpdate(update));
        }
        if (this.#inlineQueryManager.canHandleUpdate(update)) {
            maybePromises.push(() => this.#inlineQueryManager.handleUpdate(update));
        }
        if (this.#linkPreviewManager.canHandleUpdate(update)) {
            maybePromises.push(() => this.#linkPreviewManager.handleUpdate(update));
        }
        if (this.#reactionManager.canHandleUpdate(update)) {
            maybePromises.push(() => this.#reactionManager.handleUpdate(update));
        }
        if (this.#chatListManager.canHandleUpdate(update)) {
            maybePromises.push(() => this.#chatListManager.handleUpdate(update));
        }
        if (this.#storyManager.canHandleUpdate(update)) {
            maybePromises.push(() => this.#storyManager.handleUpdate(update));
        }
        if (this.#businessConnectionManager.canHandleUpdate(update)) {
            maybePromises.push(() => this.#businessConnectionManager.handleUpdate(update));
        }
        if (this.#storyManager.canHandleUpdate(update)) {
            maybePromises.push(() => this.#storyManager.handleUpdate(update));
        }
        if (this.#paymentManager.canHandleUpdate(update)) {
            maybePromises.push(() => this.#paymentManager.handleUpdate(update));
        }
        if (this.#translationsManager.canHandleUpdate(update)) {
            maybePromises.push(() => this.#translationsManager.handleUpdate(update));
        }
        return () => Promise.resolve().then(async () => {
            const updates = [{ update }];
            for (const maybePromise of maybePromises) {
                try {
                    const value = maybePromise();
                    const update = value instanceof Promise ? await value : value;
                    if (update) {
                        updates.push(update);
                    }
                }
                catch (err) {
                    this.#L.error("failed to construct update:", err);
                }
            }
            for (const update of updates) {
                try {
                    await this.#handleCtxUpdate(update);
                }
                finally {
                    if ("deletedMessages" in update) {
                        for (const { chatId, messageId } of update.deletedMessages) {
                            await this.messageStorage.setMessage(chatId, messageId, null);
                        }
                    }
                }
            }
        });
    }
    #lastGetMe = null;
    async #getMe() {
        if (this.#lastGetMe !== null) {
            return this.#lastGetMe;
        }
        else {
            const user = await this.#getMeInner();
            this.#lastGetMe = user;
            return user;
        }
    }
    async #getMeInner() {
        let chatP = (await this[getPeer]({ _: "peerUser", user_id: BigInt(await this.#getSelfId()) }))?.[0] ?? null;
        if (chatP === null) {
            const users = await this.invoke({ _: "users.getUsers", id: [{ _: "inputUserSelf" }] });
            chatP = (0, _3_types_js_1.constructChatP)(_2_tl_js_1.Api.as("user", users[0]));
            await this.storage.setIsPremium(chatP.isPremium);
        }
        const user = (0, _3_types_js_1.constructUser2)(chatP);
        this.#lastGetMe = user;
        return user;
    }
    #previouslyConnected = false;
    #lastConnectionState = false;
    #onConnectionStateChange(connected) {
        if (this.#lastConnectionState !== connected) {
            if (connected) {
                if (this.#previouslyConnected) {
                    (0, _1_utilities_js_1.drop)(this.#updateManager.recoverUpdateGap("reconnect"));
                }
                this.#previouslyConnected = true;
            }
            const connectionState = connected ? "ready" : "notConnected";
            this.#queueHandleCtxUpdate({ connectionState });
        }
    }
    async getMe() {
        if (this.#lastGetMe === null) {
            const me = await this.#checkAuthorization();
            if (!me) {
                throw new _0_errors_js_1.InputError("Not signed in.");
            }
            else {
                return me;
            }
        }
        return await this.#getMeInner();
    }
    async showUsername(id, username) {
        await this.#accountManager.showUsername(id, username);
    }
    async hideUsername(id, username) {
        await this.#accountManager.hideUsername(id, username);
    }
    async reorderUsernames(id, order) {
        return await this.#accountManager.reorderUsernames(id, order);
    }
    async hideUsernames(id) {
        return await this.#accountManager.hideUsernames(id);
    }
    async getBusinessConnection(id) {
        return await this.#businessConnectionManager.getBusinessConnection(id);
    }
    async setOnline(online) {
        await this.#accountManager.setOnline(online);
    }
    async setEmojiStatus(id, params) {
        await this.#accountManager.setEmojiStatus(id, params);
    }
    async setUserEmojiStatus(userId, id, params) {
        await this.#accountManager.setUserEmojiStatus(userId, id, params);
    }
    async updateProfile(params) {
        await this.#accountManager.updateProfile(params);
    }
    async setBirthday(params) {
        await this.#accountManager.setBirthday(params);
    }
    async setPersonalChannel(params) {
        await this.#accountManager.setPersonalChannel(params);
    }
    async setNameColor(color, params) {
        await this.#accountManager.setNameColor(color, params);
    }
    async setProfileColor(color, params) {
        await this.#accountManager.setProfileColor(color, params);
    }
    async setLocation(params) {
        await this.#accountManager.setLocation(params);
    }
    async sendMessage(chatId, text, params) {
        return await this.#messageManager.sendMessage(chatId, text, params);
    }
    async sendPhoto(chatId, photo, params) {
        return await this.#messageManager.sendPhoto(chatId, photo, params);
    }
    async sendDocument(chatId, document, params) {
        return await this.#messageManager.sendDocument(chatId, document, params);
    }
    async sendSticker(chatId, sticker, params) {
        return await this.#messageManager.sendSticker(chatId, sticker, params);
    }
    async sendVideo(chatId, video, params) {
        return await this.#messageManager.sendVideo(chatId, video, params);
    }
    async sendAnimation(chatId, animation, params) {
        return await this.#messageManager.sendAnimation(chatId, animation, params);
    }
    async sendVoice(chatId, voice, params) {
        return await this.#messageManager.sendVoice(chatId, voice, params);
    }
    async sendAudio(chatId, audio, params) {
        return await this.#messageManager.sendAudio(chatId, audio, params);
    }
    async sendMediaGroup(chatId, media, params) {
        return await this.#messageManager.sendMediaGroup(chatId, media, params);
    }
    async sendVideoNote(chatId, videoNote, params) {
        return await this.#messageManager.sendVideoNote(chatId, videoNote, params);
    }
    async sendLocation(chatId, latitude, longitude, params) {
        return await this.#messageManager.sendLocation(chatId, latitude, longitude, params);
    }
    async sendContact(chatId, firstName, number, params) {
        return await this.#messageManager.sendContact(chatId, firstName, number, params);
    }
    async sendDice(chatId, params) {
        return await this.#messageManager.sendDice(chatId, params);
    }
    async sendVenue(chatId, latitude, longitude, title, address, params) {
        return await this.#messageManager.sendVenue(chatId, latitude, longitude, title, address, params);
    }
    async sendPoll(chatId, question, options, params) {
        return await this.#messageManager.sendPoll(chatId, question, options, params);
    }
    async sendInvoice(chatId, title, description, payload, currency, prices, params) {
        return await this.#messageManager.sendInvoice(chatId, title, description, payload, currency, prices, params);
    }
    async editMessageText(chatId, messageId, text, params) {
        return await this.#messageManager.editMessageText(chatId, messageId, text, params);
    }
    async editMessageCaption(chatId, messageId, params) {
        return await this.#messageManager.editMessageCaption(chatId, messageId, params);
    }
    async editMessageMedia(chatId, messageId, media, params) {
        return await this.#messageManager.editMessageMedia(chatId, messageId, media, params);
    }
    async editInlineMessageMedia(inlineMessageId, media, params) {
        await this.#messageManager.editInlineMessageMedia(inlineMessageId, media, params);
    }
    async editInlineMessageText(inlineMessageId, text, params) {
        await this.#messageManager.editInlineMessageText(inlineMessageId, text, params);
    }
    async editInlineMessageCaption(inlineMessageId, params) {
        await this.#messageManager.editInlineMessageCaption(inlineMessageId, params);
    }
    async editMessageReplyMarkup(chatId, messageId, params) {
        return await this.#messageManager.editMessageReplyMarkup(chatId, messageId, params);
    }
    async editInlineMessageReplyMarkup(inlineMessageId, params) {
        await this.#messageManager.editInlineMessageReplyMarkup(inlineMessageId, params);
    }
    async editMessageLiveLocation(chatId, messageId, latitude, longitude, params) {
        return await this.#messageManager.editMessageLiveLocation(chatId, messageId, latitude, longitude, params);
    }
    async editInlineMessageLiveLocation(inlineMessageId, latitude, longitude, params) {
        await this.#messageManager.editInlineMessageLiveLocation(inlineMessageId, latitude, longitude, params);
    }
    async getMessages(chatId, messageIds) {
        return await this.#messageManager.getMessages(chatId, messageIds);
    }
    async getMessage(chatId, messageId) {
        return await this.#messageManager.getMessage(chatId, messageId);
    }
    async resolveMessageLink(link) {
        return await this.#messageManager.resolveMessageLink(link);
    }
    async deleteMessages(chatId, messageIds, params) {
        await this.#messageManager.deleteMessages(chatId, messageIds, params);
    }
    async deleteMessage(chatId, messageId, params) {
        await this.#messageManager.deleteMessages(chatId, [messageId], params);
    }
    async deleteChatMemberMessages(chatId, memberId) {
        await this.#messageManager.deleteChatMemberMessages(chatId, memberId);
    }
    async deleteScheduledMessages(chatId, messageIds) {
        await this.#messageManager.deleteScheduledMessages(chatId, messageIds);
    }
    async deleteScheduledMessage(chatId, messageId) {
        await this.#messageManager.deleteScheduledMessage(chatId, messageId);
    }
    async sendScheduledMessages(chatId, messageIds) {
        return await this.#messageManager.sendScheduledMessages(chatId, messageIds);
    }
    async sendScheduledMessage(chatId, messageId) {
        return await this.#messageManager.sendScheduledMessage(chatId, messageId);
    }
    async pinMessage(chatId, messageId, params) {
        await this.#messageManager.pinMessage(chatId, messageId, params);
    }
    async unpinMessage(chatId, messageId, params) {
        await this.#messageManager.unpinMessage(chatId, messageId, params);
    }
    async unpinMessages(chatId) {
        await this.#messageManager.unpinMessages(chatId);
    }
    async forwardMessages(from, to, messageIds, params) {
        return await this.#messageManager.forwardMessages(from, to, messageIds, params);
    }
    async forwardMessage(from, to, messageId, params) {
        return (await this.forwardMessages(from, to, [messageId], params))[0];
    }
    async stopPoll(chatId, messageId, params) {
        return await this.#messageManager.stopPoll(chatId, messageId, params);
    }
    async sendChatAction(chatId, action, params) {
        await this.#messageManager.sendChatAction(chatId, action, params);
    }
    async searchMessages(params) {
        return await this.#messageManager.searchMessages(params);
    }
    async readMessages(chatId, untilMessageId) {
        await this.#messageManager.readMessages(chatId, untilMessageId);
    }
    async startBot(botId, params) {
        return await this.#messageManager.startBot(botId, params);
    }
    async transcribeVoice(chatId, messageId) {
        return await this.#messageManager.transcribeVoice(chatId, messageId);
    }
    async getStickerSet(name) {
        return await this.#messageManager.getStickerSet(name);
    }
    async getLinkPreview(text, params) {
        return await this.#linkPreviewManager.getLinkPreview(text, params);
    }
    async openMiniApp(botId, chatId, params) {
        return await this.#messageManager.openMiniApp(botId, chatId, params);
    }
    async getProgressId() {
        return await this.#fileManager.getProgressId();
    }
    async getSavedMessages(chatId, params) {
        return await this.#messageManager.getSavedMessages(chatId, params);
    }
    async getSavedChats(params) {
        return await this.#messageManager.getSavedChats(params);
    }
    async getMessageReactions(chatId, messageId, params) {
        return await this.#messageManager.getMessageReactions(chatId, messageId, params);
    }
    async vote(chatId, messageId, optionIndexes) {
        await this.#pollManager.vote(chatId, messageId, optionIndexes);
    }
    async retractVote(chatId, messageId) {
        await this.#pollManager.retractVote(chatId, messageId);
    }
    async downloadChunk(fileId, params) {
        const controller = new AbortController();
        for await (const chunk of this.#fileManager.download(fileId, { ...params, signal: controller.signal })) {
            controller.abort();
            return chunk;
        }
        (0, _0_deps_js_1.unreachable)();
    }
    async *download(fileId, params) {
        for await (const chunk of this.#fileManager.download(fileId, params)) {
            yield chunk;
        }
    }
    async getCustomEmojiStickers(id) {
        return await this.#fileManager.getCustomEmojiStickers(id);
    }
    async getChats(params) {
        return await this.#chatListManager.getChats(params?.from, params?.after, params?.limit);
    }
    async getChat(chatId) {
        return await this.#chatListManager.getChat(chatId);
    }
    async getHistory(chatId, params) {
        return await this.#messageManager.getHistory(chatId, params);
    }
    async setAvailableReactions(chatId, availableReactions) {
        await this.#chatManager.setAvailableReactions(chatId, availableReactions);
    }
    async setChatPhoto(chatId, photo, params) {
        await this.#chatManager.setChatPhoto(chatId, photo, params);
    }
    async deleteChatPhoto(chatId) {
        await this.#chatManager.deleteChatPhoto(chatId);
    }
    async banChatMember(chatId, memberId, params) {
        await this.#chatManager.banChatMember(chatId, memberId, params);
    }
    async unbanChatMember(chatId, memberId) {
        await this.#chatManager.unbanChatMember(chatId, memberId);
    }
    async kickChatMember(chatId, memberId) {
        await this.#chatManager.banChatMember(chatId, memberId);
        await this.#chatManager.unbanChatMember(chatId, memberId);
    }
    async setChatMemberRights(chatId, memberId, params) {
        await this.#chatManager.setChatMemberRights(chatId, memberId, params);
    }
    async getChatAdministrators(chatId) {
        return await this.#chatListManager.getChatAdministrators(chatId);
    }
    async enableJoinRequests(chatId) {
        await this.#chatManager.enableJoinRequests(chatId);
    }
    async disableJoinRequests(chatId) {
        await this.#chatManager.disableJoinRequests(chatId);
    }
    async getInactiveChats() {
        return await this.#accountManager.getInactiveChats();
    }
    async getCreatedInviteLinks(chatId, params) {
        return await this.#chatManager.getCreatedInviteLinks(chatId, params);
    }
    async joinChat(chatId) {
        await this.#chatManager.joinChat(chatId);
    }
    async leaveChat(chatId) {
        await this.#chatManager.leaveChat(chatId);
    }
    async getChatMember(chatId, userId) {
        return await this.#chatListManager.getChatMember(chatId, userId);
    }
    async getChatMembers(chatId, params) {
        return await this.#chatListManager.getChatMembers(chatId, params);
    }
    async setChatStickerSet(chatId, setName) {
        await this.#messageManager.setChatStickerSet(chatId, setName);
    }
    async deleteChatStickerSet(chatId) {
        await this.#messageManager.deleteChatStickerSet(chatId);
    }
    async setBoostsRequiredToCircumventRestrictions(chatId, boosts) {
        await this.#chatManager.setBoostsRequiredToCircumventRestrictions(chatId, boosts);
    }
    async createInviteLink(chatId, params) {
        return await this.#chatManager.createInviteLink(chatId, params);
    }
    async approveJoinRequest(chatId, userId) {
        await this.#chatManager.approveJoinRequest(chatId, userId);
    }
    async declineJoinRequest(chatId, userId) {
        await this.#chatManager.declineJoinRequest(chatId, userId);
    }
    async approveJoinRequests(chatId, params) {
        await this.#chatManager.approveJoinRequests(chatId, params);
    }
    async declineJoinRequests(chatId, params) {
        await this.#chatManager.declineJoinRequests(chatId, params);
    }
    async getJoinRequests(chatId, params) {
        return await this.#chatManager.getJoinRequests(chatId, params);
    }
    async addChatMember(chatId, userId, params) {
        return await this.#chatManager.addChatMember(chatId, userId, params);
    }
    async addChatMembers(chatId, userIds) {
        return await this.#chatManager.addChatMembers(chatId, userIds);
    }
    async openChat(chatId, params) {
        await this.#updateManager.openChat(chatId, params);
    }
    async closeChat(chatId) {
        await this.#updateManager.closeChat(chatId);
    }
    async createGroup(title, params) {
        return await this.#chatListManager.createGroup(title, params);
    }
    async createSupergroup(title, params) {
        return await this.#chatListManager.createSupergroup(title, params);
    }
    async createChannel(title, params) {
        return await this.#chatListManager.createChannel(title, params);
    }
    async setMessageTtl(chatId, messageTtl) {
        await this.#chatListManager.setMessageTtl(chatId, messageTtl);
    }
    async archiveChats(chatIds) {
        await this.#chatListManager.archiveChats(chatIds);
    }
    async archiveChat(chatId) {
        await this.#chatListManager.archiveChat(chatId);
    }
    async unarchiveChats(chatIds) {
        await this.#chatListManager.unarchiveChats(chatIds);
    }
    async unarchiveChat(chatId) {
        await this.#chatListManager.unarchiveChat(chatId);
    }
    async getCommonChats(userId, params) {
        return await this.#chatListManager.getCommonChats(userId, params);
    }
    async getChatSettings(chatId) {
        return await this.#chatListManager.getChatSettings(chatId);
    }
    async disableBusinessBots(chatId) {
        await this.#chatListManager.disableBusinessBots(chatId);
    }
    async enableBusinessBots(chatId) {
        await this.#chatListManager.enableBusinessBots(chatId);
    }
    async disableSlowMode(chatId) {
        await this.#chatManager.disableSlowMode(chatId);
    }
    async setSlowMode(chatId, duration) {
        await this.#chatManager.setSlowMode(chatId, duration);
    }
    async setChatTitle(chatId, title) {
        await this.#chatManager.setChatTitle(chatId, title);
    }
    async setChatDescription(chatId, description) {
        await this.#chatManager.setChatDescription(chatId, description);
    }
    async setMemberListVisibility(chatId, visible) {
        await this.#chatManager.setMemberListVisibility(chatId, visible);
    }
    async setTopicsEnabled(chatId, enabled, tabs) {
        await this.#chatManager.setTopicsEnabled(chatId, enabled, tabs);
    }
    async setAntispamEnabled(chatId, enabled) {
        await this.#chatManager.setAntispamEnabled(chatId, enabled);
    }
    async setSignaturesEnabled(chatId, enabled, params) {
        await this.#chatManager.setSignaturesEnabled(chatId, enabled, params);
    }
    async deleteChat(chatId) {
        await this.#chatManager.deleteChat(chatId);
    }
    async getDiscussionChatSuggestions() {
        return await this.#chatManager.getDiscussionChatSuggestions();
    }
    async setDiscussionChat(chatId, discussionChatId) {
        await this.#chatManager.setDiscussionChat(chatId, discussionChatId);
    }
    async transferChatOwnership(chatId, userId, password) {
        await this.#chatManager.transferChatOwnership(chatId, userId, password);
    }
    async createTopic(chatId, title, params) {
        return await this.#forumManager.createTopic(chatId, title, params);
    }
    async editTopic(chatId, topicId, title, params) {
        return await this.#forumManager.editTopic(chatId, topicId, title, params);
    }
    async hideGeneralTopic(chatId) {
        await this.#forumManager.hideGeneralTopic(chatId);
    }
    async showGeneralTopic(chatId) {
        await this.#forumManager.showGeneralTopic(chatId);
    }
    async closeTopic(chatId, topicId) {
        await this.#forumManager.closeTopic(chatId, topicId);
    }
    async reopenTopic(chatId, topicId) {
        await this.#forumManager.reopenTopic(chatId, topicId);
    }
    async pinTopic(chatId, topicId) {
        await this.#forumManager.pinTopic(chatId, topicId);
    }
    async unpinTopic(chatId, topicId) {
        await this.#forumManager.unpinTopic(chatId, topicId);
    }
    async promoteChatMember(chatId, userId, params) {
        await this.#chatManager.promoteChatMember(chatId, userId, params);
    }
    async sendCallbackQuery(botId, messageId, question) {
        return await this.#callbackQueryManager.sendCallbackQuery(botId, messageId, question);
    }
    async answerCallbackQuery(id, params) {
        await this.#callbackQueryManager.answerCallbackQuery(id, params);
    }
    async sendInlineQuery(botId, chatId, params) {
        return await this.#inlineQueryManager.sendInlineQuery(botId, chatId, params);
    }
    async answerInlineQuery(id, results, params) {
        await this.#inlineQueryManager.answerInlineQuery(id, results, params);
    }
    async setMyDescription(params) {
        await this.#botInfoManager.setMyDescription(params);
    }
    async setMyName(params) {
        await this.#botInfoManager.setMyName(params);
    }
    async setMyShortDescription(params) {
        await this.#botInfoManager.setMyShortDescription(params);
    }
    async getMyDescription(params) {
        return await this.#botInfoManager.getMyDescription(params);
    }
    async getMyName(params) {
        return await this.#botInfoManager.getMyName(params);
    }
    async getMyShortDescription(params) {
        return await this.#botInfoManager.getMyShortDescription(params);
    }
    async setMyCommands(commands, params) {
        await this.#botInfoManager.setMyCommands(commands, params);
    }
    async getMyCommands(params) {
        return await this.#botInfoManager.getMyCommands(params);
    }
    async setReactions(chatId, messageId, reactions, params) {
        await this.#messageManager.setReactions(chatId, messageId, reactions, params);
    }
    async addReaction(chatId, messageId, reaction, params) {
        await this.#messageManager.addReaction(chatId, messageId, reaction, params);
    }
    async removeReaction(chatId, messageId, reaction) {
        await this.#messageManager.removeReaction(chatId, messageId, reaction);
    }
    async createStory(chatId, content, params) {
        return await this.#storyManager.createStory(chatId, content, params);
    }
    async getStories(chatId, storyIds) {
        if (!storyIds.length) {
            return [];
        }
        return await this.#storyManager.getStories(chatId, storyIds);
    }
    async getStory(chatId, storyId) {
        return await this.#storyManager.getStory(chatId, storyId);
    }
    async deleteStories(chatId, storyIds) {
        await this.#storyManager.deleteStories(chatId, storyIds);
    }
    async deleteStory(chatId, storyId) {
        await this.#storyManager.deleteStory(chatId, storyId);
    }
    async addStoriesToHighlights(chatId, storyIds) {
        await this.#storyManager.addStoriesToHighlights(chatId, storyIds);
    }
    async addStoryToHighlights(chatId, storyId) {
        await this.#storyManager.addStoryToHighlights(chatId, storyId);
    }
    async removeStoriesFromHighlights(chatId, storyIds) {
        await this.#storyManager.removeStoriesFromHighlights(chatId, storyIds);
    }
    async removeStoryFromHighlights(chatId, storyId) {
        await this.#storyManager.removeStoryFromHighlights(chatId, storyId);
    }
    async getNetworkStatistics() {
        return await this.#networkStatisticsManager.getNetworkStatistics();
    }
    async blockUser(userId) {
        await this.#messageManager.blockUser(userId);
    }
    async unblockUser(userId) {
        await this.#messageManager.unblockUser(userId);
    }
    async startVideoChat(chatId, params) {
        return await this.#videoChatManager.startVideoChat(chatId, params);
    }
    async scheduleVideoChat(chatId, startAt, params) {
        return await this.#videoChatManager.scheduleVideoChat(chatId, startAt, params);
    }
    async joinVideoChat(id, params_, params) {
        return await this.#videoChatManager.joinVideoChat(id, params_, params);
    }
    async leaveVideoChat(id) {
        await this.#videoChatManager.leaveVideoChat(id);
    }
    async joinLiveStream(id) {
        await this.#videoChatManager.joinLiveStream(id);
    }
    async getVideoChat(id) {
        return await this.#videoChatManager.getVideoChat(id);
    }
    async getLiveStreamChannels(id) {
        return await this.#videoChatManager.getLiveStreamChannels(id);
    }
    async downloadLiveStreamSegment(id, channelId, scale, timestamp, params) {
        return await this.#videoChatManager.downloadLiveStreamSegment(id, channelId, scale, timestamp, params);
    }
    async answerPreCheckoutQuery(preCheckoutQueryId, ok, params) {
        await this.#paymentManager.answerPreCheckoutQuery(preCheckoutQueryId, ok, params);
    }
    async refundStarPayment(userId, telegramPaymentChargeId) {
        await this.#paymentManager.refundStarPayment(userId, telegramPaymentChargeId);
    }
    async getContacts() {
        return await this.#accountManager.getContacts();
    }
    async deleteContacts(userIds) {
        await this.#accountManager.deleteContacts(userIds);
    }
    async deleteContact(userId) {
        await this.#accountManager.deleteContact(userId);
    }
    async addContact(userId, params) {
        await this.#accountManager.addContact(userId, params);
    }
    async getTranslations(params) {
        return await this.#translationsManager.getTranslations(params);
    }
    async getGifts() {
        return await this.#giftManager.getGifts();
    }
    async getClaimedGifts(chatId, params) {
        return await this.#giftManager.getClaimedGifts(chatId, params);
    }
    async sendGift(chatId, giftId, params) {
        await this.#giftManager.sendGift(chatId, giftId, params);
    }
    async sellGift(userId, messageId) {
        await this.#giftManager.sellGift(userId, messageId);
    }
    async getGift(slug) {
        return await this.#giftManager.getGift(slug);
    }
}
exports.Client = Client;
