import { Api } from "../2_tl.js";
export interface ChatPhoto {
    smallFileId: string;
    smallFileUniqueId: string;
    bigFileId: string;
    bigFileUniqueId: string;
    hasVideo: boolean;
    isPersonal: boolean;
}
export declare function constructChatPhoto(photo: Api.userProfilePhoto | Api.chatPhoto, chatId: number, chatAccessHash: bigint): ChatPhoto;
//# sourceMappingURL=0_chat_photo.d.ts.map