import { unreachable } from "../0_deps.js";
import { cleanObject } from "../1_utilities.js";
import { Api } from "../2_tl.js";
import { FileType, serializeFileId, toUniqueFileId } from "./_file_id.js";
import { constructAudio } from "./1_audio.js";
import { constructDocument } from "./1_document.js";
import { constructPhoto } from "./1_photo.js";
import { constructGift } from "./4_gift.js";
export function constructLinkPreview(media, invert, getPeer) {
    if (Api.is("webPageNotModified", media.webpage)) {
        unreachable();
    }
    const id = String(media.webpage.id);
    const mediaSize = media.force_large_media ? "large" : "small";
    const isAboveText = !!invert;
    switch (media.webpage._) {
        case "webPagePending":
            return cleanObject({
                type: "loading",
                id,
                date: media.webpage.date,
                url: media.webpage.url,
                mediaSize,
                isAboveText,
            });
        case "webPageEmpty":
            return cleanObject({
                type: "notLoaded",
                id,
                url: media.webpage.url,
                mediaSize,
                isAboveText,
            });
    }
    const url = media.webpage.url;
    let linkPreview = {
        type: "unknown",
        id,
        url,
        mediaSize,
        isAboveText,
    };
    switch (media.webpage.type) {
        case "video":
            if (media.webpage.embed_type === "iframe") {
                linkPreview = {
                    type: "embeddedVideo",
                    id,
                    url,
                    mediaSize,
                    isAboveText,
                    embedUrl: media.webpage.embed_url ?? "",
                    width: media.webpage.embed_width ?? 0,
                    height: media.webpage.embed_height ?? 0,
                    duration: media.webpage.duration ?? 0,
                    thumbnail: media.webpage.photo ? constructPhoto(Api.as("photo", media.webpage.photo)) : undefined,
                };
                break;
            }
            else if (media.webpage.document) {
                const document = Api.as("document", media.webpage.document);
                const fileId = {
                    type: FileType.Video,
                    dcId: document.dc_id,
                    fileReference: document.file_reference,
                    location: { type: "common", id: document.id, accessHash: document.access_hash },
                };
                const startTimestamp = Number(new URL(media.webpage.url).searchParams.get("t")) || undefined;
                const fileName = document.attributes.find((v) => Api.is("documentAttributeFilename", v));
                linkPreview = {
                    type: "video",
                    id,
                    url,
                    mediaSize,
                    isAboveText,
                    video: constructDocument(document, fileName ?? { _: "documentAttributeFilename", file_name: "Unknown" }, serializeFileId(fileId), toUniqueFileId(fileId)),
                    startTimestamp,
                    thumbnail: media.webpage.video_cover_photo ? media.webpage.photo ? constructPhoto(Api.as("photo", media.webpage.photo)) : undefined : undefined,
                };
                break;
            }
            else if (media.webpage.embed_url) {
                linkPreview = {
                    type: "externalVideo",
                    id,
                    url,
                    mediaSize,
                    isAboveText,
                    embedUrl: media.webpage.embed_url ?? "",
                    mimeType: media.webpage.embed_type ?? "",
                    width: media.webpage.embed_width ?? 0,
                    height: media.webpage.embed_height ?? 0,
                    duration: media.webpage.duration ?? 0,
                };
                break;
            }
            else if (media.webpage.photo) {
                linkPreview = {
                    type: "photo",
                    id,
                    url,
                    mediaSize,
                    isAboveText,
                    photo: constructPhoto(Api.as("photo", media.webpage.photo)),
                };
                break;
            }
        case "audio":
            if (media.webpage.embed_type === "iframe") {
                linkPreview = {
                    type: "embeddedAudio",
                    id,
                    url,
                    mediaSize,
                    isAboveText,
                    embedUrl: media.webpage.embed_url ?? "",
                    width: media.webpage.embed_width ?? 0,
                    height: media.webpage.embed_height ?? 0,
                    duration: media.webpage.duration ?? 0,
                };
                break;
            }
            else if (media.webpage.document) {
                const document = Api.as("document", media.webpage.document);
                const fileId = {
                    type: FileType.Audio,
                    dcId: document.dc_id,
                    fileReference: document.file_reference,
                    location: { type: "common", id: document.id, accessHash: document.access_hash },
                };
                const audio = document.attributes.find((v) => Api.is("documentAttributeAudio", v));
                linkPreview = {
                    type: "audio",
                    id,
                    url,
                    mediaSize,
                    isAboveText,
                    audio: constructAudio(document, audio, serializeFileId(fileId), toUniqueFileId(fileId)),
                };
                break;
            }
            else if (media.webpage.embed_url) {
                linkPreview = {
                    type: "externalAudio",
                    id,
                    url,
                    mediaSize,
                    isAboveText,
                    embedUrl: media.webpage.embed_url,
                    mimeType: media.webpage.embed_type ?? "",
                    width: media.webpage.embed_width ?? 0,
                    height: media.webpage.embed_height ?? 0,
                    duration: media.webpage.duration ?? 0,
                };
                break;
            }
            else if (media.webpage.photo) {
                linkPreview = {
                    type: "photo",
                    id,
                    url,
                    mediaSize,
                    isAboveText,
                    photo: constructPhoto(Api.as("photo", media.webpage.photo)),
                };
                break;
            }
            break;
        case "telegram_nft": {
            const gift = media.webpage.attributes?.find((v) => Api.is("webPageAttributeUniqueStarGift", v))?.gift;
            if (gift) {
                linkPreview = {
                    type: "gift",
                    id,
                    url,
                    mediaSize,
                    isAboveText,
                    gift: constructGift(gift, getPeer),
                };
                break;
            }
        }
    }
    return cleanObject(linkPreview);
}
