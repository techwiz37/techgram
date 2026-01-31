"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.botCommandScopeToTlObject = botCommandScopeToTlObject;
const _0_deps_js_1 = require("../0_deps.js");
const _2_tl_js_1 = require("../2_tl.js");
async function botCommandScopeToTlObject(scope, getInputPeer) {
    switch (scope.type) {
        case "default":
            return { _: "botCommandScopeDefault" };
        case "allPrivateChats":
            return { _: "botCommandScopeUsers" };
        case "allGroupChats":
            return { _: "botCommandScopeChats" };
        case "allChatAdministrators":
            return { _: "botCommandScopeChatAdmins" };
        case "chat":
            return { _: "botCommandScopePeer", peer: await getInputPeer(scope.chatId) };
        case "chatAdministrators":
            return { _: "botCommandScopePeerAdmins", peer: await getInputPeer(scope.chatId) };
        case "chatMember": {
            const user = await getInputPeer(scope.userId);
            if (!_2_tl_js_1.Api.is("inputPeerUser", user)) {
                (0, _0_deps_js_1.unreachable)();
            }
            return { _: "botCommandScopePeerUser", peer: await getInputPeer(scope.chatId), user_id: ({ _: "inputUser", user_id: user.user_id, access_hash: user.access_hash }) };
        }
        default:
            (0, _0_deps_js_1.unreachable)();
    }
}
