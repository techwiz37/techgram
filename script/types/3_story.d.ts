import type { Api } from "../2_tl.js";
import type { ChatP, PeerGetter } from "./1_chat_p.js";
import { type MessageEntity } from "./2_message_entity.js";
import { type StoryContent } from "./2_story_content.js";
import { type StoryInteractions } from "./2_story_interactions.js";
import { type StoryInteractiveArea } from "./2_story_interactive_area.js";
import { type StoryPrivacy } from "./2_story_privacy.js";
export interface Story {
    out: boolean;
    id: number;
    chat: ChatP;
    date: number;
    edited: boolean;
    content: StoryContent;
    interactiveAreas: StoryInteractiveArea[];
    highlighted: boolean;
    interactions?: StoryInteractions;
    privacy?: StoryPrivacy;
    caption?: string;
    captionEntities?: MessageEntity[];
}
export declare function constructStory(story: Api.storyItem, peer: Api.peerUser | Api.peerChat | Api.peerChannel, getPeer: PeerGetter): Story;
//# sourceMappingURL=3_story.d.ts.map