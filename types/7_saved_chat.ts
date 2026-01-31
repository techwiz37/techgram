import { unreachable } from "../0_deps.ts";
import type { Api } from "../2_tl.ts";
import type { SavedDialog } from "../tl/1_telegram_api.ts";
import { peerToChatId } from "../tl/2_telegram.ts";
import { type ChatP, constructChatP, type PeerGetter } from "./1_chat_p.ts";
import type { StickerSetNameGetter } from "./1_sticker.ts";
import { constructMessage, type Message, type MessageGetter } from "./6_message.ts";

export interface SavedChat {

  chat: ChatP;

  lastMessage: Message;

  isPinned: boolean;
}

export async function constructSavedChat(dialog: SavedDialog, result: Api.messages_savedDialogs | Api.messages_savedDialogsSlice, getPeer: PeerGetter, getMessage: MessageGetter, getStickerSetName: StickerSetNameGetter): Promise<SavedChat> {
  const message = result.messages.find((v) => v.id === dialog.top_message);
  if (message === undefined) {
    unreachable();
  }
  const dialogId = peerToChatId(dialog.peer);
  const chat_ = (dialog.peer._ === "peerUser" ? result.users : result.chats).find((v) => peerToChatId(v) === dialogId);
  if (chat_ === undefined) {
    unreachable();
  }
  const chat = constructChatP(chat_);
  const lastMessage = await constructMessage(message, getPeer, getMessage, getStickerSetName, false);
  const pinned = "pinned" in dialog ? !!dialog.pinned : false;
  return {
    chat,
    lastMessage,
    isPinned: pinned,
  };
}
