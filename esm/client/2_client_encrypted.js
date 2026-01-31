var _a;
import { InputError } from "../0_errors.js";
import { getLogger } from "../1_utilities.js";
import { Api, Mtproto, X } from "../2_tl.js";
import { ConnectionNotInited } from "../3_errors.js";
import { APP_VERSION, DEVICE_MODEL, LANG_CODE, LANG_PACK, SYSTEM_LANG_CODE, SYSTEM_VERSION } from "../4_constants.js";
import { constructTelegramError } from "../4_errors.js";
import { SessionEncrypted, SessionError } from "../4_session.js";
import { ClientAbstract } from "./0_client_abstract.js";
import { isCdnFunction, repr } from "./0_utilities.js";
import { ClientPlain } from "./1_client_plain.js";
// global ClientEncrypted ID counter for logs
let id = 0;
export class ClientEncrypted extends ClientAbstract {
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
        this.#L = getLogger("ClientEncrypted").client(id++);
        this.#plain = new ClientPlain(dc, params);
        this.session = new SessionEncrypted(dc, params);
        this.session.handlers.onUpdate = this.#onUpdate.bind(this);
        this.session.handlers.onNewServerSalt = this.#onNewServerSalt.bind(this);
        this.session.handlers.onMessageFailed = this.#onMessageFailed.bind(this);
        this.session.handlers.onRpcError = this.#onRpcError.bind(this);
        this.session.handlers.onRpcResult = this.#onRpcResult.bind(this);
        this.session.handlers.onPong = this.#onPong.bind(this);
        this.#apiId = apiId;
        this.#appVersion = params?.appVersion ?? APP_VERSION;
        this.#deviceModel = params?.deviceModel ?? DEVICE_MODEL;
        this.#langCode = params?.langCode ?? LANG_CODE;
        this.#langPack = params?.langPack ?? LANG_PACK;
        this.#systemLangCode = params?.systemLangCode ?? SYSTEM_LANG_CODE;
        this.#systemVersion = params?.systemVersion ?? SYSTEM_VERSION;
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
        if (Mtproto.is("ping", function_)) {
            body = Mtproto.serializeObject(function_);
        }
        else {
            if (this.#disableUpdates && !isCdnFunction(function_)) {
                function_ = { _: "invokeWithoutUpdates", query: function_ };
            }
            if (!this.#connectionInited) {
                if (!this.#apiId) {
                    throw new InputError("apiId not set");
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
                        layer: Api.LAYER,
                        query: function_,
                    },
                    system_lang_code: this.#systemLangCode,
                    system_version: this.#systemVersion,
                };
            }
            body = Api.serializeObject(function_);
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
                    this.#L.debug("invoked", repr(function_));
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
            type = await Api.deserializeType(X, body);
        }
        catch (err) {
            this.#L.error("failed to deserialize update:", err);
            this.handlers.onDeserializationError?.();
            return;
        }
        if (Api.isOfEnum("Update", type) || Api.isOfEnum("Updates", type)) {
            this.handlers.onUpdate?.(type);
        }
        else {
            this.#L.warning("received unknown type:", repr(type));
        }
    }
    #onNewServerSalt(serverSalt) {
        this.handlers.onNewServerSalt?.(serverSalt);
    }
    async #onMessageFailed(msgId, error) {
        const request = this.#sentRequests.get(msgId);
        if (request) {
            this.#sentRequests.delete(msgId);
            if (error instanceof SessionError) {
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
            const reason = constructTelegramError(error, request.call);
            if (reason instanceof ConnectionNotInited) {
                this.#connectionInited = false;
                await this.#resend(request);
            }
            else {
                request.promiseWithResolvers.reject(constructTelegramError(error, request.call));
            }
        }
    }
    async #onRpcResult(msgId, body) {
        const sentRequest = this.#sentRequests.get(msgId);
        this.#L.debug("received rpc_result with req_msg_id =", msgId, "for", sentRequest === undefined ? "unknown" : "known", "request");
        if (sentRequest) {
            let type;
            try {
                type = await Api.deserializeType(Api.mustGetReturnType(sentRequest.call._), body);
                this.#L.in(type);
                this.#L.debug("received rpc_result", repr(type));
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
_a = ClientEncrypted;
