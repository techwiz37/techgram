import { Api } from "../2_tl.js";
import type { PeerGetter } from "./1_chat_p.js";
import type { StickerSetNameGetter } from "./1_sticker.js";
import type { MessageGetter } from "./6_message.js";
import { type SavedChat } from "./7_saved_chat.js";
export interface SavedChats {
    chats: SavedChat[];
    total: number;
}
export declare function constructSavedChats(result: Api.messages_SavedDialogs, getPeer: PeerGetter, getMessage: MessageGetter, getStickerSetName: StickerSetNameGetter): Promise<SavedChats>;
//# sourceMappingURL=8_saved_chats.d.ts.map