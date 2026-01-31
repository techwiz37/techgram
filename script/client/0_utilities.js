"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOWNLOAD_REQUEST_PER_CONNECTION = exports.DOWNLOAD_POOL_SIZE = exports.UPLOAD_REQUEST_PER_CONNECTION = exports.resolve = void 0;
exports.isHttpUrl = isHttpUrl;
exports.getUsername = getUsername;
exports.getChatListId = getChatListId;
exports.checkMessageId = checkMessageId;
exports.checkStoryId = checkStoryId;
exports.checkPollOption = checkPollOption;
exports.checkArray = checkArray;
exports.checkCallbackQueryId = checkCallbackQueryId;
exports.checkInlineQueryId = checkInlineQueryId;
exports.isCdnFunction = isCdnFunction;
exports.canBeInputUser = canBeInputUser;
exports.toInputUser = toInputUser;
exports.canBeInputChannel = canBeInputChannel;
exports.toInputChannel = toInputChannel;
exports.repr = repr;
exports.getLimit = getLimit;
const _0_deps_js_1 = require("../0_deps.js");
const _0_errors_js_1 = require("../0_errors.js");
const _2_tl_js_1 = require("../2_tl.js");
const resolve = () => Promise.resolve();
exports.resolve = resolve;
function isHttpUrl(string) {
    try {
        return new URL(string).protocol.startsWith("http");
    }
    catch {
        return false;
    }
}
function isAlpha(string) {
    const c = string.charCodeAt(0) | 0x20;
    return "a".charCodeAt(0) <= c && c <= "z".charCodeAt(0);
}
function isDigit(string) {
    const c = string.charCodeAt(0);
    return "0".charCodeAt(0) <= c && c <= "9".charCodeAt(0);
}
const errInvalidUsername = (u) => new _0_errors_js_1.InputError(`Invalid username: ${u}`);
function validateUsername(string, ignoreAt = false) {
    string = string.trim();
    if (ignoreAt && string.startsWith("@")) {
        string = string.slice(1);
    }
    if (string.length === 0 || string.length > 32) {
        throw errInvalidUsername(string);
    }
    if (!isAlpha(string[0])) {
        throw errInvalidUsername(string);
    }
    for (const c of string) {
        if (!isAlpha(c) && !isDigit(c) && c !== "_") {
            throw errInvalidUsername(string);
        }
    }
    if (string[string.length - 1] === "_") {
        throw errInvalidUsername(string);
    }
    for (let i = 1; i < string.length; ++i) {
        if (string[i - 1] === "_" && string[i] === "_") {
            throw errInvalidUsername(string);
        }
    }
    return string;
}
function getUsername(string) {
    let url = null;
    try {
        url = new URL(string);
    }
    catch {
        try {
            url = new URL("https://" + string);
        }
        catch {
        }
    }
    if (url === null || (url.protocol !== "http:" && url.protocol !== "https:")) {
        return validateUsername(string, true);
    }
    if (url.hostname !== "telegram.dog" && url.hostname !== "telegram.me" && url.hostname !== "t.me" && !url.hostname.endsWith(".t.me")) {
        return validateUsername(string, true);
    }
    if (url.hostname === "telegram.dog" || url.hostname === "telegram.me" || url.hostname === "t.me") {
        return validateUsername(url.pathname.split("/")[1]);
    }
    const parts = url.hostname.split(".");
    if (parts.length !== 3) {
        return validateUsername(string);
    }
    return validateUsername(parts[0]);
}
function getChatListId(chatList) {
    switch (chatList) {
        case "main":
            return 0;
        case "archived":
            return 1;
        default:
            (0, _0_deps_js_1.unreachable)();
    }
}
function checkMessageId(messageId) {
    if (typeof messageId !== "number" || isNaN(messageId) || messageId <= 0) {
        throw new _0_errors_js_1.InputError("Invalid message ID");
    }
    return messageId;
}
function checkStoryId(storyId) {
    if (typeof storyId !== "number" || isNaN(storyId) || !storyId) {
        throw new _0_errors_js_1.InputError("Invalid story ID");
    }
    return storyId;
}
function checkPollOption(option) {
    if (!option.trim()) {
        throw new _0_errors_js_1.InputError("Poll option must not be empty.");
    }
}
function checkArray(array, check) {
    for (const item of array) {
        check(item);
    }
}
function checkCallbackQueryId(id) {
    if (typeof id !== "string" || !id.trim()) {
        throw new _0_errors_js_1.InputError("Invalid callback query ID.");
    }
}
function checkInlineQueryId(id) {
    if (typeof id !== "string" || !id.trim()) {
        throw new _0_errors_js_1.InputError("Invalid inline query ID.");
    }
}
const CDN_FUNCTIONS = [
    "upload.saveFilePart",
    "upload.getFile",
    "upload.saveBigFilePart",
    "upload.getWebFile",
    "upload.getCdnFile",
    "upload.reuploadCdnFile",
    "upload.getCdnFileHashes",
    "upload.getFileHashes",
];
function isCdnFunction(value) {
    return _2_tl_js_1.Api.isOneOf(CDN_FUNCTIONS, value);
}
function canBeInputUser(inputPeer) {
    return _2_tl_js_1.Api.isOneOf(["inputPeerSelf", "inputPeerUser", "inputPeerUserFromMessage"], inputPeer);
}
function toInputUser(inputPeer) {
    let id;
    if (_2_tl_js_1.Api.is("inputPeerUser", inputPeer)) {
        id = { ...inputPeer, _: "inputUser" };
    }
    else if (_2_tl_js_1.Api.is("inputPeerUserFromMessage", inputPeer)) {
        id = { ...inputPeer, _: "inputUserFromMessage" };
    }
    else if (_2_tl_js_1.Api.is("inputPeerSelf", inputPeer)) {
        id = { _: "inputUserSelf" };
    }
    else {
        (0, _0_deps_js_1.unreachable)();
    }
    return id;
}
function canBeInputChannel(inputPeer) {
    return _2_tl_js_1.Api.isOneOf(["inputPeerChannel", "inputPeerChannelFromMessage"], inputPeer);
}
function toInputChannel(inputPeer) {
    let id;
    if (_2_tl_js_1.Api.is("inputPeerChannel", inputPeer)) {
        id = { ...inputPeer, _: "inputChannel" };
    }
    else if (_2_tl_js_1.Api.is("inputPeerChannelFromMessage", inputPeer)) {
        id = { ...inputPeer, _: "inputChannelFromMessage" };
    }
    else {
        (0, _0_deps_js_1.unreachable)();
    }
    return id;
}
function repr(value) {
    if (_2_tl_js_1.Api.isGenericFunction(value) && "query" in value) {
        return `${(0, _2_tl_js_1.repr)(value)}<${repr(value.query)}>`;
    }
    else {
        return (0, _2_tl_js_1.repr)(value);
    }
}
function getLimit(limit) {
    if (typeof limit !== "number") {
        return 100;
    }
    else if (limit < 1) {
        return 1;
    }
    else if (limit > 100) {
        return 100;
    }
    else {
        return limit;
    }
}
exports.UPLOAD_REQUEST_PER_CONNECTION = 2;
exports.DOWNLOAD_POOL_SIZE = 1;
exports.DOWNLOAD_REQUEST_PER_CONNECTION = 1;
