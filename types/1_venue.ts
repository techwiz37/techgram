import { Api } from "../2_tl.ts";
import { constructLocation, type Location } from "./0_location.ts";

export interface Venue {

  location: Location;

  title: string;

  address: string;

  foursquareId?: string;

  foursquareType?: string;
}

export function constructVenue(media_: Api.messageMediaVenue | Api.mediaAreaVenue): Venue {
  const geo = Api.as("geoPoint", media_.geo);
  return {
    location: constructLocation(geo),
    title: media_.title,
    address: media_.address,
    foursquareId: media_.venue_id,
    foursquareType: media_.venue_type,
  };
}
