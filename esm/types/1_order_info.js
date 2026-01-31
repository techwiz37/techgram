import { cleanObject } from "../1_utilities.js";
import { constructShippingAddress } from "./0_shipping_address.js";
export function constructOrderInfo(info) {
    return cleanObject({
        name: info.name,
        phoneNumber: info.phone,
        email: info.email,
        shippingAddress: info.shipping_address ? constructShippingAddress(info.shipping_address) : undefined,
    });
}
