// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { encodeWhitespace } from "../_common/to_file_url.js";
import { isAbsolute } from "./is_absolute.js";
export function toFileUrl(path) {
    if (!isAbsolute(path)) {
        throw new TypeError(`Path must be absolute: received "${path}"`);
    }
    const [, hostname, pathname] = path.match(/^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/);
    const url = new URL("file:///");
    url.pathname = encodeWhitespace(pathname.replace(/%/g, "%25"));
    if (hostname !== undefined && hostname !== "localhost") {
        url.hostname = hostname;
        if (!url.hostname) {
            throw new TypeError(`Invalid hostname: "${url.hostname}"`);
        }
    }
    return url;
}
