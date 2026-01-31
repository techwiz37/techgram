"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructUser = constructUser;
exports.constructUser2 = constructUser2;
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _0_chat_photo_js_1 = require("./0_chat_photo.js");
function constructUser(user_) {
    const id = Number(user_.id);
    const usernames = user_.usernames?.map((v) => v.username);
    const username = user_.username ?? usernames?.shift();
    const user = {
        id,
        color: _2_tl_js_1.Api.is("peerColor", user_.color) && user_.color.color !== undefined ? user_.color.color : (0, _1_utilities_js_1.getColorFromPeerId)(id),
        isBot: user_.bot || false,
        firstName: user_.first_name || "",
        lastName: user_.last_name,
        username: username,
        also: usernames?.filter((v) => v !== username),
        languageCode: user_.lang_code,
        isScam: user_.scam || false,
        isFake: user_.fake || false,
        isPremium: user_.premium || false,
        isVerified: user_.verified || false,
        isSupport: user_.support || false,
        isRestricted: user_.restricted || false,
        restrictionReason: user_.restriction_reason,
        addedToAttachmentMenu: user_.bot ? user_.attach_menu_enabled || false : undefined,
        hasMainMiniApp: user_.bot ? user_.bot_has_main_app || false : undefined,
    };
    if (_2_tl_js_1.Api.is("userProfilePhoto", user_.photo)) {
        user.photo = (0, _0_chat_photo_js_1.constructChatPhoto)(user_.photo, user.id, user_.access_hash ?? 0n);
    }
    return (0, _1_utilities_js_1.cleanObject)(user);
}
function constructUser2(chatP) {
    const user = {
        id: chatP.id,
        color: chatP.color,
        isBot: chatP.isBot,
        firstName: chatP.firstName,
        lastName: chatP.lastName,
        username: chatP.username,
        also: chatP.also,
        photo: chatP.photo,
        languageCode: chatP.languageCode,
        isScam: chatP.isScam,
        isFake: chatP.isFake,
        isPremium: chatP.isPremium,
        isVerified: chatP.isVerified,
        isSupport: chatP.isSupport,
        isRestricted: chatP.isRestricted,
        restrictionReason: chatP.restrictionReason,
        addedToAttachmentMenu: chatP.addedToAttachmentMenu,
        hasMainMiniApp: chatP.hasMainMiniApp,
    };
    return (0, _1_utilities_js_1.cleanObject)(user);
}
