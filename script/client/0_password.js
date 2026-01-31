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
exports.ph2 = exports.ph1 = exports.sh = exports.h = void 0;
exports.isSafePrime = isSafePrime;
exports.pbkdf2 = pbkdf2;
exports.isGoodModExpFirst = isGoodModExpFirst;
exports.pad = pad;
exports.checkPassword = checkPassword;
const dntShim = __importStar(require("../_dnt.shims.js"));
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
function isSafePrime(primeBytes, g) {
    const goodPrime = new Uint8Array([
        0xC7, 0x1C, 0xAE, 0xB9, 0xC6, 0xB1, 0xC9, 0x04, 0x8E, 0x6C, 0x52, 0x2F,
        0x70, 0xF1, 0x3F, 0x73, 0x98, 0x0D, 0x40, 0x23, 0x8E, 0x3E, 0x21, 0xC1,
        0x49, 0x34, 0xD0, 0x37, 0x56, 0x3D, 0x93, 0x0F, 0x48, 0x19, 0x8A, 0x0A,
        0xA7, 0xC1, 0x40, 0x58, 0x22, 0x94, 0x93, 0xD2, 0x25, 0x30, 0xF4, 0xDB,
        0xFA, 0x33, 0x6F, 0x6E, 0x0A, 0xC9, 0x25, 0x13, 0x95, 0x43, 0xAE, 0xD4,
        0x4C, 0xCE, 0x7C, 0x37, 0x20, 0xFD, 0x51, 0xF6, 0x94, 0x58, 0x70, 0x5A,
        0xC6, 0x8C, 0xD4, 0xFE, 0x6B, 0x6B, 0x13, 0xAB, 0xDC, 0x97, 0x46, 0x51,
        0x29, 0x69, 0x32, 0x84, 0x54, 0xF1, 0x8F, 0xAF, 0x8C, 0x59, 0x5F, 0x64,
        0x24, 0x77, 0xFE, 0x96, 0xBB, 0x2A, 0x94, 0x1D, 0x5B, 0xCD, 0x1D, 0x4A,
        0xC8, 0xCC, 0x49, 0x88, 0x07, 0x08, 0xFA, 0x9B, 0x37, 0x8E, 0x3C, 0x4F,
        0x3A, 0x90, 0x60, 0xBE, 0xE6, 0x7C, 0xF9, 0xA4, 0xA4, 0xA6, 0x95, 0x81,
        0x10, 0x51, 0x90, 0x7E, 0x16, 0x27, 0x53, 0xB5, 0x6B, 0x0F, 0x6B, 0x41,
        0x0D, 0xBA, 0x74, 0xD8, 0xA8, 0x4B, 0x2A, 0x14, 0xB3, 0x14, 0x4E, 0x0E,
        0xF1, 0x28, 0x47, 0x54, 0xFD, 0x17, 0xED, 0x95, 0x0D, 0x59, 0x65, 0xB4,
        0xB9, 0xDD, 0x46, 0x58, 0x2D, 0xB1, 0x17, 0x8D, 0x16, 0x9C, 0x6B, 0xC4,
        0x65, 0xB0, 0xD6, 0xFF, 0x9C, 0xA3, 0x92, 0x8F, 0xEF, 0x5B, 0x9A, 0xE4,
        0xE4, 0x18, 0xFC, 0x15, 0xE8, 0x3E, 0xBE, 0xA0, 0xF8, 0x7F, 0xA9, 0xFF,
        0x5E, 0xED, 0x70, 0x05, 0x0D, 0xED, 0x28, 0x49, 0xF4, 0x7B, 0xF9, 0x59,
        0xD9, 0x56, 0x85, 0x0C, 0xE9, 0x29, 0x85, 0x1F, 0x0D, 0x81, 0x15, 0xF6,
        0x35, 0xB1, 0x05, 0xEE, 0x2E, 0x4E, 0x15, 0xD0, 0x4B, 0x24, 0x54, 0xBF,
        0x6F, 0x4F, 0xAD, 0xF0, 0x34, 0xB1, 0x04, 0x03, 0x11, 0x9C, 0xD8, 0xE3,
        0xB9, 0x2F, 0xCC, 0x5B,
    ]);
    if (goodPrime.every((v, i) => v === primeBytes[i])) {
        if ([3, 4, 5, 7].includes(g)) {
            return true;
        }
    }
    return false;
}
// H(data) := sha256(data)
exports.h = _1_utilities_js_1.sha256;
// SH(data, salt) := H(salt | data | salt)
const sh = (data, salt) => (0, exports.h)((0, _0_deps_js_1.concat)([salt, data, salt]));
exports.sh = sh;
// PH1(password, salt1, salt2) := SH(SH(password, salt1), salt2)
const ph1 = async (password, salt1, salt2) => await (0, exports.sh)(await (0, exports.sh)(password, salt1), salt2);
exports.ph1 = ph1;
async function pbkdf2(password, salt, iterations) {
    const key = await dntShim.crypto.subtle.importKey("raw", password, "PBKDF2", false, ["deriveBits"]);
    const buffer = await dntShim.crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations, hash: "SHA-512" }, key, 512);
    return new Uint8Array(buffer);
}
// PH2(password, salt1, salt2) := SH(pbkdf2(sha512, PH1(password, salt1, salt2), salt1, 100000), salt2)
const ph2 = async (password, salt1, salt2) => await (0, exports.sh)(await pbkdf2(await (0, exports.ph1)(password, salt1, salt2), salt1, 100_000), salt2);
exports.ph2 = ph2;
function isGoodModExpFirst(modexp, prime) {
    const diff = prime - modexp;
    const minDiffBitsCount = 2048 - 64;
    const maxModExpSize = 256;
    return !(diff < 0n ||
        diff.toString(2).length < minDiffBitsCount ||
        modexp.toString(2).length < minDiffBitsCount ||
        Math.floor((modexp.toString(2).length + 7) / 8) > maxModExpSize);
}
function pad(bigint) {
    if (typeof bigint === "number") {
        bigint = BigInt(bigint);
    }
    if (typeof bigint === "bigint") {
        return (0, _1_utilities_js_1.intToBytes)(bigint, 256, { byteOrder: "big", isSigned: false });
    }
    else {
        return (0, _0_deps_js_1.concat)([new Uint8Array(256 - bigint.length), bigint]);
    }
}
async function checkPassword(password_, ap) {
    const password = (0, _1_utilities_js_1.encodeText)(password_);
    const algo = ap.current_algo;
    if (!(_2_tl_js_1.Api.is("passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow", algo))) {
        throw new Error("Unexpected algorithm");
    }
    const g = algo.g;
    const p = (0, _1_utilities_js_1.intFromBytes)(algo.p, { byteOrder: "big", isSigned: false });
    if (!isSafePrime(algo.p, g)) {
        throw new Error("Got unsafe prime");
    }
    const srpB = ap.srp_B;
    const srpId = ap.srp_id;
    {
        if (!srpB) {
            throw new Error("srbB is not set");
        }
        if (!srpId) {
            throw new Error("srpId is not set");
        }
    }
    const salt1 = algo.salt1;
    const salt2 = algo.salt2;
    const gB = (0, _1_utilities_js_1.intFromBytes)(srpB, { byteOrder: "big", isSigned: false });
    const k = (0, _1_utilities_js_1.intFromBytes)(await (0, exports.h)((0, _0_deps_js_1.concat)([pad(p), pad(g)])), { byteOrder: "big", isSigned: false });
    let u = 0n;
    let a = 0n;
    let gA = 0n;
    for (let i = 0; i < 1_000; i++) {
        a = (0, _1_utilities_js_1.getRandomInt)(256, false);
        gA = (0, _1_utilities_js_1.modExp)(BigInt(g), a, p);
        if (isGoodModExpFirst(gA, p)) {
            u = (0, _1_utilities_js_1.intFromBytes)(await (0, _1_utilities_js_1.sha256)((0, _0_deps_js_1.concat)([pad(gA), pad(gB)])), { byteOrder: "big", isSigned: false });
            if (u > 0n) {
                break;
            }
        }
    }
    if (!a || !u || !gA) {
        throw new Error();
    }
    const x = (0, _1_utilities_js_1.intFromBytes)(await (0, exports.ph2)(password, salt1, salt2), { byteOrder: "big", isSigned: false });
    const v = (0, _1_utilities_js_1.modExp)(BigInt(g), x, p);
    const kV = (0, _1_utilities_js_1.mod)(k * v, p);
    const t = (0, _1_utilities_js_1.mod)(gB - kV, p);
    const sA = (0, _1_utilities_js_1.modExp)(t, a + u * x, p);
    const kA = await (0, exports.h)(pad(sA));
    const hG = await (0, exports.h)(pad(g));
    const m1 = await (0, exports.h)((0, _0_deps_js_1.concat)([
        (await (0, exports.h)(pad(p))).map((v, i) => v ^ hG[i]),
        await (0, exports.h)(salt1),
        await (0, exports.h)(salt2),
        pad(gA),
        pad(gB),
        kA,
    ]));
    return { _: "inputCheckPasswordSRP", srp_id: srpId, A: pad(gA), M1: m1 };
}
