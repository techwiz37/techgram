"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionState = void 0;
const _1_utilities_js_1 = require("../1_utilities.js");
class SessionState {
    timeDifference = 0;
    serverSalt = 0n;
    #seqNo = 0;
    #messageId = 0n;
    nextMessageId() {
        const now = (0, _1_utilities_js_1.toUnixTimestamp)(new Date()) + this.timeDifference;
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
exports.SessionState = SessionState;
