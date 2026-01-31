import { concat } from "../0_deps.ts";
import { intToBytes } from "../1_utilities.ts";
import type { Connection } from "../2_connection.ts";
import { getObfuscationParameters } from "./0_obfuscation.ts";
import { Transport } from "./0_transport.ts";

export class TransportIntermediate extends Transport implements Transport {
  #connection: Connection;
  #obfuscated: boolean;

  constructor(connection: Connection, obfuscated = false) {
    super();
    this.#connection = connection;
    this.#obfuscated = obfuscated;
  }

  async initialize() {
    if (this.#obfuscated) {
      this.obfuscationParameters = await getObfuscationParameters(0xEEEEEEEE, this.#connection);
    } else {
      await this.#connection.write(new Uint8Array([0xEE, 0xEE, 0xEE, 0xEE]));
    }
  }

  async receive(): Promise<Uint8Array> {
    let length: number;

    {
      let buffer = new Uint8Array(4);
      await this.#connection.read(buffer);
      buffer = await this.decrypt(buffer);
      const dataView = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
      length = dataView.getUint32(0, true);
    }

    const buffer = new Uint8Array(length);
    await this.#connection.read(buffer);

    return await this.decrypt(buffer);
  }

  async send(buffer: Uint8Array) {
    const length = intToBytes(buffer.length, 4);
    const data = concat([length, buffer]);

    await this.#connection.write(await this.encrypt(data));
  }
}
