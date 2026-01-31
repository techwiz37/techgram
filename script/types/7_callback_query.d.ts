import { Api } from "../2_tl.js";
import type { PeerGetter } from "./1_chat_p.js";
import { type User } from "./2_user.js";
import type { Message, MessageGetter } from "./6_message.js";
export interface CallbackQuery {
    id: string;
    from: User;
    message?: Message;
    inlineMessageId?: string;
    chatInstance: string;
    data?: string;
    gameShortName?: string;
}
export declare function deserializeInlineMessageId(inlineMessageId: string): Promise<Api.InputBotInlineMessageID>;
export declare function constructCallbackQuery(callbackQuery: Api.updateBotCallbackQuery | Api.updateInlineBotCallbackQuery, getPeer: PeerGetter, getMessage: MessageGetter): Promise<CallbackQuery>;
//# sourceMappingURL=7_callback_query.d.ts.map