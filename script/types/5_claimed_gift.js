"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructClaimedGift = constructClaimedGift;
const _1_utilities_js_1 = require("../1_utilities.js");
const _1_chat_p_js_1 = require("./1_chat_p.js");
const _2_message_entity_js_1 = require("./2_message_entity.js");
const _4_gift_js_1 = require("./4_gift.js");
function constructClaimedGift(savedStarGift, fromPeer, getPeer) {
    const gift = (0, _4_gift_js_1.constructGift)(savedStarGift.gift, getPeer);
    const date = savedStarGift.date;
    const public_ = !!savedStarGift.unsaved;
    const sender = fromPeer ? (0, _1_chat_p_js_1.constructChatP)(fromPeer) : undefined;
    const message = savedStarGift.message?.text;
    const entities = savedStarGift.message ? savedStarGift.message.entities.map(_2_message_entity_js_1.constructMessageEntity).filter((v) => !!v) : undefined;
    const messageId = savedStarGift.msg_id;
    const conversionStars = savedStarGift.convert_stars;
    return (0, _1_utilities_js_1.cleanObject)({
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
