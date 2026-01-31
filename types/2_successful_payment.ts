import { cleanObject, decodeText } from "../1_utilities.ts";
import type { Api } from "../2_tl.ts";
import { constructOrderInfo, type OrderInfo } from "./1_order_info.ts";

export interface SuccessfulPayment {
  currency: string;
  totalAmount: number;
  invoicePayload: string;
  telegramPaymentChargeId: string;
  providerPaymentChargeId: string;
  shippingOptionId?: string;
  orderInfo?: OrderInfo;
}

export function constructSuccessfulPayment(action: Api.messageActionPaymentSentMe): SuccessfulPayment {
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
