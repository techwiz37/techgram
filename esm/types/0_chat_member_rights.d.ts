import type { Api } from "../2_tl.js";
export interface ChatMemberRights {
    canSendMessages?: boolean;
    canSendAudio?: boolean;
    canSendDocuments?: boolean;
    canSendPhotos?: boolean;
    canSendVideos?: boolean;
    canSendVideoNotes?: boolean;
    canSendVoice?: boolean;
    canSendPolls?: boolean;
    canSendStickers?: boolean;
    canSendAnimations?: boolean;
    canSendGames?: boolean;
    canSendInlineBotResults?: boolean;
    canAddWebPagePreviews?: boolean;
    canChangeInfo?: boolean;
    canInviteUsers?: boolean;
    canPinMessages?: boolean;
    canManageTopics?: boolean;
}
export declare function constructChatMemberRights(rights: Api.chatBannedRights): ChatMemberRights;
export declare function chatMemberRightsToTlObject(rights?: ChatMemberRights, until?: number): Api.chatBannedRights;
//# sourceMappingURL=0_chat_member_rights.d.ts.map