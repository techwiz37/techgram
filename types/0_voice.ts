import type { Api } from "../2_tl.ts";

export interface Voice {

  fileId: string;

  fileUniqueId: string;

  duration: number;

  mimeType: string;

  fileSize: number;
}

export function constructVoice(document: Api.document, audioAttributes: Api.documentAttributeAudio, fileId: string, fileUniqueId: string): Voice {
  return {
    fileId,
    fileUniqueId,
    duration: audioAttributes.duration,
    mimeType: document.mime_type,
    fileSize: Number(document.size),
  };
}
