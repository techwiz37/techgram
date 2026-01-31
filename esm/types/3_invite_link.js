import { unreachable } from "../0_deps.js";
import { cleanObject } from "../1_utilities.js";
import { constructUser2 } from "./2_user.js";
export function constructInviteLink(inviteLink_, getPeer) {
    const peer = getPeer({ _: "peerUser", user_id: inviteLink_.admin_id });
    if (!peer) {
        unreachable();
    }
    const inviteLink = inviteLink_.link;
    const creator = constructUser2(peer[0]);
    const requiresApproval = inviteLink_.request_needed ? true : false;
    const isRevoked = inviteLink_.revoked ? true : false;
    const title = inviteLink_.title;
    const expiresAt = inviteLink_.expire_date ? inviteLink_.expire_date : undefined;
    const limit = inviteLink_.usage_limit ? inviteLink_.usage_limit : undefined;
    const pendingJoinRequestCount = inviteLink_.requested;
    return cleanObject({
        inviteLink,
        creator,
        requiresApproval,
        isRevoked,
        title,
        expiresAt,
        limit,
        pendingJoinRequestCount,
        subcriptionPrice: inviteLink_.subscription_pricing || undefined,
        subscriptionExpiresAt: inviteLink_.subscription_expired || undefined,
    });
}
