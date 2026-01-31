"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructChatSettings = constructChatSettings;
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _2_user_js_1 = require("./2_user.js");
function constructChatSettings(settings_) {
    const settings = {
        report: settings_.settings.report_spam || false,
        addToContacts: settings_.settings.add_contact || false,
        block: settings_.settings.block_contact || false,
        shareContact: settings_.settings.share_contact || false,
        contactsException: settings_.settings.need_contacts_exception || false,
        reportLocation: settings_.settings.report_geo || false,
        unarchive: settings_.settings.autoarchived || false,
        inviteMembers: settings_.settings.invite_members || false,
        channelJoinRequest: settings_.settings.request_chat_broadcast || false,
        businessBotPaused: settings_.settings.business_bot_paused || false,
        businessBotCanReply: settings_.settings.business_bot_can_reply || false,
        distance: settings_.settings.geo_distance,
        joinRequestChatTitle: settings_.settings.request_chat_title,
        joinRequestDate: settings_.settings.request_chat_date ? settings_.settings.request_chat_date : undefined,
        businessBotUrl: settings_.settings.business_bot_manage_url,
        messagePrice: settings_.settings.charge_paid_message_stars ? Number(settings_.settings.charge_paid_message_stars) : undefined,
        registrationMonth: settings_.settings.registration_month,
        phoneCountry: settings_.settings.phone_country,
        nameChangeDate: settings_.settings.name_change_date ? settings_.settings.name_change_date : undefined,
        photoChangeDate: settings_.settings.photo_change_date ? settings_.settings.photo_change_date : undefined,
    };
    const bot = settings_.users.find((v) => v.id === settings_.settings.business_bot_id);
    if (_2_tl_js_1.Api.is("user", bot)) {
        settings.businessBot = (0, _2_user_js_1.constructUser)(bot);
    }
    return (0, _1_utilities_js_1.cleanObject)(settings);
}
