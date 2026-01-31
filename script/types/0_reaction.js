"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructReaction = constructReaction;
exports.reactionToTlObject = reactionToTlObject;
exports.reactionEqual = reactionEqual;
const _0_deps_js_1 = require("../0_deps.js");
const _2_tl_js_1 = require("../2_tl.js");
function constructReaction(reaction) {
    if (_2_tl_js_1.Api.is("reactionEmoji", reaction)) {
        return { type: "emoji", emoji: reaction.emoticon };
    }
    else if (_2_tl_js_1.Api.is("reactionCustomEmoji", reaction)) {
        return { type: "custom", id: String(reaction.document_id) };
    }
    else if (_2_tl_js_1.Api.is("reactionPaid", reaction)) {
        return { type: "paid" };
    }
    else {
        (0, _0_deps_js_1.unreachable)();
    }
}
function reactionToTlObject(reaction) {
    return reaction.type === "emoji" ? ({ _: "reactionEmoji", emoticon: reaction.emoji }) : reaction.type === "custom" ? ({ _: "reactionCustomEmoji", document_id: BigInt(reaction.id) }) : { _: "reactionPaid" };
}
function reactionEqual(left, right) {
    if (left.type === "emoji") {
        if (right.type === "emoji" && left.emoji === right.emoji) {
            return true;
        }
    }
    else if (left.type === "custom") {
        if (right.type === "custom" && left.id === right.id) {
            return true;
        }
    }
    return false;
}
