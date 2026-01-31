"use strict";
// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCharset = getCharset;
const parse_media_type_js_1 = require("./parse_media_type.js");
const _db_js_1 = require("./_db.js");
function getCharset(type) {
    try {
        const [mediaType, params] = (0, parse_media_type_js_1.parseMediaType)(type);
        if (params?.charset) {
            return params.charset;
        }
        const entry = _db_js_1.db[mediaType];
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
