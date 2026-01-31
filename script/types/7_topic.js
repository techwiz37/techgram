"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructTopic = constructTopic;
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
function constructTopic(message) {
    let forumTopicCreated;
    let forumTopicEdited;
    if ("forumTopicCreated" in message) {
        forumTopicCreated = message;
    }
    else if (message.replyToMessage && "forumTopicCreated" in message.replyToMessage) {
        forumTopicCreated = message.replyToMessage;
    }
    else {
        (0, _0_deps_js_1.unreachable)();
    }
    if ("forumTopicEdited" in message) {
        forumTopicEdited = message;
    }
    const id = forumTopicCreated.id;
    const date = forumTopicCreated.date;
    const creator = forumTopicCreated.from ? forumTopicCreated.from : message.from;
    const isGeneral = forumTopicCreated.id === 1;
    const isClosed = false;
    const isHidden = false;
    let name = forumTopicCreated.forumTopicCreated.name;
    const color = forumTopicCreated.forumTopicCreated.color;
    let customEmoijId = forumTopicCreated.forumTopicCreated.customEmojiId;
    if (forumTopicEdited) {
        name = forumTopicEdited.forumTopicEdited.name;
        customEmoijId = forumTopicEdited.forumTopicEdited.customEmojiId;
    }
    return (0, _1_utilities_js_1.cleanObject)({
        id,
        date,
        creator: creator,
        isGeneral,
        isClosed,
        isHidden,
        name,
        color,
        customEmoijId,
    });
}
