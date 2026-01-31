"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BOOL_FALSE = exports.BOOL_TRUE = exports.VECTOR = exports.X = void 0;
exports.isOptionalParam = isOptionalParam;
exports.getOptionalParamInnerType = getOptionalParamInnerType;
exports.analyzeOptionalParam = analyzeOptionalParam;
exports.repr = repr;
exports.toJSON = toJSON;
exports.getVectorItemType = getVectorItemType;
exports.constructorIdToHex = constructorIdToHex;
const _0_deps_js_1 = require("../0_deps.js");
function isOptionalParam(ntype) {
    return ntype.includes("?");
}
function getOptionalParamInnerType(ntype) {
    return ntype.split("?")[1];
}
function analyzeOptionalParam(ntype) {
    if (!isOptionalParam(ntype)) {
        throw new Error("Parameter not optional");
    }
    const flagField = ntype.split(".")[0];
    (0, _0_deps_js_1.assertEquals)(typeof flagField, "string");
    const bitIndex = Number(ntype.split("?")[0].split(".")[1]);
    (0, _0_deps_js_1.assertFalse)(isNaN(bitIndex));
    return { flagField, bitIndex };
}
function repr(value) {
    return value === undefined ? "undefined" : value === null ? null : (typeof value === "object" && "_" in value) ? value._ : value.constructor.name;
}
// deno-lint-ignore no-explicit-any
function toJSON(object) {
    if (typeof object === "bigint") {
        return { _: "bigint", bigint: String(object) };
    }
    else if (object instanceof Uint8Array) {
        return { _: "buffer", buffer: (0, _0_deps_js_1.encodeHex)(object) };
    }
    else if (object === null) {
        return null;
    }
    else if (Array.isArray(object)) {
        return object.map(toJSON);
    }
    else if (typeof object === "object") {
        const newObject = {};
        for (const [key, value] of Object.entries(object)) {
            newObject[key] = toJSON(value);
        }
        return newObject;
    }
    else {
        return object;
    }
}
function getVectorItemType(type) {
    if (!type.startsWith(VECTOR_PREFIX) || !type.endsWith(VECTOR_SUFFIX)) {
        return null;
    }
    return type.slice(VECTOR_PREFIX.length).slice(0, -1 * VECTOR_SUFFIX.length);
}
const VECTOR_PREFIX = "Vector<";
const VECTOR_SUFFIX = ">";
exports.X = "X";
exports.VECTOR = 0x1CB5C415;
exports.BOOL_TRUE = 0x997275b5;
exports.BOOL_FALSE = 0xbc799737;
function constructorIdToHex(constructorId) {
    return constructorId.toString(16);
}
