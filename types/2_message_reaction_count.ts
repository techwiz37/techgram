import type { Api } from "../2_tl.ts";
import type { ChatP, PeerGetter } from "./1_chat_p.ts";
import { constructReactionCount, type ReactionCount } from "./1_reaction_count.ts";

export interface MessageReactionCount {

  chat: ChatP;

  messageId: number;

  date: number;

  reactions: ReactionCount[];
}

export function constructMessageReactionCount(update: Api.updateBotMessageReactions, getPeer: PeerGetter): MessageReactionCount | null {
  const date = update.date;
  const reactions = update.reactions.map((v) => constructReactionCount(v));
  const peer = getPeer(update.peer);
  if (peer) {
    const messageId = update.msg_id;
    const messageReactionCount = { chat: peer[0], messageId, date, reactions };
    return messageReactionCount;
  } else {
    return null;
  }
}
