"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructBusinessConnection = constructBusinessConnection;
const _0_deps_js_1 = require("../0_deps.js");
const _1_chat_p_js_1 = require("./1_chat_p.js");
const _2_user_js_1 = require("./2_user.js");
function constructBusinessConnection(connection, getPeer) {
    const peer = getPeer({ ...connection, _: "peerUser" });
    if (!peer || !(0, _1_chat_p_js_1.isChatPUser)(peer[0])) {
        (0, _0_deps_js_1.unreachable)();
    }
    const user = (0, _2_user_js_1.constructUser2)(peer[0]);
    return {
        id: connection.connection_id,
        user,
        date: connection.date,
        canReply: !!connection.rights?.reply,
        isEnabled: !connection.disabled,
    };
}
