import type { Api } from "../2_tl.ts";

export interface CallbackQueryAnswer {

  isAlert: boolean;

  text: string;

  url: string;
}

export function constructCallbackQueryAnswer(answer: Api.messages_botCallbackAnswer): CallbackQueryAnswer {
  return {
    isAlert: !!answer.alert,
    text: answer.message ?? "",
    url: answer.url ?? "",
  };
}
