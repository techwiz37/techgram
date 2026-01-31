import type { Api } from "../2_tl.js";
import { type StoryReaction } from "./1_story_reaction.js";
export interface StoryInteractions {
    reactions?: StoryReaction[];
    reactionCount?: number;
    views: number;
    forwards: number;
}
export declare function constructStoryInteractions(views_: Api.storyViews): StoryInteractions;
//# sourceMappingURL=2_story_interactions.d.ts.map