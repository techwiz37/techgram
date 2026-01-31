// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { assertArg } from "../_common/from_file_url.js";
export function fromFileUrl(url) {
    url = assertArg(url);
    let path = decodeURIComponent(url.pathname.replace(/\
    if (url.hostname !== "") {
        path = `\\\\${url.hostname}${path}`;
    }
    return path;
}
