"use strict";
// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentType = contentType;
const parse_media_type_js_1 = require("./parse_media_type.js");
const get_charset_js_1 = require("./get_charset.js");
const format_media_type_js_1 = require("./format_media_type.js");
const type_by_extension_js_1 = require("./type_by_extension.js");
function contentType(extensionOrType) {
    try {
        const [mediaType, params = {}] = extensionOrType.includes("/")
            ? (0, parse_media_type_js_1.parseMediaType)(extensionOrType)
            : [(0, type_by_extension_js_1.typeByExtension)(extensionOrType), undefined];
        if (!mediaType) {
            return undefined;
        }
        if (!("charset" in params)) {
            const charset = (0, get_charset_js_1.getCharset)(mediaType);
            if (charset) {
                params.charset = charset;
            }
        }
        return (0, format_media_type_js_1.formatMediaType)(mediaType, params);
    }
    catch {
    }
    return undefined;
}
