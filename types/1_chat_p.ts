import { unreachable } from "../0_deps.ts";
import { cleanObject, getColorFromPeerId, ZERO_CHANNEL_ID } from "../1_utilities.ts";
import { Api } from "../2_tl.ts";
import { peerToChatId } from "../tl/2_telegram.ts";
import { type ChatPhoto, constructChatPhoto } from "./0_chat_photo.ts";
import { constructRestrictionReason, type RestrictionReason } from "./0_restriction_reason.ts";

export type ChatType =
  | "private"
  | "group"
  | "supergroup"
  | "channel";

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

export function constructChatP(chat: Api.user): ChatPPrivate;
export function constructChatP(chat: Api.chat | Api.chatForbidden): ChatPGroup;
export function constructChatP(chat: Api.channel | Api.channelForbidden): ChatPSupergroup | ChatPChannel;
export function constructChatP(chat: Api.User | Api.Chat): ChatP;
export function constructChatP(chat: Api.User | Api.Chat): ChatP {
  if (Api.is("user", chat)) {
    const id = Number(chat.id);
    const usernames = chat.usernames?.map((v) => v.username);
    const username = chat.username ?? usernames?.shift();
    const chat_: ChatPPrivate = {
      id,
      type: "private",
      isBot: chat.bot || false,
      color: Api.is("peerColor", chat.color) && chat.color.color !== undefined ? chat.color.color : getColorFromPeerId(id),
      firstName: chat.first_name || "",
      lastName: chat.last_name,
      username,
      languageCode: chat.lang_code,
      also: usernames?.filter((v) => v !== username),
      isScam: chat.scam || false,
      isFake: chat.fake || false,
      isPremium: chat.premium || false,
      isVerified: chat.verified || false,
      isSupport: chat.support || false,
      isRestricted: chat.restricted || false,
      restrictionReason: chat.restriction_reason,
      addedToAttachmentMenu: chat.bot ? chat.attach_menu_enabled || false : undefined,
      hasMainMiniApp: chat.bot ? chat.attach_menu_enabled || false : undefined,
    };
    if (Api.is("userProfilePhoto", chat.photo)) {
      chat_.photo = constructChatPhoto(chat.photo, chat_.id, chat.access_hash ?? 0n);
    }

    return cleanObject(chat_);
  } else if (Api.is("chat", chat) || Api.is("chatForbidden", chat)) {
    const id = peerToChatId(chat);
    const chat_: ChatPGroup = {
      id,
      type: "group",
      color: getColorFromPeerId(id),
      title: chat.title,
      isCreator: false,
    };

    if (Api.is("chat", chat)) {
      chat_.isCreator = chat.creator || false;
      if (Api.is("chatPhoto", chat.photo)) {
        chat_.photo = constructChatPhoto(chat.photo, id, 0n);
      }
    }

    return cleanObject(chat_);
  } else if (Api.is("channel", chat) || Api.is("channelForbidden", chat)) {
    let chat_: ChatPSupergroup | ChatPChannel;
    const id = peerToChatId(chat);

    if (Api.is("channelForbidden", chat)) {
      const { title } = chat;
      if (chat.megagroup) {
        return { id, color: getColorFromPeerId(id), title, type: "supergroup", isScam: false, isFake: false, isVerified: false, isRestricted: false, isForum: false };
      } else {
        return { id, color: getColorFromPeerId(id), title, type: "channel", isScam: false, isFake: false, isVerified: false, isRestricted: false };
      }
    }
    const {
      title,
      scam: isScam = false,
      fake: isFake = false,
      verified: isVerified = false,
      restricted: isRestricted = false,
    } = chat;
    if (chat.megagroup) {
      chat_ = {
        id,
        color: Api.is("peerColor", chat.color) && chat.color.color !== undefined ? chat.color.color : getColorFromPeerId(id),
        type: "supergroup",
        title,
        isScam,
        isFake,
        isVerified,
        isRestricted,
        isForum: chat.forum || false,
      };
    } else {
      const id = ZERO_CHANNEL_ID + -Number(chat.id);
      chat_ = {
        id,
        color: Api.is("peerColor", chat.color) && chat.color.color !== undefined ? chat.color.color : getColorFromPeerId(id),
        type: "channel",
        title,
        isScam,
        isFake,
        isVerified,
        isRestricted,
      };
    }

    chat_.username = chat.username ?? chat.usernames?.[0].username;
    chat_.also = chat.usernames?.map((v) => v.username).filter((v) => v !== chat_.username);

    if (Api.is("chatPhoto", chat.photo)) {
      chat_.photo = constructChatPhoto(chat.photo, id, chat.access_hash ?? 0n);
    }

    if (chat_.isRestricted) {
      chat_.restrictionReason = (chat.restriction_reason ?? []).map(constructRestrictionReason);
    }

    return cleanObject(chat_);
  } else {
    unreachable();
  }
}

export interface PeerGetter {
  (peer: Api.peerUser): [ChatPPrivate, bigint] | null;
  (peer: Api.peerChat): [ChatPGroup, bigint] | null;
  (peer: Api.peerChannel): [ChatPChannel | ChatPSupergroup, bigint] | null;
  (peer: Api.peerUser | Api.peerChat | Api.peerChannel): [ChatP, bigint] | null;
}

export function isChatPUser(chatP: ChatP): chatP is ChatPPrivate {
  return chatP.type === "private";
}
