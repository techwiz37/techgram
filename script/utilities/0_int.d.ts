export type ByteOrder = "little" | "big";
export declare function modExp(a: bigint, b: bigint, n: bigint): bigint;
export declare function mod(n: bigint, m: bigint): bigint;
export declare function mod(n: number, m: number): number;
export interface IntFromBytesParams {
    byteOrder?: ByteOrder;
    isSigned?: boolean;
}
export declare function intFromBytes(bytes: Uint8Array, { byteOrder, isSigned }?: IntFromBytesParams): bigint;
export declare function getRandomInt(byteLength: number, isSigned?: boolean): bigint;
export declare function getRandomId(isNumber: true): number;
export declare function getRandomId(): bigint;
export declare function gcd(a: bigint, b: bigint): bigint;
export interface BufferFromBigintParams {
    byteOrder?: ByteOrder;
    isSigned?: boolean;
    path?: string[];
}
export declare function intToBytes(int: bigint | number, byteCount: number, { byteOrder, isSigned, path, }?: BufferFromBigintParams): Uint8Array<ArrayBuffer>;
//# sourceMappingURL=0_int.d.ts.map