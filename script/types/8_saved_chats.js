"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructSavedChats = constructSavedChats;
const _0_deps_js_1 = require("../0_deps.js");
const _2_tl_js_1 = require("../2_tl.js");
const _7_saved_chat_js_1 = require("./7_saved_chat.js");
async function constructSavedChats(result, getPeer, getMessage, getStickerSetName) {
    if (_2_tl_js_1.Api.is("messages.savedDialogsNotModified", result)) {
        (0, _0_deps_js_1.unreachable)();
    }
    const chats = new Array();
    const total = "count" in result ? result.count : result.dialogs.length;
    for (const dialog of result.dialogs) {
        chats.push((0, _7_saved_chat_js_1.constructSavedChat)(dialog, result, getPeer, getMessage, getStickerSetName));
    }
    return {
        chats: await Promise.all(chats),
        total,
    };
}
