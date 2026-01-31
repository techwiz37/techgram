import type { Api } from "../2_tl.js";
import { type Reaction } from "./0_reaction.js";
export interface ReactionCount {
    reaction: Reaction;
    count: number;
}
export declare function constructReactionCount(reaction_: Api.reactionCount): ReactionCount;
//# sourceMappingURL=1_reaction_count.d.ts.map