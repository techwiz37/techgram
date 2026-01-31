import { Api } from "../2_tl.js";
import { type ChatListItem, type ChatMember, type ChatP, type ChatPChannel, type ChatPSupergroup, type ID } from "../3_types.js";
import type { CreateChannelParams, CreateGroupParams, CreateSupergroupParams, GetChatMembersParams, GetCommonChatsParams } from "./0_params.js";
import type { UpdateProcessor } from "./0_update_processor.js";
import type { C as C_ } from "./1_types.js";
import type { FileManager } from "./2_file_manager.js";
import type { MessageManager } from "./3_message_manager.js";
type C = C_ & {
    fileManager: FileManager;
    messageManager: MessageManager;
};
declare const chatListManagerUpdates: readonly ["updateChannel", "updateChat", "updateUser", "updateUserName"];
type ChatListManagerUpdate = Api.Types[(typeof chatListManagerUpdates)[number]];
export declare class ChatListManager implements UpdateProcessor<ChatListManagerUpdate, true> {
    #private;
    constructor(c: C);
    getChats(from?: "archived" | "main", after?: ChatListItem, limit?: number): Promise<ChatListItem[]>;
    canHandleUpdate(update: Api.Update): update is ChatListManagerUpdate;
    handleUpdate(update: ChatListManagerUpdate): Promise<null>;
    getChat(chatId: ID): Promise<import("../3_types.js").Chat>;
    getChatAdministrators(chatId: ID): Promise<ChatMember[]>;
    getChatMember(chatId: ID, userId: ID): Promise<ChatMember>;
    getChatMembers(chatId: ID, params?: GetChatMembersParams): Promise<ChatMember[]>;
    createGroup(title: string, params?: CreateGroupParams): Promise<import("../3_types.js").ChatPGroup>;
    createSupergroup(title: string, params?: CreateSupergroupParams): Promise<ChatPSupergroup>;
    createChannel(title: string, params?: CreateChannelParams): Promise<ChatPChannel>;
    setMessageTtl(chatId: ID, messageTtl: number): Promise<void>;
    archiveChats(chatIds: ID[]): Promise<void>;
    archiveChat(chatId: ID): Promise<void>;
    unarchiveChats(chatIds: ID[]): Promise<void>;
    unarchiveChat(chatId: ID): Promise<void>;
    getCommonChats(userId: ID, params?: GetCommonChatsParams): Promise<ChatP[]>;
    getChatSettings(chatId: ID): Promise<import("../3_types.js").ChatSettings>;
    disableBusinessBots(chatId: ID): Promise<void>;
    enableBusinessBots(chatId: ID): Promise<void>;
}
export {};
//# sourceMappingURL=4_chat_list_manager.d.ts.map