"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gunzip = gunzip;
exports.gzip = gzip;
const _0_deps_js_1 = require("../0_deps.js");
function gunzip(buffer) {
    return inner(buffer, new DecompressionStream("gzip"));
}
function gzip(buffer) {
    return inner(buffer, new CompressionStream("gzip"));
}
async function inner(buffer, transformStream) {
    let readable;
    if (ReadableStream.from) {
        readable = ReadableStream.from([buffer]);
    }
    else {
        readable = new ReadableStream({
            pull(controller) {
                controller.enqueue(buffer);
                controller.close();
            },
        });
    }
    readable = readable.pipeThrough(transformStream);
    return new Uint8Array(await (0, _0_deps_js_1.toArrayBuffer)(readable));
}
