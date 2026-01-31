import { constructReaction } from "./0_reaction.js";
export function constructStoryReaction(reaction_) {
    const reaction = constructReaction(reaction_.reaction);
    const count = reaction_.count;
    const chosen = reaction_.chosen_order !== undefined ? true : false;
    return { reaction, count, isChosen: chosen };
}
