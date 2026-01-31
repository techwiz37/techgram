import { unreachable } from "../0_deps.js";
import { Api } from "../2_tl.js";
import { chatIdToPeerId } from "../tl/2_telegram.js";
import { constructLocation } from "./0_location.js";
import { constructReaction, reactionToTlObject } from "./0_reaction.js";
import { constructVenue } from "./1_venue.js";
function constructStoryInteractiveAreaPosition(position) {
    return {
        xPercentage: position.x,
        yPercentage: position.y,
        widthPercentage: position.w,
        heightPercentage: position.h,
        rotationAngle: position.rotation,
    };
}
export function constructStoryInteractiveArea(area) {
    const position = constructStoryInteractiveAreaPosition(area.coordinates);
    if (Api.is("mediaAreaGeoPoint", area)) {
        if (Api.is("geoPointEmpty", area.geo)) {
            unreachable();
        }
        const location = constructLocation(area.geo);
        return { position, location };
    }
    else if (Api.is("mediaAreaVenue", area)) {
        const venue = constructVenue(area);
        return { position, venue };
    }
    else if (Api.is("mediaAreaSuggestedReaction", area)) {
        const reaction = constructReaction(area.reaction);
        return {
            position,
            reaction,
            count: 0,
            isFlipped: area.flipped ? true : false,
            isDark: area.dark ? true : false,
        };
    }
    else if (Api.is("mediaAreaChannelPost", area)) {
        return {
            position,
            messageReference: {
                chatId: Api.peerToChatId(area),
                messageId: area.msg_id,
            },
        };
    }
    else {
        unreachable();
    }
}
function storyInteractiveAreaPositionToTlObject(position) {
    return { _: "mediaAreaCoordinates", x: position.xPercentage, y: position.yPercentage, w: position.widthPercentage, h: position.heightPercentage, rotation: position.rotationAngle };
}
export function storyInteractiveAreaToTlObject(area, getPeer) {
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
        const reaction = reactionToTlObject(area.reaction);
        return { _: "mediaAreaSuggestedReaction", coordinates, reaction, dark: area.isDark ? true : undefined, flipped: area.isFlipped ? true : undefined };
    }
    else if ("messageReference" in area) {
        const peer = getPeer(Api.chatIdToPeer(area.messageReference.chatId));
        if (!peer || peer[0].type !== "channel") {
            unreachable();
        }
        const channel = { _: "inputChannel", channel_id: chatIdToPeerId(peer[0].id), access_hash: peer[1] };
        return { _: "inputMediaAreaChannelPost", coordinates, channel, msg_id: area.messageReference.messageId };
    }
    else {
        unreachable();
    }
}
