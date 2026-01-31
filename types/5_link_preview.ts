import { unreachable } from "../0_deps.ts";
import { cleanObject } from "../1_utilities.ts";
import { Api } from "../2_tl.ts";
import { type FileId, FileType, serializeFileId, toUniqueFileId } from "./_file_id.ts";
import type { LinkPreviewMediaSize } from "./0_link_preview_media_size.ts";
import { type Audio, constructAudio } from "./1_audio.ts";
import type { PeerGetter } from "./1_chat_p.ts";
import { constructDocument, type Document } from "./1_document.ts";
import { constructPhoto, type Photo } from "./1_photo.ts";
import { constructGift, type Gift } from "./4_gift.ts";

export interface InputLinkPreview {

  type: "input";

  disable?: boolean;

  url?: string;

  mediaSize?: LinkPreviewMediaSize;

  isAboveText?: boolean;
}

export interface _LinkPreviewBase {

  id: string;

  mediaSize: LinkPreviewMediaSize;

  isAboveText: boolean;
}

export interface LinkPreviewLoading extends _LinkPreviewBase {

  type: "loading";

  url?: string;

  date: number;
}

export interface LinkPreviewNotLoaded extends _LinkPreviewBase {

  type: "notLoaded";

  url?: string;
}

export interface _LinkPreviewLoadedBase extends _LinkPreviewBase {

  url: string;
}

export interface LinkPreviewUnknown extends _LinkPreviewLoadedBase {

  type: "unknown";
}

export interface LinkPreviewPhoto extends _LinkPreviewLoadedBase {

  type: "photo";
  photo: Photo;
}

export interface _LinkPreviewEmbeddedBase extends _LinkPreviewLoadedBase {
  embedUrl: string;
  width: number;
  height: number;
  duration: number;
}

export interface LinkPreviewEmbeddedVideo extends _LinkPreviewEmbeddedBase {

  type: "embeddedVideo";
  thumbnail?: Photo;
}

export interface LinkPreviewExternalVideo extends _LinkPreviewEmbeddedBase {

  type: "externalVideo";
  mimeType: string;
  width: number;
  height: number;
  duration: number;
}

export interface LinkPreviewVideo extends _LinkPreviewLoadedBase {

  type: "video";
  video: Document;
  startTimestamp?: number;
  thumbnail?: Photo;
}

export interface LinkPreviewEmbeddedAudio extends _LinkPreviewEmbeddedBase {

  type: "embeddedAudio";
  duration: number;
  width: number;
  height: number;
}

export interface LinkPreviewExternalAudio extends _LinkPreviewEmbeddedBase {

  type: "externalAudio";
  mimeType: string;
  duration: number;
}

export interface LinkPreviewAudio extends _LinkPreviewLoadedBase {

  type: "audio";
  audio: Audio;
}

export interface LinkPreviewGift extends _LinkPreviewLoadedBase {

  type: "gift";
  gift: Gift;
}

export type LinkPreviewLoaded =
  | LinkPreviewUnknown
  | LinkPreviewPhoto
  | LinkPreviewEmbeddedVideo
  | LinkPreviewExternalVideo
  | LinkPreviewVideo
  | LinkPreviewEmbeddedAudio
  | LinkPreviewExternalAudio
  | LinkPreviewAudio
  | LinkPreviewGift;

export type LinkPreview = InputLinkPreview | LinkPreviewLoading | LinkPreviewNotLoaded | LinkPreviewLoaded;

export function constructLinkPreview(media: Api.messageMediaWebPage, invert: boolean | undefined, getPeer: PeerGetter): LinkPreview {
  if (Api.is("webPageNotModified", media.webpage)) {
    unreachable();
  }
  const id = String(media.webpage.id);
  const mediaSize: LinkPreviewMediaSize = media.force_large_media ? "large" : "small";
  const isAboveText = !!invert;

  switch (media.webpage._) {
    case "webPagePending":
      return cleanObject({
        type: "loading",
        id,
        date: media.webpage.date,
        url: media.webpage.url,
        mediaSize,
        isAboveText,
      });
    case "webPageEmpty":
      return cleanObject({
        type: "notLoaded",
        id,
        url: media.webpage.url,
        mediaSize,
        isAboveText,
      });
  }
  const url = media.webpage.url;
  let linkPreview: LinkPreview = {
    type: "unknown",
    id,
    url,
    mediaSize,
    isAboveText,
  };

  switch (media.webpage.type) {
    case "video":
      if (media.webpage.embed_type === "iframe") {
        linkPreview = {
          type: "embeddedVideo",
          id,
          url,
          mediaSize,
          isAboveText,
          embedUrl: media.webpage.embed_url ?? "",
          width: media.webpage.embed_width ?? 0,
          height: media.webpage.embed_height ?? 0,
          duration: media.webpage.duration ?? 0,
          thumbnail: media.webpage.photo ? constructPhoto(Api.as("photo", media.webpage.photo)) : undefined,
        };
        break;
      } else if (media.webpage.document) {
        const document = Api.as("document", media.webpage.document);
        const fileId: FileId = {
          type: FileType.Video,
          dcId: document.dc_id,
          fileReference: document.file_reference,
          location: { type: "common", id: document.id, accessHash: document.access_hash },
        };
        const startTimestamp = Number(new URL(media.webpage.url).searchParams.get("t")) || undefined;
        const fileName = document.attributes.find((v): v is Api.documentAttributeFilename => Api.is("documentAttributeFilename", v));

        linkPreview = {
          type: "video",
          id,
          url,
          mediaSize,
          isAboveText,
          video: constructDocument(document, fileName ?? { _: "documentAttributeFilename", file_name: "Unknown" }, serializeFileId(fileId), toUniqueFileId(fileId)),
          startTimestamp,
          thumbnail: media.webpage.video_cover_photo ? media.webpage.photo ? constructPhoto(Api.as("photo", media.webpage.photo)) : undefined : undefined,
        };
        break;
      } else if (media.webpage.embed_url) {
        linkPreview = {
          type: "externalVideo",
          id,
          url,
          mediaSize,
          isAboveText,
          embedUrl: media.webpage.embed_url ?? "",
          mimeType: media.webpage.embed_type ?? "",
          width: media.webpage.embed_width ?? 0,
          height: media.webpage.embed_height ?? 0,
          duration: media.webpage.duration ?? 0,
        };
        break;
      } else if (media.webpage.photo) {
        linkPreview = {
          type: "photo",
          id,
          url,
          mediaSize,
          isAboveText,
          photo: constructPhoto(Api.as("photo", media.webpage.photo)),
        };
        break;
      }

    case "audio":
      if (media.webpage.embed_type === "iframe") {
        linkPreview = {
          type: "embeddedAudio",
          id,
          url,
          mediaSize,
          isAboveText,
          embedUrl: media.webpage.embed_url ?? "",
          width: media.webpage.embed_width ?? 0,
          height: media.webpage.embed_height ?? 0,
          duration: media.webpage.duration ?? 0,
        };
        break;
      } else if (media.webpage.document) {
        const document = Api.as("document", media.webpage.document);
        const fileId: FileId = {
          type: FileType.Audio,
          dcId: document.dc_id,
          fileReference: document.file_reference,
          location: { type: "common", id: document.id, accessHash: document.access_hash },
        };
        const audio = document.attributes.find((v): v is Api.documentAttributeAudio => Api.is("documentAttributeAudio", v));
        linkPreview = {
          type: "audio",
          id,
          url,
          mediaSize,
          isAboveText,
          audio: constructAudio(document, audio, serializeFileId(fileId), toUniqueFileId(fileId)),
        };
        break;
      } else if (media.webpage.embed_url) {
        linkPreview = {
          type: "externalAudio",
          id,
          url,
          mediaSize,
          isAboveText,
          embedUrl: media.webpage.embed_url,
          mimeType: media.webpage.embed_type ?? "",
          width: media.webpage.embed_width ?? 0,
          height: media.webpage.embed_height ?? 0,
          duration: media.webpage.duration ?? 0,
        };
        break;
      } else if (media.webpage.photo) {
        linkPreview = {
          type: "photo",
          id,
          url,
          mediaSize,
          isAboveText,
          photo: constructPhoto(Api.as("photo", media.webpage.photo)),
        };
        break;
      }
      break;
    case "telegram_nft": {
      const gift = media.webpage.attributes?.find((v) => Api.is("webPageAttributeUniqueStarGift", v))?.gift;
      if (gift) {
        linkPreview = {
          type: "gift",
          id,
          url,
          mediaSize,
          isAboveText,
          gift: constructGift(gift, getPeer),
        };
        break;
      }
    }
  }

  return cleanObject(linkPreview);
}
