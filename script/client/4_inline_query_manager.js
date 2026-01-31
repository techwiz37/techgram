"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineQueryManager = void 0;
const _0_deps_js_1 = require("../0_deps.js");
const _2_tl_js_1 = require("../2_tl.js");
const _3_types_js_1 = require("../3_types.js");
const _0_utilities_js_1 = require("./0_utilities.js");
const inlineQueryManagerUpdates = [
    "updateBotInlineQuery",
    "updateBotInlineSend",
];
class InlineQueryManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    async answerInlineQuery(id, results, params) {
        this.#c.storage.assertBot("answerInlineQuery");
        (0, _0_utilities_js_1.checkInlineQueryId)(id);
        await this.#c.invoke({ _: "messages.setInlineBotResults", query_id: BigInt(id), results: await Promise.all(results.map((v) => (0, _3_types_js_1.inlineQueryResultToTlObject)(v, this.#c.messageManager.parseText.bind(this.#c.messageManager), this.#c.messageManager.usernameResolver.bind(this.#c.messageManager)))), cache_time: params?.cacheTime ?? 300, private: params?.isPersonal ? true : undefined, switch_webview: params?.button && params.button.miniApp ? ({ _: "inlineBotWebView", text: params.button.text, url: params.button.miniApp.url }) : undefined, switch_pm: params?.button && params.button.startParameter ? ({ _: "inlineBotSwitchPM", text: params.button.text, start_param: params.button.startParameter }) : undefined, gallery: params?.isGallery ? true : undefined, next_offset: params?.nextOffset });
    }
    canHandleUpdate(update) {
        return _2_tl_js_1.Api.isOneOf(inlineQueryManagerUpdates, update);
    }
    handleUpdate(update) {
        if (_2_tl_js_1.Api.is("updateBotInlineQuery", update)) {
            return { inlineQuery: (0, _3_types_js_1.constructInlineQuery)(update, this.#c.getPeer) };
        }
        else if (_2_tl_js_1.Api.is("updateBotInlineSend", update)) {
            return { chosenInlineResult: (0, _3_types_js_1.constructChosenInlineResult)(update, this.#c.getPeer) };
        }
        else {
            (0, _0_deps_js_1.unreachable)();
        }
    }
    async sendInlineQuery(botId_, chatId, params) {
        this.#c.storage.assertUser("sendInlineQuery");
        const bot = await this.#c.getInputUser(botId_), peer = await this.#c.getInputPeer(chatId), query = params?.query ?? "", offset = params?.offset ?? "";
        const botId = await this.#c.getInputPeerChatId(bot), peerId = await this.#c.getInputPeerChatId(peer);
        const maybeResults = await this.#c.messageStorage.getInlineQueryAnswer(botId, peerId, query, offset);
        if (maybeResults !== null && !InlineQueryManager.#isExpired(maybeResults[1], maybeResults[0].cache_time)) {
            return (0, _3_types_js_1.constructInlineQueryAnswer)(maybeResults[0]);
        }
        const then = new Date();
        const results = await this.#c.invoke({ _: "messages.getInlineBotResults", bot, peer, query, offset });
        if (results.cache_time > 0) {
            await this.#c.messageStorage.setInlineQueryAnswer(botId, peerId, query, offset, results, then);
        }
        return (0, _3_types_js_1.constructInlineQueryAnswer)(results);
    }
    static #isExpired(date, cacheTime) {
        return (Date.now() - date.getTime()) / _0_deps_js_1.SECOND > cacheTime;
    }
}
exports.InlineQueryManager = InlineQueryManager;
