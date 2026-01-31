"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructGame = constructGame;
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _file_id_js_1 = require("./_file_id.js");
const _1_animation_js_1 = require("./1_animation.js");
const _1_photo_js_1 = require("./1_photo.js");
function constructGame(media_) {
    const game_ = media_.game;
    const document_ = game_.document ? _2_tl_js_1.Api.as("document", game_.document) : undefined;
    const fileId_ = document_
        ? {
            type: _file_id_js_1.FileType.Animation,
            dcId: document_.dc_id,
            fileReference: document_.file_reference,
            location: { type: "common", id: document_.id, accessHash: document_.access_hash },
        }
        : undefined;
    return (0, _1_utilities_js_1.cleanObject)({
        title: game_.title,
        description: media_.game.description,
        photo: (0, _1_photo_js_1.constructPhoto)(_2_tl_js_1.Api.as("photo", game_.photo)),
        animation: fileId_ && document_
            ? (0, _1_animation_js_1.constructAnimation)(document_, document_.attributes.find((v) => _2_tl_js_1.Api.is("documentAttributeVideo", v)), document_.attributes.find((v) => _2_tl_js_1.Api.is("documentAttributeFilename", v)), (0, _file_id_js_1.serializeFileId)(fileId_), (0, _file_id_js_1.toUniqueFileId)(fileId_))
            : undefined,
    });
}
