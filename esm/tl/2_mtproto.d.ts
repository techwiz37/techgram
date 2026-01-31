import { type AnyObject, type AnyType, type Enums, type Functions, type Types } from "./1_mtproto_api.js";
import { TLReader } from "./1_tl_reader.js";
export * from "./1_mtproto_api.js";
export type DeserializedType = boolean | number | bigint | string | Uint8Array | AnyType | Array<DeserializedType>;
export declare function deserializeType<T extends (keyof Types) | "X" | string>(name: T, bufferOrReader: TLReader | Uint8Array): Promise<T extends keyof Types ? Types[T] : DeserializedType>;
export declare function serializeObject(object: AnyObject): Uint8Array<ArrayBuffer>;
export declare function isValidObject(object: any): object is AnyType;
export declare function assertIsValidObject(object: any): asserts object is AnyType;
export declare function is<S extends keyof (Types & Functions)>(name: S, value: unknown): value is S extends keyof Types ? Types[S] : S extends keyof Functions ? Functions[S] : never;
export declare function isOneOf<S extends keyof (Types & Functions)>(names: S[] | readonly S[], value: unknown): value is S extends keyof Types ? Types[S] : S extends keyof Functions ? Functions[S] : never;
export declare function isOfEnum<S extends keyof Enums>(name: S, value: unknown): value is Enums[S];
export declare function as<S extends keyof Types>(name: S, value: unknown): Types[S];
export declare function mustGetReturnType(name: string): string;
//# sourceMappingURL=2_mtproto.d.ts.map