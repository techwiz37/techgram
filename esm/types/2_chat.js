import { unreachable } from "../0_deps.js";
import { cleanObject } from "../1_utilities.js";
import { Api } from "../2_tl.js";
import { constructBirthday } from "./0_birthday.js";
import { constructLocation } from "./0_location.js";
import { constructOpeningHours } from "./0_opening_hours.js";
import { constructPhoto } from "./1_photo.js";
export function constructChat(fullChat, getPeer) {
    if (Api.is("userFull", fullChat)) {
        const peer = getPeer({ _: "peerUser", user_id: fullChat.id });
        if (!peer)
            unreachable();
        return cleanObject({
            ...peer[0],
            birthday: fullChat.birthday ? constructBirthday(fullChat.birthday) : undefined,
            photo: fullChat.profile_photo && Api.is("photo", fullChat.profile_photo) ? constructPhoto(fullChat.profile_photo) : undefined,
            address: fullChat.business_location?.address,
            location: fullChat.business_location?.geo_point && Api.is("geoPoint", fullChat.business_location.geo_point) ? constructLocation(fullChat.business_location.geo_point) : undefined,
            openingHours: fullChat.business_work_hours ? constructOpeningHours(fullChat.business_work_hours) : undefined,
        });
    }
    else if (Api.is("chatFull", fullChat)) {
        const peer = getPeer({ _: "peerChat", chat_id: fullChat.id });
        if (peer === null)
            unreachable();
        return cleanObject({
            ...peer[0],
            photo: fullChat.chat_photo && Api.is("photo", fullChat.chat_photo) ? constructPhoto(fullChat.chat_photo) : undefined,
            videoChatId: Api.is("inputGroupCall", fullChat.call) ? String(fullChat.call.id) : undefined,
        });
    }
    else if (Api.is("channelFull", fullChat)) {
        const peer = getPeer({ _: "peerChannel", channel_id: fullChat.id });
        if (peer === null)
            unreachable();
        return cleanObject({
            ...peer[0],
            photo: fullChat.chat_photo && Api.is("photo", fullChat.chat_photo) ? constructPhoto(fullChat.chat_photo) : undefined,
            videoChatId: Api.is("inputGroupCall", fullChat.call) ? String(fullChat.call.id) : undefined,
        });
    }
    unreachable();
}
