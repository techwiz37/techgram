import { unreachable } from "../0_deps.js";
import { cleanObject } from "../1_utilities.js";
import { constructUser2 } from "./2_user.js";
export function constructForwardHeader(fwdHeader, getPeer) {
    if (fwdHeader.channel_post && fwdHeader.from_id?._ === "peerChannel") {
        const peer = getPeer(fwdHeader.from_id);
        if (peer === null) {
            unreachable();
        }
        return cleanObject({
            type: "channel",
            date: fwdHeader.date,
            chat: peer[0],
            messageId: fwdHeader.channel_post,
            authorSignature: fwdHeader.post_author,
        });
    }
    else if (fwdHeader.from_id?._ === "peerChannel") {
        const peer = getPeer(fwdHeader.from_id);
        if (peer === null) {
            unreachable();
        }
        return cleanObject({
            type: "supergroup",
            date: fwdHeader.date,
            chat: peer[0],
            title: fwdHeader.post_author,
        });
    }
    else if (fwdHeader.from_id?._ === "peerUser") {
        const peer = getPeer(fwdHeader.from_id);
        if (peer === null || peer[0].type !== "private") {
            unreachable();
        }
        return {
            type: "user",
            date: fwdHeader.date,
            user: constructUser2(peer[0]),
        };
    }
    else if (fwdHeader.from_name) {
        return {
            type: "hidden",
            date: fwdHeader.date,
            name: fwdHeader.from_name,
        };
    }
    else {
        return {
            type: "unsupported",
            date: fwdHeader.date,
        };
    }
}
