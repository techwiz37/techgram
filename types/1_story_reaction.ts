import type { Api } from "../2_tl.ts";
import { constructReaction, type Reaction } from "./0_reaction.ts";

export interface StoryReaction {

  reaction: Reaction;

  count: number;

  isChosen: boolean;
}

export function constructStoryReaction(reaction_: Api.reactionCount): StoryReaction {
  const reaction = constructReaction(reaction_.reaction);
  const count = reaction_.count;
  const chosen = reaction_.chosen_order !== undefined ? true : false;
  return { reaction, count, isChosen: chosen };
}
