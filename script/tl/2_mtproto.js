"use strict";
// deno-lint-ignore-file no-explicit-any
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeType = deserializeType;
exports.serializeObject = serializeObject;
exports.isValidObject = isValidObject;
exports.assertIsValidObject = assertIsValidObject;
exports.is = is;
exports.isOneOf = isOneOf;
exports.isOfEnum = isOfEnum;
exports.as = as;
exports.mustGetReturnType = mustGetReturnType;
const _1_mtproto_api_js_1 = require("./1_mtproto_api.js");
const _1_tl_reader_js_1 = require("./1_tl_reader.js");
const _1_tl_writer_js_1 = require("./1_tl_writer.js");
const _1_utilities_js_1 = require("./1_utilities.js");
__exportStar(require("./1_mtproto_api.js"), exports);
async function deserializeType(name, bufferOrReader) {
    const reader = bufferOrReader instanceof Uint8Array ? new _1_tl_reader_js_1.TLReader(bufferOrReader) : bufferOrReader;
    return await reader.readType(name, _1_mtproto_api_js_1.schema);
}
function serializeObject(object) {
    return new _1_tl_writer_js_1.TLWriter().writeObject(object, _1_mtproto_api_js_1.schema).buffer;
}
function isValidObject(object) {
    return (0, _1_utilities_js_1.isValidObject)(object, _1_mtproto_api_js_1.schema);
}
function assertIsValidObject(object) {
    return (0, _1_utilities_js_1.assertIsValidObject)(object, _1_mtproto_api_js_1.schema);
}
function is(name, value) {
    return (0, _1_utilities_js_1.is)(name, value, _1_mtproto_api_js_1.schema);
}
function isOneOf(names, value) {
    return (0, _1_utilities_js_1.isOneOf)(names, value, _1_mtproto_api_js_1.schema);
}
function isOfEnum(name, value) {
    return (0, _1_utilities_js_1.isOfEnum)(name, value, _1_mtproto_api_js_1.schema);
}
function as(name, value) {
    return (0, _1_utilities_js_1.as)(name, value, _1_mtproto_api_js_1.schema);
}
function mustGetReturnType(name) {
    return (0, _1_utilities_js_1.mustGetReturnType)(name, _1_mtproto_api_js_1.schema);
}
