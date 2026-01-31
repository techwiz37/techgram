import { Api } from "../2_tl.js";
import { constructLocation } from "./0_location.js";
export function constructVenue(media_) {
    const geo = Api.as("geoPoint", media_.geo);
    return {
        location: constructLocation(geo),
        title: media_.title,
        address: media_.address,
        foursquareId: media_.venue_id,
        foursquareType: media_.venue_type,
    };
}
