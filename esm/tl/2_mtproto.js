// deno-lint-ignore-file no-explicit-any
import { schema } from "./1_mtproto_api.js";
import { TLReader } from "./1_tl_reader.js";
import { TLWriter } from "./1_tl_writer.js";
import { as as as_, assertIsValidObject as assertIsValidObject_, is as is_, isOfEnum as isOfEnum_, isOneOf as isOneOf_, isValidObject as isValidObject_, mustGetReturnType as mustGetReturnType_ } from "./1_utilities.js";
export * from "./1_mtproto_api.js";
export async function deserializeType(name, bufferOrReader) {
    const reader = bufferOrReader instanceof Uint8Array ? new TLReader(bufferOrReader) : bufferOrReader;
    return await reader.readType(name, schema);
}
export function serializeObject(object) {
    return new TLWriter().writeObject(object, schema).buffer;
}
export function isValidObject(object) {
    return isValidObject_(object, schema);
}
export function assertIsValidObject(object) {
    return assertIsValidObject_(object, schema);
}
export function is(name, value) {
    return is_(name, value, schema);
}
export function isOneOf(names, value) {
    return isOneOf_(names, value, schema);
}
export function isOfEnum(name, value) {
    return isOfEnum_(name, value, schema);
}
export function as(name, value) {
    return as_(name, value, schema);
}
export function mustGetReturnType(name) {
    return mustGetReturnType_(name, schema);
}
