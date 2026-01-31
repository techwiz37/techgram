import type { Api } from "../2_tl.js";
import { type MessageEntity } from "./2_message_entity.js";
export interface PollOption {
    text: string;
    entities: MessageEntity[];
    voterCount: number;
    isChosen: boolean;
}
export declare function constructPollOption(option: Api.PollAnswer, results: Array<Api.PollAnswerVoters>): PollOption;
//# sourceMappingURL=3_poll_option.d.ts.map