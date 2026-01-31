"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftManager = void 0;
const _0_deps_js_1 = require("../0_deps.js");
const _0_errors_js_1 = require("../0_errors.js");
const _2_tl_js_1 = require("../2_tl.js");
const _3_types_js_1 = require("../3_types.js");
const _0_utilities_js_1 = require("./0_utilities.js");
class GiftManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    async getGifts() {
        const gifts = await this.#c.invoke({ _: "payments.getStarGifts", hash: 0 });
        if (!(_2_tl_js_1.Api.is("payments.starGifts", gifts))) {
            (0, _0_deps_js_1.unreachable)();
        }
        return await Promise.all(gifts.gifts.map((v) => (0, _3_types_js_1.constructGift)(v, this.#c.getPeer)));
    }
    async getClaimedGifts(chatId, params) {
        this.#c.storage.assertUser("getClaimedGifts");
        const offset = params?.offset ?? "";
        const limit = (0, _0_utilities_js_1.getLimit)(params?.limit);
        const peer = await this.#c.getInputPeer(chatId);
        const result = await this.#c.invoke({ _: "payments.getSavedStarGifts", peer, offset, limit });
        return (0, _3_types_js_1.constructClaimedGifts)(result, this.#c.getPeer);
    }
    async sendGift(chatId, giftId, params) {
        const hide_name = params?.private ? true : undefined;
        const include_upgrade = params?.upgrade ? true : undefined;
        const peer = await this.#c.getInputPeer(chatId);
        const gift_id = BigInt(giftId);
        let message;
        if (params?.message) {
            const parsedText = await this.#c.messageManager.parseText(params.message, params);
            message = { _: "textWithEntities", text: parsedText[0], entities: parsedText[1] ?? [] };
        }
        const invoice = { _: "inputInvoiceStarGift", hide_name, include_upgrade, peer, gift_id, message };
        const paymentForm = await this.#c.invoke({ _: "payments.getPaymentForm", invoice });
        await this.#c.invoke({ _: "payments.sendStarsForm", form_id: paymentForm.form_id, invoice });
    }
    async sellGift(userId, messageId) {
        const message = await this.#c.messageManager.getMessage(userId, messageId);
        if (message === null) {
            throw new _0_errors_js_1.InputError("Message not found.");
        }
        await this.#c.invoke({ _: "payments.convertStarGift", stargift: { _: "inputSavedStarGiftUser", msg_id: message.id } });
    }
    async getGift(slug) {
        if (slug.length > 100) {
            throw new _0_errors_js_1.InputError("Slug too long.");
        }
        slug = slug.toLowerCase();
        if (!/^[a-z]+-[1-9][0-9]*$/.test(slug)) {
            throw new _0_errors_js_1.InputError("Invalid slug.");
        }
        const result = await this.#c.invoke({ _: "payments.getUniqueStarGift", slug });
        return (0, _3_types_js_1.constructGift)(result.gift, this.#c.getPeer.bind(this));
    }
}
exports.GiftManager = GiftManager;
