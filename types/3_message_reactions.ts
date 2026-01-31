import { cleanObject } from "../1_utilities.ts";
import type { Api } from "../2_tl.ts";
import { constructReaction, type Reaction } from "./0_reaction.ts";
import type { ChatP, PeerGetter } from "./1_chat_p.ts";
import { constructUser2, type User } from "./2_user.ts";

export interface MessageReactions {

  chat: ChatP;

  messageId: number;

  user?: User;

  actorChat?: ChatP;

  date: number;

  oldReactions: Reaction[];

  newReactions: Reaction[];
}

export function constructMessageReactions(update: Api.updateBotMessageReaction, getPeer: PeerGetter): MessageReactions | null {
  const date = update.date;
  const oldReactions = update.old_reactions.map((v) => constructReaction(v));
  const newReactions = update.new_reactions.map((v) => constructReaction(v));
  const messageId = update.msg_id;

  let peer = getPeer(update.peer);
  if (!peer) {
    return null;
  }
  const chat = peer[0];

  let user: User | undefined = undefined;
  let actorChat: ChatP | undefined = undefined;

  peer = getPeer(update.actor);
  if (!peer) {
    return null;
  }
  if (peer[0].type === "private") {
    user = constructUser2(peer[0]);
  } else {
    actorChat = peer[0];
  }

  return cleanObject({
    chat,
    messageId,
    user,
    actorChat,
    date,
    oldReactions,
    newReactions,
  });
}
