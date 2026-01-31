"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoSourceType = exports.FileType = void 0;
exports.deserializeFileId = deserializeFileId;
exports.serializeFileId = serializeFileId;
exports.toUniqueFileId = toUniqueFileId;
exports.getPhotoFileId = getPhotoFileId;
const _0_deps_js_1 = require("../0_deps.js");
const _0_errors_js_1 = require("../0_errors.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const NEXT_VERSION = 53;
const PERSISTENT_ID_VERSION = 4;
const WEB_LOCATION_FLAG = 1 << 24;
const FILE_REFERENCE_FLAG = 1 << 25;
const FileType_ = {
    Thumbnail: 0,
    ProfilePhoto: 1,
    Photo: 2,
    VoiceNote: 3,
    Video: 4,
    Document: 5,
    Encrypted: 6,
    Temp: 7,
    Sticker: 8,
    Audio: 9,
    Animation: 10,
    EncryptedThumbnail: 11,
    Wallpaper: 12,
    VideoNote: 13,
    SecureDecrypted: 14,
    SecureEncrypted: 15,
    Background: 16,
    DocumentAsFile: 17,
    Ringtone: 18,
    CallLog: 19,
    PhotoStory: 20,
    VideoStory: 21,
    Size: 22,
    None: 23,
};
exports.FileType = Object.freeze(FileType_);
const FileTypeClass = Object.freeze({
    Photo: 0,
    Document: 1,
    Secure: 2,
    Encrypted: 3,
    Temp: 4,
});
const PhotoSourceType_ = {
    Legacy: 0,
    Thumbnail: 1,
    ChatPhotoSmall: 2,
    ChatPhotoBig: 3,
    StickerSetThumbnail: 4,
    FullLegacy: 5,
    ChatPhotoSmallLegacy: 6,
    ChatPhotoBigLegacy: 7,
    StickerSetThumbnailLegacy: 8,
    StickerSetThumbnailVersion: 9,
};
exports.PhotoSourceType = Object.freeze(PhotoSourceType_);
function deserializePhotoSource(reader) {
    const type = reader.readInt32();
    switch (type) {
        case exports.PhotoSourceType.Legacy:
            return { type, secret: reader.readInt64() };
        case exports.PhotoSourceType.Thumbnail:
            return { type, fileType: reader.readInt32(), thumbnailType: reader.readInt32() };
        case exports.PhotoSourceType.ChatPhotoSmall:
        case exports.PhotoSourceType.ChatPhotoBig: {
            const chatId = reader.readInt64();
            const chatAccessHash = reader.readInt64();
            return { type, chatId, chatAccessHash };
        }
        case exports.PhotoSourceType.FullLegacy: {
            const volumeId = reader.readInt64();
            const localId = reader.readInt32();
            const secret = reader.readInt64();
            return { type, volumeId, localId, secret };
        }
        case exports.PhotoSourceType.ChatPhotoSmallLegacy:
        case exports.PhotoSourceType.ChatPhotoBigLegacy: {
            const chatId = reader.readInt64();
            const chatAccessHash = reader.readInt64();
            const volumeId = reader.readInt64();
            const localId = reader.readInt32();
            return { type, chatId, chatAccessHash, volumeId, localId };
        }
        case exports.PhotoSourceType.StickerSetThumbnail: {
            const stickerSetId = reader.readInt64();
            const stickerSetAccessHash = reader.readInt64();
            return { type, stickerSetId, stickerSetAccessHash };
        }
        case exports.PhotoSourceType.StickerSetThumbnailLegacy: {
            const stickerSetId = reader.readInt64();
            const stickerSetAccessHash = reader.readInt64();
            const volumeId = reader.readInt64();
            const localId = reader.readInt32();
            return { type, stickerSetId, stickerSetAccessHash, volumeId, localId };
        }
        case exports.PhotoSourceType.StickerSetThumbnailVersion: {
            const stickerSetId = reader.readInt64();
            const stickerSetAccessHash = reader.readInt64();
            return { type, stickerSetId, stickerSetAccessHash, version: reader.readInt32() };
        }
    }
}
function serializePhotoSource(photoSource, writer) {
    writer.writeInt32(photoSource.type);
    switch (photoSource.type) {
        case exports.PhotoSourceType.Legacy:
            writer.writeInt64(photoSource.secret);
            break;
        case exports.PhotoSourceType.Thumbnail:
            writer.writeInt32(photoSource.fileType);
            writer.writeInt32(photoSource.thumbnailType);
            break;
        case exports.PhotoSourceType.ChatPhotoSmall:
        case exports.PhotoSourceType.ChatPhotoBig:
            writer.writeInt64(photoSource.chatId);
            writer.writeInt64(photoSource.chatAccessHash);
            break;
        case exports.PhotoSourceType.FullLegacy:
            writer.writeInt64(photoSource.volumeId);
            writer.writeInt32(photoSource.localId);
            writer.writeInt64(photoSource.secret);
            break;
        case exports.PhotoSourceType.ChatPhotoSmallLegacy:
        case exports.PhotoSourceType.ChatPhotoBigLegacy:
            writer.writeInt64(photoSource.chatId);
            writer.writeInt64(photoSource.chatAccessHash);
            writer.writeInt64(photoSource.volumeId);
            writer.writeInt32(photoSource.localId);
            break;
        case exports.PhotoSourceType.StickerSetThumbnail:
            writer.writeInt64(photoSource.stickerSetId);
            writer.writeInt64(photoSource.stickerSetAccessHash);
            break;
        case exports.PhotoSourceType.StickerSetThumbnailLegacy:
            writer.writeInt64(photoSource.stickerSetId);
            writer.writeInt64(photoSource.stickerSetAccessHash);
            writer.writeInt64(photoSource.volumeId);
            writer.writeInt32(photoSource.localId);
            break;
        case exports.PhotoSourceType.StickerSetThumbnailVersion:
            writer.writeInt64(photoSource.stickerSetId);
            writer.writeInt64(photoSource.stickerSetAccessHash);
            writer.writeInt32(photoSource.version);
            break;
        default:
            (0, _0_deps_js_1.unreachable)();
    }
}
function getPhotoSourceCompareType(source) {
    switch (source.type) {
        case exports.PhotoSourceType.Legacy:
            break;
        case exports.PhotoSourceType.Thumbnail: {
            const type = source.thumbnailType;
            if (!(0 <= type && type <= 127)) {
                (0, _0_deps_js_1.unreachable)();
            }
            if (type === "a".charCodeAt(0)) {
                return 0;
            }
            if (type === "c".charCodeAt(0)) {
                return 1;
            }
            return type + 5;
        }
        case exports.PhotoSourceType.ChatPhotoSmall:
            return 0;
        case exports.PhotoSourceType.ChatPhotoBig:
            return 1;
        case exports.PhotoSourceType.StickerSetThumbnail:
            break;
        case exports.PhotoSourceType.FullLegacy:
        case exports.PhotoSourceType.ChatPhotoSmallLegacy:
        case exports.PhotoSourceType.ChatPhotoBigLegacy:
        case exports.PhotoSourceType.StickerSetThumbnailLegacy:
            return 3;
        case exports.PhotoSourceType.StickerSetThumbnailVersion:
            return 2;
        default:
            break;
    }
    (0, _0_deps_js_1.unreachable)();
}
function writePhotoSourceUniqueId(photoSource, writer) {
    const compareType = getPhotoSourceCompareType(photoSource);
    if (compareType !== 2 && compareType !== 3) {
        writer.write(new Uint8Array([compareType]));
        return;
    }
    if (compareType === 2) {
        writer.write(new Uint8Array([0x02]));
    }
    writer.writeInt64("volumeId" in photoSource ? photoSource.volumeId : "stickerSetId" in photoSource ? photoSource.stickerSetId : (0, _0_deps_js_1.unreachable)());
    writer.writeInt32("localId" in photoSource ? photoSource.localId : "version" in photoSource ? photoSource.version : (0, _0_deps_js_1.unreachable)());
}
function getFileTypeClass(fileType) {
    switch (fileType) {
        case exports.FileType.Photo:
        case exports.FileType.ProfilePhoto:
        case exports.FileType.Thumbnail:
        case exports.FileType.EncryptedThumbnail:
        case exports.FileType.Wallpaper:
        case exports.FileType.PhotoStory:
            return FileTypeClass.Photo;
        case exports.FileType.Video:
        case exports.FileType.VoiceNote:
        case exports.FileType.Document:
        case exports.FileType.Sticker:
        case exports.FileType.Audio:
        case exports.FileType.Animation:
        case exports.FileType.VideoNote:
        case exports.FileType.Background:
        case exports.FileType.DocumentAsFile:
        case exports.FileType.Ringtone:
        case exports.FileType.CallLog:
        case exports.FileType.VideoStory:
            return FileTypeClass.Document;
        case exports.FileType.SecureDecrypted:
        case exports.FileType.SecureEncrypted:
            return FileTypeClass.Secure;
        case exports.FileType.Encrypted:
            return FileTypeClass.Encrypted;
        case exports.FileType.Temp:
            return FileTypeClass.Temp;
        case exports.FileType.None:
        case exports.FileType.Size:
        default:
            (0, _0_deps_js_1.unreachable)();
    }
}
function isWeb(fileType) {
    return !!(fileType & WEB_LOCATION_FLAG);
}
function hasFileReference(fileType) {
    return !!(fileType & FILE_REFERENCE_FLAG);
}
function deserializeFileId(fileId) {
    const reader = new _2_tl_js_1.TLReader((0, _1_utilities_js_1.rleDecode)((0, _1_utilities_js_1.base64DecodeUrlSafe)(fileId)));
    if (reader.buffer[reader.buffer.length - 1] !== PERSISTENT_ID_VERSION) {
        throw new _0_errors_js_1.InputError("Unsupported file ID format");
    }
    const originalType = reader.readInt32();
    const type = ((originalType & ~WEB_LOCATION_FLAG) & ~FILE_REFERENCE_FLAG);
    const dcId = reader.readInt32();
    if (isWeb(originalType)) {
        const url = reader.readString();
        const accessHash = reader.readInt64();
        return { type, dcId, location: { type: "web", url, accessHash } };
    }
    const fileReference = hasFileReference(originalType) ? reader.readBytes() : undefined;
    const id = reader.readInt64();
    const accessHash = reader.readInt64();
    if (getFileTypeClass(type) === FileTypeClass.Photo) {
        const source = deserializePhotoSource(reader);
        return { type, dcId, fileReference, location: { type: "photo", id, accessHash, source } };
    }
    else {
        return { type, dcId, fileReference, location: { type: "common", id, accessHash } };
    }
}
function serializeFileId(fileId) {
    const writer = new _2_tl_js_1.TLWriter();
    let type = fileId.type;
    if (fileId.fileReference) {
        type |= FILE_REFERENCE_FLAG;
    }
    if (fileId.location.type === "web") {
        type |= WEB_LOCATION_FLAG;
    }
    writer.writeInt32(type);
    writer.writeInt32(fileId.dcId);
    if (fileId.location.type === "web") {
        writer.writeString(fileId.location.url);
        writer.writeInt64(fileId.location.accessHash);
    }
    else {
        if (fileId.fileReference) {
            writer.writeBytes(fileId.fileReference);
        }
        writer.writeInt64(fileId.location.id);
        writer.writeInt64(fileId.location.accessHash);
        if (fileId.location.type === "photo") {
            serializePhotoSource(fileId.location.source, writer);
        }
    }
    writer.write(new Uint8Array([NEXT_VERSION - 1, PERSISTENT_ID_VERSION]));
    return (0, _1_utilities_js_1.base64EncodeUrlSafe)((0, _1_utilities_js_1.rleEncode)(writer.buffer));
}
function toUniqueFileId(fileId) {
    const writer = new _2_tl_js_1.TLWriter();
    const type = fileId.location.type === "web" ? 0 : (getFileTypeClass(fileId.type) + 1);
    writer.writeInt32(type);
    if (fileId.location.type === "web") {
        writer.writeString(fileId.location.url);
    }
    else if (fileId.location.type === "common") {
        writer.writeInt64(fileId.location.id);
    }
    else {
        switch (fileId.location.source.type) {
            case exports.PhotoSourceType.Legacy:
            case exports.PhotoSourceType.StickerSetThumbnail:
                (0, _0_deps_js_1.unreachable)();
            case exports.PhotoSourceType.FullLegacy:
            case exports.PhotoSourceType.ChatPhotoSmallLegacy:
            case exports.PhotoSourceType.ChatPhotoBigLegacy:
            case exports.PhotoSourceType.StickerSetThumbnailLegacy:
                writer.writeInt64(fileId.location.id);
                writePhotoSourceUniqueId(fileId.location.source, writer);
                break;
            case exports.PhotoSourceType.ChatPhotoSmall:
            case exports.PhotoSourceType.ChatPhotoBig:
            case exports.PhotoSourceType.Thumbnail:
                writer.writeInt64(fileId.location.id);
                writePhotoSourceUniqueId(fileId.location.source, writer);
                break;
            case exports.PhotoSourceType.StickerSetThumbnailVersion:
                writePhotoSourceUniqueId(fileId.location.source, writer);
                break;
        }
    }
    return (0, _1_utilities_js_1.base64EncodeUrlSafe)((0, _1_utilities_js_1.rleEncode)(writer.buffer));
}
function getPhotoFileId(photo) {
    const sizes = photo.sizes
        .map((v) => {
        if (_2_tl_js_1.Api.is("photoSizeProgressive", v)) {
            return { _: "photoSize", type: v.type, w: v.w, h: v.h, size: Math.max(...v.sizes) };
        }
        else {
            return v;
        }
    })
        .filter((v) => _2_tl_js_1.Api.is("photoSize", v))
        .sort((a, b) => a.size - b.size);
    const largest = sizes.slice(-1)[0];
    const { dc_id: dcId, id, access_hash: accessHash, file_reference: fileReference } = photo;
    const fileId = {
        type: exports.FileType.Photo,
        dcId,
        fileReference,
        location: {
            type: "photo",
            id,
            accessHash,
            source: {
                type: exports.PhotoSourceType.Thumbnail,
                fileType: exports.FileType.Photo,
                thumbnailType: largest.type.charCodeAt(0),
            },
        },
    };
    return { fileId: serializeFileId(fileId), fileUniqueId: toUniqueFileId(fileId) };
}
