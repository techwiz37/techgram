// deno-lint-ignore-file no-explicit-any
import { unreachable } from "../0_deps.js";
export function isValidObject(object, schema) {
    return object !== null && typeof object === "object" && typeof object._ === "string" && schema.definitions[object._] !== undefined;
}
export function assertIsValidObject(object, schema) {
    if (!isValidObject(object, schema)) {
        unreachable();
    }
}
export function is(typeName, value, schema) {
    if (!isValidObject(value, schema)) {
        return false;
    }
    else {
        return value._ === typeName;
    }
}
export function isOneOf(names, value, schema) {
    return names.some((v) => is(v, value, schema));
}
export function isOfEnum(name, value, schema) {
    return isValidObject(value, schema) && schema.definitions[value._][2] === name;
}
export function as(name, value, schema) {
    if (is(name, value, schema)) {
        return value;
    }
    else {
        unreachable();
    }
}
export function mustGetReturnType(name, schema) {
    const type = schema.definitions[name];
    if (!type || !type[2]) {
        unreachable();
    }
    return type[2];
}
