import { Api } from "../2_tl.js";
import type { InputPeerGetter } from "./_getters.js";
import type { ID } from "./0_id.js";
export interface BotCommandScopeDefault {
    type: "default";
}
export interface BotCommandScopeAllPrivateChats {
    type: "allPrivateChats";
}
export interface BotCommandScopeAllGroupChats {
    type: "allGroupChats";
}
export interface BotCommandScopeAllChatAdministrators {
    type: "allChatAdministrators";
}
export interface BotCommandScopeChat {
    type: "chat";
    chatId: ID;
}
export interface BotCommandScopeChatAdministrators {
    type: "chatAdministrators";
    chatId: ID;
}
export interface BotCommandScopeChatMember {
    type: "chatMember";
    chatId: ID;
    userId: number;
}
export type BotCommandScope = BotCommandScopeDefault | BotCommandScopeAllPrivateChats | BotCommandScopeAllGroupChats | BotCommandScopeAllChatAdministrators | BotCommandScopeChat | BotCommandScopeChatAdministrators | BotCommandScopeChatMember;
export declare function botCommandScopeToTlObject(scope: BotCommandScope, getInputPeer: InputPeerGetter): Promise<Api.BotCommandScope>;
//# sourceMappingURL=1_bot_command_scope.d.ts.map