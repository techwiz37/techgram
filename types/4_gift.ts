import { unreachable } from "../0_deps.ts";
import { cleanObject } from "../1_utilities.ts";
import { Api } from "../2_tl.ts";
import { type FileId, FileType, serializeFileId, toUniqueFileId } from "./_file_id.ts";
import type { GiftValue } from "./0_gift_value.ts";
import type { ChatP, PeerGetter } from "./1_chat_p.ts";
import { constructSticker2, type Sticker } from "./1_sticker.ts";
import { constructGiftUpgradedComponent, type GiftUpgradedComponent } from "./3_gift_upgraded_component.ts";

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

export function constructGift(gift: Api.StarGift, getPeer: PeerGetter): Gift {
  if (Api.is("starGiftUnique", gift)) {
    return constructGiftUpgraded(gift, getPeer);
  } else {
    return constructGiftNonUpgraded(gift);
  }
}
export function constructGiftUpgraded(gift: Api.starGiftUnique, getPeer: PeerGetter): GiftUpgraded {
  const id = String(gift.id);
  const title = gift.title;
  const index = gift.num;
  let owner: ChatP | undefined;
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
export function constructGiftNonUpgraded(gift: Api.starGift): Gift {
  if (!Api.is("document", gift.sticker)) {
    unreachable();
  }
  const id = String(gift.id);
  const fileId: FileId = {
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
