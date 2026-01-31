import { Api } from "../2_tl.js";
import { type Location } from "./0_location.js";
export interface Venue {
    location: Location;
    title: string;
    address: string;
    foursquareId?: string;
    foursquareType?: string;
}
export declare function constructVenue(media_: Api.messageMediaVenue | Api.mediaAreaVenue): Venue;
//# sourceMappingURL=1_venue.d.ts.map