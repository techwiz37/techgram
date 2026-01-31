import type { Api } from "../2_tl.js";
import type { ChatP, PeerGetter } from "./1_chat_p.js";
import { type ReactionCount } from "./1_reaction_count.js";
export interface MessageReactionCount {
    chat: ChatP;
    messageId: number;
    date: number;
    reactions: ReactionCount[];
}
export declare function constructMessageReactionCount(update: Api.updateBotMessageReactions, getPeer: PeerGetter): MessageReactionCount | null;
//# sourceMappingURL=2_message_reaction_count.d.ts.map