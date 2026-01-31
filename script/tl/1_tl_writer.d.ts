import type { Schema } from "./0_types.js";
export declare class TLWriter {
    #private;
    protected _buffer: Uint8Array<ArrayBuffer>;
    constructor();
    get buffer(): Uint8Array<ArrayBuffer>;
    write(buffer: Uint8Array): typeof this;
    writeInt24(int: number, isSigned?: boolean): typeof this;
    writeInt32(int: number, isSigned?: boolean): typeof this;
    writeInt64(int: bigint, isSigned?: boolean): typeof this;
    writeDouble(double: number): typeof this;
    writeInt128(int: bigint, isSigned?: boolean): typeof this;
    writeInt256(int: bigint, isSigned?: boolean): typeof this;
    writeBytes(bytes: Uint8Array): typeof this;
    writeString(string: string): typeof this;
    writeObject(value: any, schema: Schema): typeof this;
}
//# sourceMappingURL=1_tl_writer.d.ts.map