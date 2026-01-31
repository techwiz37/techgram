"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructLocation = constructLocation;
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
function constructLocation(geo_) {
    if (_2_tl_js_1.Api.is("messageMediaGeo", geo_)) {
        const geo = _2_tl_js_1.Api.as("geoPoint", geo_.geo);
        return (0, _1_utilities_js_1.cleanObject)({
            latitude: geo.lat,
            longitude: geo.long,
            horizontalAccuracy: geo.accuracy_radius,
        });
    }
    else if (_2_tl_js_1.Api.is("messageMediaGeoLive", geo_)) {
        const media = geo_;
        const geo = _2_tl_js_1.Api.as("geoPoint", media.geo);
        return (0, _1_utilities_js_1.cleanObject)({
            latitude: geo.lat,
            longitude: geo.long,
            horizontalAccuracy: geo.accuracy_radius,
            livePeriod: media.period,
            heading: media.heading,
            proximityAlertRadius: media.proximity_notification_radius,
        });
    }
    else {
        return (0, _1_utilities_js_1.cleanObject)({
            latitude: geo_.lat,
            longitude: geo_.long,
            horizontalAccuracy: geo_.accuracy_radius,
        });
    }
}
