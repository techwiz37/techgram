import type { ID } from "./0_id.js";
import type { ReplyQuote } from "./3_reply_quote.js";
export interface ReplyToMessage {
    messageId: number;
    quote?: ReplyQuote;
}
export interface ReplyToStory {
    chatId: ID;
    storyId: number;
}
export type ReplyTo = ReplyToMessage | ReplyToStory;
//# sourceMappingURL=4_reply_to.d.ts.map