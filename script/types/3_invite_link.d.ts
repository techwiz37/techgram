import type { Api } from "../2_tl.js";
import type { PeerGetter } from "./1_chat_p.js";
import { type User } from "./2_user.js";
export interface InviteLink {
    inviteLink: string;
    creator: User;
    requiresApproval: boolean;
    isRevoked: boolean;
    title?: string;
    expiresAt?: number;
    limit?: number;
    pendingJoinRequestCount?: number;
    subscriptionPrice?: number;
    subscriptionExpiresIn?: number;
}
export declare function constructInviteLink(inviteLink_: Api.chatInviteExported, getPeer: PeerGetter): InviteLink;
//# sourceMappingURL=3_invite_link.d.ts.map