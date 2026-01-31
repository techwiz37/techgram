import { constructReaction } from "./0_reaction.js";
export function constructReactionCount(reaction_) {
    const reaction = constructReaction(reaction_.reaction);
    const count = reaction_.count;
    return { reaction, count };
}
