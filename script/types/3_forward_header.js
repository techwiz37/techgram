"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructForwardHeader = constructForwardHeader;
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_user_js_1 = require("./2_user.js");
function constructForwardHeader(fwdHeader, getPeer) {
    if (fwdHeader.channel_post && fwdHeader.from_id?._ === "peerChannel") {
        const peer = getPeer(fwdHeader.from_id);
        if (peer === null) {
            (0, _0_deps_js_1.unreachable)();
        }
        return (0, _1_utilities_js_1.cleanObject)({
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
            (0, _0_deps_js_1.unreachable)();
        }
        return (0, _1_utilities_js_1.cleanObject)({
            type: "supergroup",
            date: fwdHeader.date,
            chat: peer[0],
            title: fwdHeader.post_author,
        });
    }
    else if (fwdHeader.from_id?._ === "peerUser") {
        const peer = getPeer(fwdHeader.from_id);
        if (peer === null || peer[0].type !== "private") {
            (0, _0_deps_js_1.unreachable)();
        }
        return {
            type: "user",
            date: fwdHeader.date,
            user: (0, _2_user_js_1.constructUser2)(peer[0]),
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
