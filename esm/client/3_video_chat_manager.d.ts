import { Api } from "../2_tl.js";
import { type ID, type Update, type VideoChatActive, type VideoChatScheduled } from "../3_types.js";
import type { DownloadLiveStreamSegmentParams, JoinVideoChatParams, StartVideoChatParams } from "./0_params.js";
import type { UpdateProcessor } from "./0_update_processor.js";
import type { C as C_ } from "./1_types.js";
import type { FileManager } from "./2_file_manager.js";
interface C extends C_ {
    fileManager: FileManager;
}
declare const videoChatManagerUpdates: readonly ["updateGroupCall"];
type VideoChatManagerUpdate = Api.Types[(typeof videoChatManagerUpdates)[number]];
export declare class VideoChatManager implements UpdateProcessor<VideoChatManagerUpdate, true> {
    #private;
    constructor(c: C);
    startVideoChat(chatId: ID, params?: StartVideoChatParams): Promise<VideoChatActive>;
    scheduleVideoChat(chatId: ID, startAt: number, params?: StartVideoChatParams): Promise<VideoChatScheduled>;
    joinVideoChat(id: string, params: string, params_?: JoinVideoChatParams): Promise<string>;
    leaveVideoChat(id: string): Promise<void>;
    joinLiveStream(id: string): Promise<void>;
    getVideoChat(id: string): Promise<import("../3_types.js").VideoChat>;
    canHandleUpdate(update: Api.Update): update is VideoChatManagerUpdate;
    handleUpdate(update: VideoChatManagerUpdate): Promise<Update | null>;
    getLiveStreamChannels(id: string): Promise<import("../3_types.js").LiveStreamChannel[]>;
    downloadLiveStreamSegment(id: string, channel: number, scale: number, timestamp: number, params?: DownloadLiveStreamSegmentParams): Promise<Uint8Array<ArrayBuffer>>;
}
export {};
//# sourceMappingURL=3_video_chat_manager.d.ts.map