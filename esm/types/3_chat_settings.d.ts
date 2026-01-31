import { Api } from "../2_tl.js";
import { type User } from "./2_user.js";
export interface ChatSettings {
    report: boolean;
    addToContacts: boolean;
    block: boolean;
    shareContact: boolean;
    contactsException: boolean;
    reportLocation: boolean;
    unarchive: boolean;
    inviteMembers: boolean;
    channelJoinRequest: boolean;
    businessBotPaused: boolean;
    businessBotCanReply: boolean;
    distance?: number;
    joinRequestChatTitle?: string;
    joinRequestDate?: number;
    businessBot?: User;
    businessBotUrl?: string;
    messagePrice?: number;
    registrationMonth?: string;
    phoneCountry?: string;
    nameChangeDate?: number;
    photoChangeDate?: number;
}
export declare function constructChatSettings(settings_: Api.messages_peerSettings): ChatSettings;
//# sourceMappingURL=3_chat_settings.d.ts.map