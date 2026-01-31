// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { encodeWhitespace } from "../_common/to_file_url.js";
import { isAbsolute } from "./is_absolute.js";
export function toFileUrl(path) {
    if (!isAbsolute(path)) {
        throw new TypeError(`Path must be absolute: received "${path}"`);
    }
    const url = new URL("file:///");
    url.pathname = encodeWhitespace(path.replace(/%/g, "%25").replace(/\\/g, "%5C"));
    return url;
}
