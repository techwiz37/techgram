"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructGiveawayParameters = constructGiveawayParameters;
const _2_tl_js_1 = require("../2_tl.js");
function constructGiveawayParameters(g) {
    const countries = g.countries_iso2 ?? [];
    const boostedChatId = _2_tl_js_1.Api.peerToChatId({ _: "peerChannel", channel_id: g.channels[0] });
    const additionalChatIds = g.channels.slice(1).map((v) => _2_tl_js_1.Api.peerToChatId({ _: "peerChannel", channel_id: v }));
    const onlyNewMembers = g.only_new_subscribers ? true : false;
    const winnerSelectionDate = g.until_date;
    return { boostedChatId, additionalChatIds, winnerSelectionDate, onlyNewMembers, countries };
}
