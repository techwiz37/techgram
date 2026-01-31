"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructKeyboardButton = constructKeyboardButton;
exports.keyboardButtonToTlObject = keyboardButtonToTlObject;
const _0_deps_js_1 = require("../0_deps.js");
const _2_tl_js_1 = require("../2_tl.js");
const _0_chat_administrator_rights_js_1 = require("./0_chat_administrator_rights.js");
function constructKeyboardButton(button_) {
    if (_2_tl_js_1.Api.is("keyboardButton", button_)) {
        return { text: button_.text };
    }
    else if (_2_tl_js_1.Api.is("keyboardButtonRequestPeer", button_)) {
        if (_2_tl_js_1.Api.is("requestPeerTypeUser", button_.peer_type)) {
            return {
                text: button_.text,
                requestUser: {
                    requestId: button_.button_id,
                    userIsBot: button_.peer_type.bot || false,
                    userIsPremium: button_.peer_type.premium || false,
                },
            };
        }
        else if (_2_tl_js_1.Api.is("requestPeerTypeChat", button_.peer_type)) {
            const button = {
                text: button_.text,
                requestChat: {
                    requestId: button_.button_id,
                    chatIsChannel: false,
                    chatIsForum: button_.peer_type.forum || false,
                    chatHasUsername: button_.peer_type.has_username || false,
                    chatIsCreated: button_.peer_type.creator || false,
                    botIsMember: button_.peer_type.bot_participant || false,
                },
            };
            if (button_.peer_type.bot_admin_rights) {
                button.requestChat.botAdministratorRights = (0, _0_chat_administrator_rights_js_1.constructChatAdministratorRights)(button_.peer_type.bot_admin_rights);
            }
            if (button_.peer_type.user_admin_rights) {
                button.requestChat.userAdministratorRights = (0, _0_chat_administrator_rights_js_1.constructChatAdministratorRights)(button_.peer_type.user_admin_rights);
            }
            return button;
        }
        else if (_2_tl_js_1.Api.is("requestPeerTypeBroadcast", button_.peer_type)) {
            const button = {
                text: button_.text,
                requestChat: {
                    requestId: button_.button_id,
                    chatIsChannel: true,
                    chatIsCreated: button_.peer_type.creator || false,
                    chatHasUsername: button_.peer_type.has_username || false,
                },
            };
            if (button_.peer_type.bot_admin_rights) {
                button.requestChat.botAdministratorRights = (0, _0_chat_administrator_rights_js_1.constructChatAdministratorRights)(button_.peer_type.bot_admin_rights);
            }
            if (button_.peer_type.user_admin_rights) {
                button.requestChat.userAdministratorRights = (0, _0_chat_administrator_rights_js_1.constructChatAdministratorRights)(button_.peer_type.user_admin_rights);
            }
            return button;
        }
        else {
            (0, _0_deps_js_1.unreachable)();
        }
    }
    else if (_2_tl_js_1.Api.is("keyboardButtonRequestPhone", button_)) {
        return { text: button_.text, requestContact: true };
    }
    else if (_2_tl_js_1.Api.is("keyboardButtonRequestGeoLocation", button_)) {
        return { text: button_.text, requestLocation: true };
    }
    else if (_2_tl_js_1.Api.is("keyboardButtonRequestPoll", button_)) {
        const button = { text: button_.text, requestPoll: {} };
        if (button_.quiz) {
            button.requestPoll.type = "quiz";
        }
        return button;
    }
    else if (_2_tl_js_1.Api.is("keyboardButtonWebView", button_) || _2_tl_js_1.Api.is("keyboardButtonSimpleWebView", button_)) {
        return { text: button_.text, miniApp: { url: button_.url } };
    }
    else {
        (0, _0_deps_js_1.unreachable)();
    }
}
function keyboardButtonToTlObject(button) {
    if ("requestUser" in button) {
        return { _: "keyboardButtonRequestPeer", text: button.text, button_id: button.requestUser.requestId, peer_type: ({ _: "requestPeerTypeUser", bot: button.requestUser.userIsBot, premium: button.requestUser.userIsPremium }), max_quantity: 1 };
    }
    else if ("requestChat" in button) {
        if (!button.requestChat.chatIsChannel) {
            return { _: "keyboardButtonRequestPeer", text: button.text, button_id: button.requestChat.requestId, peer_type: ({ _: "requestPeerTypeChat", forum: button.requestChat.chatIsForum, has_username: button.requestChat.chatHasUsername, creator: button.requestChat.chatIsCreated || undefined, bot_participant: button.requestChat.botIsMember || undefined, bot_admin_rights: button.requestChat.botAdministratorRights ? (0, _0_chat_administrator_rights_js_1.chatAdministratorRightsToTlObject)(button.requestChat.botAdministratorRights) : undefined, user_admin_rights: button.requestChat.userAdministratorRights ? (0, _0_chat_administrator_rights_js_1.chatAdministratorRightsToTlObject)(button.requestChat.userAdministratorRights) : undefined }), max_quantity: 1 };
        }
        else {
            return { _: "keyboardButtonRequestPeer", text: button.text, button_id: button.requestChat.requestId, peer_type: ({ _: "requestPeerTypeBroadcast", has_username: button.requestChat.chatHasUsername, creator: button.requestChat.chatIsCreated || undefined, bot_admin_rights: button.requestChat.botAdministratorRights ? (0, _0_chat_administrator_rights_js_1.chatAdministratorRightsToTlObject)(button.requestChat.botAdministratorRights) : undefined, user_admin_rights: button.requestChat.userAdministratorRights ? (0, _0_chat_administrator_rights_js_1.chatAdministratorRightsToTlObject)(button.requestChat.userAdministratorRights) : undefined }), max_quantity: 1 };
        }
    }
    else if ("requestContact" in button) {
        return { _: "keyboardButtonRequestPhone", text: button.text };
    }
    else if ("requestLocation" in button) {
        return { _: "keyboardButtonRequestGeoLocation", text: button.text };
    }
    else if ("requestPoll" in button) {
        return { _: "keyboardButtonRequestPoll", text: button.text, quiz: button.requestPoll.type === "quiz" };
    }
    else if ("miniApp" in button) {
        return { _: "keyboardButtonWebView", text: button.text, url: button.miniApp.url };
    }
    else {
        return { _: "keyboardButton", text: button.text };
    }
}
