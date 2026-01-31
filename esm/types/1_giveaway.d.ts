import type { Api } from "../2_tl.js";
import { type GiveawayParameters } from "./0_giveaway_parameters.js";
export interface Giveaway {
    parameters: GiveawayParameters;
    winnerCount: number;
    premiumMonthCount?: number;
    starCount?: number;
}
export declare function constructGiveaway(g: Api.messageMediaGiveaway): Giveaway;
//# sourceMappingURL=1_giveaway.d.ts.map