import { Api } from "../2_tl.js";
import { type ID, type Update } from "../3_types.js";
import type { UpdateProcessor } from "./0_update_processor.js";
import type { C as C_ } from "./1_types.js";
import type { MessageManager } from "./3_message_manager.js";
type C = C_ & {
    messageManager: MessageManager;
};
declare const pollManagerUpdates: readonly ["updateMessagePoll", "updateMessagePollVote"];
type PollManagerUpdate = Api.Types[(typeof pollManagerUpdates)[number]];
export declare class PollManager implements UpdateProcessor<PollManagerUpdate, true> {
    #private;
    constructor(c: C);
    vote(chatId: ID, messageId: number, optionIndexes: number[]): Promise<void>;
    retractVote(chatId: ID, messageId: number): Promise<void>;
    canHandleUpdate(update: Api.Update): update is PollManagerUpdate;
    handleUpdate(update: PollManagerUpdate): Promise<Update | null>;
}
export {};
//# sourceMappingURL=4_poll_manager.d.ts.map