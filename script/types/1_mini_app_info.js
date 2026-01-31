"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructMiniAppInfo = constructMiniAppInfo;
const _1_utilities_js_1 = require("../1_utilities.js");
function constructMiniAppInfo(result) {
    return (0, _1_utilities_js_1.cleanObject)({
        url: result.url,
        mode: result.fullscreen ? "fullscreen" : result.fullsize ? "default" : "compact",
        queryId: result.query_id ? String(result.query_id) : undefined,
    });
}
