import type { Api } from "../2_tl.js";
import { type MessageEntity } from "./2_message_entity.js";
export interface ReplyQuote {
    offset: number;
    text: string;
    entities: MessageEntity[];
}
export declare function constructReplyQuote(quoteText: string | undefined, quoteOffset: number | undefined, quoteEntities: Api.MessageEntity[] | undefined): ReplyQuote;
//# sourceMappingURL=3_reply_quote.d.ts.map