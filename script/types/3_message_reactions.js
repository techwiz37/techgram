"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructMessageReactions = constructMessageReactions;
const _1_utilities_js_1 = require("../1_utilities.js");
const _0_reaction_js_1 = require("./0_reaction.js");
const _2_user_js_1 = require("./2_user.js");
function constructMessageReactions(update, getPeer) {
    const date = update.date;
    const oldReactions = update.old_reactions.map((v) => (0, _0_reaction_js_1.constructReaction)(v));
    const newReactions = update.new_reactions.map((v) => (0, _0_reaction_js_1.constructReaction)(v));
    const messageId = update.msg_id;
    let peer = getPeer(update.peer);
    if (!peer) {
        return null;
    }
    const chat = peer[0];
    let user = undefined;
    let actorChat = undefined;
    peer = getPeer(update.actor);
    if (!peer) {
        return null;
    }
    if (peer[0].type === "private") {
        user = (0, _2_user_js_1.constructUser2)(peer[0]);
    }
    else {
        actorChat = peer[0];
    }
    return (0, _1_utilities_js_1.cleanObject)({
        chat,
        messageId,
        user,
        actorChat,
        date,
        oldReactions,
        newReactions,
    });
}
