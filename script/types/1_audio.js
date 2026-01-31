"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructAudio = constructAudio;
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _0_thumbnail_js_1 = require("./0_thumbnail.js");
function constructAudio(document, audioAttribute, fileId, fileUniqueId) {
    return (0, _1_utilities_js_1.cleanObject)({
        fileId,
        fileUniqueId,
        duration: audioAttribute?.duration ?? 0,
        performer: audioAttribute?.performer,
        title: audioAttribute?.title,
        mimeType: document.mime_type,
        fileSize: Number(document.size),
        thumbnails: document.thumbs ? document.thumbs.map((v) => _2_tl_js_1.Api.is("photoSize", v) ? (0, _0_thumbnail_js_1.constructThumbnail)(v, document) : null).filter((v) => v) : [],
    });
}
