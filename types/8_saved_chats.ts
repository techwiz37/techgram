import { unreachable } from "../0_deps.ts";
import { Api } from "../2_tl.ts";
import type { PeerGetter } from "./1_chat_p.ts";
import type { StickerSetNameGetter } from "./1_sticker.ts";
import type { MessageGetter } from "./6_message.ts";
import { constructSavedChat, type SavedChat } from "./7_saved_chat.ts";

export interface SavedChats {

  chats: SavedChat[];

  total: number;
}

export async function constructSavedChats(result: Api.messages_SavedDialogs, getPeer: PeerGetter, getMessage: MessageGetter, getStickerSetName: StickerSetNameGetter): Promise<SavedChats> {
  if (Api.is("messages.savedDialogsNotModified", result)) {
    unreachable();
  }
  const chats = new Array<Promise<SavedChat>>();
  const total = "count" in result ? result.count : result.dialogs.length;
  for (const dialog of result.dialogs) {
    chats.push(constructSavedChat(dialog, result, getPeer, getMessage, getStickerSetName));
  }
  return {
    chats: await Promise.all(chats),
    total,
  };
}
