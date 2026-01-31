import { unreachable } from "../0_deps.js";
import { InputError } from "../0_errors.js";
import { cleanObject, decodeText, encodeText } from "../1_utilities.js";
import { Api } from "../2_tl.js";
import { constructMiniAppButtonInfo } from "./0_mini_app_button_info.js";
export function constructInlineKeyboardButton(button_) {
    if (Api.is("keyboardButtonUrl", button_)) {
        return { text: button_.text, url: button_.url };
    }
    else if (Api.is("keyboardButtonCallback", button_)) {
        return { text: button_.text, callbackData: decodeText(button_.data) };
    }
    else if (Api.is("keyboardButtonWebView", button_) || Api.is("keyboardButtonSimpleWebView", button_)) {
        return { text: button_.text, miniApp: constructMiniAppButtonInfo(button_.url) };
    }
    else if (Api.is("keyboardButtonUrlAuth", button_)) {
        return { text: button_.text, loginUrl: { url: button_.url, forwardText: button_.fwd_text } };
    }
    else if (Api.is("keyboardButtonSwitchInline", button_)) {
        if (button_.same_peer) {
            return { text: button_.text, switchInlineQueryCurrentChat: button_.query };
        }
        else if (button_.peer_types && button_.peer_types.length) {
            const allowUsers = button_.peer_types.some((v) => v._ === "inlineQueryPeerTypeBotPM") || undefined;
            const allowBots = button_.peer_types.some((v) => v._ === "inlineQueryPeerTypeSameBotPM" || v._ === "inlineQueryPeerTypeBotPM") || undefined;
            const allowGroups = button_.peer_types.some((v) => v._ === "inlineQueryPeerTypeChat" || v._ === "inlineQueryPeerTypeMegagroup") || undefined;
            const allowChannels = button_.peer_types.some((v) => v._ === "inlineQueryPeerTypeBroadcast") || undefined;
            return cleanObject({ text: button_.text, switchInlineQueryChosenChats: { query: button_.query, allowUsers, allowBots, allowGroups, allowChannels } });
        }
        else {
            return { text: button_.text, switchInlineQuery: button_.query };
        }
    }
    else if (Api.is("keyboardButtonBuy", button_)) {
        return { text: button_.text, pay: true };
    }
    else if (Api.is("keyboardButtonGame", button_)) {
        return { text: button_.text, callbackGame: {} };
    }
    else if (Api.is("keyboardButtonCopy", button_)) {
        return { text: button_.text, copy: button_.copy_text };
    }
    else if (Api.is("keyboardButtonRequestPeer", button_)) {
        unreachable();
    }
    else {
        unreachable();
    }
}
export async function inlineKeyboardButtonToTlObject(button, usernameResolver) {
    if ("url" in button) {
        return { _: "keyboardButtonUrl", text: button.text, url: button.url };
    }
    else if ("callbackData" in button) {
        return { _: "keyboardButtonCallback", text: button.text, data: encodeText(button.callbackData) };
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
            throw new InputError("switchInlineQueryChosenChats: At least one chat type must be allowed.");
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
        unreachable();
    }
}
