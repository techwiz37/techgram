import { unreachable } from "../0_deps.ts";
import { Api } from "../2_tl.ts";
import { type FileId, FileType, serializeFileId, toUniqueFileId } from "./_file_id.ts";
import { constructPhoto, type Photo } from "./1_photo.ts";
import { constructVideo, type Video } from "./1_video.ts";

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

export function constructStoryContent(media: Api.MessageMedia): StoryContent {
  if (Api.is("messageMediaPhoto", media)) {
    if (!media.photo) {
      unreachable();
    }
    const photo = constructPhoto(Api.as("photo", media.photo));
    return { photo };
  } else if (Api.is("messageMediaDocument", media)) {
    const document = media.document;
    if (!(Api.is("document", document))) {
      unreachable();
    }

    const video = document.attributes.find((v): v is Api.documentAttributeVideo => Api.is("documentAttributeVideo", v));
    if (!video) {
      unreachable();
    }
    const fileId_: FileId = { type: FileType.Video, dcId: document.dc_id, fileReference: document.file_reference, location: { type: "common", id: document.id, accessHash: document.access_hash } };
    const fileUniqueId = toUniqueFileId(fileId_);
    const fileId = serializeFileId(fileId_);

    const video_ = constructVideo(document, video, undefined, fileId, fileUniqueId);
    return { video: video_ };
  } else {
    unreachable();
  }
}
