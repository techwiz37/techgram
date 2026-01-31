import { Api } from "../2_tl.js";
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
export declare function constructReaction(reaction: Api.Reaction): Reaction;
export declare function reactionToTlObject(reaction: Reaction): Api.Reaction;
export declare function reactionEqual(left: Reaction, right: Reaction): boolean;
//# sourceMappingURL=0_reaction.d.ts.map