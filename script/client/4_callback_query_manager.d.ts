import { Api } from "../2_tl.js";
import { type CallbackQueryQuestion, type ID, type Update } from "../3_types.js";
import type { AnswerCallbackQueryParams } from "./0_params.js";
import type { UpdateProcessor } from "./0_update_processor.js";
import type { C as C_ } from "./1_types.js";
import type { MessageManager } from "./3_message_manager.js";
type C = C_ & {
    messageManager: MessageManager;
};
declare const callbackQueryManagerUpdates: readonly ["updateBotCallbackQuery", "updateInlineBotCallbackQuery"];
type CallbackQueryManagerUpdate = Api.Types[(typeof callbackQueryManagerUpdates)[number]];
export declare class CallbackQueryManager implements UpdateProcessor<CallbackQueryManagerUpdate, true> {
    #private;
    constructor(c: C);
    answerCallbackQuery(id: string, params?: AnswerCallbackQueryParams): Promise<void>;
    sendCallbackQuery(botId: ID, messageId: number, question: CallbackQueryQuestion): Promise<import("../3_types.js").CallbackQueryAnswer>;
    canHandleUpdate(update: Api.Update): update is CallbackQueryManagerUpdate;
    handleUpdate(update: CallbackQueryManagerUpdate): Promise<Update>;
}
export {};
//# sourceMappingURL=4_callback_query_manager.d.ts.map