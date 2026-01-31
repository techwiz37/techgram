import type { Api } from "../2_tl.js";
import type { ChatPChannel, ChatPSupergroup, PeerGetter } from "./1_chat_p.js";
import { type User } from "./2_user.js";
export interface _ForwardHeaderCommon {
    date: number;
}
export interface ForwardHeaderUser extends _ForwardHeaderCommon {
    type: "user";
    user: User;
}
export interface ForwardHeaderChannel extends _ForwardHeaderCommon {
    type: "channel";
    chat: ChatPChannel;
    messageId: number;
    authorSignature?: string;
}
export interface ForwardHeaderSupergroup extends _ForwardHeaderCommon {
    type: "supergroup";
    chat: ChatPSupergroup;
    title?: string;
}
export interface ForwardHeaderHidden extends _ForwardHeaderCommon {
    type: "hidden";
    name: string;
}
export interface ForwardHeaderUnsupported extends _ForwardHeaderCommon {
    type: "unsupported";
}
export type ForwardHeader = ForwardHeaderUser | ForwardHeaderChannel | ForwardHeaderSupergroup | ForwardHeaderHidden | ForwardHeaderUnsupported;
export declare function constructForwardHeader(fwdHeader: Api.MessageFwdHeader, getPeer: PeerGetter): ForwardHeader;
//# sourceMappingURL=3_forward_header.d.ts.map