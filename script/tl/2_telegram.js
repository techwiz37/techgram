"use strict";
// deno-lint-ignore-file no-explicit-any
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeType = deserializeType;
exports.serializeObject = serializeObject;
exports.isValidObject = isValidObject;
exports.assertIsValidObject = assertIsValidObject;
exports.is = is;
exports.isOneOf = isOneOf;
exports.isOfEnum = isOfEnum;
exports.as = as;
exports.mustGetReturnType = mustGetReturnType;
exports.isGenericFunction = isGenericFunction;
exports.getChannelChatId = getChannelChatId;
exports.peerToChatId = peerToChatId;
exports.chatIdToPeer = chatIdToPeer;
exports.chatIdToPeerId = chatIdToPeerId;
exports.getChatIdPeerType = getChatIdPeerType;
exports.inputPeerToPeer = inputPeerToPeer;
const _1_tl_reader_js_1 = require("./1_tl_reader.js");
const _1_tl_writer_js_1 = require("./1_tl_writer.js");
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const Api = __importStar(require("./1_telegram_api.js"));
const _1_utilities_js_2 = require("./1_utilities.js");
__exportStar(require("./1_telegram_api.js"), exports);
async function deserializeType(name, bufferOrReader) {
    const reader = bufferOrReader instanceof Uint8Array ? new _1_tl_reader_js_1.TLReader(bufferOrReader) : bufferOrReader;
    return await reader.readType(name, Api.schema);
}
function serializeObject(object) {
    return new _1_tl_writer_js_1.TLWriter().writeObject(object, Api.schema).buffer;
}
function isValidObject(object) {
    return (0, _1_utilities_js_2.isValidObject)(object, Api.schema);
}
function assertIsValidObject(object) {
    return (0, _1_utilities_js_2.assertIsValidObject)(object, Api.schema);
}
function is(name, value) {
    return (0, _1_utilities_js_2.is)(name, value, Api.schema);
}
function isOneOf(names, value) {
    return (0, _1_utilities_js_2.isOneOf)(names, value, Api.schema);
}
function isOfEnum(name, value) {
    return (0, _1_utilities_js_2.isOfEnum)(name, value, Api.schema);
}
function as(name, value) {
    return (0, _1_utilities_js_2.as)(name, value, Api.schema);
}
function mustGetReturnType(name) {
    return (0, _1_utilities_js_2.mustGetReturnType)(name, Api.schema);
}
const GENERIC_FUNCTIONS = [
    "invokeAfterMsg",
    "invokeAfterMsgs",
    "initConnection",
    "invokeWithLayer",
    "invokeWithoutUpdates",
    "invokeWithMessagesRange",
    "invokeWithTakeout",
];
function isGenericFunction(value) {
    return isOneOf(GENERIC_FUNCTIONS, value);
}
function getChannelChatId(channelId) {
    return _1_utilities_js_1.ZERO_CHANNEL_ID + -Number(channelId);
}
function peerToChatId(peer) {
    if (isOneOf(["peerUser", "inputPeerUser", "inputPeerUserFromMessage", "user", "userFull"], peer) || "user_id" in peer) {
        return Number("user_id" in peer ? peer.user_id : peer.id);
    }
    else if ("chat_id" in peer || isOneOf(["peerChat", "inputPeerChat", "chat", "chatForbidden", "chatFull"], peer)) {
        return -Number("chat_id" in peer ? peer.chat_id : peer.id);
    }
    else if ("channel_id" in peer || isOneOf(["peerChannel", "inputPeerChannel", "inputPeerChannelFromMessage", "channel", "channelForbidden", "channelFull"], peer)) {
        return getChannelChatId("channel_id" in peer ? peer.channel_id : peer.id);
    }
    else {
        (0, _0_deps_js_1.unreachable)();
    }
}
function chatIdToPeer(chatId) {
    if (chatId > 0) {
        return { _: "peerUser", user_id: BigInt(chatId) };
    }
    else if (chatId > _1_utilities_js_1.ZERO_CHANNEL_ID) {
        return { _: "peerChat", chat_id: BigInt(Math.abs(chatId)) };
    }
    else {
        return { _: "peerChannel", channel_id: BigInt(_1_utilities_js_1.ZERO_CHANNEL_ID - chatId) };
    }
}
function chatIdToPeerId(chatId) {
    const peer = chatIdToPeer(chatId);
    if ("user_id" in peer) {
        return peer.user_id;
    }
    else if ("chat_id" in peer) {
        return peer.chat_id;
    }
    else if ("channel_id" in peer) {
        return peer.channel_id;
    }
    else {
        (0, _0_deps_js_1.unreachable)();
    }
}
function getChatIdPeerType(chatId) {
    if (chatId > 0) {
        return "user";
    }
    else if (chatId > _1_utilities_js_1.ZERO_CHANNEL_ID) {
        return "chat";
    }
    else {
        return "channel";
    }
}
function inputPeerToPeer(inputPeer) {
    if ("user_id" in inputPeer) {
        return { ...inputPeer, _: "peerUser" };
    }
    else if ("chat_id" in inputPeer) {
        return { ...inputPeer, _: "peerChat" };
    }
    else if ("channel_id" in inputPeer) {
        return { ...inputPeer, _: "peerChannel" };
    }
    else {
        (0, _0_deps_js_1.unreachable)();
    }
}
