import type { DiffResult, DiffType } from "./types.js";
export declare function createColor(diffType: DiffType, 
background?: boolean): (s: string) => string;
export declare function createSign(diffType: DiffType): string;
export interface BuildMessageOptions {
    stringDiff?: boolean;
}
export declare function buildMessage(diffResult: ReadonlyArray<DiffResult<string>>, options?: BuildMessageOptions, truncateDiff?: (diffResult: ReadonlyArray<DiffResult<string>>, stringDiff: boolean, contextLength?: number | null) => ReadonlyArray<DiffResult<string>>): string[];
//# sourceMappingURL=build_message.d.ts.map