export declare function isOptionalParam(ntype: string): boolean;
export declare function getOptionalParamInnerType(ntype: string): string;
export declare function analyzeOptionalParam(ntype: string): {
    flagField: string;
    bitIndex: number;
};
export declare function repr(value: unknown): string | null;
export declare function toJSON(object: unknown): any;
export declare function getVectorItemType(type: string): string | null;
export declare const X = "X";
export declare const VECTOR = 481674261;
export declare const BOOL_TRUE = 2574415285;
export declare const BOOL_FALSE = 3162085175;
export declare function constructorIdToHex(constructorId: number): string;
//# sourceMappingURL=0_utilities.d.ts.map