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
exports.getObfuscationParameters = getObfuscationParameters;
const dntShim = __importStar(require("../_dnt.shims.js"));
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
async function getObfuscationParameters(protocol, connection) {
    let init;
    while (true) {
        init = (0, _0_deps_js_1.concat)([dntShim.crypto.getRandomValues(new Uint8Array(56)), (0, _1_utilities_js_1.intToBytes)(protocol, 4, { byteOrder: "big", isSigned: false }), dntShim.crypto.getRandomValues(new Uint8Array(4))]);
        if (init[0] === 0xEF) {
            continue;
        }
        const dataView = new DataView(init.buffer, init.byteOffset, init.byteLength);
        const firstInt = dataView.getInt32(0);
        if ([0x44414548, 0x54534F50, 0x20544547, 0x4954504F, 0x02010316, 0xDDDDDDDD, 0xEEEEEEEE].includes(firstInt)) {
            continue;
        }
        const secondInt = dataView.getInt32(4);
        if (secondInt === 0x00000000) {
            continue;
        }
        break;
    }
    const encryptKey = init.slice(8, 8 + 32);
    const encryptIv = init.slice(40, 40 + 16);
    const importedEncryptedKey = await _1_utilities_js_1.CTR.importKey(encryptKey);
    const encryptionCTR = new _1_utilities_js_1.CTR(importedEncryptedKey, encryptIv);
    const encryptedInit = await encryptionCTR.call(init);
    const initRev = new Uint8Array(init).reverse();
    const decryptKey = initRev.slice(8, 8 + 32);
    const decryptIv = initRev.slice(40, 40 + 16);
    const importedDecryptKey = await _1_utilities_js_1.CTR.importKey(decryptKey);
    const decryptionCTR = new _1_utilities_js_1.CTR(importedDecryptKey, decryptIv);
    await connection.write((0, _0_deps_js_1.concat)([init.subarray(0, 56), encryptedInit.subarray(56, 56 + 8)]));
    return { encryptionCTR, decryptionCTR };
}
