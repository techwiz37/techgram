"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructGiftUpgradedComponent = constructGiftUpgradedComponent;
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _file_id_js_1 = require("./_file_id.js");
const _1_sticker_js_1 = require("./1_sticker.js");
const _2_message_entity_js_1 = require("./2_message_entity.js");
function constructGiftUpgradedComponent(attribute) {
    const name = "name" in attribute ? attribute.name : "";
    const rarityLevel = "rarity_permille" in attribute ? attribute.rarity_permille : 0;
    switch (attribute._) {
        case "starGiftAttributeModel": {
            if (!_2_tl_js_1.Api.is("document", attribute.document)) {
                (0, _0_deps_js_1.unreachable)();
            }
            const fileId = {
                type: _file_id_js_1.FileType.Sticker,
                dcId: attribute.document.dc_id,
                fileReference: attribute.document.file_reference,
                location: { type: "common", id: attribute.document.id, accessHash: attribute.document.access_hash },
            };
            const sticker = (0, _1_sticker_js_1.constructSticker2)(attribute.document, (0, _file_id_js_1.serializeFileId)(fileId), (0, _file_id_js_1.toUniqueFileId)(fileId), undefined, "");
            return {
                type: "model",
                name,
                sticker,
                rarityLevel,
            };
        }
        case "starGiftAttributePattern": {
            if (!_2_tl_js_1.Api.is("document", attribute.document)) {
                (0, _0_deps_js_1.unreachable)();
            }
            const fileId = {
                type: _file_id_js_1.FileType.Sticker,
                dcId: attribute.document.dc_id,
                fileReference: attribute.document.file_reference,
                location: { type: "common", id: attribute.document.id, accessHash: attribute.document.access_hash },
            };
            const sticker = (0, _1_sticker_js_1.constructSticker2)(attribute.document, (0, _file_id_js_1.serializeFileId)(fileId), (0, _file_id_js_1.toUniqueFileId)(fileId), undefined, "");
            return {
                type: "pattern",
                name,
                sticker,
                rarityLevel,
            };
        }
        case "starGiftAttributeBackdrop":
            return {
                type: "backdrop",
                name,
                centerColor: attribute.center_color,
                edgeColor: attribute.edge_color,
                patternColor: attribute.pattern_color,
                textColor: attribute.text_color,
                rarityLevel,
            };
        case "starGiftAttributeOriginalDetails":
            return (0, _1_utilities_js_1.cleanObject)({
                type: "originalDetails",
                senderId: attribute.sender_id ? Number(attribute.sender_id) : undefined,
                recipientId: Number(attribute.recipient_id),
                date: attribute.date,
                message: attribute.message?.text,
                entities: attribute.message ? attribute.message.entities.map(_2_message_entity_js_1.constructMessageEntity).filter((v) => !!v) : undefined,
            });
        default:
            (0, _0_deps_js_1.unreachable)();
    }
}
