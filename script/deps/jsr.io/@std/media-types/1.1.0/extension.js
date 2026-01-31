"use strict";
// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.extension = extension;
const all_extensions_js_1 = require("./all_extensions.js");
function extension(type) {
    return (0, all_extensions_js_1.allExtensions)(type)?.[0];
}
