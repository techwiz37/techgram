import { Api } from "../2_tl.js";
import { FileType, PhotoSourceType, serializeFileId, toUniqueFileId } from "./_file_id.js";
export function constructThumbnail(size, file) {
    const type = Api.is("photo", file) ? FileType.Photo : FileType.Thumbnail;
    const fileType = Api.is("photo", file) ? FileType.Photo : FileType.Document;
    const fileId_ = {
        type,
        dcId: file.dc_id,
        fileReference: file.file_reference,
        location: { type: "photo", id: file.id, accessHash: file.access_hash, source: { type: PhotoSourceType.Thumbnail, fileType, thumbnailType: size.type.charCodeAt(0) } },
    };
    return {
        fileId: serializeFileId(fileId_),
        fileUniqueId: toUniqueFileId(fileId_),
        width: size.w,
        height: size.h,
        fileSize: size.size,
    };
}
