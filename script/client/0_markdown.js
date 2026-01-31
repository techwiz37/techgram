"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CODEPOINTS = void 0;
exports.parseMarkdown = parseMarkdown;
const _0_deps_js_1 = require("../0_deps.js");
const _3_types_js_1 = require("../3_types.js");
const _0_errors_js_1 = require("../0_errors.js");
const _1_utilities_js_1 = require("../1_utilities.js");
exports.CODEPOINTS = {
    "\t": 9,
    "\r": 13,
    "\0": 0,
    "\v": 11,
    "\n": 10,
    " ": 32,
    "_": 95,
    "[": 91,
    "]": 93,
    "(": 40,
    ")": 41,
    "`": 96,
    "~": 126,
    "\\": 92,
    "*": 42,
    "!": 33,
    "|": 124,
};
function isUtf8CharacterFirstCodeUnit(c) {
    return (c & 0xC0) !== 0x80;
}
function isWhitespace(codepoint) {
    return (codepoint === exports.CODEPOINTS[" "] || codepoint === exports.CODEPOINTS["\t"] || codepoint === exports.CODEPOINTS["\r"] ||
        codepoint === exports.CODEPOINTS["\n"] || codepoint === exports.CODEPOINTS["\0"] || codepoint === exports.CODEPOINTS["\v"]);
}
function getUrl(url_) {
    try {
        const url = new URL(url_);
        if (url.protocol !== "http:" && url.protocol !== "https:" && url.protocol !== "tg:" && url.protocol !== "ton:") {
            return "";
        }
        else {
            return url.href;
        }
    }
    catch {
        return "";
    }
}
function getLinkUserId(url_) {
    try {
        const url = new URL(url_);
        if (url.protocol !== "tg:" || url.hostname !== "user" || url.pathname.slice(1) !== "" || url.port !== "") {
            return 0;
        }
        return Number(url.searchParams.get("id")) || 0;
    }
    catch {
        return 0;
    }
}
function getLinkCustomEmojiId(url_) {
    try {
        const url = new URL(url_);
        if (url.protocol !== "tg:" || url.hostname !== "emoji" || url.pathname.slice(1) !== "" || url.port !== "") {
            return "";
        }
        const id_ = url.searchParams.get("id");
        if (!id_) {
            return "";
        }
        const id = BigInt(id_);
        if (!id) {
            return "";
        }
        else {
            return String(id);
        }
    }
    catch {
        return "";
    }
}
function parseMarkdown(text_) {
    const text = (0, _1_utilities_js_1.encodeText)(text_);
    let resultSize = 0;
    let entities = [];
    let utf16Offset = 0;
    const nestedEntities = [];
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (c === exports.CODEPOINTS["\\"] && text[i + 1] !== undefined && text[i + 1] > 0 && text[i + 1] <= 126) {
            i++;
            utf16Offset += 1;
            text[resultSize++] = text[i];
            continue;
        }
        let reservedCharacters = (0, _1_utilities_js_1.encodeText)("_*[]()~`>#+-=|{}.!");
        if (nestedEntities.length !== 0) {
            switch (nestedEntities[nestedEntities.length - 1].type) {
                case "code":
                case "pre":
                    reservedCharacters = Uint8Array.of(exports.CODEPOINTS["`"]);
                    break;
                default:
                    break;
            }
        }
        if (!reservedCharacters.includes(text[i])) {
            if (isUtf8CharacterFirstCodeUnit(c)) {
                utf16Offset += 1 + (c >= 0xf0 ? 1 : 0);
            }
            text[resultSize++] = text[i];
            continue;
        }
        let isEndOfAnEntity = false;
        if (nestedEntities.length !== 0) {
            isEndOfAnEntity = (() => {
                switch (nestedEntities[nestedEntities.length - 1].type) {
                    case "bold":
                        return c === exports.CODEPOINTS["*"];
                    case "italic":
                        return c === exports.CODEPOINTS["_"] && text[i + 1] !== exports.CODEPOINTS["_"];
                    case "code":
                        return c === exports.CODEPOINTS["`"];
                    case "pre":
                        return c === exports.CODEPOINTS["`"] && text[i + 1] === exports.CODEPOINTS["`"] && text[i + 2] === exports.CODEPOINTS["`"];
                    case "textLink":
                        return c === exports.CODEPOINTS["]"];
                    case "underline":
                        return c === exports.CODEPOINTS["_"] && text[i + 1] === exports.CODEPOINTS["_"];
                    case "strikethrough":
                        return c === exports.CODEPOINTS["~"];
                    case "spoiler":
                        return c === exports.CODEPOINTS["|"] && text[i + 1] === exports.CODEPOINTS["|"];
                    case "customEmoji":
                        return c === exports.CODEPOINTS["]"];
                    default:
                        (0, _0_deps_js_1.unreachable)();
                }
            })();
        }
        if (!isEndOfAnEntity) {
            let type;
            let argument = new Uint8Array();
            const entityByteOffset = i;
            switch (c) {
                case exports.CODEPOINTS["_"]:
                    if (text[i + 1] === exports.CODEPOINTS["_"]) {
                        type = "underline";
                        i++;
                    }
                    else {
                        type = "italic";
                    }
                    break;
                case exports.CODEPOINTS["*"]:
                    type = "bold";
                    break;
                case exports.CODEPOINTS["~"]:
                    type = "strikethrough";
                    break;
                case exports.CODEPOINTS["|"]:
                    if (text[i + 1] === exports.CODEPOINTS["|"]) {
                        i++;
                        type = "spoiler";
                    }
                    else {
                        throw new _0_errors_js_1.InputError(`The character "${String.fromCharCode(c)}" is reserved and must be escaped with a preceding backslash.`);
                    }
                    break;
                case exports.CODEPOINTS["["]:
                    type = "textLink";
                    break;
                case exports.CODEPOINTS["`"]:
                    if (text[i + 1] === exports.CODEPOINTS["`"] && text[i + 2] === exports.CODEPOINTS["`"]) {
                        i += 3;
                        type = "code";
                        let languageEnd = i;
                        while (text[languageEnd] !== null && !isWhitespace(text[languageEnd]) && text[languageEnd] !== exports.CODEPOINTS["`"]) {
                            languageEnd++;
                        }
                        if (i !== languageEnd && languageEnd < text.length && text[languageEnd] !== exports.CODEPOINTS["`"]) {
                            type = "pre";
                            argument = text.slice(i, languageEnd);
                            i = languageEnd;
                        }
                        const current = text[i], next = text[i + 1];
                        if (current === exports.CODEPOINTS["\n"] || current === exports.CODEPOINTS["\r"]) {
                            if ((next === exports.CODEPOINTS["\n"] || next === exports.CODEPOINTS["\r"]) && current !== next) {
                                i += 2;
                            }
                            else {
                                i++;
                            }
                        }
                        i--;
                    }
                    else {
                        type = "code";
                    }
                    break;
                case exports.CODEPOINTS["!"]:
                    if (text[i + 1] === exports.CODEPOINTS["["]) {
                        i++;
                        type = "customEmoji";
                    }
                    else {
                        throw new Error(`Character '${String.fromCharCode(text[i])}' is reserved and must be escaped with the preceding '\\'`);
                    }
                    break;
                default:
                    throw new Error(`Character '${String.fromCharCode(text[i])}' is reserved and must be escaped with the preceding '\\'`);
            }
            nestedEntities.push({ type, argument, entityOffset: utf16Offset, entityByteOffset, entityBeginPos: resultSize });
        }
        else {
            let { type, argument } = nestedEntities[nestedEntities.length - 1];
            let userId = 0;
            let customEmojiId = "";
            let skipEntity = utf16Offset === nestedEntities.at(-1).entityOffset;
            switch (type) {
                case "bold":
                case "italic":
                case "code":
                case "strikethrough":
                    break;
                case "underline":
                case "spoiler":
                    i++;
                    break;
                case "pre":
                    i += 2;
                    break;
                case "textLink": {
                    let url;
                    if (text[i + 1] !== exports.CODEPOINTS["("]) {
                        url = text.slice(nestedEntities.at(-1).entityBeginPos, resultSize);
                    }
                    else {
                        i += 2;
                        const urlBeginPos = i;
                        const url_ = [];
                        while (i < text.length && text[i] !== exports.CODEPOINTS[")"]) {
                            if (text[i] === exports.CODEPOINTS["\\"] && text[i + 1] > 0 && text[i + 1] <= 126) {
                                url_.push(text[i + 1]);
                                i += 2;
                                continue;
                            }
                            url_.push(text[i++]);
                        }
                        url = Uint8Array.from(url_);
                        if (text[i] !== exports.CODEPOINTS[")"]) {
                            throw new Error(`Can't find the end of the URL that starts at offset ${urlBeginPos}.`);
                        }
                    }
                    userId = getLinkUserId((0, _1_utilities_js_1.decodeText)(url));
                    if (!userId) {
                        const url_ = getUrl((0, _1_utilities_js_1.decodeText)(url));
                        if (!url_) {
                            skipEntity = true;
                        }
                        else {
                            argument = url_;
                        }
                    }
                    break;
                }
                case "customEmoji": {
                    if (text[i + 1] !== exports.CODEPOINTS["("]) {
                        throw new _0_errors_js_1.InputError("Custom emoji entities must contain a tg://emoji URL.");
                    }
                    i += 2;
                    const url_ = [];
                    const urlBeginPos = i;
                    while (i < text.length && text[i] !== exports.CODEPOINTS[")"]) {
                        if (text[i] === exports.CODEPOINTS["\\"] && text[i + 1] > 0 && text[i + 1] <= 126) {
                            url_.push(text[i + 1]);
                            i += 2;
                            continue;
                        }
                        url_.push(text[i++]);
                    }
                    const url = Uint8Array.from(url_);
                    if (text[i] !== exports.CODEPOINTS[")"]) {
                        throw new _0_errors_js_1.InputError(`Can't find the end of the custom emoji URL that starts at offset ${urlBeginPos}.`);
                    }
                    customEmojiId = getLinkCustomEmojiId((0, _1_utilities_js_1.decodeText)(url));
                    break;
                }
                default:
                    (0, _0_deps_js_1.unreachable)();
            }
            if (!skipEntity) {
                const entityOffset = nestedEntities.at(-1).entityOffset;
                const entityLength = utf16Offset - entityOffset;
                if (userId) {
                    entities.push({ type: "textMention", offset: entityOffset, length: entityLength, userId });
                }
                else if (customEmojiId) {
                    entities.push({ type: "customEmoji", offset: entityOffset, length: entityLength, customEmojiId });
                }
                else if (type === "textLink") {
                    entities.push({ type, offset: entityOffset, length: entityLength, url: typeof argument === "string" ? argument : (0, _1_utilities_js_1.decodeText)(argument) });
                }
                else if (type === "pre") {
                    entities.push({ type, offset: entityOffset, length: entityLength, language: typeof argument === "string" ? argument : (0, _1_utilities_js_1.decodeText)(argument) });
                }
                else if (type !== "customEmoji") {
                    entities.push({ type, offset: entityOffset, length: entityLength });
                }
            }
            nestedEntities.pop();
        }
    }
    if (nestedEntities.length !== 0) {
        const last = nestedEntities[nestedEntities.length - 1];
        throw new _0_errors_js_1.InputError(`Can't find the end of the ${last.type} entity that starts at offset ${last.entityByteOffset}.`);
    }
    entities = (0, _3_types_js_1.sortMessageEntities)(entities);
    return [(0, _1_utilities_js_1.decodeText)(text.slice(0, resultSize)), entities];
}
