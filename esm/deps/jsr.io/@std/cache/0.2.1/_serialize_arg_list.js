export function _serializeArgList(cache) {
    const weakKeyToKeySegmentCache = new WeakMap();
    const weakKeySegmentToKeyCache = new Map();
    let i = 0;
    const registry = new FinalizationRegistry((keySegment) => {
        for (const key of weakKeySegmentToKeyCache.get(keySegment) ?? []) {
            cache.delete(key);
        }
        weakKeySegmentToKeyCache.delete(keySegment);
    });
    return function getKey(...args) {
        const weakKeySegments = [];
        const keySegments = [this, ...args].map((arg) => {
            if (typeof arg === "undefined")
                return "undefined";
            if (typeof arg === "bigint")
                return `${arg}n`;
            if (typeof arg === "number") {
                return String(arg);
            }
            if (arg === null ||
                typeof arg === "string" ||
                typeof arg === "boolean") {
                return JSON.stringify(arg);
            }
            try {
                assertWeakKey(arg);
            }
            catch {
                if (typeof arg === "symbol") {
                    return `Symbol.for(${JSON.stringify(arg.description)})`;
                }
                throw new Error("Should be unreachable: please open an issue at https://github.com/denoland/std/issues/new");
            }
            if (!weakKeyToKeySegmentCache.has(arg)) {
                const keySegment = `{${i++}}`;
                weakKeySegments.push(keySegment);
                registry.register(arg, keySegment);
                weakKeyToKeySegmentCache.set(arg, keySegment);
            }
            const keySegment = weakKeyToKeySegmentCache.get(arg);
            weakKeySegments.push(keySegment);
            return keySegment;
        });
        const key = keySegments.join(",");
        for (const keySegment of weakKeySegments) {
            const keys = weakKeySegmentToKeyCache.get(keySegment) ?? [];
            keys.push(key);
            weakKeySegmentToKeyCache.set(keySegment, keys);
        }
        return key;
    };
}
function assertWeakKey(arg) {
    new WeakRef(arg);
}
