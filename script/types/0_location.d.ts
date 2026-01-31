import { Api } from "../2_tl.js";
export interface Location {
    latitude: number;
    longitude: number;
    horizontalAccuracy?: number;
    livePeriod?: number;
    heading?: number;
    proximityAlertRadius?: number;
}
export declare function constructLocation(geo_: Api.messageMediaGeo | Api.messageMediaGeoLive | Api.geoPoint): Location;
//# sourceMappingURL=0_location.d.ts.map