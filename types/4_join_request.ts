import { unreachable } from "../0_deps.ts";
import { cleanObject } from "../1_utilities.ts";
import { Api } from "../2_tl.ts";
import type { ChatP, PeerGetter } from "./1_chat_p.ts";
import { constructUser2, type User } from "./2_user.ts";
import { constructInviteLink, type InviteLink } from "./3_invite_link.ts";

export interface JoinRequest {

  chat: ChatP;

  from: User;

  date: number;

  bio?: string;

  inviteLink?: InviteLink;
}

export function constructJoinRequest(update: Api.updateBotChatInviteRequester, getPeer: PeerGetter): JoinRequest {
  const peer = getPeer(update.peer);
  if (!peer) {
    unreachable();
  }
  const chat = peer[0];
  const userPeer = getPeer({ _: "peerUser", user_id: update.user_id });
  if (!userPeer) {
    unreachable();
  }
  const from = constructUser2(userPeer[0]);
  const inviteLink = update.invite && Api.is("chatInviteExported", update.invite) ? constructInviteLink(update.invite, getPeer) : undefined;
  return cleanObject({
    chat,
    from,
    date: update.date,
    bio: update.about,
    inviteLink,
  });
}

export function constructJoinRequest2(peer: Api.Peer, inviteImporter: Api.ChatInviteImporter, getPeer: PeerGetter): JoinRequest {
  const peer_ = getPeer(peer);
  if (!peer_) {
    unreachable();
  }
  const chat = peer_[0];
  const userPeer = getPeer({ _: "peerUser", user_id: inviteImporter.user_id });
  if (!userPeer) {
    unreachable();
  }
  const from = constructUser2(userPeer[0]);
  return cleanObject({
    chat,
    from,
    date: inviteImporter.date,
    bio: inviteImporter.about,
  });
}
