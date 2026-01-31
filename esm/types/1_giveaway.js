import { cleanObject } from "../1_utilities.js";
import { constructGiveawayParameters } from "./0_giveaway_parameters.js";
export function constructGiveaway(g) {
    const winnerCount = g.quantity;
    const premiumMonthCount = g.months;
    const starCount = g.stars;
    const parameters = constructGiveawayParameters(g);
    return cleanObject({ parameters, winnerCount, premiumMonthCount, starCount: starCount ? Number(starCount) : undefined });
}
