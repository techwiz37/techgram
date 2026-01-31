import { Api } from "../2_tl.js";
import type { PeerGetter } from "./1_chat_p.js";
export type MessageEntityType = "mention" | "hashtag" | "botCommand" | "url" | "email" | "bold" | "italic" | "code" | "pre" | "textLink" | "textMention" | "cashtag" | "phoneNumber" | "underline" | "strikethrough" | "blockquote" | "bankCard" | "spoiler" | "customEmoji";
export interface _MessageEntityBase {
    type: MessageEntityType;
    offset: number;
    length: number;
}
export interface MessageEntityMention extends _MessageEntityBase {
    type: "mention";
}
export interface MessageEntityHashtag extends _MessageEntityBase {
    type: "hashtag";
}
export interface MessageEntityBotCommand extends _MessageEntityBase {
    type: "botCommand";
}
export interface MessageEntityURL extends _MessageEntityBase {
    type: "url";
}
export interface MessageEntityEmailAddress extends _MessageEntityBase {
    type: "email";
}
export interface MessageEntityBold extends _MessageEntityBase {
    type: "bold";
}
export interface MessageEntityItalic extends _MessageEntityBase {
    type: "italic";
}
export interface MessageEntityPre extends _MessageEntityBase {
    type: "pre";
    language: string;
}
export interface MessageEntityCode extends _MessageEntityBase {
    type: "code";
}
export interface MessageEntityTextLink extends _MessageEntityBase {
    type: "textLink";
    url: string;
}
export interface MessageEntityTextMention extends _MessageEntityBase {
    type: "textMention";
    userId: number;
}
export interface MessageEntityCashtag extends _MessageEntityBase {
    type: "cashtag";
}
export interface MessageEntityPhoneNumber extends _MessageEntityBase {
    type: "phoneNumber";
}
export interface MessageEntityUnderline extends _MessageEntityBase {
    type: "underline";
}
export interface MessageEntityStrikethrough extends _MessageEntityBase {
    type: "strikethrough";
}
export interface MessageEntityBlockquote extends _MessageEntityBase {
    type: "blockquote";
    collapsible?: true;
}
export interface MessageEntityBankCard extends _MessageEntityBase {
    type: "bankCard";
}
export interface MessageEntitySpoiler extends _MessageEntityBase {
    type: "spoiler";
}
export interface MessageEntityCustomEmoji extends _MessageEntityBase {
    type: "customEmoji";
    customEmojiId: string;
}
export type MessageEntity = MessageEntityMention | MessageEntityHashtag | MessageEntityBotCommand | MessageEntityURL | MessageEntityEmailAddress | MessageEntityBold | MessageEntityItalic | MessageEntityCode | MessageEntityPre | MessageEntityTextLink | MessageEntityTextMention | MessageEntityCashtag | MessageEntityPhoneNumber | MessageEntityUnderline | MessageEntityStrikethrough | MessageEntityBlockquote | MessageEntityBankCard | MessageEntitySpoiler | MessageEntityCustomEmoji;
export declare function constructMessageEntity(obj: Api.MessageEntity): MessageEntity | null;
export declare function messageEntityToTlObject(entity: MessageEntity, getPeer: PeerGetter): Api.MessageEntity;
export declare function sortMessageEntities(entities: MessageEntity[]): MessageEntity[];
//# sourceMappingURL=2_message_entity.d.ts.map