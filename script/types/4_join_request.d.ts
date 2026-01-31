import { Api } from "../2_tl.js";
import type { ChatP, PeerGetter } from "./1_chat_p.js";
import { type User } from "./2_user.js";
import { type InviteLink } from "./3_invite_link.js";
export interface JoinRequest {
    chat: ChatP;
    from: User;
    date: number;
    bio?: string;
    inviteLink?: InviteLink;
}
export declare function constructJoinRequest(update: Api.updateBotChatInviteRequester, getPeer: PeerGetter): JoinRequest;
export declare function constructJoinRequest2(peer: Api.Peer, inviteImporter: Api.ChatInviteImporter, getPeer: PeerGetter): JoinRequest;
//# sourceMappingURL=4_join_request.d.ts.map