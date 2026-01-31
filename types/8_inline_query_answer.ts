import { cleanObject } from "../1_utilities.ts";
import type { Api } from "../2_tl.ts";
import { constructInlineQueryResult, type InlineQueryResult } from "./7_inline_query_result.ts";

export interface InlineQueryAnswer {

  id: string;

  results: InlineQueryResult[];

  nextOffset?: string;
}

export function constructInlineQueryAnswer(results: Api.messages_BotResults): InlineQueryAnswer {
  return cleanObject({
    id: results.query_id + "",
    results: results.results.map(constructInlineQueryResult),
    nextOffset: results.next_offset,
  });
}
