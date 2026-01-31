"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructRefundedPayment = constructRefundedPayment;
const _1_utilities_js_1 = require("../1_utilities.js");
function constructRefundedPayment(action) {
    return (0, _1_utilities_js_1.cleanObject)({
        currency: action.currency,
        totalAmount: Number(action.total_amount),
        invoicePayload: action.payload ? (0, _1_utilities_js_1.decodeText)(action.payload) : "",
        telegramPaymentChargeId: action.charge.id,
        providerPaymentChargeId: action.charge.provider_charge_id,
    });
}
