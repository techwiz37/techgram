import type { Api } from "../2_tl.js";
import { type ChatP, type PeerGetter } from "./1_chat_p.js";
import { type MessageEntity } from "./2_message_entity.js";
import { type Gift } from "./4_gift.js";
export interface ClaimedGift {
    date: number;
    gift: Gift;
    public: boolean;
    sender?: ChatP;
    message?: string;
    entities?: MessageEntity[];
    messageId?: number;
    convertionStars?: number;
}
export declare function constructClaimedGift(savedStarGift: Api.SavedStarGift, fromPeer: Api.User | Api.Chat | undefined, getPeer: PeerGetter): ClaimedGift;
//# sourceMappingURL=5_claimed_gift.d.ts.map