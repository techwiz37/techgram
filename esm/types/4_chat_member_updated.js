import { unreachable } from "../0_deps.js";
import { cleanObject } from "../1_utilities.js";
import { Api } from "../2_tl.js";
import { constructChatMember } from "./2_chat_member.js";
import { constructUser2 } from "./2_user.js";
import { constructInviteLink } from "./3_invite_link.js";
export function constructChatMemberUpdated(update, getPeer) {
    if (!update.prev_participant && !update.new_participant) {
        unreachable();
    }
    const peer = getPeer("channel_id" in update ? { channel_id: update.channel_id, _: "peerChannel" } : { chat_id: update.chat_id, _: "peerChat" });
    const actorPeer = getPeer({ _: "peerUser", user_id: update.actor_id });
    const memberPeer = getPeer(update.new_participant && "peer" in update.new_participant ? update.new_participant.peer : update.prev_participant && "peer" in update.prev_participant ? update.prev_participant.peer : { _: "peerUser", user_id: update.user_id });
    if (!peer || !memberPeer || !actorPeer) {
        unreachable();
    }
    const chat = peer[0];
    const from = constructUser2(actorPeer[0]);
    const date = update.date;
    const oldChatMember = constructChatMember(memberPeer[0], update.prev_participant ?? ({ _: "channelParticipantLeft", peer: memberPeer }), getPeer);
    const newChatMember = constructChatMember(memberPeer[0], update.new_participant ?? ({ _: "channelParticipantLeft", peer: memberPeer }), getPeer);
    const viaSharedFolder = "via_chatlist" in update ? update.via_chatlist ? true : update.invite ? false : undefined : undefined;
    const inviteLink = (update.invite && Api.is("chatInviteExported", update.invite)) ? constructInviteLink(update.invite, getPeer) : undefined;
    return cleanObject({
        chat,
        from,
        date,
        oldChatMember,
        newChatMember,
        viaSharedFolder,
        inviteLink,
    });
}
