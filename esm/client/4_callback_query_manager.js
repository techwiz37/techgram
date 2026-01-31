import { SECOND } from "../0_deps.js";
import { encodeText } from "../1_utilities.js";
import { Api } from "../2_tl.js";
import { constructCallbackQuery, constructCallbackQueryAnswer, validateCallbackQueryQuestion } from "../3_types.js";
import { checkPassword } from "./0_password.js";
import { checkCallbackQueryId, checkMessageId } from "./0_utilities.js";
const callbackQueryManagerUpdates = [
    "updateBotCallbackQuery",
    "updateInlineBotCallbackQuery",
];
export class CallbackQueryManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    async answerCallbackQuery(id, params) {
        this.#c.storage.assertBot("answerCallbackQuery");
        checkCallbackQueryId(id);
        await this.#c.invoke({ _: "messages.setBotCallbackAnswer", query_id: BigInt(id), cache_time: params?.cacheTime ?? 0, message: params?.text, alert: params?.alert ? true : undefined });
    }
    async sendCallbackQuery(botId, messageId, question) {
        this.#c.storage.assertUser("sendCallbackQuery");
        checkMessageId(messageId);
        validateCallbackQueryQuestion(question);
        const peer = await this.#c.getInputPeer(botId), peerId = await this.#c.getInputPeerChatId(peer), questionKey = JSON.stringify(question);
        const maybeAnswer = await this.#c.messageStorage.getCallbackQueryAnswer(peerId, messageId, questionKey);
        if (maybeAnswer !== null && !CallbackQueryManager.#isExpired(maybeAnswer[1], maybeAnswer[0].cache_time)) {
            return constructCallbackQueryAnswer(maybeAnswer[0]);
        }
        const answer = await this.#c.invoke({ _: "messages.getBotCallbackAnswer", peer, msg_id: messageId, data: "data" in question ? encodeText(question.data) : undefined, game: question.type === "game" ? true : undefined, password: question.type === "password" ? await this.#getPasswordCheck(question.password) : undefined });
        if (answer.cache_time >= 0) {
            await this.#c.messageStorage.setCallbackQueryAnswer(peerId, messageId, questionKey, answer);
        }
        return constructCallbackQueryAnswer(answer);
    }
    static #isExpired(date, cacheTime) {
        return (Date.now() - date.getTime()) / SECOND > cacheTime;
    }
    async #getPasswordCheck(password) {
        const ap = await this.#c.invoke({ _: "account.getPassword" });
        return await checkPassword(password, ap);
    }
    canHandleUpdate(update) {
        return Api.isOneOf(callbackQueryManagerUpdates, update);
    }
    async handleUpdate(update) {
        return { callbackQuery: await constructCallbackQuery(update, this.#c.getPeer, this.#c.messageManager.getMessageWithReply.bind(this.#c.messageManager)) };
    }
}
