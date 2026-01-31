import type { Api } from "../2_tl.js";
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
export declare function constructChatAdministratorRights(rights_: Api.ChatAdminRights): ChatAdministratorRights;
export declare function chatAdministratorRightsToTlObject<T extends Partial<ChatAdministratorRights>>(rights: T): Required<T> extends ChatAdministratorRights ? Api.chatAdminRights : unknown;
//# sourceMappingURL=0_chat_administrator_rights.d.ts.map