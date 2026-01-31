"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
exports.ige256Encrypt = ige256Encrypt;
exports.ige256Decrypt = ige256Decrypt;
const tgcrypto_js_1 = __importDefault(require("./tgcrypto.js"));
// deno-lint-ignore no-explicit-any
let module_;
const promise = (0, tgcrypto_js_1.default)().then((v) => module_ = v);
async function init() {
    await promise;
}
function checkIgeParams(data, key, iv) {
    if (data.byteLength == 0) {
        throw new TypeError("data must not be empty");
    }
    else if (data.byteLength % 16 != 0) {
        throw new TypeError("data must consist of a number of bytes that is divisible by 16");
    }
    else if (key.byteLength != 32) {
        throw new TypeError("key must be 32 bytes");
    }
    else if (iv.byteLength != 32) {
        throw new TypeError("iv must be 32 bytes");
    }
}
function ige256Encrypt(data, key, iv) {
    checkIgeParams(data, key, iv);
    const out = module_._malloc(data.byteLength);
    const datap = module_._malloc(data.byteLength);
    module_.HEAPU8.set(data, datap);
    module_.ccall("ige256_encrypt", "void", ["pointer", "pointer", "number", "array", "array"], [datap, out, data.byteLength, key, iv]);
    try {
        return module_.HEAPU8.slice(out, out + data.byteLength);
    }
    finally {
        module_._free(out);
        module_._free(datap);
    }
}
function ige256Decrypt(data, key, iv) {
    checkIgeParams(data, key, iv);
    const out = module_._malloc(data.byteLength);
    const datap = module_._malloc(data.byteLength);
    module_.HEAPU8.set(data, datap);
    module_.ccall("ige256_decrypt", "void", ["pointer", "pointer", "number", "array", "array"], [datap, out, data.byteLength, key, iv]);
    try {
        return module_.HEAPU8.slice(out, out + data.byteLength);
    }
    finally {
        module_._free(out);
        module_._free(datap);
    }
}
