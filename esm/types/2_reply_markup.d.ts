import { Api } from "../2_tl.js";
import type { UsernameResolver } from "./_getters.js";
import { type InlineKeyboardButton } from "./1_inline_keyboard_button.js";
import { type KeyboardButton } from "./1_keyboard_button.js";
export interface ReplyMarkupInlineKeyboard {
    inlineKeyboard: InlineKeyboardButton[][];
}
export interface ReplyMarkupKeyboard {
    keyboard: KeyboardButton[][];
    isPersistent?: boolean;
    resizeKeyboard?: boolean;
    oneTimeKeyboard?: boolean;
    inputFieldPlaceholder?: string;
    selective?: boolean;
}
export interface ReplyMarkupRemoveKeyboard {
    removeKeyboard: true;
    selective?: boolean;
}
export interface ReplyMarkupForceReply {
    forceReply: true;
    inputFieldPlaceholder?: string;
    selective?: boolean;
}
export type ReplyMarkup = ReplyMarkupInlineKeyboard | ReplyMarkupKeyboard | ReplyMarkupRemoveKeyboard | ReplyMarkupForceReply;
export declare function constructReplyMarkup(replyMarkup: Api.ReplyMarkup): ReplyMarkup;
export declare function replyMarkupToTlObject(replyMarkup: ReplyMarkup, usernameResolver: UsernameResolver): Promise<Api.ReplyMarkup>;
//# sourceMappingURL=2_reply_markup.d.ts.map