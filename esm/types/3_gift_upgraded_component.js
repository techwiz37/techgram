import { unreachable } from "../0_deps.js";
import { cleanObject } from "../1_utilities.js";
import { Api } from "../2_tl.js";
import { FileType, serializeFileId, toUniqueFileId } from "./_file_id.js";
import { constructSticker2 } from "./1_sticker.js";
import { constructMessageEntity } from "./2_message_entity.js";
export function constructGiftUpgradedComponent(attribute) {
    const name = "name" in attribute ? attribute.name : "";
    const rarityLevel = "rarity_permille" in attribute ? attribute.rarity_permille : 0;
    switch (attribute._) {
        case "starGiftAttributeModel": {
            if (!Api.is("document", attribute.document)) {
                unreachable();
            }
            const fileId = {
                type: FileType.Sticker,
                dcId: attribute.document.dc_id,
                fileReference: attribute.document.file_reference,
                location: { type: "common", id: attribute.document.id, accessHash: attribute.document.access_hash },
            };
            const sticker = constructSticker2(attribute.document, serializeFileId(fileId), toUniqueFileId(fileId), undefined, "");
            return {
                type: "model",
                name,
                sticker,
                rarityLevel,
            };
        }
        case "starGiftAttributePattern": {
            if (!Api.is("document", attribute.document)) {
                unreachable();
            }
            const fileId = {
                type: FileType.Sticker,
                dcId: attribute.document.dc_id,
                fileReference: attribute.document.file_reference,
                location: { type: "common", id: attribute.document.id, accessHash: attribute.document.access_hash },
            };
            const sticker = constructSticker2(attribute.document, serializeFileId(fileId), toUniqueFileId(fileId), undefined, "");
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
            return cleanObject({
                type: "originalDetails",
                senderId: attribute.sender_id ? Number(attribute.sender_id) : undefined,
                recipientId: Number(attribute.recipient_id),
                date: attribute.date,
                message: attribute.message?.text,
                entities: attribute.message ? attribute.message.entities.map(constructMessageEntity).filter((v) => !!v) : undefined,
            });
        default:
            unreachable();
    }
}
