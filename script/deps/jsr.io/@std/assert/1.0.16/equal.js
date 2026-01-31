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
exports.equal = equal;
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
const dntShim = __importStar(require("../../../../../_dnt.shims.js"));
function isKeyedCollection(x) {
    return x instanceof Set || x instanceof Map;
}
function prototypesEqual(a, b) {
    const pa = Object.getPrototypeOf(a);
    const pb = Object.getPrototypeOf(b);
    return pa === pb ||
        pa === Object.prototype && pb === null ||
        pa === null && pb === Object.prototype;
}
function isBasicObjectOrArray(obj) {
    const proto = Object.getPrototypeOf(obj);
    return proto === null || proto === Object.prototype ||
        proto === Array.prototype;
}
// Slightly faster than Reflect.ownKeys in V8 as of 12.9.202.13-rusty (2024-10-28)
function ownKeys(obj) {
    return [
        ...Object.getOwnPropertyNames(obj),
        ...Object.getOwnPropertySymbols(obj),
    ];
}
function getKeysDeep(obj) {
    const keys = new Set();
    while (obj !== Object.prototype && obj !== Array.prototype && obj != null) {
        for (const key of ownKeys(obj)) {
            keys.add(key);
        }
        obj = Object.getPrototypeOf(obj);
    }
    return keys;
}
// deno-lint-ignore no-explicit-any
const Temporal = dntShim.dntGlobalThis.Temporal ?? Object.create(null);
const stringComparablePrototypes = new Set([
    Intl.Locale,
    RegExp,
    Temporal.Duration,
    Temporal.Instant,
    Temporal.PlainDate,
    Temporal.PlainDateTime,
    Temporal.PlainTime,
    Temporal.PlainYearMonth,
    Temporal.PlainMonthDay,
    Temporal.ZonedDateTime,
    URL,
    URLSearchParams,
].filter((x) => x != null).map((x) => x.prototype));
function isPrimitive(x) {
    return typeof x === "string" ||
        typeof x === "number" ||
        typeof x === "boolean" ||
        typeof x === "bigint" ||
        typeof x === "symbol" ||
        x == null;
}
const TypedArray = Object.getPrototypeOf(Uint8Array);
function compareTypedArrays(a, b) {
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < b.length; i++) {
        if (!sameValueZero(a[i], b[i]))
            return false;
    }
    return true;
}
function sameValueZero(a, b) {
    return a === b || Object.is(a, b);
}
function equal(a, b) {
    const seen = new Map();
    return (function compare(a, b) {
        if (sameValueZero(a, b))
            return true;
        if (isPrimitive(a) || isPrimitive(b))
            return false;
        if (a instanceof Date && b instanceof Date) {
            return Object.is(a.getTime(), b.getTime());
        }
        if (a && typeof a === "object" && b && typeof b === "object") {
            if (!prototypesEqual(a, b)) {
                return false;
            }
            if (a instanceof TypedArray) {
                return compareTypedArrays(a, b);
            }
            if (a instanceof ArrayBuffer ||
                (globalThis.SharedArrayBuffer && a instanceof SharedArrayBuffer)) {
                return compareTypedArrays(new Uint8Array(a), new Uint8Array(b));
            }
            if (a instanceof WeakMap) {
                throw new TypeError("Cannot compare WeakMap instances");
            }
            if (a instanceof WeakSet) {
                throw new TypeError("Cannot compare WeakSet instances");
            }
            if (a instanceof WeakRef) {
                return compare(a.deref(), b.deref());
            }
            if (seen.get(a) === b) {
                return true;
            }
            if (Object.keys(a).length !== Object.keys(b).length) {
                return false;
            }
            seen.set(a, b);
            if (isKeyedCollection(a) && isKeyedCollection(b)) {
                if (a.size !== b.size) {
                    return false;
                }
                const aKeys = [...a.keys()];
                const primitiveKeysFastPath = aKeys.every(isPrimitive);
                if (primitiveKeysFastPath) {
                    if (a instanceof Set) {
                        return a.symmetricDifference(b).size === 0;
                    }
                    for (const key of aKeys) {
                        if (!b.has(key) ||
                            !compare(a.get(key), b.get(key))) {
                            return false;
                        }
                    }
                    return true;
                }
                let unmatchedEntries = a.size;
                for (const [aKey, aValue] of a.entries()) {
                    for (const [bKey, bValue] of b.entries()) {
                        if (!compare(aKey, bKey))
                            continue;
                        if ((aKey === aValue && bKey === bValue) ||
                            (compare(aValue, bValue))) {
                            unmatchedEntries--;
                            break;
                        }
                    }
                }
                return unmatchedEntries === 0;
            }
            let keys;
            if (isBasicObjectOrArray(a)) {
                keys = ownKeys({ ...a, ...b });
            }
            else if (stringComparablePrototypes.has(Object.getPrototypeOf(a))) {
                return String(a) === String(b);
            }
            else {
                keys = getKeysDeep(a).union(getKeysDeep(b));
            }
            for (const key of keys) {
                if (!compare(a[key], b[key])) {
                    return false;
                }
                if (((key in a) && (!(key in b))) || ((key in b) && (!(key in a)))) {
                    return false;
                }
            }
            return true;
        }
        return false;
    })(a, b);
}
