import { unreachable } from "../0_deps.js";
import { InputError } from "../0_errors.js";
import { base64DecodeUrlSafe, base64EncodeUrlSafe, cleanObject, decodeText } from "../1_utilities.js";
import { Api } from "../2_tl.js";
import { constructUser2 } from "./2_user.js";
const ERR_INVALID_INLINE_MESSAGE_ID = new InputError("Invalid inline message ID");
export async function deserializeInlineMessageId(inlineMessageId) {
    try {
        const buffer = base64DecodeUrlSafe(inlineMessageId);
        const object = await Api.deserializeType("InputBotInlineMessageID", buffer);
        if (Api.is("inputBotInlineMessageID64", object) || Api.is("inputBotInlineMessageID", object)) {
            return object;
        }
    }
    catch {
        throw ERR_INVALID_INLINE_MESSAGE_ID;
    }
    throw ERR_INVALID_INLINE_MESSAGE_ID;
}
export async function constructCallbackQuery(callbackQuery, getPeer, getMessage) {
    const peer = getPeer({ _: "peerUser", user_id: callbackQuery.user_id });
    if (!peer) {
        unreachable();
    }
    const user = constructUser2(peer[0]);
    const id = String(callbackQuery.query_id);
    const gameShortName = callbackQuery.game_short_name;
    const data = callbackQuery.data !== undefined ? decodeText(callbackQuery.data) : undefined;
    const chatInstance = callbackQuery.chat_instance === 0n ? "" : String(callbackQuery.chat_instance);
    if (Api.is("updateBotCallbackQuery", callbackQuery)) {
        const message = await getMessage(Api.peerToChatId(callbackQuery.peer), Number(callbackQuery.msg_id));
        if (message === null) {
            unreachable();
        }
        return cleanObject({ id, from: user, message, chatInstance, data, gameShortName });
    }
    else {
        return cleanObject({ id, from: user, inlineMessageId: base64EncodeUrlSafe(Api.serializeObject(callbackQuery.msg_id)), chatInstance, data, gameShortName });
    }
}
