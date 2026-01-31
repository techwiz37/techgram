import { cleanObject } from "../1_utilities.js";
import { constructReaction } from "./0_reaction.js";
import { constructUser2 } from "./2_user.js";
export function constructMessageReactions(update, getPeer) {
    const date = update.date;
    const oldReactions = update.old_reactions.map((v) => constructReaction(v));
    const newReactions = update.new_reactions.map((v) => constructReaction(v));
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
        user = constructUser2(peer[0]);
    }
    else {
        actorChat = peer[0];
    }
    return cleanObject({
        chat,
        messageId,
        user,
        actorChat,
        date,
        oldReactions,
        newReactions,
    });
}
