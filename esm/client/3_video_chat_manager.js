import { concat, unreachable } from "../0_deps.js";
import { InputError } from "../0_errors.js";
import { getRandomId } from "../1_utilities.js";
import { Api } from "../2_tl.js";
import { getDc } from "../3_transport.js";
import { constructLiveStreamChannel, constructVideoChat } from "../3_types.js";
import { peerToChatId } from "../tl/2_telegram.js";
import { canBeInputUser } from "./0_utilities.js";
const videoChatManagerUpdates = [
    "updateGroupCall",
];
export class VideoChatManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    async #createGroupCall(chatId, title, liveStream, scheduleDate) {
        const peer = await this.#c.getInputPeer(chatId);
        if (canBeInputUser(peer)) {
            throw new InputError("Video chats are only available for groups and channels.");
        }
        const { updates } = await this.#c.invoke({ _: "phone.createGroupCall", peer, random_id: getRandomId(true), title, rtmp_stream: liveStream, schedule_date: scheduleDate }).then((v) => Api.as("updates", v));
        const updateGroupCall = updates
            .find((v) => Api.is("updateGroupCall", v));
        if (!updateGroupCall) {
            unreachable();
        }
        return constructVideoChat(updateGroupCall.call);
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
            throw new InputError("Video chat not found.");
        }
        return { _: "inputGroupCall", id, access_hash: accessHash };
    }
    async joinVideoChat(id, params, params_) {
        this.#c.storage.assertUser("joinVideoChat");
        const call = await this.#getInputGroupCall(id);
        const { updates } = await this.#c.invoke({ _: "phone.joinGroupCall", call, join_as: params_?.joinAs ? await this.#c.getInputPeer(params_.joinAs) : { _: "inputPeerSelf" }, params: ({ _: "dataJSON", data: params }), invite_hash: params_?.inviteHash, muted: params_?.audio ? undefined : true, video_stopped: params_?.video ? undefined : true }).then((v) => Api.as("updates", v));
        const updateGroupCall = updates
            .find((v) => Api.is("updateGroupCallConnection", v));
        if (!updateGroupCall)
            unreachable();
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
                    ssrc: getRandomId(true),
                    "ssrc-groups": [],
                    ufrag: "",
                }),
            }),
        }).then((v) => Api.as("updates", v));
        const updateGroupCall = updates
            .find((v) => Api.is("updateGroupCallConnection", v));
        if (!updateGroupCall)
            unreachable();
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
        return constructVideoChat(await this.#getCall(id));
    }
    canHandleUpdate(update) {
        return Api.isOneOf(videoChatManagerUpdates, update);
    }
    async handleUpdate(update) {
        if (!update.peer) {
            return null;
        }
        const chatId = peerToChatId(update.peer);
        const fullChat = await this.#c.messageStorage.getFullChat(chatId).then((v) => v === null ? this.#c.messageStorage.getFullChat(chatId) : v);
        let updateFullChat = false;
        if (Api.is("groupCallDiscarded", update.call)) {
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
                if (!("call" in fullChat) || !fullChat.call || !Api.is("inputGroupCall", fullChat.call) || fullChat.call.id !== update.call.id) {
                    fullChat.call = { ...update.call, _: "inputGroupCall" };
                    updateFullChat = true;
                }
            }
        }
        if (updateFullChat) {
            await this.#c.messageStorage.setFullChat(chatId, fullChat);
        }
        return { videoChat: constructVideoChat(update.call) };
    }
    async getLiveStreamChannels(id) {
        this.#c.storage.assertUser("getLiveStreamChannels");
        const call = await this.#getCall(id);
        if (!(Api.is("groupCall", call)) || !call.rtmp_stream) {
            throw new InputError("Not a live stream.");
        }
        const dc = call.stream_dc_id ? getDc(call.stream_dc_id) : undefined;
        const streams = await this.#c.invoke({ _: "phone.getGroupCallStreamChannels", call: await this.#getInputGroupCall(id) }, { dc, type: "download" });
        return streams.channels.map(constructLiveStreamChannel);
    }
    async downloadLiveStreamSegment(id, channel, scale, timestamp, params) {
        this.#c.storage.assertUser("downloadLiveStreamSegment");
        const call = await this.#getCall(id);
        if (!(Api.is("groupCall", call)) || !call.rtmp_stream) {
            throw new InputError("Not a live stream.");
        }
        const quality = params?.quality ?? "low";
        const location = {
            _: "inputGroupCallStream",
            call: { ...call, _: "inputGroupCall" },
            scale,
            time_ms: BigInt(timestamp),
            video_channel: channel,
            video_quality: quality === "low" ? 0 : quality === "medium" ? 1 : quality === "high" ? 2 : (() => {
                throw new InputError("Got invalid quality.");
            })(),
        };
        const chunks = new Array();
        for await (const chunk of this.#c.fileManager.downloadInner(location, call.stream_dc_id ?? unreachable(), params)) {
            chunks.push(chunk);
        }
        return concat(chunks);
    }
}
