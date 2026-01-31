import { unreachable } from "../0_deps.js";
import { Api } from "../2_tl.js";
import { constructLocation } from "./0_location.js";
import { constructUser2 } from "./2_user.js";
export function constructInlineQuery(query_, getPeer) {
    const peer = getPeer({ _: "peerUser", user_id: query_.user_id });
    if (peer === null) {
        unreachable();
    }
    const user = constructUser2(peer[0]);
    let chatType;
    if (query_.peer_type !== undefined) {
        if (Api.is("inlineQueryPeerTypeSameBotPM", query_.peer_type)) {
            chatType = "private";
        }
        else if (Api.is("inlineQueryPeerTypeBotPM", query_.peer_type) || Api.is("inlineQueryPeerTypePM", query_.peer_type)) {
            chatType = "sender";
        }
        else if (Api.is("inlineQueryPeerTypeChat", query_.peer_type)) {
            chatType = "group";
        }
        else if (Api.is("inlineQueryPeerTypeMegagroup", query_.peer_type)) {
            chatType = "supergroup";
        }
        else if (Api.is("inlineQueryPeerTypeBroadcast", query_.peer_type)) {
            chatType = "channel";
        }
        else {
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
