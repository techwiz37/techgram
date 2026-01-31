import { cleanObject } from "../1_utilities.js";
import { Api } from "../2_tl.js";
import { constructClaimedGift } from "./5_claimed_gift.js";
export function constructClaimedGifts(savedStarGifts, getPeer) {
    return cleanObject({
        all: savedStarGifts.count,
        offset: savedStarGifts.next_offset,
        gifts: savedStarGifts.gifts.map((v) => {
            const fromId = v.from_id;
            if (Api.is("peerUser", fromId)) {
                return [v, savedStarGifts.users.find((u) => Api.is("user", u) && u.id === fromId.user_id)];
            }
            else if (Api.is("peerChat", fromId)) {
                return [v, savedStarGifts.chats.find((u) => Api.is("chat", u) && u.id === fromId.chat_id)];
            }
            else if (fromId) {
                return [v, savedStarGifts.chats.find((u) => Api.isOneOf(["channel", "channelForbidden"], u) && u.id === fromId.channel_id)];
            }
            else {
                return [v, undefined];
            }
        }).map((v) => constructClaimedGift(v[0], v[1], getPeer)),
    });
}
