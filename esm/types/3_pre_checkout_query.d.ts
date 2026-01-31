import type { Api } from "../2_tl.js";
import type { PeerGetter } from "./1_chat_p.js";
import { type OrderInfo } from "./1_order_info.js";
import { type User } from "./2_user.js";
export interface PreCheckoutQuery {
    id: string;
    from: User;
    currency: string;
    totalAmount: number;
    invoicePayload: string;
    shippingOptionId?: string;
    orderInfo?: OrderInfo;
}
export declare function constructPreCheckoutQuery(query: Api.updateBotPrecheckoutQuery, getPeer: PeerGetter): PreCheckoutQuery;
//# sourceMappingURL=3_pre_checkout_query.d.ts.map