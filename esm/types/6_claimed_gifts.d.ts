import { Api } from "../2_tl.js";
import type { PeerGetter } from "./1_chat_p.js";
import { type ClaimedGift } from "./5_claimed_gift.js";
export interface ClaimedGifts {
    all: number;
    offset?: string;
    gifts: ClaimedGift[];
}
export declare function constructClaimedGifts(savedStarGifts: Api.payments_SavedStarGifts, getPeer: PeerGetter): ClaimedGifts;
//# sourceMappingURL=6_claimed_gifts.d.ts.map