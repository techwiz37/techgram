import { unreachable } from "../0_deps.js";
import { InputError } from "../0_errors.js";
import { Api } from "../2_tl.js";
import { constructPoll, constructPollAnswer } from "../3_types.js";
const pollManagerUpdates = [
    "updateMessagePoll",
    "updateMessagePollVote",
];
export class PollManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    async vote(chatId, messageId, optionIndexes) {
        this.#c.storage.assertUser("vote");
        if (!optionIndexes.length) {
            throw new InputError("No options provided.");
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
            throw new InputError("Message not a poll.");
        }
        if (message.poll.options.filter((v) => v.isChosen).length === 0 && optionIndexes.length === 0) {
            throw new InputError("No vote has been casted.");
        }
        if (!message.poll.allowMultipleAnswers && optionIndexes.length > 1) {
            throw new InputError("Cannot cast multiple options for this vote.");
        }
        for (const optionIndex of optionIndexes) {
            if (optionIndex + 1 > message.poll.options.length) {
                throw new InputError("Got invalid option index.");
            }
        }
        if (optionIndexes.length > 0 && message.poll.options.map((v, i) => [i, v.isChosen]).filter((v) => v[1]).every(([v]) => optionIndexes.includes(v))) {
            throw new InputError("The same options are already casted.");
        }
        const peer = await this.#c.getInputPeer(chatId);
        const chatId_ = Api.peerToChatId(peer);
        const message_ = await this.#c.messageStorage.getMessage(chatId_, messageId);
        if (!Api.is("message", message_)) {
            unreachable();
        }
        const media = message_.media;
        if (!Api.is("messageMediaPoll", media)) {
            unreachable();
        }
        const poll = media.poll;
        optionIndexes = Array.from(new Set(optionIndexes));
        const options = optionIndexes.map((i) => poll.answers[i].option);
        await this.#c.invoke({ _: "messages.sendVote", peer, msg_id: messageId, options });
    }
    canHandleUpdate(update) {
        return Api.isOneOf(pollManagerUpdates, update);
    }
    async handleUpdate(update) {
        if (Api.is("updateMessagePoll", update)) {
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
                return { poll: constructPoll(messageMediaPoll) };
            }
            else {
                return null;
            }
        }
        else {
            const pollAnswer = constructPollAnswer(update, this.#c.getPeer);
            return { pollAnswer };
        }
    }
}
