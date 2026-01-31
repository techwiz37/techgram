"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructInlineQueryAnswer = constructInlineQueryAnswer;
const _1_utilities_js_1 = require("../1_utilities.js");
const _7_inline_query_result_js_1 = require("./7_inline_query_result.js");
function constructInlineQueryAnswer(results) {
    return (0, _1_utilities_js_1.cleanObject)({
        id: results.query_id + "",
        results: results.results.map(_7_inline_query_result_js_1.constructInlineQueryResult),
        nextOffset: results.next_offset,
    });
}
