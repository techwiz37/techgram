import { unreachable } from "../0_deps.js";
import { Api } from "../2_tl.js";
import { constructMessageReaction, constructMessageReactionCount, constructMessageReactions } from "../3_types.js";
const reactionManagerUpdates = [
    "updateBotMessageReactions",
    "updateBotMessageReaction",
    "updateMessageReactions",
    "updateChannelMessageViews",
    "updateChannelMessageForwards",
];
export class ReactionManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    canHandleUpdate(update) {
        return Api.isOneOf(reactionManagerUpdates, update);
    }
    async handleUpdate(update) {
        if (Api.is("updateBotMessageReactions", update)) {
            const messageReactionCount = constructMessageReactionCount(update, this.#c.getPeer);
            if (messageReactionCount) {
                return { messageReactionCount };
            }
            else {
                return null;
            }
        }
        else if (Api.is("updateBotMessageReaction", update)) {
            const messageReactions = constructMessageReactions(update, this.#c.getPeer);
            if (messageReactions) {
                return { messageReactions };
            }
            else {
                return null;
            }
        }
        else if (Api.is("updateMessageReactions", update)) {
            const chatId = Api.peerToChatId(update.peer);
            const message = await this.#c.messageStorage.getMessage(chatId, update.msg_id);
            if (Api.is("message", message)) {
                message.reactions = update.reactions;
                await this.#c.messageStorage.setMessage(chatId, update.msg_id, message);
                const views = message.views ?? 0;
                const forwards = message.forwards ?? 0;
                const recentReactions = update.reactions.recent_reactions ?? [];
                const reactions = update.reactions.results.map((v) => constructMessageReaction(v, recentReactions));
                return { messageInteractions: { chatId, messageId: update.msg_id, reactions, views, forwards } };
            }
            else {
                return null;
            }
        }
        else if (Api.isOneOf(["updateChannelMessageViews", "updateChannelMessageForwards"], update)) {
            const chatId = Api.peerToChatId({ ...update, _: "peerChannel" });
            const message = await this.#c.messageStorage.getMessage(chatId, update.id);
            if (Api.is("message", message)) {
                if ("views" in update) {
                    message.views = update.views;
                }
                if ("forwards" in update) {
                    message.forwards = update.forwards;
                }
                const views = message.views ?? 0;
                const forwards = message.forwards ?? 0;
                const recentReactions = message.reactions?.recent_reactions ?? [];
                const reactions = message.reactions?.results.map((v) => constructMessageReaction(v, recentReactions)) ?? [];
                return { messageInteractions: { chatId, messageId: update.id, reactions, views, forwards } };
            }
            else {
                return null;
            }
        }
        else {
            unreachable();
        }
    }
}
