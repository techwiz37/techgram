import { cleanObject, decodeText } from "../1_utilities.ts";
import type { Api } from "../2_tl.ts";

export interface RefundedPayment {

  currency: string;

  totalAmount: number;

  invoicePayload: string;

  telegramPaymentChargeId: string;

  providerPaymentChargeId?: string;
}

export function constructRefundedPayment(action: Api.messageActionPaymentRefunded): RefundedPayment {
  return cleanObject({
    currency: action.currency,
    totalAmount: Number(action.total_amount),
    invoicePayload: action.payload ? decodeText(action.payload) : "",
    telegramPaymentChargeId: action.charge.id,
    providerPaymentChargeId: action.charge.provider_charge_id,
  });
}
