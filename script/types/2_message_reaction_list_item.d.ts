import { Api } from "../2_tl.js";
import { type Reaction } from "./0_reaction.js";
import { type ChatP } from "./1_chat_p.js";
export interface MessageReactionListItem {
    chat: ChatP;
    date: number;
    reaction: Reaction;
    big: boolean;
    unread: boolean;
    isCreator: boolean;
}
export declare function constructMessageReactionListItem(messagePeerReaction: Api.MessagePeerReaction, list: Api.messages_MessageReactionsList): MessageReactionListItem;
//# sourceMappingURL=2_message_reaction_list_item.d.ts.map