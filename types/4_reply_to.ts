import type { ID } from "./0_id.ts";
import type { ReplyQuote } from "./3_reply_quote.ts";

export interface ReplyToMessage {

  messageId: number;
  quote?: ReplyQuote;
}

export interface ReplyToStory {
  chatId: ID;

  storyId: number;
}

export type ReplyTo = ReplyToMessage | ReplyToStory;
