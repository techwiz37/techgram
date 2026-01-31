import { Api } from "../2_tl.js";
export interface GiveawayParameters {
    boostedChatId: number;
    additionalChatIds: number[];
    winnerSelectionDate: number;
    onlyNewMembers: boolean;
    countries: string[];
}
export declare function constructGiveawayParameters(g: Api.messageMediaGiveaway): GiveawayParameters;
//# sourceMappingURL=0_giveaway_parameters.d.ts.map