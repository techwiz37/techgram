import { unreachable } from "../0_deps.ts";
import { cleanObject } from "../1_utilities.ts";
import { Api } from "../2_tl.ts";
import { type Birthday, constructBirthday } from "./0_birthday.ts";
import { constructLocation, type Location } from "./0_location.ts";
import { constructOpeningHours, type OpeningHours } from "./0_opening_hours.ts";
import type { ChatPChannel, ChatPGroup, ChatPPrivate, ChatPSupergroup, PeerGetter } from "./1_chat_p.ts";
import { constructPhoto, type Photo } from "./1_photo.ts";

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

export function constructChat(fullChat: Api.userFull | Api.chatFull | Api.channelFull, getPeer: PeerGetter): Chat {
  if (Api.is("userFull", fullChat)) {
    const peer = getPeer({ _: "peerUser", user_id: fullChat.id });
    if (!peer) unreachable();
    return cleanObject({
      ...peer[0],
      birthday: fullChat.birthday ? constructBirthday(fullChat.birthday) : undefined,
      photo: fullChat.profile_photo && Api.is("photo", fullChat.profile_photo) ? constructPhoto(fullChat.profile_photo) : undefined,
      address: fullChat.business_location?.address,
      location: fullChat.business_location?.geo_point && Api.is("geoPoint", fullChat.business_location.geo_point) ? constructLocation(fullChat.business_location.geo_point) : undefined,
      openingHours: fullChat.business_work_hours ? constructOpeningHours(fullChat.business_work_hours) : undefined,
    });
  } else if (Api.is("chatFull", fullChat)) {
    const peer = getPeer({ _: "peerChat", chat_id: fullChat.id });
    if (peer === null) unreachable();
    return cleanObject({
      ...peer[0],
      photo: fullChat.chat_photo && Api.is("photo", fullChat.chat_photo) ? constructPhoto(fullChat.chat_photo) : undefined,
      videoChatId: Api.is("inputGroupCall", fullChat.call) ? String(fullChat.call.id) : undefined,
    });
  } else if (Api.is("channelFull", fullChat)) {
    const peer = getPeer({ _: "peerChannel", channel_id: fullChat.id });
    if (peer === null) unreachable();
    return cleanObject({
      ...peer[0],
      photo: fullChat.chat_photo && Api.is("photo", fullChat.chat_photo) ? constructPhoto(fullChat.chat_photo) : undefined,
      videoChatId: Api.is("inputGroupCall", fullChat.call) ? String(fullChat.call.id) : undefined,
    });
  }
  unreachable();
}
