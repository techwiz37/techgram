"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructClaimedGifts = constructClaimedGifts;
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _5_claimed_gift_js_1 = require("./5_claimed_gift.js");
function constructClaimedGifts(savedStarGifts, getPeer) {
    return (0, _1_utilities_js_1.cleanObject)({
        all: savedStarGifts.count,
        offset: savedStarGifts.next_offset,
        gifts: savedStarGifts.gifts.map((v) => {
            const fromId = v.from_id;
            if (_2_tl_js_1.Api.is("peerUser", fromId)) {
                return [v, savedStarGifts.users.find((u) => _2_tl_js_1.Api.is("user", u) && u.id === fromId.user_id)];
            }
            else if (_2_tl_js_1.Api.is("peerChat", fromId)) {
                return [v, savedStarGifts.chats.find((u) => _2_tl_js_1.Api.is("chat", u) && u.id === fromId.chat_id)];
            }
            else if (fromId) {
                return [v, savedStarGifts.chats.find((u) => _2_tl_js_1.Api.isOneOf(["channel", "channelForbidden"], u) && u.id === fromId.channel_id)];
            }
            else {
                return [v, undefined];
            }
        }).map((v) => (0, _5_claimed_gift_js_1.constructClaimedGift)(v[0], v[1], getPeer)),
    });
}
