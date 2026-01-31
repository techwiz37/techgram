"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientDispatcher = void 0;
const dntShim = __importStar(require("../_dnt.shims.js"));
const _1_utilities_js_1 = require("../1_utilities.js");
const _4_constants_js_1 = require("../4_constants.js");
const _0_worker_error_js_1 = require("./0_worker_error.js");
const _1_invoke_middleware_js_1 = require("./1_invoke_middleware.js");
const _2_sign_in_js_1 = require("./2_sign_in.js");
const _4_composer_js_1 = require("./4_composer.js");
class ClientDispatcher extends _4_composer_js_1.Composer {
    #worker;
    #id;
    #L;
    #LsignIn;
    #pendingRequests = new Map();
    constructor(worker, id) {
        super();
        this.#worker = worker;
        this.#id = id;
        this.#L = (0, _1_utilities_js_1.getLogger)("ClientDispatcher").branch(this.#id);
        this.#LsignIn = this.#L.branch("signIn");
    }
    async handleResponse(response) {
        if (response.clientId !== this.#id) {
            return;
        }
        this.#L.debug("handling response message", response);
        if (response.isError) {
            this.#pendingRequests.get(response.id)?.reject((0, _0_worker_error_js_1.deserializeWorkerError)(response.data));
            this.#pendingRequests.delete(response.id);
        }
        else {
            if (response.id === "") {
                try {
                    await this.handleUpdate(this, response.data);
                }
                catch (err) {
                    this.#L.error("Error handling update:", err);
                }
            }
            else {
                this.#pendingRequests.get(response.id)?.resolve(response.data);
                this.#pendingRequests.delete(response.id);
            }
        }
    }
    get id() {
        return this.#id;
    }
    async #dispatch(method, ...args) {
        const promiseWithResolvers = Promise.withResolvers();
        const id = dntShim.crypto.randomUUID();
        this.#pendingRequests.set(id, promiseWithResolvers);
        const request = {
            type: "request",
            clientId: this.#id,
            id,
            method,
            args,
        };
        this.#L.debug("posted message to worker", request);
        this.#worker.postMessage(request);
        return await promiseWithResolvers.promise;
    }
    #isInited = false;
    async init(params) {
        if (this.#isInited) {
            return;
        }
        this.#isInited = true;
        return await this.#dispatch("initClient", params);
    }
    async connect() {
        return await this.#dispatch("connect");
    }
    async disconnect() {
        return await this.#dispatch("disconnect");
    }
    async start(params) {
        await this.connect();
        await this.signIn(params);
    }
    async #invoke(function_, params) {
        let n = 1;
        while (true) {
            try {
                return await this.#dispatch("invoke", function_, params);
            }
            catch (err) {
                if (await this.#handleInvokeError(Object.freeze({ client: this, error: err, function: function_, n: n++ }), () => Promise.resolve(false))) {
                    continue;
                }
                else {
                    throw err;
                }
            }
        }
    }
    #handleInvokeError = (0, _1_invoke_middleware_js_1.skipInvoke)();
    async handleInvokeError(request) {
        const args = request.args[0];
        return await this.#handleInvokeError({
            client: this,
            error: (0, _0_worker_error_js_1.deserializeWorkerError)(args.error),
            function: args.function,
            n: args.n,
        }, () => Promise.resolve(false));
    }
    invoke = Object.assign(this.#invoke, {
        use: (handler) => {
            const handle = this.#handleInvokeError;
            this.#handleInvokeError = async (ctx, next) => {
                let result = null;
                return await handle(ctx, async () => {
                    if (result !== null)
                        return result;
                    result = await handler(ctx, next);
                    return result;
                });
            };
        },
    });
    async sendCode(phoneNumber) {
        return await this.#dispatch("sendCode", phoneNumber);
    }
    async checkCode(code) {
        return await this.#dispatch("checkCode", code);
    }
    async getPasswordHint() {
        return await this.#dispatch("getPasswordHint");
    }
    async checkPassword(password) {
        return await this.#dispatch("checkPassword", password);
    }
    async checkBotToken(botToken) {
        return await this.#dispatch("checkBotToken", botToken);
    }
    async signIn(params) {
        await (0, _2_sign_in_js_1.signIn)(this, this.#LsignIn, params);
    }
    async signOut() {
        return await this.#dispatch("signOut");
    }
    async exportAuthString() {
        return await this.#dispatch("exportAuthString");
    }
    async importAuthString(authString) {
        return await this.#dispatch("importAuthString", authString);
    }
    async getInputPeer(id) {
        return await this.#dispatch("getInputPeer", id);
    }
    async getInputChannel(id) {
        return await this.#dispatch("getInputChannel", id);
    }
    async getInputUser(id) {
        return await this.#dispatch("getInputUser", id);
    }
    async getMe() {
        return await this.#dispatch("getMe");
    }
    async showUsername(id, username) {
        return await this.#dispatch("showUsername", id, username);
    }
    async hideUsername(id, username) {
        return await this.#dispatch("hideUsername", id, username);
    }
    async reorderUsernames(id, order) {
        return await this.#dispatch("reorderUsernames", id, order);
    }
    async hideUsernames(id) {
        return await this.#dispatch("hideUsernames", id);
    }
    async getBusinessConnection(id) {
        return await this.#dispatch("getBusinessConnection", id);
    }
    async setOnline(online) {
        return await this.#dispatch("setOnline", online);
    }
    async setEmojiStatus(id, params) {
        return await this.#dispatch(id, params);
    }
    async setUserEmojiStatus(userId, id, params) {
        return await this.#dispatch("setUserEmojiStatus", userId, id, params);
    }
    async updateProfile(params) {
        return await this.#dispatch("updateProfile", params);
    }
    async setBirthday(params) {
        return await this.#dispatch("setBirthday", params);
    }
    async setPersonalChannel(params) {
        return await this.#dispatch("setPersonalChannel", params);
    }
    async setNameColor(color, params) {
        return await this.#dispatch("setNameColor", color, params);
    }
    async setProfileColor(color, params) {
        return await this.#dispatch("setProfileColor", color, params);
    }
    async setLocation(params) {
        return await this.#dispatch("setLocation", params);
    }
    async sendMessage(chatId, text, params) {
        return await this.#dispatch("sendMessage", chatId, text, params);
    }
    async sendPhoto(chatId, photo, params) {
        return await this.#dispatch("sendPhoto", chatId, photo, params);
    }
    async sendDocument(chatId, document, params) {
        return await this.#dispatch("sendDocument", chatId, document, params);
    }
    async sendSticker(chatId, sticker, params) {
        return await this.#dispatch("sendSticker", chatId, sticker, params);
    }
    async sendVideo(chatId, video, params) {
        return await this.#dispatch("sendVideo", chatId, video, params);
    }
    async sendAnimation(chatId, animation, params) {
        return await this.#dispatch("sendAnimation", chatId, animation, params);
    }
    async sendVoice(chatId, voice, params) {
        return await this.#dispatch("sendVoice", chatId, voice, params);
    }
    async sendAudio(chatId, audio, params) {
        return await this.#dispatch("sendAudio", chatId, audio, params);
    }
    async sendMediaGroup(chatId, media, params) {
        return await this.#dispatch("sendMediaGroup", chatId, media, params);
    }
    async sendVideoNote(chatId, videoNote, params) {
        return await this.#dispatch("sendVideoNote", chatId, videoNote, params);
    }
    async sendLocation(chatId, latitude, longitude, params) {
        return await this.#dispatch("sendLocation", chatId, latitude, longitude, params);
    }
    async sendContact(chatId, firstName, number, params) {
        return await this.#dispatch("sendContact", chatId, firstName, number, params);
    }
    async sendDice(chatId, params) {
        return await this.#dispatch("sendDice", chatId, params);
    }
    async sendVenue(chatId, latitude, longitude, title, address, params) {
        return await this.#dispatch("sendVenue", chatId, latitude, longitude, title, address, params);
    }
    async sendPoll(chatId, question, options, params) {
        return await this.#dispatch("sendPoll", chatId, question, options, params);
    }
    async sendInvoice(chatId, title, description, payload, currency, prices, params) {
        return await this.#dispatch("sendInvoice", chatId, title, description, payload, currency, prices, params);
    }
    async editMessageText(chatId, messageId, text, params) {
        return await this.#dispatch("editMessageText", chatId, messageId, text, params);
    }
    async editMessageCaption(chatId, messageId, params) {
        return await this.#dispatch("editMessageCaption", chatId, messageId, params);
    }
    async editMessageMedia(chatId, messageId, media, params) {
        return await this.#dispatch("editMessageMedia", chatId, messageId, media, params);
    }
    async editInlineMessageMedia(inlineMessageId, media, params) {
        return await this.#dispatch("editInlineMessageMedia", inlineMessageId, media, params);
    }
    async editInlineMessageText(inlineMessageId, text, params) {
        return await this.#dispatch("editInlineMessageText", inlineMessageId, text, params);
    }
    async editInlineMessageCaption(inlineMessageId, params) {
        return await this.#dispatch("editInlineMessageCaption", inlineMessageId, params);
    }
    async editMessageReplyMarkup(chatId, messageId, params) {
        return await this.#dispatch("editMessageReplyMarkup", chatId, messageId, params);
    }
    async editInlineMessageReplyMarkup(inlineMessageId, params) {
        return await this.#dispatch("editInlineMessageReplyMarkup", inlineMessageId, params);
    }
    async editMessageLiveLocation(chatId, messageId, latitude, longitude, params) {
        return await this.#dispatch("editMessageLiveLocation", chatId, messageId, latitude, longitude, params);
    }
    async editInlineMessageLiveLocation(inlineMessageId, latitude, longitude, params) {
        return await this.#dispatch("editInlineMessageLiveLocation", inlineMessageId, latitude, longitude, params);
    }
    async getMessages(chatId, messageIds) {
        return await this.#dispatch("getMessages", chatId, messageIds);
    }
    async getMessage(chatId, messageId) {
        return await this.#dispatch("getMessage", chatId, messageId);
    }
    async resolveMessageLink(link) {
        return await this.#dispatch("resolveMessageLink", link);
    }
    async deleteMessages(chatId, messageIds, params) {
        return await this.#dispatch("deleteMessages", chatId, messageIds, params);
    }
    async deleteMessage(chatId, messageId, params) {
        return await this.#dispatch("deleteMessage", chatId, messageId, params);
    }
    async deleteChatMemberMessages(chatId, memberId) {
        return await this.#dispatch("deleteChatMemberMessages", chatId, memberId);
    }
    async deleteScheduledMessages(chatId, messageIds) {
        return await this.#dispatch("deleteScheduledMessages", chatId, messageIds);
    }
    async deleteScheduledMessage(chatId, messageId) {
        return await this.#dispatch("deleteScheduledMessage", chatId, messageId);
    }
    async sendScheduledMessages(chatId, messageIds) {
        return await this.#dispatch("sendScheduledMessages", chatId, messageIds);
    }
    async sendScheduledMessage(chatId, messageId) {
        return await this.#dispatch("sendScheduledMessage", chatId, messageId);
    }
    async pinMessage(chatId, messageId, params) {
        return await this.#dispatch("pinMessage", chatId, messageId, params);
    }
    async unpinMessage(chatId, messageId, params) {
        return await this.#dispatch("unpinMessage", chatId, messageId, params);
    }
    async unpinMessages(chatId) {
        return await this.#dispatch("unpinMessages", chatId);
    }
    async forwardMessages(from, to, messageIds, params) {
        return await this.#dispatch("forwardMessages", from, to, messageIds, params);
    }
    async forwardMessage(from, to, messageId, params) {
        return await this.#dispatch("forwardMessage", from, to, messageId, params);
    }
    async stopPoll(chatId, messageId, params) {
        return await this.#dispatch("stopPoll", chatId, messageId, params);
    }
    async sendChatAction(chatId, action, params) {
        return await this.#dispatch("sendChatAction", chatId, action, params);
    }
    async searchMessages(params) {
        return await this.#dispatch("searchMessages", params);
    }
    async readMessages(chatId, untilMessageId) {
        return await this.#dispatch("readMessages", chatId, untilMessageId);
    }
    async startBot(botId, params) {
        return await this.#dispatch("startBot", botId, params);
    }
    async transcribeVoice(chatId, messageId) {
        return await this.#dispatch("transcribeVoice", chatId, messageId);
    }
    async getStickerSet(name) {
        return await this.#dispatch("getStickerSet", name);
    }
    async getLinkPreview(text, params) {
        return await this.#dispatch("getLinkPreview", text, params);
    }
    async openMiniApp(botId, chatId, params) {
        return await this.#dispatch("openMiniApp", botId, chatId, params);
    }
    async getProgressId() {
        return await this.#dispatch("getProgressId");
    }
    async getSavedMessages(chatId, params) {
        return await this.#dispatch("getSavedMessages", chatId, params);
    }
    async getSavedChats(params) {
        return await this.#dispatch("getSavedChats", params);
    }
    async getMessageReactions(chatId, messageId, params) {
        return await this.#dispatch("getMessageReactions", chatId, messageId, params);
    }
    async vote(chatId, messageId, optionIndexes) {
        return await this.#dispatch("vote", chatId, messageId, optionIndexes);
    }
    async retractVote(chatId, messageId) {
        return await this.#dispatch("retractVote", chatId, messageId);
    }
    async downloadChunk(fileId, params) {
        return await this.#dispatch("downloadChunk", fileId, params);
    }
    async *download(fileId, params) {
        let offset = 0;
        const chunkSize = params?.chunkSize ?? _4_constants_js_1.DOWNLOAD_MAX_CHUNK_SIZE;
        while (true) {
            const chunk = await this.downloadChunk(fileId, { chunkSize, offset });
            yield chunk;
            if (chunk.length < chunkSize) {
                break;
            }
            else {
                offset += chunk.length;
            }
        }
    }
    async getCustomEmojiStickers(id) {
        return await this.#dispatch("getCustomEmojiStickers", id);
    }
    async getChats(params) {
        return await this.#dispatch("getChats", params);
    }
    async getChat(chatId) {
        return await this.#dispatch("getChat", chatId);
    }
    async getHistory(chatId, params) {
        return await this.#dispatch("getHistory", chatId, params);
    }
    async setAvailableReactions(chatId, availableReactions) {
        return await this.#dispatch("setAvailableReactions", chatId, availableReactions);
    }
    async setChatPhoto(chatId, photo, params) {
        return await this.#dispatch("setChatPhoto", chatId, photo, params);
    }
    async deleteChatPhoto(chatId) {
        return await this.#dispatch("deleteChatPhoto", chatId);
    }
    async banChatMember(chatId, memberId, params) {
        return await this.#dispatch("banChatMember", chatId, memberId, params);
    }
    async unbanChatMember(chatId, memberId) {
        return await this.#dispatch("unbanChatMember", chatId, memberId);
    }
    async kickChatMember(chatId, memberId) {
        return await this.#dispatch("kickChatMember", chatId, memberId);
    }
    async setChatMemberRights(chatId, memberId, params) {
        return await this.#dispatch("setChatMemberRights", chatId, memberId, params);
    }
    async getChatAdministrators(chatId) {
        return await this.#dispatch("getChatAdministrators", chatId);
    }
    async enableJoinRequests(chatId) {
        return await this.#dispatch("enableJoinRequests", chatId);
    }
    async disableJoinRequests(chatId) {
        return await this.#dispatch("disableJoinRequests", chatId);
    }
    async getInactiveChats() {
        return await this.#dispatch("getInactiveChats");
    }
    async getCreatedInviteLinks(chatId, params) {
        return await this.#dispatch("getCreatedInviteLinks", chatId, params);
    }
    async joinChat(chatId) {
        return await this.#dispatch("joinChat", chatId);
    }
    async leaveChat(chatId) {
        return await this.#dispatch("leaveChat", chatId);
    }
    async getChatMember(chatId, userId) {
        return await this.#dispatch("getChatMember", chatId, userId);
    }
    async getChatMembers(chatId, params) {
        return await this.#dispatch("getChatMembers", chatId, params);
    }
    async setChatStickerSet(chatId, setName) {
        return await this.#dispatch("setChatStickerSet", chatId, setName);
    }
    async deleteChatStickerSet(chatId) {
        return await this.#dispatch("deleteChatStickerSet", chatId);
    }
    async setBoostsRequiredToCircumventRestrictions(chatId, boosts) {
        return await this.#dispatch("setBoostsRequiredToCircumventRestrictions", chatId, boosts);
    }
    async createInviteLink(chatId, params) {
        return await this.#dispatch("createInviteLink", chatId, params);
    }
    async approveJoinRequest(chatId, userId) {
        return await this.#dispatch("approveJoinRequest", chatId, userId);
    }
    async declineJoinRequest(chatId, userId) {
        return await this.#dispatch("declineJoinRequest", chatId, userId);
    }
    async approveJoinRequests(chatId, params) {
        return await this.#dispatch("approveJoinRequests", chatId, params);
    }
    async declineJoinRequests(chatId, params) {
        return await this.#dispatch("declineJoinRequests", chatId, params);
    }
    async getJoinRequests(chatId, params) {
        return await this.#dispatch("getJoinRequests", chatId, params);
    }
    async addChatMember(chatId, userId, params) {
        return await this.#dispatch("addChatMember", chatId, userId, params);
    }
    async addChatMembers(chatId, userIds) {
        return await this.#dispatch("addChatMembers", chatId, userIds);
    }
    async openChat(chatId, params) {
        return await this.#dispatch("openChat", chatId, params);
    }
    async closeChat(chatId) {
        return await this.#dispatch("closeChat", chatId);
    }
    async createGroup(title, params) {
        return await this.#dispatch("createGroup", title, params);
    }
    async createSupergroup(title, params) {
        return await this.#dispatch("createSupergroup", title, params);
    }
    async createChannel(title, params) {
        return await this.#dispatch("createChannel", title, params);
    }
    async setMessageTtl(chatId, messageTtl) {
        return await this.#dispatch("setMessageTtl", chatId, messageTtl);
    }
    async archiveChats(chatIds) {
        return await this.#dispatch("archiveChats", chatIds);
    }
    async archiveChat(chatId) {
        return await this.#dispatch("archiveChat", chatId);
    }
    async unarchiveChats(chatIds) {
        return await this.#dispatch("unarchiveChats", chatIds);
    }
    async unarchiveChat(chatId) {
        return await this.#dispatch("unarchiveChat", chatId);
    }
    async getCommonChats(userId, params) {
        return await this.#dispatch("getCommonChats", userId, params);
    }
    async getChatSettings(chatId) {
        return await this.#dispatch("getChatSettings", chatId);
    }
    async disableBusinessBots(chatId) {
        return await this.#dispatch("disableBusinessBots", chatId);
    }
    async enableBusinessBots(chatId) {
        return await this.#dispatch("enableBusinessBots", chatId);
    }
    async disableSlowMode(chatId) {
        return await this.#dispatch("disableSlowMode", chatId);
    }
    async setSlowMode(chatId, duration) {
        return await this.#dispatch("setSlowMode", chatId, duration);
    }
    async setChatTitle(chatId, title) {
        return await this.#dispatch("setChatTitle", chatId, title);
    }
    async setChatDescription(chatId, description) {
        return await this.#dispatch("setChatDescription", chatId, description);
    }
    async setMemberListVisibility(chatId, visible) {
        return await this.#dispatch("setMemberListVisibility", chatId, visible);
    }
    async setTopicsEnabled(chatId, enabled, tabs) {
        return await this.#dispatch("setTopicsEnabled", chatId, enabled, tabs);
    }
    async setAntispamEnabled(chatId, enabled) {
        return await this.#dispatch("setAntispamEnabled", chatId, enabled);
    }
    async setSignaturesEnabled(chatId, enabled, params) {
        return await this.#dispatch("setSignaturesEnabled", chatId, enabled, params);
    }
    async deleteChat(chatId) {
        return await this.#dispatch("deleteChat", chatId);
    }
    async getDiscussionChatSuggestions() {
        return await this.#dispatch("getDiscussionChatSuggestions");
    }
    async setDiscussionChat(chatId, discussionChatId) {
        return await this.#dispatch("setDiscussionChat", chatId, discussionChatId);
    }
    async transferChatOwnership(chatId, userId, password) {
        return await this.#dispatch("transferChatOwnership", chatId, userId, password);
    }
    async createTopic(chatId, title, params) {
        return await this.#dispatch("createTopic", chatId, title, params);
    }
    async editTopic(chatId, topicId, title, params) {
        return await this.#dispatch("editTopic", chatId, topicId, title, params);
    }
    async hideGeneralTopic(chatId) {
        return await this.#dispatch("hideGeneralTopic", chatId);
    }
    async showGeneralTopic(chatId) {
        return await this.#dispatch("showGeneralTopic", chatId);
    }
    async closeTopic(chatId, topicId) {
        return await this.#dispatch("closeTopic", chatId, topicId);
    }
    async reopenTopic(chatId, topicId) {
        return await this.#dispatch("reopenTopic", chatId, topicId);
    }
    async pinTopic(chatId, topicId) {
        return await this.#dispatch("pinTopic", chatId, topicId);
    }
    async unpinTopic(chatId, topicId) {
        return await this.#dispatch("unpinTopic", chatId, topicId);
    }
    async promoteChatMember(chatId, userId, params) {
        return await this.#dispatch("promoteChatMember", chatId, userId, params);
    }
    async sendCallbackQuery(botId, messageId, question) {
        return await this.#dispatch("sendCallbackQuery", botId, messageId, question);
    }
    async answerCallbackQuery(id, params) {
        return await this.#dispatch("answerCallbackQuery", id, params);
    }
    async sendInlineQuery(botId, chatId, params) {
        return await this.#dispatch("sendInlineQuery", botId, chatId, params);
    }
    async answerInlineQuery(id, results, params) {
        return await this.#dispatch("answerInlineQuery", id, results, params);
    }
    async setMyDescription(params) {
        return await this.#dispatch("setMyDescription", params);
    }
    async setMyName(params) {
        return await this.#dispatch("setMyName", params);
    }
    async setMyShortDescription(params) {
        return await this.#dispatch("setMyShortDescription", params);
    }
    async getMyDescription(params) {
        return await this.#dispatch("getMyDescription", params);
    }
    async getMyName(params) {
        return await this.#dispatch("getMyName", params);
    }
    async getMyShortDescription(params) {
        return await this.#dispatch("getMyShortDescription", params);
    }
    async setMyCommands(commands, params) {
        return await this.#dispatch("setMyCommands", commands, params);
    }
    async getMyCommands(params) {
        return await this.#dispatch("getMyCommands", params);
    }
    async setReactions(chatId, messageId, reactions, params) {
        return await this.#dispatch("setReactions", chatId, messageId, reactions, params);
    }
    async addReaction(chatId, messageId, reaction, params) {
        return await this.#dispatch("addReaction", chatId, messageId, reaction, params);
    }
    async removeReaction(chatId, messageId, reaction) {
        return await this.#dispatch("removeReaction", chatId, messageId, reaction);
    }
    async createStory(chatId, content, params) {
        return await this.#dispatch("createStory", chatId, content, params);
    }
    async getStories(chatId, storyIds) {
        return await this.#dispatch("getStories", chatId, storyIds);
    }
    async getStory(chatId, storyId) {
        return await this.#dispatch("getStory", chatId, storyId);
    }
    async deleteStories(chatId, storyIds) {
        return await this.#dispatch("deleteStories", chatId, storyIds);
    }
    async deleteStory(chatId, storyId) {
        return await this.#dispatch("deleteStory", chatId, storyId);
    }
    async addStoriesToHighlights(chatId, storyIds) {
        return await this.#dispatch("addStoriesToHighlights", chatId, storyIds);
    }
    async addStoryToHighlights(chatId, storyId) {
        return await this.#dispatch("addStoryToHighlights", chatId, storyId);
    }
    async removeStoriesFromHighlights(chatId, storyIds) {
        return await this.#dispatch("removeStoriesFromHighlights", chatId, storyIds);
    }
    async removeStoryFromHighlights(chatId, storyId) {
        return await this.#dispatch("removeStoryFromHighlights", chatId, storyId);
    }
    async getNetworkStatistics() {
        return await this.#dispatch("getNetworkStatistics");
    }
    async blockUser(userId) {
        return await this.#dispatch("blockUser", userId);
    }
    async unblockUser(userId) {
        return await this.#dispatch("unblockUser", userId);
    }
    async startVideoChat(chatId, params) {
        return await this.#dispatch("startVideoChat", chatId, params);
    }
    async scheduleVideoChat(chatId, startAt, params) {
        return await this.#dispatch("scheduleVideoChat", chatId, startAt, params);
    }
    async joinVideoChat(id, params_, params) {
        return await this.#dispatch("joinVideoChat", id, params_, params);
    }
    async leaveVideoChat(id) {
        return await this.#dispatch("leaveVideoChat", id);
    }
    async joinLiveStream(id) {
        return await this.#dispatch("joinLiveStream", id);
    }
    async getVideoChat(id) {
        return await this.#dispatch("getVideoChat", id);
    }
    async getLiveStreamChannels(id) {
        return await this.#dispatch("getLiveStreamChannels", id);
    }
    async downloadLiveStreamSegment(id, channelId, scale, timestamp, params) {
        return await this.#dispatch("downloadLiveStreamSegment", id, channelId, scale, timestamp, params);
    }
    async answerPreCheckoutQuery(preCheckoutQueryId, ok, params) {
        return await this.#dispatch("answerPreCheckoutQuery", preCheckoutQueryId, ok, params);
    }
    async refundStarPayment(userId, telegramPaymentChargeId) {
        return await this.#dispatch("refundStarPayment", userId, telegramPaymentChargeId);
    }
    async getContacts() {
        return await this.#dispatch("getContacts");
    }
    async deleteContacts(userIds) {
        return await this.#dispatch("deleteContacts", userIds);
    }
    async deleteContact(userId) {
        return await this.#dispatch("deleteContact", userId);
    }
    async addContact(userId, params) {
        return await this.#dispatch("addContact", userId, params);
    }
    async getTranslations(params) {
        return await this.#dispatch("getTranslations", params);
    }
    async getGifts() {
        return await this.#dispatch("getGifts");
    }
    async getClaimedGifts(chatId, params) {
        return await this.#dispatch("getClaimedGifts", chatId, params);
    }
    async sendGift(chatId, giftId, params) {
        return await this.#dispatch("sendGift", chatId, giftId, params);
    }
    async sellGift(userId, messageId) {
        return await this.#dispatch("sellGift", userId, messageId);
    }
    async getGift(slug) {
        return await this.#dispatch("getGift", slug);
    }
}
exports.ClientDispatcher = ClientDispatcher;
