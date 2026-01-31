import type { Schema } from "./0_types.js";
export declare class TLReader {
    #private;
    protected _buffer: Uint8Array;
    constructor(_buffer: Uint8Array);
    get buffer(): Uint8Array;
    read(byteCount: number): Uint8Array<ArrayBuffer>;
    unread(count: number): void;
    readInt24(isSigned?: boolean): number;
    readInt32(isSigned?: boolean): number;
    unreadInt32(): void;
    readInt64(isSigned?: boolean): bigint;
    readDouble(): number;
    readInt128(isSigned?: boolean): bigint;
    readInt256(isSigned?: boolean): bigint;
    readBytes(): Uint8Array<ArrayBuffer>;
    readString(): string;
    readType(name: string, schema: Schema): Promise<any>;
}
//# sourceMappingURL=1_tl_reader.d.ts.map