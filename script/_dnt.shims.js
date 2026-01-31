"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dntGlobalThis = exports.Deno = exports.WebSocket = exports.prompt = exports.confirm = exports.alert = exports.crypto = void 0;
const shim_crypto_1 = require("@deno/shim-crypto");
var shim_crypto_2 = require("@deno/shim-crypto");
Object.defineProperty(exports, "crypto", { enumerable: true, get: function () { return shim_crypto_2.crypto; } });
const shim_prompts_1 = require("@deno/shim-prompts");
var shim_prompts_2 = require("@deno/shim-prompts");
Object.defineProperty(exports, "alert", { enumerable: true, get: function () { return shim_prompts_2.alert; } });
Object.defineProperty(exports, "confirm", { enumerable: true, get: function () { return shim_prompts_2.confirm; } });
Object.defineProperty(exports, "prompt", { enumerable: true, get: function () { return shim_prompts_2.prompt; } });
const ws_1 = __importDefault(require("ws"));
var ws_2 = require("ws");
Object.defineProperty(exports, "WebSocket", { enumerable: true, get: function () { return __importDefault(ws_2).default; } });
const shim_deno_1 = require("@deno/shim-deno");
var shim_deno_2 = require("@deno/shim-deno");
Object.defineProperty(exports, "Deno", { enumerable: true, get: function () { return shim_deno_2.Deno; } });
const dntGlobals = {
    crypto: shim_crypto_1.crypto,
    alert: shim_prompts_1.alert,
    confirm: shim_prompts_1.confirm,
    prompt: shim_prompts_1.prompt,
    WebSocket: ws_1.default,
    Deno: shim_deno_1.Deno,
};
exports.dntGlobalThis = createMergeProxy(globalThis, dntGlobals);
function createMergeProxy(baseObj, extObj) {
    return new Proxy(baseObj, {
        get(_target, prop, _receiver) {
            if (prop in extObj) {
                return extObj[prop];
            }
            else {
                return baseObj[prop];
            }
        },
        set(_target, prop, value) {
            if (prop in extObj) {
                delete extObj[prop];
            }
            baseObj[prop] = value;
            return true;
        },
        deleteProperty(_target, prop) {
            let success = false;
            if (prop in extObj) {
                delete extObj[prop];
                success = true;
            }
            if (prop in baseObj) {
                delete baseObj[prop];
                success = true;
            }
            return success;
        },
        ownKeys(_target) {
            const baseKeys = Reflect.ownKeys(baseObj);
            const extKeys = Reflect.ownKeys(extObj);
            const extKeysSet = new Set(extKeys);
            return [...baseKeys.filter((k) => !extKeysSet.has(k)), ...extKeys];
        },
        defineProperty(_target, prop, desc) {
            if (prop in extObj) {
                delete extObj[prop];
            }
            Reflect.defineProperty(baseObj, prop, desc);
            return true;
        },
        getOwnPropertyDescriptor(_target, prop) {
            if (prop in extObj) {
                return Reflect.getOwnPropertyDescriptor(extObj, prop);
            }
            else {
                return Reflect.getOwnPropertyDescriptor(baseObj, prop);
            }
        },
        has(_target, prop) {
            return prop in extObj || prop in baseObj;
        },
    });
}
