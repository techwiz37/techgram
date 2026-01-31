import { Api } from "../2_tl.js";
export function constructVideoChat(call) {
    const id = String(call.id);
    if (Api.is("groupCallDiscarded", call)) {
        return {
            type: "ended",
            id,
            duration: call.duration,
        };
    }
    else {
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
        }
        else {
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
