import * as dntShim from "../_dnt.shims.js";
import { concat } from "../0_deps.js";
import { intFromBytes, intToBytes } from "./0_int.js";
export class CTR {
    #key;
    #iv;
    #bytesUntilNextBlock = 0;
    #promise;
    get _state() {
        return { iv: new Uint8Array(this.#iv), state: this.#bytesUntilNextBlock };
    }
    constructor(key, iv) {
        this.#key = key;
        this.#iv = iv;
    }
    static async importKey(key) {
        return await dntShim.crypto.subtle.importKey("raw", key, "AES-CTR", false, ["encrypt"]);
    }
    async call(data) {
        if (this.#promise) {
            await Promise.allSettled([this.#promise]);
        }
        return await (this.#promise = this.#call(data));
    }
    async #call(data) {
        let header;
        if (this.#bytesUntilNextBlock) {
            const headerLength = Math.min(data.length, this.#iv.length - this.#bytesUntilNextBlock);
            const encrypted = await this.#encrypt(concat([new Uint8Array(this.#bytesUntilNextBlock), data.subarray(0, headerLength)]));
            header = encrypted.subarray(this.#bytesUntilNextBlock);
            data = data.subarray(headerLength);
            if (encrypted.length === this.#iv.length) {
                this.#increaseIv(1);
                this.#bytesUntilNextBlock = 0;
            }
            else {
                this.#bytesUntilNextBlock += headerLength;
            }
        }
        if (!data.length && header) {
            return header;
        }
        const encrypted = await this.#encrypt(data);
        this.#bytesUntilNextBlock = encrypted.length % this.#iv.length;
        this.#increaseIv((encrypted.length - this.#bytesUntilNextBlock) / this.#iv.length);
        return header ? concat([header, encrypted]) : encrypted;
    }
    async #encrypt(data) {
        return new Uint8Array(await dntShim.crypto.subtle.encrypt({
            name: "AES-CTR",
            counter: new Uint8Array(this.#iv),
            length: this.#iv.length * 8,
        }, this.#key, data));
    }
    #increaseIv(amount) {
        if (amount < 1) {
            return;
        }
        this.#iv = intToBytes(intFromBytes(this.#iv, { byteOrder: "big", isSigned: false }) + BigInt(amount), this.#iv.length, { byteOrder: "big", isSigned: false });
    }
}
