import { unreachable } from "../0_deps.js";
import { cleanObject } from "../1_utilities.js";
import { Api } from "../2_tl.js";
import { constructChatAdministratorRights } from "./0_chat_administrator_rights.js";
import { constructChatMemberRights } from "./0_chat_member_rights.js";
export function constructChatMember(member, participant, getPeer) {
    const peer = "user_id" in participant ? getPeer({ ...participant, _: "peerUser" }) : "peer" in participant ? Array.isArray(participant.peer) ? participant.peer : Api.is("peerUser", participant.peer) ? getPeer(participant.peer) : unreachable() : unreachable();
    if (peer === null || peer[0].type !== "private")
        unreachable();
    if (Api.is("channelParticipant", participant) || Api.is("chatParticipant", participant)) {
        return {
            status: "member",
            member,
        };
    }
    else if (Api.is("channelParticipantCreator", participant)) {
        return cleanObject({
            status: "creator",
            member,
            isAnonymous: participant.admin_rights.anonymous ? true : false,
            title: participant.rank,
        });
    }
    else if (Api.is("channelParticipantAdmin", participant)) {
        return cleanObject({
            status: "administrator",
            member,
            rights: constructChatAdministratorRights(participant.admin_rights),
            title: participant.rank,
        });
    }
    else if (Api.is("channelParticipantBanned", participant)) {
        const until = participant.banned_rights.until_date ? participant.banned_rights.until_date : undefined;
        if (!participant.banned_rights.view_messages) {
            participant.peer;
            return cleanObject({
                status: "banned",
                member,
                until,
            });
        }
        const isMember = participant.left ? true : false;
        const rights = constructChatMemberRights(participant.banned_rights);
        return cleanObject({
            status: "restricted",
            member,
            isMember,
            rights,
            until,
        });
    }
    else if (Api.is("channelParticipantSelf", participant)) {
        const until = participant.subscription_until_date ? participant.subscription_until_date : undefined;
        return cleanObject({
            status: "member",
            member,
            until,
        });
    }
    else if (Api.is("channelParticipantLeft", participant)) {
        return { status: "left", member };
    }
    else if (Api.is("chatParticipantAdmin", participant)) {
        return cleanObject({
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
    else if (Api.is("chatParticipantCreator", participant)) {
        return cleanObject({
            status: "creator",
            member,
            isAnonymous: false,
        });
    }
    else {
        unreachable();
    }
}
