export type SelfDestructAfterOpen = "afterOpen";
export type SelfDestructAfterSeconds = number;
export type SelfDestructOption = SelfDestructAfterOpen | SelfDestructAfterSeconds;
export declare function constructSelfDestructOption(ttlSeconds: number): SelfDestructOption;
export declare function selfDestructOptionToInt(option: SelfDestructOption): number;
//# sourceMappingURL=0_self_destruct_option.d.ts.map