import { concat } from "../0_deps.js";
import { intFromBytes, intToBytes } from "../1_utilities.js";
import { getObfuscationParameters } from "./0_obfuscation.js";
import { Transport } from "./0_transport.js";
export class TransportAbridged extends Transport {
    #connection;
    #obfuscated;
    constructor(connection, obfuscated = false) {
        super();
        this.#connection = connection;
        this.#obfuscated = obfuscated;
    }
    async initialize() {
        if (this.#obfuscated) {
            this.obfuscationParameters = await getObfuscationParameters(0xEFEFEFEF, this.#connection);
        }
        else {
            await this.#connection.write(new Uint8Array([0xEF]));
        }
    }
    async receive() {
        let length;
        {
            let buffer = new Uint8Array(1);
            await this.#connection.read(buffer);
            buffer = await this.decrypt(buffer);
            if (buffer[0] < 0x7F) {
                length = buffer[0];
            }
            else {
                let buffer = new Uint8Array(3);
                await this.#connection.read(buffer);
                buffer = await this.decrypt(buffer);
                length = Number(intFromBytes(buffer, { isSigned: false }));
            }
        }
        length *= 4;
        const buffer = new Uint8Array(length);
        await this.#connection.read(buffer);
        return await this.decrypt(buffer);
    }
    async send(buffer) {
        const bufferLength = buffer.length / 4;
        const header = new Uint8Array([bufferLength >= 0x7F ? 0x7F : bufferLength]);
        const length = bufferLength >= 0x7F ? intToBytes(bufferLength, 3, { isSigned: false }) : new Uint8Array();
        const data = concat([header, length, buffer]);
        await this.#connection.write(await this.encrypt(data));
    }
}
