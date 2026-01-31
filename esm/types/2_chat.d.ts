import { Api } from "../2_tl.js";
import { type Birthday } from "./0_birthday.js";
import { type Location } from "./0_location.js";
import { type OpeningHours } from "./0_opening_hours.js";
import type { ChatPChannel, ChatPGroup, ChatPPrivate, ChatPSupergroup, PeerGetter } from "./1_chat_p.js";
import { type Photo } from "./1_photo.js";
export interface ChatBase {
    photo?: Photo;
}
export interface ChatChannel extends ChatBase, Omit<ChatPChannel, "photo"> {
    videoChatId?: string;
}
export interface ChatSupergroup extends ChatBase, Omit<ChatPSupergroup, "photo"> {
    videoChatId?: string;
}
export interface ChatGroup extends ChatBase, Omit<ChatPGroup, "photo"> {
    videoChatId?: string;
}
export interface ChatPrivate extends ChatBase, Omit<ChatPPrivate, "photo"> {
    birthday?: Birthday;
    address?: string;
    location?: Location;
    openingHours?: OpeningHours;
}
export type Chat = ChatChannel | ChatSupergroup | ChatGroup | ChatPrivate;
export declare function constructChat(fullChat: Api.userFull | Api.chatFull | Api.channelFull, getPeer: PeerGetter): Chat;
//# sourceMappingURL=2_chat.d.ts.map