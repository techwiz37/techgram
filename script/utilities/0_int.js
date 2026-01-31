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
exports.modExp = modExp;
exports.mod = mod;
exports.intFromBytes = intFromBytes;
exports.getRandomInt = getRandomInt;
exports.getRandomId = getRandomId;
exports.gcd = gcd;
exports.intToBytes = intToBytes;
const dntShim = __importStar(require("../_dnt.shims.js"));
const _0_errors_js_1 = require("../0_errors.js");
function modExp(a, b, n) {
    a %= n;
    let result = 1n;
    let x = a;
    while (b > 0n) {
        const leastSignificantBit = b % 2n;
        b /= 2n;
        if (leastSignificantBit === 1n) {
            result *= x;
            result %= n;
        }
        x *= x;
        x %= n;
    }
    return result;
}
function mod(n, m) {
    return ((n % m) + m) % m;
}
function intFromBytes(bytes, { byteOrder = "little", isSigned = true } = {}) {
    const bytesLength = bytes.length;
    if (byteOrder === "little") {
        bytes = bytes.toReversed();
    }
    let bigIntVar = BigInt("0x" + [...bytes].map((v) => v.toString(16).padStart(2, "0")).join(""));
    if (isSigned && Math.floor(bigIntVar.toString(2).length / 8) >= bytesLength) {
        bigIntVar = bigIntVar - (2n ** (BigInt(bytesLength * 8)));
    }
    return bigIntVar;
}
function getRandomInt(byteLength, isSigned = true) {
    const randomBytes = new Uint8Array(byteLength);
    dntShim.crypto.getRandomValues(randomBytes);
    return intFromBytes(randomBytes, { isSigned });
}
function getRandomId(isNumber) {
    if (isNumber) {
        return Number(getRandomInt(4, true));
    }
    else {
        return getRandomInt(8, true);
    }
}
function gcd(a, b) {
    if (a === 0n) {
        return b;
    }
    while ((a & 1n) === 0n) {
        a >>= 1n;
    }
    while (true) {
        if (a > b) {
            a = (a - b) >> 1n;
            while ((a & 1n) === 0n) {
                a >>= 1n;
            }
        }
        else if (b > a) {
            b = (b - a) >> 1n;
            while ((b & 1n) === 0n) {
                b >>= 1n;
            }
        }
        else {
            return a;
        }
    }
}
const bufferFromHexString = (hexString) => Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
function intToBytes(int, byteCount, { byteOrder = "little", isSigned = true, path = [], } = {}) {
    const actualByteCount = Math.ceil(int.toString(2).length / 8);
    if (byteCount < actualByteCount) {
        throw new _0_errors_js_1.TLError(`The provided integer is too big for int${byteCount * 8}`, path);
    }
    if (byteCount === 4 || byteCount === 2) {
        const buffer = new Uint8Array(byteCount);
        const dataView = new DataView(buffer.buffer);
        (byteCount === 2 ? isSigned ? dataView.setInt16 : dataView.setUint16 : isSigned ? dataView.setInt32 : dataView.setUint32).call(dataView, 0, Number(int), byteOrder === "little");
        return buffer;
    }
    int = BigInt(typeof int === "number" ? Math.ceil(int) : int);
    if (byteCount === 8) {
        const buffer = new Uint8Array(byteCount);
        const dataView = new DataView(buffer.buffer);
        (isSigned ? dataView.setBigInt64 : dataView.setBigUint64).call(dataView, 0, int, byteOrder === "little");
        return buffer;
    }
    if (!isSigned && int < 0n) {
        throw new _0_errors_js_1.TLError("Received a signed integer while an unsigned one was expected", path);
    }
    if (isSigned && int < 0n) {
        int = 2n ** BigInt(byteCount * 8) + int;
    }
    const hex = int.toString(16).padStart(byteCount * 2, "0");
    const buffer = bufferFromHexString(hex);
    if (byteOrder === "little") {
        buffer.reverse();
    }
    return buffer;
}
