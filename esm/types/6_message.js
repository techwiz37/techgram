import { unreachable } from "../0_deps.js";
import { cleanObject, getLogger, ZERO_CHANNEL_ID } from "../1_utilities.js";
import { Api } from "../2_tl.js";
import { FileType, toUniqueFileId } from "./_file_id.js";
import { serializeFileId } from "./_file_id.js";
import { constructContact } from "./0_contact.js";
import { constructDice } from "./0_dice.js";
import { constructInvoice } from "./0_invoice.js";
import { constructLocation } from "./0_location.js";
import { constructRefundedPayment } from "./0_refunded_payment.js";
import { constructSelfDestructOption } from "./0_self_destruct_option.js";
import { constructVoice } from "./0_voice.js";
import { constructAnimation } from "./1_animation.js";
import { constructAudio } from "./1_audio.js";
import { isChatPUser } from "./1_chat_p.js";
import { constructDocument } from "./1_document.js";
import { constructGiveaway } from "./1_giveaway.js";
import { constructMessageReaction } from "./1_message_reaction.js";
import { constructPhoto } from "./1_photo.js";
import { constructSticker } from "./1_sticker.js";
import { constructVenue } from "./1_venue.js";
import { constructVideoNote } from "./1_video_note.js";
import { constructVideo } from "./1_video.js";
import { constructMessageEntity } from "./2_message_entity.js";
import { constructReplyMarkup } from "./2_reply_markup.js";
import { constructSuccessfulPayment } from "./2_successful_payment.js";
import { constructUser2 } from "./2_user.js";
import { constructForwardHeader } from "./3_forward_header.js";
import { constructGame } from "./3_game.js";
import { constructReplyQuote } from "./3_reply_quote.js";
import { constructPoll } from "./4_poll.js";
import { constructLinkPreview } from "./5_link_preview.js";
const L = getLogger("Message");
const keys = {
    text: ["text"],
    link: ["linkPreview"],
    photo: ["photo"],
    document: ["document"],
    video: ["video"],
    sticker: ["sticker"],
    animation: ["animation"],
    voice: ["voice"],
    audio: ["audio"],
    dice: ["dice"],
    videoNote: ["videoNote"],
    contact: ["contact"],
    game: ["game"],
    poll: ["poll"],
    invoice: ["invoice"],
    venue: ["venue"],
    location: ["location"],
    newChatMembers: ["newChatMembers"],
    leftChatMember: ["leftChatMember"],
    newChatTitle: ["newChatTitle"],
    newChatPhoto: ["newChatPhoto"],
    deletedChatPhoto: ["deletedChatPhoto"],
    groupCreated: ["groupCreated", "newChatMembers"],
    supergroupCreated: ["supergroupCreated"],
    channelCreated: ["channelCreated"],
    newAutoDeleteTime: ["newAutoDeleteTime"],
    chatMigratedTo: ["chatMigratedTo"],
    chatMigratedFrom: ["chatMigratedFrom"],
    pinnedMessage: ["pinnedMessage"],
    userShared: ["userShared"],
    writeAccessAllowed: ["writeAccessAllowed"],
    forumTopicCreated: ["forumTopicCreated"],
    forumTopicEdited: ["forumTopicEdited"],
    forumTopicClosed: ["forumTopicClosed"],
    forumTopicReopened: ["forumTopicReopened"],
    videoChatScheduled: ["videoChatScheduled"],
    videoChatStarted: ["videoChatStarted"],
    videoChatEnded: ["videoChatEnded"],
    giveaway: ["giveaway"],
    unsupported: ["unsupported"],
    successfulPayment: ["successfulPayment"],
    refundedPayment: ["refundedPayment"],
};
export function isMessageType(message, type) {
    for (const key of keys[type]) {
        if (!(key in message) || message[key] === undefined) {
            return false;
        }
    }
    return true;
}
export function assertMessageType(message, type) {
    if (!isMessageType(message, type)) {
        unreachable();
    }
    return message;
}
function getSender(message_, getPeer) {
    const peer = message_.from_id ?? message_.peer_id;
    if (Api.isOneOf(["peerChannel", "peerUser"], peer)) {
        const peer_ = getPeer(peer);
        if (peer_) {
            return { from: peer_[0] };
        }
        else {
            unreachable();
        }
    }
    else {
        unreachable();
    }
}
async function getReply(message_, chat, getMessage) {
    if (getMessage && Api.is("messageReplyHeader", message_.reply_to) && message_.reply_to.reply_to_msg_id) {
        let isTopicMessage = false;
        if (message_.reply_to.forum_topic) {
            isTopicMessage = true;
        }
        const replyToMessage = await getMessage(chat.id, message_.reply_to.reply_to_msg_id);
        if (replyToMessage) {
            return { replyToMessage, threadId: message_.reply_to.reply_to_top_id, isTopicMessage };
        }
        else {
            L.warning("couldn't get replied message");
        }
    }
    return { replyToMessage: undefined, threadId: undefined, isTopicMessage: false };
}
async function constructServiceMessage(message_, chat, getPeer, getMessage, getReply_) {
    const message = {
        isOutgoing: message_.out ?? false,
        id: message_.id,
        chat,
        date: message_.date,
        isTopicMessage: message_.reply_to && Api.is("messageReplyHeader", message_.reply_to) && message_.reply_to.forum_topic ? true : false,
        ...getSender(message_, getPeer),
    };
    if (Api.is("messageReplyHeader", message_.reply_to) && message_.reply_to.reply_to_msg_id) {
        message.replyToMessageId = message_.reply_to.reply_to_top_id;
        message.replyToMessageId = message_.reply_to.reply_to_msg_id;
    }
    if (getReply_) {
        Object.assign(message, await getReply(message_, chat, getMessage));
    }
    if (Api.is("messageActionChatAddUser", message_.action) || Api.is("messageActionChatJoinedByLink", message_.action) || Api.is("messageActionChatJoinedByRequest", message_.action)) {
        const newChatMembers = new Array();
        const users = "users" in message_.action ? message_.action.users : [message_.from_id && "user_id" in message_.from_id ? message_.from_id.user_id : unreachable()];
        for (const user_ of users) {
            const peer = getPeer({ _: "peerUser", user_id: user_ });
            if (peer && isChatPUser(peer[0])) {
                const user = constructUser2(peer[0]);
                newChatMembers.push(user);
            }
            else {
                unreachable();
            }
        }
        return { ...message, newChatMembers };
    }
    else if (Api.is("messageActionChatDeleteUser", message_.action)) {
        const peer = getPeer({ _: "peerUser", user_id: message_.action.user_id });
        if (peer) {
            const user = constructUser2(peer[0]);
            const leftChatMember = user;
            return { ...message, leftChatMember };
        }
    }
    else if (Api.is("messageActionChatEditTitle", message_.action)) {
        const newChatTitle = message_.action.title;
        return { ...message, newChatTitle };
    }
    else if (Api.is("messageActionChatEditPhoto", message_.action)) {
        const newChatPhoto = constructPhoto(Api.as("photo", message_.action.photo));
        return { ...message, newChatPhoto };
    }
    else if (Api.is("messageActionChatDeletePhoto", message_.action)) {
        const deletedChatPhoto = true;
        return { ...message, deletedChatPhoto };
    }
    else if (Api.is("messageActionChatCreate", message_.action)) {
        const groupCreated = true;
        const newChatMembers = new Array();
        for (const user_ of message_.action.users) {
            const peer = getPeer({ _: "peerUser", user_id: user_ });
            if (peer) {
                const user = constructUser2(peer[0]);
                newChatMembers.push(user);
            }
        }
        return { ...message, groupCreated, newChatMembers };
    }
    else if (Api.is("messageActionChannelCreate", message_.action)) {
        if (message.chat.type === "channel") {
            const channelCreated = true;
            return { ...message, channelCreated };
        }
        else if (message.chat.type === "supergroup") {
            const supergroupCreated = true;
            return { ...message, supergroupCreated };
        }
        else {
        }
    }
    else if (Api.is("messageActionChatMigrateTo", message_.action)) {
        const chatMigratedTo = ZERO_CHANNEL_ID + Number(-message_.action.channel_id);
        return { ...message, chatMigratedTo };
    }
    else if (Api.is("messageActionChannelMigrateFrom", message_.action)) {
        const chatMigratedFrom = Number(-message_.action.chat_id);
        return { ...message, chatMigratedFrom };
    }
    else if (Api.is("messageActionPinMessage", message_.action)) {
        const { replyToMessage } = await getReply(message_, chat, getMessage);
        if (replyToMessage) {
            const pinnedMessage = replyToMessage;
            return { ...message, pinnedMessage };
        }
    }
    else if (Api.is("messageActionRequestedPeer", message_.action)) {
        const user = Api.as("peerUser", message_.action.peers[0]);
        const userShared = { requestId: message_.action.button_id, userId: Number(user.user_id) };
        return { ...message, userShared };
    }
    else if (Api.is("messageActionBotAllowed", message_.action)) {
        const miniAppName = message_.action.app ? Api.as("botApp", message_.action.app).title : undefined;
        const writeAccessAllowed = { miniAppName };
        return { ...message, writeAccessAllowed };
    }
    else if (Api.is("messageActionTopicCreate", message_.action)) {
        const forumTopicCreated = {
            name: message_.action.title,
            color: message_.action.icon_color,
            cutsomEmojiId: message_.action.icon_emoji_id ? String(message_.action.icon_emoji_id) : undefined,
        };
        return { ...message, forumTopicCreated };
    }
    else if (Api.is("messageActionTopicEdit", message_.action)) {
        if (message_.action.closed) {
            const forumTopicClosed = true;
            return { ...message, forumTopicClosed };
        }
        else if (message_.action.title || message_.action.icon_emoji_id) {
            const forumTopicEdited = {
                name: message_.action.title ?? "",
                customEmojiId: message_.action.icon_emoji_id ? String(message_.action.icon_emoji_id) : undefined,
            };
            return { ...message, forumTopicEdited };
        }
        else {
            const forumTopicReopened = true;
            return { ...message, forumTopicReopened };
        }
    }
    else if (Api.is("messageActionGroupCallScheduled", message_.action)) {
        const videoChatScheduled = { startDate: message_.action.schedule_date };
        return { ...message, videoChatScheduled };
    }
    else if (Api.is("messageActionGroupCall", message_.action)) {
        if (message_.action.duration) {
            const videoChatEnded = { duration: message_.action.duration };
            return { ...message, videoChatEnded };
        }
        else {
            const videoChatStarted = true;
            return { ...message, videoChatStarted };
        }
    }
    else if (Api.is("messageActionSetMessagesTTL", message_.action)) {
        const newAutoDeleteTime = message_.action.period || 0;
        return { ...message, newAutoDeleteTime };
    }
    else if (Api.is("messageActionPaymentSentMe", message_.action)) {
        const successfulPayment = constructSuccessfulPayment(message_.action);
        return { ...message, successfulPayment };
    }
    else if (Api.is("messageActionPaymentRefunded", message_.action)) {
        const refundedPayment = constructRefundedPayment(message_.action);
        return { ...message, refundedPayment };
    }
    return { ...message, unsupported: true };
}
export async function constructMessage(message_, getPeer, getMessage, getStickerSetName, getReply_ = true, business, poll, pollResults) {
    if (!(Api.is("message", message_)) && !(Api.is("messageService", message_))) {
        unreachable();
    }
    let link;
    const chat_ = getPeer(message_.peer_id)?.[0] ?? null;
    if (chat_ === null) {
        unreachable();
    }
    if (Api.is("peerChannel", message_.peer_id)) {
        const reply_to_top_id = message_.reply_to && Api.is("messageReplyHeader", message_.reply_to) && message_.reply_to.reply_to_top_id;
        const threadId = reply_to_top_id && typeof reply_to_top_id === "number" ? reply_to_top_id + "/" : "";
        link = `https://t.me/c/${message_.peer_id.channel_id}/${threadId}${message_.id}`;
        if ("username" in chat_ && chat_.username) {
            link = link.replace(`/c/${message_.peer_id.channel_id}/`, `/${chat_.username}/`);
        }
    }
    if (Api.is("messageService", message_)) {
        return constructServiceMessage(message_, chat_, getPeer, getMessage, getReply_);
    }
    const message = {
        isOutgoing: message_.out ?? false,
        id: message_.id,
        chat: chat_,
        link,
        date: message_.date,
        views: message_.views,
        forwards: message_.forwards,
        isTopicMessage: message_.reply_to && Api.is("messageReplyHeader", message_.reply_to) && message_.reply_to.forum_topic ? true : false,
        hasProtectedContent: message_.noforwards || false,
        senderBoostCount: message_.from_boosts_applied,
        effectId: message_.effect ? String(message_.effect) : undefined,
        scheduled: message_.from_scheduled ? true : undefined,
        ...await getSender(message_, getPeer),
    };
    if (message_.reactions) {
        const recentReactions = message_.reactions.recent_reactions ?? [];
        message.reactions = message_.reactions.results.map((v) => constructMessageReaction(v, recentReactions));
    }
    if (Api.is("messageReplyHeader", message_.reply_to) && message_.reply_to.reply_to_msg_id) {
        if (message_.reply_to.quote) {
            message.replyQuote = constructReplyQuote(message_.reply_to.quote_text, message_.reply_to.quote_offset, message_.reply_to.quote_entities);
        }
        message.threadId = message_.reply_to.reply_to_top_id;
        message.replyToMessageId = message_.reply_to.reply_to_msg_id;
    }
    if (business) {
        message.businessConnectionId = business.connectionId;
        if (business.replyToMessage) {
            message.replyToMessageId = business.replyToMessage.id;
            message.replyToMessage = await constructMessage(business.replyToMessage, getPeer, getMessage, getStickerSetName, false, { connectionId: business.connectionId });
        }
    }
    else if (getReply_) {
        Object.assign(message, await getReply(message_, chat_, getMessage));
    }
    if (message_.reply_markup) {
        message.replyMarkup = constructReplyMarkup(message_.reply_markup);
    }
    if (message_.via_bot_id !== undefined) {
        const peer = getPeer({ _: "peerUser", user_id: message_.via_bot_id });
        if (peer) {
            message.viaBot = constructUser2(peer[0]);
        }
        else {
            unreachable();
        }
    }
    if (message_.via_business_bot_id !== undefined) {
        const peer = getPeer({ _: "peerUser", user_id: message_.via_business_bot_id });
        if (peer) {
            message.viaBusinessBot = constructUser2(peer[0]);
        }
        else {
            unreachable();
        }
    }
    if (message_.post_author !== undefined) {
        message.authorSignature = message_.post_author;
    }
    if (Api.is("messageFwdHeader", message_.fwd_from)) {
        message.isAutomaticForward = message_.fwd_from.saved_from_peer !== undefined && message_.fwd_from.saved_from_msg_id !== undefined;
        message.forwardFrom = constructForwardHeader(message_.fwd_from, getPeer);
    }
    if (message_.grouped_id !== undefined) {
        message.mediaGroupId = String(message_.grouped_id);
    }
    if (message_.edit_date) {
        message.editDate = message_.edit_date;
    }
    const messageText = {
        ...message,
        text: message_.message,
        entities: message_.entities?.map(constructMessageEntity).filter((v) => !!v) ?? [],
    };
    if (message_.message && message_.media === undefined) {
        return cleanObject(messageText);
    }
    const messageMedia = {
        ...message,
        caption: message_.message,
        captionEntities: message_.entities?.map(constructMessageEntity).filter((v) => !!v) ?? [],
    };
    if (message_.media && "ttl_seconds" in message_.media && typeof message_.media.ttl_seconds === "number") {
        messageMedia.selfDestruct = constructSelfDestructOption(message_.media.ttl_seconds);
    }
    if (Api.is("messageMediaPhoto", message_.media) || Api.is("messageMediaDocument", message_.media)) {
        messageMedia.hasMediaSpoiler = message_.media.spoiler || false;
    }
    let m = null;
    if (Api.is("messageMediaPhoto", message_.media)) {
        if (!message_.media.photo) {
            unreachable();
        }
        const photo = constructPhoto(Api.as("photo", message_.media.photo));
        m = { ...messageMedia, photo };
    }
    else if (Api.is("messageMediaDice", message_.media)) {
        const dice = constructDice(message_.media);
        m = { ...message, dice };
    }
    else if (Api.is("messageMediaDocument", message_.media)) {
        const { document } = message_.media;
        if (Api.is("document", document)) {
            const getFileId = (type) => ({
                type,
                dcId: document.dc_id,
                fileReference: document.file_reference,
                location: { type: "common", id: document.id, accessHash: document.access_hash },
            });
            const animated = document.attributes.find((v) => Api.is("documentAttributeAnimated", v));
            const audio = document.attributes.find((v) => Api.is("documentAttributeAudio", v));
            const fileName = document.attributes.find((v) => Api.is("documentAttributeFilename", v));
            const sticker = document.attributes.find((v) => Api.is("documentAttributeSticker", v));
            const video = document.attributes.find((v) => Api.is("documentAttributeVideo", v));
            if (animated) {
                const fileId = getFileId(FileType.Animation);
                const animation = constructAnimation(document, video, fileName, serializeFileId(fileId), toUniqueFileId(fileId));
                m = { ...messageMedia, animation };
            }
            else if (video) {
                if (video.round_message) {
                    const fileId = getFileId(FileType.VideoNote);
                    const videoNote = constructVideoNote(document, video, serializeFileId(fileId), toUniqueFileId(fileId));
                    m = { ...message, videoNote };
                }
                else {
                    const fileId = getFileId(FileType.Video);
                    const video_ = constructVideo(document, video, fileName?.file_name, serializeFileId(fileId), toUniqueFileId(fileId));
                    m = { ...messageMedia, video: video_ };
                }
            }
            else if (audio) {
                if (audio.voice) {
                    const fileId = getFileId(FileType.VoiceNote);
                    const voice = constructVoice(document, audio, serializeFileId(fileId), toUniqueFileId(fileId));
                    m = { ...messageMedia, voice };
                }
                else {
                    const fileId = getFileId(FileType.Audio);
                    const audio_ = constructAudio(document, audio, serializeFileId(fileId), toUniqueFileId(fileId));
                    m = { ...messageMedia, audio: audio_ };
                }
            }
            else if (sticker) {
                const fileId = getFileId(FileType.Sticker);
                const sticker = await constructSticker(document, serializeFileId(fileId), toUniqueFileId(fileId), getStickerSetName);
                m = { ...message, sticker };
            }
            else {
                const fileId = getFileId(FileType.Document);
                const document_ = constructDocument(document, fileName ?? ({ _: "documentAttributeFilename", file_name: "Unknown" }), serializeFileId(fileId), toUniqueFileId(fileId));
                m = { ...messageMedia, document: document_ };
            }
        }
    }
    else if (Api.is("messageMediaContact", message_.media)) {
        const contact = constructContact(message_.media);
        m = { ...messageMedia, contact };
    }
    else if (Api.is("messageMediaGame", message_.media)) {
        const game = constructGame(message_.media);
        m = { ...message, game };
    }
    else if (Api.is("messageMediaPoll", message_.media)) {
        if (poll) {
            message_.media.poll = poll;
        }
        if (pollResults) {
            message_.media.results = pollResults;
        }
        const poll_ = constructPoll(message_.media);
        m = { ...message, poll: poll_ };
    }
    else if (Api.is("messageMediaVenue", message_.media)) {
        const venue = constructVenue(message_.media);
        m = { ...message, venue };
    }
    else if (Api.is("messageMediaGeo", message_.media) || Api.is("messageMediaGeoLive", message_.media)) {
        const location = constructLocation(message_.media);
        m = { ...message, location };
    }
    else if (Api.is("messageMediaWebPage", message_.media)) {
        const linkPreview = constructLinkPreview(message_.media, message_.invert_media, getPeer);
        if (message_.message) {
            m = { ...messageText, linkPreview };
        }
        else {
            m = { ...message, linkPreview: { ...linkPreview, url: linkPreview.url ? linkPreview.url : unreachable() } };
        }
    }
    else if (Api.is("messageMediaGiveaway", message_.media)) {
        const giveaway = constructGiveaway(message_.media);
        m = { ...message, giveaway };
    }
    else if (Api.is("messageMediaInvoice", message_.media)) {
        const invoice = constructInvoice(message_.media);
        m = { ...message, invoice };
    }
    if (m === null) {
        const unsupported = true;
        m = { ...message, unsupported };
    }
    return cleanObject(m);
}
