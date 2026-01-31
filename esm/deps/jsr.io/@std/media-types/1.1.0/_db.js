// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
import db from "./vendor/db.js";
export const types = new Map();
const extensions = new Map();
const preference = ["nginx", "apache", undefined, "iana"];
for (const type of Object.keys(db)) {
    const mime = db[type];
    const exts = mime.extensions;
    if (!exts || !exts.length) {
        continue;
    }
    extensions.set(type, exts);
    for (const ext of exts) {
        const current = types.get(ext);
        if (current) {
            const from = preference.indexOf(db[current].source);
            const to = preference.indexOf(mime.source);
            if (current !== "application/octet-stream" &&
                current !== "application/mp4" &&
                (from > to ||
                    (from === to && current.startsWith("application/")))) {
                continue;
            }
        }
        types.set(ext, type);
    }
}
export { db, extensions };
