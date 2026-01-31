// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { assertPath } from "../_common/assert_path.js";
import { fromFileUrl } from "./from_file_url.js";
import { normalize } from "./normalize.js";
export function join(path, ...paths) {
    if (path === undefined)
        return ".";
    if (path instanceof URL) {
        path = fromFileUrl(path);
    }
    paths = path ? [path, ...paths] : paths;
    paths.forEach((path) => assertPath(path));
    const joined = paths.filter((path) => path.length > 0).join("/");
    return joined === "" ? "." : normalize(joined);
}
