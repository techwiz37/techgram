import { unreachable } from "../0_deps.ts";
import { Api } from "../2_tl.ts";
import { constructReaction, type Reaction } from "./0_reaction.ts";
import { type ChatP, constructChatP } from "./1_chat_p.ts";

export interface MessageReactionListItem {

  chat: ChatP;

  date: number;

  reaction: Reaction;

  big: boolean;

  unread: boolean;

  isCreator: boolean;
}

export function constructMessageReactionListItem(messagePeerReaction: Api.MessagePeerReaction, list: Api.messages_MessageReactionsList): MessageReactionListItem {
  let chat_: Api.Chat | Api.User;
  const peerId = messagePeerReaction.peer_id;
  if (Api.is("peerChannel", peerId)) {
    chat_ = list.chats.find((v) => v.id === peerId.channel_id)!;
  } else if (Api.is("peerUser", peerId)) {
    chat_ = list.users.find((v) => v.id === peerId.user_id)!;
  } else {
    unreachable();
  }
  const chat = constructChatP(chat_);
  const date = messagePeerReaction.date;
  const reaction = constructReaction(messagePeerReaction.reaction);
  const big = !!messagePeerReaction.big;
  const isCreator = !!messagePeerReaction.my;
  const unread = !!messagePeerReaction.unread;
  return {
    chat,
    date,
    reaction,
    big,
    isCreator,
    unread,
  };
}
