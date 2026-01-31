import { Api } from "../2_tl.js";
import { type Reaction } from "./0_reaction.js";
export interface MessageReaction {
    reaction: Reaction;
    count: number;
    choosers: number[];
    chosen: boolean;
}
export declare function constructMessageReaction(reaction_: Api.reactionCount, recentReactions: Api.messagePeerReaction[]): MessageReaction;
//# sourceMappingURL=1_message_reaction.d.ts.map