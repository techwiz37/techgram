"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructChatMember = constructChatMember;
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _0_chat_administrator_rights_js_1 = require("./0_chat_administrator_rights.js");
const _0_chat_member_rights_js_1 = require("./0_chat_member_rights.js");
function constructChatMember(member, participant, getPeer) {
    const peer = "user_id" in participant ? getPeer({ ...participant, _: "peerUser" }) : "peer" in participant ? Array.isArray(participant.peer) ? participant.peer : _2_tl_js_1.Api.is("peerUser", participant.peer) ? getPeer(participant.peer) : (0, _0_deps_js_1.unreachable)() : (0, _0_deps_js_1.unreachable)();
    if (peer === null || peer[0].type !== "private")
        (0, _0_deps_js_1.unreachable)();
    if (_2_tl_js_1.Api.is("channelParticipant", participant) || _2_tl_js_1.Api.is("chatParticipant", participant)) {
        return {
            status: "member",
            member,
        };
    }
    else if (_2_tl_js_1.Api.is("channelParticipantCreator", participant)) {
        return (0, _1_utilities_js_1.cleanObject)({
            status: "creator",
            member,
            isAnonymous: participant.admin_rights.anonymous ? true : false,
            title: participant.rank,
        });
    }
    else if (_2_tl_js_1.Api.is("channelParticipantAdmin", participant)) {
        return (0, _1_utilities_js_1.cleanObject)({
            status: "administrator",
            member,
            rights: (0, _0_chat_administrator_rights_js_1.constructChatAdministratorRights)(participant.admin_rights),
            title: participant.rank,
        });
    }
    else if (_2_tl_js_1.Api.is("channelParticipantBanned", participant)) {
        const until = participant.banned_rights.until_date ? participant.banned_rights.until_date : undefined;
        if (!participant.banned_rights.view_messages) {
            participant.peer;
            return (0, _1_utilities_js_1.cleanObject)({
                status: "banned",
                member,
                until,
            });
        }
        const isMember = participant.left ? true : false;
        const rights = (0, _0_chat_member_rights_js_1.constructChatMemberRights)(participant.banned_rights);
        return (0, _1_utilities_js_1.cleanObject)({
            status: "restricted",
            member,
            isMember,
            rights,
            until,
        });
    }
    else if (_2_tl_js_1.Api.is("channelParticipantSelf", participant)) {
        const until = participant.subscription_until_date ? participant.subscription_until_date : undefined;
        return (0, _1_utilities_js_1.cleanObject)({
            status: "member",
            member,
            until,
        });
    }
    else if (_2_tl_js_1.Api.is("channelParticipantLeft", participant)) {
        return { status: "left", member };
    }
    else if (_2_tl_js_1.Api.is("chatParticipantAdmin", participant)) {
        return (0, _1_utilities_js_1.cleanObject)({
            status: "administrator",
            member,
            rights: {
                isAnonymous: false,
                canManageChat: true,
                canDeleteMessages: true,
                canManageVideoChats: false,
                canRestrictMembers: true,
                canPromoteMembers: false,
                canChangeInfo: true,
                canInviteUsers: true,
                canPostMessages: false,
                canEditMessages: false,
                canPinMessages: true,
                canManageTopics: false,
                canDeleteStories: false,
                canEditStories: false,
                canManageDirectMessages: false,
                canPostStories: false,
            },
        });
    }
    else if (_2_tl_js_1.Api.is("chatParticipantCreator", participant)) {
        return (0, _1_utilities_js_1.cleanObject)({
            status: "creator",
            member,
            isAnonymous: false,
        });
    }
    else {
        (0, _0_deps_js_1.unreachable)();
    }
}
