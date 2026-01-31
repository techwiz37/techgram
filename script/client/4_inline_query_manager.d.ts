import { Api } from "../2_tl.js";
import { type ID, type InlineQueryResult, type Update } from "../3_types.js";
import type { AnswerInlineQueryParams, SendInlineQueryParams } from "./0_params.js";
import type { UpdateProcessor } from "./0_update_processor.js";
import type { C as C_ } from "./1_types.js";
import type { MessageManager } from "./3_message_manager.js";
type C = C_ & {
    messageManager: MessageManager;
};
declare const inlineQueryManagerUpdates: readonly ["updateBotInlineQuery", "updateBotInlineSend"];
type InlineQueryManagerUpdate = Api.Types[(typeof inlineQueryManagerUpdates)[number]];
export declare class InlineQueryManager implements UpdateProcessor<InlineQueryManagerUpdate> {
    #private;
    constructor(c: C);
    answerInlineQuery(id: string, results: InlineQueryResult[], params?: AnswerInlineQueryParams): Promise<void>;
    canHandleUpdate(update: Api.Update): update is InlineQueryManagerUpdate;
    handleUpdate(update: InlineQueryManagerUpdate): Update;
    sendInlineQuery(botId_: ID, chatId: ID, params?: SendInlineQueryParams): Promise<import("../3_types.js").InlineQueryAnswer>;
}
export {};
//# sourceMappingURL=4_inline_query_manager.d.ts.map