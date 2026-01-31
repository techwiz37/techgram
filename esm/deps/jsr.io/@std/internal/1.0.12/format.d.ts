export type InspectFn = (v: unknown, options: {
    depth: number;
    sorted: boolean;
    trailingComma: boolean;
    compact: boolean;
    iterableLimit: number;
    getters: boolean;
    strAbbreviateSize: number;
}) => string;
export declare function format(v: unknown): string;
//# sourceMappingURL=format.d.ts.map