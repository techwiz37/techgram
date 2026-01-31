import type { Api } from "../2_tl.ts";

export interface LiveStreamChannel {

  id: number;

  scale: number;

  timestamp: number;
}

export function constructLiveStreamChannel(channel: Api.groupCallStreamChannel): LiveStreamChannel {
  return {
    id: channel.channel,
    scale: channel.scale,
    timestamp: Number(channel.last_timestamp_ms),
  };
}
