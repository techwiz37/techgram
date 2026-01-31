import { Api } from "../2_tl.js";
import { type Update } from "../3_types.js";
import type { UpdateProcessor } from "./0_update_processor.js";
import type { C } from "./1_types.js";
declare const reactionManagerUpdates: readonly ["updateBotMessageReactions", "updateBotMessageReaction", "updateMessageReactions", "updateChannelMessageViews", "updateChannelMessageForwards"];
type ReactionManagerUpdate = Api.Types[(typeof reactionManagerUpdates)[number]];
export declare class ReactionManager implements UpdateProcessor<ReactionManagerUpdate, true> {
    #private;
    constructor(c: C);
    canHandleUpdate(update: Api.Update): update is ReactionManagerUpdate;
    handleUpdate(update: ReactionManagerUpdate): Promise<Update | null>;
}
export {};
//# sourceMappingURL=2_reaction_manager.d.ts.map