import { Api } from "../2_tl.js";
import { type ChatAdministratorRights } from "./0_chat_administrator_rights.js";
import type { KeyboardButtonPollType } from "./0_keyboard_button_poll_type.js";
import type { MiniAppButtonInfo } from "./0_mini_app_button_info.js";
export interface KeyboardButtonText {
    text: string;
}
export interface KeyboardButtonRequestUser extends KeyboardButtonText {
    requestUser: {
        requestId: number;
        userIsBot?: boolean;
        userIsPremium?: boolean;
    };
}
export interface KeyboardButtonRequestChat extends KeyboardButtonText {
    requestChat: {
        requestId: number;
        chatIsChannel: boolean;
        chatIsForum?: boolean;
        chatHasUsername?: boolean;
        chatIsCreated?: boolean;
        userAdministratorRights?: ChatAdministratorRights;
        botAdministratorRights?: ChatAdministratorRights;
        botIsMember?: boolean;
    };
}
export interface KeyboardButtonRequestContact extends KeyboardButtonText {
    requestContact: true;
}
export interface KeyboardButtonRequestLocation extends KeyboardButtonText {
    requestLocation: true;
}
export interface KeyboardButtonRequestPoll extends KeyboardButtonText {
    requestPoll: KeyboardButtonPollType;
}
export interface KeyboardButtonMiniApp extends KeyboardButtonText {
    miniApp: MiniAppButtonInfo;
}
export type KeyboardButton = KeyboardButtonText | KeyboardButtonRequestUser | KeyboardButtonRequestChat | KeyboardButtonRequestContact | KeyboardButtonRequestLocation | KeyboardButtonRequestPoll | KeyboardButtonMiniApp;
export declare function constructKeyboardButton(button_: Api.KeyboardButton): KeyboardButton;
export declare function keyboardButtonToTlObject(button: KeyboardButton): Api.KeyboardButton;
//# sourceMappingURL=1_keyboard_button.d.ts.map