import { Api } from "../2_tl.js";
import type { Thumbnail } from "./0_thumbnail.js";
import { type Sticker } from "./1_sticker.js";
export interface StickerSet {
    id: string;
    name: string;
    title: string;
    type: "regular" | "mask" | "customEmoji";
    stickers: Sticker[];
    thumbnails: Thumbnail[];
    isAdaptive: boolean;
    canSetAsChannelStatus: boolean;
    isCreator: boolean;
    isOfficial: boolean;
    isArchived: boolean;
    addedAt?: number;
}
export declare function constructStickerSet(stickerSet: Api.messages_StickerSet): StickerSet;
//# sourceMappingURL=2_sticker_set.d.ts.map