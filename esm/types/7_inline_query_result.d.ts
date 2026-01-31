import { Api } from "../2_tl.js";
import type { UsernameResolver } from "./_getters.js";
import type { ParseMode } from "./0_parse_mode.js";
import { type Thumbnail } from "./0_thumbnail.js";
import { type MessageEntity } from "./2_message_entity.js";
import { type ReplyMarkupInlineKeyboard } from "./2_reply_markup.js";
import type { MessageContent } from "./6_message_content.js";
export type InlineQueryResultType = "article" | "audio" | "document" | "gif" | "mpeg4Gif" | "photo" | "sticker" | "video" | "voice" | "game" | "location" | "venue";
export interface _InlineQueryResultBase {
    type: InlineQueryResultType;
    id: string;
}
export interface _InlineQueryResultCaptionCommon {
    caption?: string;
    parseMode?: ParseMode;
    captionEntities?: MessageEntity[];
}
export interface _InlineQueryResultMessageContentReplyMarkupCommon {
    messageContent?: MessageContent;
    replyMarkup?: ReplyMarkupInlineKeyboard;
}
export interface _InlineQueryResultThumbnailCommon {
    thumbnailUrl?: string;
    thumbnailWidth?: string;
    thumbnailHeight?: string;
}
export interface InlineQueryResultArticle extends _InlineQueryResultBase, _InlineQueryResultThumbnailCommon {
    type: "article";
    title: string;
    messageContent: MessageContent;
    description?: string;
    replyMarkup?: ReplyMarkupInlineKeyboard;
    url?: string;
    hideUrl?: boolean;
}
export interface InlineQueryResultAudio extends _InlineQueryResultBase, _InlineQueryResultCaptionCommon, _InlineQueryResultMessageContentReplyMarkupCommon {
    type: "audio";
    title: string;
    url: string;
    performer?: string;
    audioDuration?: number;
}
export interface InlineQueryResultCachedAudio extends _InlineQueryResultBase, _InlineQueryResultCaptionCommon, _InlineQueryResultMessageContentReplyMarkupCommon {
    type: "audio";
    fileId: string;
}
export interface InlineQueryResultCachedDocument extends _InlineQueryResultBase, _InlineQueryResultCaptionCommon, _InlineQueryResultMessageContentReplyMarkupCommon {
    type: "document";
    fileId: string;
    description?: string;
}
export interface InlineQueryResultCachedGif extends _InlineQueryResultBase, _InlineQueryResultCaptionCommon, _InlineQueryResultMessageContentReplyMarkupCommon {
    type: "gif";
    fileId: string;
    title?: string;
}
export interface InlineQueryResultCachedMpeg4Gif extends _InlineQueryResultBase, _InlineQueryResultCaptionCommon, _InlineQueryResultMessageContentReplyMarkupCommon {
    type: "mpeg4Gif";
    fileId: string;
    title?: string;
}
export interface InlineQueryResultCachedPhoto extends _InlineQueryResultBase, _InlineQueryResultCaptionCommon, _InlineQueryResultMessageContentReplyMarkupCommon {
    type: "photo";
    fileId: string;
    thumbnails?: Thumbnail[];
    title?: string;
    description?: string;
}
export interface InlineQueryResultCachedSticker extends _InlineQueryResultBase, _InlineQueryResultMessageContentReplyMarkupCommon {
    type: "sticker";
    fileId: string;
}
export interface InlineQueryResultCachedVideo extends _InlineQueryResultBase, _InlineQueryResultCaptionCommon, _InlineQueryResultMessageContentReplyMarkupCommon {
    type: "video";
    title: string;
    fileId: string;
    description?: string;
}
export interface InlineQueryResultCachedVoice extends _InlineQueryResultBase, _InlineQueryResultCaptionCommon, _InlineQueryResultMessageContentReplyMarkupCommon {
    type: "voice";
    title: string;
    fileId: string;
}
export interface InlineQueryResultContact extends _InlineQueryResultBase, _InlineQueryResultCaptionCommon, _InlineQueryResultMessageContentReplyMarkupCommon, _InlineQueryResultThumbnailCommon {
    type: "game";
    phoneNumber: string;
    firstName: string;
    lastName?: string;
    vcard?: string;
}
export interface InlineQueryResultDocument extends _InlineQueryResultBase, _InlineQueryResultCaptionCommon, _InlineQueryResultMessageContentReplyMarkupCommon, _InlineQueryResultThumbnailCommon {
    type: "document";
    title: string;
    url: string;
}
export interface InlineQueryResultGame extends _InlineQueryResultBase {
    type: "game";
    gameShortName: string;
    replyMarkup?: ReplyMarkupInlineKeyboard;
}
export interface InlineQueryResultGif extends _InlineQueryResultBase, _InlineQueryResultCaptionCommon, _InlineQueryResultMessageContentReplyMarkupCommon {
    type: "gif";
    title?: string;
    url: string;
    width?: number;
    height?: number;
    duration?: number;
    thumbnailUrl?: string;
    thumbnailMimeType?: string;
}
export interface InlineQueryResultLocation extends _InlineQueryResultBase, _InlineQueryResultMessageContentReplyMarkupCommon, _InlineQueryResultThumbnailCommon {
    type: "location";
    title: string;
    latitude: number;
    longitude: number;
    horizontalAccuracy?: number;
    livePeriod?: number;
    heading?: number;
    proximityAlertRadius?: number;
}
export interface InlineQueryResultMpeg4Gif extends _InlineQueryResultBase, _InlineQueryResultCaptionCommon, _InlineQueryResultMessageContentReplyMarkupCommon {
    type: "mpeg4Gif";
    url: string;
    title?: string;
    width?: number;
    height?: number;
    duration?: number;
    thumbnailUrl?: string;
    thumbnailMimeType?: string;
}
export interface InlineQueryResultPhoto extends _InlineQueryResultBase, _InlineQueryResultCaptionCommon, _InlineQueryResultMessageContentReplyMarkupCommon {
    type: "photo";
    url: string;
    thumbnailUrl: string;
    title?: string;
    description?: string;
    width?: number;
    height?: number;
}
export interface InlineQueryResultVenue extends _InlineQueryResultBase, _InlineQueryResultMessageContentReplyMarkupCommon, _InlineQueryResultThumbnailCommon {
    type: "venue";
    title: string;
    latitude: number;
    longitude: number;
    address: string;
    foursquareId?: string;
    foursquareType?: string;
}
export interface InlineQueryResultVideo extends _InlineQueryResultBase, _InlineQueryResultCaptionCommon, _InlineQueryResultMessageContentReplyMarkupCommon {
    type: "video";
    title: string;
    description?: string;
    url: string;
    mimeType: string;
    thumbnailUrl: string;
    width?: number;
    height?: number;
    videoDuration?: number;
}
export interface InlineQueryResultVoice extends _InlineQueryResultBase, _InlineQueryResultCaptionCommon, _InlineQueryResultMessageContentReplyMarkupCommon {
    type: "voice";
    title: string;
    url: string;
    voiceDuration?: number;
}
export type InlineQueryResult = InlineQueryResultCachedAudio | InlineQueryResultCachedDocument | InlineQueryResultCachedGif | InlineQueryResultCachedMpeg4Gif | InlineQueryResultCachedPhoto | InlineQueryResultCachedSticker | InlineQueryResultCachedVideo | InlineQueryResultCachedVoice | InlineQueryResultArticle | InlineQueryResultAudio | InlineQueryResultContact | InlineQueryResultGame | InlineQueryResultDocument | InlineQueryResultGif | InlineQueryResultLocation | InlineQueryResultMpeg4Gif | InlineQueryResultPhoto | InlineQueryResultVenue | InlineQueryResultVideo | InlineQueryResultVoice;
export declare function constructInlineQueryResult(result: Api.botInlineResult | Api.botInlineMediaResult): InlineQueryResult;
export declare function inlineQueryResultToTlObject(result_: InlineQueryResult, parseText: (text: string, params?: {
    parseMode?: ParseMode;
    entities?: MessageEntity[];
}) => Promise<readonly [string, any[] | undefined]>, usernameResolver: UsernameResolver): Promise<Api.InputBotInlineResult>;
//# sourceMappingURL=7_inline_query_result.d.ts.map