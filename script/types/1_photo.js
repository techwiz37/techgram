"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructPhoto = constructPhoto;
exports.getPhotoSizes = getPhotoSizes;
const _2_tl_js_1 = require("../2_tl.js");
const _file_id_js_1 = require("./_file_id.js");
const _0_thumbnail_js_1 = require("./0_thumbnail.js");
function constructPhoto(photo) {
    const { sizes, largest } = getPhotoSizes(photo);
    return {
        ...(0, _file_id_js_1.getPhotoFileId)(photo),
        width: largest.w,
        height: largest.h,
        fileSize: largest.size,
        thumbnails: sizes.slice(0, -1).map((v) => (0, _0_thumbnail_js_1.constructThumbnail)(v, photo)),
    };
}
function getPhotoSizes(photo) {
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
    return { sizes, largest };
}
