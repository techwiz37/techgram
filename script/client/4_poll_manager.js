"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollManager = void 0;
const _0_deps_js_1 = require("../0_deps.js");
const _0_errors_js_1 = require("../0_errors.js");
const _2_tl_js_1 = require("../2_tl.js");
const _3_types_js_1 = require("../3_types.js");
const pollManagerUpdates = [
    "updateMessagePoll",
    "updateMessagePollVote",
];
class PollManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    async vote(chatId, messageId, optionIndexes) {
        this.#c.storage.assertUser("vote");
        if (!optionIndexes.length) {
            throw new _0_errors_js_1.InputError("No options provided.");
        }
        await this.#voteInner(chatId, messageId, optionIndexes);
    }
    async retractVote(chatId, messageId) {
        this.#c.storage.assertUser("retractVote");
        await this.#voteInner(chatId, messageId, []);
    }
    async #voteInner(chatId, messageId, optionIndexes) {
        const message = await this.#c.messageManager.getMessage(chatId, messageId);
        if (!("poll" in message)) {
            throw new _0_errors_js_1.InputError("Message not a poll.");
        }
        if (message.poll.options.filter((v) => v.isChosen).length === 0 && optionIndexes.length === 0) {
            throw new _0_errors_js_1.InputError("No vote has been casted.");
        }
        if (!message.poll.allowMultipleAnswers && optionIndexes.length > 1) {
            throw new _0_errors_js_1.InputError("Cannot cast multiple options for this vote.");
        }
        for (const optionIndex of optionIndexes) {
            if (optionIndex + 1 > message.poll.options.length) {
                throw new _0_errors_js_1.InputError("Got invalid option index.");
            }
        }
        if (optionIndexes.length > 0 && message.poll.options.map((v, i) => [i, v.isChosen]).filter((v) => v[1]).every(([v]) => optionIndexes.includes(v))) {
            throw new _0_errors_js_1.InputError("The same options are already casted.");
        }
        const peer = await this.#c.getInputPeer(chatId);
        const chatId_ = _2_tl_js_1.Api.peerToChatId(peer);
        const message_ = await this.#c.messageStorage.getMessage(chatId_, messageId);
        if (!_2_tl_js_1.Api.is("message", message_)) {
            (0, _0_deps_js_1.unreachable)();
        }
        const media = message_.media;
        if (!_2_tl_js_1.Api.is("messageMediaPoll", media)) {
            (0, _0_deps_js_1.unreachable)();
        }
        const poll = media.poll;
        optionIndexes = Array.from(new Set(optionIndexes));
        const options = optionIndexes.map((i) => poll.answers[i].option);
        await this.#c.invoke({ _: "messages.sendVote", peer, msg_id: messageId, options });
    }
    canHandleUpdate(update) {
        return _2_tl_js_1.Api.isOneOf(pollManagerUpdates, update);
    }
    async handleUpdate(update) {
        if (_2_tl_js_1.Api.is("updateMessagePoll", update)) {
            await this.#c.messageStorage.setPollResults(update.poll_id, update.results);
            let poll = null;
            if (update.poll) {
                poll = update.poll;
                await this.#c.messageStorage.setPoll(poll.id, poll);
            }
            else {
                poll = await this.#c.messageStorage.getPoll(update.poll_id);
            }
            if (poll) {
                const messageMediaPoll = { _: "messageMediaPoll", poll, results: update.results };
                return { poll: (0, _3_types_js_1.constructPoll)(messageMediaPoll) };
            }
            else {
                return null;
            }
        }
        else {
            const pollAnswer = (0, _3_types_js_1.constructPollAnswer)(update, this.#c.getPeer);
            return { pollAnswer };
        }
    }
}
exports.PollManager = PollManager;
