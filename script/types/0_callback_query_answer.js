"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructCallbackQueryAnswer = constructCallbackQueryAnswer;
function constructCallbackQueryAnswer(answer) {
    return {
        isAlert: !!answer.alert,
        text: answer.message ?? "",
        url: answer.url ?? "",
    };
}
