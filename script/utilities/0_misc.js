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
exports.ZERO_CHANNEL_ID = void 0;
exports.drop = drop;
exports.mustPrompt = mustPrompt;
exports.mustPromptNumber = mustPromptNumber;
exports.mustPromptOneOf = mustPromptOneOf;
exports.toUnixTimestamp = toUnixTimestamp;
exports.fromUnixTimestamp = fromUnixTimestamp;
exports.iterateReadableStream = iterateReadableStream;
exports.awaitablePooledMap = awaitablePooledMap;
const dntShim = __importStar(require("../_dnt.shims.js"));
const _0_deps_js_1 = require("../0_deps.js");
function drop(maybePromise) {
    if (maybePromise !== undefined && maybePromise !== null && typeof maybePromise === "object" && maybePromise instanceof Promise) {
        maybePromise.catch(() => { });
    }
}
function mustPrompt(message) {
    const result = dntShim.prompt(message);
    if (result === null) {
        throw (0, _0_deps_js_1.unreachable)();
    }
    else {
        return result;
    }
}
function mustPromptNumber(message) {
    let result = Number(BigInt(mustPrompt(message)));
    while (isNaN(result)) {
        console.log("Expected a number.");
        result = Number(BigInt(mustPrompt(message)));
    }
    return result;
}
function mustPromptOneOf(message, choices) {
    let result = dntShim.prompt(message);
    while (result === null || !choices.includes(result)) {
        result = dntShim.prompt(message);
    }
    return result;
}
exports.ZERO_CHANNEL_ID = -1000000000000;
function toUnixTimestamp(date) {
    return Math.floor(date.getTime() / _0_deps_js_1.SECOND);
}
function fromUnixTimestamp(date) {
    return new Date(date * _0_deps_js_1.SECOND);
}
async function* iterateReadableStream(stream) {
    const reader = stream.getReader();
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done)
                return;
            yield value;
        }
    }
    finally {
        reader.releaseLock();
    }
}
async function awaitablePooledMap(poolLimit, array, iteratorFn) {
    const iterable = (0, _0_deps_js_1.pooledMap)(poolLimit, array, iteratorFn);
    if (Array.fromAsync !== undefined) {
        return await Array.fromAsync(iterable);
    }
    else {
        const values = new Array();
        for await (const value of iterable) {
            values.push(value);
        }
        return values;
    }
}
