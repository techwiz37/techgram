import { Api } from "../2_tl.js";
import type { LinkPreviewMediaSize } from "./0_link_preview_media_size.js";
import { type Audio } from "./1_audio.js";
import type { PeerGetter } from "./1_chat_p.js";
import { type Document } from "./1_document.js";
import { type Photo } from "./1_photo.js";
import { type Gift } from "./4_gift.js";
export interface InputLinkPreview {
    type: "input";
    disable?: boolean;
    url?: string;
    mediaSize?: LinkPreviewMediaSize;
    isAboveText?: boolean;
}
export interface _LinkPreviewBase {
    id: string;
    mediaSize: LinkPreviewMediaSize;
    isAboveText: boolean;
}
export interface LinkPreviewLoading extends _LinkPreviewBase {
    type: "loading";
    url?: string;
    date: number;
}
export interface LinkPreviewNotLoaded extends _LinkPreviewBase {
    type: "notLoaded";
    url?: string;
}
export interface _LinkPreviewLoadedBase extends _LinkPreviewBase {
    url: string;
}
export interface LinkPreviewUnknown extends _LinkPreviewLoadedBase {
    type: "unknown";
}
export interface LinkPreviewPhoto extends _LinkPreviewLoadedBase {
    type: "photo";
    photo: Photo;
}
export interface _LinkPreviewEmbeddedBase extends _LinkPreviewLoadedBase {
    embedUrl: string;
    width: number;
    height: number;
    duration: number;
}
export interface LinkPreviewEmbeddedVideo extends _LinkPreviewEmbeddedBase {
    type: "embeddedVideo";
    thumbnail?: Photo;
}
export interface LinkPreviewExternalVideo extends _LinkPreviewEmbeddedBase {
    type: "externalVideo";
    mimeType: string;
    width: number;
    height: number;
    duration: number;
}
export interface LinkPreviewVideo extends _LinkPreviewLoadedBase {
    type: "video";
    video: Document;
    startTimestamp?: number;
    thumbnail?: Photo;
}
export interface LinkPreviewEmbeddedAudio extends _LinkPreviewEmbeddedBase {
    type: "embeddedAudio";
    duration: number;
    width: number;
    height: number;
}
export interface LinkPreviewExternalAudio extends _LinkPreviewEmbeddedBase {
    type: "externalAudio";
    mimeType: string;
    duration: number;
}
export interface LinkPreviewAudio extends _LinkPreviewLoadedBase {
    type: "audio";
    audio: Audio;
}
export interface LinkPreviewGift extends _LinkPreviewLoadedBase {
    type: "gift";
    gift: Gift;
}
export type LinkPreviewLoaded = LinkPreviewUnknown | LinkPreviewPhoto | LinkPreviewEmbeddedVideo | LinkPreviewExternalVideo | LinkPreviewVideo | LinkPreviewEmbeddedAudio | LinkPreviewExternalAudio | LinkPreviewAudio | LinkPreviewGift;
export type LinkPreview = InputLinkPreview | LinkPreviewLoading | LinkPreviewNotLoaded | LinkPreviewLoaded;
export declare function constructLinkPreview(media: Api.messageMediaWebPage, invert: boolean | undefined, getPeer: PeerGetter): LinkPreview;
//# sourceMappingURL=5_link_preview.d.ts.map