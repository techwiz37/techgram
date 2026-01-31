export function constructCallbackQueryAnswer(answer) {
    return {
        isAlert: !!answer.alert,
        text: answer.message ?? "",
        url: answer.url ?? "",
    };
}
