import { InputError } from "../0_errors.js";
import { Api } from "../2_tl.js";
import { constructPreCheckoutQuery } from "../3_types.js";
const paymentManagerUpdates = [
    "updateBotPrecheckoutQuery",
];
export class PaymentManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    canHandleUpdate(update) {
        return Api.isOneOf(paymentManagerUpdates, update);
    }
    handleUpdate(update) {
        if (Api.is("updateBotPrecheckoutQuery", update)) {
            const preCheckoutQuery = constructPreCheckoutQuery(update, this.#c.getPeer);
            return { preCheckoutQuery };
        }
        return null;
    }
    async answerPreCheckoutQuery(preCheckoutQueryId, ok, params) {
        this.#c.storage.assertBot("answerPreCheckoutQuery");
        if (!ok && !params?.error) {
            throw new InputError("error is required when ok is false");
        }
        const queryId = BigInt(preCheckoutQueryId);
        if (!queryId) {
            throw new InputError("Invalid pre-checkout query ID");
        }
        await this.#c.invoke({ _: "messages.setBotPrecheckoutResults", query_id: queryId, error: params?.error, success: ok ? true : undefined });
    }
    async refundStarPayment(userId, telegramPaymentChargeId) {
        this.#c.storage.assertBot("refundStarPayment");
        await this.#c.invoke({ _: "payments.refundStarsCharge", user_id: await this.#c.getInputUser(userId), charge_id: telegramPaymentChargeId });
    }
}
