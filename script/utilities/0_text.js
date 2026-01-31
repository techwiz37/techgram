"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeText = encodeText;
exports.decodeText = decodeText;
const encoder = new TextEncoder();
const decoder = new TextDecoder();
function encodeText(decoded) {
    return encoder.encode(decoded);
}
function decodeText(encoded) {
    return decoder.decode(encoded);
}
