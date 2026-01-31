import { toArrayBuffer } from "../0_deps.ts";

export function gunzip(buffer: Uint8Array): Promise<Uint8Array> {
  return inner(buffer, new DecompressionStream("gzip"));
}

export function gzip(buffer: Uint8Array): Promise<Uint8Array> {
  return inner(buffer, new CompressionStream("gzip"));
}

async function inner(buffer: Uint8Array, transformStream: GenericTransformStream): Promise<Uint8Array> {
  let readable: ReadableStream;
  if (ReadableStream.from) {
    readable = ReadableStream.from([buffer]);
  } else {
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
