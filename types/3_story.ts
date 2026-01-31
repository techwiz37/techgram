import { unreachable } from "../0_deps.ts";
import { cleanObject } from "../1_utilities.ts";
import type { Api } from "../2_tl.ts";
import type { ChatP, PeerGetter } from "./1_chat_p.ts";
import { constructMessageEntity, type MessageEntity } from "./2_message_entity.ts";
import { constructStoryContent, type StoryContent } from "./2_story_content.ts";
import { constructStoryInteractions, type StoryInteractions } from "./2_story_interactions.ts";
import { constructStoryInteractiveArea, type StoryInteractiveArea } from "./2_story_interactive_area.ts";
import { constructStoryPrivacy, type StoryPrivacy } from "./2_story_privacy.ts";

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

export function constructStory(story: Api.storyItem, peer: Api.peerUser | Api.peerChat | Api.peerChannel, getPeer: PeerGetter): Story {
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
  const captionEntities = story.entities?.map(constructMessageEntity).filter((v): v is NonNullable<typeof v> => !!v);
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
