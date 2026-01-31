// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
import { parseMediaType } from "./parse_media_type.js";
import { getCharset } from "./get_charset.js";
import { formatMediaType } from "./format_media_type.js";
import { typeByExtension } from "./type_by_extension.js";
export function contentType(extensionOrType) {
    try {
        const [mediaType, params = {}] = extensionOrType.includes("/")
            ? parseMediaType(extensionOrType)
            : [typeByExtension(extensionOrType), undefined];
        if (!mediaType) {
            return undefined;
        }
        if (!("charset" in params)) {
            const charset = getCharset(mediaType);
            if (charset) {
                params.charset = charset;
            }
        }
        return formatMediaType(mediaType, params);
    }
    catch {
    }
    return undefined;
}
