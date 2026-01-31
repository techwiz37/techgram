import { Api } from "../2_tl.js";
import { type ChatAdministratorRights } from "./0_chat_administrator_rights.js";
import { type ChatMemberRights } from "./0_chat_member_rights.js";
import type { ChatP, PeerGetter } from "./1_chat_p.js";
export type ChatMemberStatus = "creator" | "administrator" | "member" | "restricted" | "left" | "banned";
export interface _ChatMemberBase {
    status: ChatMemberStatus;
    member: ChatP;
}
export interface ChatMemberCreator extends _ChatMemberBase {
    status: "creator";
    isAnonymous: boolean;
    title?: string;
}
export interface ChatMemberAdministrator extends _ChatMemberBase {
    status: "administrator";
    rights: ChatAdministratorRights;
    title?: string;
}
export interface ChatMemberMember extends _ChatMemberBase {
    status: "member";
    until?: number;
}
export interface ChatMemberRestricted extends _ChatMemberBase {
    status: "restricted";
    isMember: boolean;
    rights: ChatMemberRights;
    until?: number;
}
export interface ChatMemberLeft extends _ChatMemberBase {
    status: "left";
}
export interface ChatMemberBanned extends _ChatMemberBase {
    status: "banned";
    until?: number;
}
export type ChatMember = ChatMemberCreator | ChatMemberAdministrator | ChatMemberMember | ChatMemberRestricted | ChatMemberLeft | ChatMemberBanned;
export declare function constructChatMember(member: ChatP, participant: Api.ChannelParticipant | Api.ChatParticipant | (Omit<Api.ChannelParticipant, "peer"> & {
    peer: ReturnType<typeof getPeer>;
}), getPeer: PeerGetter): ChatMember;
//# sourceMappingURL=2_chat_member.d.ts.map