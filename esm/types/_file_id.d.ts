import { Api } from "../2_tl.js";
declare const FileType_: {
    readonly Thumbnail: 0;
    readonly ProfilePhoto: 1;
    readonly Photo: 2;
    readonly VoiceNote: 3;
    readonly Video: 4;
    readonly Document: 5;
    readonly Encrypted: 6;
    readonly Temp: 7;
    readonly Sticker: 8;
    readonly Audio: 9;
    readonly Animation: 10;
    readonly EncryptedThumbnail: 11;
    readonly Wallpaper: 12;
    readonly VideoNote: 13;
    readonly SecureDecrypted: 14;
    readonly SecureEncrypted: 15;
    readonly Background: 16;
    readonly DocumentAsFile: 17;
    readonly Ringtone: 18;
    readonly CallLog: 19;
    readonly PhotoStory: 20;
    readonly VideoStory: 21;
    readonly Size: 22;
    readonly None: 23;
};
export declare const FileType: Readonly<typeof FileType_>;
export type FileType = typeof FileType[keyof typeof FileType];
declare const PhotoSourceType_: {
    readonly Legacy: 0;
    readonly Thumbnail: 1;
    readonly ChatPhotoSmall: 2;
    readonly ChatPhotoBig: 3;
    readonly StickerSetThumbnail: 4;
    readonly FullLegacy: 5;
    readonly ChatPhotoSmallLegacy: 6;
    readonly ChatPhotoBigLegacy: 7;
    readonly StickerSetThumbnailLegacy: 8;
    readonly StickerSetThumbnailVersion: 9;
};
export declare const PhotoSourceType: Readonly<typeof PhotoSourceType_>;
export type PhotoSource = {
    type: typeof PhotoSourceType["Legacy"];
    secret: bigint;
} | {
    type: typeof PhotoSourceType["Thumbnail"];
    fileType: FileType;
    thumbnailType: number;
} | {
    type: typeof PhotoSourceType["ChatPhotoSmall"];
    chatId: bigint;
    chatAccessHash: bigint;
} | {
    type: typeof PhotoSourceType["ChatPhotoBig"];
    chatId: bigint;
    chatAccessHash: bigint;
} | {
    type: typeof PhotoSourceType["StickerSetThumbnail"];
    stickerSetId: bigint;
    stickerSetAccessHash: bigint;
} | {
    type: typeof PhotoSourceType["FullLegacy"];
    volumeId: bigint;
    localId: number;
    secret: bigint;
} | {
    type: typeof PhotoSourceType["ChatPhotoSmallLegacy"];
    chatId: bigint;
    chatAccessHash: bigint;
    volumeId: bigint;
    localId: number;
} | {
    type: typeof PhotoSourceType["ChatPhotoBigLegacy"];
    chatId: bigint;
    chatAccessHash: bigint;
    volumeId: bigint;
    localId: number;
} | {
    type: typeof PhotoSourceType["StickerSetThumbnailLegacy"];
    stickerSetId: bigint;
    stickerSetAccessHash: bigint;
    volumeId: bigint;
    localId: number;
} | {
    type: typeof PhotoSourceType["StickerSetThumbnailVersion"];
    stickerSetId: bigint;
    stickerSetAccessHash: bigint;
    version: number;
};
type FileLocation = {
    type: "web";
    url: string;
    accessHash: bigint;
} | {
    type: "photo";
    id: bigint;
    accessHash: bigint;
    source: PhotoSource;
} | {
    type: "common";
    id: bigint;
    accessHash: bigint;
};
export interface FileId {
    type: FileType;
    dcId: number;
    fileReference?: Uint8Array<ArrayBuffer>;
    location: FileLocation;
}
export declare function deserializeFileId(fileId: string): FileId;
export declare function serializeFileId(fileId: FileId): string;
export declare function toUniqueFileId(fileId: FileId): string;
export declare function getPhotoFileId(photo: Api.photo): {
    fileId: string;
    fileUniqueId: string;
};
export {};
//# sourceMappingURL=_file_id.d.ts.map