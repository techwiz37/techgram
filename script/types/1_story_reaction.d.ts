import type { Api } from "../2_tl.js";
import { type Reaction } from "./0_reaction.js";
export interface StoryReaction {
    reaction: Reaction;
    count: number;
    isChosen: boolean;
}
export declare function constructStoryReaction(reaction_: Api.reactionCount): StoryReaction;
//# sourceMappingURL=1_story_reaction.d.ts.map