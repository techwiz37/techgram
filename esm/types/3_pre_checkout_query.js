import { unreachable } from "../0_deps.js";
import { cleanObject, decodeText } from "../1_utilities.js";
import { constructOrderInfo } from "./1_order_info.js";
import { constructUser2 } from "./2_user.js";
export function constructPreCheckoutQuery(query, getPeer) {
    const peer = getPeer({ _: "peerUser", user_id: query.user_id });
    if (!peer) {
        unreachable();
    }
    const from = constructUser2(peer[0]);
    return cleanObject({
        id: String(query.query_id),
        from,
        currency: query.currency,
        totalAmount: Number(query.total_amount),
        invoicePayload: decodeText(query.payload),
        shippingOptionId: query.shipping_option_id,
        orderInfo: query.info ? constructOrderInfo(query.info) : undefined,
    });
}
