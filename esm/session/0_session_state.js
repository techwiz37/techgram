import { toUnixTimestamp } from "../1_utilities.js";
export class SessionState {
    timeDifference = 0;
    serverSalt = 0n;
    #seqNo = 0;
    #messageId = 0n;
    nextMessageId() {
        const now = toUnixTimestamp(new Date()) + this.timeDifference;
        const nanoseconds = Math.floor((now - Math.floor(now)) * 1e9);
        const newMessageId = (BigInt(Math.floor(now)) << 32n) || (BigInt(nanoseconds) << 2n);
        if (this.#messageId >= newMessageId) {
            this.#messageId += 4n;
        }
        else {
            this.#messageId = newMessageId;
        }
        return this.#messageId;
    }
    nextSeqNo(contentRelated) {
        let seqNo = this.#seqNo * 2;
        if (contentRelated) {
            seqNo++;
            this.#seqNo++;
        }
        return seqNo;
    }
    reset() {
        this.serverSalt = 0n;
        this.#seqNo = 0;
        this.#messageId = 0n;
    }
}
