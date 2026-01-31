"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructChosenInlineResult = constructChosenInlineResult;
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _0_location_js_1 = require("./0_location.js");
const _2_user_js_1 = require("./2_user.js");
function constructChosenInlineResult(ubis, getPeer) {
    const peer = getPeer({ ...ubis, _: "peerUser" });
    if (!peer || peer[0].type !== "private") {
        (0, _0_deps_js_1.unreachable)();
    }
    return (0, _1_utilities_js_1.cleanObject)({
        resultId: ubis.id,
        from: (0, _2_user_js_1.constructUser2)(peer[0]),
        location: _2_tl_js_1.Api.is("geoPoint", ubis.geo) ? (0, _0_location_js_1.constructLocation)(ubis.geo) : undefined,
        inlineMessageId: ubis.msg_id === undefined ? undefined : (0, _1_utilities_js_1.base64EncodeUrlSafe)(_2_tl_js_1.Api.serializeObject(ubis.msg_id)),
        query: ubis.query,
    });
}
