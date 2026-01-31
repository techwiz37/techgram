import { type ID } from "../3_types.js";
import type { CreateTopicParams, EditTopicParams } from "./0_params.js";
import type { C as C_ } from "./1_types.js";
import type { MessageManager } from "./3_message_manager.js";
interface C extends C_ {
    messageManager: MessageManager;
}
export declare class ForumManager {
    #private;
    constructor(c: C);
    createTopic(chatId: ID, title: string, params?: CreateTopicParams): Promise<import("../3_types.js").Topic>;
    editTopic(chatId: ID, topicId: number, title: string, params?: EditTopicParams): Promise<import("../3_types.js").Topic>;
    hideGeneralTopic(chatId: ID): Promise<void>;
    showGeneralTopic(chatId: ID): Promise<void>;
    closeTopic(chatId: ID, topicId: number): Promise<void>;
    reopenTopic(chatId: ID, topicId: number): Promise<void>;
    pinTopic(chatId: ID, topicId: number): Promise<void>;
    unpinTopic(chatId: ID, topicId: number): Promise<void>;
}
export {};
//# sourceMappingURL=4_forum_manager.d.ts.map