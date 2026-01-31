import { unreachable } from "../0_deps.js";
import { Api } from "../2_tl.js";
import { constructReaction } from "./0_reaction.js";
export function constructMessageReaction(reaction_, recentReactions) {
    const choosers = recentReactions
        .filter((v) => {
        if (Api.is("reactionEmoji", reaction_.reaction)) {
            return Api.is("reactionEmoji", v.reaction) && v.reaction.emoticon === reaction_.reaction.emoticon;
        }
        else if (Api.is("reactionCustomEmoji", reaction_.reaction)) {
            return Api.is("reactionCustomEmoji", v.reaction) && v.reaction.document_id === reaction_.reaction.document_id;
        }
        else {
            unreachable();
        }
    })
        .map((v) => Api.peerToChatId(v.peer_id));
    const reaction = constructReaction(reaction_.reaction);
    const count = reaction_.count;
    const chosen = reaction_.chosen_order !== undefined ? true : false;
    return { reaction, count, choosers, chosen };
}
