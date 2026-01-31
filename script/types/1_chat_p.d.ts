import { Api } from "../2_tl.js";
import { type ChatPhoto } from "./0_chat_photo.js";
import { type RestrictionReason } from "./0_restriction_reason.js";
export type ChatType = "private" | "group" | "supergroup" | "channel";
export interface _ChatPBase {
    id: number;
    type: ChatType;
    color: number;
    photo?: ChatPhoto;
}
export interface ChatPPrivate extends _ChatPBase {
    type: "private";
    isBot: boolean;
    firstName: string;
    lastName?: string;
    username?: string;
    also?: string[];
    languageCode?: string;
    isScam: boolean;
    isFake: boolean;
    isPremium: boolean;
    isVerified: boolean;
    isSupport: boolean;
    isRestricted: boolean;
    restrictionReason?: RestrictionReason[];
    addedToAttachmentMenu?: boolean;
    hasMainMiniApp?: boolean;
}
export interface ChatPGroup extends _ChatPBase {
    type: "group";
    title: string;
    isCreator: boolean;
}
export interface ChatPChannelBase extends _ChatPBase {
    title: string;
    username?: string;
    also?: string[];
    isScam: boolean;
    isFake: boolean;
    isVerified: boolean;
    isRestricted: boolean;
    restrictionReason?: RestrictionReason[];
}
export interface ChatPChannel extends ChatPChannelBase {
    type: "channel";
}
export interface ChatPSupergroup extends ChatPChannelBase {
    type: "supergroup";
    isForum: boolean;
}
export type ChatP = ChatPPrivate | ChatPGroup | ChatPSupergroup | ChatPChannel;
export declare function constructChatP(chat: Api.user): ChatPPrivate;
export declare function constructChatP(chat: Api.chat | Api.chatForbidden): ChatPGroup;
export declare function constructChatP(chat: Api.channel | Api.channelForbidden): ChatPSupergroup | ChatPChannel;
export declare function constructChatP(chat: Api.User | Api.Chat): ChatP;
export interface PeerGetter {
    (peer: Api.peerUser): [ChatPPrivate, bigint] | null;
    (peer: Api.peerChat): [ChatPGroup, bigint] | null;
    (peer: Api.peerChannel): [ChatPChannel | ChatPSupergroup, bigint] | null;
    (peer: Api.peerUser | Api.peerChat | Api.peerChannel): [ChatP, bigint] | null;
}
export declare function isChatPUser(chatP: ChatP): chatP is ChatPPrivate;
//# sourceMappingURL=1_chat_p.d.ts.map