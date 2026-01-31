"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const _0_deps_js_1 = require("../0_deps.js");
const _2_tl_js_1 = require("../2_tl.js");
class Context {
    #client;
    #me;
    #update;
    constructor(client, me, update) {
        this.#client = client;
        this.#me = me;
        this.#update = update;
    }
    get update() {
        return this.#update;
    }
    get me() {
        return this.#me;
    }
    get client() {
        return this.#client;
    }
    get msg() {
        return "message" in this.update ? this.update.message : "editedMessage" in this.update ? this.update.editedMessage : "scheduledMessage" in this.update ? this.update.scheduledMessage : "callbackQuery" in this.update ? this.update.callbackQuery.message : undefined;
    }
    get message() {
        return "message" in this.update ? this.update.message : undefined;
    }
    get editedMessage() {
        return "editedMessage" in this.update ? this.update.editedMessage : undefined;
    }
    get callbackQuery() {
        return "callbackQuery" in this.update ? this.update.callbackQuery : undefined;
    }
    get inlineQuery() {
        return "inlineQuery" in this.update ? this.update.inlineQuery : undefined;
    }
    get chosenInlineResult() {
        return "chosenInlineResult" in this.update ? this.update.chosenInlineResult : undefined;
    }
    #mustGetMsg() {
        if (this.msg !== undefined) {
            return { chatId: this.msg.chat.id, messageId: this.msg.id, businessConnectionId: this.msg.businessConnectionId, senderId: this.msg.from?.id, userId: this.msg.from?.id };
        }
        const reactions = "messageInteractions" in this.update ? this.update.messageInteractions : undefined;
        if (reactions !== undefined) {
            return { chatId: reactions.chatId, messageId: reactions.messageId };
        }
        else {
            (0, _0_deps_js_1.unreachable)();
        }
    }
    #mustGetChatId() {
        if (this.chat) {
            return this.chat.id;
        }
        else {
            (0, _0_deps_js_1.unreachable)();
        }
    }
    #mustGetUserId() {
        if (this.msg?.from) {
            return this.msg.from.id;
        }
        else if ("callbackQuery" in this.update) {
            return this.update.callbackQuery.from.id;
        }
        else if ("chosenInlineResult" in this.update) {
            return this.update.chosenInlineResult.from.id;
        }
        else {
            (0, _0_deps_js_1.unreachable)();
        }
    }
    #mustGetInlineMsgId() {
        if ("chosenInlineResult" in this.update) {
            if (this.update.chosenInlineResult.inlineMessageId) {
                return this.update.chosenInlineResult.inlineMessageId;
            }
        }
        else if ("callbackQuery" in this.update) {
            if (this.update.callbackQuery.inlineMessageId) {
                return this.update.callbackQuery.inlineMessageId;
            }
        }
        (0, _0_deps_js_1.unreachable)();
    }
    #getReplyTo = (quote, chatId, messageId) => {
        if ("story" in this.update) {
            return { chatId: this.update.story.chat.id, storyId: this.update.story.id };
        }
        const isPrivate = chatId > 0;
        const shouldQuote = quote === undefined ? !isPrivate : quote;
        return shouldQuote ? { messageId } : undefined;
    };
    get chat() {
        return this.msg?.chat ?? ("messageReactions" in this.update ? this.update.messageReactions.chat : "messageReactionCount" in this.update ? this.update.messageReactionCount.chat : "chatMember" in this.update ? this.update.chatMember.chat : "myChatMember" in this.update ? this.update.myChatMember.chat : "joinRequest" in this.update ? this.update.joinRequest.chat : "story" in this.update ? this.update.story.chat : undefined);
    }
    get from() {
        const from = "callbackQuery" in this.update ? this.update.callbackQuery.from : "inlineQuery" in this.update ? this.update.inlineQuery.from : "chatMember" in this.update ? this.update.chatMember.from : "myChatMember" in this.update ? this.update.myChatMember.from : "messageReactions" in this.update ? this.update.messageReactions.user : "preCheckoutQuery" in this.update ? this.update.preCheckoutQuery.from : "joinRequest" in this.update ? this.update.joinRequest.from : "businessConnection" in this.update ? this.update.businessConnection.user : "pollAnswer" in this.update ? this.update.pollAnswer.from : this.msg?.from;
        return from;
    }
    toJSON() {
        if ("update" in this.update) {
            return { update: (0, _2_tl_js_1.toJSON)(this.update.update) };
        }
        else {
            return this.update;
        }
    }
    async reply(text, params) {
        const { chatId, messageId, businessConnectionId } = this.#mustGetMsg();
        const replyTo = this.#getReplyTo(params?.quote, chatId, messageId);
        return await this.client.sendMessage(chatId, text, { ...params, replyTo, businessConnectionId });
    }
    async replyPoll(question, options, params) {
        const { chatId, messageId, businessConnectionId } = this.#mustGetMsg();
        const replyTo = this.#getReplyTo(params?.quote, chatId, messageId);
        return await this.client.sendPoll(chatId, question, options, { ...params, replyTo, businessConnectionId });
    }
    async replyPhoto(photo, params) {
        const { chatId, messageId, businessConnectionId } = this.#mustGetMsg();
        const replyTo = this.#getReplyTo(params?.quote, chatId, messageId);
        return await this.client.sendPhoto(chatId, photo, { ...params, replyTo, businessConnectionId });
    }
    async replyMediaGroup(media, params) {
        const { chatId, messageId, businessConnectionId } = this.#mustGetMsg();
        const replyTo = this.#getReplyTo(params?.quote, chatId, messageId);
        return await this.client.sendMediaGroup(chatId, media, { ...params, replyTo, businessConnectionId });
    }
    async replyInvoice(title, description, payload, currency, prices, params) {
        const { chatId, messageId, businessConnectionId } = this.#mustGetMsg();
        const replyTo = this.#getReplyTo(params?.quote, chatId, messageId);
        return await this.client.sendInvoice(chatId, title, description, payload, currency, prices, { ...params, replyTo, businessConnectionId });
    }
    async replyDocument(document, params) {
        const { chatId, messageId, businessConnectionId } = this.#mustGetMsg();
        const replyTo = this.#getReplyTo(params?.quote, chatId, messageId);
        return await this.client.sendDocument(chatId, document, { ...params, replyTo, businessConnectionId });
    }
    async replySticker(sticker, params) {
        const { chatId, messageId, businessConnectionId } = this.#mustGetMsg();
        const replyTo = this.#getReplyTo(params?.quote, chatId, messageId);
        return await this.client.sendSticker(chatId, sticker, { ...params, replyTo, businessConnectionId });
    }
    async replyLocation(latitude, longitude, params) {
        const { chatId, messageId, businessConnectionId } = this.#mustGetMsg();
        const replyTo = this.#getReplyTo(params?.quote, chatId, messageId);
        return await this.client.sendLocation(chatId, latitude, longitude, { ...params, replyTo, businessConnectionId });
    }
    async replyDice(params) {
        const { chatId, messageId, businessConnectionId } = this.#mustGetMsg();
        const replyTo = this.#getReplyTo(params?.quote, chatId, messageId);
        return await this.client.sendDice(chatId, { ...params, replyTo, businessConnectionId });
    }
    async replyVenue(latitude, longitude, title, address, params) {
        const { chatId, messageId, businessConnectionId } = this.#mustGetMsg();
        const replyTo = this.#getReplyTo(params?.quote, chatId, messageId);
        return await this.client.sendVenue(chatId, latitude, longitude, title, address, { ...params, replyTo, businessConnectionId });
    }
    async replyContact(firstName, number, params) {
        const { chatId, messageId, businessConnectionId } = this.#mustGetMsg();
        const replyTo = this.#getReplyTo(params?.quote, chatId, messageId);
        return await this.client.sendContact(chatId, firstName, number, { ...params, replyTo, businessConnectionId });
    }
    async replyVideo(video, params) {
        const { chatId, messageId, businessConnectionId } = this.#mustGetMsg();
        const replyTo = this.#getReplyTo(params?.quote, chatId, messageId);
        return await this.client.sendVideo(chatId, video, { ...params, replyTo, businessConnectionId });
    }
    async replyAnimation(animation, params) {
        const { chatId, messageId, businessConnectionId } = this.#mustGetMsg();
        const replyTo = this.#getReplyTo(params?.quote, chatId, messageId);
        return await this.client.sendAnimation(chatId, animation, { ...params, replyTo, businessConnectionId });
    }
    async replyVoice(voice, params) {
        const { chatId, messageId, businessConnectionId } = this.#mustGetMsg();
        const replyTo = this.#getReplyTo(params?.quote, chatId, messageId);
        return await this.client.sendVoice(chatId, voice, { ...params, replyTo, businessConnectionId });
    }
    async replyAudio(audio, params) {
        const { chatId, messageId, businessConnectionId } = this.#mustGetMsg();
        const replyTo = this.#getReplyTo(params?.quote, chatId, messageId);
        return await this.client.sendAudio(chatId, audio, { ...params, replyTo, businessConnectionId });
    }
    async replyVideoNote(videoNote, params) {
        const { chatId, messageId, businessConnectionId } = this.#mustGetMsg();
        const replyTo = this.#getReplyTo(params?.quote, chatId, messageId);
        return await this.client.sendVideoNote(chatId, videoNote, { ...params, replyTo, businessConnectionId });
    }
    async delete() {
        const { chatId, messageId } = this.#mustGetMsg();
        return await this.client.deleteMessage(chatId, messageId);
    }
    async forward(to, params) {
        const { chatId, messageId } = this.#mustGetMsg();
        return await this.client.forwardMessage(chatId, to, messageId, params);
    }
    async pin(params) {
        const { chatId, messageId, businessConnectionId } = this.#mustGetMsg();
        return await this.client.pinMessage(chatId, messageId, { ...params, businessConnectionId });
    }
    async unpin() {
        const { chatId, messageId, businessConnectionId } = this.#mustGetMsg();
        return await this.client.unpinMessage(chatId, messageId, { businessConnectionId });
    }
    async banSender(params) {
        const { chatId, senderId } = this.#mustGetMsg();
        if (!senderId) {
            (0, _0_deps_js_1.unreachable)();
        }
        return await this.client.banChatMember(chatId, senderId, params);
    }
    async kickSender() {
        const { chatId, senderId } = this.#mustGetMsg();
        if (!senderId) {
            (0, _0_deps_js_1.unreachable)();
        }
        return await this.client.kickChatMember(chatId, senderId);
    }
    async setSenderRights(params) {
        const { chatId, senderId } = this.#mustGetMsg();
        if (!senderId) {
            (0, _0_deps_js_1.unreachable)();
        }
        return await this.client.setChatMemberRights(chatId, senderId, params);
    }
    async getChatAdministrators() {
        const chatId = this.#mustGetChatId();
        return await this.client.getChatAdministrators(chatId);
    }
    async react(reactions, params) {
        const { chatId, messageId } = this.#mustGetMsg();
        return await this.client.setReactions(chatId, messageId, reactions, params);
    }
    async sendChatAction(action, params) {
        const chatId = this.#mustGetChatId();
        return await this.client.sendChatAction(chatId, action, params);
    }
    async editInlineMessageText(text, params) {
        const inlineMessageId = this.#mustGetInlineMsgId();
        return await this.client.editInlineMessageText(inlineMessageId, text, params);
    }
    async editInlineMessageCaption(params) {
        const inlineMessageId = this.#mustGetInlineMsgId();
        return await this.client.editInlineMessageCaption(inlineMessageId, params);
    }
    async editInlineMessageMedia(media, params) {
        const inlineMessageId = this.#mustGetInlineMsgId();
        return await this.client.editInlineMessageMedia(inlineMessageId, media, params);
    }
    async editInlineMessageLiveLocation(latitude, longitude, params) {
        const inlineMessageId = this.#mustGetInlineMsgId();
        return await this.client.editInlineMessageLiveLocation(inlineMessageId, latitude, longitude, params);
    }
    async editInlineMessageReplyMarkup(params) {
        const inlineMessageId = this.#mustGetInlineMsgId();
        return await this.client.editInlineMessageReplyMarkup(inlineMessageId, params);
    }
    async editMessageText(messageId, text, params) {
        const chatId = this.#mustGetChatId();
        return await this.client.editMessageText(chatId, messageId, text, params);
    }
    async editMessageCaption(messageId, params) {
        const chatId = this.#mustGetChatId();
        return await this.client.editMessageCaption(chatId, messageId, params);
    }
    async editMessageMedia(messageId, media, params) {
        const chatId = this.#mustGetChatId();
        return await this.client.editMessageMedia(chatId, messageId, media, params);
    }
    async editMessageLiveLocation(messageId, latitude, longitude, params) {
        const chatId = this.#mustGetChatId();
        return await this.client.editMessageLiveLocation(chatId, messageId, latitude, longitude, params);
    }
    async editMessageReplyMarkup(messageId, params) {
        const chatId = this.#mustGetChatId();
        return await this.client.editMessageReplyMarkup(chatId, messageId, params);
    }
    async answerCallbackQuery(params) {
        if (!("callbackQuery" in this.update)) {
            (0, _0_deps_js_1.unreachable)();
        }
        return await this.client.answerCallbackQuery(this.update.callbackQuery.id, params);
    }
    async answerInlineQuery(results, params) {
        if (!("inlineQuery" in this.update)) {
            (0, _0_deps_js_1.unreachable)();
        }
        return await this.client.answerInlineQuery(this.update.inlineQuery.id, results, params);
    }
    async getMessage(messageId) {
        const chatId = this.#mustGetChatId();
        return await this.client.getMessage(chatId, messageId);
    }
    async getMessages(messageIds) {
        const chatId = this.#mustGetChatId();
        return await this.client.getMessages(chatId, messageIds);
    }
    async forwardMessage(to, messageId, params) {
        const chatId = this.#mustGetChatId();
        return await this.client.forwardMessage(chatId, to, messageId, params);
    }
    async forwardMessages(to, messageIds, params) {
        const chatId = this.#mustGetChatId();
        return await this.client.forwardMessages(chatId, to, messageIds, params);
    }
    async deleteMessage(messageId, params) {
        const chatId = this.#mustGetChatId();
        return await this.client.deleteMessage(chatId, messageId, params);
    }
    async deleteMessages(messageIds, params) {
        const chatId = this.#mustGetChatId();
        return await this.client.deleteMessages(chatId, messageIds, params);
    }
    async pinMessage(messageId, params) {
        const chatId = this.#mustGetChatId();
        return await this.client.pinMessage(chatId, messageId, params);
    }
    async unpinMessage(messageId) {
        const chatId = this.#mustGetChatId();
        return await this.client.unpinMessage(chatId, messageId);
    }
    async unpinMessages() {
        const chatId = this.#mustGetChatId();
        return await this.client.unpinMessages(chatId);
    }
    async setAvailableReactions(availableReactions) {
        const chatId = this.#mustGetChatId();
        return await this.client.setAvailableReactions(chatId, availableReactions);
    }
    async addReaction(messageId, reaction, params) {
        const chatId = this.#mustGetChatId();
        return await this.client.addReaction(chatId, messageId, reaction, params);
    }
    async removeReaction(messageId, reaction) {
        const chatId = this.#mustGetChatId();
        return await this.client.removeReaction(chatId, messageId, reaction);
    }
    async setReactions(messageId, reactions, params) {
        const chatId = this.#mustGetChatId();
        return await this.client.setReactions(chatId, messageId, reactions, params);
    }
    async read() {
        const { chatId, messageId } = this.#mustGetMsg();
        return await this.client.readMessages(chatId, messageId);
    }
    async setChatPhoto(photo, params) {
        const chatId = this.#mustGetChatId();
        return await this.client.setChatPhoto(chatId, photo, params);
    }
    async deletChatPhoto() {
        const chatId = this.#mustGetChatId();
        return await this.client.deleteChatPhoto(chatId);
    }
    async banChatMember(memberId, params) {
        const chatId = this.#mustGetChatId();
        return await this.client.banChatMember(chatId, memberId, params);
    }
    async unbanChatMember(memberId) {
        const chatId = this.#mustGetChatId();
        return await this.client.unbanChatMember(chatId, memberId);
    }
    async kickChatMember(memberId) {
        const chatId = this.#mustGetChatId();
        return await this.client.kickChatMember(chatId, memberId);
    }
    async setChatMemberRights(memberId, params) {
        const chatId = this.#mustGetChatId();
        return await this.client.setChatMemberRights(chatId, memberId, params);
    }
    async promoteChatMember(userId, params) {
        const chatId = this.#mustGetChatId();
        return await this.client.promoteChatMember(chatId, userId, params);
    }
    async deleteChatMemberMessages(userId) {
        const chatId = this.#mustGetChatId();
        return await this.client.deleteChatMemberMessages(chatId, userId);
    }
    async searchMessages(params) {
        const chatId = this.#mustGetChatId();
        params ??= {};
        params.chatId = chatId;
        return await this.client.searchMessages(params);
    }
    async setBoostsRequiredToCircumventRestrictions(boosts) {
        const chatId = this.#mustGetChatId();
        return await this.client.setBoostsRequiredToCircumventRestrictions(chatId, boosts);
    }
    async createInviteLink(params) {
        const chatId = this.#mustGetChatId();
        return await this.client.createInviteLink(chatId, params);
    }
    async getCreatedInviteLinks(params) {
        const chatId = this.#mustGetChatId();
        return await this.client.getCreatedInviteLinks(chatId, params);
    }
    async leaveChat() {
        const chatId = this.#mustGetChatId();
        return await this.client.leaveChat(chatId);
    }
    async blockUser() {
        return await this.client.blockUser(this.#mustGetUserId());
    }
    async unblockUser() {
        return await this.client.unblockUser(this.#mustGetUserId());
    }
    async getChatMember(userId) {
        const chatId = this.#mustGetChatId();
        return await this.client.getChatMember(chatId, userId);
    }
    async getChatMembers(params) {
        const chatId = this.#mustGetChatId();
        return await this.client.getChatMembers(chatId, params);
    }
    async setChatStickerSet(setName) {
        const chatId = this.#mustGetChatId();
        return await this.client.setChatStickerSet(chatId, setName);
    }
    async deleteChatStickerSet() {
        const chatId = this.#mustGetChatId();
        return await this.client.deleteChatStickerSet(chatId);
    }
    async getBusinessConnection() {
        const { businessConnectionId } = this.#mustGetMsg();
        if (!businessConnectionId) {
            (0, _0_deps_js_1.unreachable)();
        }
        return await this.client.getBusinessConnection(businessConnectionId);
    }
    async answerPreCheckoutQuery(ok, params) {
        if (!("preCheckoutQuery" in this.update)) {
            (0, _0_deps_js_1.unreachable)();
        }
        return await this.client.answerPreCheckoutQuery(this.update.preCheckoutQuery.id, ok, params);
    }
    async approveJoinRequest() {
        const { chatId, userId } = this.#mustGetMsg();
        if (!userId) {
            (0, _0_deps_js_1.unreachable)();
        }
        return await this.client.approveJoinRequest(chatId, userId);
    }
    async declineJoinRequest() {
        const { chatId, userId } = this.#mustGetMsg();
        if (!userId) {
            (0, _0_deps_js_1.unreachable)();
        }
        return await this.client.declineJoinRequest(chatId, userId);
    }
}
exports.Context = Context;
