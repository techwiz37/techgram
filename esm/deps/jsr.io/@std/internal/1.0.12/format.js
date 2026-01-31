// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import * as dntShim from "../../../../../_dnt.shims.js";
export function format(v) {
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
