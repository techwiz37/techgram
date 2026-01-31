import { Api } from "../2_tl.ts";
import { constructThumbnail, type Thumbnail } from "./0_thumbnail.ts";

export interface Video {

  fileId: string;

  fileUniqueId: string;

  width: number;

  height: number;

  duration: number;

  thumbnails: Thumbnail[];

  fileName?: string;

  mimeType: string;

  fileSize: number;
}

export function constructVideo(document: Api.document, videoAttribute: Api.documentAttributeVideo, fileName: string | undefined, fileId: string, fileUniqueId: string): Video {
  return {
    fileId,
    fileUniqueId,
    width: videoAttribute.w,
    height: videoAttribute.h,
    duration: videoAttribute.duration,
    thumbnails: document.thumbs ? document.thumbs.map((v) => Api.is("photoSize", v) ? constructThumbnail(v, document) : null).filter((v) => v) as Thumbnail[] : [],
    fileName,
    mimeType: document.mime_type,
    fileSize: Number(document.size),
  };
}
