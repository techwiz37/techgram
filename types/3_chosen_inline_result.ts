import { unreachable } from "../0_deps.ts";
import { base64EncodeUrlSafe, cleanObject } from "../1_utilities.ts";
import { Api } from "../2_tl.ts";
import { constructLocation, type Location } from "./0_location.ts";
import type { PeerGetter } from "./1_chat_p.ts";
import { constructUser2, type User } from "./2_user.ts";

export interface ChosenInlineResult {

  resultId: string;

  from: User;

  location?: Location;

  inlineMessageId?: string;

  query: string;
}

export function constructChosenInlineResult(ubis: Api.updateBotInlineSend, getPeer: PeerGetter): ChosenInlineResult {
  const peer = getPeer({ ...ubis, _: "peerUser" });
  if (!peer || peer[0].type !== "private") {
    unreachable();
  }
  return cleanObject({
    resultId: ubis.id,
    from: constructUser2(peer[0]),
    location: Api.is("geoPoint", ubis.geo) ? constructLocation(ubis.geo) : undefined,
    inlineMessageId: ubis.msg_id === undefined ? undefined : base64EncodeUrlSafe(Api.serializeObject(ubis.msg_id)),
    query: ubis.query,
  });
}
