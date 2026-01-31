import { cleanObject } from "../1_utilities.ts";
import type { Api } from "../2_tl.ts";

export interface Contact {

  phoneNumber: string;

  firstName: string;

  lastName?: string;

  userId?: number;

  vcard?: string;
}

export function constructContact(contact: Api.messageMediaContact): Contact {
  return cleanObject({
    phoneNumber: contact.phone_number,
    firstName: contact.first_name,
    lastName: contact.last_name || undefined,
    userId: Number(contact.user_id) || undefined,
    vcard: contact.vcard || undefined,
  });
}
