import { unreachable } from "../0_deps.ts";
import { InputError } from "../0_errors.ts";
import { Api } from "../2_tl.ts";
import { constructPoll, constructPollAnswer, type ID, type Update } from "../3_types.ts";
import type { UpdateProcessor } from "./0_update_processor.ts";
import type { C as C_ } from "./1_types.ts";
import type { MessageManager } from "./3_message_manager.ts";

type C = C_ & { messageManager: MessageManager };

const pollManagerUpdates = [
  "updateMessagePoll",
  "updateMessagePollVote",
] as const;

type PollManagerUpdate = Api.Types[(typeof pollManagerUpdates)[number]];

export class PollManager implements UpdateProcessor<PollManagerUpdate, true> {
  #c: C;

  constructor(c: C) {
    this.#c = c;
  }

  async vote(chatId: ID, messageId: number, optionIndexes: number[]) {
    this.#c.storage.assertUser("vote");
    if (!optionIndexes.length) {
      throw new InputError("No options provided.");
    }
    await this.#voteInner(chatId, messageId, optionIndexes);
  }

  async retractVote(chatId: ID, messageId: number) {
    this.#c.storage.assertUser("retractVote");
    await this.#voteInner(chatId, messageId, []);
  }

  async #voteInner(chatId: ID, messageId: number, optionIndexes: number[]) {
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
    if (optionIndexes.length > 0 && message.poll.options.map((v, i): [number, boolean] => [i, v.isChosen]).filter((v) => v[1]).every(([v]) => optionIndexes.includes(v))) {
      throw new InputError("The same options are already casted.");
    }
    const peer = await this.#c.getInputPeer(chatId);
    const chatId_ = Api.peerToChatId(peer as Api.IdentifierContainer);
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

  canHandleUpdate(update: Api.Update): update is PollManagerUpdate {
    return Api.isOneOf(pollManagerUpdates, update);
  }

  async handleUpdate(update: PollManagerUpdate): Promise<Update | null> {
    if (Api.is("updateMessagePoll", update)) {
      await this.#c.messageStorage.setPollResults(update.poll_id, update.results);
      let poll: Api.poll | null = null;
      if (update.poll) {
        poll = update.poll;
        await this.#c.messageStorage.setPoll(poll.id, poll);
      } else {
        poll = await this.#c.messageStorage.getPoll(update.poll_id);
      }
      if (poll) {
        const messageMediaPoll: Api.messageMediaPoll = { _: "messageMediaPoll", poll, results: update.results };
        return { poll: constructPoll(messageMediaPoll) };
      } else {
        return null;
      }
    } else {
      const pollAnswer = constructPollAnswer(update, this.#c.getPeer);
      return { pollAnswer };
    }
  }
}
