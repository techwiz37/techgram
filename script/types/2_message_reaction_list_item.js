"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructMessageReactionListItem = constructMessageReactionListItem;
const _0_deps_js_1 = require("../0_deps.js");
const _2_tl_js_1 = require("../2_tl.js");
const _0_reaction_js_1 = require("./0_reaction.js");
const _1_chat_p_js_1 = require("./1_chat_p.js");
function constructMessageReactionListItem(messagePeerReaction, list) {
    let chat_;
    const peerId = messagePeerReaction.peer_id;
    if (_2_tl_js_1.Api.is("peerChannel", peerId)) {
        chat_ = list.chats.find((v) => v.id === peerId.channel_id);
    }
    else if (_2_tl_js_1.Api.is("peerUser", peerId)) {
        chat_ = list.users.find((v) => v.id === peerId.user_id);
    }
    else {
        (0, _0_deps_js_1.unreachable)();
    }
    const chat = (0, _1_chat_p_js_1.constructChatP)(chat_);
    const date = messagePeerReaction.date;
    const reaction = (0, _0_reaction_js_1.constructReaction)(messagePeerReaction.reaction);
    const big = !!messagePeerReaction.big;
    const isCreator = !!messagePeerReaction.my;
    const unread = !!messagePeerReaction.unread;
    return {
        chat,
        date,
        reaction,
        big,
        isCreator,
        unread,
    };
}
