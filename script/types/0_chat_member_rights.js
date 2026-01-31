"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructChatMemberRights = constructChatMemberRights;
exports.chatMemberRightsToTlObject = chatMemberRightsToTlObject;
const _1_utilities_js_1 = require("../1_utilities.js");
function constructChatMemberRights(rights) {
    return (0, _1_utilities_js_1.cleanObject)({
        canSendMessages: rights.send_messages ? true : false,
        canSendAudio: rights.send_audios ? true : false,
        canSendDocuments: rights.send_docs ? true : false,
        canSendPhotos: rights.send_photos ? true : false,
        canSendVideos: rights.send_messages ? true : false,
        canSendVideoNotes: rights.send_roundvideos ? true : false,
        canSendVoice: rights.send_voices ? true : false,
        canSendPolls: rights.send_polls ? true : false,
        canSendStickers: rights.send_stickers ? true : false,
        canSendAnimations: rights.send_gifs ? true : undefined,
        canSendGames: rights.send_games ? true : undefined,
        canSendInlineBotResults: rights.send_inline ? true : undefined,
        canAddWebPagePreviews: rights.embed_links ? true : undefined,
        canChangeInfo: rights.change_info ? true : undefined,
        canInviteUsers: rights.invite_users ? true : undefined,
        canPinMessages: rights.pin_messages ? true : undefined,
        canManageTopics: rights.manage_topics ? true : undefined,
    });
}
function chatMemberRightsToTlObject(rights, until) {
    return {
        _: "chatBannedRights",
        until_date: until ?? 0,
        send_messages: rights?.canSendMessages !== false ? undefined : true,
        send_audios: rights?.canSendAudio !== false ? undefined : true,
        send_docs: rights?.canSendDocuments !== false ? undefined : true,
        send_photos: rights?.canSendPhotos !== false ? undefined : true,
        send_videos: rights?.canSendVideos !== false ? undefined : true,
        send_roundvideos: rights?.canSendVideoNotes !== false ? undefined : true,
        send_voices: rights?.canSendVoice !== false ? undefined : true,
        send_polls: rights?.canSendPolls !== false ? undefined : true,
        send_stickers: rights?.canSendStickers !== false ? undefined : true,
        send_gifs: rights?.canSendAnimations !== false ? undefined : true,
        send_games: rights?.canSendGames !== false ? undefined : true,
        send_inline: rights?.canSendInlineBotResults !== false ? undefined : true,
        embed_links: rights?.canAddWebPagePreviews !== false ? undefined : true,
        change_info: rights?.canChangeInfo !== false ? undefined : true,
        invite_users: rights?.canInviteUsers !== false ? undefined : true,
        pin_messages: rights?.canPinMessages !== false ? undefined : true,
        manage_topics: rights?.canManageTopics !== false ? undefined : true,
    };
}
