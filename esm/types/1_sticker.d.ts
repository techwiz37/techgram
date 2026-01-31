import { type MaybePromise } from "../1_utilities.js";
import { Api } from "../2_tl.js";
import { type MaskPosition } from "./0_mask_position.js";
import { type Thumbnail } from "./0_thumbnail.js";
export interface Sticker {
    fileId: string;
    fileUniqueId: string;
    type: "regular" | "mask" | "customEmoji";
    width: number;
    height: number;
    isAnimated: boolean;
    isVideo: boolean;
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
export declare function constructSticker(document: Api.document, fileId: string, fileUniqueId: string, getStickerSetName: StickerSetNameGetter, customEmojiId?: string): Promise<Sticker>;
export declare function constructSticker2(document: Api.document, fileId: string, fileUniqueId: string, setName: string | undefined, customEmojiId?: string): Sticker;
//# sourceMappingURL=1_sticker.d.ts.map