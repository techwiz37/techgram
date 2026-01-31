"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentManager = void 0;
const _0_errors_js_1 = require("../0_errors.js");
const _2_tl_js_1 = require("../2_tl.js");
const _3_types_js_1 = require("../3_types.js");
const paymentManagerUpdates = [
    "updateBotPrecheckoutQuery",
];
class PaymentManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    canHandleUpdate(update) {
        return _2_tl_js_1.Api.isOneOf(paymentManagerUpdates, update);
    }
    handleUpdate(update) {
        if (_2_tl_js_1.Api.is("updateBotPrecheckoutQuery", update)) {
            const preCheckoutQuery = (0, _3_types_js_1.constructPreCheckoutQuery)(update, this.#c.getPeer);
            return { preCheckoutQuery };
        }
        return null;
    }
    async answerPreCheckoutQuery(preCheckoutQueryId, ok, params) {
        this.#c.storage.assertBot("answerPreCheckoutQuery");
        if (!ok && !params?.error) {
            throw new _0_errors_js_1.InputError("error is required when ok is false");
        }
        const queryId = BigInt(preCheckoutQueryId);
        if (!queryId) {
            throw new _0_errors_js_1.InputError("Invalid pre-checkout query ID");
        }
        await this.#c.invoke({ _: "messages.setBotPrecheckoutResults", query_id: queryId, error: params?.error, success: ok ? true : undefined });
    }
    async refundStarPayment(userId, telegramPaymentChargeId) {
        this.#c.storage.assertBot("refundStarPayment");
        await this.#c.invoke({ _: "payments.refundStarsCharge", user_id: await this.#c.getInputUser(userId), charge_id: telegramPaymentChargeId });
    }
}
exports.PaymentManager = PaymentManager;
