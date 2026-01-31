import { unreachable } from "../0_deps.js";
import { InputError } from "../0_errors.js";
import { Api, repr as repr_ } from "../2_tl.js";
export const resolve = () => Promise.resolve();
export function isHttpUrl(string) {
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
const errInvalidUsername = (u) => new InputError(`Invalid username: ${u}`);
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
export function getUsername(string) {
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
export function getChatListId(chatList) {
    switch (chatList) {
        case "main":
            return 0;
        case "archived":
            return 1;
        default:
            unreachable();
    }
}
export function checkMessageId(messageId) {
    if (typeof messageId !== "number" || isNaN(messageId) || messageId <= 0) {
        throw new InputError("Invalid message ID");
    }
    return messageId;
}
export function checkStoryId(storyId) {
    if (typeof storyId !== "number" || isNaN(storyId) || !storyId) {
        throw new InputError("Invalid story ID");
    }
    return storyId;
}
export function checkPollOption(option) {
    if (!option.trim()) {
        throw new InputError("Poll option must not be empty.");
    }
}
export function checkArray(array, check) {
    for (const item of array) {
        check(item);
    }
}
export function checkCallbackQueryId(id) {
    if (typeof id !== "string" || !id.trim()) {
        throw new InputError("Invalid callback query ID.");
    }
}
export function checkInlineQueryId(id) {
    if (typeof id !== "string" || !id.trim()) {
        throw new InputError("Invalid inline query ID.");
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
export function isCdnFunction(value) {
    return Api.isOneOf(CDN_FUNCTIONS, value);
}
export function canBeInputUser(inputPeer) {
    return Api.isOneOf(["inputPeerSelf", "inputPeerUser", "inputPeerUserFromMessage"], inputPeer);
}
export function toInputUser(inputPeer) {
    let id;
    if (Api.is("inputPeerUser", inputPeer)) {
        id = { ...inputPeer, _: "inputUser" };
    }
    else if (Api.is("inputPeerUserFromMessage", inputPeer)) {
        id = { ...inputPeer, _: "inputUserFromMessage" };
    }
    else if (Api.is("inputPeerSelf", inputPeer)) {
        id = { _: "inputUserSelf" };
    }
    else {
        unreachable();
    }
    return id;
}
export function canBeInputChannel(inputPeer) {
    return Api.isOneOf(["inputPeerChannel", "inputPeerChannelFromMessage"], inputPeer);
}
export function toInputChannel(inputPeer) {
    let id;
    if (Api.is("inputPeerChannel", inputPeer)) {
        id = { ...inputPeer, _: "inputChannel" };
    }
    else if (Api.is("inputPeerChannelFromMessage", inputPeer)) {
        id = { ...inputPeer, _: "inputChannelFromMessage" };
    }
    else {
        unreachable();
    }
    return id;
}
export function repr(value) {
    if (Api.isGenericFunction(value) && "query" in value) {
        return `${repr_(value)}<${repr(value.query)}>`;
    }
    else {
        return repr_(value);
    }
}
export function getLimit(limit) {
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
export const UPLOAD_REQUEST_PER_CONNECTION = 2;
export const DOWNLOAD_POOL_SIZE = 1;
export const DOWNLOAD_REQUEST_PER_CONNECTION = 1;
