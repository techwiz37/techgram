import type { ChatP } from "./1_chat_p.js";
import type { Message } from "./6_message.js";
export interface Topic {
    id: number;
    date: number;
    creator: ChatP;
    isGeneral: boolean;
    isClosed: boolean;
    isHidden: boolean;
    name: string;
    color: number;
    customEmojiId?: string;
}
export declare function constructTopic(message: Message): Topic;
//# sourceMappingURL=7_topic.d.ts.map