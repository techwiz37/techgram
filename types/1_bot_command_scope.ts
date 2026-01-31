import { unreachable } from "../0_deps.ts";
import { Api } from "../2_tl.ts";
import type { InputPeerGetter } from "./_getters.ts";
import type { ID } from "./0_id.ts";

export interface BotCommandScopeDefault {

  type: "default";
}

export interface BotCommandScopeAllPrivateChats {

  type: "allPrivateChats";
}

export interface BotCommandScopeAllGroupChats {

  type: "allGroupChats";
}

export interface BotCommandScopeAllChatAdministrators {

  type: "allChatAdministrators";
}

export interface BotCommandScopeChat {

  type: "chat";
  chatId: ID;
}

export interface BotCommandScopeChatAdministrators {

  type: "chatAdministrators";
  chatId: ID;
}

export interface BotCommandScopeChatMember {

  type: "chatMember";
  chatId: ID;
  userId: number;
}

export type BotCommandScope = BotCommandScopeDefault | BotCommandScopeAllPrivateChats | BotCommandScopeAllGroupChats | BotCommandScopeAllChatAdministrators | BotCommandScopeChat | BotCommandScopeChatAdministrators | BotCommandScopeChatMember;

export async function botCommandScopeToTlObject(scope: BotCommandScope, getInputPeer: InputPeerGetter): Promise<Api.BotCommandScope> {
  switch (scope.type) {
    case "default":
      return { _: "botCommandScopeDefault" };
    case "allPrivateChats":
      return { _: "botCommandScopeUsers" };
    case "allGroupChats":
      return { _: "botCommandScopeChats" };
    case "allChatAdministrators":
      return { _: "botCommandScopeChatAdmins" };
    case "chat":
      return { _: "botCommandScopePeer", peer: await getInputPeer(scope.chatId) };
    case "chatAdministrators":
      return { _: "botCommandScopePeerAdmins", peer: await getInputPeer(scope.chatId) };
    case "chatMember": {
      const user = await getInputPeer(scope.userId);
      if (!Api.is("inputPeerUser", user)) {
        unreachable();
      }
      return { _: "botCommandScopePeerUser", peer: await getInputPeer(scope.chatId), user_id: ({ _: "inputUser", user_id: user.user_id, access_hash: user.access_hash }) };
    }
    default:
      unreachable();
  }
}
