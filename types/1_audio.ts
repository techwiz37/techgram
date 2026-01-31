import { cleanObject } from "../1_utilities.ts";
import { Api } from "../2_tl.ts";
import { constructThumbnail, type Thumbnail } from "./0_thumbnail.ts";

export interface Audio {

  fileId: string;

  fileUniqueId: string;

  duration: number;

  performer?: string;

  title?: string;

  mimeType: string;

  fileSize: number;

  thumbnails: Thumbnail[];
}

export function constructAudio(document: Api.document, audioAttribute: Api.documentAttributeAudio | undefined, fileId: string, fileUniqueId: string): Audio {
  return cleanObject({
    fileId,
    fileUniqueId,
    duration: audioAttribute?.duration ?? 0,
    performer: audioAttribute?.performer,
    title: audioAttribute?.title,
    mimeType: document.mime_type,
    fileSize: Number(document.size),
    thumbnails: document.thumbs ? document.thumbs.map((v) => Api.is("photoSize", v) ? constructThumbnail(v, document) : null).filter((v) => v) as Thumbnail[] : [],
  });
}
