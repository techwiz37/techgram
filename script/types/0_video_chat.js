"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructVideoChat = constructVideoChat;
const _2_tl_js_1 = require("../2_tl.js");
function constructVideoChat(call) {
    const id = String(call.id);
    if (_2_tl_js_1.Api.is("groupCallDiscarded", call)) {
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
