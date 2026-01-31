import { unreachable } from "../0_deps.ts";
import { Api } from "../2_tl.ts";

export interface ReactionEmoji {
  type: "emoji";
  emoji: string;
}

export interface ReactionCustom {
  type: "custom";
  id: string;
}

export interface ReactionPaid {
  type: "paid";
}

export type Reaction = ReactionEmoji | ReactionCustom | ReactionPaid;

export function constructReaction(reaction: Api.Reaction): Reaction {
  if (Api.is("reactionEmoji", reaction)) {
    return { type: "emoji", emoji: reaction.emoticon };
  } else if (Api.is("reactionCustomEmoji", reaction)) {
    return { type: "custom", id: String(reaction.document_id) };
  } else if (Api.is("reactionPaid", reaction)) {
    return { type: "paid" };
  } else {
    unreachable();
  }
}

export function reactionToTlObject(reaction: Reaction): Api.Reaction {
  return reaction.type === "emoji" ? ({ _: "reactionEmoji", emoticon: reaction.emoji }) : reaction.type === "custom" ? ({ _: "reactionCustomEmoji", document_id: BigInt(reaction.id) }) : { _: "reactionPaid" };
}

export function reactionEqual(left: Reaction, right: Reaction): boolean {
  if (left.type === "emoji") {
    if (right.type === "emoji" && left.emoji === right.emoji) {
      return true;
    }
  } else if (left.type === "custom") {
    if (right.type === "custom" && left.id === right.id) {
      return true;
    }
  }
  return false;
}
