import { unreachable } from "../0_deps.ts";
import type { Api } from "../2_tl.ts";
import { isChatPUser, type PeerGetter } from "./1_chat_p.ts";
import { constructUser2, type User } from "./2_user.ts";

export interface BusinessConnection {

  id: string;

  user: User;

  date: number;

  canReply: boolean;

  isEnabled: boolean;
}

export function constructBusinessConnection(connection: Api.botBusinessConnection, getPeer: PeerGetter): BusinessConnection {
  const peer = getPeer({ ...connection, _: "peerUser" });
  if (!peer || !isChatPUser(peer[0])) {
    unreachable();
  }
  const user = constructUser2(peer[0]);
  return {
    id: connection.connection_id,
    user,
    date: connection.date,
    canReply: !!connection.rights?.reply,
    isEnabled: !connection.disabled,
  };
}
