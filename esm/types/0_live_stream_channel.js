export function constructLiveStreamChannel(channel) {
    return {
        id: channel.channel,
        scale: channel.scale,
        timestamp: Number(channel.last_timestamp_ms),
    };
}
