export interface Reader {
    read(p: Uint8Array): Promise<number | null>;
}
export interface ReaderSync {
    readSync(p: Uint8Array): number | null;
}
export interface Writer {
    write(p: Uint8Array): Promise<number>;
}
export interface WriterSync {
    writeSync(p: Uint8Array): number;
}
export interface Closer {
    close(): void;
}
export declare enum SeekMode {
    Start = 0,
    Current = 1,
    End = 2
}
export interface Seeker {
    seek(offset: number | bigint, whence: SeekMode): Promise<number>;
}
export interface SeekerSync {
    seekSync(offset: number | bigint, whence: SeekMode): number;
}
//# sourceMappingURL=types.d.ts.map