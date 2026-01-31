import { unreachable } from "../0_deps.js";
import { Api } from "../2_tl.js";
import { constructSavedChat } from "./7_saved_chat.js";
export async function constructSavedChats(result, getPeer, getMessage, getStickerSetName) {
    if (Api.is("messages.savedDialogsNotModified", result)) {
        unreachable();
    }
    const chats = new Array();
    const total = "count" in result ? result.count : result.dialogs.length;
    for (const dialog of result.dialogs) {
        chats.push(constructSavedChat(dialog, result, getPeer, getMessage, getStickerSetName));
    }
    return {
        chats: await Promise.all(chats),
        total,
    };
}
