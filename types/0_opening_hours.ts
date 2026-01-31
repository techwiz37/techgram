import type { Api } from "../2_tl.ts";

export interface OpeningHours {
  timezone: string;
  intervals: [number, number][];
}

export function constructOpeningHours(hours: Api.businessWorkHours): OpeningHours {
  return {
    timezone: hours.timezone_id,
    intervals: hours.weekly_open.map((v) => [v.start_minute, v.end_minute]),
  };
}
