import type { Api } from "../2_tl.js";
export interface CallbackQueryAnswer {
    isAlert: boolean;
    text: string;
    url: string;
}
export declare function constructCallbackQueryAnswer(answer: Api.messages_botCallbackAnswer): CallbackQueryAnswer;
//# sourceMappingURL=0_callback_query_answer.d.ts.map