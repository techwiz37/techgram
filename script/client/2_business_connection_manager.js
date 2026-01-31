"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessConnectionManager = void 0;
const _2_tl_js_1 = require("../2_tl.js");
const _3_types_js_1 = require("../3_types.js");
const businessConnectionManagerUpdates = [
    "updateBotBusinessConnect",
];
class BusinessConnectionManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    async getBusinessConnection(id) {
        const connection_ = await this.#c.messageStorage.getBusinessConnection(id);
        if (!connection_) {
            const connection_ = await this.#c.invoke({ _: "account.getBotBusinessConnection", connection_id: id })
                .then((v) => _2_tl_js_1.Api.as("updates", v))
                .then((v) => _2_tl_js_1.Api.as("updateBotBusinessConnect", v.updates[0]).connection);
            await this.#c.messageStorage.setBusinessConnection(id, connection_);
            return (0, _3_types_js_1.constructBusinessConnection)(connection_, this.#c.getPeer);
        }
        else {
            return (0, _3_types_js_1.constructBusinessConnection)(connection_, this.#c.getPeer);
        }
    }
    canHandleUpdate(update) {
        return _2_tl_js_1.Api.isOneOf(businessConnectionManagerUpdates, update);
    }
    async handleUpdate(update) {
        if (update.connection.disabled) {
            await this.#c.messageStorage.setBusinessConnection(update.connection.connection_id, null);
        }
        else {
            await this.#c.messageStorage.setBusinessConnection(update.connection.connection_id, update.connection);
        }
        const businessConnection = (0, _3_types_js_1.constructBusinessConnection)(update.connection, this.#c.getPeer);
        return { businessConnection };
    }
}
exports.BusinessConnectionManager = BusinessConnectionManager;
