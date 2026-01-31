"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructChatPhoto = constructChatPhoto;
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _file_id_js_1 = require("./_file_id.js");
function constructChatPhoto(photo, chatId, chatAccessHash) {
    const smallFileId_ = {
        type: _file_id_js_1.FileType.ProfilePhoto,
        dcId: photo.dc_id,
        location: { type: "photo", id: photo.photo_id, accessHash: 0n, source: { type: _file_id_js_1.PhotoSourceType.ChatPhotoSmall, chatId: BigInt(chatId), chatAccessHash } },
    };
    const smallFileId = (0, _file_id_js_1.serializeFileId)(smallFileId_);
    const smallFileUniqueId = (0, _file_id_js_1.toUniqueFileId)(smallFileId_);
    const bigFileId_ = {
        type: _file_id_js_1.FileType.ProfilePhoto,
        dcId: photo.dc_id,
        location: { type: "photo", id: photo.photo_id, accessHash: 0n, source: { type: _file_id_js_1.PhotoSourceType.ChatPhotoBig, chatId: BigInt(chatId), chatAccessHash } },
    };
    const bigFileId = (0, _file_id_js_1.serializeFileId)(bigFileId_);
    const bigFileUniqueId = (0, _file_id_js_1.toUniqueFileId)(bigFileId_);
    if (_2_tl_js_1.Api.is("chatPhoto", photo)) {
        return (0, _1_utilities_js_1.cleanObject)({
            smallFileId,
            smallFileUniqueId,
            bigFileId,
            bigFileUniqueId,
            hasVideo: photo.has_video || false,
            isPersonal: false,
        });
    }
    else {
        return (0, _1_utilities_js_1.cleanObject)({
            smallFileId,
            smallFileUniqueId,
            bigFileId,
            bigFileUniqueId,
            hasVideo: photo.has_video || false,
            isPersonal: photo.personal ? true : false,
        });
    }
}
