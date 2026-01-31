import type { DiffResult } from "./types.js";
export declare function unescape(string: string): string;
export declare function tokenize(string: string, wordDiff?: boolean): string[];
export declare function createDetails(line: DiffResult<string>, tokens: DiffResult<string>[]): DiffResult<string>[];
export declare function diffStr(A: string, B: string): DiffResult<string>[];
//# sourceMappingURL=diff_str.d.ts.map