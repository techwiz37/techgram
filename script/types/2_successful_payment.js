"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructSuccessfulPayment = constructSuccessfulPayment;
const _1_utilities_js_1 = require("../1_utilities.js");
const _1_order_info_js_1 = require("./1_order_info.js");
function constructSuccessfulPayment(action) {
    return (0, _1_utilities_js_1.cleanObject)({
        currency: action.currency,
        totalAmount: Number(action.total_amount),
        invoicePayload: (0, _1_utilities_js_1.decodeText)(action.payload),
        telegramPaymentChargeId: action.charge.id,
        providerPaymentChargeId: action.charge.provider_charge_id,
        shippingOptionId: action.shipping_option_id,
        orderInfo: action.info ? (0, _1_order_info_js_1.constructOrderInfo)(action.info) : undefined,
    });
}
