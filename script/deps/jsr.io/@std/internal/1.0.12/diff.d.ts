import type { DiffResult, DiffType } from "./types.js";
export interface FarthestPoint {
    y: number;
    id: number;
}
export declare function createCommon<T>(A: T[], B: T[]): T[];
export declare function assertFp(value: unknown): asserts value is FarthestPoint;
export declare function backTrace<T>(A: T[], B: T[], current: FarthestPoint, swapped: boolean, routes: Uint32Array, diffTypesPtrOffset: number): Array<{
    type: DiffType;
    value: T;
}>;
export declare function createFp(k: number, M: number, routes: Uint32Array, diffTypesPtrOffset: number, ptr: number, slide?: FarthestPoint, down?: FarthestPoint): FarthestPoint;
export declare function diff<T>(A: T[], B: T[]): DiffResult<T>[];
//# sourceMappingURL=diff.d.ts.map