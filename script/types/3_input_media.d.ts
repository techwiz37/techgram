import type { FileSource } from "./0_file_source.js";
import type { ParseMode } from "./0_parse_mode.js";
import type { SelfDestructOption } from "./0_self_destruct_option.js";
import type { MessageEntity } from "./2_message_entity.js";
export interface _InputMediaCommon {
    fileName?: string;
    mimeType?: string;
    chunkSize?: number;
    signal?: AbortSignal;
    caption?: string;
    captionEntities?: MessageEntity[];
    parseMode?: ParseMode;
}
export interface InputMediaAnimation extends _InputMediaCommon {
    animation: FileSource;
    thumbnail?: FileSource;
    duration?: number;
    width?: number;
    height?: number;
    hasSpoiler?: boolean;
}
export interface InputMediaAudio extends _InputMediaCommon {
    audio: FileSource;
    thumbnail?: FileSource;
    duration?: number;
    performer?: string;
    title?: string;
}
export interface InputMediaDocument extends _InputMediaCommon {
    document: FileSource;
    thumbnail?: FileSource;
}
export interface InputMediaPhoto extends _InputMediaCommon {
    photo: FileSource;
    width?: number;
    height?: number;
    hasSpoiler?: boolean;
    selfDestruct?: SelfDestructOption;
}
export interface InputMediaVideo extends _InputMediaCommon {
    video: FileSource;
    thumbnail?: FileSource;
    duration?: number;
    width?: number;
    height?: number;
    supportsStreaming?: boolean;
    hasSpoiler?: boolean;
    selfDestruct?: SelfDestructOption;
}
export type InputMedia = InputMediaAnimation | InputMediaAudio | InputMediaDocument | InputMediaPhoto | InputMediaVideo;
//# sourceMappingURL=3_input_media.d.ts.map