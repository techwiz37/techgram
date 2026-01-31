import type { FileSource } from "./0_file_source.ts";

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
