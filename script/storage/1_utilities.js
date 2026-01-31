"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueType = void 0;
exports.toString = toString;
exports.fromString = fromString;
exports.fixKey = fixKey;
exports.restoreKey = restoreKey;
exports.getPrefixKeyRange = getPrefixKeyRange;
exports.isInRange = isInRange;
const _0_deps_js_1 = require("../0_deps.js");
const _0_deps_js_2 = require("../0_deps.js");
const ValueType_ = {
    Boolean: 0,
    Number: 1,
    String: 2,
    BigInt: 3,
    Date: 4,
    Uint8Array: 5,
    Array: 6,
    Map: 7,
};
exports.ValueType = Object.freeze(ValueType_);
function toString(value) {
    if (typeof value === "boolean") {
        return `${exports.ValueType.Boolean}${Number(value)}`;
    }
    else if (typeof value === "number") {
        return `${exports.ValueType.Number}${value}`;
    }
    else if (typeof value === "string") {
        return `${exports.ValueType.String}${value}`;
    }
    else if (typeof value === "bigint") {
        return `${exports.ValueType.BigInt}${value}`;
    }
    else if (value instanceof Date) {
        return `${exports.ValueType.Date}${value.getTime()}`;
    }
    else if (value instanceof Uint8Array) {
        return `${exports.ValueType.Uint8Array}${(0, _0_deps_js_1.encodeBase64)(value)}`;
    }
    else if (Array.isArray(value)) {
        const items = value.map((v) => {
            const s = toString(v);
            return String(s.length) + "\n" + s;
        });
        return `${exports.ValueType.Array}${items.join("")}`;
    }
    else if (typeof value === "object" && value !== null && Object.getPrototypeOf(value) === Object.prototype) {
        return `${exports.ValueType.Map}${toString(Object.entries(value)).slice(1)}`;
    }
    else {
        (0, _0_deps_js_2.unreachable)();
    }
}
function fromString(string) {
    const [type, value] = [Number(string[0]), string.slice(1)];
    switch (type) {
        case exports.ValueType.Boolean:
            return Boolean(Number(value));
        case exports.ValueType.Number:
            return Number(value);
        case exports.ValueType.String:
            return value;
        case exports.ValueType.BigInt:
            return BigInt(value);
        case exports.ValueType.Date:
            return new Date(Number(value));
        case exports.ValueType.Uint8Array:
            return (0, _0_deps_js_1.decodeBase64)(value);
        case exports.ValueType.Array: {
            const arr = [];
            for (let i = 0; i < value.length; ++i) {
                const length_ = value.slice(i, value.indexOf("\n", i));
                i += length_.length + 1;
                const length = Number(length_);
                const value_ = value.slice(i, i + length);
                i += value_.length - 1;
                arr.push(fromString(value_));
            }
            return arr;
        }
        case exports.ValueType.Map:
            return Object.fromEntries(fromString(`${exports.ValueType.Array}${value}`));
    }
}
function fixKey(key) {
    return key.map((v) => typeof v === "bigint" ? String(exports.ValueType.BigInt) + String(v) : typeof v === "string" ? String(exports.ValueType.String) + v : v);
}
function restoreKey(key) {
    return key.map((v) => {
        if (typeof v === "string") {
            const t = Number(v[0]);
            if (t === exports.ValueType.BigInt) {
                return BigInt(v.slice(1));
            }
            else if (t === exports.ValueType.String) {
                return v.slice(1);
            }
            else {
                return v;
            }
        }
        else {
            return v;
        }
    });
}
// Source: https://gist.github.com/inexorabletash/5462871
// deno-lint-ignore no-explicit-any
function getPrefixKeyRange(prefix) {
    if (indexedDB.cmp(prefix, prefix) !== 0)
        throw new TypeError();
    const upperKey = successor(prefix);
    if (upperKey === undefined)
        return IDBKeyRange.lowerBound(prefix);
    return IDBKeyRange.bound(prefix, upperKey, false, true);
}
const MAX_DATE_VALUE = 8640000000000000;
const UPPER_BOUND = {
    NUMBER: new Date(-MAX_DATE_VALUE),
    DATE: "",
    STRING: [],
    ARRAY: undefined,
};
// deno-lint-ignore no-explicit-any
function successor(key) {
    if (typeof key === "number") {
        if (key === Infinity)
            return UPPER_BOUND.NUMBER;
        if (key === -Infinity)
            return -Number.MAX_VALUE;
        if (key === 0)
            return Number.MIN_VALUE;
        let epsilon = Math.abs(key);
        while (key + epsilon / 2 !== key)
            epsilon = epsilon / 2;
        return key + epsilon;
    }
    if (key instanceof Date) {
        if (key.valueOf() + 1 > MAX_DATE_VALUE)
            return UPPER_BOUND.DATE;
        return new Date(key.valueOf() + 1);
    }
    if (typeof key === "string") {
        let len = key.length;
        while (len > 0) {
            const head = key.substring(0, len - 1), tail = key.charCodeAt(len - 1);
            if (tail !== 0xffff)
                return head + String.fromCharCode(tail + 1);
            key = head;
            --len;
        }
        return UPPER_BOUND.STRING;
    }
    if (Array.isArray(key)) {
        key = key.slice();
        let len = key.length;
        while (len > 0) {
            const tail = successor(key.pop());
            if (tail !== undefined) {
                key.push(tail);
                return key;
            }
            --len;
        }
        return UPPER_BOUND.ARRAY;
    }
    throw new TypeError();
}
function isInRange(key, start, end) {
    for (const [i, part] of key.entries()) {
        const left = start[i];
        const right = end[i];
        if (!left || !right) {
            continue;
        }
        if (left === undefined || right === undefined) {
            return false;
        }
        if (part >= left && part <= right) {
            continue;
        }
        return false;
    }
    return true;
}
