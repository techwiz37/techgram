"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionManager = void 0;
const _0_deps_js_1 = require("../0_deps.js");
const _2_tl_js_1 = require("../2_tl.js");
const _3_types_js_1 = require("../3_types.js");
const reactionManagerUpdates = [
    "updateBotMessageReactions",
    "updateBotMessageReaction",
    "updateMessageReactions",
    "updateChannelMessageViews",
    "updateChannelMessageForwards",
];
class ReactionManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    canHandleUpdate(update) {
        return _2_tl_js_1.Api.isOneOf(reactionManagerUpdates, update);
    }
    async handleUpdate(update) {
        if (_2_tl_js_1.Api.is("updateBotMessageReactions", update)) {
            const messageReactionCount = (0, _3_types_js_1.constructMessageReactionCount)(update, this.#c.getPeer);
            if (messageReactionCount) {
                return { messageReactionCount };
            }
            else {
                return null;
            }
        }
        else if (_2_tl_js_1.Api.is("updateBotMessageReaction", update)) {
            const messageReactions = (0, _3_types_js_1.constructMessageReactions)(update, this.#c.getPeer);
            if (messageReactions) {
                return { messageReactions };
            }
            else {
                return null;
            }
        }
        else if (_2_tl_js_1.Api.is("updateMessageReactions", update)) {
            const chatId = _2_tl_js_1.Api.peerToChatId(update.peer);
            const message = await this.#c.messageStorage.getMessage(chatId, update.msg_id);
            if (_2_tl_js_1.Api.is("message", message)) {
                message.reactions = update.reactions;
                await this.#c.messageStorage.setMessage(chatId, update.msg_id, message);
                const views = message.views ?? 0;
                const forwards = message.forwards ?? 0;
                const recentReactions = update.reactions.recent_reactions ?? [];
                const reactions = update.reactions.results.map((v) => (0, _3_types_js_1.constructMessageReaction)(v, recentReactions));
                return { messageInteractions: { chatId, messageId: update.msg_id, reactions, views, forwards } };
            }
            else {
                return null;
            }
        }
        else if (_2_tl_js_1.Api.isOneOf(["updateChannelMessageViews", "updateChannelMessageForwards"], update)) {
            const chatId = _2_tl_js_1.Api.peerToChatId({ ...update, _: "peerChannel" });
            const message = await this.#c.messageStorage.getMessage(chatId, update.id);
            if (_2_tl_js_1.Api.is("message", message)) {
                if ("views" in update) {
                    message.views = update.views;
                }
                if ("forwards" in update) {
                    message.forwards = update.forwards;
                }
                const views = message.views ?? 0;
                const forwards = message.forwards ?? 0;
                const recentReactions = message.reactions?.recent_reactions ?? [];
                const reactions = message.reactions?.results.map((v) => (0, _3_types_js_1.constructMessageReaction)(v, recentReactions)) ?? [];
                return { messageInteractions: { chatId, messageId: update.id, reactions, views, forwards } };
            }
            else {
                return null;
            }
        }
        else {
            (0, _0_deps_js_1.unreachable)();
        }
    }
}
exports.ReactionManager = ReactionManager;
