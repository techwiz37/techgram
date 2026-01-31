"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoChatManager = void 0;
const _0_deps_js_1 = require("../0_deps.js");
const _0_errors_js_1 = require("../0_errors.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _3_transport_js_1 = require("../3_transport.js");
const _3_types_js_1 = require("../3_types.js");
const _2_telegram_js_1 = require("../tl/2_telegram.js");
const _0_utilities_js_1 = require("./0_utilities.js");
const videoChatManagerUpdates = [
    "updateGroupCall",
];
class VideoChatManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    async #createGroupCall(chatId, title, liveStream, scheduleDate) {
        const peer = await this.#c.getInputPeer(chatId);
        if ((0, _0_utilities_js_1.canBeInputUser)(peer)) {
            throw new _0_errors_js_1.InputError("Video chats are only available for groups and channels.");
        }
        const { updates } = await this.#c.invoke({ _: "phone.createGroupCall", peer, random_id: (0, _1_utilities_js_1.getRandomId)(true), title, rtmp_stream: liveStream, schedule_date: scheduleDate }).then((v) => _2_tl_js_1.Api.as("updates", v));
        const updateGroupCall = updates
            .find((v) => _2_tl_js_1.Api.is("updateGroupCall", v));
        if (!updateGroupCall) {
            (0, _0_deps_js_1.unreachable)();
        }
        return (0, _3_types_js_1.constructVideoChat)(updateGroupCall.call);
    }
    async startVideoChat(chatId, params) {
        this.#c.storage.assertUser("startVideoChat");
        return await this.#createGroupCall(chatId, params?.title, params?.liveStream || undefined);
    }
    async scheduleVideoChat(chatId, startAt, params) {
        this.#c.storage.assertUser("scheduleVideoChat");
        return await this.#createGroupCall(chatId, params?.title, params?.liveStream || undefined, startAt);
    }
    async #getInputGroupCall(id_) {
        const id = BigInt(id_);
        const accessHash = await this.#c.messageStorage.getGroupCallAccessHash(id);
        if (accessHash === null) {
            throw new _0_errors_js_1.InputError("Video chat not found.");
        }
        return { _: "inputGroupCall", id, access_hash: accessHash };
    }
    async joinVideoChat(id, params, params_) {
        this.#c.storage.assertUser("joinVideoChat");
        const call = await this.#getInputGroupCall(id);
        const { updates } = await this.#c.invoke({ _: "phone.joinGroupCall", call, join_as: params_?.joinAs ? await this.#c.getInputPeer(params_.joinAs) : { _: "inputPeerSelf" }, params: ({ _: "dataJSON", data: params }), invite_hash: params_?.inviteHash, muted: params_?.audio ? undefined : true, video_stopped: params_?.video ? undefined : true }).then((v) => _2_tl_js_1.Api.as("updates", v));
        const updateGroupCall = updates
            .find((v) => _2_tl_js_1.Api.is("updateGroupCallConnection", v));
        if (!updateGroupCall)
            (0, _0_deps_js_1.unreachable)();
        return updateGroupCall.params.data;
    }
    async leaveVideoChat(id) {
        this.#c.storage.assertUser("leaveVideoChat");
        await this.#c.invoke({ _: "phone.leaveGroupCall", call: await this.#getInputGroupCall(id), source: 0 });
    }
    async joinLiveStream(id) {
        this.#c.storage.assertUser("joinLiveStream");
        const call = await this.#getInputGroupCall(id);
        const { updates } = await this.#c.invoke({
            _: "phone.joinGroupCall",
            call,
            join_as: { _: "inputPeerSelf" },
            params: ({
                _: "dataJSON",
                data: JSON.stringify({
                    fingerprints: [],
                    pwd: "",
                    ssrc: (0, _1_utilities_js_1.getRandomId)(true),
                    "ssrc-groups": [],
                    ufrag: "",
                }),
            }),
        }).then((v) => _2_tl_js_1.Api.as("updates", v));
        const updateGroupCall = updates
            .find((v) => _2_tl_js_1.Api.is("updateGroupCallConnection", v));
        if (!updateGroupCall)
            (0, _0_deps_js_1.unreachable)();
    }
    async #getCall(id) {
        let groupCall = await this.#c.messageStorage.getGroupCall(BigInt(id));
        if (groupCall === null) {
            const call = await this.#getInputGroupCall(id);
            groupCall = (await this.#c.invoke({ _: "phone.getGroupCall", call, limit: 1 })).call;
        }
        return groupCall;
    }
    async getVideoChat(id) {
        this.#c.storage.assertUser("getVideoChat");
        return (0, _3_types_js_1.constructVideoChat)(await this.#getCall(id));
    }
    canHandleUpdate(update) {
        return _2_tl_js_1.Api.isOneOf(videoChatManagerUpdates, update);
    }
    async handleUpdate(update) {
        if (!update.peer) {
            return null;
        }
        const chatId = (0, _2_telegram_js_1.peerToChatId)(update.peer);
        const fullChat = await this.#c.messageStorage.getFullChat(chatId).then((v) => v === null ? this.#c.messageStorage.getFullChat(chatId) : v);
        let updateFullChat = false;
        if (_2_tl_js_1.Api.is("groupCallDiscarded", update.call)) {
            await this.#c.messageStorage.setGroupCall(update.call.id, null);
            await this.#c.messageStorage.setGroupCallAccessHash(update.call.id, null);
            if (fullChat !== null) {
                fullChat.call = undefined;
                updateFullChat = true;
            }
        }
        else {
            await this.#c.messageStorage.setGroupCall(update.call.id, update.call);
            await this.#c.messageStorage.setGroupCallAccessHash(update.call.id, update.call.access_hash);
            if (fullChat !== null) {
                if (!("call" in fullChat) || !fullChat.call || !_2_tl_js_1.Api.is("inputGroupCall", fullChat.call) || fullChat.call.id !== update.call.id) {
                    fullChat.call = { ...update.call, _: "inputGroupCall" };
                    updateFullChat = true;
                }
            }
        }
        if (updateFullChat) {
            await this.#c.messageStorage.setFullChat(chatId, fullChat);
        }
        return { videoChat: (0, _3_types_js_1.constructVideoChat)(update.call) };
    }
    async getLiveStreamChannels(id) {
        this.#c.storage.assertUser("getLiveStreamChannels");
        const call = await this.#getCall(id);
        if (!(_2_tl_js_1.Api.is("groupCall", call)) || !call.rtmp_stream) {
            throw new _0_errors_js_1.InputError("Not a live stream.");
        }
        const dc = call.stream_dc_id ? (0, _3_transport_js_1.getDc)(call.stream_dc_id) : undefined;
        const streams = await this.#c.invoke({ _: "phone.getGroupCallStreamChannels", call: await this.#getInputGroupCall(id) }, { dc, type: "download" });
        return streams.channels.map(_3_types_js_1.constructLiveStreamChannel);
    }
    async downloadLiveStreamSegment(id, channel, scale, timestamp, params) {
        this.#c.storage.assertUser("downloadLiveStreamSegment");
        const call = await this.#getCall(id);
        if (!(_2_tl_js_1.Api.is("groupCall", call)) || !call.rtmp_stream) {
            throw new _0_errors_js_1.InputError("Not a live stream.");
        }
        const quality = params?.quality ?? "low";
        const location = {
            _: "inputGroupCallStream",
            call: { ...call, _: "inputGroupCall" },
            scale,
            time_ms: BigInt(timestamp),
            video_channel: channel,
            video_quality: quality === "low" ? 0 : quality === "medium" ? 1 : quality === "high" ? 2 : (() => {
                throw new _0_errors_js_1.InputError("Got invalid quality.");
            })(),
        };
        const chunks = new Array();
        for await (const chunk of this.#c.fileManager.downloadInner(location, call.stream_dc_id ?? (0, _0_deps_js_1.unreachable)(), params)) {
            chunks.push(chunk);
        }
        return (0, _0_deps_js_1.concat)(chunks);
    }
}
exports.VideoChatManager = VideoChatManager;
