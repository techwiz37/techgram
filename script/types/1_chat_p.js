"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructChatP = constructChatP;
exports.isChatPUser = isChatPUser;
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _2_telegram_js_1 = require("../tl/2_telegram.js");
const _0_chat_photo_js_1 = require("./0_chat_photo.js");
const _0_restriction_reason_js_1 = require("./0_restriction_reason.js");
function constructChatP(chat) {
    if (_2_tl_js_1.Api.is("user", chat)) {
        const id = Number(chat.id);
        const usernames = chat.usernames?.map((v) => v.username);
        const username = chat.username ?? usernames?.shift();
        const chat_ = {
            id,
            type: "private",
            isBot: chat.bot || false,
            color: _2_tl_js_1.Api.is("peerColor", chat.color) && chat.color.color !== undefined ? chat.color.color : (0, _1_utilities_js_1.getColorFromPeerId)(id),
            firstName: chat.first_name || "",
            lastName: chat.last_name,
            username,
            languageCode: chat.lang_code,
            also: usernames?.filter((v) => v !== username),
            isScam: chat.scam || false,
            isFake: chat.fake || false,
            isPremium: chat.premium || false,
            isVerified: chat.verified || false,
            isSupport: chat.support || false,
            isRestricted: chat.restricted || false,
            restrictionReason: chat.restriction_reason,
            addedToAttachmentMenu: chat.bot ? chat.attach_menu_enabled || false : undefined,
            hasMainMiniApp: chat.bot ? chat.attach_menu_enabled || false : undefined,
        };
        if (_2_tl_js_1.Api.is("userProfilePhoto", chat.photo)) {
            chat_.photo = (0, _0_chat_photo_js_1.constructChatPhoto)(chat.photo, chat_.id, chat.access_hash ?? 0n);
        }
        return (0, _1_utilities_js_1.cleanObject)(chat_);
    }
    else if (_2_tl_js_1.Api.is("chat", chat) || _2_tl_js_1.Api.is("chatForbidden", chat)) {
        const id = (0, _2_telegram_js_1.peerToChatId)(chat);
        const chat_ = {
            id,
            type: "group",
            color: (0, _1_utilities_js_1.getColorFromPeerId)(id),
            title: chat.title,
            isCreator: false,
        };
        if (_2_tl_js_1.Api.is("chat", chat)) {
            chat_.isCreator = chat.creator || false;
            if (_2_tl_js_1.Api.is("chatPhoto", chat.photo)) {
                chat_.photo = (0, _0_chat_photo_js_1.constructChatPhoto)(chat.photo, id, 0n);
            }
        }
        return (0, _1_utilities_js_1.cleanObject)(chat_);
    }
    else if (_2_tl_js_1.Api.is("channel", chat) || _2_tl_js_1.Api.is("channelForbidden", chat)) {
        let chat_;
        const id = (0, _2_telegram_js_1.peerToChatId)(chat);
        if (_2_tl_js_1.Api.is("channelForbidden", chat)) {
            const { title } = chat;
            if (chat.megagroup) {
                return { id, color: (0, _1_utilities_js_1.getColorFromPeerId)(id), title, type: "supergroup", isScam: false, isFake: false, isVerified: false, isRestricted: false, isForum: false };
            }
            else {
                return { id, color: (0, _1_utilities_js_1.getColorFromPeerId)(id), title, type: "channel", isScam: false, isFake: false, isVerified: false, isRestricted: false };
            }
        }
        const { title, scam: isScam = false, fake: isFake = false, verified: isVerified = false, restricted: isRestricted = false, } = chat;
        if (chat.megagroup) {
            chat_ = {
                id,
                color: _2_tl_js_1.Api.is("peerColor", chat.color) && chat.color.color !== undefined ? chat.color.color : (0, _1_utilities_js_1.getColorFromPeerId)(id),
                type: "supergroup",
                title,
                isScam,
                isFake,
                isVerified,
                isRestricted,
                isForum: chat.forum || false,
            };
        }
        else {
            const id = _1_utilities_js_1.ZERO_CHANNEL_ID + -Number(chat.id);
            chat_ = {
                id,
                color: _2_tl_js_1.Api.is("peerColor", chat.color) && chat.color.color !== undefined ? chat.color.color : (0, _1_utilities_js_1.getColorFromPeerId)(id),
                type: "channel",
                title,
                isScam,
                isFake,
                isVerified,
                isRestricted,
            };
        }
        chat_.username = chat.username ?? chat.usernames?.[0].username;
        chat_.also = chat.usernames?.map((v) => v.username).filter((v) => v !== chat_.username);
        if (_2_tl_js_1.Api.is("chatPhoto", chat.photo)) {
            chat_.photo = (0, _0_chat_photo_js_1.constructChatPhoto)(chat.photo, id, chat.access_hash ?? 0n);
        }
        if (chat_.isRestricted) {
            chat_.restrictionReason = (chat.restriction_reason ?? []).map(_0_restriction_reason_js_1.constructRestrictionReason);
        }
        return (0, _1_utilities_js_1.cleanObject)(chat_);
    }
    else {
        (0, _0_deps_js_1.unreachable)();
    }
}
function isChatPUser(chatP) {
    return chatP.type === "private";
}
