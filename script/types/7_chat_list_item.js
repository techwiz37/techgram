"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatListItemOrder = getChatListItemOrder;
exports.constructChatListItem = constructChatListItem;
exports.constructChatListItem2 = constructChatListItem2;
exports.constructChatListItem3 = constructChatListItem3;
exports.constructChatListItem4 = constructChatListItem4;
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _1_chat_p_js_1 = require("./1_chat_p.js");
const _6_message_js_1 = require("./6_message.js");
function getChatListItemOrder(lastMessage, pinned) {
    const p = pinned === -1 ? "" : `P${100 - pinned}`;
    if (!lastMessage) {
        return p + "0";
    }
    return p + String((BigInt(Math.floor(lastMessage.date)) << 32n) + BigInt(lastMessage.id));
}
async function constructChatListItem(chatId, pinned, lastMessageId, getPeer, getMessage) {
    const peer = getPeer(_2_tl_js_1.Api.chatIdToPeer(chatId));
    if (peer === null) {
        return null;
    }
    const lastMessage_ = lastMessageId > 0 ? await getMessage(chatId, lastMessageId) : null;
    const lastMessage = lastMessage_ === null ? undefined : lastMessage_;
    return (0, _1_utilities_js_1.cleanObject)({
        chat: peer[0],
        order: getChatListItemOrder(lastMessage, pinned),
        pinned,
        lastMessage,
    });
}
function constructChatListItem2(entity, pinned, lastMessage) {
    return (0, _1_utilities_js_1.cleanObject)({
        chat: (0, _1_chat_p_js_1.constructChatP)(entity),
        order: getChatListItemOrder(lastMessage, pinned),
        pinned,
        lastMessage,
    });
}
function constructChatListItem3(chatId, pinned, lastMessage, getPeer) {
    const chat = getPeer(_2_tl_js_1.Api.chatIdToPeer(chatId));
    if (chat === null) {
        return null;
    }
    return (0, _1_utilities_js_1.cleanObject)({
        chat: chat[0],
        order: getChatListItemOrder(lastMessage, pinned),
        pinned,
        lastMessage,
    });
}
async function constructChatListItem4(dialog, dialogs, pinnedChats, getPeer, getMessage, getStickerSetName) {
    const topMessage_ = dialogs.messages.find((v) => "id" in v && v.id === dialog.top_message);
    if (!topMessage_) {
        (0, _0_deps_js_1.unreachable)();
    }
    const pinned = pinnedChats.indexOf(_2_tl_js_1.Api.peerToChatId(dialog.peer));
    const lastMessage = await (0, _6_message_js_1.constructMessage)(topMessage_, getPeer, getMessage, getStickerSetName, false);
    const order = getChatListItemOrder(lastMessage, pinned);
    const userId = "user_id" in dialog.peer ? dialog.peer.user_id : null;
    const chatId = "chat_id" in dialog.peer ? dialog.peer.chat_id : null;
    const channelId = "channel_id" in dialog.peer ? dialog.peer.channel_id : null;
    const chat__ = chatId !== null ? dialogs.chats.find((v) => _2_tl_js_1.Api.is("chat", v) && v.id === chatId) : channelId !== null ? dialogs.chats.find((v) => _2_tl_js_1.Api.isOneOf(["channel", "channelForbidden"], v) && v.id === channelId) : userId !== null ? dialogs.users.find((v) => _2_tl_js_1.Api.is("user", v) && v.id === userId) : (0, _0_deps_js_1.unreachable)();
    if (!chat__) {
        (0, _0_deps_js_1.unreachable)();
    }
    return (0, _1_utilities_js_1.cleanObject)({
        chat: (0, _1_chat_p_js_1.constructChatP)(chat__),
        order,
        lastMessage,
        pinned,
    });
}
