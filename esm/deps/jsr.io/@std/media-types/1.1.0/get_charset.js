// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
import { parseMediaType } from "./parse_media_type.js";
import { db } from "./_db.js";
export function getCharset(type) {
    try {
        const [mediaType, params] = parseMediaType(type);
        if (params?.charset) {
            return params.charset;
        }
        const entry = db[mediaType];
        if (entry?.charset) {
            return entry.charset;
        }
        if (mediaType.startsWith("text/")) {
            return "UTF-8";
        }
    }
    catch {
    }
    return undefined;
}
