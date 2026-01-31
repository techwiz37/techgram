"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallbackQueryManager = void 0;
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _3_types_js_1 = require("../3_types.js");
const _0_password_js_1 = require("./0_password.js");
const _0_utilities_js_1 = require("./0_utilities.js");
const callbackQueryManagerUpdates = [
    "updateBotCallbackQuery",
    "updateInlineBotCallbackQuery",
];
class CallbackQueryManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    async answerCallbackQuery(id, params) {
        this.#c.storage.assertBot("answerCallbackQuery");
        (0, _0_utilities_js_1.checkCallbackQueryId)(id);
        await this.#c.invoke({ _: "messages.setBotCallbackAnswer", query_id: BigInt(id), cache_time: params?.cacheTime ?? 0, message: params?.text, alert: params?.alert ? true : undefined });
    }
    async sendCallbackQuery(botId, messageId, question) {
        this.#c.storage.assertUser("sendCallbackQuery");
        (0, _0_utilities_js_1.checkMessageId)(messageId);
        (0, _3_types_js_1.validateCallbackQueryQuestion)(question);
        const peer = await this.#c.getInputPeer(botId), peerId = await this.#c.getInputPeerChatId(peer), questionKey = JSON.stringify(question);
        const maybeAnswer = await this.#c.messageStorage.getCallbackQueryAnswer(peerId, messageId, questionKey);
        if (maybeAnswer !== null && !CallbackQueryManager.#isExpired(maybeAnswer[1], maybeAnswer[0].cache_time)) {
            return (0, _3_types_js_1.constructCallbackQueryAnswer)(maybeAnswer[0]);
        }
        const answer = await this.#c.invoke({ _: "messages.getBotCallbackAnswer", peer, msg_id: messageId, data: "data" in question ? (0, _1_utilities_js_1.encodeText)(question.data) : undefined, game: question.type === "game" ? true : undefined, password: question.type === "password" ? await this.#getPasswordCheck(question.password) : undefined });
        if (answer.cache_time >= 0) {
            await this.#c.messageStorage.setCallbackQueryAnswer(peerId, messageId, questionKey, answer);
        }
        return (0, _3_types_js_1.constructCallbackQueryAnswer)(answer);
    }
    static #isExpired(date, cacheTime) {
        return (Date.now() - date.getTime()) / _0_deps_js_1.SECOND > cacheTime;
    }
    async #getPasswordCheck(password) {
        const ap = await this.#c.invoke({ _: "account.getPassword" });
        return await (0, _0_password_js_1.checkPassword)(password, ap);
    }
    canHandleUpdate(update) {
        return _2_tl_js_1.Api.isOneOf(callbackQueryManagerUpdates, update);
    }
    async handleUpdate(update) {
        return { callbackQuery: await (0, _3_types_js_1.constructCallbackQuery)(update, this.#c.getPeer, this.#c.messageManager.getMessageWithReply.bind(this.#c.messageManager)) };
    }
}
exports.CallbackQueryManager = CallbackQueryManager;
