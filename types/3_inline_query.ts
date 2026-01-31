import { unreachable } from "../0_deps.ts";
import { Api } from "../2_tl.ts";
import { constructLocation, type Location } from "./0_location.ts";
import type { PeerGetter } from "./1_chat_p.ts";
import { constructUser2, type User } from "./2_user.ts";

export interface InlineQuery {

  id: string;

  from: User;

  query: string;

  offset: string;

  chatType?: "sender" | "private" | "group" | "supergroup" | "channel";

  location?: Location;
}

export function constructInlineQuery(query_: Api.updateBotInlineQuery, getPeer: PeerGetter): InlineQuery {
  const peer = getPeer({ _: "peerUser", user_id: query_.user_id });
  if (peer === null) {
    unreachable();
  }

  const user = constructUser2(peer[0]);

  let chatType: InlineQuery["chatType"] | undefined;
  if (query_.peer_type !== undefined) {
    if (Api.is("inlineQueryPeerTypeSameBotPM", query_.peer_type)) {
      chatType = "private";
    } else if (Api.is("inlineQueryPeerTypeBotPM", query_.peer_type) || Api.is("inlineQueryPeerTypePM", query_.peer_type)) {
      chatType = "sender";
    } else if (Api.is("inlineQueryPeerTypeChat", query_.peer_type)) {
      chatType = "group";
    } else if (Api.is("inlineQueryPeerTypeMegagroup", query_.peer_type)) {
      chatType = "supergroup";
    } else if (Api.is("inlineQueryPeerTypeBroadcast", query_.peer_type)) {
      chatType = "channel";
    } else {
      unreachable();
    }
  }

  const location = query_.geo !== undefined && Api.is("geoPoint", query_.geo) ? constructLocation(query_.geo) : undefined;

  return {
    id: String(query_.query_id),
    from: user,
    query: query_.query,
    offset: query_.offset,
    chatType,
    location,
  };
}
