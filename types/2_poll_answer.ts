import { unreachable } from "../0_deps.ts";
import { decodeText } from "../1_utilities.ts";
import type { Api } from "../2_tl.ts";
import type { ChatP, PeerGetter } from "./1_chat_p.ts";

export interface PollAnswer {

  pollId: string;

  from: ChatP;

  optionIndexes: number[];
}

export function constructPollAnswer(update: Api.updateMessagePollVote, getPeer: PeerGetter): PollAnswer {
  const pollId = String(update.poll_id);
  const peer = getPeer(update.peer);
  if (!peer) {
    unreachable();
  }
  const from = peer[0];
  const optionIndexes = update.options.map((v) => Number(decodeText(v)));
  return {
    pollId,
    from,
    optionIndexes,
  };
}
