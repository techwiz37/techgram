// Copyright 2018-2025 the Deno authors. MIT license.
import * as dntShim from "../../../../../_dnt.shims.js";
export function checkWindows() {
    const global = dntShim.dntGlobalThis;
    const os = global.Deno?.build?.os;
    return typeof os === "string"
        ? os === "windows"
        : global.navigator?.platform?.startsWith("Win") ??
            global.process?.platform?.startsWith("win") ?? false;
}
