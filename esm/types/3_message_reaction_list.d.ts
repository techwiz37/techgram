import type { Api } from "../2_tl.js";
import { type MessageReactionListItem } from "./2_message_reaction_list_item.js";
export interface MessageReactionList {
    reactions: MessageReactionListItem[];
    nextOffset?: string;
    count: number;
}
export declare function constructMessageReactionList(messageReactionsList: Api.messages_MessageReactionsList): MessageReactionList;
//# sourceMappingURL=3_message_reaction_list.d.ts.map