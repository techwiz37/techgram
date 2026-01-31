"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructStory = constructStory;
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_message_entity_js_1 = require("./2_message_entity.js");
const _2_story_content_js_1 = require("./2_story_content.js");
const _2_story_interactions_js_1 = require("./2_story_interactions.js");
const _2_story_interactive_area_js_1 = require("./2_story_interactive_area.js");
const _2_story_privacy_js_1 = require("./2_story_privacy.js");
function constructStory(story, peer, getPeer) {
    const id = story.id;
    const peer_ = getPeer(peer);
    if (!peer_) {
        (0, _0_deps_js_1.unreachable)();
    }
    const chat = peer_[0];
    const date = story.date;
    const interactiveAreas = (story.media_areas ?? []).map(_2_story_interactive_area_js_1.constructStoryInteractiveArea);
    const highlighted = story.pinned ? true : false;
    const content = (0, _2_story_content_js_1.constructStoryContent)(story.media);
    const caption = story.caption;
    const captionEntities = story.entities?.map(_2_message_entity_js_1.constructMessageEntity).filter((v) => !!v);
    const privacy = story.privacy ? (0, _2_story_privacy_js_1.constructStoryPrivacy)(story.privacy) : undefined;
    const interactions = story.views ? (0, _2_story_interactions_js_1.constructStoryInteractions)(story.views) : undefined;
    return (0, _1_utilities_js_1.cleanObject)({
        out: story.out ? true : false,
        id,
        chat,
        date,
        content,
        edited: story.edited ? true : false,
        interactiveAreas,
        highlighted,
        interactions,
        privacy,
        caption,
        captionEntities,
    });
}
