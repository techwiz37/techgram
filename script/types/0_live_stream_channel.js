"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructLiveStreamChannel = constructLiveStreamChannel;
function constructLiveStreamChannel(channel) {
    return {
        id: channel.channel,
        scale: channel.scale,
        timestamp: Number(channel.last_timestamp_ms),
    };
}
