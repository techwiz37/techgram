import "./_dnt.polyfills.js";
import * as dntShim from "./_dnt.shims.js";
export { getColorFromPeerId, getColorName, getRandomId, setLogFilter, setLoggingProvider, setLogVerbosity } from "./1_utilities.js";
export { checkPassword } from "./client/0_password.js";
export * from "./2_connection.js";
export * from "./2_storage.js";
export * from "./3_transport.js";
export * from "./2_tl.js";
export * from "./3_types.js";
export { APP_VERSION, DEVICE_MODEL, INITIAL_DC, LANG_CODE, LANG_PACK, SYSTEM_LANG_CODE, SYSTEM_VERSION } from "./4_constants.js";
export * as errors from "./4_errors.js";
export * from "./5_client.js";
import { createDeflate, createDeflateRaw, createGunzip, createGzip, createInflate, createInflateRaw, } from "node:zlib";
// From https://github.com/ungap/compression-stream/blob/main/index.js with slight modifications.
if (!("CompressionStream" in dntShim.dntGlobalThis)) {
    class Stream {
        readable;
        writable;
        constructor(compress, format) {
            let handler;
            if (format === "gzip") {
                handler = compress ? createGzip() : createGunzip();
            }
            else if (format === "deflate") {
                handler = compress ? createDeflate() : createInflate();
            }
            else if (format === "deflate-raw") {
                handler = compress ? createDeflateRaw() : createInflateRaw();
            }
            else {
                throw new TypeError([
                    `Failed to construct '${this.constructor.name}'`,
                    `Unsupported compression format: '${format}'`,
                ].join(": "));
            }
            this.readable = new ReadableStream({
                type: "bytes",
                start: (controller) => {
                    handler.on("data", (chunk) => controller.enqueue(chunk));
                    handler.once("end", () => controller.close());
                },
            });
            this.writable = new WritableStream({
                write: (chunk) => void handler.write(chunk),
                close: () => void handler.end(),
            });
        }
    }
    globalThis.CompressionStream = class CompressionStream extends Stream {
        constructor(format) {
            super(true, format);
        }
    };
    globalThis.DecompressionStream = class DecompressionStream extends Stream {
        constructor(format) {
            super(false, format);
        }
    };
}
