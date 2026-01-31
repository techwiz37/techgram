"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructAnimation = constructAnimation;
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _0_thumbnail_js_1 = require("./0_thumbnail.js");
function constructAnimation(document, videoAttribute, fileAttribute, fileId, fileUniqueId) {
    return (0, _1_utilities_js_1.cleanObject)({
        fileId,
        fileUniqueId,
        width: videoAttribute?.w ?? 0,
        height: videoAttribute?.h ?? 0,
        duration: videoAttribute?.duration ?? 0,
        thumbnails: document.thumbs ? document.thumbs.map((v) => _2_tl_js_1.Api.is("photoSize", v) ? (0, _0_thumbnail_js_1.constructThumbnail)(v, document) : null).filter((v) => v) : [],
        fileName: fileAttribute?.file_name,
        mimeType: document.mime_type,
        fileSize: Number(document.size),
    });
}
