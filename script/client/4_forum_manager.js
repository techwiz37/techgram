"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumManager = void 0;
const _0_errors_js_1 = require("../0_errors.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _3_types_js_1 = require("../3_types.js");
class ForumManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    static #validateTopicTitle(title) {
        title = title.trim();
        if (!title) {
            throw new InputEvent("Invalid topic title.");
        }
        return title;
    }
    async createTopic(chatId, title, params) {
        title = _a.#validateTopicTitle(title);
        let send_as;
        if (params?.sendAs) {
            this.#c.storage.assertUser("sendAs");
            send_as = await this.#c.getInputPeer(params.sendAs);
        }
        const peer = await this.#c.getInputPeer(chatId);
        const updates = await this.#c.invoke({
            _: "messages.createForumTopic",
            peer,
            title,
            icon_color: params?.color,
            icon_emoji_id: params?.customEmojiId ? BigInt(params.customEmojiId) : undefined,
            send_as,
            random_id: (0, _1_utilities_js_1.getRandomId)(),
        });
        const message = (await this.#c.messageManager.updatesToMessages(chatId, updates))[0];
        return (0, _3_types_js_1.constructTopic)((0, _3_types_js_1.assertMessageType)(message, "forumTopicCreated"));
    }
    static #assertNongenralTopicIdValid(topicId) {
        if (!topicId || topicId < 2) {
            throw new _0_errors_js_1.InputError("Invalid topic ID.");
        }
    }
    static #assertAnyTopicIdValid(topicId) {
        if (!topicId || topicId < 1) {
            throw new _0_errors_js_1.InputError("Invalid topic ID.");
        }
    }
    async editTopic(chatId, topicId, title, params) {
        _a.#assertNongenralTopicIdValid(topicId);
        title = _a.#validateTopicTitle(title);
        const peer = await this.#c.getInputPeer(chatId);
        const updates = await this.#c.invoke({
            _: "messages.editForumTopic",
            peer,
            topic_id: topicId,
            title,
            icon_emoji_id: params?.customEmojiId ? BigInt(params.customEmojiId) : undefined,
        });
        const message = (await this.#c.messageManager.updatesToMessages(chatId, updates))[0];
        return (0, _3_types_js_1.constructTopic)((0, _3_types_js_1.assertMessageType)(message, "forumTopicEdited"));
    }
    async #toggleGeneralTopicHidden(chatId, hidden) {
        const peer = await this.#c.getInputPeer(chatId);
        await this.#c.invoke({
            _: "messages.editForumTopic",
            peer,
            topic_id: 1,
            hidden,
        });
    }
    async hideGeneralTopic(chatId) {
        await this.#toggleGeneralTopicHidden(chatId, true);
    }
    async showGeneralTopic(chatId) {
        await this.#toggleGeneralTopicHidden(chatId, false);
    }
    async #toggleNongeneralTopicClosed(chatId, topicId, closed) {
        _a.#assertNongenralTopicIdValid(topicId);
        const peer = await this.#c.getInputPeer(chatId);
        await this.#c.invoke({
            _: "messages.editForumTopic",
            peer,
            topic_id: 1,
            closed,
        });
    }
    async closeTopic(chatId, topicId) {
        await this.#toggleNongeneralTopicClosed(chatId, topicId, true);
    }
    async reopenTopic(chatId, topicId) {
        await this.#toggleNongeneralTopicClosed(chatId, topicId, false);
    }
    async #setTopicPinned(chatId, topicId, pinned) {
        _a.#assertAnyTopicIdValid(topicId);
        const peer = await this.#c.getInputPeer(chatId);
        await this.#c.invoke({
            _: "messages.updatePinnedForumTopic",
            peer,
            topic_id: 1,
            pinned,
        });
    }
    async pinTopic(chatId, topicId) {
        await this.#setTopicPinned(chatId, topicId, true);
    }
    async unpinTopic(chatId, topicId) {
        await this.#setTopicPinned(chatId, topicId, false);
    }
}
exports.ForumManager = ForumManager;
_a = ForumManager;
