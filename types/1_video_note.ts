import { Api } from "../2_tl.ts";
import { constructThumbnail, type Thumbnail } from "./0_thumbnail.ts";

export interface VideoNote {

  fileId: string;

  fileUniqueId: string;

  length: number;

  duration: number;

  thumbnails: Thumbnail[];

  fileName?: string;

  fileSize: number;
}

export function constructVideoNote(document: Api.document, videoAttribute: Api.documentAttributeVideo, fileId: string, fileUniqueId: string): VideoNote {
  return {
    fileId,
    fileUniqueId,
    length: videoAttribute.w,
    duration: videoAttribute.duration,
    thumbnails: document.thumbs ? document.thumbs.map((v) => Api.is("photoSize", v) ? constructThumbnail(v, document) : null).filter((v) => v) as Thumbnail[] : [],
    fileSize: Number(document.size),
  };
}
