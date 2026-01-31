// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { assertPath } from "../_common/assert_path.js";
import { isPathSeparator } from "./_util.js";
import { normalize } from "./normalize.js";
import { fromFileUrl } from "./from_file_url.js";
export function join(path, ...paths) {
    if (path instanceof URL) {
        path = fromFileUrl(path);
    }
    paths = path ? [path, ...paths] : paths;
    paths.forEach((path) => assertPath(path));
    paths = paths.filter((path) => path.length > 0);
    if (paths.length === 0)
        return ".";
    let needsReplace = true;
    let slashCount = 0;
    const firstPart = paths[0];
    if (isPathSeparator(firstPart.charCodeAt(0))) {
        ++slashCount;
        const firstLen = firstPart.length;
        if (firstLen > 1) {
            if (isPathSeparator(firstPart.charCodeAt(1))) {
                ++slashCount;
                if (firstLen > 2) {
                    if (isPathSeparator(firstPart.charCodeAt(2)))
                        ++slashCount;
                    else {
                        needsReplace = false;
                    }
                }
            }
        }
    }
    let joined = paths.join("\\");
    if (needsReplace) {
        for (; slashCount < joined.length; ++slashCount) {
            if (!isPathSeparator(joined.charCodeAt(slashCount)))
                break;
        }
        if (slashCount >= 2)
            joined = `\\${joined.slice(slashCount)}`;
    }
    return normalize(joined);
}
