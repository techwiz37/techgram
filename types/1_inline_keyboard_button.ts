import { unreachable } from "../0_deps.ts";
import { InputError } from "../0_errors.ts";
import { cleanObject, decodeText, encodeText } from "../1_utilities.ts";
import { Api } from "../2_tl.ts";
import type { UsernameResolver } from "./_getters.ts";
import type { LoginUrl } from "./0_login_url.ts";
import { constructMiniAppButtonInfo, type MiniAppButtonInfo } from "./0_mini_app_button_info.ts";

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

export type InlineKeyboardButton =
  | InlineKeyboardButtonURL
  | InlineKeyboardButtonCallback
  | InlineKeyboardButtonMiniApp
  | InlineKeyboardButtonLogin
  | InlineKeyboardButtonSwitchInline
  | InlineKeyboardButtonSwitchInlineCurrent
  | InlineKeyboardButtonSwitchInlineChosen
  | InlineKeyboardButtonGame
  | InlineKeyboardButtonPay
  | InlineKeyboardButtonCopy;

export function constructInlineKeyboardButton(button_: Api.KeyboardButton): InlineKeyboardButton {
  if (Api.is("keyboardButtonUrl", button_)) {
    return { text: button_.text, url: button_.url };
  } else if (Api.is("keyboardButtonCallback", button_)) {
    return { text: button_.text, callbackData: decodeText(button_.data) };
  } else if (Api.is("keyboardButtonWebView", button_) || Api.is("keyboardButtonSimpleWebView", button_)) {
    return { text: button_.text, miniApp: constructMiniAppButtonInfo(button_.url) };
  } else if (Api.is("keyboardButtonUrlAuth", button_)) {
    return { text: button_.text, loginUrl: { url: button_.url, forwardText: button_.fwd_text } };
  } else if (Api.is("keyboardButtonSwitchInline", button_)) {
    if (button_.same_peer) {
      return { text: button_.text, switchInlineQueryCurrentChat: button_.query };
    } else if (button_.peer_types && button_.peer_types.length) {
      const allowUsers = button_.peer_types.some((v) => v._ === "inlineQueryPeerTypeBotPM") || undefined;
      const allowBots = button_.peer_types.some((v) => v._ === "inlineQueryPeerTypeSameBotPM" || v._ === "inlineQueryPeerTypeBotPM") || undefined;
      const allowGroups = button_.peer_types.some((v) => v._ === "inlineQueryPeerTypeChat" || v._ === "inlineQueryPeerTypeMegagroup") || undefined;
      const allowChannels = button_.peer_types.some((v) => v._ === "inlineQueryPeerTypeBroadcast") || undefined;
      return cleanObject({ text: button_.text, switchInlineQueryChosenChats: { query: button_.query, allowUsers, allowBots, allowGroups, allowChannels } });
    } else {
      return { text: button_.text, switchInlineQuery: button_.query };
    }
  } else if (Api.is("keyboardButtonBuy", button_)) {
    return { text: button_.text, pay: true };
  } else if (Api.is("keyboardButtonGame", button_)) {
    return { text: button_.text, callbackGame: {} };
  } else if (Api.is("keyboardButtonCopy", button_)) {
    return { text: button_.text, copy: button_.copy_text };
  } else if (Api.is("keyboardButtonRequestPeer", button_)) {
    unreachable();
  } else {
    unreachable();
  }
}

export async function inlineKeyboardButtonToTlObject(button: InlineKeyboardButton, usernameResolver: UsernameResolver): Promise<Api.KeyboardButton> {
  if ("url" in button) {
    return { _: "keyboardButtonUrl", text: button.text, url: button.url };
  } else if ("callbackData" in button) {
    return { _: "keyboardButtonCallback", text: button.text, data: encodeText(button.callbackData) };
  } else if ("miniApp" in button) {
    return { _: "keyboardButtonWebView", text: button.text, url: button.miniApp.url };
  } else if ("loginUrl" in button) {
    return { _: "inputKeyboardButtonUrlAuth", text: button.text, url: button.loginUrl.url, fwd_text: button.loginUrl.forwardText, bot: button.loginUrl.botUsername ? await usernameResolver(button.loginUrl.botUsername) : { _: "inputUserSelf" }, request_write_access: button.loginUrl.requestWriteAccess || undefined };
  } else if ("switchInlineQuery" in button) {
    return { _: "keyboardButtonSwitchInline", text: button.text, query: button.switchInlineQuery };
  } else if ("switchInlineQueryCurrentChat" in button) {
    return { _: "keyboardButtonSwitchInline", text: button.text, query: button.switchInlineQueryCurrentChat, same_peer: true };
  } else if ("switchInlineQueryChosenChats" in button) {
    const peerTypes = new Array<Api.InlineQueryPeerType>();
    const { allowUsers, allowBots, allowGroups, allowChannels } = button.switchInlineQueryChosenChats;
    if (!allowUsers && !allowBots && !allowGroups && !allowChannels) {
      throw new InputError("switchInlineQueryChosenChats: At least one chat type must be allowed.");
    }
    if (allowUsers) {
      peerTypes.push({ _: "inlineQueryPeerTypeBotPM" });
    }
    if (allowBots) {
      peerTypes.push({ _: "inlineQueryPeerTypeSameBotPM" }, { _: "inlineQueryPeerTypeBotPM" });
    }
    if (allowGroups) {
      peerTypes.push({ _: "inlineQueryPeerTypeChat" }, { _: "inlineQueryPeerTypeMegagroup" });
    }
    if (allowChannels) {
      peerTypes.push({ _: "inlineQueryPeerTypeBroadcast" });
    }
    return { _: "keyboardButtonSwitchInline", text: button.text, query: button.switchInlineQueryChosenChats.query, peer_types: peerTypes };
  } else if ("pay" in button) {
    return { _: "keyboardButtonBuy", text: button.text };
  } else if ("copy" in button) {
    return { _: "keyboardButtonCopy", text: button.text, copy_text: button.copy };
  } else {
    unreachable();
  }
}
