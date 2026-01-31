"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageManager = void 0;
const _0_deps_js_1 = require("../0_deps.js");
const _0_errors_js_1 = require("../0_errors.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _3_errors_js_1 = require("../3_errors.js");
const _3_transport_js_1 = require("../3_transport.js");
const _3_types_js_1 = require("../3_types.js");
const _3_types_js_2 = require("../3_types.js");
const _0_message_search_filter_js_1 = require("../types/0_message_search_filter.js");
const _0_html_js_1 = require("./0_html.js");
const _0_markdown_js_1 = require("./0_markdown.js");
const _0_utilities_js_1 = require("./0_utilities.js");
const FALLBACK_MIME_TYPE = "application/octet-stream";
const STICKER_MIME_TYPES = ["image/webp", "video/webm", "application/x-tgsticker"];
const messageManagerUpdates = [
    "updateNewMessage",
    "updateNewChannelMessage",
    "updateEditMessage",
    "updateNewScheduledMessage",
    "updateEditChannelMessage",
    "updateBotNewBusinessMessage",
    "updateBotEditBusinessMessage",
    "updateBotDeleteBusinessMessage",
    "updateDeleteMessages",
    "updateDeleteChannelMessages",
    "updateDeleteScheduledMessages",
    "updateTranscribedAudio",
];
class MessageManager {
    #c;
    #LresolveFileId;
    constructor(c) {
        this.#c = c;
        const L = (0, _1_utilities_js_1.getLogger)("MessageManager").client(c.id);
        this.#LresolveFileId = L.branch("resolveFileId");
    }
    async getMessages(chatId, messageIds) {
        (0, _0_utilities_js_1.checkArray)(messageIds, _0_utilities_js_1.checkMessageId);
        const peer = await this.#c.getInputPeer(chatId);
        let messages_ = new Array();
        const chatId_ = await this.#c.getInputPeerChatId(peer);
        let shouldFetch = false;
        for (const messageId of messageIds) {
            const message = await this.#c.messageStorage.getMessage(chatId_, messageId);
            if (message === null) {
                messages_ = [];
                shouldFetch = true;
                break;
            }
            else {
                messages_.push(message);
            }
        }
        if (shouldFetch) {
            if ((0, _0_utilities_js_1.canBeInputChannel)(peer)) {
                messages_ = await this.#c.invoke({ _: "channels.getMessages", channel: (0, _0_utilities_js_1.toInputChannel)(peer), id: messageIds.map((v) => ({ _: "inputMessageID", id: v })) }).then((v) => _2_tl_js_1.Api.as("messages.channelMessages", v).messages);
            }
            else {
                messages_ = await this.#c.invoke({
                    _: "messages.getMessages",
                    id: messageIds.map((v) => ({ _: "inputMessageID", id: v })),
                }).then((v) => _2_tl_js_1.Api.as("messages.messages", v).messages);
            }
        }
        const messages = new Array();
        for (const message_ of messages_) {
            if (_2_tl_js_1.Api.is("messageEmpty", message_)) {
                continue;
            }
            const message = await this.constructMessage(message_);
            if (message.chat.id === chatId_) {
                messages.push(message);
            }
        }
        return messages;
    }
    async getMessageWithReply(chatId, messageId) {
        const message = await this.getMessage(chatId, messageId);
        if (message !== null && message.replyToMessageId) {
            message.replyToMessage = await this.getMessage(chatId, message.replyToMessageId) ?? undefined;
        }
        return message;
    }
    async getMessage(chatId, messageId) {
        const messages = await this.getMessages(chatId, [messageId]);
        return messages[0] ?? null;
    }
    static parseText(text, entities, parseMode) {
        switch (parseMode) {
            case null:
                break;
            case "HTML": {
                const [newText, entitiesToPush] = (0, _0_html_js_1.parseHtml)(text);
                text = newText;
                for (const entity of entitiesToPush) {
                    entities.push(entity);
                }
                break;
            }
            case "Markdown": {
                const [newText, entitiesToPush] = (0, _0_markdown_js_1.parseMarkdown)(text);
                text = newText;
                for (const entity of entitiesToPush) {
                    entities.push(entity);
                }
                break;
            }
            default:
                (0, _0_deps_js_1.unreachable)();
        }
        text = text.trimEnd();
        for (const entity of entities) {
            while (text[entity.offset + (entity.length - 1)] === undefined) {
                --entity.length;
            }
        }
        if (!text.length) {
            throw new _0_errors_js_1.InputError("Text must not be empty.");
        }
        return [text, entities];
    }
    #checkParams(params) {
        if (params && "replyMarkup" in params && params.replyMarkup !== undefined) {
            this.#c.storage.assertBot("replyMarkup");
        }
        if (params && "businessConnectionId" in params && params.businessConnectionId !== undefined) {
            this.#c.storage.assertBot("businessConnectionId");
        }
        if (params && "sendAs" in params && params.sendAs !== undefined) {
            this.#c.storage.assertUser("sendAs");
        }
        if (params && "sendAt" in params && params.sendAt !== undefined) {
            this.#c.storage.assertUser("businessConsendAtnectionId");
        }
    }
    async parseText(text_, params) {
        const [text, entities_] = MessageManager.parseText(text_, params?.entities ?? [], params?.parseMode ?? this.#c.parseMode);
        const entities = entities_?.length > 0 ? await Promise.all(entities_.map((v) => (0, _3_types_js_2.messageEntityToTlObject)(v, this.#c.getPeer))) : undefined;
        return [text, entities];
    }
    async updatesToMessages(chatId, updates, businessConnectionId) {
        const messages = new Array();
        if (_2_tl_js_1.Api.is("updates", updates)) {
            for (const update of updates.updates) {
                if ("message" in update && _2_tl_js_1.Api.is("messageEmpty", update.message)) {
                    continue;
                }
                if (_2_tl_js_1.Api.is("updateNewMessage", update) || _2_tl_js_1.Api.is("updateEditMessage", update) || _2_tl_js_1.Api.is("updateNewScheduledMessage", update)) {
                    const message = await this.constructMessage(update.message);
                    if (_2_tl_js_1.Api.is("updateNewScheduledMessage", update)) {
                        message.scheduled = true;
                    }
                    messages.push(message);
                }
                else if (_2_tl_js_1.Api.is("updateNewChannelMessage", update) || _2_tl_js_1.Api.is("updateEditChannelMessage", update)) {
                    messages.push(await this.constructMessage(update.message));
                }
                else if (_2_tl_js_1.Api.is("updateBotNewBusinessMessage", update)) {
                    messages.push(await this.constructMessage(update.message, false, { connectionId: businessConnectionId ?? update.connection_id, replyToMessage: update.reply_to_message }));
                }
                else if (_2_tl_js_1.Api.is("updateBotEditBusinessMessage", update)) {
                    messages.push(await this.constructMessage(update.message, false, { connectionId: businessConnectionId ?? update.connection_id, replyToMessage: update.reply_to_message }));
                }
            }
        }
        else if (_2_tl_js_1.Api.is("updateShortSentMessage", updates)) {
            const message = await this.getMessage(chatId, updates.id);
            if (message !== null) {
                messages.push(message);
            }
        }
        return messages;
    }
    async constructMessage(message_, r, business) {
        const mediaPoll = "media" in message_ && _2_tl_js_1.Api.is("messageMediaPoll", message_.media) ? message_.media : null;
        const pollId = mediaPoll?.poll.id;
        let poll = null;
        let pollResults = null;
        if (pollId) {
            [poll, pollResults] = await Promise.all([this.#c.messageStorage.getPoll(pollId), this.#c.messageStorage.getPollResults(pollId)]);
        }
        const message = await (0, _3_types_js_2.constructMessage)(message_, this.#c.getPeer, this.getMessage.bind(this), this.#c.fileManager.getStickerSetName.bind(this.#c.fileManager), r, business, poll ?? undefined, pollResults ?? undefined);
        if (!poll && mediaPoll) {
            await this.#c.messageStorage.setPoll(mediaPoll.poll.id, mediaPoll.poll);
        }
        if (!pollResults && mediaPoll) {
            await this.#c.messageStorage.setPollResults(mediaPoll.poll.id, mediaPoll.results);
        }
        return message;
    }
    async forwardMessages(from, to, messageIds, params) {
        (0, _0_utilities_js_1.checkArray)(messageIds, _0_utilities_js_1.checkMessageId);
        const result = await this.#c.invoke({ _: "messages.forwardMessages", from_peer: await this.#c.getInputPeer(from), to_peer: await this.#c.getInputPeer(to), id: messageIds, random_id: messageIds.map(() => (0, _1_utilities_js_1.getRandomId)()), silent: params?.disableNotification || undefined, top_msg_id: params?.messageThreadId, noforwards: params?.disableNotification || undefined, send_as: params?.sendAs ? await this.#c.getInputPeer(params.sendAs) : undefined, drop_author: params?.dropSenderName || undefined, drop_media_captions: params?.dropCaption || undefined });
        return await this.updatesToMessages(to, result);
    }
    async getHistory(chatId, params) {
        this.#c.storage.assertUser("getHistory");
        const limit = (0, _0_utilities_js_1.getLimit)(params?.limit);
        let offsetId = params?.offsetId ?? 0;
        if (offsetId < 0) {
            offsetId = 0;
        }
        let offsetDate = params?.offsetDate ?? 0;
        if (offsetDate < 0) {
            offsetDate = 0;
        }
        const peer = await this.#c.getInputPeer(chatId);
        const messages = new Array();
        if (messages.length > 0) {
            offsetId = messages[messages.length - 1].id;
        }
        const result = await this.#c.invoke({
            _: "messages.getHistory",
            peer: peer,
            offset_id: offsetId,
            offset_date: offsetDate,
            add_offset: params?.addOffset ?? 0,
            limit,
            max_id: 0,
            min_id: 0,
            hash: 0n,
        });
        if (!("messages" in result)) {
            (0, _0_deps_js_1.unreachable)();
        }
        for (const message_ of result.messages) {
            const message = await this.constructMessage(message_, false);
            messages.push(message);
        }
        return messages;
    }
    usernameResolver = async (v) => {
        const inputPeer = await this.#c.getInputPeer(v).then((v) => _2_tl_js_1.Api.as("inputPeerUser", v));
        return { ...inputPeer, _: "inputUser" };
    };
    async #constructReplyMarkup(params) {
        if (params?.replyMarkup) {
            this.#c.storage.assertBot("replyMarkup");
            return await (0, _3_types_js_2.replyMarkupToTlObject)(params.replyMarkup, this.usernameResolver.bind(this));
        }
    }
    async #resolveSendAs(params) {
        const sendAs = params?.sendAs;
        if (sendAs !== undefined) {
            this.#c.storage.assertUser("sendAs");
            return sendAs ? await this.#c.getInputPeer(sendAs) : undefined;
        }
    }
    async sendMessage(chatId, text, params) {
        this.#checkParams(params);
        const [message, entities] = await this.parseText(text, params);
        const replyMarkup = await this.#constructReplyMarkup(params);
        const peer = await this.#c.getInputPeer(chatId);
        const randomId = (0, _1_utilities_js_1.getRandomId)();
        const noWebpage = params?.linkPreview?.disable ? true : undefined;
        const invertMedia = params?.linkPreview?.isAboveText ? true : undefined;
        const silent = params?.disableNotification ? true : undefined;
        const noforwards = params?.protectContent ? true : undefined;
        const sendAs = await this.#resolveSendAs(params);
        const effect = params?.effectId ? BigInt(params.effectId) : undefined;
        const schedule_date = params?.sendAt;
        const allow_paid_floodskip = params?.paidBroadcast ? true : undefined;
        let result;
        if (!noWebpage && params?.linkPreview?.url) {
            result = await this.#c.invoke({
                _: "messages.sendMedia",
                peer,
                random_id: randomId,
                media: ({
                    _: "inputMediaWebPage",
                    url: params.linkPreview.url,
                    force_large_media: params.linkPreview.mediaSize === "large" ? true : undefined,
                    force_small_media: params.linkPreview.mediaSize === "small" ? true : undefined,
                    optional: message.length ? undefined : true,
                }),
                message,
                invert_media: invertMedia,
                silent,
                noforwards,
                reply_to: await this.#constructReplyTo(params),
                send_as: sendAs,
                entities,
                reply_markup: replyMarkup,
                effect,
                schedule_date,
                allow_paid_floodskip,
            }, { businessConnectionId: params?.businessConnectionId });
        }
        else {
            result = await this.#c.invoke({
                _: "messages.sendMessage",
                peer,
                random_id: randomId,
                message,
                no_webpage: noWebpage,
                invert_media: invertMedia,
                silent,
                noforwards,
                reply_to: await this.#constructReplyTo(params),
                send_as: sendAs,
                entities,
                reply_markup: replyMarkup,
                effect,
                schedule_date,
                allow_paid_floodskip,
            }, { businessConnectionId: params?.businessConnectionId });
        }
        const message_ = (await this.updatesToMessages(chatId, result, params?.businessConnectionId))[0];
        return (0, _3_types_js_2.assertMessageType)(message_, "text");
    }
    async #constructReplyTo(params) {
        const topMsgId = params?.messageThreadId;
        if (!params?.replyTo) {
            if (topMsgId) {
                return { _: "inputReplyToMessage", reply_to_msg_id: topMsgId };
            }
            else {
                return undefined;
            }
        }
        if ("messageId" in params.replyTo) {
            return { _: "inputReplyToMessage", reply_to_msg_id: params.replyTo.messageId, top_msg_id: topMsgId, quote_text: params.replyTo.quote?.text, quote_entities: await Promise.all(params.replyTo.quote?.entities.map((v) => (0, _3_types_js_2.messageEntityToTlObject)(v, this.#c.getPeer)) ?? []), quote_offset: params.replyTo.quote?.offset };
        }
        else {
            return { _: "inputReplyToStory", peer: await this.#c.getInputPeer(params.replyTo.chatId), story_id: params.replyTo.storyId };
        }
    }
    async sendVenue(chatId, latitude, longitude, title, address, params) {
        this.#checkParams(params);
        const peer = await this.#c.getInputPeer(chatId);
        const randomId = (0, _1_utilities_js_1.getRandomId)();
        const silent = params?.disableNotification ? true : undefined;
        const noforwards = params?.protectContent ? true : undefined;
        const sendAs = params?.sendAs ? await this.#c.getInputPeer(params.sendAs) : undefined;
        const replyMarkup = await this.#constructReplyMarkup(params);
        const result = await this.#c.invoke({
            _: "messages.sendMedia",
            peer,
            random_id: randomId,
            silent,
            noforwards,
            reply_to: await this.#constructReplyTo(params),
            send_as: sendAs,
            reply_markup: replyMarkup,
            media: ({
                _: "inputMediaVenue",
                geo_point: ({
                    _: "inputGeoPoint",
                    lat: latitude,
                    long: longitude,
                }),
                title,
                address,
                venue_id: params?.foursquareId ?? "",
                venue_type: params?.foursquareType ?? "",
                provider: "foursquare",
            }),
            message: "",
            effect: params?.effectId ? BigInt(params.effectId) : undefined,
            schedule_date: params?.sendAt,
            allow_paid_floodskip: params?.paidBroadcast ? true : undefined,
        }, { businessConnectionId: params?.businessConnectionId });
        const message = (await this.updatesToMessages(chatId, result, params?.businessConnectionId))[0];
        return (0, _3_types_js_2.assertMessageType)(message, "venue");
    }
    async sendContact(chatId, firstName, number, params) {
        this.#checkParams(params);
        const peer = await this.#c.getInputPeer(chatId);
        const randomId = (0, _1_utilities_js_1.getRandomId)();
        const silent = params?.disableNotification ? true : undefined;
        const noforwards = params?.protectContent ? true : undefined;
        const sendAs = params?.sendAs ? await this.#c.getInputPeer(params.sendAs) : undefined;
        const replyMarkup = await this.#constructReplyMarkup(params);
        const result = await this.#c.invoke({
            _: "messages.sendMedia",
            peer,
            random_id: randomId,
            silent,
            noforwards,
            reply_to: await this.#constructReplyTo(params),
            send_as: sendAs,
            reply_markup: replyMarkup,
            media: ({
                _: "inputMediaContact",
                phone_number: number,
                first_name: firstName,
                last_name: params?.lastName ?? "",
                vcard: params?.vcard ?? "",
            }),
            message: "",
            effect: params?.effectId ? BigInt(params.effectId) : undefined,
            schedule_date: params?.sendAt,
            allow_paid_floodskip: params?.paidBroadcast ? true : undefined,
        }, { businessConnectionId: params?.businessConnectionId });
        const message = (await this.updatesToMessages(chatId, result, params?.businessConnectionId))[0];
        return (0, _3_types_js_2.assertMessageType)(message, "contact");
    }
    async sendDice(chatId, params) {
        this.#checkParams(params);
        const peer = await this.#c.getInputPeer(chatId);
        const randomId = (0, _1_utilities_js_1.getRandomId)();
        const silent = params?.disableNotification ? true : undefined;
        const noforwards = params?.protectContent ? true : undefined;
        const sendAs = params?.sendAs ? await this.#c.getInputPeer(params.sendAs) : undefined;
        const replyMarkup = await this.#constructReplyMarkup(params);
        const result = await this.#c.invoke({
            _: "messages.sendMedia",
            peer,
            random_id: randomId,
            silent,
            noforwards,
            reply_to: await this.#constructReplyTo(params),
            send_as: sendAs,
            reply_markup: replyMarkup,
            media: ({
                _: "inputMediaDice",
                emoticon: params?.emoji ?? "🎲",
            }),
            message: "",
            effect: params?.effectId ? BigInt(params.effectId) : undefined,
            schedule_date: params?.sendAt,
            allow_paid_floodskip: params?.paidBroadcast ? true : undefined,
        }, { businessConnectionId: params?.businessConnectionId });
        const message = (await this.updatesToMessages(chatId, result, params?.businessConnectionId))[0];
        return (0, _3_types_js_2.assertMessageType)(message, "dice");
    }
    async sendLocation(chatId, latitude, longitude, params) {
        this.#checkParams(params);
        const peer = await this.#c.getInputPeer(chatId);
        const randomId = (0, _1_utilities_js_1.getRandomId)();
        const silent = params?.disableNotification ? true : undefined;
        const noforwards = params?.protectContent ? true : undefined;
        const sendAs = params?.sendAs ? await this.#c.getInputPeer(params.sendAs) : undefined;
        const replyMarkup = await this.#constructReplyMarkup(params);
        const result = await this.#c.invoke({
            _: "messages.sendMedia",
            peer,
            random_id: randomId,
            silent,
            noforwards,
            reply_to: await this.#constructReplyTo(params),
            send_as: sendAs,
            reply_markup: replyMarkup,
            media: params?.livePeriod !== undefined
                ? ({
                    _: "inputMediaGeoLive",
                    geo_point: ({
                        _: "inputGeoPoint",
                        lat: latitude,
                        long: longitude,
                        accuracy_radius: params?.horizontalAccuracy,
                    }),
                    heading: params?.heading,
                    period: params.livePeriod,
                    proximity_notification_radius: params?.proximityAlertRadius,
                })
                : ({
                    _: "inputMediaGeoPoint",
                    geo_point: ({
                        _: "inputGeoPoint",
                        lat: latitude,
                        long: longitude,
                        accuracy_radius: params?.horizontalAccuracy,
                    }),
                }),
            message: "",
            effect: params?.effectId ? BigInt(params.effectId) : undefined,
            schedule_date: params?.sendAt,
            allow_paid_floodskip: params?.paidBroadcast ? true : undefined,
        }, { businessConnectionId: params?.businessConnectionId });
        const message = (await this.updatesToMessages(chatId, result, params?.businessConnectionId))[0];
        return (0, _3_types_js_2.assertMessageType)(message, "location");
    }
    async sendVideoNote(chatId, audio, params) {
        this.#checkParams(params);
        const message = await this.#sendDocumentInner(chatId, audio, params, _3_types_js_2.FileType.VideoNote, [
            { _: "documentAttributeVideo", round_message: true, w: params?.length ?? 0, h: params?.length ?? 0, duration: params?.duration ?? 0 },
        ], false);
        return (0, _3_types_js_2.assertMessageType)(message, "videoNote");
    }
    async sendAudio(chatId, audio, params) {
        this.#checkParams(params);
        const message = await this.#sendDocumentInner(chatId, audio, params, _3_types_js_2.FileType.Audio, [
            { _: "documentAttributeAudio", duration: params?.duration ?? 0, performer: params?.performer, title: params?.title },
        ]);
        return (0, _3_types_js_2.assertMessageType)(message, "audio");
    }
    async sendVoice(chatId, voice, params) {
        this.#checkParams(params);
        const message = await this.#sendDocumentInner(chatId, voice, params, _3_types_js_2.FileType.VoiceNote, [
            { _: "documentAttributeAudio", voice: true, duration: params?.duration ?? 0 },
        ]);
        return (0, _3_types_js_2.assertMessageType)(message, "voice");
    }
    async sendAnimation(chatId, animation, params) {
        this.#checkParams(params);
        const message = await this.#sendDocumentInner(chatId, animation, params, _3_types_js_2.FileType.Animation, [
            { _: "documentAttributeAnimated" },
            { _: "documentAttributeVideo", supports_streaming: true, w: params?.width ?? 0, h: params?.height ?? 0, duration: params?.duration ?? 0 },
        ]);
        return (0, _3_types_js_2.assertMessageType)(message, "animation");
    }
    async sendVideo(chatId, video, params) {
        this.#checkParams(params);
        const message = await this.#sendDocumentInner(chatId, video, params, _3_types_js_2.FileType.Video, [
            { _: "documentAttributeVideo", supports_streaming: params?.supportsStreaming ? true : undefined, w: params?.width ?? 0, h: params?.height ?? 0, duration: params?.duration ?? 0 },
        ]);
        return (0, _3_types_js_2.assertMessageType)(message, "video");
    }
    async #sendDocumentInner(chatId, document, params, fileType, otherAttribs, urlSupported = true, expectedMimeTypes) {
        let media = null;
        const spoiler = params?.hasSpoiler ? true : undefined;
        const ttl_seconds = params && "selfDestruct" in params && typeof params.selfDestruct !== undefined ? (0, _3_types_js_1.selfDestructOptionToInt)(params.selfDestruct) : undefined;
        if (typeof document === "string") {
            const fileId = this.resolveFileId(document, fileType);
            if (fileId !== null) {
                media = { _: "inputMediaDocument", id: { ...fileId, _: "inputDocument" }, spoiler, query: otherAttribs.find((v) => _2_tl_js_1.Api.is("documentAttributeSticker", v))?.alt || undefined, ttl_seconds };
            }
        }
        if (media === null) {
            if (typeof document === "string" && (0, _0_utilities_js_1.isHttpUrl)(document)) {
                if (!urlSupported) {
                    throw new _0_errors_js_1.InputError("URL not supported.");
                }
                media = { _: "inputMediaDocumentExternal", url: document, spoiler, ttl_seconds };
            }
            else {
                let mimeType;
                const file = await this.#c.fileManager.upload(document, params, (name) => {
                    mimeType = params?.mimeType ?? (0, _0_deps_js_1.contentType)(name.split(".").slice(-1)[0]) ?? FALLBACK_MIME_TYPE;
                    if (expectedMimeTypes && !expectedMimeTypes.includes(mimeType)) {
                        (0, _0_deps_js_1.unreachable)();
                    }
                    if (name.endsWith(".tgs") && fileType === _3_types_js_2.FileType.Document) {
                        name += "-";
                    }
                    return name;
                });
                if (_2_tl_js_1.Api.is("inputFileStoryDocument", file)) {
                    (0, _0_deps_js_1.unreachable)();
                }
                let thumb = undefined;
                if (params?.thumbnail) {
                    thumb = await this.#c.fileManager.upload(params.thumbnail, { chunkSize: params?.chunkSize, signal: params?.signal });
                }
                media = { _: "inputMediaUploadedDocument", file, thumb, spoiler, attributes: [{ _: "documentAttributeFilename", file_name: file.name }, ...otherAttribs], mime_type: mimeType, force_file: fileType === _3_types_js_2.FileType.Document ? true : undefined, ttl_seconds };
            }
        }
        const message = await this.#sendMedia(chatId, media, params);
        return message;
    }
    async sendDocument(chatId, document, params) {
        this.#checkParams(params);
        const message = await this.#sendDocumentInner(chatId, document, params, _3_types_js_2.FileType.Document, []);
        return (0, _3_types_js_2.assertMessageType)(message, "document");
    }
    async sendSticker(chatId, sticker, params) {
        this.#checkParams(params);
        const message = await this.#sendDocumentInner(chatId, sticker, params, _3_types_js_2.FileType.Sticker, [{ _: "documentAttributeSticker", alt: params?.emoji || "", stickerset: { _: "inputStickerSetEmpty" } }], undefined, STICKER_MIME_TYPES);
        return (0, _3_types_js_2.assertMessageType)(message, "sticker");
    }
    async sendPhoto(chatId, photo, params) {
        this.#checkParams(params);
        let media = null;
        const spoiler = params?.hasSpoiler ? true : undefined;
        const ttl_seconds = params && "selfDestruct" in params && params.selfDestruct !== undefined ? (0, _3_types_js_1.selfDestructOptionToInt)(params.selfDestruct) : undefined;
        if (typeof photo === "string") {
            const fileId = this.resolveFileId(photo, [_3_types_js_2.FileType.Photo, _3_types_js_2.FileType.ProfilePhoto]);
            if (fileId !== null) {
                media = { _: "inputMediaPhoto", id: { ...fileId, _: "inputPhoto" }, spoiler, ttl_seconds };
            }
        }
        if (media === null) {
            if (typeof photo === "string" && (0, _0_utilities_js_1.isHttpUrl)(photo)) {
                media = { _: "inputMediaPhotoExternal", url: photo, spoiler, ttl_seconds: (params && "selfDestruct" in params && params.selfDestruct !== undefined) ? (0, _3_types_js_1.selfDestructOptionToInt)(params.selfDestruct) : undefined };
            }
            else {
                const file = await this.#c.fileManager.upload(photo, params, null, false);
                media = { _: "inputMediaUploadedPhoto", file, spoiler, ttl_seconds: (params && "selfDestruct" in params && params.selfDestruct !== undefined) ? (0, _3_types_js_1.selfDestructOptionToInt)(params.selfDestruct) : undefined };
            }
        }
        const message = await this.#sendMedia(chatId, media, params);
        return (0, _3_types_js_2.assertMessageType)(message, "photo");
    }
    async #sendMedia(chatId, media, params) {
        if (params?.starCount !== undefined) {
            if (params.starCount <= 0) {
                throw new _0_errors_js_1.InputError("starCount cannot be zero or negative");
            }
            media = { _: "inputMediaPaidMedia", stars_amount: BigInt(params.starCount), extended_media: [media] };
        }
        const peer = await this.#c.getInputPeer(chatId);
        const randomId = (0, _1_utilities_js_1.getRandomId)();
        const silent = params?.disableNotification ? true : undefined;
        const noforwards = params?.protectContent ? true : undefined;
        const sendAs = params?.sendAs ? await this.#c.getInputPeer(params.sendAs) : undefined;
        const replyMarkup = await this.#constructReplyMarkup(params);
        const caption_ = params?.caption;
        const parseResult = caption_ !== undefined ? await this.parseText(caption_, { parseMode: params?.parseMode, entities: params?.captionEntities }) : undefined;
        const caption = parseResult === undefined ? undefined : parseResult[0];
        const captionEntities = parseResult === undefined ? undefined : parseResult[1];
        const result = await this.#c.invoke({
            _: "messages.sendMedia",
            peer,
            random_id: randomId,
            silent,
            noforwards,
            reply_markup: replyMarkup,
            reply_to: await this.#constructReplyTo(params),
            send_as: sendAs,
            media,
            message: caption ?? "",
            entities: captionEntities,
            effect: params?.effectId ? BigInt(params.effectId) : undefined,
            schedule_date: params?.sendAt,
            allow_paid_floodskip: params?.paidBroadcast ? true : undefined,
        }, { businessConnectionId: params?.businessConnectionId });
        return (await this.updatesToMessages(chatId, result, params?.businessConnectionId))[0];
    }
    resolveFileId(maybeFileId, expectedFileType) {
        expectedFileType = Array.isArray(expectedFileType) ? expectedFileType : [expectedFileType];
        let fileId = null;
        try {
            fileId = (0, _3_types_js_1.deserializeFileId)(maybeFileId);
        }
        catch (err) {
            this.#LresolveFileId.warning(err);
        }
        if (fileId !== null) {
            if (!expectedFileType.includes(fileId.type)) {
                (0, _0_deps_js_1.unreachable)();
            }
            return {
                id: "id" in fileId.location ? fileId.location.id : (0, _0_deps_js_1.unreachable)(),
                access_hash: fileId.location.accessHash,
                file_reference: fileId.fileReference ?? new Uint8Array(),
            };
        }
        return null;
    }
    async sendPoll(chatId, question, options, params) {
        this.#checkParams(params);
        question = question?.trim();
        if (!question) {
            throw new Error("Question must not be empty.");
        }
        if (!Array.isArray(options) || options.length < 2) {
            throw new Error("There must be at least two options.");
        }
        const peer = await this.#c.getInputPeer(chatId);
        const randomId = (0, _1_utilities_js_1.getRandomId)();
        const silent = params?.disableNotification ? true : undefined;
        const noforwards = params?.protectContent ? true : undefined;
        const sendAs = params?.sendAs ? await this.#c.getInputPeer(params.sendAs) : undefined;
        const replyMarkup = await this.#constructReplyMarkup(params);
        const explanation = params?.explanation;
        const parseResult = explanation !== undefined ? await this.parseText(explanation, { parseMode: params?.explanationParseMode, entities: params?.explanationEntities }) : undefined;
        const solution = parseResult === undefined ? undefined : parseResult[0];
        const solutionEntities = parseResult === undefined ? undefined : parseResult[1];
        const answers = await Promise.all(options.map(async (v, i) => {
            const text = typeof v === "string" ? v : v.text;
            const entities = typeof v === "string" ? [] : v.entities;
            const parseResult = await this.parseText(text, { parseMode: params?.optionParseMode, entities: entities });
            return ({ _: "pollAnswer", option: (0, _1_utilities_js_1.encodeText)(String(i)), text: { _: "textWithEntities", text: parseResult[0], entities: parseResult[1] ?? [] } });
        }));
        const questionParseResult = await this.parseText(question, { parseMode: params?.questionParseMode, entities: params?.questionEntities });
        const poll = { _: "poll", id: (0, _1_utilities_js_1.getRandomId)(), answers, question: { _: "textWithEntities", text: questionParseResult[0], entities: questionParseResult[1] ?? [] }, closed: params?.isClosed ? true : undefined, close_date: params?.closeDate, close_period: params?.openPeriod ? params.openPeriod : undefined, multiple_choice: params?.allowMultipleAnswers ? true : undefined, public_voters: params?.isAnonymous === false ? true : undefined, quiz: params?.type === "quiz" ? true : undefined };
        const media = { _: "inputMediaPoll", poll, correct_answers: params?.correctOptionIndex !== undefined ? [(0, _1_utilities_js_1.encodeText)(String(params.correctOptionIndex))] : undefined, solution, solution_entities: solutionEntities };
        const result = await this.#c.invoke({
            _: "messages.sendMedia",
            peer,
            random_id: randomId,
            silent,
            noforwards,
            reply_markup: replyMarkup,
            reply_to: await this.#constructReplyTo(params),
            send_as: sendAs,
            media,
            message: "",
            effect: params?.effectId ? BigInt(params.effectId) : undefined,
            schedule_date: params?.sendAt,
            allow_paid_floodskip: params?.paidBroadcast ? true : undefined,
        }, { businessConnectionId: params?.businessConnectionId });
        const message = (await this.updatesToMessages(chatId, result, params?.businessConnectionId))[0];
        return (0, _3_types_js_2.assertMessageType)(message, "poll");
    }
    async editMessageReplyMarkup(chatId, messageId, params) {
        this.#checkParams(params);
        const result = await this.#c.invoke({
            _: "messages.editMessage",
            id: (0, _0_utilities_js_1.checkMessageId)(messageId),
            peer: await this.#c.getInputPeer(chatId),
            reply_markup: await this.#constructReplyMarkup(params),
        }, { businessConnectionId: params?.businessConnectionId });
        const message_ = (await this.updatesToMessages(chatId, result))[0];
        return message_;
    }
    async editInlineMessageReplyMarkup(inlineMessageId, params) {
        const id = await (0, _3_types_js_2.deserializeInlineMessageId)(inlineMessageId);
        await this.#c.invoke({
            _: "messages.editInlineBotMessage",
            id,
            reply_markup: await this.#constructReplyMarkup(params),
        }, { dc: (0, _3_transport_js_1.getDc)(id.dc_id) });
    }
    async editMessageText(chatId, messageId, text, params) {
        this.#checkParams(params);
        {
            const message = await this.getMessage(chatId, messageId);
            if (!message) {
                throw new _0_errors_js_1.InputError("Message not found.");
            }
            if (!(0, _3_types_js_1.isMessageType)(message, "link") && !(0, _3_types_js_1.isMessageType)(message, "text")) {
                throw new _0_errors_js_1.InputError("The referenced message is not a text message.");
            }
        }
        const [message, entities] = await this.parseText(text, params);
        if (!message) {
            throw new _0_errors_js_1.InputError("Message text cannot be empty.");
        }
        if (params?.linkPreview && params.linkPreview.type !== "input") {
            throw new _0_errors_js_1.InputError("Expected link preview of type input.");
        }
        const noWebpage = params?.linkPreview && params.linkPreview.type === "input" && params.linkPreview.disable ? true : undefined;
        const invertMedia = params?.linkPreview?.isAboveText ? true : undefined;
        let media = undefined;
        if (!noWebpage && params?.linkPreview?.url) {
            media = { _: "inputMediaWebPage", url: params.linkPreview.url, force_large_media: params.linkPreview.mediaSize === "large" ? true : undefined, force_small_media: params.linkPreview.mediaSize === "small" ? true : undefined, optional: message.length ? undefined : true };
        }
        const result = await this.#c.invoke({
            _: "messages.editMessage",
            id: (0, _0_utilities_js_1.checkMessageId)(messageId),
            peer: await this.#c.getInputPeer(chatId),
            entities,
            message,
            media,
            no_webpage: noWebpage,
            invert_media: invertMedia,
            reply_markup: await this.#constructReplyMarkup(params),
        }, { businessConnectionId: params?.businessConnectionId });
        const message_ = (await this.updatesToMessages(chatId, result))[0];
        return (0, _3_types_js_2.assertMessageType)(message_, "text");
    }
    static #CAPTIONABLE_MESSAGE_TYPES = ["photo", "document", "video", "animation", "voice", "audio", "video"];
    async editMessageCaption(chatId, messageId, params) {
        let canHaveCaption = false;
        const message_ = await this.getMessage(chatId, messageId);
        if (!message_) {
            throw new _0_errors_js_1.InputError("Message not found.");
        }
        for (const type of MessageManager.#CAPTIONABLE_MESSAGE_TYPES) {
            if ((0, _3_types_js_1.isMessageType)(message_, type)) {
                canHaveCaption = true;
            }
        }
        if (!canHaveCaption) {
            throw new _0_errors_js_1.InputError("The referenced message cannot have a caption.");
        }
        const [message, entities] = await this.parseText(params?.caption ?? "", params);
        const result = await this.#c.invoke({
            _: "messages.editMessage",
            id: (0, _0_utilities_js_1.checkMessageId)(messageId),
            peer: await this.#c.getInputPeer(chatId),
            entities: message ? entities : [],
            message,
            reply_markup: await this.#constructReplyMarkup(params),
        }, { businessConnectionId: params?.businessConnectionId });
        return (await this.updatesToMessages(chatId, result))[0];
    }
    async #editInlineMessageTextInner(inlineMessageId, text, params, allowEmpty = true) {
        this.#checkParams(params);
        const [message, entities] = await this.parseText(text, params);
        if (!allowEmpty && !message) {
            throw new _0_errors_js_1.InputError("Message text cannot be empty.");
        }
        const id = await (0, _3_types_js_2.deserializeInlineMessageId)(inlineMessageId);
        if (params?.linkPreview && params.linkPreview.type !== "input") {
            throw new _0_errors_js_1.InputError("Expected link preview of type input.");
        }
        const noWebpage = params?.linkPreview && params.linkPreview.type === "input" && params.linkPreview.disable ? true : undefined;
        const invertMedia = params?.linkPreview?.isAboveText ? true : undefined;
        let media = undefined;
        if (!noWebpage && params?.linkPreview?.url) {
            media = { _: "inputMediaWebPage", url: params.linkPreview.url, force_large_media: params.linkPreview.mediaSize === "large" ? true : undefined, force_small_media: params.linkPreview.mediaSize === "small" ? true : undefined, optional: message.length ? undefined : true };
        }
        await this.#c.invoke({
            _: "messages.editInlineBotMessage",
            id,
            entities,
            message,
            media,
            no_webpage: noWebpage,
            invert_media: invertMedia,
            reply_markup: await this.#constructReplyMarkup(params),
        }, { dc: (0, _3_transport_js_1.getDc)(id.dc_id) });
    }
    async editInlineMessageText(inlineMessageId, text, params) {
        await this.#editInlineMessageTextInner(inlineMessageId, text, params, false);
    }
    async editInlineMessageCaption(inlineMessageId, params) {
        await this.#editInlineMessageTextInner(inlineMessageId, params?.caption ?? "", params);
    }
    async #resolveInputMediaInner(document, media, fileType, otherAttribs) {
        let media_ = null;
        const spoiler = "hasSpoiler" in media && media.hasSpoiler ? true : undefined;
        if (typeof document === "string") {
            const fileId = this.resolveFileId(document, fileType);
            if (fileId !== null) {
                media_ = { _: "inputMediaDocument", id: { ...fileId, _: "inputDocument" }, spoiler, query: otherAttribs.find((v) => _2_tl_js_1.Api.is("documentAttributeSticker", v))?.alt || undefined };
            }
        }
        if (media_ === null) {
            if (typeof document === "string" && (0, _0_utilities_js_1.isHttpUrl)(document)) {
                media_ = { _: "inputMediaDocumentExternal", url: document, spoiler };
            }
            else {
                let mimeType;
                const file = await this.#c.fileManager.upload(document, media, (name) => {
                    mimeType = media?.mimeType ?? (0, _0_deps_js_1.contentType)(name.split(".").slice(-1)[0]) ?? FALLBACK_MIME_TYPE;
                    if (name.endsWith(".tgs") && fileType === _3_types_js_2.FileType.Document) {
                        name += "-";
                    }
                    return name;
                });
                if (_2_tl_js_1.Api.is("inputFileStoryDocument", file)) {
                    (0, _0_deps_js_1.unreachable)();
                }
                let thumb = undefined;
                if ("thumbnail" in media && media.thumbnail) {
                    thumb = await this.#c.fileManager.upload(media.thumbnail, { chunkSize: media?.chunkSize, signal: media?.signal });
                }
                media_ = { _: "inputMediaUploadedDocument", file, thumb, spoiler, attributes: [{ _: "documentAttributeFilename", file_name: file.name }, ...otherAttribs], mime_type: mimeType, force_file: fileType === _3_types_js_2.FileType.Document ? true : undefined };
            }
        }
        return media_;
    }
    async #resolveInputMedia(media) {
        if ("animation" in media) {
            return await this.#resolveInputMediaInner(media.animation, media, _3_types_js_2.FileType.Animation, [
                { _: "documentAttributeAnimated" },
                { _: "documentAttributeVideo", supports_streaming: true, w: media?.width ?? 0, h: media?.height ?? 0, duration: media?.duration ?? 0 },
            ]);
        }
        else if ("audio" in media) {
            return await this.#resolveInputMediaInner(media.audio, media, _3_types_js_2.FileType.Audio, [
                { _: "documentAttributeAudio", duration: media?.duration ?? 0, performer: media?.performer, title: media?.title },
            ]);
        }
        else if ("document" in media) {
            return await this.#resolveInputMediaInner(media.document, media, _3_types_js_2.FileType.Document, []);
        }
        else if ("photo" in media) {
            let media_ = null;
            const spoiler = media.hasSpoiler ? true : undefined;
            const ttl_seconds = "selfDestruct" in media && media.selfDestruct !== undefined ? (0, _3_types_js_1.selfDestructOptionToInt)(media.selfDestruct) : undefined;
            if (typeof media.photo === "string") {
                const fileId = this.resolveFileId(media.photo, [_3_types_js_2.FileType.Photo, _3_types_js_2.FileType.ProfilePhoto]);
                if (fileId !== null) {
                    media_ = { _: "inputMediaPhoto", id: { ...fileId, _: "inputPhoto" }, spoiler, ttl_seconds };
                }
            }
            if (media_ === null) {
                if (typeof media.photo === "string" && (0, _0_utilities_js_1.isHttpUrl)(media.photo)) {
                    media_ = { _: "inputMediaPhotoExternal", url: media.photo, spoiler };
                }
                else {
                    const file = await this.#c.fileManager.upload(media.photo, media, null, false);
                    media_ = { _: "inputMediaUploadedPhoto", file, spoiler, ttl_seconds };
                }
            }
            return media_;
        }
        else if ("video" in media) {
            const ttl_seconds = "selfDestruct" in media && media.selfDestruct !== undefined ? (0, _3_types_js_1.selfDestructOptionToInt)(media.selfDestruct) : undefined;
            const media_ = await this.#resolveInputMediaInner(media.video, media, _3_types_js_2.FileType.Video, [
                { _: "documentAttributeVideo", supports_streaming: media?.supportsStreaming ? true : undefined, w: media?.width ?? 0, h: media?.height ?? 0, duration: media?.duration ?? 0 },
            ]);
            media_.ttl_seconds = ttl_seconds;
            return media_;
        }
        else {
            (0, _0_deps_js_1.unreachable)();
        }
    }
    async #resolveInputMediaUpload(media, businessConnectionId) {
        const inputMedia = await this.#resolveInputMedia(media);
        if (_2_tl_js_1.Api.is("inputMediaUploadedPhoto", inputMedia) || _2_tl_js_1.Api.is("inputMediaUploadedDocument", inputMedia)) {
            const messageMedia = await this.#c.invoke({
                _: "messages.uploadMedia",
                peer: { _: "inputPeerSelf" },
                media: inputMedia,
                business_connection_id: businessConnectionId,
            });
            if (("photo" in messageMedia) && _2_tl_js_1.Api.is("photo", messageMedia.photo)) {
                return {
                    _: "inputMediaPhoto",
                    id: {
                        _: "inputPhoto",
                        id: messageMedia.photo.id,
                        access_hash: messageMedia.photo.access_hash,
                        file_reference: messageMedia.photo.file_reference,
                    },
                    spoiler: "hasSpoiler" in media && media.hasSpoiler ? true : undefined,
                };
            }
            else if ("document" in messageMedia && _2_tl_js_1.Api.is("document", messageMedia.document)) {
                return {
                    _: "inputMediaDocument",
                    id: { _: "inputDocument", id: messageMedia.document.id, access_hash: messageMedia.document.access_hash, file_reference: messageMedia.document.file_reference },
                    spoiler: "hasSpoiler" in media && media.hasSpoiler ? true : undefined,
                };
            }
            else {
                (0, _0_deps_js_1.unreachable)();
            }
        }
        return inputMedia;
    }
    async editMessageMedia(chatId, messageId, media, params) {
        this.#checkParams(params);
        const message = await this.getMessage(chatId, messageId);
        if (!message) {
            throw new _0_errors_js_1.InputError("Message not found.");
        }
        if (!("animation" in message) && !("audio" in message) && !("document" in message) && !("photo" in message) && !("video" in message)) {
            throw new _0_errors_js_1.InputError("Unexpected message type.");
        }
        const [text, entities] = media.caption !== undefined ? await this.parseText(media.caption, { entities: media.captionEntities, parseMode: media.parseMode }) : ["", []];
        const result = await this.#c.invoke({
            _: "messages.editMessage",
            peer: await this.#c.getInputPeer(chatId),
            id: messageId,
            media: await this.#resolveInputMedia(media),
            reply_markup: await this.#constructReplyMarkup(params),
            message: text,
            entities,
        }, { businessConnectionId: params?.businessConnectionId });
        const message_ = (await this.updatesToMessages(chatId, result))[0];
        return message_;
    }
    async editInlineMessageMedia(inlineMessageId, media, params) {
        this.#checkParams(params);
        this.#c.storage.assertBot("editInlineMessageMedia");
        const id = await (0, _3_types_js_2.deserializeInlineMessageId)(inlineMessageId);
        await this.#c.invoke({
            _: "messages.editInlineBotMessage",
            id,
            media: await this.#resolveInputMediaUpload(media),
            reply_markup: await this.#constructReplyMarkup(params),
        }, { dc: (0, _3_transport_js_1.getDc)(id.dc_id) });
    }
    async deleteMessages(chatId, messageIds, params) {
        (0, _0_utilities_js_1.checkArray)(messageIds, _0_utilities_js_1.checkMessageId);
        const peer = await this.#c.getInputPeer(chatId);
        if ((0, _0_utilities_js_1.canBeInputChannel)(peer)) {
            await this.#c.invoke({ _: "channels.deleteMessages", channel: (0, _0_utilities_js_1.toInputChannel)(peer), id: messageIds });
        }
        else {
            await this.#c.invoke({ _: "messages.deleteMessages", id: messageIds, revoke: params?.onlyForMe ? undefined : true });
        }
    }
    async deleteScheduledMessages(chatId, messageIds) {
        this.#c.storage.assertUser("sendScheduledMessage");
        (0, _0_utilities_js_1.checkArray)(messageIds, _0_utilities_js_1.checkMessageId);
        const peer = await this.#c.getInputPeer(chatId);
        await this.#c.invoke({ _: "messages.deleteScheduledMessages", peer, id: messageIds });
    }
    async deleteScheduledMessage(chatId, messageId) {
        this.#c.storage.assertUser("deleteScheduledMessage");
        return await this.deleteScheduledMessages(chatId, [messageId]);
    }
    async sendScheduledMessages(chatId, messageIds) {
        this.#c.storage.assertUser("sendScheduledMessages");
        (0, _0_utilities_js_1.checkArray)(messageIds, _0_utilities_js_1.checkMessageId);
        const peer = await this.#c.getInputPeer(chatId);
        const result = await this.#c.invoke({ _: "messages.sendScheduledMessages", peer, id: messageIds });
        return await this.updatesToMessages(chatId, result);
    }
    async sendScheduledMessage(chatId, messageId) {
        this.#c.storage.assertUser("sendScheduledMessage");
        return (await this.sendScheduledMessages(chatId, [messageId]))[0];
    }
    async deleteChatMemberMessages(chatId, memberId) {
        this.#c.storage.assertUser("deleteChatMemberMessages");
        const channel = await this.#c.getInputChannel(chatId);
        const participant = await this.#c.getInputPeer(memberId);
        await this.#c.invoke({ _: "channels.deleteParticipantHistory", channel, participant });
    }
    async pinMessage(chatId, messageId, params) {
        this.#checkParams(params);
        await this.#c.invoke({ _: "messages.updatePinnedMessage", peer: await this.#c.getInputPeer(chatId), id: (0, _0_utilities_js_1.checkMessageId)(messageId), silent: params?.disableNotification ? true : undefined, pm_oneside: params?.bothSides ? undefined : true });
    }
    async unpinMessage(chatId, messageId, params) {
        this.#checkParams(params);
        await this.#c.invoke({ _: "messages.updatePinnedMessage", peer: await this.#c.getInputPeer(chatId), id: (0, _0_utilities_js_1.checkMessageId)(messageId), unpin: true }, { businessConnectionId: params?.businessConnectionId });
    }
    async unpinMessages(chatId) {
        await this.#c.invoke({ _: "messages.unpinAllMessages", peer: await this.#c.getInputPeer(chatId) });
    }
    async #sendReaction(chatId, messageId, reactions, params) {
        await this.#c.invoke({ _: "messages.sendReaction", peer: await this.#c.getInputPeer(chatId), msg_id: (0, _0_utilities_js_1.checkMessageId)(messageId), reaction: reactions.map((v) => (0, _3_types_js_2.reactionToTlObject)(v)), big: params?.big ? true : undefined, add_to_recent: params?.addToRecents ? true : undefined });
    }
    async setReactions(chatId, messageId, reactions, params) {
        await this.#sendReaction(chatId, messageId, reactions, params);
    }
    async addReaction(chatId, messageId, reaction, params) {
        const message = await this.getMessage(chatId, messageId);
        if (!message) {
            throw new _0_errors_js_1.InputError("Message not found.");
        }
        const chosenReactions = (message.reactions ?? []).filter((v) => v.chosen);
        for (const r of chosenReactions) {
            if ((0, _3_types_js_2.reactionEqual)(r.reaction, reaction)) {
                return;
            }
        }
        const reactions = [reaction, ...chosenReactions.map((v) => v.reaction)];
        await this.setReactions(chatId, messageId, reactions, params);
    }
    async removeReaction(chatId, messageId, reaction) {
        const message = await this.getMessage(chatId, messageId);
        if (!message) {
            throw new _0_errors_js_1.InputError("Message not found.");
        }
        const chosenReactions = (message.reactions ?? []).filter((v) => v.chosen);
        for (const r of chosenReactions) {
            if ((0, _3_types_js_2.reactionEqual)(r.reaction, reaction)) {
                const reactions = chosenReactions.filter((v) => v !== r).map((v) => v.reaction);
                await this.setReactions(chatId, messageId, reactions);
                break;
            }
        }
    }
    canHandleUpdate(update) {
        return _2_tl_js_1.Api.isOneOf(messageManagerUpdates, update);
    }
    async handleUpdate(update) {
        if (_2_tl_js_1.Api.is("updateNewMessage", update) || _2_tl_js_1.Api.is("updateNewChannelMessage", update) || _2_tl_js_1.Api.is("updateEditMessage", update) || _2_tl_js_1.Api.is("updateEditChannelMessage", update)) {
            if (_2_tl_js_1.Api.is("message", update.message) || _2_tl_js_1.Api.is("messageService", update.message)) {
                const chatId = _2_tl_js_1.Api.peerToChatId(update.message.peer_id);
                await this.#c.messageStorage.setMessage(chatId, update.message.id, update.message);
            }
        }
        if (_2_tl_js_1.Api.isOneOf([
            "updateNewMessage",
            "updateNewChannelMessage",
            "updateEditMessage",
            "updateEditChannelMessage",
            "updateBotNewBusinessMessage",
            "updateBotEditBusinessMessage",
            "updateNewScheduledMessage",
        ], update)) {
            if (!(_2_tl_js_1.Api.is("messageEmpty", update.message))) {
                const isOutgoing = update.message.out;
                let shouldIgnore = false;
                if (isOutgoing) {
                    if ("connection_id" in update && update.connection_id === "") {
                        shouldIgnore = true;
                    }
                    else {
                        shouldIgnore = !this.#c.outgoingMessages;
                    }
                }
                if (!shouldIgnore) {
                    const business = "connection_id" in update ? { connectionId: update.connection_id, replyToMessage: update.reply_to_message } : undefined;
                    const message = await this.constructMessage(update.message, undefined, business);
                    if (_2_tl_js_1.Api.is("updateNewMessage", update) || _2_tl_js_1.Api.is("updateNewChannelMessage", update) || _2_tl_js_1.Api.is("updateBotNewBusinessMessage", update)) {
                        return { message };
                    }
                    else if (_2_tl_js_1.Api.is("updateNewScheduledMessage", update)) {
                        message.scheduled = true;
                        return { scheduledMessage: message };
                    }
                    else {
                        return { editedMessage: message };
                    }
                }
            }
        }
        if (_2_tl_js_1.Api.is("updateDeleteMessages", update)) {
            const deletedMessages = new Array();
            for (const messageId of update.messages) {
                const chatId = await this.#c.messageStorage.getMessageChat(messageId);
                if (chatId) {
                    deletedMessages.push({ chatId, messageId });
                }
            }
            if (deletedMessages.length > 0) {
                return { deletedMessages };
            }
        }
        else if (_2_tl_js_1.Api.is("updateDeleteChannelMessages", update)) {
            const chatId = _2_tl_js_1.Api.getChannelChatId(update.channel_id);
            const deletedMessages = new Array();
            for (const messageId of update.messages) {
                const message = await this.#c.messageStorage.getMessage(chatId, messageId);
                if (message !== null) {
                    deletedMessages.push({ chatId, messageId });
                }
            }
            return { deletedMessages };
        }
        else if (_2_tl_js_1.Api.is("updateDeleteScheduledMessages", update)) {
            const chatId = _2_tl_js_1.Api.peerToChatId(update.peer);
            const deletedMessages = update.messages.map((v) => ({ chatId, messageId: v }));
            return { deletedMessages, isScheduled: true };
        }
        else if (_2_tl_js_1.Api.is("updateBotDeleteBusinessMessage", update)) {
            const chatId = _2_tl_js_1.Api.peerToChatId(update.peer);
            const deletedMessages = update.messages.map((v) => ({ chatId, messageId: v }));
            return { deletedMessages, businessConnectionId: update.connection_id };
        }
        if (_2_tl_js_1.Api.is("updateTranscribedAudio", update)) {
            const voiceTranscription = (0, _3_types_js_1.constructVoiceTranscription)(update);
            await this.#c.messageStorage.setVoiceTranscription(voiceTranscription);
            return { voiceTranscription };
        }
        return null;
    }
    async sendChatAction(chatId, action, params) {
        this.#checkParams(params);
        let action_;
        switch (action) {
            case "type":
                action_ = { _: "sendMessageTypingAction" };
                break;
            case "uploadPhoto":
                action_ = { _: "sendMessageUploadPhotoAction", progress: 0 };
                break;
            case "recordVideo":
                action_ = { _: "sendMessageRecordVideoAction" };
                break;
            case "uploadVideo":
                action_ = { _: "sendMessageRecordVideoAction" };
                break;
            case "recordVoice":
                action_ = { _: "sendMessageRecordAudioAction" };
                break;
            case "uploadAudio":
                action_ = { _: "sendMessageUploadAudioAction", progress: 0 };
                break;
            case "uploadDocument":
                action_ = { _: "sendMessageUploadDocumentAction", progress: 0 };
                break;
            case "chooseSticker":
                action_ = { _: "sendMessageChooseStickerAction" };
                break;
            case "findLocation":
                action_ = { _: "sendMessageGeoLocationAction" };
                break;
            case "recordVideoNote":
                action_ = { _: "sendMessageRecordRoundAction" };
                break;
            case "uploadVideoNote":
                action_ = { _: "sendMessageUploadRoundAction", progress: 0 };
                break;
            default:
                throw new _0_errors_js_1.InputError(`Invalid chat action: ${action}`);
        }
        await this.#c.invoke({ _: "messages.setTyping", peer: await this.#c.getInputPeer(chatId), action: action_, top_msg_id: params?.messageThreadId }, { businessConnectionId: params?.businessConnectionId });
    }
    async searchMessages(params) {
        this.#c.storage.assertUser("searchMessages");
        const peer = params?.chatId === undefined ? { _: "inputPeerEmpty" } : await this.#c.getInputPeer(params.chatId);
        const query = params?.query ?? "";
        const result = await this.#c.invoke({
            _: "messages.search",
            peer,
            q: query,
            add_offset: params?.addOffset ?? 0,
            filter: (0, _0_message_search_filter_js_1.messageSearchFilterToTlObject)(params?.filter ?? "empty"),
            hash: 0n,
            limit: (0, _0_utilities_js_1.getLimit)(params?.limit),
            max_date: 0,
            max_id: 0,
            min_date: 0,
            min_id: 0,
            offset_id: params?.offset ? params.offset : 0,
            from_id: params?.from ? await this.#c.getInputPeer(params.from) : undefined,
        });
        if (!("messages" in result)) {
            (0, _0_deps_js_1.unreachable)();
        }
        const messages = new Array();
        for (const message_ of result.messages) {
            const message = await this.constructMessage(message_, false);
            messages.push(message);
        }
        return messages;
    }
    async blockUser(userId) {
        this.#c.storage.assertUser("blockUser");
        const id = await this.#c.getInputPeer(userId);
        await this.#c.invoke({ _: "contacts.block", id });
    }
    async unblockUser(userId) {
        this.#c.storage.assertUser("unblockUser");
        const id = await this.#c.getInputPeer(userId);
        await this.#c.invoke({ _: "contacts.unblock", id });
    }
    async setChatStickerSet(chatId, setName) {
        const channel = await this.#c.getInputChannel(chatId);
        await this.#c.invoke({ _: "channels.setStickers", channel, stickerset: { _: "inputStickerSetShortName", short_name: setName } });
    }
    async deleteChatStickerSet(chatId) {
        const channel = await this.#c.getInputChannel(chatId);
        await this.#c.invoke({ _: "channels.setStickers", channel, stickerset: { _: "inputStickerSetEmpty" } });
    }
    async stopPoll(chatId, messageId, params) {
        this.#checkParams(params);
        const message = await this.getMessage(chatId, messageId);
        if (!message) {
            throw new _0_errors_js_1.InputError("Message not found.");
        }
        if (!("poll" in message)) {
            throw new _0_errors_js_1.InputError("Message is not a poll.");
        }
        if (message.poll.isClosed) {
            throw new _0_errors_js_1.InputError("Poll is already stopped.");
        }
        const result = await this.#c.invoke({
            _: "messages.editMessage",
            peer: await this.#c.getInputPeer(chatId),
            id: messageId,
            media: ({ _: "inputMediaPoll", poll: ({ _: "poll", id: BigInt(message.poll.id), closed: true, question: { _: "textWithEntities", text: "", entities: [] }, answers: [] }) }),
            reply_markup: await this.#constructReplyMarkup(params),
        }, { businessConnectionId: params?.businessConnectionId });
        const message_ = (await this.updatesToMessages(chatId, result))[0];
        return (0, _3_types_js_2.assertMessageType)(message_, "poll").poll;
    }
    async editMessageLiveLocation(chatId, messageId, latitude, longitude, params) {
        this.#checkParams(params);
        const message = await this.getMessage(chatId, messageId);
        if (message && "location" in message && message.location.livePeriod) {
            const result = await this.#c.invoke({
                _: "messages.editMessage",
                peer: await this.#c.getInputPeer(chatId),
                id: messageId,
                media: ({ _: "inputMediaGeoLive", geo_point: ({ _: "inputGeoPoint", lat: latitude, long: longitude, accuracy_radius: params?.horizontalAccuracy }), heading: params?.heading, proximity_notification_radius: params?.proximityAlertRadius }),
                reply_markup: await this.#constructReplyMarkup(params),
            }, { businessConnectionId: params?.businessConnectionId });
            const message = (await this.updatesToMessages(chatId, result))[0];
            return (0, _3_types_js_2.assertMessageType)(message, "location");
        }
        (0, _0_deps_js_1.unreachable)();
    }
    async editInlineMessageLiveLocation(inlineMessageId, latitude, longitude, params) {
        this.#checkParams(params);
        this.#c.storage.assertBot("editInlineMessageLiveLocation");
        const id = await (0, _3_types_js_2.deserializeInlineMessageId)(inlineMessageId);
        await this.#c.invoke({
            _: "messages.editInlineBotMessage",
            id,
            media: ({ _: "inputMediaGeoLive", geo_point: ({ _: "inputGeoPoint", lat: latitude, long: longitude, accuracy_radius: params?.horizontalAccuracy }), heading: params?.heading, proximity_notification_radius: params?.proximityAlertRadius }),
            reply_markup: await this.#constructReplyMarkup(params),
        }, { dc: (0, _3_transport_js_1.getDc)(id.dc_id) });
    }
    async sendInvoice(chatId, title, description, payload, currency, prices, params) {
        this.#c.storage.assertBot("sendInvoice");
        this.#checkParams(params);
        if (title.length < 1) {
            throw new _0_errors_js_1.InputError("Invoice title cannot be empty.");
        }
        if (description.length < 1) {
            throw new _0_errors_js_1.InputError("Invoice description cannot be empty.");
        }
        if (title.length > 32) {
            throw new _0_errors_js_1.InputError("Invoice title is too long.");
        }
        if (description.length > 255) {
            throw new _0_errors_js_1.InputError("Invoice description is too long.");
        }
        const invoice = {
            _: "invoice",
            currency,
            prices: prices.map((v) => ({ _: "labeledPrice", label: v.label, amount: BigInt(v.amount) })),
            max_tip_amount: params?.maxTipAmount ? BigInt(params.maxTipAmount) : undefined,
            suggested_tip_amounts: params?.suggestedTipAmounts?.map(BigInt),
            name_requested: params?.needName || undefined,
            phone_requested: params?.needPhoneNumber || undefined,
            email_requested: params?.needEmail || undefined,
            shipping_address_requested: params?.needShippingAddress || undefined,
            email_to_provider: params?.sendEmailToProvider || undefined,
            phone_to_provider: params?.sendPhoneNumberToProvider || undefined,
            flexible: params?.flexible || undefined,
        };
        const message = await this.#sendMedia(chatId, {
            _: "inputMediaInvoice",
            title,
            description,
            invoice,
            start_param: params?.startParameter,
            payload: (0, _1_utilities_js_1.encodeText)(payload),
            provider_data: { _: "dataJSON", data: params?.providerData ?? "null" },
            provider: params?.providerToken ?? "",
            photo: params?.photoUrl
                ? {
                    _: "inputWebDocument",
                    url: params.photoUrl,
                    size: params.photoSize ?? 0,
                    mime_type: "image/jpeg",
                    attributes: [{
                            _: "documentAttributeImageSize",
                            w: params?.photoWidth ?? 0,
                            h: params?.photoHeight ?? 0,
                        }],
                }
                : undefined,
        }, params);
        return (0, _3_types_js_2.assertMessageType)(message, "invoice");
    }
    async sendMediaGroup(chatId, media, params) {
        this.#checkParams(params);
        {
            if (!Array.isArray(media) || !media.length) {
                throw new _0_errors_js_1.InputError("Media group must not be empty.");
            }
            const firstMedia = media?.[0];
            const firstMediaType = firstMedia?.animation !== undefined ? "animation" : firstMedia?.audio !== undefined ? "audio" : firstMedia?.photo !== undefined ? "photo" : firstMedia?.video !== undefined ? "video" : "document";
            for (const media_ of media) {
                const thisMediaType = media_?.animation !== undefined ? "animation" : media_?.audio !== undefined ? "audio" : media_?.photo !== undefined ? "photo" : media_?.video !== undefined ? "video" : "document";
                if (thisMediaType === "animation") {
                    throw new _0_errors_js_1.InputError("Media groups cannot consist of animations.");
                }
                if ((firstMediaType === "video" || firstMediaType === "photo") && (thisMediaType !== "video" && thisMediaType !== "photo")) {
                    throw new _0_errors_js_1.InputError(`Media of the type ${firstMediaType} cannot be mixed with those of the type ${thisMediaType}.`);
                }
                if (firstMediaType !== "video" && firstMediaType !== "photo" && firstMediaType !== thisMediaType) {
                    throw new _0_errors_js_1.InputError(`Media of the type ${firstMediaType} cannot be mixed with other types.`);
                }
            }
        }
        const multiMedia = new Array();
        for (const v of media) {
            const randomId = (0, _1_utilities_js_1.getRandomId)();
            const [message, entities] = v.caption !== undefined ? await this.parseText(v.caption, { entities: v.captionEntities, parseMode: v.parseMode }) : ["", []];
            multiMedia.push({ _: "inputSingleMedia", message, entities, random_id: randomId, media: await this.#resolveInputMedia(v) });
        }
        const peer = await this.#c.getInputPeer(chatId);
        for (const [i, media_] of multiMedia.entries()) {
            if (_2_tl_js_1.Api.is("inputMediaUploadedPhoto", media_.media)) {
                const result = _2_tl_js_1.Api.as("messageMediaPhoto", await this.#c.invoke({ _: "messages.uploadMedia", media: media_.media, peer }));
                const photo = _2_tl_js_1.Api.as("photo", result.photo);
                multiMedia[i] = { ...media_, media: { _: "inputMediaPhoto", id: { ...photo, _: "inputPhoto" } } };
            }
            else if (_2_tl_js_1.Api.is("inputMediaUploadedDocument", media_.media)) {
                const result = _2_tl_js_1.Api.as("messageMediaDocument", await this.#c.invoke({ _: "messages.uploadMedia", media: media_.media, peer }));
                const document = _2_tl_js_1.Api.as("document", result.document);
                multiMedia[i] = { ...media_, media: { _: "inputMediaDocument", id: { ...document, _: "inputDocument" } } };
            }
        }
        const silent = params?.disableNotification ? true : undefined;
        const noforwards = params?.protectContent ? true : undefined;
        const sendAs = params?.sendAs ? await this.#c.getInputPeer(params.sendAs) : undefined;
        const result = await this.#c.invoke({
            _: "messages.sendMultiMedia",
            peer,
            multi_media: multiMedia,
            effect: params?.effectId ? BigInt(params.effectId) : undefined,
            noforwards,
            silent,
            send_as: sendAs,
            reply_to: await this.#constructReplyTo(params),
            allow_paid_floodskip: params?.paidBroadcast ? true : undefined,
        });
        return await this.updatesToMessages(chatId, result);
    }
    async readMessages(chatId, untilMessageId) {
        this.#c.storage.assertUser("readMessages");
        const peer = await this.#c.getInputPeer(chatId);
        const max_id = untilMessageId;
        await this.#c.invoke({ _: "messages.readHistory", peer, max_id });
    }
    async startBot(botId, params) {
        this.#c.storage.assertUser("startBot");
        const start_param = params?.deeplink?.trim() || "";
        if (params?.chatId !== undefined && !start_param) {
            throw new _0_errors_js_1.InputError("deeplink cannot be unspecified while chatId is specified.");
        }
        if (!params?.deeplink) {
            return await this.sendMessage(botId, "/start");
        }
        const bot = await this.#c.getInputUser(botId);
        const peer = await this.#c.getInputPeer(params?.chatId || botId);
        const result = await this.#c.invoke({ _: "messages.startBot", bot, peer, random_id: (0, _1_utilities_js_1.getRandomId)(), start_param });
        return (await this.updatesToMessages(botId, result))[0];
    }
    async transcribeVoice(chatId, messageId) {
        this.#c.storage.assertUser("transcribeVoice");
        const message = await this.getMessage(chatId, messageId);
        if (message === null) {
            throw new _0_errors_js_1.InputError("Message not found.");
        }
        if (!(0, _3_types_js_1.isMessageType)(message, "voice")) {
            throw new _0_errors_js_1.InputError("Message not voice.");
        }
        const cachedTranscription = await this.#getCachedVoiceTranscription(message);
        if (cachedTranscription) {
            return cachedTranscription;
        }
        const peer = await this.#c.getInputPeer(chatId);
        const result = await this.#c.invoke({ _: "messages.transcribeAudio", peer, msg_id: messageId });
        return await this.#cacheVoiceTranscription(message, (0, _3_types_js_1.constructVoiceTranscription)(result));
    }
    async #getCachedVoiceTranscription(message) {
        const reference = await this.#c.messageStorage.getVoiceTranscriptionReference(message.chat.id, message.id, (0, _1_utilities_js_1.fromUnixTimestamp)(message.editDate ?? message.date));
        if (!reference) {
            return null;
        }
        const voiceTranscription = await this.#c.messageStorage.getVoiceTranscription(reference);
        if (!voiceTranscription || !voiceTranscription.done) {
            return null;
        }
        return voiceTranscription;
    }
    async #cacheVoiceTranscription(message, voiceTranscription) {
        await this.#c.messageStorage.setVoiceTranscriptionReference(message.chat.id, message.id, (0, _1_utilities_js_1.fromUnixTimestamp)(message.editDate ?? message.date), BigInt(voiceTranscription.id));
        await this.#c.messageStorage.setVoiceTranscription(voiceTranscription);
        return voiceTranscription;
    }
    async resolveMessageLink(link) {
        const parseResult = MessageManager.parseMessageLink(link);
        if (parseResult === null) {
            throw new _0_errors_js_1.InputError("Invalid messsage link.");
        }
        const [chatId, messageId] = parseResult;
        return await this.getMessage(chatId, messageId);
    }
    static parseMessageLink(link) {
        let url;
        try {
            url = new URL(link);
        }
        catch (err) {
            if (err instanceof TypeError) {
                try {
                    url = new URL("https://" + link);
                }
                catch (err) {
                    if (err instanceof TypeError) {
                        return null;
                    }
                    else {
                        throw err;
                    }
                }
            }
            else {
                throw err;
            }
        }
        if (url.protocol !== "http:" && url.protocol !== "https:") {
            return null;
        }
        if (url.host !== "t.me") {
            return null;
        }
        const parts = url.pathname.split("/").filter((v) => v);
        if (parts.length < 2) {
            return null;
        }
        if (!isNaN(Number(parts[0]))) {
            return null;
        }
        let peer, id;
        if (parts[0] === "c") {
            if (parts.length < 3 || parts.length > 4) {
                return null;
            }
            [peer, id] = [Number(parts[1]), Number(parts[parts.length - 1])];
            if (isNaN(peer)) {
                return null;
            }
            if (isNaN(Number(parts[2]))) {
                return null;
            }
            peer = _2_tl_js_1.Api.getChannelChatId(BigInt(peer));
        }
        else {
            if (parts.length > 3) {
                return null;
            }
            [peer, id] = [parts[0], Number(parts[parts.length - 1])];
            if (isNaN(Number(parts[1]))) {
                return null;
            }
        }
        if (isNaN(id)) {
            return null;
        }
        if (typeof peer === "string") {
            try {
                if ((0, _0_utilities_js_1.getUsername)(peer) !== peer) {
                    return null;
                }
            }
            catch (err) {
                if (err instanceof _0_errors_js_1.InputError) {
                    return null;
                }
                else {
                    throw err;
                }
            }
        }
        return [peer, id];
    }
    async getStickerSet(name) {
        if (name.includes("/")) {
            let valid = false;
            try {
                const url = new URL(name);
                const pathname = "/addstickers/";
                valid = (url.protocol === "http:" || url.protocol === "https:") && url.hostname === "t.me" && url.pathname.startsWith(pathname) && url.pathname.length > _3_errors_js_1.PackShortNameInvalid.length;
                if (valid) {
                    name = url.pathname.slice(pathname.length);
                    if (name.endsWith("/")) {
                        name = name.slice(0, -1);
                        if (name === "") {
                            valid = false;
                        }
                    }
                }
            }
            catch (err) {
                if (err instanceof TypeError) {
                    valid = false;
                }
                else {
                    throw err;
                }
            }
            if (!valid) {
                throw new _0_errors_js_1.InputError("Invalid sticker set name or link.");
            }
        }
        const result = await this.#c.invoke({ _: "messages.getStickerSet", hash: 0, stickerset: { _: "inputStickerSetShortName", short_name: name } });
        return (0, _3_types_js_1.constructStickerSet)(result);
    }
    async openMiniApp(botId, chatId, params) {
        this.#c.storage.assertUser("openMiniApp");
        const from_bot_menu = params?.fromMenu ? true : undefined;
        const silent = params?.disableNotification ? true : undefined;
        const compact = params?.mode === "compact" ? true : undefined;
        const fullscreen = params?.mode === "fullscreen" ? true : undefined;
        const peer = await this.#c.getInputPeer(chatId);
        const bot = await this.#c.getInputUser(botId);
        const url = params?.url;
        const start_param = params?.startParameter;
        const theme_params = params?.themeParameters ? { _: "dataJSON", data: params.themeParameters } : undefined;
        const platform = this.#c.langPack ?? "";
        const reply_to = await this.#constructReplyTo(params);
        const send_as = params?.sendAs ? await this.#c.getInputPeer(params.sendAs) : undefined;
        const result = await this.#c.invoke({
            _: "messages.requestWebView",
            from_bot_menu,
            silent,
            compact,
            fullscreen,
            peer,
            bot,
            url,
            start_param,
            theme_params,
            platform,
            reply_to,
            send_as,
        });
        return (0, _3_types_js_1.constructMiniAppInfo)(result);
    }
    async getSavedMessages(chatId, params) {
        this.#c.storage.assertUser("getSavedMessages");
        const peer = await this.#c.getInputPeer(chatId);
        const limit = (0, _0_utilities_js_1.getLimit)(params?.limit);
        let offsetId = params?.offsetId ?? 0;
        if (offsetId < 0) {
            offsetId = 0;
        }
        let offsetDate = params?.offsetDate ?? 0;
        if (offsetDate < 0) {
            offsetDate = 0;
        }
        const result = await this.#c.invoke({
            _: "messages.getSavedHistory",
            peer,
            limit,
            offset_id: offsetId,
            offset_date: offsetDate,
            add_offset: params?.addOffset ?? 0,
            hash: 0n,
            max_id: 0,
            min_id: 0,
        });
        if (!("messages" in result)) {
            (0, _0_deps_js_1.unreachable)();
        }
        const messages = new Array();
        for (const message_ of result.messages) {
            const message = await this.constructMessage(message_, false);
            messages.push(message);
        }
        return messages;
    }
    async getSavedChats(params) {
        const limit = (0, _0_utilities_js_1.getLimit)(params?.limit);
        let offsetId = params?.offsetId ?? 0;
        if (offsetId < 0) {
            offsetId = 0;
        }
        let offsetDate = params?.offsetDate ?? 0;
        if (offsetDate < 0) {
            offsetDate = 0;
        }
        let offsetPeer = { _: "inputPeerEmpty" };
        if (params?.offsetChatId !== undefined) {
            offsetPeer = await this.#c.getInputPeer(params.offsetChatId);
        }
        const result = await this.#c.invoke({
            _: "messages.getSavedDialogs",
            hash: 0n,
            limit,
            offset_date: offsetDate,
            offset_id: offsetId,
            offset_peer: offsetPeer,
            exclude_pinned: params?.excludePinned || undefined,
        });
        return (0, _3_types_js_1.constructSavedChats)(result, this.#c.getPeer, this.getMessage.bind(this), this.#c.fileManager.getStickerSetName.bind(this.#c.fileManager));
    }
    async getMessageReactions(chatId, messageId, params) {
        this.#c.storage.assertUser("getMessageReactions");
        const peer = await this.#c.getInputPeer(chatId);
        const id = messageId;
        const reactions = params?.reaction ? (0, _3_types_js_2.reactionToTlObject)(params.reaction) : undefined;
        const offset = params?.offset;
        const limit = (0, _0_utilities_js_1.getLimit)(params?.limit);
        const messageReactionsList = await this.#c.invoke({
            _: "messages.getMessageReactionsList",
            peer,
            id,
            reactions,
            offset,
            limit,
        });
        return (0, _3_types_js_1.constructMessageReactionList)(messageReactionsList);
    }
}
exports.MessageManager = MessageManager;
