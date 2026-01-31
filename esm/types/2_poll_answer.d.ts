import type { Api } from "../2_tl.js";
import type { ChatP, PeerGetter } from "./1_chat_p.js";
export interface PollAnswer {
    pollId: string;
    from: ChatP;
    optionIndexes: number[];
}
export declare function constructPollAnswer(update: Api.updateMessagePollVote, getPeer: PeerGetter): PollAnswer;
//# sourceMappingURL=2_poll_answer.d.ts.map