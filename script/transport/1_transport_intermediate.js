"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportIntermediate = void 0;
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _0_obfuscation_js_1 = require("./0_obfuscation.js");
const _0_transport_js_1 = require("./0_transport.js");
class TransportIntermediate extends _0_transport_js_1.Transport {
    #connection;
    #obfuscated;
    constructor(connection, obfuscated = false) {
        super();
        this.#connection = connection;
        this.#obfuscated = obfuscated;
    }
    async initialize() {
        if (this.#obfuscated) {
            this.obfuscationParameters = await (0, _0_obfuscation_js_1.getObfuscationParameters)(0xEEEEEEEE, this.#connection);
        }
        else {
            await this.#connection.write(new Uint8Array([0xEE, 0xEE, 0xEE, 0xEE]));
        }
    }
    async receive() {
        let length;
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
    async send(buffer) {
        const length = (0, _1_utilities_js_1.intToBytes)(buffer.length, 4);
        const data = (0, _0_deps_js_1.concat)([length, buffer]);
        await this.#connection.write(await this.encrypt(data));
    }
}
exports.TransportIntermediate = TransportIntermediate;
