// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
import { types } from "./_db.js";
export function typeByExtension(extension) {
    extension = extension.startsWith(".") ? extension.slice(1) : extension;
    return types.get(extension.toLowerCase());
}
