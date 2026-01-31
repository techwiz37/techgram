import { type ID } from "../3_types.js";
import type { GetClaimedGiftsParams, SendGiftParams } from "./0_params.js";
import type { C as C_ } from "./1_types.js";
import type { MessageManager } from "./3_message_manager.js";
interface C extends C_ {
    messageManager: MessageManager;
}
export declare class GiftManager {
    #private;
    constructor(c: C);
    getGifts(): Promise<import("../3_types.js").Gift[]>;
    getClaimedGifts(chatId: ID, params?: GetClaimedGiftsParams): Promise<import("../3_types.js").ClaimedGifts>;
    sendGift(chatId: ID, giftId: string, params?: SendGiftParams): Promise<void>;
    sellGift(userId: ID, messageId: number): Promise<void>;
    getGift(slug: string): Promise<import("../3_types.js").Gift>;
}
export {};
//# sourceMappingURL=4_gift_manager.d.ts.map