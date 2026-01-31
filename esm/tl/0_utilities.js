import { assertEquals, assertFalse, encodeHex } from "../0_deps.js";
export function isOptionalParam(ntype) {
    return ntype.includes("?");
}
export function getOptionalParamInnerType(ntype) {
    return ntype.split("?")[1];
}
export function analyzeOptionalParam(ntype) {
    if (!isOptionalParam(ntype)) {
        throw new Error("Parameter not optional");
    }
    const flagField = ntype.split(".")[0];
    assertEquals(typeof flagField, "string");
    const bitIndex = Number(ntype.split("?")[0].split(".")[1]);
    assertFalse(isNaN(bitIndex));
    return { flagField, bitIndex };
}
export function repr(value) {
    return value === undefined ? "undefined" : value === null ? null : (typeof value === "object" && "_" in value) ? value._ : value.constructor.name;
}
// deno-lint-ignore no-explicit-any
export function toJSON(object) {
    if (typeof object === "bigint") {
        return { _: "bigint", bigint: String(object) };
    }
    else if (object instanceof Uint8Array) {
        return { _: "buffer", buffer: encodeHex(object) };
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
export function getVectorItemType(type) {
    if (!type.startsWith(VECTOR_PREFIX) || !type.endsWith(VECTOR_SUFFIX)) {
        return null;
    }
    return type.slice(VECTOR_PREFIX.length).slice(0, -1 * VECTOR_SUFFIX.length);
}
const VECTOR_PREFIX = "Vector<";
const VECTOR_SUFFIX = ">";
export const X = "X";
export const VECTOR = 0x1CB5C415;
export const BOOL_TRUE = 0x997275b5;
export const BOOL_FALSE = 0xbc799737;
export function constructorIdToHex(constructorId) {
    return constructorId.toString(16);
}
