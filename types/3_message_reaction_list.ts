import { cleanObject } from "../1_utilities.ts";
import type { Api } from "../2_tl.ts";
import { constructMessageReactionListItem, type MessageReactionListItem } from "./2_message_reaction_list_item.ts";

export interface MessageReactionList {

  reactions: MessageReactionListItem[];

  nextOffset?: string;

  count: number;
}

export function constructMessageReactionList(messageReactionsList: Api.messages_MessageReactionsList): MessageReactionList {
  const reactions = messageReactionsList.reactions.map((v) => constructMessageReactionListItem(v, messageReactionsList));
  const count = messageReactionsList.count;
  const nextOffset = messageReactionsList.next_offset;
  return cleanObject({
    reactions,
    count,
    nextOffset,
  });
}
