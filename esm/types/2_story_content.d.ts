import { Api } from "../2_tl.js";
import { type Photo } from "./1_photo.js";
import { type Video } from "./1_video.js";
export interface StoryContentPhoto {
    photo: Photo;
}
export interface StoryContentVideo {
    video: Video;
}
export interface StoryContentUnsupported {
    unsupported: true;
}
export type StoryContent = StoryContentPhoto | StoryContentVideo | StoryContentUnsupported;
export declare function constructStoryContent(media: Api.MessageMedia): StoryContent;
//# sourceMappingURL=2_story_content.d.ts.map