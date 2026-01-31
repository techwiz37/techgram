import type { Api } from "../2_tl.js";
export interface ShippingAddress {
    countryCode: string;
    state: string;
    city: string;
    streetLine1: string;
    streetLine2: string;
    postCode: string;
}
export declare function constructShippingAddress(shippingAddress: Api.postAddress): ShippingAddress;
//# sourceMappingURL=0_shipping_address.d.ts.map