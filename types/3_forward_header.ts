import { unreachable } from "../0_deps.ts";
import { cleanObject } from "../1_utilities.ts";
import type { Api } from "../2_tl.ts";
import type { ChatPChannel, ChatPSupergroup, PeerGetter } from "./1_chat_p.ts";
import { constructUser2, type User } from "./2_user.ts";

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

export function constructForwardHeader(fwdHeader: Api.MessageFwdHeader, getPeer: PeerGetter): ForwardHeader {
  if (fwdHeader.channel_post && fwdHeader.from_id?._ === "peerChannel") {
    const peer = getPeer(fwdHeader.from_id);
    if (peer === null) {
      unreachable();
    }
    return cleanObject({
      type: "channel",
      date: fwdHeader.date,
      chat: peer[0] as ChatPChannel,
      messageId: fwdHeader.channel_post,
      authorSignature: fwdHeader.post_author,
    });
  } else if (fwdHeader.from_id?._ === "peerChannel") {
    const peer = getPeer(fwdHeader.from_id);
    if (peer === null) {
      unreachable();
    }
    return cleanObject({
      type: "supergroup",
      date: fwdHeader.date,
      chat: peer[0] as ChatPSupergroup,
      title: fwdHeader.post_author,
    });
  } else if (fwdHeader.from_id?._ === "peerUser") {
    const peer = getPeer(fwdHeader.from_id);
    if (peer === null || peer[0].type !== "private") {
      unreachable();
    }
    return {
      type: "user",
      date: fwdHeader.date,
      user: constructUser2(peer[0]),
    };
  } else if (fwdHeader.from_name) {
    return {
      type: "hidden",
      date: fwdHeader.date,
      name: fwdHeader.from_name,
    };
  } else {
    return {
      type: "unsupported",
      date: fwdHeader.date,
    };
  }
}
