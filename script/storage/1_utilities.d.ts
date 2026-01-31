import type { StorageKeyPart } from "./0_storage.js";
declare const ValueType_: {
    readonly Boolean: 0;
    readonly Number: 1;
    readonly String: 2;
    readonly BigInt: 3;
    readonly Date: 4;
    readonly Uint8Array: 5;
    readonly Array: 6;
    readonly Map: 7;
};
export declare const ValueType: Readonly<typeof ValueType_>;
export type ValueType = typeof ValueType[keyof typeof ValueType];
export declare function toString(value: unknown): string;
export declare function fromString<T>(string: string): T;
export declare function fixKey(key: readonly StorageKeyPart[]): IDBValidKey[];
export declare function restoreKey(key: readonly StorageKeyPart[]): StorageKeyPart[];
export declare function getPrefixKeyRange(prefix: any): IDBKeyRange;
export declare function isInRange(key: StorageKeyPart[], start: readonly StorageKeyPart[], end: readonly StorageKeyPart[]): boolean;
export {};
//# sourceMappingURL=1_utilities.d.ts.map