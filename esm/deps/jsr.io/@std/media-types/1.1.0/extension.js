// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
import { allExtensions } from "./all_extensions.js";
export function extension(type) {
    return allExtensions(type)?.[0];
}
