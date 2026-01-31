"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructSavedChat = constructSavedChat;
const _0_deps_js_1 = require("../0_deps.js");
const _2_telegram_js_1 = require("../tl/2_telegram.js");
const _1_chat_p_js_1 = require("./1_chat_p.js");
const _6_message_js_1 = require("./6_message.js");
async function constructSavedChat(dialog, result, getPeer, getMessage, getStickerSetName) {
    const message = result.messages.find((v) => v.id === dialog.top_message);
    if (message === undefined) {
        (0, _0_deps_js_1.unreachable)();
    }
    const dialogId = (0, _2_telegram_js_1.peerToChatId)(dialog.peer);
    const chat_ = (dialog.peer._ === "peerUser" ? result.users : result.chats).find((v) => (0, _2_telegram_js_1.peerToChatId)(v) === dialogId);
    if (chat_ === undefined) {
        (0, _0_deps_js_1.unreachable)();
    }
    const chat = (0, _1_chat_p_js_1.constructChatP)(chat_);
    const lastMessage = await (0, _6_message_js_1.constructMessage)(message, getPeer, getMessage, getStickerSetName, false);
    const pinned = "pinned" in dialog ? !!dialog.pinned : false;
    return {
        chat,
        lastMessage,
        isPinned: pinned,
    };
}
