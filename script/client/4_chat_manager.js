"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatManager = void 0;
const _0_deps_js_1 = require("../0_deps.js");
const _0_errors_js_1 = require("../0_errors.js");
const _2_tl_js_1 = require("../2_tl.js");
const _3_types_js_1 = require("../3_types.js");
const _3_types_js_2 = require("../3_types.js");
const _2_telegram_js_1 = require("../tl/2_telegram.js");
const _0_password_js_1 = require("./0_password.js");
const _0_utilities_js_1 = require("./0_utilities.js");
const chatManagerUpdates = [
    "updateChannelParticipant",
    "updateChatParticipant",
    "updateBotChatInviteRequester",
];
class ChatManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    canHandleUpdate(update) {
        return _2_tl_js_1.Api.isOneOf(chatManagerUpdates, update);
    }
    async handleUpdate(update) {
        if (_2_tl_js_1.Api.is("updateChannelParticipant", update) || _2_tl_js_1.Api.is("updateChatParticipant", update)) {
            const chatMember = (0, _3_types_js_1.constructChatMemberUpdated)(update, this.#c.getPeer);
            const selfId = await this.#c.getSelfId();
            if (chatMember.oldChatMember.member.id === selfId) {
                return { myChatMember: chatMember };
            }
            else {
                return { chatMember };
            }
        }
        if (_2_tl_js_1.Api.is("updateBotChatInviteRequester", update)) {
            const joinRequest = (0, _3_types_js_1.constructJoinRequest)(update, this.#c.getPeer);
            return { joinRequest };
        }
        return null;
    }
    async #toggleJoinRequests(chatId, enabled) {
        const channel = await this.#c.getInputChannel(chatId);
        await this.#c.invoke({ _: "channels.toggleJoinRequest", channel, enabled });
    }
    async approveJoinRequest(chatId, userId) {
        await this.#c.invoke({
            _: "messages.hideChatJoinRequest",
            peer: await this.#c.getInputPeer(chatId),
            user_id: await this.#c.getInputUser(userId),
            approved: true,
        });
    }
    async declineJoinRequest(chatId, userId) {
        await this.#c.invoke({
            _: "messages.hideChatJoinRequest",
            peer: await this.#c.getInputPeer(chatId),
            user_id: await this.#c.getInputUser(userId),
        });
    }
    async approveJoinRequests(chatId, params) {
        this.#c.storage.assertUser("approveJoinRequests");
        await this.#c.invoke({
            _: "messages.hideAllChatJoinRequests",
            peer: await this.#c.getInputPeer(chatId),
            approved: true,
            link: params?.inviteLink,
        });
    }
    async declineJoinRequests(chatId, params) {
        this.#c.storage.assertUser("declineJoinRequests");
        await this.#c.invoke({
            _: "messages.hideAllChatJoinRequests",
            peer: await this.#c.getInputPeer(chatId),
            link: params?.inviteLink,
        });
    }
    async getJoinRequests(chatId, params) {
        this.#c.storage.assertUser("getJoinRequests");
        if (typeof params?.inviteLink === "string" && typeof params?.search === "string") {
            throw new _0_errors_js_1.InputError("inviteLink and search cannot be specified together.");
        }
        const peer = await this.#c.getInputPeer(chatId);
        const offset_user = params?.fromUserId ? await this.#c.getInputUser(params.fromUserId) : { _: "inputUserEmpty" };
        const { importers } = await this.#c.invoke({
            _: "messages.getChatInviteImporters",
            requested: true,
            peer,
            link: params?.inviteLink,
            q: params?.search,
            offset_date: params?.fromDate ?? 0,
            offset_user,
            limit: (0, _0_utilities_js_1.getLimit)(params?.limit),
        });
        const peer_ = (0, _2_telegram_js_1.inputPeerToPeer)(peer);
        return await Promise.all(importers.map((v) => (0, _3_types_js_1.constructJoinRequest2)(peer_, v, this.#c.getPeer)));
    }
    async createInviteLink(chatId, params) {
        if (params?.requireApproval && params?.limit) {
            throw new _0_errors_js_1.InputError("requireApproval cannot be true while limit is specified.");
        }
        const result = await this.#c.invoke({ _: "messages.exportChatInvite", peer: await this.#c.getInputPeer(chatId), title: params?.title, expire_date: params?.expireAt, request_needed: params?.requireApproval ? true : undefined, usage_limit: params?.limit });
        return (0, _3_types_js_1.constructInviteLink)(_2_tl_js_1.Api.as("chatInviteExported", result), this.#c.getPeer);
    }
    async getCreatedInviteLinks(chatId, params) {
        this.#c.storage.assertUser("getCreatedInviteLinks");
        const { invites } = await this.#c.invoke({ _: "messages.getExportedChatInvites", peer: await this.#c.getInputPeer(chatId), revoked: params?.revoked ? true : undefined, admin_id: params?.by ? await this.#c.getInputUser(params.by) : { _: "inputUserEmpty" }, limit: (0, _0_utilities_js_1.getLimit)(params?.limit), offset_date: params?.afterDate, offset_link: params?.afterInviteLink });
        return await Promise.all(invites.map((v) => _2_tl_js_1.Api.as("chatInviteExported", v)).map((v) => (0, _3_types_js_1.constructInviteLink)(v, this.#c.getPeer)));
    }
    async joinChat(chatId) {
        this.#c.storage.assertUser("joinChat");
        const peer = await this.#c.getInputPeer(chatId);
        if ((0, _0_utilities_js_1.canBeInputUser)(peer)) {
            throw new _0_errors_js_1.InputError("Cannot join private chats.");
        }
        else if ((0, _0_utilities_js_1.canBeInputChannel)(peer)) {
            await this.#c.invoke({ _: "channels.joinChannel", channel: (0, _0_utilities_js_1.toInputChannel)(peer) });
        }
        else if (_2_tl_js_1.Api.is("inputPeerChat", peer)) {
            await this.#c.invoke({ _: "messages.addChatUser", chat_id: peer.chat_id, user_id: { _: "inputUserSelf" }, fwd_limit: 0 });
        }
        else {
            (0, _0_deps_js_1.unreachable)();
        }
    }
    async leaveChat(chatId) {
        const peer = await this.#c.getInputPeer(chatId);
        if ((0, _0_utilities_js_1.canBeInputUser)(peer)) {
            throw new _0_errors_js_1.InputError("Cannot leave private chats.");
        }
        else if ((0, _0_utilities_js_1.canBeInputChannel)(peer)) {
            await this.#c.invoke({ _: "channels.leaveChannel", channel: (0, _0_utilities_js_1.toInputChannel)(peer) });
        }
        else if (_2_tl_js_1.Api.is("inputPeerChat", peer)) {
            await this.#c.invoke({ _: "messages.deleteChatUser", chat_id: peer.chat_id, user_id: { _: "inputUserSelf" } });
        }
        else {
            (0, _0_deps_js_1.unreachable)();
        }
    }
    async banChatMember(chatId, memberId, params) {
        const chat = await this.#c.getInputPeer(chatId);
        if (!(_2_tl_js_1.Api.is("inputPeerChannel", chat)) && !(_2_tl_js_1.Api.is("inputPeerChat", chat))) {
            throw new _0_errors_js_1.InputError("Expected a channel, supergroup, or group ID.");
        }
        const member = await this.#c.getInputPeer(memberId);
        if (_2_tl_js_1.Api.is("inputPeerChannel", chat)) {
            if (params?.deleteMessages) {
                try {
                    await this.#c.messageManager.deleteChatMemberMessages(chatId, memberId);
                }
                catch {
                }
            }
            await this.#c.invoke({
                _: "channels.editBanned",
                channel: { ...chat, _: "inputChannel" },
                participant: member,
                banned_rights: ({
                    _: "chatBannedRights",
                    until_date: params?.until ?? 0,
                    view_messages: true,
                    send_messages: true,
                    send_media: true,
                    send_stickers: true,
                    send_gifs: true,
                    send_games: true,
                    send_inline: true,
                    embed_links: true,
                }),
            });
        }
        else if (_2_tl_js_1.Api.is("inputPeerChat", chat)) {
            if (!(0, _0_utilities_js_1.canBeInputUser)(member)) {
                throw new _0_errors_js_1.InputError(`Invalid user ID: ${memberId}`);
            }
            await this.#c.invoke({ _: "messages.deleteChatUser", chat_id: chat.chat_id, user_id: (0, _0_utilities_js_1.toInputUser)(member), revoke_history: params?.deleteMessages ? true : undefined });
        }
    }
    async unbanChatMember(chatId, memberId) {
        const channel = await this.#c.getInputChannel(chatId);
        const member = await this.#c.getInputPeer(memberId);
        await this.#c.invoke({ _: "channels.editBanned", channel, participant: member, banned_rights: ({ _: "chatBannedRights", until_date: 0 }) });
    }
    async setChatMemberRights(chatId, memberId, params) {
        const channel = await this.#c.getInputChannel(chatId);
        const member = await this.#c.getInputPeer(memberId);
        await this.#c.invoke({ _: "channels.editBanned", channel, participant: member, banned_rights: (0, _3_types_js_2.chatMemberRightsToTlObject)(params?.rights, params?.until) });
    }
    async setAvailableReactions(chatId, availableReactions) {
        await this.#c.invoke({ _: "messages.setChatAvailableReactions", peer: await this.#c.getInputPeer(chatId), available_reactions: availableReactions === "none" ? { _: "chatReactionsNone" } : availableReactions === "all" ? { _: "chatReactionsAll" } : Array.isArray(availableReactions) ? ({ _: "chatReactionsSome", reactions: availableReactions.map((v) => (0, _3_types_js_2.reactionToTlObject)(v)) }) : (0, _0_deps_js_1.unreachable)() });
    }
    async setBoostsRequiredToCircumventRestrictions(chatId, boosts) {
        this.#c.storage.assertUser("setBoostsRequiredToCircumventRestrictions");
        const channel = await this.#c.getInputChannel(chatId);
        await this.#c.invoke({ _: "channels.setBoostsToUnblockRestrictions", channel, boosts });
    }
    async enableJoinRequests(chatId) {
        this.#c.storage.assertUser("enableJoinRequests");
        await this.#toggleJoinRequests(chatId, true);
    }
    async disableJoinRequests(chatId) {
        this.#c.storage.assertUser("disableJoinRequests");
        await this.#toggleJoinRequests(chatId, false);
    }
    async setChatStickerSet(chatId, setName) {
        const channel = await this.#c.getInputChannel(chatId);
        await this.#c.invoke({ _: "channels.setStickers", channel, stickerset: { _: "inputStickerSetShortName", short_name: setName } });
    }
    async deleteChatStickerSet(chatId) {
        const channel = await this.#c.getInputChannel(chatId);
        await this.#c.invoke({ _: "channels.setStickers", channel, stickerset: { _: "inputStickerSetEmpty" } });
    }
    async deleteChatPhoto(chatId) {
        const peer = await this.#c.getInputPeer(chatId);
        if (!((0, _0_utilities_js_1.canBeInputChannel)(peer)) && !(_2_tl_js_1.Api.is("inputPeerChat", peer))) {
            (0, _0_deps_js_1.unreachable)();
        }
        if ((0, _0_utilities_js_1.canBeInputChannel)(peer)) {
            await this.#c.invoke({ _: "channels.editPhoto", channel: (0, _0_utilities_js_1.toInputChannel)(peer), photo: { _: "inputChatPhotoEmpty" } });
        }
        else if (_2_tl_js_1.Api.is("inputPeerChat", peer)) {
            await this.#c.invoke({ _: "messages.editChatPhoto", chat_id: peer.chat_id, photo: { _: "inputChatPhotoEmpty" } });
        }
    }
    async setChatPhoto(chatId, photo, params) {
        const peer = await this.#c.getInputPeer(chatId);
        if (!((0, _0_utilities_js_1.canBeInputChannel)(peer)) && !(_2_tl_js_1.Api.is("inputPeerChat", peer))) {
            (0, _0_deps_js_1.unreachable)();
        }
        const file = await this.#c.fileManager.upload(photo, params);
        const photo_ = { _: "inputChatUploadedPhoto", file };
        if ((0, _0_utilities_js_1.canBeInputChannel)(peer)) {
            await this.#c.invoke({ _: "channels.editPhoto", channel: (0, _0_utilities_js_1.toInputChannel)(peer), photo: photo_ });
        }
        else if (_2_tl_js_1.Api.is("inputPeerChat", peer)) {
            await this.#c.invoke({ _: "messages.editChatPhoto", chat_id: peer.chat_id, photo: photo_ });
        }
    }
    async addChatMember(chatId, userId, params) {
        this.#c.storage.assertUser("addChatMember");
        const chat = await this.#c.getInputPeer(chatId);
        if (_2_tl_js_1.Api.isOneOf(["inputPeerEmpty", "inputPeerSelf", "inputPeerUser", "inputPeerUserFromMessage"], chat)) {
            throw new _0_errors_js_1.InputError("Cannot add members to private chats");
        }
        const user = await this.#c.getInputUser(userId);
        if (_2_tl_js_1.Api.is("inputPeerChat", chat)) {
            const result = await this.#c.invoke({ _: "messages.addChatUser", chat_id: chat.chat_id, user_id: user, fwd_limit: params?.historyLimit ?? 0 });
            return result.missing_invitees.map(_3_types_js_1.constructFailedInvitation);
        }
        else if (_2_tl_js_1.Api.is("inputPeerChannel", chat)) {
            const result = await this.#c.invoke({ _: "channels.inviteToChannel", channel: { ...chat, _: "inputChannel" }, users: [user] });
            return result.missing_invitees.map(_3_types_js_1.constructFailedInvitation);
        }
        (0, _0_deps_js_1.unreachable)();
    }
    async addChatMembers(chatId, userIds) {
        this.#c.storage.assertUser("addChatMembers");
        const chat = await this.#c.getInputPeer(chatId);
        if (_2_tl_js_1.Api.isOneOf(["inputPeerEmpty", "inputPeerSelf", "inputPeerUser", "inputPeerUserFromMessage"], chat)) {
            throw new _0_errors_js_1.InputError("Cannot add members to private chats");
        }
        const users = new Array();
        for (const userId of userIds) {
            users.push(await this.#c.getInputUser(userId));
        }
        if (_2_tl_js_1.Api.is("inputPeerChat", chat)) {
            throw new _0_errors_js_1.InputError("addChatMembers cannot be used with basic groups");
        }
        else if ((0, _0_utilities_js_1.canBeInputChannel)(chat)) {
            const result = await this.#c.invoke({ _: "channels.inviteToChannel", channel: (0, _0_utilities_js_1.toInputChannel)(chat), users });
            return result.missing_invitees.map(_3_types_js_1.constructFailedInvitation);
        }
        (0, _0_deps_js_1.unreachable)();
    }
    async #toggleSlowMode(chatId, seconds) {
        const channel = await this.#c.getInputChannel(chatId);
        await this.#c.invoke({ _: "channels.toggleSlowMode", channel, seconds });
    }
    async disableSlowMode(chatId) {
        this.#c.storage.assertUser("disableSlowMode");
        await this.#toggleSlowMode(chatId, 0);
    }
    async setSlowMode(chatId, duration) {
        this.#c.storage.assertUser("setSlowMode");
        const seconds = (0, _3_types_js_1.slowModeDurationToSeconds)(duration);
        if (seconds > 1) {
            throw new _0_errors_js_1.InputError("Invalid slow mode duration.");
        }
        await this.#toggleSlowMode(chatId, seconds);
    }
    async setChatTitle(chatId, title) {
        const peer = await this.#c.getInputPeer(chatId);
        if (_2_tl_js_1.Api.is("inputPeerChat", peer)) {
            await this.#c.invoke({ _: "messages.editChatTitle", chat_id: peer.chat_id, title });
        }
        else if ((0, _0_utilities_js_1.canBeInputChannel)(peer)) {
            const channel = (0, _0_utilities_js_1.toInputChannel)(peer);
            await this.#c.invoke({ _: "channels.editTitle", channel, title });
        }
        else {
            throw new _0_errors_js_1.InputError("A chat or channel identifier was expected.");
        }
    }
    async setChatDescription(chatId, description) {
        const peer = await this.#c.getInputPeer(chatId);
        if ((0, _0_utilities_js_1.canBeInputUser)(peer)) {
            throw new _0_errors_js_1.InputError("A chat or channel identifier was expected.");
        }
        await this.#c.invoke({ _: "messages.editChatAbout", peer, about: description });
    }
    async setMemberListVisibility(chatId, visible) {
        this.#c.storage.assertUser("setMemberListVisible");
        const channel = await this.#c.getInputChannel(chatId);
        const enabled = !visible;
        await this.#c.invoke({ _: "channels.toggleParticipantsHidden", channel, enabled });
    }
    async setTopicsEnabled(chatId, enabled, tabs) {
        this.#c.storage.assertUser("setTopicsEnabled");
        const channel = await this.#c.getInputChannel(chatId);
        await this.#c.invoke({ _: "channels.toggleForum", channel, enabled, tabs });
    }
    async setAntispamEnabled(chatId, enabled) {
        this.#c.storage.assertUser("setTopicsEnabled");
        const channel = await this.#c.getInputChannel(chatId);
        await this.#c.invoke({ _: "channels.toggleAntiSpam", channel, enabled });
    }
    async setSignaturesEnabled(chatId, enabled, params) {
        this.#c.storage.assertUser("setSignaturesEnabled");
        const channel = await this.#c.getInputChannel(chatId);
        await this.#c.invoke({ _: "channels.toggleSignatures", channel, signatures_enabled: enabled ? true : undefined, profiles_enabled: params?.showAuthorProfile ? true : undefined });
    }
    async deleteChat(chatId) {
        this.#c.storage.assertUser("deleteChat");
        const peer = await this.#c.getInputPeer(chatId);
        if (_2_tl_js_1.Api.is("inputPeerChat", peer)) {
            await this.#c.invoke({ _: "messages.deleteChat", chat_id: peer.chat_id });
        }
        else if ((0, _0_utilities_js_1.canBeInputChannel)(peer)) {
            const channel = (0, _0_utilities_js_1.toInputChannel)(peer);
            await this.#c.invoke({ _: "channels.deleteChannel", channel });
        }
        else {
            throw new _0_errors_js_1.InputError("A chat or channel identifier was expected.");
        }
    }
    async getDiscussionChatSuggestions() {
        this.#c.storage.assertUser("getDiscussionChatSuggestions");
        const { chats } = await this.#c.invoke({ _: "channels.getGroupsForDiscussion" });
        return chats
            .map((v) => {
            if (!_2_tl_js_1.Api.isOneOf(["chat", "channel"], v)) {
                return v;
            }
            else {
                return (0, _3_types_js_1.constructChatP)(v);
            }
        })
            .filter((v) => v !== null);
    }
    async setDiscussionChat(chatId, discussionChatId) {
        this.#c.storage.assertUser("setDiscussionChat");
        const [broadcast, group] = await Promise.all([this.#c.getInputChannel(chatId), this.#c.getInputChannel(discussionChatId)]);
        await this.#c.invoke({ _: "channels.setDiscussionGroup", broadcast, group });
    }
    async transferChatOwnership(chatId, userId, password) {
        this.#c.storage.assertUser("transferChat");
        const user_id = await this.#c.getInputUser(userId);
        const isSelf = _2_tl_js_1.Api.is("inputUserSelf", user_id);
        if (isSelf || _2_tl_js_1.Api.peerToChatId(user_id) === await this.#c.getSelfId()) {
            throw new _0_errors_js_1.InputError("A user ID except that of the current one was expected.");
        }
        const channel = await this.#c.getInputChannel(chatId);
        const ap = await this.#c.invoke({ _: "account.getPassword" });
        const password_ = await (0, _0_password_js_1.checkPassword)(password, ap);
        await this.#c.invoke({ _: "channels.editCreator", channel, user_id, password: password_ });
    }
    async promoteChatMember(chatId, userId, params) {
        const channel = await this.#c.getInputChannel(chatId);
        const user_id = await this.#c.getInputUser(userId);
        const admin_rights = (0, _3_types_js_1.chatAdministratorRightsToTlObject)(params ?? {});
        const rank = params?.title ?? "";
        await this.#c.invoke({
            _: "channels.editAdmin",
            channel,
            user_id,
            admin_rights,
            rank,
        });
    }
}
exports.ChatManager = ChatManager;
