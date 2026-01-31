import { Api } from "../2_tl.js";
import type { ChatP, PeerGetter } from "./1_chat_p.js";
import { type ChatMember } from "./2_chat_member.js";
import { type User } from "./2_user.js";
import { type InviteLink } from "./3_invite_link.js";
export interface ChatMemberUpdated {
    chat: ChatP;
    from: User;
    date: number;
    oldChatMember: ChatMember;
    newChatMember: ChatMember;
    inviteLink?: InviteLink;
    viaSharedFolder?: boolean;
}
export declare function constructChatMemberUpdated(update: Api.updateChannelParticipant | Api.updateChatParticipant, getPeer: PeerGetter): ChatMemberUpdated;
//# sourceMappingURL=4_chat_member_updated.d.ts.map