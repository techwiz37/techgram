import type { ParseMode } from "./0_parse_mode.js";
import type { PriceTag } from "./0_price_tag.js";
import type { MessageEntity } from "./2_message_entity.js";
import type { LinkPreview } from "./5_link_preview.js";
export interface MessageContentContact {
    type: "contact";
    phoneNumber: string;
    firstName: string;
    lastName?: string;
    vcard?: string;
}
export interface MessageContentLocation {
    type: "text";
    latitude: number;
    longitude: number;
    horizontalAccuracy?: number;
    livePeriod?: number;
    heading?: number;
    proximityAlertRadius?: number;
}
export interface MessageContentVenue {
    type: "venue";
    latitude: number;
    longitude: number;
    title: string;
    address: string;
    foursquareId?: string;
    foursquareType?: string;
    googlePlaceId?: string;
    googlePlaceType?: string;
}
export interface MessageContentText {
    type: "text";
    text: string;
    parseMode?: ParseMode;
    entities?: MessageEntity[];
    linkPreview?: LinkPreview;
}
export interface MessageContentInvoice {
    type: "invoice";
    title: string;
    description: string;
    payload: string;
    providerToken: string;
    currency: string;
    prices: PriceTag[];
    maxTipAmount?: number;
    suggestedTipAmounts?: number[];
    providerData?: string;
    photoUrl?: string;
    photoSize?: number;
    photoWidth?: number;
    photoHeight?: number;
    needName?: boolean;
    needPhoneNumber?: boolean;
    needEmail?: boolean;
    needShippingAAddress?: boolean;
    sendPhoneNumberToPorvider?: boolean;
    sendEmailToProvider?: boolean;
    isFlexible?: boolean;
}
export type MessageContent = MessageContentText | MessageContentLocation | MessageContentVenue | MessageContentContact | MessageContentInvoice;
//# sourceMappingURL=6_message_content.d.ts.map