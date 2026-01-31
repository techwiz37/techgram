"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
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
exports.format = format;
const dntShim = __importStar(require("../../../../../_dnt.shims.js"));
function format(v) {
    const { Deno, process } = dntShim.dntGlobalThis;
    const inspect = Deno?.inspect ??
        process?.getBuiltinModule?.("node:util")?.inspect;
    return typeof inspect === "function"
        ? inspect(v, {
            depth: Infinity,
            sorted: true,
            trailingComma: true,
            compact: false,
            iterableLimit: Infinity,
            getters: true,
            strAbbreviateSize: Infinity,
        })
        : basicInspect(v);
}
const formatters = [
    (v) => {
        if (typeof v === "undefined")
            return "undefined";
        if (typeof v === "bigint")
            return `${v}n`;
        if (typeof v === "string" ||
            typeof v === "number" ||
            typeof v === "boolean" ||
            v === null ||
            Array.isArray(v) ||
            [null, Object.prototype].includes(Object.getPrototypeOf(v))) {
            return JSON.stringify(v, null, 2);
        }
    },
    (v) => String(v),
    (v) => Object.prototype.toString.call(v),
];
// for environments lacking both `Deno.inspect` and `process.inspect`
function basicInspect(v) {
    for (const fmt of formatters) {
        try {
            const result = fmt(v);
            if (typeof result === "string")
                return result;
        }
        catch {  }
    }
    return "[[Unable to format value]]";
}
