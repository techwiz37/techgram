"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extensions = exports.db = exports.types = void 0;
// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
const db_js_1 = __importDefault(require("./vendor/db.js"));
exports.db = db_js_1.default;
exports.types = new Map();
const extensions = new Map();
exports.extensions = extensions;
const preference = ["nginx", "apache", undefined, "iana"];
for (const type of Object.keys(db_js_1.default)) {
    const mime = db_js_1.default[type];
    const exts = mime.extensions;
    if (!exts || !exts.length) {
        continue;
    }
    extensions.set(type, exts);
    for (const ext of exts) {
        const current = exports.types.get(ext);
        if (current) {
            const from = preference.indexOf(db_js_1.default[current].source);
            const to = preference.indexOf(mime.source);
            if (current !== "application/octet-stream" &&
                current !== "application/mp4" &&
                (from > to ||
                    (from === to && current.startsWith("application/")))) {
                continue;
            }
        }
        exports.types.set(ext, type);
    }
}
