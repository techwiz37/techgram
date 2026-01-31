import { Api } from "../2_tl.js";
import { type ChatP } from "./1_chat_p.js";
export interface InactiveChat {
    lastActivity: number;
    chat: ChatP;
}
export declare function constructInactiveChat(chat_: Api.Chat, lastActivity: number): InactiveChat;
//# sourceMappingURL=2_inactive_chat.d.ts.map