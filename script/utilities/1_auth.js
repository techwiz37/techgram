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
exports.rsaPad = rsaPad;
const dntShim = __importStar(require("../_dnt.shims.js"));
const _0_deps_js_1 = require("../0_deps.js");
const _0_hash_js_1 = require("./0_hash.js");
const _0_int_js_1 = require("./0_int.js");
async function rsaPad(data, [serverKey, exponent]) {
    (0, _0_deps_js_1.assert)(data.length <= 144);
    let keyAesEncryptedInt;
    let tries = 0;
    do {
        if (++tries === 10) {
            throw new Error("Out of tries");
        }
        const dataWithPadding = (0, _0_deps_js_1.concat)([data, new Uint8Array(192 - data.length)]);
        const dataPadReversed = new Uint8Array(dataWithPadding).reverse();
        const tempKey = dntShim.crypto.getRandomValues(new Uint8Array(32));
        const dataWithHash = (0, _0_deps_js_1.concat)([dataPadReversed, await (0, _0_hash_js_1.sha256)((0, _0_deps_js_1.concat)([tempKey, dataWithPadding]))]);
        const aesEncrypted = (0, _0_deps_js_1.ige256Encrypt)(dataWithHash, tempKey, new Uint8Array(32));
        const aesEncryptedSha256 = await (0, _0_hash_js_1.sha256)(aesEncrypted);
        const tempKeyXor = tempKey.map((v, i) => v ^ aesEncryptedSha256[i]);
        const keyAesEncrypted = (0, _0_deps_js_1.concat)([tempKeyXor, aesEncrypted]);
        (0, _0_deps_js_1.assertEquals)(keyAesEncrypted.length, 256);
        keyAesEncryptedInt = (0, _0_int_js_1.intFromBytes)(keyAesEncrypted, { byteOrder: "big", isSigned: false });
    } while (keyAesEncryptedInt >= serverKey);
    const encryptedDataInt = (0, _0_int_js_1.modExp)(keyAesEncryptedInt, exponent, serverKey);
    const encryptedData = (0, _0_int_js_1.intToBytes)(encryptedDataInt, 256, { byteOrder: "big", isSigned: false });
    (0, _0_deps_js_1.assertEquals)(encryptedData.length, 256);
    return encryptedData;
}
