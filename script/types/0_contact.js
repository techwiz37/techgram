"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructContact = constructContact;
const _1_utilities_js_1 = require("../1_utilities.js");
function constructContact(contact) {
    return (0, _1_utilities_js_1.cleanObject)({
        phoneNumber: contact.phone_number,
        firstName: contact.first_name,
        lastName: contact.last_name || undefined,
        userId: Number(contact.user_id) || undefined,
        vcard: contact.vcard || undefined,
    });
}
