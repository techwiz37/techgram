import { unreachable } from "../0_deps.js";
import { Api } from "../2_tl.js";
export function constructReaction(reaction) {
    if (Api.is("reactionEmoji", reaction)) {
        return { type: "emoji", emoji: reaction.emoticon };
    }
    else if (Api.is("reactionCustomEmoji", reaction)) {
        return { type: "custom", id: String(reaction.document_id) };
    }
    else if (Api.is("reactionPaid", reaction)) {
        return { type: "paid" };
    }
    else {
        unreachable();
    }
}
export function reactionToTlObject(reaction) {
    return reaction.type === "emoji" ? ({ _: "reactionEmoji", emoticon: reaction.emoji }) : reaction.type === "custom" ? ({ _: "reactionCustomEmoji", document_id: BigInt(reaction.id) }) : { _: "reactionPaid" };
}
export function reactionEqual(left, right) {
    if (left.type === "emoji") {
        if (right.type === "emoji" && left.emoji === right.emoji) {
            return true;
        }
    }
    else if (left.type === "custom") {
        if (right.type === "custom" && left.id === right.id) {
            return true;
        }
    }
    return false;
}
