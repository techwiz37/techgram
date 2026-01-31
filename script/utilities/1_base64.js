"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64EncodeUrlSafe = base64EncodeUrlSafe;
exports.base64DecodeUrlSafe = base64DecodeUrlSafe;
const _0_deps_js_1 = require("../0_deps.js");
const _0_int_js_1 = require("./0_int.js");
function base64EncodeUrlSafe(data) {
    return (0, _0_deps_js_1.encodeBase64)(data).replace(/=*$/, "").replaceAll("+", "-").replaceAll("/", "_");
}
function base64DecodeUrlSafe(data) {
    data = data.replaceAll("_", "/").replaceAll("-", "+");
    if (data.length !== 4) {
        data += "=".repeat((0, _0_int_js_1.mod)(-data.length, 4));
    }
    return (0, _0_deps_js_1.decodeBase64)(data);
}
