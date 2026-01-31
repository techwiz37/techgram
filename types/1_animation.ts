import { cleanObject } from "../1_utilities.ts";
import { Api } from "../2_tl.ts";
import { constructThumbnail, type Thumbnail } from "./0_thumbnail.ts";

export interface Animation {

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

export function constructAnimation(document: Api.document, videoAttribute: Api.documentAttributeVideo | undefined, fileAttribute: Api.documentAttributeFilename | undefined, fileId: string, fileUniqueId: string): Animation {
  return cleanObject({
    fileId,
    fileUniqueId,
    width: videoAttribute?.w ?? 0,
    height: videoAttribute?.h ?? 0,
    duration: videoAttribute?.duration ?? 0,
    thumbnails: document.thumbs ? document.thumbs.map((v) => Api.is("photoSize", v) ? constructThumbnail(v, document) : null).filter((v) => v) as Thumbnail[] : [],
    fileName: fileAttribute?.file_name,
    mimeType: document.mime_type,
    fileSize: Number(document.size),
  });
}
