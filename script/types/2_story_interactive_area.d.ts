import { Api } from "../2_tl.js";
import { type Location } from "./0_location.js";
import type { MessageReference } from "./0_message_reference.js";
import { type Reaction } from "./0_reaction.js";
import type { PeerGetter } from "./1_chat_p.js";
import { type Venue } from "./1_venue.js";
export interface StoryInteractiveAreaPosition {
    xPercentage: number;
    yPercentage: number;
    widthPercentage: number;
    heightPercentage: number;
    rotationAngle: number;
}
export interface _StoryInteractiveAreaPositionCommon {
    position: StoryInteractiveAreaPosition;
}
export interface StoryInteractiveAreaLocation extends _StoryInteractiveAreaPositionCommon {
    location: Location;
}
export interface StoryInteractiveAreaVenue extends _StoryInteractiveAreaPositionCommon {
    venue: Venue;
}
export interface StoryInteractiveAreaReaction extends _StoryInteractiveAreaPositionCommon {
    reaction: Reaction;
    count?: number;
    isDark?: boolean;
    isFlipped?: boolean;
}
export interface StoryInteractiveAreaMessage extends _StoryInteractiveAreaPositionCommon {
    messageReference: MessageReference;
}
export type StoryInteractiveArea = StoryInteractiveAreaLocation | StoryInteractiveAreaVenue | StoryInteractiveAreaReaction | StoryInteractiveAreaMessage;
export declare function constructStoryInteractiveArea(area: Api.MediaArea): StoryInteractiveArea;
export declare function storyInteractiveAreaToTlObject(area: StoryInteractiveArea, getPeer: PeerGetter): Api.MediaArea;
//# sourceMappingURL=2_story_interactive_area.d.ts.map