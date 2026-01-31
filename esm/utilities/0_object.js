// deno-lint-ignore no-explicit-any
export function cleanObject(object) {
    for (const [k, v] of Object.entries(object)) {
        switch (typeof v) {
            case "undefined":
                delete object[k];
                break;
        }
    }
    return object;
}
