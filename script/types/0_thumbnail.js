"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructThumbnail = constructThumbnail;
const _2_tl_js_1 = require("../2_tl.js");
const _file_id_js_1 = require("./_file_id.js");
function constructThumbnail(size, file) {
    const type = _2_tl_js_1.Api.is("photo", file) ? _file_id_js_1.FileType.Photo : _file_id_js_1.FileType.Thumbnail;
    const fileType = _2_tl_js_1.Api.is("photo", file) ? _file_id_js_1.FileType.Photo : _file_id_js_1.FileType.Document;
    const fileId_ = {
        type,
        dcId: file.dc_id,
        fileReference: file.file_reference,
        location: { type: "photo", id: file.id, accessHash: file.access_hash, source: { type: _file_id_js_1.PhotoSourceType.Thumbnail, fileType, thumbnailType: size.type.charCodeAt(0) } },
    };
    return {
        fileId: (0, _file_id_js_1.serializeFileId)(fileId_),
        fileUniqueId: (0, _file_id_js_1.toUniqueFileId)(fileId_),
        width: size.w,
        height: size.h,
        fileSize: size.size,
    };
}
