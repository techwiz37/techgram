import { cleanObject, decodeText } from "../1_utilities.js";
import { constructOrderInfo } from "./1_order_info.js";
export function constructSuccessfulPayment(action) {
    return cleanObject({
        currency: action.currency,
        totalAmount: Number(action.total_amount),
        invoicePayload: decodeText(action.payload),
        telegramPaymentChargeId: action.charge.id,
        providerPaymentChargeId: action.charge.provider_charge_id,
        shippingOptionId: action.shipping_option_id,
        orderInfo: action.info ? constructOrderInfo(action.info) : undefined,
    });
}
