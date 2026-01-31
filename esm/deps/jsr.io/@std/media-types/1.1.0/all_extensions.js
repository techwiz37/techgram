// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
import { parseMediaType } from "./parse_media_type.js";
import { extensions } from "./_db.js";
export function allExtensions(type) {
    try {
        const [mediaType] = parseMediaType(type);
        return extensions.get(mediaType);
    }
    catch {
    }
}
