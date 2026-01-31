"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructReactionCount = constructReactionCount;
const _0_reaction_js_1 = require("./0_reaction.js");
function constructReactionCount(reaction_) {
    const reaction = (0, _0_reaction_js_1.constructReaction)(reaction_.reaction);
    const count = reaction_.count;
    return { reaction, count };
}
