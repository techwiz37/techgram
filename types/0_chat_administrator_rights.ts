import type { Api } from "../2_tl.ts";

export interface ChatAdministratorRights {

  isAnonymous: boolean;

  canManageChat: boolean;

  canDeleteMessages: boolean;

  canManageVideoChats: boolean;

  canRestrictMembers: boolean;

  canPromoteMembers: boolean;

  canChangeInfo: boolean;

  canInviteUsers: boolean;

  canPostMessages: boolean;

  canEditMessages: boolean;

  canPinMessages: boolean;

  canManageTopics: boolean;

  canPostStories: boolean;

  canEditStories: boolean;

  canDeleteStories: boolean;

  canManageDirectMessages: boolean;
}

export function constructChatAdministratorRights(rights_: Api.ChatAdminRights): ChatAdministratorRights {
  return {
    isAnonymous: rights_.anonymous || false,
    canManageChat: rights_.other || false,
    canDeleteMessages: rights_.delete_messages || false,
    canManageVideoChats: rights_.manage_call || false,
    canRestrictMembers: rights_.ban_users || false,
    canPromoteMembers: rights_.add_admins || false,
    canChangeInfo: rights_.change_info || false,
    canInviteUsers: rights_.invite_users || false,
    canPostMessages: rights_.post_messages || false,
    canEditMessages: rights_.edit_messages || false,
    canPinMessages: rights_.pin_messages || false,
    canManageTopics: rights_.manage_topics || false,
    canPostStories: rights_.post_stories || false,
    canEditStories: rights_.edit_stories || false,
    canDeleteStories: rights_.delete_stories || false,
    canManageDirectMessages: rights_.manage_direct_messages || false,
  };
}

export function chatAdministratorRightsToTlObject<T extends Partial<ChatAdministratorRights>>(rights: T): Required<T> extends ChatAdministratorRights ? Api.chatAdminRights : unknown {
  return {
    _: "chatAdminRights",
    anonymous: rights.isAnonymous || undefined,
    other: rights.canManageChat || undefined,
    delete_messages: rights.canDeleteMessages || undefined,
    manage_call: rights.canManageVideoChats || undefined,
    ban_users: rights.canRestrictMembers || undefined,
    add_admins: rights.canPromoteMembers || undefined,
    change_info: rights.canChangeInfo || undefined,
    invite_users: rights.canInviteUsers || undefined,
    post_messages: rights.canPostMessages || undefined,
    edit_messages: rights.canEditMessages || undefined,
    pin_messages: rights.canPinMessages || undefined,
    manage_topics: rights.canManageTopics || undefined,
    post_stories: rights.canPostStories || undefined,
    edit_stories: rights.canEditStories || undefined,
    delete_stories: rights.canDeleteStories || undefined,
    manage_direct_messages: rights.canManageDirectMessages || undefined,
  } as Required<T> extends ChatAdministratorRights ? Api.chatAdminRights : never;
}
