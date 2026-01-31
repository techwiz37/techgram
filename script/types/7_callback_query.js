"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeInlineMessageId = deserializeInlineMessageId;
exports.constructCallbackQuery = constructCallbackQuery;
const _0_deps_js_1 = require("../0_deps.js");
const _0_errors_js_1 = require("../0_errors.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _2_user_js_1 = require("./2_user.js");
const ERR_INVALID_INLINE_MESSAGE_ID = new _0_errors_js_1.InputError("Invalid inline message ID");
async function deserializeInlineMessageId(inlineMessageId) {
    try {
        const buffer = (0, _1_utilities_js_1.base64DecodeUrlSafe)(inlineMessageId);
        const object = await _2_tl_js_1.Api.deserializeType("InputBotInlineMessageID", buffer);
        if (_2_tl_js_1.Api.is("inputBotInlineMessageID64", object) || _2_tl_js_1.Api.is("inputBotInlineMessageID", object)) {
            return object;
        }
    }
    catch {
        throw ERR_INVALID_INLINE_MESSAGE_ID;
    }
    throw ERR_INVALID_INLINE_MESSAGE_ID;
}
async function constructCallbackQuery(callbackQuery, getPeer, getMessage) {
    const peer = getPeer({ _: "peerUser", user_id: callbackQuery.user_id });
    if (!peer) {
        (0, _0_deps_js_1.unreachable)();
    }
    const user = (0, _2_user_js_1.constructUser2)(peer[0]);
    const id = String(callbackQuery.query_id);
    const gameShortName = callbackQuery.game_short_name;
    const data = callbackQuery.data !== undefined ? (0, _1_utilities_js_1.decodeText)(callbackQuery.data) : undefined;
    const chatInstance = callbackQuery.chat_instance === 0n ? "" : String(callbackQuery.chat_instance);
    if (_2_tl_js_1.Api.is("updateBotCallbackQuery", callbackQuery)) {
        const message = await getMessage(_2_tl_js_1.Api.peerToChatId(callbackQuery.peer), Number(callbackQuery.msg_id));
        if (message === null) {
            (0, _0_deps_js_1.unreachable)();
        }
        return (0, _1_utilities_js_1.cleanObject)({ id, from: user, message, chatInstance, data, gameShortName });
    }
    else {
        return (0, _1_utilities_js_1.cleanObject)({ id, from: user, inlineMessageId: (0, _1_utilities_js_1.base64EncodeUrlSafe)(_2_tl_js_1.Api.serializeObject(callbackQuery.msg_id)), chatInstance, data, gameShortName });
    }
}
