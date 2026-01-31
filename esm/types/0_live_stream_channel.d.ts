import type { Api } from "../2_tl.js";
export interface LiveStreamChannel {
    id: number;
    scale: number;
    timestamp: number;
}
export declare function constructLiveStreamChannel(channel: Api.groupCallStreamChannel): LiveStreamChannel;
//# sourceMappingURL=0_live_stream_channel.d.ts.map