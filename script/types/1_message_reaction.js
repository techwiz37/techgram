"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructMessageReaction = constructMessageReaction;
const _0_deps_js_1 = require("../0_deps.js");
const _2_tl_js_1 = require("../2_tl.js");
const _0_reaction_js_1 = require("./0_reaction.js");
function constructMessageReaction(reaction_, recentReactions) {
    const choosers = recentReactions
        .filter((v) => {
        if (_2_tl_js_1.Api.is("reactionEmoji", reaction_.reaction)) {
            return _2_tl_js_1.Api.is("reactionEmoji", v.reaction) && v.reaction.emoticon === reaction_.reaction.emoticon;
        }
        else if (_2_tl_js_1.Api.is("reactionCustomEmoji", reaction_.reaction)) {
            return _2_tl_js_1.Api.is("reactionCustomEmoji", v.reaction) && v.reaction.document_id === reaction_.reaction.document_id;
        }
        else {
            (0, _0_deps_js_1.unreachable)();
        }
    })
        .map((v) => _2_tl_js_1.Api.peerToChatId(v.peer_id));
    const reaction = (0, _0_reaction_js_1.constructReaction)(reaction_.reaction);
    const count = reaction_.count;
    const chosen = reaction_.chosen_order !== undefined ? true : false;
    return { reaction, count, choosers, chosen };
}
