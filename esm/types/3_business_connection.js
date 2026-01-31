import { unreachable } from "../0_deps.js";
import { isChatPUser } from "./1_chat_p.js";
import { constructUser2 } from "./2_user.js";
export function constructBusinessConnection(connection, getPeer) {
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
