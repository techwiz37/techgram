import { Api } from "../2_tl.js";
export interface _VideoChatCommon {
    id: string;
}
export interface _VideoChatNotEndedCommon {
    title: string;
    isLiveStream: boolean;
    participantCount: number;
}
export interface VideoChatActive extends _VideoChatCommon, _VideoChatNotEndedCommon {
    type: "active";
    recording: boolean;
}
export interface VideoChatScheduled extends _VideoChatCommon, _VideoChatNotEndedCommon {
    type: "scheduled";
    scheduledFor: number;
}
export interface VideoChatEnded extends _VideoChatCommon {
    type: "ended";
    duration: number;
}
export type VideoChat = VideoChatActive | VideoChatScheduled | VideoChatEnded;
export declare function constructVideoChat(call: Api.GroupCall): VideoChat;
//# sourceMappingURL=0_video_chat.d.ts.map