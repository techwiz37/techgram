"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructVenue = constructVenue;
const _2_tl_js_1 = require("../2_tl.js");
const _0_location_js_1 = require("./0_location.js");
function constructVenue(media_) {
    const geo = _2_tl_js_1.Api.as("geoPoint", media_.geo);
    return {
        location: (0, _0_location_js_1.constructLocation)(geo),
        title: media_.title,
        address: media_.address,
        foursquareId: media_.venue_id,
        foursquareType: media_.venue_type,
    };
}
