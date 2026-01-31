import type { Schema } from "./0_types.js";
export declare function isValidObject(object: any, schema: Schema): boolean;
export declare function assertIsValidObject(object: any, schema: Schema): void;
export declare function is(typeName: string, value: any, schema: Schema): boolean;
export declare function isOneOf(names: string[], value: unknown, schema: Schema): boolean;
export declare function isOfEnum(name: string, value: any, schema: Schema): boolean;
export declare function as(name: string, value: unknown, schema: Schema): unknown;
export declare function mustGetReturnType(name: string, schema: Schema): string;
//# sourceMappingURL=1_utilities.d.ts.map