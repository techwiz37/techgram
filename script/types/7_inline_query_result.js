"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructInlineQueryResult = constructInlineQueryResult;
exports.inlineQueryResultToTlObject = inlineQueryResultToTlObject;
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _file_id_js_1 = require("./_file_id.js");
const _0_thumbnail_js_1 = require("./0_thumbnail.js");
const _1_photo_js_1 = require("./1_photo.js");
const _2_message_entity_js_1 = require("./2_message_entity.js");
const _2_reply_markup_js_1 = require("./2_reply_markup.js");
function constructInlineQueryResult(result) {
    const id = result.id, title = result.title ?? "", type = result.type, description = result.description;
    if (_2_tl_js_1.Api.is("botInlineMessageMediaGeo", result.send_message)) {
        const geoPoint = result.send_message.geo;
        return (0, _1_utilities_js_1.cleanObject)({
            type: "location",
            id,
            title,
            latitude: geoPoint.lat,
            longitude: geoPoint.long,
            horizontalAccuracy: geoPoint.accuracy_radius,
            livePeriod: result.send_message.period,
            heading: result.send_message.heading,
            proximityAlertRadius: result.send_message.proximity_notification_radius,
        });
    }
    else if (_2_tl_js_1.Api.is("botInlineMessageMediaVenue", result.send_message)) {
        const geoPoint = result.send_message.geo;
        return (0, _1_utilities_js_1.cleanObject)({
            type: "venue",
            id,
            title,
            latitude: geoPoint.lat,
            longitude: geoPoint.long,
            address: result.send_message.address,
            foursquareId: result.send_message.venue_id,
            foursquareType: result.send_message.venue_type,
        });
    }
    else if (_2_tl_js_1.Api.is("botInlineMessageMediaWebPage", result.send_message) || _2_tl_js_1.Api.is("botInlineMessageText", result.send_message)) {
        return (0, _1_utilities_js_1.cleanObject)({
            type: "article",
            id,
            title,
            description,
            messageContent: (0, _1_utilities_js_1.cleanObject)({
                type: "text",
                text: result.send_message.message,
                entities: (result.send_message.entities ?? []).map(_2_message_entity_js_1.constructMessageEntity).filter((v) => v !== null),
                linkPreview: _2_tl_js_1.Api.is("botInlineMessageMediaWebPage", result.send_message) ? { type: "unknown", id: "", url: result.send_message.url, mediaSize: result.send_message.force_large_media ? "large" : "small", isAboveText: result.send_message.invert_media ?? false } : undefined,
            }),
            replyMarkup: result.send_message.reply_markup ? (0, _2_reply_markup_js_1.constructReplyMarkup)(result.send_message.reply_markup) : undefined,
        });
    }
    else if (_2_tl_js_1.Api.is("botInlineMessageMediaAuto", result.send_message)) {
        let ref;
        let attributes;
        const thumbnailUrl = "thumb" in result ? result.thumb?.url : undefined;
        let photoSizes;
        let photo;
        if (_2_tl_js_1.Api.is("botInlineMediaResult", result)) {
            if (result.photo) {
                photo = _2_tl_js_1.Api.as("photo", result.photo);
                ref = { fileId: (0, _file_id_js_1.getPhotoFileId)(photo).fileId };
                const { largest } = photoSizes = (0, _1_photo_js_1.getPhotoSizes)(photo);
                attributes = [{ _: "documentAttributeImageSize", w: largest.w, h: largest.h }];
            }
            else if (result.document) {
                const document = _2_tl_js_1.Api.as("document", result.document);
                ref = {
                    fileId: (0, _file_id_js_1.serializeFileId)({
                        type: _file_id_js_1.FileType.Document,
                        dcId: document.dc_id,
                        fileReference: document.file_reference,
                        location: { type: "common", id: document.id, accessHash: document.access_hash },
                    }),
                };
                attributes = document.attributes;
            }
            else {
                (0, _0_deps_js_1.unreachable)();
            }
        }
        else if (result.content) {
            ref = { url: result.content.url };
            attributes = result.content.attributes;
        }
        else {
            (0, _0_deps_js_1.unreachable)();
        }
        const messageContent = result.send_message.message
            ? {
                type: "text",
                text: result.send_message.message,
                entities: (result.send_message.entities ?? []).map(_2_message_entity_js_1.constructMessageEntity).filter((v) => v !== null),
            }
            : undefined;
        const replyMarkup = result.send_message.reply_markup ? (0, _2_reply_markup_js_1.constructReplyMarkup)(result.send_message.reply_markup) : undefined;
        switch (type) {
            case "audio": {
                const a = attributes?.find((v) => _2_tl_js_1.Api.is("documentAttributeAudio", v));
                return (0, _1_utilities_js_1.cleanObject)({
                    id,
                    type,
                    title,
                    ...ref,
                    messageContent,
                    replyMarkup,
                    performer: a?.performer,
                    audioDuration: a?.duration,
                });
            }
            case "gif":
            case "mpeg4Gif": {
                const a = attributes.find((v) => _2_tl_js_1.Api.is("documentAttributeVideo", v));
                return (0, _1_utilities_js_1.cleanObject)({
                    id,
                    type,
                    title,
                    ...ref,
                    messageContent,
                    replyMarkup,
                    thumbnailUrl,
                    width: a?.w,
                    height: a?.h,
                    duration: a?.duration,
                });
            }
            case "photo": {
                const a = attributes.find((v) => _2_tl_js_1.Api.is("documentAttributeImageSize", v));
                return (0, _1_utilities_js_1.cleanObject)({
                    id,
                    type,
                    title,
                    description,
                    ...ref,
                    messageContent,
                    replyMarkup,
                    thumbnailUrl: thumbnailUrl,
                    thumbnails: photo ? photoSizes?.sizes.slice(0, -1).map((v) => (0, _0_thumbnail_js_1.constructThumbnail)(v, photo)) : undefined,
                    width: a?.w,
                    height: a?.h,
                });
            }
            case "video": {
                const a = attributes.find((v) => _2_tl_js_1.Api.is("documentAttributeVideo", v));
                return (0, _1_utilities_js_1.cleanObject)({
                    id,
                    type,
                    title,
                    description,
                    ...ref,
                    messageContent,
                    replyMarkup,
                    mimeType: "content" in result && result.content ? result.content.mime_type : "video/mp4",
                    thumbnailUrl: thumbnailUrl,
                    width: a?.w,
                    height: a?.h,
                    videoDuration: a?.duration,
                });
            }
            case "voice": {
                const a = attributes.find((v) => _2_tl_js_1.Api.is("documentAttributeAudio", v));
                return (0, _1_utilities_js_1.cleanObject)({
                    id,
                    type,
                    title,
                    ...ref,
                    messageContent,
                    replyMarkup,
                    thumbnailUrl,
                    voiceDuration: a?.duration,
                });
            }
            case "document":
            case "file":
                return (0, _1_utilities_js_1.cleanObject)({
                    type: "document",
                    id,
                    title: result.title ?? "",
                    ...ref,
                    messageContent,
                    replyMarkup,
                    thumbnailUrl,
                });
        }
    }
    (0, _0_deps_js_1.unreachable)();
}
// deno-lint-ignore no-explicit-any
async function inlineQueryResultToTlObject(result_, parseText, usernameResolver) {
    let document = null;
    let thumb = null;
    let fileId_ = null;
    switch (result_.type) {
        case "audio":
            if ("url" in result_) {
                document = {
                    _: "inputWebDocument",
                    url: result_.url,
                    size: 0,
                    mime_type: "audio/mpeg",
                    attributes: [
                        { _: "documentAttributeAudio", duration: result_.audioDuration ?? 0, title: result_.title, performer: result_.performer },
                    ],
                };
            }
            else {
                fileId_ = result_.fileId;
            }
            break;
        case "video":
            if ("url" in result_) {
                document = {
                    _: "inputWebDocument",
                    url: result_.url,
                    size: 0,
                    mime_type: result_.mimeType ?? "video/mp4",
                    attributes: [
                        { _: "documentAttributeVideo", duration: result_.videoDuration ?? 0, h: result_.height ?? 0, w: result_.width ?? 0 },
                    ],
                };
            }
            else {
                fileId_ = result_.fileId;
            }
            break;
        case "document":
            if ("url" in result_) {
                document = { _: "inputWebDocument", url: result_.url, mime_type: "application/octet-stream", attributes: [], size: 0 };
            }
            else {
                fileId_ = result_.fileId;
            }
            break;
        case "gif":
            if ("url" in result_) {
                document = {
                    _: "inputWebDocument",
                    url: result_.url,
                    size: 0,
                    mime_type: "image/gif",
                    attributes: [
                        { _: "documentAttributeVideo", duration: result_.duration ?? 0, w: result_.width ?? 0, h: result_.height ?? 0 },
                    ],
                };
            }
            else {
                fileId_ = result_.fileId;
            }
            break;
        case "mpeg4Gif":
            if ("url" in result_) {
                document = {
                    _: "inputWebDocument",
                    url: result_.url,
                    size: 0,
                    mime_type: "video/mp4",
                    attributes: [
                        { _: "documentAttributeVideo", nosound: true, duration: result_.duration ?? 0, w: result_.width ?? 0, h: result_.height ?? 0, supports_streaming: true },
                    ],
                };
            }
            else {
                fileId_ = result_.fileId;
            }
            break;
        case "photo":
            if ("url" in result_) {
                document = { _: "inputWebDocument", url: result_.url, size: 0, mime_type: "image/jpeg", attributes: [{ _: "documentAttributeImageSize", w: result_.width ?? 0, h: result_.height ?? 0 }] };
            }
            else {
                fileId_ = result_.fileId;
            }
            break;
        case "sticker":
            fileId_ = result_.fileId;
            break;
        case "voice":
            if ("url" in result_) {
                document = {
                    _: "inputWebDocument",
                    url: result_.url,
                    size: 0,
                    mime_type: "audio/mpeg",
                    attributes: [
                        { _: "documentAttributeAudio", duration: result_.voiceDuration ?? 0, voice: true },
                    ],
                };
            }
            else {
                fileId_ = result_.fileId;
            }
            break;
    }
    const replyMarkup = "replyMarkup" in result_ && result_.replyMarkup ? await (0, _2_reply_markup_js_1.replyMarkupToTlObject)(result_.replyMarkup, usernameResolver) : undefined;
    if ("thumbnailUrl" in result_ && result_.thumbnailUrl) {
        thumb = { _: "inputWebDocument", url: result_.thumbnailUrl, size: 0, mime_type: "image/jpeg", attributes: [] };
    }
    else if (result_.type === "photo") {
        thumb = document;
    }
    let ret = ["", []];
    if ("caption" in result_ && result_.caption) {
        ret = await parseText(result_.caption, { parseMode: result_.parseMode, entities: result_.captionEntities });
    }
    const { type, id } = result_;
    const [message, entities] = ret;
    const sendMessage = { _: "inputBotInlineMessageMediaAuto", message, entities, reply_markup: replyMarkup };
    const title = "title" in result_ ? result_.title : undefined;
    const description = "description" in result_ ? result_.description : undefined;
    if (document !== null) {
        return { _: "inputBotInlineResult", id, type, title, description, thumb: thumb === null ? undefined : thumb, content: document, send_message: ({ _: "inputBotInlineMessageMediaAuto", message, entities, reply_markup: replyMarkup }) };
    }
    else if (fileId_ !== null) {
        const fileId = (0, _file_id_js_1.deserializeFileId)(fileId_);
        return {
            _: "inputBotInlineResultDocument",
            id,
            type: type === "document" ? "file" : type,
            title,
            description,
            document: ({
                _: "inputDocument",
                id: "id" in fileId.location ? fileId.location.id : (0, _0_deps_js_1.unreachable)(),
                access_hash: fileId.location.accessHash,
                file_reference: fileId.fileReference ?? new Uint8Array(),
            }),
            send_message: sendMessage,
        };
    }
    else if (result_.type === "location") {
        return { _: "inputBotInlineResult", id, type, title, description, thumb: thumb === null ? undefined : thumb, send_message: ({ _: "inputBotInlineMessageMediaGeo", geo_point: ({ _: "inputGeoPoint", lat: result_.latitude, long: result_.longitude, accuracy_radius: result_.horizontalAccuracy }), heading: result_.heading, period: result_.livePeriod, proximity_notification_radius: result_.proximityAlertRadius, reply_markup: replyMarkup }) };
    }
    else if (result_.type === "game") {
        return { _: "inputBotInlineResult", id, type, title, description, thumb: thumb === null ? undefined : thumb, send_message: ({ _: "inputBotInlineMessageGame", reply_markup: replyMarkup }) };
    }
    else if (result_.type === "article") {
        if (!("text" in result_.messageContent)) {
            (0, _0_deps_js_1.unreachable)();
        }
        const [message, entities] = await parseText(result_.messageContent.text, { entities: result_.messageContent.entities, parseMode: result_.messageContent.parseMode });
        const noWebpage = result_.messageContent?.linkPreview && result_.messageContent?.linkPreview.type === "input" && result_.messageContent?.linkPreview.disable ? true : undefined;
        const invertMedia = result_.messageContent?.linkPreview?.isAboveText ? true : undefined;
        let sendMessage;
        if (result_.messageContent.linkPreview?.url) {
            sendMessage = { _: "inputBotInlineMessageMediaWebPage", url: result_.messageContent.linkPreview.url, force_large_media: result_.messageContent.linkPreview.mediaSize === "large" ? true : undefined, force_small_media: result_.messageContent.linkPreview.mediaSize === "small" ? true : undefined, optional: message.length ? undefined : true, message, entities, invert_media: invertMedia, reply_markup: replyMarkup };
        }
        else {
            sendMessage = { _: "inputBotInlineMessageText", message, entities, no_webpage: noWebpage, invert_media: invertMedia, reply_markup: replyMarkup };
        }
        return { _: "inputBotInlineResult", id, type, title, description, thumb: thumb === null ? undefined : thumb, send_message: sendMessage };
    }
    else if (result_.type === "venue") {
        if (!result_.foursquareId || !result_.foursquareType) {
            (0, _0_deps_js_1.unreachable)();
        }
        return { _: "inputBotInlineResult", id, type, title, description, thumb: thumb === null ? undefined : thumb, send_message: ({ _: "inputBotInlineMessageMediaVenue", geo_point: ({ _: "inputGeoPoint", long: result_.longitude, lat: result_.latitude }), address: result_.address, provider: "foursquare", title: result_.title, venue_id: result_.foursquareId, venue_type: result_.foursquareType, reply_markup: replyMarkup }) };
    }
    else {
        (0, _0_deps_js_1.unreachable)();
    }
}
