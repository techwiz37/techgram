export interface Part {
    small: boolean;
    part: number;
    totalParts: number;
    bytes: Uint8Array<ArrayBuffer>;
}
export declare class PartStream extends TransformStream<Uint8Array<ArrayBuffer>, Part> {
    #private;
    constructor(chunkSize: number);
}
//# sourceMappingURL=0_part_stream.d.ts.map