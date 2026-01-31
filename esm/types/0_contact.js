import { cleanObject } from "../1_utilities.js";
export function constructContact(contact) {
    return cleanObject({
        phoneNumber: contact.phone_number,
        firstName: contact.first_name,
        lastName: contact.last_name || undefined,
        userId: Number(contact.user_id) || undefined,
        vcard: contact.vcard || undefined,
    });
}
