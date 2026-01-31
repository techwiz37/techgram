"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructChat = constructChat;
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _0_birthday_js_1 = require("./0_birthday.js");
const _0_location_js_1 = require("./0_location.js");
const _0_opening_hours_js_1 = require("./0_opening_hours.js");
const _1_photo_js_1 = require("./1_photo.js");
function constructChat(fullChat, getPeer) {
    if (_2_tl_js_1.Api.is("userFull", fullChat)) {
        const peer = getPeer({ _: "peerUser", user_id: fullChat.id });
        if (!peer)
            (0, _0_deps_js_1.unreachable)();
        return (0, _1_utilities_js_1.cleanObject)({
            ...peer[0],
            birthday: fullChat.birthday ? (0, _0_birthday_js_1.constructBirthday)(fullChat.birthday) : undefined,
            photo: fullChat.profile_photo && _2_tl_js_1.Api.is("photo", fullChat.profile_photo) ? (0, _1_photo_js_1.constructPhoto)(fullChat.profile_photo) : undefined,
            address: fullChat.business_location?.address,
            location: fullChat.business_location?.geo_point && _2_tl_js_1.Api.is("geoPoint", fullChat.business_location.geo_point) ? (0, _0_location_js_1.constructLocation)(fullChat.business_location.geo_point) : undefined,
            openingHours: fullChat.business_work_hours ? (0, _0_opening_hours_js_1.constructOpeningHours)(fullChat.business_work_hours) : undefined,
        });
    }
    else if (_2_tl_js_1.Api.is("chatFull", fullChat)) {
        const peer = getPeer({ _: "peerChat", chat_id: fullChat.id });
        if (peer === null)
            (0, _0_deps_js_1.unreachable)();
        return (0, _1_utilities_js_1.cleanObject)({
            ...peer[0],
            photo: fullChat.chat_photo && _2_tl_js_1.Api.is("photo", fullChat.chat_photo) ? (0, _1_photo_js_1.constructPhoto)(fullChat.chat_photo) : undefined,
            videoChatId: _2_tl_js_1.Api.is("inputGroupCall", fullChat.call) ? String(fullChat.call.id) : undefined,
        });
    }
    else if (_2_tl_js_1.Api.is("channelFull", fullChat)) {
        const peer = getPeer({ _: "peerChannel", channel_id: fullChat.id });
        if (peer === null)
            (0, _0_deps_js_1.unreachable)();
        return (0, _1_utilities_js_1.cleanObject)({
            ...peer[0],
            photo: fullChat.chat_photo && _2_tl_js_1.Api.is("photo", fullChat.chat_photo) ? (0, _1_photo_js_1.constructPhoto)(fullChat.chat_photo) : undefined,
            videoChatId: _2_tl_js_1.Api.is("inputGroupCall", fullChat.call) ? String(fullChat.call.id) : undefined,
        });
    }
    (0, _0_deps_js_1.unreachable)();
}
