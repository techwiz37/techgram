import { unreachable } from "../0_deps.ts";
import { InputError } from "../0_errors.ts";
import { base64DecodeUrlSafe, base64EncodeUrlSafe, cleanObject, decodeText } from "../1_utilities.ts";
import { Api } from "../2_tl.ts";
import type { PeerGetter } from "./1_chat_p.ts";
import { constructUser2, type User } from "./2_user.ts";
import type { Message, MessageGetter } from "./6_message.ts";

export interface CallbackQuery {

  id: string;

  from: User;

  message?: Message;

  inlineMessageId?: string;

  chatInstance: string;

  data?: string;

  gameShortName?: string;
}

const ERR_INVALID_INLINE_MESSAGE_ID = new InputError("Invalid inline message ID");
export async function deserializeInlineMessageId(inlineMessageId: string): Promise<Api.InputBotInlineMessageID> {
  try {
    const buffer = base64DecodeUrlSafe(inlineMessageId);
    const object = await Api.deserializeType("InputBotInlineMessageID", buffer);
    if (Api.is("inputBotInlineMessageID64", object) || Api.is("inputBotInlineMessageID", object)) {
      return object;
    }
  } catch {
    throw ERR_INVALID_INLINE_MESSAGE_ID;
  }

  throw ERR_INVALID_INLINE_MESSAGE_ID;
}

export async function constructCallbackQuery(callbackQuery: Api.updateBotCallbackQuery | Api.updateInlineBotCallbackQuery, getPeer: PeerGetter, getMessage: MessageGetter): Promise<CallbackQuery> {
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
  } else {
    return cleanObject({ id, from: user, inlineMessageId: base64EncodeUrlSafe(Api.serializeObject(callbackQuery.msg_id)), chatInstance, data, gameShortName });
  }
}
