"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBinaryLike = validateBinaryLike;
const encoder = new TextEncoder();
function getTypeName(value) {
    const type = typeof value;
    if (type !== "object") {
        return type;
    }
    else if (value === null) {
        return "null";
    }
    else {
        return value?.constructor?.name ?? "object";
    }
}
function validateBinaryLike(source) {
    if (typeof source === "string") {
        return encoder.encode(source);
    }
    else if (source instanceof Uint8Array) {
        return source;
    }
    else if (source instanceof ArrayBuffer) {
        return new Uint8Array(source);
    }
    throw new TypeError(`Cannot validate the input as it must be a Uint8Array, a string, or an ArrayBuffer: received a value of the type ${getTypeName(source)}`);
}
