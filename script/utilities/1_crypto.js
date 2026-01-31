"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CTR = void 0;
const dntShim = __importStar(require("../_dnt.shims.js"));
const _0_deps_js_1 = require("../0_deps.js");
const _0_int_js_1 = require("./0_int.js");
class CTR {
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
            const encrypted = await this.#encrypt((0, _0_deps_js_1.concat)([new Uint8Array(this.#bytesUntilNextBlock), data.subarray(0, headerLength)]));
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
        return header ? (0, _0_deps_js_1.concat)([header, encrypted]) : encrypted;
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
        this.#iv = (0, _0_int_js_1.intToBytes)((0, _0_int_js_1.intFromBytes)(this.#iv, { byteOrder: "big", isSigned: false }) + BigInt(amount), this.#iv.length, { byteOrder: "big", isSigned: false });
    }
}
exports.CTR = CTR;
