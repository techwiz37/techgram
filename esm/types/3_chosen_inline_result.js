import { unreachable } from "../0_deps.js";
import { base64EncodeUrlSafe, cleanObject } from "../1_utilities.js";
import { Api } from "../2_tl.js";
import { constructLocation } from "./0_location.js";
import { constructUser2 } from "./2_user.js";
export function constructChosenInlineResult(ubis, getPeer) {
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
