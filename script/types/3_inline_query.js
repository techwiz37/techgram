"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructInlineQuery = constructInlineQuery;
const _0_deps_js_1 = require("../0_deps.js");
const _2_tl_js_1 = require("../2_tl.js");
const _0_location_js_1 = require("./0_location.js");
const _2_user_js_1 = require("./2_user.js");
function constructInlineQuery(query_, getPeer) {
    const peer = getPeer({ _: "peerUser", user_id: query_.user_id });
    if (peer === null) {
        (0, _0_deps_js_1.unreachable)();
    }
    const user = (0, _2_user_js_1.constructUser2)(peer[0]);
    let chatType;
    if (query_.peer_type !== undefined) {
        if (_2_tl_js_1.Api.is("inlineQueryPeerTypeSameBotPM", query_.peer_type)) {
            chatType = "private";
        }
        else if (_2_tl_js_1.Api.is("inlineQueryPeerTypeBotPM", query_.peer_type) || _2_tl_js_1.Api.is("inlineQueryPeerTypePM", query_.peer_type)) {
            chatType = "sender";
        }
        else if (_2_tl_js_1.Api.is("inlineQueryPeerTypeChat", query_.peer_type)) {
            chatType = "group";
        }
        else if (_2_tl_js_1.Api.is("inlineQueryPeerTypeMegagroup", query_.peer_type)) {
            chatType = "supergroup";
        }
        else if (_2_tl_js_1.Api.is("inlineQueryPeerTypeBroadcast", query_.peer_type)) {
            chatType = "channel";
        }
        else {
            (0, _0_deps_js_1.unreachable)();
        }
    }
    const location = query_.geo !== undefined && _2_tl_js_1.Api.is("geoPoint", query_.geo) ? (0, _0_location_js_1.constructLocation)(query_.geo) : undefined;
    return {
        id: String(query_.query_id),
        from: user,
        query: query_.query,
        offset: query_.offset,
        chatType,
        location,
    };
}
