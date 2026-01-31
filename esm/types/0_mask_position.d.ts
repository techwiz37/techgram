import type { Api } from "../2_tl.js";
export interface MaskPosition {
    point: "forehead" | "eyes" | "mouth" | "chin";
    xShift: number;
    yShift: number;
    scale: number;
}
export declare function constructMaskPosition({ n, x, y, zoom }: Api.MaskCoords): MaskPosition;
//# sourceMappingURL=0_mask_position.d.ts.map