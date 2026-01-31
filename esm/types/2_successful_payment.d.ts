import type { Api } from "../2_tl.js";
import { type OrderInfo } from "./1_order_info.js";
export interface SuccessfulPayment {
    currency: string;
    totalAmount: number;
    invoicePayload: string;
    telegramPaymentChargeId: string;
    providerPaymentChargeId: string;
    shippingOptionId?: string;
    orderInfo?: OrderInfo;
}
export declare function constructSuccessfulPayment(action: Api.messageActionPaymentSentMe): SuccessfulPayment;
//# sourceMappingURL=2_successful_payment.d.ts.map