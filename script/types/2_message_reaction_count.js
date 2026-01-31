"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructMessageReactionCount = constructMessageReactionCount;
const _1_reaction_count_js_1 = require("./1_reaction_count.js");
function constructMessageReactionCount(update, getPeer) {
    const date = update.date;
    const reactions = update.reactions.map((v) => (0, _1_reaction_count_js_1.constructReactionCount)(v));
    const peer = getPeer(update.peer);
    if (peer) {
        const messageId = update.msg_id;
        const messageReactionCount = { chat: peer[0], messageId, date, reactions };
        return messageReactionCount;
    }
    else {
        return null;
    }
}
