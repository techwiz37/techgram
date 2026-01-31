import { cleanObject } from "../1_utilities.js";
export function constructMiniAppInfo(result) {
    return cleanObject({
        url: result.url,
        mode: result.fullscreen ? "fullscreen" : result.fullsize ? "default" : "compact",
        queryId: result.query_id ? String(result.query_id) : undefined,
    });
}
