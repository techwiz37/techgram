"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructInactiveChat = constructInactiveChat;
const _0_deps_js_1 = require("../0_deps.js");
const _2_tl_js_1 = require("../2_tl.js");
const _1_chat_p_js_1 = require("./1_chat_p.js");
function constructInactiveChat(chat_, lastActivity) {
    if (_2_tl_js_1.Api.is("chatEmpty", chat_)) {
        (0, _0_deps_js_1.unreachable)();
    }
    const chat = (0, _1_chat_p_js_1.constructChatP)(chat_);
    return {
        lastActivity: lastActivity,
        chat,
    };
}
