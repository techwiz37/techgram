"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructStickerSet = constructStickerSet;
const _0_deps_js_1 = require("../0_deps.js");
const _2_tl_js_1 = require("../2_tl.js");
const _file_id_js_1 = require("./_file_id.js");
const _1_sticker_js_1 = require("./1_sticker.js");
function constructStickerSet(stickerSet) {
    if (!_2_tl_js_1.Api.is("messages.stickerSet", stickerSet)) {
        (0, _0_deps_js_1.unreachable)();
    }
    const type = stickerSet.set.emojis ? "customEmoji" : stickerSet.set.masks ? "mask" : "regular";
    const name = stickerSet.set.short_name;
    const title = stickerSet.set.title;
    const stickers = stickerSet.documents.map((v) => {
        if (!_2_tl_js_1.Api.is("document", v)) {
            (0, _0_deps_js_1.unreachable)();
        }
        const fileId = {
            type: _file_id_js_1.FileType.Sticker,
            dcId: v.dc_id,
            fileReference: v.file_reference,
            location: { type: "common", id: v.id, accessHash: v.access_hash },
        };
        return (0, _1_sticker_js_1.constructSticker2)(v, (0, _file_id_js_1.serializeFileId)(fileId), (0, _file_id_js_1.toUniqueFileId)(fileId), name);
    });
    const thumbnails = new Array();
    const thumb = stickerSet.set.thumbs?.[0];
    if (thumb !== undefined && stickerSet.set.thumb_version !== undefined && stickerSet.set.thumb_dc_id !== undefined && _2_tl_js_1.Api.is("photoSize", thumb)) {
        const fileId = {
            type: _file_id_js_1.FileType.Photo,
            dcId: stickerSet.set.thumb_dc_id,
            location: {
                type: "photo",
                source: {
                    type: _file_id_js_1.PhotoSourceType.StickerSetThumbnailVersion,
                    stickerSetId: stickerSet.set.id,
                    stickerSetAccessHash: stickerSet.set.access_hash,
                    version: stickerSet.set.thumb_version,
                },
                id: 0n,
                accessHash: 0n,
            },
        };
        thumbnails.push({
            fileId: (0, _file_id_js_1.serializeFileId)(fileId),
            fileUniqueId: (0, _file_id_js_1.toUniqueFileId)(fileId),
            width: thumb.w,
            height: thumb.h,
            fileSize: thumb.size,
        });
    }
    const adaptive = !!stickerSet.set.text_color;
    const canSetAsChannelStatus = !!stickerSet.set.channel_emoji_status;
    const creator = !!stickerSet.set.creator;
    const official = !!stickerSet.set.official;
    const archived = !!stickerSet.set.archived;
    const stickerSet_ = {
        id: String(stickerSet.set.id),
        type,
        name,
        title,
        stickers,
        thumbnails,
        isAdaptive: adaptive,
        canSetAsChannelStatus,
        isCreator: creator,
        isOfficial: official,
        isArchived: archived,
    };
    if (stickerSet.set.installed_date) {
        stickerSet_.addedAt = stickerSet.set.installed_date;
    }
    return stickerSet_;
}
