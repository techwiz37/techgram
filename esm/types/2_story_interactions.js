import { cleanObject } from "../1_utilities.js";
import { constructStoryReaction } from "./1_story_reaction.js";
export function constructStoryInteractions(views_) {
    const views = views_.views_count;
    const forwards = views_.forwards_count ?? 0;
    const reactionCount = views_.reactions_count;
    const reactions = views_.reactions ? views_.reactions.map(constructStoryReaction) : undefined;
    return cleanObject({ reactions, reactionCount, views, forwards });
}
