import { cleanObject } from "../1_utilities.ts";
import type { Api } from "../2_tl.ts";
import { constructGiveawayParameters, type GiveawayParameters } from "./0_giveaway_parameters.ts";

export interface Giveaway {
  parameters: GiveawayParameters;

  winnerCount: number;

  premiumMonthCount?: number;

  starCount?: number;
}

export function constructGiveaway(g: Api.messageMediaGiveaway): Giveaway {
  const winnerCount = g.quantity;
  const premiumMonthCount = g.months;
  const starCount = g.stars;
  const parameters = constructGiveawayParameters(g);
  return cleanObject({ parameters, winnerCount, premiumMonthCount, starCount: starCount ? Number(starCount) : undefined });
}
