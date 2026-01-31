"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructStoryReaction = constructStoryReaction;
const _0_reaction_js_1 = require("./0_reaction.js");
function constructStoryReaction(reaction_) {
    const reaction = (0, _0_reaction_js_1.constructReaction)(reaction_.reaction);
    const count = reaction_.count;
    const chosen = reaction_.chosen_order !== undefined ? true : false;
    return { reaction, count, isChosen: chosen };
}
