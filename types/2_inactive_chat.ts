import { unreachable } from "../0_deps.ts";
import { Api } from "../2_tl.ts";
import { type ChatP, constructChatP } from "./1_chat_p.ts";

export interface InactiveChat {

  lastActivity: number;

  chat: ChatP;
}

export function constructInactiveChat(chat_: Api.Chat, lastActivity: number): InactiveChat {
  if (Api.is("chatEmpty", chat_)) {
    unreachable();
  }
  const chat = constructChatP(chat_);
  return {
    lastActivity: lastActivity,
    chat,
  };
}
