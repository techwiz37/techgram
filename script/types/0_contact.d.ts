import type { Api } from "../2_tl.js";
export interface Contact {
    phoneNumber: string;
    firstName: string;
    lastName?: string;
    userId?: number;
    vcard?: string;
}
export declare function constructContact(contact: Api.messageMediaContact): Contact;
//# sourceMappingURL=0_contact.d.ts.map