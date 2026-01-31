import { cleanObject } from "../1_utilities.ts";
import type { Api } from "../2_tl.ts";
import { constructStoryReaction, type StoryReaction } from "./1_story_reaction.ts";

export interface StoryInteractions {
  reactions?: StoryReaction[];
  reactionCount?: number;
  views: number;
  forwards: number;
}

export function constructStoryInteractions(views_: Api.storyViews): StoryInteractions {
  const views = views_.views_count;
  const forwards = views_.forwards_count ?? 0;
  const reactionCount = views_.reactions_count;
  const reactions = views_.reactions ? views_.reactions.map(constructStoryReaction) : undefined;
  return cleanObject({ reactions, reactionCount, views, forwards });
}
