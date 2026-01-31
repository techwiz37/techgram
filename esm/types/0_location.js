import { cleanObject } from "../1_utilities.js";
import { Api } from "../2_tl.js";
export function constructLocation(geo_) {
    if (Api.is("messageMediaGeo", geo_)) {
        const geo = Api.as("geoPoint", geo_.geo);
        return cleanObject({
            latitude: geo.lat,
            longitude: geo.long,
            horizontalAccuracy: geo.accuracy_radius,
        });
    }
    else if (Api.is("messageMediaGeoLive", geo_)) {
        const media = geo_;
        const geo = Api.as("geoPoint", media.geo);
        return cleanObject({
            latitude: geo.lat,
            longitude: geo.long,
            horizontalAccuracy: geo.accuracy_radius,
            livePeriod: media.period,
            heading: media.heading,
            proximityAlertRadius: media.proximity_notification_radius,
        });
    }
    else {
        return cleanObject({
            latitude: geo_.lat,
            longitude: geo_.long,
            horizontalAccuracy: geo_.accuracy_radius,
        });
    }
}
