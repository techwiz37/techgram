import { Api } from "../2_tl.ts";

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

export function constructVideoChat(call: Api.GroupCall): VideoChat {
  const id = String(call.id);
  if (Api.is("groupCallDiscarded", call)) {
    return {
      type: "ended",
      id,
      duration: call.duration,
    };
  } else {
    const title = call.title ?? "";
    const liveStream = call.rtmp_stream ? true : false;
    const participantCount = call.participants_count;
    if (call.schedule_date) {
      return {
        type: "scheduled",
        id,
        title,
        scheduledFor: call.schedule_date,
        isLiveStream: liveStream,
        participantCount,
      };
    } else {
      return {
        type: "active",
        id,
        title,
        isLiveStream: liveStream,
        recording: call.record_video_active ? true : false,
        participantCount,
      };
    }
  }
}
