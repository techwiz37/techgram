"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructStoryInteractions = constructStoryInteractions;
const _1_utilities_js_1 = require("../1_utilities.js");
const _1_story_reaction_js_1 = require("./1_story_reaction.js");
function constructStoryInteractions(views_) {
    const views = views_.views_count;
    const forwards = views_.forwards_count ?? 0;
    const reactionCount = views_.reactions_count;
    const reactions = views_.reactions ? views_.reactions.map(_1_story_reaction_js_1.constructStoryReaction) : undefined;
    return (0, _1_utilities_js_1.cleanObject)({ reactions, reactionCount, views, forwards });
}
