import { Api } from "../2_tl.js";
import { type ChatP, type PeerGetter } from "./1_chat_p.js";
import type { StickerSetNameGetter } from "./1_sticker.js";
import { type Message, type MessageGetter } from "./6_message.js";
export interface ChatListItem {
    chat: ChatP;
    order: string;
    pinned: number;
    lastMessage?: Omit<Message, "replyToMessage">;
}
export declare function getChatListItemOrder(lastMessage: Omit<Message, "replyToMessage"> | undefined, pinned: number): string;
export declare function constructChatListItem(chatId: number, pinned: number, lastMessageId: number, getPeer: PeerGetter, getMessage: MessageGetter): Promise<ChatListItem | null>;
export declare function constructChatListItem2(entity: Api.user | Api.chat | Api.chatForbidden | Api.channel | Api.channelForbidden, pinned: number, lastMessage: Omit<Message, "replyToMessage"> | undefined): ChatListItem;
export declare function constructChatListItem3(chatId: number, pinned: number, lastMessage: Omit<Message, "replyToMessage"> | undefined, getPeer: PeerGetter): ChatListItem | null;
export declare function constructChatListItem4(dialog: Api.Dialog, dialogs: Api.messages_dialogs | Api.messages_dialogsSlice, pinnedChats: number[], getPeer: PeerGetter, getMessage: MessageGetter, getStickerSetName: StickerSetNameGetter): Promise<ChatListItem>;
//# sourceMappingURL=7_chat_list_item.d.ts.map