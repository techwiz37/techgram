import { cleanObject } from "../1_utilities.js";
import { constructInlineQueryResult } from "./7_inline_query_result.js";
export function constructInlineQueryAnswer(results) {
    return cleanObject({
        id: results.query_id + "",
        results: results.results.map(constructInlineQueryResult),
        nextOffset: results.next_offset,
    });
}
