"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructOrderInfo = constructOrderInfo;
const _1_utilities_js_1 = require("../1_utilities.js");
const _0_shipping_address_js_1 = require("./0_shipping_address.js");
function constructOrderInfo(info) {
    return (0, _1_utilities_js_1.cleanObject)({
        name: info.name,
        phoneNumber: info.phone,
        email: info.email,
        shippingAddress: info.shipping_address ? (0, _0_shipping_address_js_1.constructShippingAddress)(info.shipping_address) : undefined,
    });
}
