import type { Api } from "../2_tl.js";
export interface OpeningHours {
    timezone: string;
    intervals: [number, number][];
}
export declare function constructOpeningHours(hours: Api.businessWorkHours): OpeningHours;
//# sourceMappingURL=0_opening_hours.d.ts.map