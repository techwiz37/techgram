"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructChatMemberUpdated = constructChatMemberUpdated;
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _2_chat_member_js_1 = require("./2_chat_member.js");
const _2_user_js_1 = require("./2_user.js");
const _3_invite_link_js_1 = require("./3_invite_link.js");
function constructChatMemberUpdated(update, getPeer) {
    if (!update.prev_participant && !update.new_participant) {
        (0, _0_deps_js_1.unreachable)();
    }
    const peer = getPeer("channel_id" in update ? { channel_id: update.channel_id, _: "peerChannel" } : { chat_id: update.chat_id, _: "peerChat" });
    const actorPeer = getPeer({ _: "peerUser", user_id: update.actor_id });
    const memberPeer = getPeer(update.new_participant && "peer" in update.new_participant ? update.new_participant.peer : update.prev_participant && "peer" in update.prev_participant ? update.prev_participant.peer : { _: "peerUser", user_id: update.user_id });
    if (!peer || !memberPeer || !actorPeer) {
        (0, _0_deps_js_1.unreachable)();
    }
    const chat = peer[0];
    const from = (0, _2_user_js_1.constructUser2)(actorPeer[0]);
    const date = update.date;
    const oldChatMember = (0, _2_chat_member_js_1.constructChatMember)(memberPeer[0], update.prev_participant ?? ({ _: "channelParticipantLeft", peer: memberPeer }), getPeer);
    const newChatMember = (0, _2_chat_member_js_1.constructChatMember)(memberPeer[0], update.new_participant ?? ({ _: "channelParticipantLeft", peer: memberPeer }), getPeer);
    const viaSharedFolder = "via_chatlist" in update ? update.via_chatlist ? true : update.invite ? false : undefined : undefined;
    const inviteLink = (update.invite && _2_tl_js_1.Api.is("chatInviteExported", update.invite)) ? (0, _3_invite_link_js_1.constructInviteLink)(update.invite, getPeer) : undefined;
    return (0, _1_utilities_js_1.cleanObject)({
        chat,
        from,
        date,
        oldChatMember,
        newChatMember,
        viaSharedFolder,
        inviteLink,
    });
}
