import { constructReactionCount } from "./1_reaction_count.js";
export function constructMessageReactionCount(update, getPeer) {
    const date = update.date;
    const reactions = update.reactions.map((v) => constructReactionCount(v));
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
