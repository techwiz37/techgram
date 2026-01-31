import { cleanObject } from "../1_utilities.js";
import { constructChatP } from "./1_chat_p.js";
import { constructMessageEntity } from "./2_message_entity.js";
import { constructGift } from "./4_gift.js";
export function constructClaimedGift(savedStarGift, fromPeer, getPeer) {
    const gift = constructGift(savedStarGift.gift, getPeer);
    const date = savedStarGift.date;
    const public_ = !!savedStarGift.unsaved;
    const sender = fromPeer ? constructChatP(fromPeer) : undefined;
    const message = savedStarGift.message?.text;
    const entities = savedStarGift.message ? savedStarGift.message.entities.map(constructMessageEntity).filter((v) => !!v) : undefined;
    const messageId = savedStarGift.msg_id;
    const conversionStars = savedStarGift.convert_stars;
    return cleanObject({
        date,
        gift,
        public: public_,
        sender,
        message,
        entities,
        messageId,
        conversionStars,
    });
}
