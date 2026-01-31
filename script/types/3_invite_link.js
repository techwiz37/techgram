"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructInviteLink = constructInviteLink;
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_user_js_1 = require("./2_user.js");
function constructInviteLink(inviteLink_, getPeer) {
    const peer = getPeer({ _: "peerUser", user_id: inviteLink_.admin_id });
    if (!peer) {
        (0, _0_deps_js_1.unreachable)();
    }
    const inviteLink = inviteLink_.link;
    const creator = (0, _2_user_js_1.constructUser2)(peer[0]);
    const requiresApproval = inviteLink_.request_needed ? true : false;
    const isRevoked = inviteLink_.revoked ? true : false;
    const title = inviteLink_.title;
    const expiresAt = inviteLink_.expire_date ? inviteLink_.expire_date : undefined;
    const limit = inviteLink_.usage_limit ? inviteLink_.usage_limit : undefined;
    const pendingJoinRequestCount = inviteLink_.requested;
    return (0, _1_utilities_js_1.cleanObject)({
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
