import { unreachable } from "../0_deps.js";
import { peerToChatId } from "../tl/2_telegram.js";
import { constructChatP } from "./1_chat_p.js";
import { constructMessage } from "./6_message.js";
export async function constructSavedChat(dialog, result, getPeer, getMessage, getStickerSetName) {
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
