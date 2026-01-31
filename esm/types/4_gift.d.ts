import { Api } from "../2_tl.js";
import type { GiftValue } from "./0_gift_value.js";
import type { ChatP, PeerGetter } from "./1_chat_p.js";
import { type Sticker } from "./1_sticker.js";
import { type GiftUpgradedComponent } from "./3_gift_upgraded_component.js";
export interface GiftNonUpgraded {
    type: "nonupgraded";
    id: string;
    sticker: Sticker;
    price: number;
    isLimited: boolean;
    remaining?: number;
    total?: number;
    soldOut?: boolean;
    isBirthday: boolean;
    conversionPrice: number;
    firstSaleDate?: number;
    lastSaleDate?: number;
    upgradePrice?: number;
}
export interface GiftUpgraded {
    type: "upgraded";
    id: string;
    title: string;
    index: number;
    ownerName?: string;
    ownerAddress?: string;
    owner?: ChatP;
    currentUpgrades: number;
    maxUpgrades: number;
    components: GiftUpgradedComponent[];
    address?: string;
    price?: number;
    priceTon?: number;
    isTonOnly?: boolean;
    value?: GiftValue;
}
export type Gift = GiftNonUpgraded | GiftUpgraded;
export declare function constructGift(gift: Api.StarGift, getPeer: PeerGetter): Gift;
export declare function constructGiftUpgraded(gift: Api.starGiftUnique, getPeer: PeerGetter): GiftUpgraded;
export declare function constructGiftNonUpgraded(gift: Api.starGift): Gift;
//# sourceMappingURL=4_gift.d.ts.map