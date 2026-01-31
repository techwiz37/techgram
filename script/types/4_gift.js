"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructGift = constructGift;
exports.constructGiftUpgraded = constructGiftUpgraded;
exports.constructGiftNonUpgraded = constructGiftNonUpgraded;
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _file_id_js_1 = require("./_file_id.js");
const _1_sticker_js_1 = require("./1_sticker.js");
const _3_gift_upgraded_component_js_1 = require("./3_gift_upgraded_component.js");
function constructGift(gift, getPeer) {
    if (_2_tl_js_1.Api.is("starGiftUnique", gift)) {
        return constructGiftUpgraded(gift, getPeer);
    }
    else {
        return constructGiftNonUpgraded(gift);
    }
}
function constructGiftUpgraded(gift, getPeer) {
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
    const components = gift.attributes.map(_3_gift_upgraded_component_js_1.constructGiftUpgradedComponent);
    const address = gift.gift_address;
    const price = starsAmount_ ? Number(starsAmount_.amount) : undefined;
    const priceTon = starsTonAmount_ ? Number(starsTonAmount_.amount / 10000000n) / 100 : undefined;
    const tonOnly = (price || priceTon) ? !!gift.resale_ton_only : undefined;
    const value = gift.value_amount ? { amount: Number(gift.value_amount), currency: gift.value_currency ?? "" } : undefined;
    return (0, _1_utilities_js_1.cleanObject)({
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
function constructGiftNonUpgraded(gift) {
    if (!_2_tl_js_1.Api.is("document", gift.sticker)) {
        (0, _0_deps_js_1.unreachable)();
    }
    const id = String(gift.id);
    const fileId = {
        type: _file_id_js_1.FileType.Sticker,
        dcId: gift.sticker.dc_id,
        fileReference: gift.sticker.file_reference,
        location: { type: "common", id: gift.sticker.id, accessHash: gift.sticker.access_hash },
    };
    const sticker = (0, _1_sticker_js_1.constructSticker2)(gift.sticker, (0, _file_id_js_1.serializeFileId)(fileId), (0, _file_id_js_1.toUniqueFileId)(fileId), undefined, "");
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
    return (0, _1_utilities_js_1.cleanObject)({
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
