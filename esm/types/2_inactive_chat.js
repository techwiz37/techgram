import { unreachable } from "../0_deps.js";
import { Api } from "../2_tl.js";
import { constructChatP } from "./1_chat_p.js";
export function constructInactiveChat(chat_, lastActivity) {
    if (Api.is("chatEmpty", chat_)) {
        unreachable();
    }
    const chat = constructChatP(chat_);
    return {
        lastActivity: lastActivity,
        chat,
    };
}
