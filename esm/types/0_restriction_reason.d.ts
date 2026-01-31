import type { Api } from "../2_tl.js";
export interface RestrictionReason {
    platform: string;
    reason: string;
    text: string;
}
export declare function constructRestrictionReason(rr: Api.RestrictionReason): RestrictionReason;
//# sourceMappingURL=0_restriction_reason.d.ts.map