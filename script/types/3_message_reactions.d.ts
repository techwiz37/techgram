import type { Api } from "../2_tl.js";
import { type Reaction } from "./0_reaction.js";
import type { ChatP, PeerGetter } from "./1_chat_p.js";
import { type User } from "./2_user.js";
export interface MessageReactions {
    chat: ChatP;
    messageId: number;
    user?: User;
    actorChat?: ChatP;
    date: number;
    oldReactions: Reaction[];
    newReactions: Reaction[];
}
export declare function constructMessageReactions(update: Api.updateBotMessageReaction, getPeer: PeerGetter): MessageReactions | null;
//# sourceMappingURL=3_message_reactions.d.ts.map