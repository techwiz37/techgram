"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructInlineKeyboardButton = constructInlineKeyboardButton;
exports.inlineKeyboardButtonToTlObject = inlineKeyboardButtonToTlObject;
const _0_deps_js_1 = require("../0_deps.js");
const _0_errors_js_1 = require("../0_errors.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _0_mini_app_button_info_js_1 = require("./0_mini_app_button_info.js");
function constructInlineKeyboardButton(button_) {
    if (_2_tl_js_1.Api.is("keyboardButtonUrl", button_)) {
        return { text: button_.text, url: button_.url };
    }
    else if (_2_tl_js_1.Api.is("keyboardButtonCallback", button_)) {
        return { text: button_.text, callbackData: (0, _1_utilities_js_1.decodeText)(button_.data) };
    }
    else if (_2_tl_js_1.Api.is("keyboardButtonWebView", button_) || _2_tl_js_1.Api.is("keyboardButtonSimpleWebView", button_)) {
        return { text: button_.text, miniApp: (0, _0_mini_app_button_info_js_1.constructMiniAppButtonInfo)(button_.url) };
    }
    else if (_2_tl_js_1.Api.is("keyboardButtonUrlAuth", button_)) {
        return { text: button_.text, loginUrl: { url: button_.url, forwardText: button_.fwd_text } };
    }
    else if (_2_tl_js_1.Api.is("keyboardButtonSwitchInline", button_)) {
        if (button_.same_peer) {
            return { text: button_.text, switchInlineQueryCurrentChat: button_.query };
        }
        else if (button_.peer_types && button_.peer_types.length) {
            const allowUsers = button_.peer_types.some((v) => v._ === "inlineQueryPeerTypeBotPM") || undefined;
            const allowBots = button_.peer_types.some((v) => v._ === "inlineQueryPeerTypeSameBotPM" || v._ === "inlineQueryPeerTypeBotPM") || undefined;
            const allowGroups = button_.peer_types.some((v) => v._ === "inlineQueryPeerTypeChat" || v._ === "inlineQueryPeerTypeMegagroup") || undefined;
            const allowChannels = button_.peer_types.some((v) => v._ === "inlineQueryPeerTypeBroadcast") || undefined;
            return (0, _1_utilities_js_1.cleanObject)({ text: button_.text, switchInlineQueryChosenChats: { query: button_.query, allowUsers, allowBots, allowGroups, allowChannels } });
        }
        else {
            return { text: button_.text, switchInlineQuery: button_.query };
        }
    }
    else if (_2_tl_js_1.Api.is("keyboardButtonBuy", button_)) {
        return { text: button_.text, pay: true };
    }
    else if (_2_tl_js_1.Api.is("keyboardButtonGame", button_)) {
        return { text: button_.text, callbackGame: {} };
    }
    else if (_2_tl_js_1.Api.is("keyboardButtonCopy", button_)) {
        return { text: button_.text, copy: button_.copy_text };
    }
    else if (_2_tl_js_1.Api.is("keyboardButtonRequestPeer", button_)) {
        (0, _0_deps_js_1.unreachable)();
    }
    else {
        (0, _0_deps_js_1.unreachable)();
    }
}
async function inlineKeyboardButtonToTlObject(button, usernameResolver) {
    if ("url" in button) {
        return { _: "keyboardButtonUrl", text: button.text, url: button.url };
    }
    else if ("callbackData" in button) {
        return { _: "keyboardButtonCallback", text: button.text, data: (0, _1_utilities_js_1.encodeText)(button.callbackData) };
    }
    else if ("miniApp" in button) {
        return { _: "keyboardButtonWebView", text: button.text, url: button.miniApp.url };
    }
    else if ("loginUrl" in button) {
        return { _: "inputKeyboardButtonUrlAuth", text: button.text, url: button.loginUrl.url, fwd_text: button.loginUrl.forwardText, bot: button.loginUrl.botUsername ? await usernameResolver(button.loginUrl.botUsername) : { _: "inputUserSelf" }, request_write_access: button.loginUrl.requestWriteAccess || undefined };
    }
    else if ("switchInlineQuery" in button) {
        return { _: "keyboardButtonSwitchInline", text: button.text, query: button.switchInlineQuery };
    }
    else if ("switchInlineQueryCurrentChat" in button) {
        return { _: "keyboardButtonSwitchInline", text: button.text, query: button.switchInlineQueryCurrentChat, same_peer: true };
    }
    else if ("switchInlineQueryChosenChats" in button) {
        const peerTypes = new Array();
        const { allowUsers, allowBots, allowGroups, allowChannels } = button.switchInlineQueryChosenChats;
        if (!allowUsers && !allowBots && !allowGroups && !allowChannels) {
            throw new _0_errors_js_1.InputError("switchInlineQueryChosenChats: At least one chat type must be allowed.");
        }
        if (allowUsers) {
            peerTypes.push({ _: "inlineQueryPeerTypeBotPM" });
        }
        if (allowBots) {
            peerTypes.push({ _: "inlineQueryPeerTypeSameBotPM" }, { _: "inlineQueryPeerTypeBotPM" });
        }
        if (allowGroups) {
            peerTypes.push({ _: "inlineQueryPeerTypeChat" }, { _: "inlineQueryPeerTypeMegagroup" });
        }
        if (allowChannels) {
            peerTypes.push({ _: "inlineQueryPeerTypeBroadcast" });
        }
        return { _: "keyboardButtonSwitchInline", text: button.text, query: button.switchInlineQueryChosenChats.query, peer_types: peerTypes };
    }
    else if ("pay" in button) {
        return { _: "keyboardButtonBuy", text: button.text };
    }
    else if ("copy" in button) {
        return { _: "keyboardButtonCopy", text: button.text, copy_text: button.copy };
    }
    else {
        (0, _0_deps_js_1.unreachable)();
    }
}
