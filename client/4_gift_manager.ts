import { unreachable } from "../0_deps.ts";
import { InputError } from "../0_errors.ts";
import { Api } from "../2_tl.ts";
import { constructClaimedGifts, constructGift, type ID } from "../3_types.ts";
import type { GetClaimedGiftsParams, SendGiftParams } from "./0_params.ts";
import { getLimit } from "./0_utilities.ts";
import type { C as C_ } from "./1_types.ts";
import type { MessageManager } from "./3_message_manager.ts";

interface C extends C_ {
  messageManager: MessageManager;
}

export class GiftManager {
  #c: C;

  constructor(c: C) {
    this.#c = c;
  }

  async getGifts() {
    const gifts = await this.#c.invoke({ _: "payments.getStarGifts", hash: 0 });
    if (!(Api.is("payments.starGifts", gifts))) {
      unreachable();
    }
    return await Promise.all(gifts.gifts.map((v) => constructGift(v, this.#c.getPeer)));
  }

  async getClaimedGifts(chatId: ID, params?: GetClaimedGiftsParams) {
    this.#c.storage.assertUser("getClaimedGifts");
    const offset = params?.offset ?? "";
    const limit = getLimit(params?.limit);
    const peer = await this.#c.getInputPeer(chatId);
    const result = await this.#c.invoke({ _: "payments.getSavedStarGifts", peer, offset, limit });
    return constructClaimedGifts(result, this.#c.getPeer);
  }

  async sendGift(chatId: ID, giftId: string, params?: SendGiftParams) {
    const hide_name = params?.private ? true : undefined;
    const include_upgrade = params?.upgrade ? true : undefined;
    const peer = await this.#c.getInputPeer(chatId);
    const gift_id = BigInt(giftId);
    let message: Api.textWithEntities | undefined;
    if (params?.message) {
      const parsedText = await this.#c.messageManager.parseText(params.message, params);
      message = { _: "textWithEntities", text: parsedText[0], entities: parsedText[1] ?? [] };
    }
    const invoice: Api.inputInvoiceStarGift = { _: "inputInvoiceStarGift", hide_name, include_upgrade, peer, gift_id, message };
    const paymentForm = await this.#c.invoke({ _: "payments.getPaymentForm", invoice });
    await this.#c.invoke({ _: "payments.sendStarsForm", form_id: paymentForm.form_id, invoice });
  }

  async sellGift(userId: ID, messageId: number) {
    const message = await this.#c.messageManager.getMessage(userId, messageId);
    if (message === null) {
      throw new InputError("Message not found.");
    }
    await this.#c.invoke({ _: "payments.convertStarGift", stargift: { _: "inputSavedStarGiftUser", msg_id: message.id } });
  }

  async getGift(slug: string) {
    if (slug.length > 100) {
      throw new InputError("Slug too long.");
    }
    slug = slug.toLowerCase();
    if (!/^[a-z]+-[1-9][0-9]*$/.test(slug)) {
      throw new InputError("Invalid slug.");
    }
    const result = await this.#c.invoke({ _: "payments.getUniqueStarGift", slug });
    return constructGift(result.gift, this.#c.getPeer.bind(this));
  }
}
