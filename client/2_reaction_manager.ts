import { unreachable } from "../0_deps.ts";
import { Api } from "../2_tl.ts";
import { constructMessageReaction, constructMessageReactionCount, constructMessageReactions, type Update } from "../3_types.ts";
import type { UpdateProcessor } from "./0_update_processor.ts";
import type { C } from "./1_types.ts";

const reactionManagerUpdates = [
  "updateBotMessageReactions",
  "updateBotMessageReaction",
  "updateMessageReactions",
  "updateChannelMessageViews",
  "updateChannelMessageForwards",
] as const;

type ReactionManagerUpdate = Api.Types[(typeof reactionManagerUpdates)[number]];

export class ReactionManager implements UpdateProcessor<ReactionManagerUpdate, true> {
  #c: C;

  constructor(c: C) {
    this.#c = c;
  }

  canHandleUpdate(update: Api.Update): update is ReactionManagerUpdate {
    return Api.isOneOf(reactionManagerUpdates, update);
  }

  async handleUpdate(update: ReactionManagerUpdate): Promise<Update | null> {
    if (Api.is("updateBotMessageReactions", update)) {
      const messageReactionCount = constructMessageReactionCount(update, this.#c.getPeer);
      if (messageReactionCount) {
        return { messageReactionCount };
      } else {
        return null;
      }
    } else if (Api.is("updateBotMessageReaction", update)) {
      const messageReactions = constructMessageReactions(update, this.#c.getPeer);
      if (messageReactions) {
        return { messageReactions };
      } else {
        return null;
      }
    } else if (Api.is("updateMessageReactions", update)) {
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
      } else {
        return null;
      }
    } else if (Api.isOneOf(["updateChannelMessageViews", "updateChannelMessageForwards"], update)) {
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
      } else {
        return null;
      }
    } else {
      unreachable();
    }
  }
}
