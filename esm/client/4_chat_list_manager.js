import { unreachable } from "../0_deps.js";
import { InputError } from "../0_errors.js";
import { Api } from "../2_tl.js";
import { constructChat, constructChatListItem4, constructChatMember, constructChatP, constructChatSettings } from "../3_types.js";
import { canBeInputChannel, canBeInputUser, getChatListId, getLimit, toInputChannel, toInputUser } from "./0_utilities.js";
const chatListManagerUpdates = [
    "updateChannel",
    "updateChat",
    "updateUser",
    "updateUserName",
];
export class ChatListManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    async #handleUpdateChannel(update) {
        const peer = { ...update, _: "peerChannel" };
        const chatId = Api.peerToChatId(peer);
        await this.#c.messageStorage.setFullChat(chatId, null);
    }
    async #handleUpdateChat(update) {
        const peer = { ...update, _: "peerChat" };
        const chatId = Api.peerToChatId(peer);
        await this.#c.messageStorage.setFullChat(chatId, null);
    }
    async #handleUpdateUser(update) {
        const peer = { ...update, _: "peerUser" };
        const chatId = Api.peerToChatId(peer);
        await this.#c.messageStorage.setFullChat(chatId, null);
    }
    async getChats(from = "main", after, limit = 100) {
        this.#c.storage.assertUser("getChats");
        if (limit <= 0 || limit > 100) {
            limit = 100;
        }
        const listId = getChatListId(from);
        const dialogs = await this.#c.invoke({ _: "messages.getDialogs", limit, offset_id: after?.lastMessage?.id ?? 0, offset_date: after?.lastMessage?.date ?? 0, offset_peer: after ? await this.#c.getInputPeer(after.chat.id) : { _: "inputPeerEmpty" }, hash: 0n, folder_id: listId });
        if (!(Api.is("messages.dialogs", dialogs)) && !(Api.is("messages.dialogsSlice", dialogs))) {
            unreachable();
        }
        const chats = new Array();
        for (const dialog of dialogs.dialogs) {
            const chat = await constructChatListItem4(dialog, dialogs, [], this.#c.getPeer, this.#c.messageManager.getMessage.bind(this.#c.messageManager), this.#c.fileManager.getStickerSetName.bind(this.#c.fileManager));
            chats.push(chat);
        }
        return chats;
    }
    canHandleUpdate(update) {
        return Api.isOneOf(chatListManagerUpdates, update);
    }
    async handleUpdate(update) {
        if (Api.is("updateChannel", update)) {
            await this.#handleUpdateChannel(update);
        }
        else if (Api.is("updateChat", update)) {
            await this.#handleUpdateChat(update);
        }
        else if (Api.is("updateUser", update) || Api.is("updateUserName", update)) {
            await this.#handleUpdateUser(update);
        }
        else {
            unreachable();
        }
        return null;
    }
    async #getFullChat(chatId) {
        const inputPeer = await this.#c.getInputPeer(chatId);
        const chatId_ = await this.#c.getInputPeerChatId(inputPeer);
        let fullChat = await this.#c.messageStorage.getFullChat(chatId_);
        if (fullChat !== null) {
            return fullChat;
        }
        if (canBeInputUser(inputPeer)) {
            fullChat = (await this.#c.invoke({ _: "users.getFullUser", id: toInputUser(inputPeer) })).full_user;
        }
        else if (Api.is("inputPeerChat", inputPeer)) {
            fullChat = (await this.#c.invoke({ ...inputPeer, _: "messages.getFullChat" })).full_chat;
        }
        else if (canBeInputChannel(inputPeer)) {
            fullChat = (await this.#c.invoke({ _: "channels.getFullChannel", channel: toInputChannel(inputPeer) })).full_chat;
        }
        await this.#c.messageStorage.setFullChat(chatId_, fullChat);
        if (fullChat !== null && "call" in fullChat && Api.is("inputGroupCall", fullChat.call)) {
            await this.#c.messageStorage.setGroupCallAccessHash(fullChat.call.id, fullChat.call.access_hash);
        }
        return fullChat;
    }
    async getChat(chatId) {
        const fullChat = await this.#getFullChat(chatId);
        if (fullChat === null) {
            throw new InputError("Chat not found.");
        }
        return constructChat(fullChat, this.#c.getPeer);
    }
    async getChatAdministrators(chatId) {
        const peer = await this.#c.getInputPeer(chatId);
        if (canBeInputChannel(peer)) {
            const channel = toInputChannel(peer);
            const participants = await this.#c.invoke({ _: "channels.getParticipants", channel, filter: { _: "channelParticipantsAdmins" }, offset: 0, limit: 100, hash: 0n });
            if (Api.is("channels.channelParticipantsNotModified", participants)) {
                unreachable();
            }
            const chatMembers = new Array();
            for (const p of participants.participants) {
                const peer = this.#c.getPeer("peer" in p ? p.peer : { _: "peerUser", user_id: p.user_id });
                if (!peer) {
                    unreachable();
                }
                chatMembers.push(constructChatMember(peer[0], p, this.#c.getPeer));
            }
            return chatMembers;
        }
        else if (Api.is("inputPeerChat", peer)) {
            const fullChat = await this.#getFullChat(chatId);
            if (!fullChat || !("participants" in fullChat) || !Api.is("chatParticipants", fullChat.participants)) {
                unreachable();
            }
            const chatMembers = new Array();
            for (const p of fullChat.participants.participants) {
                const peer = this.#c.getPeer({ _: "peerUser", user_id: p.user_id });
                if (!peer) {
                    unreachable();
                }
                chatMembers.push(constructChatMember(peer[0], p, this.#c.getPeer));
            }
            return chatMembers;
        }
        else {
            unreachable();
        }
    }
    async getChatMember(chatId, userId) {
        const peer = await this.#c.getInputPeer(chatId);
        if (canBeInputChannel(peer)) {
            const { participant } = await this.#c.invoke({ _: "channels.getParticipant", channel: toInputChannel(peer), participant: await this.#c.getInputPeer(userId) });
            const memberPeer = this.#c.getPeer("peer" in participant ? participant.peer : { _: "peerUser", user_id: participant.user_id });
            if (!memberPeer) {
                unreachable();
            }
            return constructChatMember(memberPeer[0], participant, this.#c.getPeer);
        }
        else if (Api.is("inputPeerChat", peer)) {
            const user = await this.#c.getInputUser(userId);
            const userId_ = BigInt(await this.#c.getInputPeerChatId(user));
            const fullChat = await this.#c.invoke({ ...peer, _: "messages.getFullChat" }).then((v) => Api.as("chatFull", v.full_chat));
            const participant = Api.as("chatParticipants", fullChat.participants).participants.find((v) => v.user_id === userId_);
            const memberPeer = this.#c.getPeer({ _: "peerUser", user_id: participant.user_id });
            if (!memberPeer) {
                unreachable();
            }
            return constructChatMember(memberPeer[0], participant, this.#c.getPeer);
        }
        else {
            throw new InputError("Expected a channel, supergroup, or group ID. Got a user ID instead.");
        }
    }
    async getChatMembers(chatId, params) {
        const peer = await this.#c.getInputPeer(chatId);
        if (canBeInputChannel(peer)) {
            const channel = toInputChannel(peer);
            const participants = await this.#c.invoke({ _: "channels.getParticipants", channel, filter: { _: "channelParticipantsRecent" }, offset: params?.offset ?? 0, limit: getLimit(params?.limit), hash: 0n });
            if (Api.is("channels.channelParticipantsNotModified", participants)) {
                unreachable();
            }
            const chatMembers = new Array();
            for (const p of participants.participants) {
                const peer = this.#c.getPeer("peer" in p ? p.peer : { _: "peerUser", user_id: p.user_id });
                if (!peer) {
                    unreachable();
                }
                chatMembers.push(constructChatMember(peer[0], p, this.#c.getPeer));
            }
            return chatMembers;
        }
        else if (Api.is("inputPeerChat", peer)) {
            const fullChat = await this.#getFullChat(chatId);
            if (!fullChat || !("participants" in fullChat) || !Api.is("chatParticipants", fullChat.participants)) {
                unreachable();
            }
            const chatMembers = new Array();
            for (const p of fullChat.participants.participants) {
                const peer = this.#c.getPeer({ _: "peerUser", user_id: p.user_id });
                if (!peer) {
                    unreachable();
                }
                chatMembers.push(constructChatMember(peer[0], p, this.#c.getPeer));
            }
            return chatMembers;
        }
        else {
            unreachable();
        }
    }
    #checkChatTitle(title) {
        title = title.trim();
        if (!title) {
            throw new InputError("Title cannot be empty.");
        }
        return title;
    }
    async createGroup(title, params) {
        this.#c.storage.assertUser("createGroup");
        title = this.#checkChatTitle(title);
        const { updates } = await this.#c.invoke({
            _: "messages.createChat",
            title,
            users: await Promise.all((params?.users ?? []).map((v) => this.#c.getInputUser(v))),
            ttl_period: params?.messageTtl || undefined,
        });
        if (!("chats" in updates) || updates.chats.length < 1) {
            unreachable();
        }
        const chat = updates.chats[0];
        if (chat._ !== "chat") {
            unreachable();
        }
        return constructChatP(chat);
    }
    async #createChannel(type, title, params) {
        title = this.#checkChatTitle(title);
        const updates = await this.#c.invoke({
            _: "channels.createChannel",
            broadcast: type === "channel" ? true : undefined,
            megagroup: type === "supergroup" ? true : undefined,
            forum: params && ("forum" in params) && params.forum ? true : undefined,
            title,
            about: params?.description || "",
            ttl_period: params?.messageTtl || undefined,
        });
        if (!("chats" in updates) || updates.chats.length < 1) {
            unreachable();
        }
        const chat = updates.chats[0];
        if (chat._ !== "channel") {
            unreachable();
        }
        return constructChatP(chat);
    }
    async createSupergroup(title, params) {
        this.#c.storage.assertUser("createSupergroup");
        return (await this.#createChannel("supergroup", title, params));
    }
    async createChannel(title, params) {
        this.#c.storage.assertUser("createChannel");
        return (await this.#createChannel("channel", title, params));
    }
    async setMessageTtl(chatId, messageTtl) {
        this.#c.storage.assertUser("setMessageTtl");
        const peer = await this.#c.getInputPeer(chatId);
        const period = messageTtl;
        await this.#c.invoke({ _: "messages.setHistoryTTL", peer, period });
    }
    async #moveChatsToFolder(chatIds, folderId) {
        const peers = await Promise.all(chatIds.map((v) => this.#c.getInputPeer(v)));
        const inputFolderPeers = peers.map((v) => ({ _: "inputFolderPeer", peer: v, folder_id: folderId }));
        await this.#c.invoke({ _: "folders.editPeerFolders", folder_peers: inputFolderPeers });
    }
    async archiveChats(chatIds) {
        this.#c.storage.assertUser("archiveChats");
        await this.#moveChatsToFolder(chatIds, 1);
    }
    async archiveChat(chatId) {
        this.#c.storage.assertUser("archiveChat");
        await this.archiveChats([chatId]);
    }
    async unarchiveChats(chatIds) {
        this.#c.storage.assertUser("unarchiveChats");
        await this.#moveChatsToFolder(chatIds, 0);
    }
    async unarchiveChat(chatId) {
        this.#c.storage.assertUser("unarchiveChat");
        await this.unarchiveChats([chatId]);
    }
    async getCommonChats(userId, params) {
        this.#c.storage.assertUser("getCommonChats");
        const max_id = params?.fromChatId ? await this.#c.getInputPeerChatId(await this.#c.getInputPeer(params.fromChatId)) : 0;
        if (max_id < 0) {
            throw new InputError("fromChatId must be a chat identifier.");
        }
        const user_id = await this.#c.getInputUser(userId);
        const limit = getLimit(params?.limit);
        const result = await this.#c.invoke({ _: "messages.getCommonChats", user_id, max_id: Api.chatIdToPeerId(max_id), limit });
        const chats = new Array();
        for (const chat of result.chats) {
            if (!Api.is("chatEmpty", chat)) {
                chats.push(constructChatP(chat));
            }
        }
        return chats;
    }
    async getChatSettings(chatId) {
        this.#c.storage.assertUser("getChatSettings");
        const peer = await this.#c.getInputPeer(chatId);
        const settings = await this.#c.invoke({ _: "messages.getPeerSettings", peer });
        return constructChatSettings(settings);
    }
    async #toggleBusinessBotsPaused(chatId, paused) {
        const peer = await this.#c.getInputPeer(chatId);
        if (!canBeInputUser(peer)) {
            throw new InputError("A private chat was expected.");
        }
        await this.#c.invoke({ _: "account.toggleConnectedBotPaused", peer, paused });
    }
    async disableBusinessBots(chatId) {
        this.#c.storage.assertUser("disableBusinessBots");
        await this.#toggleBusinessBotsPaused(chatId, true);
    }
    async enableBusinessBots(chatId) {
        this.#c.storage.assertUser("enableBusinessBots");
        await this.#toggleBusinessBotsPaused(chatId, false);
    }
}
