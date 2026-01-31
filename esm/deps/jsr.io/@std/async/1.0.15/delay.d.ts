export interface DelayOptions {
    signal?: AbortSignal;
    persistent?: boolean;
}
export declare function delay(ms: number, options?: DelayOptions): Promise<void>;
//# sourceMappingURL=delay.d.ts.map