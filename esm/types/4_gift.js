import { unreachable } from "../0_deps.js";
import { cleanObject } from "../1_utilities.js";
import { Api } from "../2_tl.js";
import { FileType, serializeFileId, toUniqueFileId } from "./_file_id.js";
import { constructSticker2 } from "./1_sticker.js";
import { constructGiftUpgradedComponent } from "./3_gift_upgraded_component.js";
export function constructGift(gift, getPeer) {
    if (Api.is("starGiftUnique", gift)) {
        return constructGiftUpgraded(gift, getPeer);
    }
    else {
        return constructGiftNonUpgraded(gift);
    }
}
export function constructGiftUpgraded(gift, getPeer) {
    const id = String(gift.id);
    const title = gift.title;
    const index = gift.num;
    let owner;
    if (gift.owner_id) {
        const peer = getPeer(gift.owner_id);
        if (peer) {
            owner = peer[0];
        }
    }
    const starsAmount_ = gift.resell_amount?.find((v) => v._ === "starsAmount");
    const starsTonAmount_ = gift.resell_amount?.find((v) => v._ === "starsTonAmount");
    const ownerName = gift.owner_name;
    const ownerAddress = gift.owner_address;
    const currentUpgrades = gift.availability_issued;
    const maxUpgrades = gift.availability_total;
    const components = gift.attributes.map(constructGiftUpgradedComponent);
    const address = gift.gift_address;
    const price = starsAmount_ ? Number(starsAmount_.amount) : undefined;
    const priceTon = starsTonAmount_ ? Number(starsTonAmount_.amount / 10000000n) / 100 : undefined;
    const tonOnly = (price || priceTon) ? !!gift.resale_ton_only : undefined;
    const value = gift.value_amount ? { amount: Number(gift.value_amount), currency: gift.value_currency ?? "" } : undefined;
    return cleanObject({
        type: "upgraded",
        id,
        title,
        index,
        ownerName,
        ownerAddress,
        owner,
        currentUpgrades,
        maxUpgrades,
        components,
        address,
        price,
        priceTon,
        tonOnly,
        value,
    });
}
export function constructGiftNonUpgraded(gift) {
    if (!Api.is("document", gift.sticker)) {
        unreachable();
    }
    const id = String(gift.id);
    const fileId = {
        type: FileType.Sticker,
        dcId: gift.sticker.dc_id,
        fileReference: gift.sticker.file_reference,
        location: { type: "common", id: gift.sticker.id, accessHash: gift.sticker.access_hash },
    };
    const sticker = constructSticker2(gift.sticker, serializeFileId(fileId), toUniqueFileId(fileId), undefined, "");
    const price = Number(gift.stars);
    const isLimited = !!gift.limited;
    const isRemaining = isLimited ? gift.availability_remains ?? 0 : undefined;
    const total = isLimited ? gift.availability_total ?? 0 : undefined;
    const isSoldOut = isLimited ? !!gift.sold_out : undefined;
    const isBirthday = !!gift.birthday;
    const conversionPrice = Number(gift.convert_stars);
    const firstSaleDate = isLimited ? gift.first_sale_date ? gift.first_sale_date : undefined : undefined;
    const lastSaleDate = isLimited ? gift.last_sale_date ? gift.last_sale_date : undefined : undefined;
    const upgradePrice = gift.upgrade_stars ? Number(gift.upgrade_stars) : undefined;
    return cleanObject({
        type: "nonupgraded",
        id,
        sticker,
        price,
        isLimited,
        isRemaining,
        total,
        isSoldOut,
        isBirthday,
        conversionPrice,
        firstSaleDate,
        lastSaleDate,
        upgradePrice,
    });
}
