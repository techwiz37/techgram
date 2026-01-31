"use strict";
// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeByExtension = typeByExtension;
const _db_js_1 = require("./_db.js");
function typeByExtension(extension) {
    extension = extension.startsWith(".") ? extension.slice(1) : extension;
    return _db_js_1.types.get(extension.toLowerCase());
}
