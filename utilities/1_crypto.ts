import { concat } from "../0_deps.ts";
import { intFromBytes, intToBytes } from "./0_int.ts";

export class CTR {
  #key: CryptoKey;
  #iv: Uint8Array;
  #bytesUntilNextBlock = 0;
  #promise?: Promise<Uint8Array<ArrayBuffer>>;

  get _state(): { iv: Uint8Array; state: number } {
    return { iv: new Uint8Array(this.#iv), state: this.#bytesUntilNextBlock };
  }

  constructor(key: CryptoKey, iv: Uint8Array) {
    this.#key = key;
    this.#iv = iv;
  }

  static async importKey(key: Uint8Array<ArrayBuffer>): Promise<CryptoKey> {
    return await crypto.subtle.importKey("raw", key, "AES-CTR", false, ["encrypt"]);
  }

  async call(data: Uint8Array<ArrayBuffer>): Promise<Uint8Array<ArrayBuffer>> {
    if (this.#promise) {
      await Promise.allSettled([this.#promise]);
    }
    return await (this.#promise = this.#call(data));
  }

  async #call(data: Uint8Array<ArrayBuffer>) {
    let header: Uint8Array<ArrayBuffer> | undefined;
    if (this.#bytesUntilNextBlock) {
      const headerLength = Math.min(data.length, this.#iv.length - this.#bytesUntilNextBlock);
      const encrypted = await this.#encrypt(concat([new Uint8Array(this.#bytesUntilNextBlock), data.subarray(0, headerLength)]));
      header = encrypted.subarray(this.#bytesUntilNextBlock);
      data = data.subarray(headerLength);
      if (encrypted.length === this.#iv.length) {
        this.#increaseIv(1);
        this.#bytesUntilNextBlock = 0;
      } else {
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

  async #encrypt(data: Uint8Array<ArrayBuffer>) {
    return new Uint8Array(
      await crypto.subtle.encrypt(
        {
          name: "AES-CTR",
          counter: new Uint8Array(this.#iv),
          length: this.#iv.length * 8,
        },
        this.#key,
        data,
      ),
    );
  }

  #increaseIv(amount: number) {
    if (amount < 1) {
      return;
    }
    this.#iv = intToBytes(intFromBytes(this.#iv, { byteOrder: "big", isSigned: false }) + BigInt(amount), this.#iv.length, { byteOrder: "big", isSigned: false });
  }
}
