import { Api } from "../2_tl.ts";
import { constructThumbnail, type Thumbnail } from "./0_thumbnail.ts";

export interface Document {

  fileId: string;

  fileUniqueId: string;

  thumbnails: Thumbnail[];

  fileName: string;

  mimeType: string;

  fileSize: number;
}

export function constructDocument(document: Api.document, fileNameAttribute: Api.documentAttributeFilename, fileId: string, fileUniqueId: string): Document {
  return {
    fileId,
    fileUniqueId,
    thumbnails: document.thumbs ? document.thumbs.map((v) => Api.is("photoSize", v) ? constructThumbnail(v, document) : null).filter((v) => v) as Thumbnail[] : [],
    fileName: fileNameAttribute.file_name,
    mimeType: document.mime_type,
    fileSize: Number(document.size),
  };
}
