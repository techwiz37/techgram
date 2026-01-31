import type { Api } from "../2_tl.js";
import { type MessageEntity } from "./2_message_entity.js";
import { type PollOption } from "./3_poll_option.js";
export interface Poll {
    id: string;
    question: string;
    questionEntities: MessageEntity[];
    options: PollOption[];
    totalVoterCount: number;
    isClosed: boolean;
    isAnonymous: boolean;
    type: "regular" | "quiz";
    allowMultipleAnswers?: boolean;
    correctOptionIndex?: number;
    explanation?: string;
    explanationEntities?: MessageEntity[];
    openPeriod?: number;
    closeDate?: number;
}
export declare function constructPoll(media_: Api.messageMediaPoll): Poll;
//# sourceMappingURL=4_poll.d.ts.map