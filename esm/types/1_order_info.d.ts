import type { Api } from "../2_tl.js";
import { type ShippingAddress } from "./0_shipping_address.js";
export interface OrderInfo {
    name?: string;
    phoneNumber?: string;
    email?: string;
    shippingAddress?: ShippingAddress;
}
export declare function constructOrderInfo(info: Api.paymentRequestedInfo): OrderInfo;
//# sourceMappingURL=1_order_info.d.ts.map