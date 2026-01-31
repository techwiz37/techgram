import { InputError } from "../0_errors.ts";

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

export function validateCallbackQueryQuestion(q: CallbackQueryQuestion) {
  if (!["game", "password", "button"].includes(q.type)) {
    throw new InputError("Got invalid callback query question type.");
  }
  if (q.type === "password" && (typeof q.password !== "string" || !q.password)) {
    throw new InputError("Got empty password.");
  }
  if ((q.type === "button" || q.type === "password") && (typeof q.data !== "string" || !q.data)) {
    throw new InputError("Got empty button data.");
  }
}
