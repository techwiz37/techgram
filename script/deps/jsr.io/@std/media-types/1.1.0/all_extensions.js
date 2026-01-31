"use strict";
// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.allExtensions = allExtensions;
const parse_media_type_js_1 = require("./parse_media_type.js");
const _db_js_1 = require("./_db.js");
function allExtensions(type) {
    try {
        const [mediaType] = (0, parse_media_type_js_1.parseMediaType)(type);
        return _db_js_1.extensions.get(mediaType);
    }
    catch {
    }
}
