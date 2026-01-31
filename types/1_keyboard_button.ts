import { unreachable } from "../0_deps.ts";
import { Api } from "../2_tl.ts";
import { type ChatAdministratorRights, chatAdministratorRightsToTlObject, constructChatAdministratorRights } from "./0_chat_administrator_rights.ts";
import type { KeyboardButtonPollType } from "./0_keyboard_button_poll_type.ts";
import type { MiniAppButtonInfo } from "./0_mini_app_button_info.ts";

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

export type KeyboardButton =
  | KeyboardButtonText
  | KeyboardButtonRequestUser
  | KeyboardButtonRequestChat
  | KeyboardButtonRequestContact
  | KeyboardButtonRequestLocation
  | KeyboardButtonRequestPoll
  | KeyboardButtonMiniApp;

export function constructKeyboardButton(button_: Api.KeyboardButton): KeyboardButton {
  if (Api.is("keyboardButton", button_)) {
    return { text: button_.text };
  } else if (Api.is("keyboardButtonRequestPeer", button_)) {
    if (Api.is("requestPeerTypeUser", button_.peer_type)) {
      return {
        text: button_.text,
        requestUser: {
          requestId: button_.button_id,
          userIsBot: button_.peer_type.bot || false,
          userIsPremium: button_.peer_type.premium || false,
        },
      };
    } else if (Api.is("requestPeerTypeChat", button_.peer_type)) {
      const button: KeyboardButtonRequestChat = {
        text: button_.text,
        requestChat: {
          requestId: button_.button_id,
          chatIsChannel: false, 
          chatIsForum: button_.peer_type.forum || false,
          chatHasUsername: button_.peer_type.has_username || false,
          chatIsCreated: button_.peer_type.creator || false,
          botIsMember: button_.peer_type.bot_participant || false,
        },
      };
      if (button_.peer_type.bot_admin_rights) {
        button.requestChat.botAdministratorRights = constructChatAdministratorRights(button_.peer_type.bot_admin_rights);
      }
      if (button_.peer_type.user_admin_rights) {
        button.requestChat.userAdministratorRights = constructChatAdministratorRights(button_.peer_type.user_admin_rights);
      }
      return button;
    } else if (Api.is("requestPeerTypeBroadcast", button_.peer_type)) {
      const button: KeyboardButtonRequestChat = {
        text: button_.text,
        requestChat: {
          requestId: button_.button_id,
          chatIsChannel: true, 
          chatIsCreated: button_.peer_type.creator || false,
          chatHasUsername: button_.peer_type.has_username || false,
        },
      };
      if (button_.peer_type.bot_admin_rights) {
        button.requestChat.botAdministratorRights = constructChatAdministratorRights(button_.peer_type.bot_admin_rights);
      }
      if (button_.peer_type.user_admin_rights) {
        button.requestChat.userAdministratorRights = constructChatAdministratorRights(button_.peer_type.user_admin_rights);
      }
      return button;
    } else {
      unreachable();
    }
  } else if (Api.is("keyboardButtonRequestPhone", button_)) {
    return { text: button_.text, requestContact: true };
  } else if (Api.is("keyboardButtonRequestGeoLocation", button_)) {
    return { text: button_.text, requestLocation: true };
  } else if (Api.is("keyboardButtonRequestPoll", button_)) {
    const button: KeyboardButtonRequestPoll = { text: button_.text, requestPoll: {} };

    if (button_.quiz) {
      button.requestPoll.type = "quiz";
    }

    return button;
  } else if (Api.is("keyboardButtonWebView", button_) || Api.is("keyboardButtonSimpleWebView", button_)) {
    return { text: button_.text, miniApp: { url: button_.url } };
  } else {
    unreachable();
  }
}

export function keyboardButtonToTlObject(button: KeyboardButton): Api.KeyboardButton {
  if ("requestUser" in button) {
    return { _: "keyboardButtonRequestPeer", text: button.text, button_id: button.requestUser.requestId, peer_type: ({ _: "requestPeerTypeUser", bot: button.requestUser.userIsBot, premium: button.requestUser.userIsPremium }), max_quantity: 1 };
  } else if ("requestChat" in button) {
    if (!button.requestChat.chatIsChannel) { 
      return { _: "keyboardButtonRequestPeer", text: button.text, button_id: button.requestChat.requestId, peer_type: ({ _: "requestPeerTypeChat", forum: button.requestChat.chatIsForum, has_username: button.requestChat.chatHasUsername, creator: button.requestChat.chatIsCreated || undefined, bot_participant: button.requestChat.botIsMember || undefined, bot_admin_rights: button.requestChat.botAdministratorRights ? chatAdministratorRightsToTlObject(button.requestChat.botAdministratorRights) : undefined, user_admin_rights: button.requestChat.userAdministratorRights ? chatAdministratorRightsToTlObject(button.requestChat.userAdministratorRights) : undefined }), max_quantity: 1 };
    } else {
      return { _: "keyboardButtonRequestPeer", text: button.text, button_id: button.requestChat.requestId, peer_type: ({ _: "requestPeerTypeBroadcast", has_username: button.requestChat.chatHasUsername, creator: button.requestChat.chatIsCreated || undefined, bot_admin_rights: button.requestChat.botAdministratorRights ? chatAdministratorRightsToTlObject(button.requestChat.botAdministratorRights) : undefined, user_admin_rights: button.requestChat.userAdministratorRights ? chatAdministratorRightsToTlObject(button.requestChat.userAdministratorRights) : undefined }), max_quantity: 1 };
    }
  } else if ("requestContact" in button) {
    return { _: "keyboardButtonRequestPhone", text: button.text };
  } else if ("requestLocation" in button) {
    return { _: "keyboardButtonRequestGeoLocation", text: button.text };
  } else if ("requestPoll" in button) {
    return { _: "keyboardButtonRequestPoll", text: button.text, quiz: button.requestPoll.type === "quiz" };
  } else if ("miniApp" in button) {
    return { _: "keyboardButtonWebView", text: button.text, url: button.miniApp.url };
  } else {
    return { _: "keyboardButton", text: button.text };
  }
}
