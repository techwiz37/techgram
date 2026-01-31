"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructJoinRequest = constructJoinRequest;
exports.constructJoinRequest2 = constructJoinRequest2;
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _2_user_js_1 = require("./2_user.js");
const _3_invite_link_js_1 = require("./3_invite_link.js");
function constructJoinRequest(update, getPeer) {
    const peer = getPeer(update.peer);
    if (!peer) {
        (0, _0_deps_js_1.unreachable)();
    }
    const chat = peer[0];
    const userPeer = getPeer({ _: "peerUser", user_id: update.user_id });
    if (!userPeer) {
        (0, _0_deps_js_1.unreachable)();
    }
    const from = (0, _2_user_js_1.constructUser2)(userPeer[0]);
    const inviteLink = update.invite && _2_tl_js_1.Api.is("chatInviteExported", update.invite) ? (0, _3_invite_link_js_1.constructInviteLink)(update.invite, getPeer) : undefined;
    return (0, _1_utilities_js_1.cleanObject)({
        chat,
        from,
        date: update.date,
        bio: update.about,
        inviteLink,
    });
}
function constructJoinRequest2(peer, inviteImporter, getPeer) {
    const peer_ = getPeer(peer);
    if (!peer_) {
        (0, _0_deps_js_1.unreachable)();
    }
    const chat = peer_[0];
    const userPeer = getPeer({ _: "peerUser", user_id: inviteImporter.user_id });
    if (!userPeer) {
        (0, _0_deps_js_1.unreachable)();
    }
    const from = (0, _2_user_js_1.constructUser2)(userPeer[0]);
    return (0, _1_utilities_js_1.cleanObject)({
        chat,
        from,
        date: inviteImporter.date,
        bio: inviteImporter.about,
    });
}
