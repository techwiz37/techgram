import { unreachable } from "../0_deps.js";
import { decodeText } from "../1_utilities.js";
export function constructPollAnswer(update, getPeer) {
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
