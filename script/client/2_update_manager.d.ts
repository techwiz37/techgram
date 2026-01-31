import { Queue } from "../1_utilities.js";
import { Api } from "../2_tl.js";
import type { ID } from "../3_types.js";
import type { OpenChatParams } from "./0_params.js";
import type { C } from "./1_types.js";
type UpdateHandler = (update: Api.Update) => Promise<(() => Promise<unknown>)>;
export type PtsUpdate = Api.updateNewMessage | Api.updateDeleteMessages | Api.updateReadHistoryInbox | Api.updateReadHistoryOutbox | Api.updatePinnedChannelMessages | Api.updatePinnedMessages | Api.updateFolderPeers | Api.updateChannelWebPage | Api.updateEditMessage | Api.updateReadMessagesContents | Api.updateWebPage;
export type ChannelPtsUpdate = Api.updateNewChannelMessage | Api.updateEditChannelMessage | Api.updateDeleteChannelMessages | Api.updateChannelTooLong;
export type QtsUpdate = Api.updateNewEncryptedMessage | Api.updateMessagePollVote | Api.updateBotStopped | Api.updateChatParticipant | Api.updateChannelParticipant | Api.updateBotChatInviteRequester | Api.updateBotChatBoost | Api.updateBotMessageReaction | Api.updateBotMessageReactions | Api.updateBotBusinessConnect | Api.updateBotNewBusinessMessage | Api.updateBotEditBusinessMessage | Api.updateBotDeleteBusinessMessage;
export declare class UpdateManager {
    #private;
    static readonly QTS_COUNT = 1;
    static readonly MAIN_BOX_ID = 0n;
    constructor(c: C);
    static isPtsUpdate(v: Api.Update): v is PtsUpdate;
    static isQtsUpdate(v: Api.Update): v is QtsUpdate;
    static isChannelPtsUpdate(v: Api.Update | Api.Updates): v is ChannelPtsUpdate;
    fetchState(source: string): Promise<void>;
    processChats(chats: Api.Chat[], _context: Api.DeserializedType): void;
    processChat(chat: Api.Chat): void;
    processResult(result: Api.DeserializedType): Promise<void>;
    processUsers(users: Api.User[], _context: Api.DeserializedType): void;
    processUser(user: Api.User): void;
    getHandleUpdateQueue(boxId: bigint): Queue;
    processUpdates(updates: Api.Update | Api.Updates, checkGap: boolean, call?: Api.AnyObject | null, callback?: () => void): void;
    recoverUpdateGap(source: string): Promise<void>;
    setUpdateHandler(handler: UpdateHandler): void;
    openChat(chatId: ID, params?: OpenChatParams): Promise<void>;
    closeChat(chatId: ID): Promise<void>;
    closeAllChats(): void;
}
export {};
//# sourceMappingURL=2_update_manager.d.ts.map