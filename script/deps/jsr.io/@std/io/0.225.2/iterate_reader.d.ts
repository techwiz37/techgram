import type { Reader, ReaderSync } from "./types.js";
export type { Reader, ReaderSync };
export declare function iterateReader(reader: Reader, options?: {
    bufSize?: number;
}): AsyncIterableIterator<Uint8Array>;
export declare function iterateReaderSync(reader: ReaderSync, options?: {
    bufSize?: number;
}): IterableIterator<Uint8Array>;
//# sourceMappingURL=iterate_reader.d.ts.map