import { unreachable } from "../0_deps.js";
import { cleanObject } from "../1_utilities.js";
import { Api } from "../2_tl.js";
import { constructChatP } from "./1_chat_p.js";
import { constructMessage } from "./6_message.js";
export function getChatListItemOrder(lastMessage, pinned) {
    const p = pinned === -1 ? "" : `P${100 - pinned}`;
    if (!lastMessage) {
        return p + "0";
    }
    return p + String((BigInt(Math.floor(lastMessage.date)) << 32n) + BigInt(lastMessage.id));
}
export async function constructChatListItem(chatId, pinned, lastMessageId, getPeer, getMessage) {
    const peer = getPeer(Api.chatIdToPeer(chatId));
    if (peer === null) {
        return null;
    }
    const lastMessage_ = lastMessageId > 0 ? await getMessage(chatId, lastMessageId) : null;
    const lastMessage = lastMessage_ === null ? undefined : lastMessage_;
    return cleanObject({
        chat: peer[0],
        order: getChatListItemOrder(lastMessage, pinned),
        pinned,
        lastMessage,
    });
}
export function constructChatListItem2(entity, pinned, lastMessage) {
    return cleanObject({
        chat: constructChatP(entity),
        order: getChatListItemOrder(lastMessage, pinned),
        pinned,
        lastMessage,
    });
}
export function constructChatListItem3(chatId, pinned, lastMessage, getPeer) {
    const chat = getPeer(Api.chatIdToPeer(chatId));
    if (chat === null) {
        return null;
    }
    return cleanObject({
        chat: chat[0],
        order: getChatListItemOrder(lastMessage, pinned),
        pinned,
        lastMessage,
    });
}
export async function constructChatListItem4(dialog, dialogs, pinnedChats, getPeer, getMessage, getStickerSetName) {
    const topMessage_ = dialogs.messages.find((v) => "id" in v && v.id === dialog.top_message);
    if (!topMessage_) {
        unreachable();
    }
    const pinned = pinnedChats.indexOf(Api.peerToChatId(dialog.peer));
    const lastMessage = await constructMessage(topMessage_, getPeer, getMessage, getStickerSetName, false);
    const order = getChatListItemOrder(lastMessage, pinned);
    const userId = "user_id" in dialog.peer ? dialog.peer.user_id : null;
    const chatId = "chat_id" in dialog.peer ? dialog.peer.chat_id : null;
    const channelId = "channel_id" in dialog.peer ? dialog.peer.channel_id : null;
    const chat__ = chatId !== null ? dialogs.chats.find((v) => Api.is("chat", v) && v.id === chatId) : channelId !== null ? dialogs.chats.find((v) => Api.isOneOf(["channel", "channelForbidden"], v) && v.id === channelId) : userId !== null ? dialogs.users.find((v) => Api.is("user", v) && v.id === userId) : unreachable();
    if (!chat__) {
        unreachable();
    }
    return cleanObject({
        chat: constructChatP(chat__),
        order,
        lastMessage,
        pinned,
    });
}
