"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructStoryInteractiveArea = constructStoryInteractiveArea;
exports.storyInteractiveAreaToTlObject = storyInteractiveAreaToTlObject;
const _0_deps_js_1 = require("../0_deps.js");
const _2_tl_js_1 = require("../2_tl.js");
const _2_telegram_js_1 = require("../tl/2_telegram.js");
const _0_location_js_1 = require("./0_location.js");
const _0_reaction_js_1 = require("./0_reaction.js");
const _1_venue_js_1 = require("./1_venue.js");
function constructStoryInteractiveAreaPosition(position) {
    return {
        xPercentage: position.x,
        yPercentage: position.y,
        widthPercentage: position.w,
        heightPercentage: position.h,
        rotationAngle: position.rotation,
    };
}
function constructStoryInteractiveArea(area) {
    const position = constructStoryInteractiveAreaPosition(area.coordinates);
    if (_2_tl_js_1.Api.is("mediaAreaGeoPoint", area)) {
        if (_2_tl_js_1.Api.is("geoPointEmpty", area.geo)) {
            (0, _0_deps_js_1.unreachable)();
        }
        const location = (0, _0_location_js_1.constructLocation)(area.geo);
        return { position, location };
    }
    else if (_2_tl_js_1.Api.is("mediaAreaVenue", area)) {
        const venue = (0, _1_venue_js_1.constructVenue)(area);
        return { position, venue };
    }
    else if (_2_tl_js_1.Api.is("mediaAreaSuggestedReaction", area)) {
        const reaction = (0, _0_reaction_js_1.constructReaction)(area.reaction);
        return {
            position,
            reaction,
            count: 0,
            isFlipped: area.flipped ? true : false,
            isDark: area.dark ? true : false,
        };
    }
    else if (_2_tl_js_1.Api.is("mediaAreaChannelPost", area)) {
        return {
            position,
            messageReference: {
                chatId: _2_tl_js_1.Api.peerToChatId(area),
                messageId: area.msg_id,
            },
        };
    }
    else {
        (0, _0_deps_js_1.unreachable)();
    }
}
function storyInteractiveAreaPositionToTlObject(position) {
    return { _: "mediaAreaCoordinates", x: position.xPercentage, y: position.yPercentage, w: position.widthPercentage, h: position.heightPercentage, rotation: position.rotationAngle };
}
function storyInteractiveAreaToTlObject(area, getPeer) {
    const coordinates = storyInteractiveAreaPositionToTlObject(area.position);
    if ("location" in area) {
        const geo = { _: "geoPoint", lat: area.location.latitude, long: area.location.longitude, access_hash: 0n, accuracy_radius: area.location.horizontalAccuracy };
        return { _: "mediaAreaGeoPoint", coordinates, geo };
    }
    else if ("venue" in area) {
        const geo = { _: "geoPoint", lat: area.venue.location.latitude, long: area.venue.location.longitude, access_hash: 0n, accuracy_radius: area.venue.location.horizontalAccuracy };
        return {
            _: "mediaAreaVenue",
            coordinates,
            geo,
            address: area.venue.address,
            provider: "foursquare",
            title: area.venue.title,
            venue_id: area.venue.foursquareId || "",
            venue_type: area.venue.foursquareType || "",
        };
    }
    else if ("reaction" in area) {
        const reaction = (0, _0_reaction_js_1.reactionToTlObject)(area.reaction);
        return { _: "mediaAreaSuggestedReaction", coordinates, reaction, dark: area.isDark ? true : undefined, flipped: area.isFlipped ? true : undefined };
    }
    else if ("messageReference" in area) {
        const peer = getPeer(_2_tl_js_1.Api.chatIdToPeer(area.messageReference.chatId));
        if (!peer || peer[0].type !== "channel") {
            (0, _0_deps_js_1.unreachable)();
        }
        const channel = { _: "inputChannel", channel_id: (0, _2_telegram_js_1.chatIdToPeerId)(peer[0].id), access_hash: peer[1] };
        return { _: "inputMediaAreaChannelPost", coordinates, channel, msg_id: area.messageReference.messageId };
    }
    else {
        (0, _0_deps_js_1.unreachable)();
    }
}
