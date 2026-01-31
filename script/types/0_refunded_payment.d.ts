import type { Api } from "../2_tl.js";
export interface RefundedPayment {
    currency: string;
    totalAmount: number;
    invoicePayload: string;
    telegramPaymentChargeId: string;
    providerPaymentChargeId?: string;
}
export declare function constructRefundedPayment(action: Api.messageActionPaymentRefunded): RefundedPayment;
//# sourceMappingURL=0_refunded_payment.d.ts.map