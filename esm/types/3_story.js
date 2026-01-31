import { unreachable } from "../0_deps.js";
import { cleanObject } from "../1_utilities.js";
import { constructMessageEntity } from "./2_message_entity.js";
import { constructStoryContent } from "./2_story_content.js";
import { constructStoryInteractions } from "./2_story_interactions.js";
import { constructStoryInteractiveArea } from "./2_story_interactive_area.js";
import { constructStoryPrivacy } from "./2_story_privacy.js";
export function constructStory(story, peer, getPeer) {
    const id = story.id;
    const peer_ = getPeer(peer);
    if (!peer_) {
        unreachable();
    }
    const chat = peer_[0];
    const date = story.date;
    const interactiveAreas = (story.media_areas ?? []).map(constructStoryInteractiveArea);
    const highlighted = story.pinned ? true : false;
    const content = constructStoryContent(story.media);
    const caption = story.caption;
    const captionEntities = story.entities?.map(constructMessageEntity).filter((v) => !!v);
    const privacy = story.privacy ? constructStoryPrivacy(story.privacy) : undefined;
    const interactions = story.views ? constructStoryInteractions(story.views) : undefined;
    return cleanObject({
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
