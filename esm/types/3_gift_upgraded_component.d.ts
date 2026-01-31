import { Api } from "../2_tl.js";
import { type Sticker } from "./1_sticker.js";
import { type MessageEntity } from "./2_message_entity.js";
export interface GiftUpgradedComponentModel {
    type: "model";
    name: string;
    sticker: Sticker;
    rarityLevel: number;
}
export interface GiftUpgradedComponentPattern {
    type: "pattern";
    name: string;
    sticker: Sticker;
    rarityLevel: number;
}
export interface GiftUpgradedComponentBackdrop {
    type: "backdrop";
    name: string;
    centerColor: number;
    edgeColor: number;
    patternColor: number;
    textColor: number;
    rarityLevel: number;
}
export interface GiftUpgradedComponentOriginalDetails {
    type: "originalDetails";
    senderId?: number;
    recipientId: number;
    date: number;
    message?: string;
    entities?: MessageEntity[];
}
export type GiftUpgradedComponent = GiftUpgradedComponentModel | GiftUpgradedComponentPattern | GiftUpgradedComponentBackdrop | GiftUpgradedComponentOriginalDetails;
export declare function constructGiftUpgradedComponent(attribute: Api.StarGiftAttribute): GiftUpgradedComponent;
//# sourceMappingURL=3_gift_upgraded_component.d.ts.map