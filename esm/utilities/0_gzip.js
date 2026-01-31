import { toArrayBuffer } from "../0_deps.js";
export function gunzip(buffer) {
    return inner(buffer, new DecompressionStream("gzip"));
}
export function gzip(buffer) {
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
    return new Uint8Array(await toArrayBuffer(readable));
}
