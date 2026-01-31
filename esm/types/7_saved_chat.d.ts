import type { Api } from "../2_tl.js";
import type { SavedDialog } from "../tl/1_telegram_api.js";
import { type ChatP, type PeerGetter } from "./1_chat_p.js";
import type { StickerSetNameGetter } from "./1_sticker.js";
import { type Message, type MessageGetter } from "./6_message.js";
export interface SavedChat {
    chat: ChatP;
    lastMessage: Message;
    isPinned: boolean;
}
export declare function constructSavedChat(dialog: SavedDialog, result: Api.messages_savedDialogs | Api.messages_savedDialogsSlice, getPeer: PeerGetter, getMessage: MessageGetter, getStickerSetName: StickerSetNameGetter): Promise<SavedChat>;
//# sourceMappingURL=7_saved_chat.d.ts.map