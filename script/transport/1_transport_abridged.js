"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportAbridged = void 0;
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _0_obfuscation_js_1 = require("./0_obfuscation.js");
const _0_transport_js_1 = require("./0_transport.js");
class TransportAbridged extends _0_transport_js_1.Transport {
    #connection;
    #obfuscated;
    constructor(connection, obfuscated = false) {
        super();
        this.#connection = connection;
        this.#obfuscated = obfuscated;
    }
    async initialize() {
        if (this.#obfuscated) {
            this.obfuscationParameters = await (0, _0_obfuscation_js_1.getObfuscationParameters)(0xEFEFEFEF, this.#connection);
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
                length = Number((0, _1_utilities_js_1.intFromBytes)(buffer, { isSigned: false }));
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
        const length = bufferLength >= 0x7F ? (0, _1_utilities_js_1.intToBytes)(bufferLength, 3, { isSigned: false }) : new Uint8Array();
        const data = (0, _0_deps_js_1.concat)([header, length, buffer]);
        await this.#connection.write(await this.encrypt(data));
    }
}
exports.TransportAbridged = TransportAbridged;
