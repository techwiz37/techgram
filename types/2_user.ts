import { cleanObject, getColorFromPeerId } from "../1_utilities.ts";
import { Api } from "../2_tl.ts";
import { type ChatPhoto, constructChatPhoto } from "./0_chat_photo.ts";
import type { RestrictionReason } from "./0_restriction_reason.ts";
import type { ChatPPrivate } from "./1_chat_p.ts";

export interface User {

  id: number;

  color: number;

  isBot: boolean;

  firstName: string;

  lastName?: string;

  username?: string;

  also?: string[];

  photo?: ChatPhoto;

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

export function constructUser(user_: Api.user): User {
  const id = Number(user_.id);
  const usernames = user_.usernames?.map((v) => v.username);
  const username = user_.username ?? usernames?.shift();
  const user: User = {
    id,
    color: Api.is("peerColor", user_.color) && user_.color.color !== undefined ? user_.color.color : getColorFromPeerId(id),
    isBot: user_.bot || false,
    firstName: user_.first_name || "",
    lastName: user_.last_name,
    username: username,
    also: usernames?.filter((v) => v !== username),
    languageCode: user_.lang_code,
    isScam: user_.scam || false,
    isFake: user_.fake || false,
    isPremium: user_.premium || false,
    isVerified: user_.verified || false,
    isSupport: user_.support || false,
    isRestricted: user_.restricted || false,
    restrictionReason: user_.restriction_reason,
    addedToAttachmentMenu: user_.bot ? user_.attach_menu_enabled || false : undefined,
    hasMainMiniApp: user_.bot ? user_.bot_has_main_app || false : undefined,
  };
  if (Api.is("userProfilePhoto", user_.photo)) {
    user.photo = constructChatPhoto(user_.photo, user.id, user_.access_hash ?? 0n);
  }

  return cleanObject(user);
}

export function constructUser2(chatP: ChatPPrivate): User {
  const user: User = {
    id: chatP.id,
    color: chatP.color,
    isBot: chatP.isBot,
    firstName: chatP.firstName,
    lastName: chatP.lastName,
    username: chatP.username,
    also: chatP.also,
    photo: chatP.photo,
    languageCode: chatP.languageCode,
    isScam: chatP.isScam,
    isFake: chatP.isFake,
    isPremium: chatP.isPremium,
    isVerified: chatP.isVerified,
    isSupport: chatP.isSupport,
    isRestricted: chatP.isRestricted,
    restrictionReason: chatP.restrictionReason,
    addedToAttachmentMenu: chatP.addedToAttachmentMenu,
    hasMainMiniApp: chatP.hasMainMiniApp,
  };
  return cleanObject(user);
}
