import { cleanObject, type MaybePromise } from "../1_utilities.ts";
import { Api } from "../2_tl.ts";
import { constructMaskPosition, type MaskPosition } from "./0_mask_position.ts";
import { constructThumbnail, type Thumbnail } from "./0_thumbnail.ts";

export interface Sticker {

  fileId: string;

  fileUniqueId: string;

  type: "regular" | "mask" | "customEmoji";

  width: number;

  height: number;

  thumbnails: Thumbnail[];

  emoji?: string;

  setName?: string;

  premiumAnimation?: File;

  maskPosition?: MaskPosition;

  customEmojiId?: string;

  needsRepainting?: boolean;

  fileSize?: number;
}

export type StickerSetNameGetter = (inputStickerSet: Api.inputStickerSetID) => MaybePromise<string | undefined>;

export async function constructSticker(document: Api.document, fileId: string, fileUniqueId: string, getStickerSetName: StickerSetNameGetter, customEmojiId = ""): Promise<Sticker> {
  const stickerAttribute = document.attributes.find((v): v is Api.documentAttributeSticker => Api.is("documentAttributeSticker", v));
  const setName = Api.is("inputStickerSetID", stickerAttribute?.stickerset) ? await getStickerSetName(stickerAttribute.stickerset) : undefined;

  return constructSticker2(document, fileId, fileUniqueId, setName, customEmojiId);
}

export function constructSticker2(document: Api.document, fileId: string, fileUniqueId: string, setName: string | undefined, customEmojiId = ""): Sticker {
  const stickerAttribute = document.attributes.find((v): v is Api.documentAttributeSticker => Api.is("documentAttributeSticker", v))!;
  const imageSizeAttribute = document.attributes.find((v): v is Api.documentAttributeImageSize => Api.is("documentAttributeImageSize", v))!;
  const customEmojiAttribute = document.attributes.find((v): v is Api.documentAttributeCustomEmoji => Api.is("documentAttributeCustomEmoji", v));
  const videoAttribute = document.attributes.find((v): v is Api.documentAttributeVideo => Api.is("documentAttributeVideo", v))!;

  return cleanObject({
    fileId,
    fileUniqueId,
    type: customEmojiAttribute ? "customEmoji" : stickerAttribute.mask ? "mask" : "regular",
    width: imageSizeAttribute ? imageSizeAttribute.w : videoAttribute ? videoAttribute.w : 512,
    height: imageSizeAttribute ? imageSizeAttribute.h : videoAttribute ? videoAttribute.h : 512,
    isAnimated: document.mime_type === "application/x-tgsticker",
    isVideo: document.mime_type === "video/webm",
    thumbnails: document.thumbs ? document.thumbs.map((v) => Api.is("photoSize", v) ? constructThumbnail(v, document) : null).filter((v) => v) as Thumbnail[] : [],
    emoji: (customEmojiAttribute ? customEmojiAttribute.alt : stickerAttribute.alt) || undefined,
    setName,
    premiumAnimation: undefined, 
    maskPosition: stickerAttribute ? stickerAttribute.mask_coords ? constructMaskPosition(stickerAttribute.mask_coords) : undefined : undefined,
    customEmojiId: customEmojiAttribute ? customEmojiId : undefined,
    needsRepainting: customEmojiAttribute ? Boolean(customEmojiAttribute.text_color) : undefined,
    fileSize: Number(document.size),
  });
}
