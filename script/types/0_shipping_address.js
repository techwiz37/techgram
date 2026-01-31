"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructShippingAddress = constructShippingAddress;
function constructShippingAddress(shippingAddress) {
    return {
        countryCode: shippingAddress.country_iso2,
        state: shippingAddress.state,
        city: shippingAddress.city,
        streetLine1: shippingAddress.street_line1,
        streetLine2: shippingAddress.street_line2,
        postCode: shippingAddress.post_code,
    };
}
