import { Api } from "../2_tl.js";
import type { UsernameResolver } from "./_getters.js";
import type { LoginUrl } from "./0_login_url.js";
import { type MiniAppButtonInfo } from "./0_mini_app_button_info.js";
export interface _InlineKeyboardButtonBase {
    text: string;
}
export interface InlineKeyboardButtonURL extends _InlineKeyboardButtonBase {
    url: string;
}
export interface InlineKeyboardButtonCallback extends _InlineKeyboardButtonBase {
    callbackData: string;
}
export interface InlineKeyboardButtonMiniApp extends _InlineKeyboardButtonBase {
    miniApp: MiniAppButtonInfo;
}
export interface InlineKeyboardButtonLogin extends _InlineKeyboardButtonBase {
    loginUrl: LoginUrl;
}
export interface InlineKeyboardButtonSwitchInline extends _InlineKeyboardButtonBase {
    switchInlineQuery: string;
}
export interface InlineKeyboardButtonSwitchInlineCurrent extends _InlineKeyboardButtonBase {
    switchInlineQueryCurrentChat: string;
}
export interface InlineKeyboardButtonSwitchInlineChosen extends _InlineKeyboardButtonBase {
    switchInlineQueryChosenChats: {
        query: string;
        allowUsers?: boolean;
        allowBots?: boolean;
        allowGroups?: boolean;
        allowChannels?: boolean;
    };
}
export interface InlineKeyboardButtonGame extends _InlineKeyboardButtonBase {
    callbackGame: Record<never, never>;
}
export interface InlineKeyboardButtonPay extends _InlineKeyboardButtonBase {
    pay: boolean;
}
export interface InlineKeyboardButtonCopy extends _InlineKeyboardButtonBase {
    copy: string;
}
export type InlineKeyboardButton = InlineKeyboardButtonURL | InlineKeyboardButtonCallback | InlineKeyboardButtonMiniApp | InlineKeyboardButtonLogin | InlineKeyboardButtonSwitchInline | InlineKeyboardButtonSwitchInlineCurrent | InlineKeyboardButtonSwitchInlineChosen | InlineKeyboardButtonGame | InlineKeyboardButtonPay | InlineKeyboardButtonCopy;
export declare function constructInlineKeyboardButton(button_: Api.KeyboardButton): InlineKeyboardButton;
export declare function inlineKeyboardButtonToTlObject(button: InlineKeyboardButton, usernameResolver: UsernameResolver): Promise<Api.KeyboardButton>;
//# sourceMappingURL=1_inline_keyboard_button.d.ts.map