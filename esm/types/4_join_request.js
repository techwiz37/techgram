import { unreachable } from "../0_deps.js";
import { cleanObject } from "../1_utilities.js";
import { Api } from "../2_tl.js";
import { constructUser2 } from "./2_user.js";
import { constructInviteLink } from "./3_invite_link.js";
export function constructJoinRequest(update, getPeer) {
    const peer = getPeer(update.peer);
    if (!peer) {
        unreachable();
    }
    const chat = peer[0];
    const userPeer = getPeer({ _: "peerUser", user_id: update.user_id });
    if (!userPeer) {
        unreachable();
    }
    const from = constructUser2(userPeer[0]);
    const inviteLink = update.invite && Api.is("chatInviteExported", update.invite) ? constructInviteLink(update.invite, getPeer) : undefined;
    return cleanObject({
        chat,
        from,
        date: update.date,
        bio: update.about,
        inviteLink,
    });
}
export function constructJoinRequest2(peer, inviteImporter, getPeer) {
    const peer_ = getPeer(peer);
    if (!peer_) {
        unreachable();
    }
    const chat = peer_[0];
    const userPeer = getPeer({ _: "peerUser", user_id: inviteImporter.user_id });
    if (!userPeer) {
        unreachable();
    }
    const from = constructUser2(userPeer[0]);
    return cleanObject({
        chat,
        from,
        date: inviteImporter.date,
        bio: inviteImporter.about,
    });
}
