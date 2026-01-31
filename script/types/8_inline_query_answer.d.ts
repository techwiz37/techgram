import type { Api } from "../2_tl.js";
import { type InlineQueryResult } from "./7_inline_query_result.js";
export interface InlineQueryAnswer {
    id: string;
    results: InlineQueryResult[];
    nextOffset?: string;
}
export declare function constructInlineQueryAnswer(results: Api.messages_BotResults): InlineQueryAnswer;
//# sourceMappingURL=8_inline_query_answer.d.ts.map