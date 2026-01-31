export interface CallbackQueryQuestionGame {
    type: "game";
}
export interface CallbackQueryQuestionPassword {
    type: "password";
    data: string;
    password: string;
}
export interface CallbackQueryQuestionButton {
    type: "button";
    data: string;
}
export type CallbackQueryQuestion = CallbackQueryQuestionGame | CallbackQueryQuestionPassword | CallbackQueryQuestionButton;
export declare function validateCallbackQueryQuestion(q: CallbackQueryQuestion): void;
//# sourceMappingURL=0_callback_query_question.d.ts.map