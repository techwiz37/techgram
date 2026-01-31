import { Api } from "../2_tl.ts";

export interface GiveawayParameters {

  boostedChatId: number;

  additionalChatIds: number[];

  winnerSelectionDate: number;

  onlyNewMembers: boolean;

  countries: string[];
}

export function constructGiveawayParameters(g: Api.messageMediaGiveaway): GiveawayParameters {
  const countries = g.countries_iso2 ?? [];
  const boostedChatId = Api.peerToChatId({ _: "peerChannel", channel_id: g.channels[0] });
  const additionalChatIds = g.channels.slice(1).map((v) => Api.peerToChatId({ _: "peerChannel", channel_id: v }));
  const onlyNewMembers = g.only_new_subscribers ? true : false;
  const winnerSelectionDate = g.until_date;

  return { boostedChatId, additionalChatIds, winnerSelectionDate, onlyNewMembers, countries };
}
