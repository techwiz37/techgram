import { cleanObject, decodeText } from "../1_utilities.js";
export function constructRefundedPayment(action) {
    return cleanObject({
        currency: action.currency,
        totalAmount: Number(action.total_amount),
        invoicePayload: action.payload ? decodeText(action.payload) : "",
        telegramPaymentChargeId: action.charge.id,
        providerPaymentChargeId: action.charge.provider_charge_id,
    });
}
