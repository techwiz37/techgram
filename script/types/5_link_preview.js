"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructLinkPreview = constructLinkPreview;
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _file_id_js_1 = require("./_file_id.js");
const _1_audio_js_1 = require("./1_audio.js");
const _1_document_js_1 = require("./1_document.js");
const _1_photo_js_1 = require("./1_photo.js");
const _4_gift_js_1 = require("./4_gift.js");
function constructLinkPreview(media, invert, getPeer) {
    if (_2_tl_js_1.Api.is("webPageNotModified", media.webpage)) {
        (0, _0_deps_js_1.unreachable)();
    }
    const id = String(media.webpage.id);
    const mediaSize = media.force_large_media ? "large" : "small";
    const isAboveText = !!invert;
    switch (media.webpage._) {
        case "webPagePending":
            return (0, _1_utilities_js_1.cleanObject)({
                type: "loading",
                id,
                date: media.webpage.date,
                url: media.webpage.url,
                mediaSize,
                isAboveText,
            });
        case "webPageEmpty":
            return (0, _1_utilities_js_1.cleanObject)({
                type: "notLoaded",
                id,
                url: media.webpage.url,
                mediaSize,
                isAboveText,
            });
    }
    const url = media.webpage.url;
    let linkPreview = {
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
                    thumbnail: media.webpage.photo ? (0, _1_photo_js_1.constructPhoto)(_2_tl_js_1.Api.as("photo", media.webpage.photo)) : undefined,
                };
                break;
            }
            else if (media.webpage.document) {
                const document = _2_tl_js_1.Api.as("document", media.webpage.document);
                const fileId = {
                    type: _file_id_js_1.FileType.Video,
                    dcId: document.dc_id,
                    fileReference: document.file_reference,
                    location: { type: "common", id: document.id, accessHash: document.access_hash },
                };
                const startTimestamp = Number(new URL(media.webpage.url).searchParams.get("t")) || undefined;
                const fileName = document.attributes.find((v) => _2_tl_js_1.Api.is("documentAttributeFilename", v));
                linkPreview = {
                    type: "video",
                    id,
                    url,
                    mediaSize,
                    isAboveText,
                    video: (0, _1_document_js_1.constructDocument)(document, fileName ?? { _: "documentAttributeFilename", file_name: "Unknown" }, (0, _file_id_js_1.serializeFileId)(fileId), (0, _file_id_js_1.toUniqueFileId)(fileId)),
                    startTimestamp,
                    thumbnail: media.webpage.video_cover_photo ? media.webpage.photo ? (0, _1_photo_js_1.constructPhoto)(_2_tl_js_1.Api.as("photo", media.webpage.photo)) : undefined : undefined,
                };
                break;
            }
            else if (media.webpage.embed_url) {
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
            }
            else if (media.webpage.photo) {
                linkPreview = {
                    type: "photo",
                    id,
                    url,
                    mediaSize,
                    isAboveText,
                    photo: (0, _1_photo_js_1.constructPhoto)(_2_tl_js_1.Api.as("photo", media.webpage.photo)),
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
            }
            else if (media.webpage.document) {
                const document = _2_tl_js_1.Api.as("document", media.webpage.document);
                const fileId = {
                    type: _file_id_js_1.FileType.Audio,
                    dcId: document.dc_id,
                    fileReference: document.file_reference,
                    location: { type: "common", id: document.id, accessHash: document.access_hash },
                };
                const audio = document.attributes.find((v) => _2_tl_js_1.Api.is("documentAttributeAudio", v));
                linkPreview = {
                    type: "audio",
                    id,
                    url,
                    mediaSize,
                    isAboveText,
                    audio: (0, _1_audio_js_1.constructAudio)(document, audio, (0, _file_id_js_1.serializeFileId)(fileId), (0, _file_id_js_1.toUniqueFileId)(fileId)),
                };
                break;
            }
            else if (media.webpage.embed_url) {
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
            }
            else if (media.webpage.photo) {
                linkPreview = {
                    type: "photo",
                    id,
                    url,
                    mediaSize,
                    isAboveText,
                    photo: (0, _1_photo_js_1.constructPhoto)(_2_tl_js_1.Api.as("photo", media.webpage.photo)),
                };
                break;
            }
            break;
        case "telegram_nft": {
            const gift = media.webpage.attributes?.find((v) => _2_tl_js_1.Api.is("webPageAttributeUniqueStarGift", v))?.gift;
            if (gift) {
                linkPreview = {
                    type: "gift",
                    id,
                    url,
                    mediaSize,
                    isAboveText,
                    gift: (0, _4_gift_js_1.constructGift)(gift, getPeer),
                };
                break;
            }
        }
    }
    return (0, _1_utilities_js_1.cleanObject)(linkPreview);
}
