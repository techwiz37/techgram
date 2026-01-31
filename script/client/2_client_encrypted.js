"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientEncrypted = void 0;
const _0_errors_js_1 = require("../0_errors.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _3_errors_js_1 = require("../3_errors.js");
const _4_constants_js_1 = require("../4_constants.js");
const _4_errors_js_1 = require("../4_errors.js");
const _4_session_js_1 = require("../4_session.js");
const _0_client_abstract_js_1 = require("./0_client_abstract.js");
const _0_utilities_js_1 = require("./0_utilities.js");
const _1_client_plain_js_1 = require("./1_client_plain.js");
// global ClientEncrypted ID counter for logs
let id = 0;
class ClientEncrypted extends _0_client_abstract_js_1.ClientAbstract {
    static #SEND_MAX_TRIES = 10;
    static #AUTH_KEY_CREATION_MAX_TRIES = 10;
    handlers = {};
    #L;
    #plain;
    session;
    #sentRequests = new Map();
    #apiId;
    #appVersion;
    #deviceModel;
    #langCode;
    #langPack;
    #systemLangCode;
    #systemVersion;
    #disableUpdates;
    constructor(dc, apiId, params) {
        super();
        this.#L = (0, _1_utilities_js_1.getLogger)("ClientEncrypted").client(id++);
        this.#plain = new _1_client_plain_js_1.ClientPlain(dc, params);
        this.session = new _4_session_js_1.SessionEncrypted(dc, params);
        this.session.handlers.onUpdate = this.#onUpdate.bind(this);
        this.session.handlers.onNewServerSalt = this.#onNewServerSalt.bind(this);
        this.session.handlers.onMessageFailed = this.#onMessageFailed.bind(this);
        this.session.handlers.onRpcError = this.#onRpcError.bind(this);
        this.session.handlers.onRpcResult = this.#onRpcResult.bind(this);
        this.session.handlers.onPong = this.#onPong.bind(this);
        this.#apiId = apiId;
        this.#appVersion = params?.appVersion ?? _4_constants_js_1.APP_VERSION;
        this.#deviceModel = params?.deviceModel ?? _4_constants_js_1.DEVICE_MODEL;
        this.#langCode = params?.langCode ?? _4_constants_js_1.LANG_CODE;
        this.#langPack = params?.langPack ?? _4_constants_js_1.LANG_PACK;
        this.#systemLangCode = params?.systemLangCode ?? _4_constants_js_1.SYSTEM_LANG_CODE;
        this.#systemVersion = params?.systemVersion ?? _4_constants_js_1.SYSTEM_VERSION;
        this.#disableUpdates = params?.disableUpdates ?? false;
    }
    async connect() {
        if (!this.authKey.length) {
            await this.#createAuthKey();
        }
        await super.connect();
    }
    disconnect() {
        super.disconnect();
        this.lastRequest = undefined;
    }
    #createAuthKeyPromise;
    #createAuthKey() {
        return this.#createAuthKeyPromise ??= this.#createAuthKeyInner().finally(() => {
            this.#createAuthKeyPromise = undefined;
        });
    }
    async #createAuthKeyInner() {
        let lastErr;
        let errored = false;
        for (let i = 0; i < _a.#AUTH_KEY_CREATION_MAX_TRIES; ++i) {
            try {
                await this.#plain.connect();
                const [authKey, serverSalt] = await this.#plain.createAuthKey();
                await this.setAuthKey(authKey);
                this.serverSalt = serverSalt;
                errored = false;
                break;
            }
            catch (err) {
                errored = true;
                lastErr = err;
                if (this.disconnected) {
                    break;
                }
                this.#L.error("failed to create auth key:", err);
            }
            finally {
                this.#plain.disconnect();
            }
        }
        if (errored) {
            throw lastErr;
        }
    }
    get authKey() {
        return this.session.authKey;
    }
    async setAuthKey(authKey) {
        await this.session.setAuthKey(authKey);
    }
    #connectionInited = false;
    lastRequest;
    async #send(function_) {
        this.lastRequest = new Date();
        let body;
        if (_2_tl_js_1.Mtproto.is("ping", function_)) {
            body = _2_tl_js_1.Mtproto.serializeObject(function_);
        }
        else {
            if (this.#disableUpdates && !(0, _0_utilities_js_1.isCdnFunction)(function_)) {
                function_ = { _: "invokeWithoutUpdates", query: function_ };
            }
            if (!this.#connectionInited) {
                if (!this.#apiId) {
                    throw new _0_errors_js_1.InputError("apiId not set");
                }
                function_ = {
                    _: "initConnection",
                    api_id: this.#apiId,
                    app_version: this.#appVersion,
                    device_model: this.#deviceModel,
                    lang_code: this.#langCode,
                    lang_pack: this.#langPack,
                    query: {
                        _: "invokeWithLayer",
                        layer: _2_tl_js_1.Api.LAYER,
                        query: function_,
                    },
                    system_lang_code: this.#systemLangCode,
                    system_version: this.#systemVersion,
                };
            }
            body = _2_tl_js_1.Api.serializeObject(function_);
        }
        let lastErr;
        for (let i = 0; i < _a.#SEND_MAX_TRIES; ++i) {
            let errored = false;
            try {
                return await this.session.send(body);
            }
            catch (err) {
                errored = true;
                lastErr = err;
                if (this.disconnected) {
                    break;
                }
                this.#L.error("send failed:", err);
            }
            finally {
                if (!errored) {
                    this.#L.debug("invoked", (0, _0_utilities_js_1.repr)(function_));
                    this.#L.out(function_);
                }
            }
        }
        throw new Error(`Failed to invoke function after ${_a.#SEND_MAX_TRIES} tries.`, { cause: lastErr });
    }
    async #resend(request) {
        try {
            const messageId = await this.#send(request.call);
            this.#sentRequests.set(messageId, request);
        }
        catch (err) {
            this.#L.error("rejecting message because of resend error:", err);
            request.promiseWithResolvers.reject(err);
        }
    }
    async invoke(function_) {
        const messageId = await this.#send(function_);
        this.#L.debug("sent", function_._, "with msg_id", messageId);
        const sentRequest = { call: function_, promiseWithResolvers: Promise.withResolvers() };
        this.#sentRequests.set(messageId, sentRequest);
        return await sentRequest.promiseWithResolvers.promise;
    }
    async #onUpdate(body) {
        let type;
        try {
            type = await _2_tl_js_1.Api.deserializeType(_2_tl_js_1.X, body);
        }
        catch (err) {
            this.#L.error("failed to deserialize update:", err);
            this.handlers.onDeserializationError?.();
            return;
        }
        if (_2_tl_js_1.Api.isOfEnum("Update", type) || _2_tl_js_1.Api.isOfEnum("Updates", type)) {
            this.handlers.onUpdate?.(type);
        }
        else {
            this.#L.warning("received unknown type:", (0, _0_utilities_js_1.repr)(type));
        }
    }
    #onNewServerSalt(serverSalt) {
        this.handlers.onNewServerSalt?.(serverSalt);
    }
    async #onMessageFailed(msgId, error) {
        const request = this.#sentRequests.get(msgId);
        if (request) {
            this.#sentRequests.delete(msgId);
            if (error instanceof _4_session_js_1.SessionError) {
                await this.#resend(request);
            }
            else {
                request.promiseWithResolvers.reject(error);
            }
        }
    }
    async #onRpcError(msgId, error) {
        const request = this.#sentRequests.get(msgId);
        this.#L.debug("received rpc_error with req_msg_id =", msgId, "for", request === undefined ? "unknown" : "known", "request");
        if (request) {
            this.#sentRequests.delete(msgId);
            const reason = (0, _4_errors_js_1.constructTelegramError)(error, request.call);
            if (reason instanceof _3_errors_js_1.ConnectionNotInited) {
                this.#connectionInited = false;
                await this.#resend(request);
            }
            else {
                request.promiseWithResolvers.reject((0, _4_errors_js_1.constructTelegramError)(error, request.call));
            }
        }
    }
    async #onRpcResult(msgId, body) {
        const sentRequest = this.#sentRequests.get(msgId);
        this.#L.debug("received rpc_result with req_msg_id =", msgId, "for", sentRequest === undefined ? "unknown" : "known", "request");
        if (sentRequest) {
            let type;
            try {
                type = await _2_tl_js_1.Api.deserializeType(_2_tl_js_1.Api.mustGetReturnType(sentRequest.call._), body);
                this.#L.in(type);
                this.#L.debug("received rpc_result", (0, _0_utilities_js_1.repr)(type));
                sentRequest.promiseWithResolvers.resolve(type);
            }
            catch (err) {
                sentRequest.promiseWithResolvers.reject(err);
                this.#L.error("failed to deserialize rpc_result body:", err);
                this.handlers.onDeserializationError?.();
                return;
            }
            finally {
                this.#sentRequests.delete(msgId);
            }
        }
        if (!this.#connectionInited) {
            this.#connectionInited = true;
        }
    }
    #onPong(pong) {
        const sentRequest = this.#sentRequests.get(pong.msg_id);
        if (sentRequest) {
            sentRequest.promiseWithResolvers.resolve(pong);
            this.#sentRequests.delete(pong.msg_id);
        }
    }
}
exports.ClientEncrypted = ClientEncrypted;
_a = ClientEncrypted;
