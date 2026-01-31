import { Api } from "../2_tl.js";
import { type ChatPhoto } from "./0_chat_photo.js";
import type { RestrictionReason } from "./0_restriction_reason.js";
import type { ChatPPrivate } from "./1_chat_p.js";
export interface User {
    id: number;
    color: number;
    isBot: boolean;
    firstName: string;
    lastName?: string;
    username?: string;
    also?: string[];
    photo?: ChatPhoto;
    languageCode?: string;
    isScam: boolean;
    isFake: boolean;
    isPremium: boolean;
    isVerified: boolean;
    isSupport: boolean;
    isRestricted: boolean;
    restrictionReason?: RestrictionReason[];
    addedToAttachmentMenu?: boolean;
    hasMainMiniApp?: boolean;
}
export declare function constructUser(user_: Api.user): User;
export declare function constructUser2(chatP: ChatPPrivate): User;
//# sourceMappingURL=2_user.d.ts.map