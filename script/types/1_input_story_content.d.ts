import type { FileSource } from "./0_file_source.js";
export interface InputStoryContentPhoto {
    photo: FileSource;
    attachedStickerFileIds?: string[];
}
export interface InputStoryContentVideo {
    video: FileSource;
    attachedStickerFileIds?: string[];
    duration: number;
    animation?: boolean;
}
export type InputStoryContent = InputStoryContentPhoto | InputStoryContentVideo;
//# sourceMappingURL=1_input_story_content.d.ts.map