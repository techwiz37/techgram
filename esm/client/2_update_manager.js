var _a;
import { delay, SECOND, unreachable } from "../0_deps.js";
import { InputError } from "../0_errors.js";
import { getLogger, Mutex, Queue, ZERO_CHANNEL_ID } from "../1_utilities.js";
import { Api } from "../2_tl.js";
import { PersistentTimestampInvalid } from "../3_errors.js";
import { CHANNEL_DIFFERENCE_LIMIT_BOT, CHANNEL_DIFFERENCE_LIMIT_USER } from "../4_constants.js";
import { peerToChatId } from "../tl/2_telegram.js";
export class UpdateManager {
    static QTS_COUNT = 1;
    static MAIN_BOX_ID = 0n;
    #c;
    #updateState;
    #updateHandler;
    #LrecoverUpdateGap;
    #LrecoverChannelUpdateGap;
    #L$handleUpdate;
    #L$processUpdates;
    #LfetchState;
    #LopenChat;
    constructor(c) {
        this.#c = c;
        const L = getLogger("UpdateManager").client(c.id);
        this.#LrecoverUpdateGap = L.branch("recoverUpdateGap");
        this.#LrecoverChannelUpdateGap = L.branch("recoverChannelUpdateGap");
        this.#L$handleUpdate = L.branch("#handleUpdate");
        this.#L$processUpdates = L.branch("#processUpdates");
        this.#LfetchState = L.branch("fetchState");
        this.#LopenChat = L.branch("openChat");
    }
    static isPtsUpdate(v) {
        return Api.isOneOf(["updateNewMessage", "updateDeleteMessages", "updateReadHistoryInbox", "updateReadHistoryOutbox", "updatePinnedChannelMessages", "updatePinnedMessages", "updateFolderPeers", "updateChannelWebPage", "updateEditMessage", "updateReadMessagesContents", "updateWebPage"], v);
    }
    static isQtsUpdate(v) {
        return Api.isOneOf(["updateNewEncryptedMessage", "updateMessagePollVote", "updateBotStopped", "updateChatParticipant", "updateChannelParticipant", "updateBotChatInviteRequester", "updateBotChatBoost", "updateBotMessageReaction", "updateBotMessageReactions", "updateBotBusinessConnect", "updateBotNewBusinessMessage", "updateBotEditBusinessMessage", "updateBotDeleteBusinessMessage"], v);
    }
    static isChannelPtsUpdate(v) {
        return Api.isOneOf([
            "updateNewChannelMessage",
            "updateEditChannelMessage",
            "updateDeleteChannelMessages",
            "updateChannelTooLong",
        ], v);
    }
    #defaultDropPendingUpdates = null;
    #mustDropPendingUpdates() {
        if (typeof this.#c.dropPendingUpdates === "boolean") {
            return this.#c.dropPendingUpdates;
        }
        if (this.#defaultDropPendingUpdates === null) {
            this.#defaultDropPendingUpdates = this.#c.storage.isBot;
        }
        return this.#defaultDropPendingUpdates;
    }
    #state = null;
    async #getState() {
        if (this.#mustDropPendingUpdates()) {
            return this.#state ?? null;
        }
        if (this.#state !== null) {
            return this.#state;
        }
        const state = await this.#c.storage.getState();
        return this.#state = state;
    }
    async #setState(state) {
        this.#state = state;
        if (!this.#mustDropPendingUpdates()) {
            await this.#c.storage.setState(state);
        }
    }
    async fetchState(source) {
        let state = await this.#c.invoke({ _: "updates.getState" });
        const difference = await this.#c.invoke({ ...state, _: "updates.getDifference" });
        if (Api.is("updates.difference", difference)) {
            state = difference.state;
        }
        else if (Api.is("updates.differenceSlice", difference)) {
            state = difference.intermediate_state;
        }
        this.#updateState = state;
        this.#LfetchState.debug(`state fetched [${source}]`);
        if (this.#mustDropPendingUpdates()) {
            await this.#setState(state);
        }
    }
    #extractMessages(context) {
        const messages = new Array();
        if (Array.isArray(context)) {
            for (const item of context) {
                messages.push(...this.#extractMessages(item));
            }
        }
        else if (Api.isOneOf(["updates", "updatesCombined"], context)) {
            messages.push(...this.#extractMessages(context.updates));
        }
        else if (Api.isOneOf(["updates.difference", "updates.differenceSlice", "updates.channelDifference"], context)) {
            for (const message of context.new_messages) {
                if (Api.is("message", message)) {
                    messages.push(message);
                }
            }
            messages.push(...this.#extractMessages(context.other_updates));
        }
        else if (Api.isOneOf(["updateNewMessage", "updateNewChannelMessage", "updateEditMessage", "updateEditChannelMessage", "updateBotNewBusinessMessage", "updateBotNewBusinessMessage"], context)) {
            if (Api.is("message", context.message)) {
                messages.push(context.message);
            }
        }
        else if (Api.is("message", context)) {
            messages.push(context);
        }
        else if (context !== null && typeof context === "object" && "messages" in context && Array.isArray(context.messages)) {
            for (const message of context.messages) {
                if (Api.is("message", message)) {
                    messages.push(message);
                }
            }
        }
        return messages;
    }
    #extractMinPeerReferences(context) {
        const minPeerReferences = new Array();
        const messages = this.#extractMessages(context);
        for (const message of messages) {
            if (!message.from_id) {
                continue;
            }
            minPeerReferences.push({ chatId: Api.peerToChatId(message.peer_id), senderId: Api.peerToChatId(message.from_id), messageId: message.id });
        }
        return minPeerReferences;
    }
    processChats(chats, _context) {
        for (const chat of chats) {
            this.processChat(chat);
        }
    }
    processChat(chat) {
        if (Api.is("chatEmpty", chat)) {
            return;
        }
        if (Api.is("channel", chat) && chat.min) {
            return;
        }
        this.#c.messageStorage.setPeer(chat);
        if ("username" in chat && chat.username) {
            this.#c.messageStorage.usernames.set([chat.username], [Api.peerToChatId(chat), new Date()]);
        }
        if ("usernames" in chat && chat.usernames) {
            const value = [Api.peerToChatId(chat), new Date()];
            for (const username of chat.usernames) {
                this.#c.messageStorage.usernames.set([username.username], value);
            }
        }
    }
    async processResult(result) {
        if (Array.isArray(result)) {
            if (Api.isOfEnum("User", result[0])) {
                for (const user of result) {
                    this.processUser(user);
                }
            }
        }
        else if (result !== null && typeof result === "object") {
            if ("chats" in result) {
                let valid = true;
                for (const chat of result.chats) {
                    if (!Api.isOfEnum("Chat", chat)) {
                        valid = false;
                        break;
                    }
                }
                if (valid) {
                    this.processChats(result.chats, result);
                }
            }
            if ("users" in result && Array.isArray(result.users)) {
                let valid = true;
                for (const user of result.users) {
                    if (!Api.isOfEnum("User", user)) {
                        valid = false;
                        break;
                    }
                }
                if (valid) {
                    this.processUsers(result.users, result);
                }
            }
            if ("messages" in result && Array.isArray(result.messages)) {
                for (const message of result.messages) {
                    if (Api.is("message", message) || Api.is("messageService", message)) {
                        await this.#c.messageStorage.setMessage(Api.peerToChatId(message.peer_id), message.id, message);
                    }
                }
            }
        }
        if (Api.is("messages.messages", result)) {
            for (const message of result.messages) {
                if (Api.is("message", message) || Api.is("messageService", message)) {
                    await this.#c.messageStorage.setMessage(Api.peerToChatId(message.peer_id), message.id, message);
                }
            }
        }
    }
    processUsers(users, _context) {
        for (const user of users) {
            this.processUser(user);
        }
    }
    processUser(user) {
        if (!Api.is("user", user)) {
            return;
        }
        if (user.min) {
            return;
        }
        this.#c.messageStorage.setPeer(user);
        if (user.username) {
            this.#c.messageStorage.usernames.set([user.username], [Api.peerToChatId(user), new Date()]);
        }
        if (user.usernames) {
            const value = [Api.peerToChatId(user), new Date()];
            for (const username of user.usernames) {
                this.#c.messageStorage.usernames.set([username.username], value);
            }
        }
    }
    #handleUpdateQueues = new Map();
    getHandleUpdateQueue(boxId) {
        let queue = this.#handleUpdateQueues.get(boxId);
        if (queue !== undefined) {
            return queue;
        }
        else {
            queue = new Queue(`handleUpdate-${boxId}`, true);
            return queue;
        }
    }
    #nonFirst = new Set();
    async #getChannelPtsWithDropPendingUpdatesCheck(channelId) {
        if (!(this.#mustDropPendingUpdates())) {
            return await this.#c.storage.channelPts.get([channelId]);
        }
        const first = !this.#nonFirst.has(channelId);
        if (first) {
            this.#nonFirst.add(channelId);
            return null;
        }
        else {
            return await this.#c.storage.channelPts.get([channelId]);
        }
    }
    async #checkGap(pts, ptsCount) {
        const localState = await this.#getLocalState();
        if (localState.pts + ptsCount < pts) {
            await this.recoverUpdateGap("processUpdates[pts]");
        }
    }
    async #checkGapQts(qts) {
        const localState = await this.#getLocalState();
        if (localState.qts + _a.QTS_COUNT < qts) {
            await this.recoverUpdateGap("processUpdates[qts]");
        }
    }
    async #checkChannelGap(channelId, pts, ptsCount) {
        let localPts = await this.#getChannelPtsWithDropPendingUpdatesCheck(channelId);
        if (!localPts) {
            localPts = pts - ptsCount;
        }
        if (localPts + ptsCount < pts) {
            await this.#recoverChannelUpdateGap(channelId, "processUpdates");
        }
    }
    #channelUpdateQueues = new Map();
    async #processChannelPtsUpdateInner(update, checkGap) {
        const channelId = Api.is("updateNewChannelMessage", update) || Api.is("updateEditChannelMessage", update) ? Api.as("peerChannel", update.message.peer_id).channel_id : update.channel_id;
        if (Api.is("updateChannelTooLong", update)) {
            if (update.pts !== undefined) {
                this.#c.storage.channelPts.set([channelId], update.pts);
            }
            await this.#recoverChannelUpdateGap(channelId, "updateChannelTooLong");
            return;
        }
        if (update.pts !== 0) {
            const ptsCount = update.pts_count;
            if (checkGap) {
                await this.#checkChannelGap(channelId, update.pts, ptsCount);
            }
            let currentPts = await this.#getChannelPtsWithDropPendingUpdatesCheck(channelId);
            currentPts ??= update.pts - ptsCount;
            if (currentPts + ptsCount > update.pts) {
                return;
            }
        }
        if (this.#c.guaranteeUpdateDelivery) {
            await this.#c.storage.setUpdate(channelId, update);
        }
        if (update.pts !== 0) {
            this.#c.storage.channelPts.set([channelId], update.pts);
        }
        this.#queueUpdate(update, channelId, true);
    }
    #queueUpdate(update, boxId, pts) {
        this.getHandleUpdateQueue(boxId).add(async () => {
            if (this.#c.guaranteeUpdateDelivery && pts) {
                await this.#handleStoredUpdates(boxId);
            }
            else {
                await (await this.#handleUpdate(update))();
            }
        });
    }
    #processChannelPtsUpdate(update, checkGap) {
        const channelId = Api.is("updateNewChannelMessage", update) || Api.is("updateEditChannelMessage", update) ? Api.as("peerChannel", update.message.peer_id).channel_id : update.channel_id;
        let queue = this.#channelUpdateQueues.get(channelId);
        if (queue === undefined) {
            queue = new Queue(`channelUpdates-${channelId}`);
            this.#channelUpdateQueues.set(channelId, queue);
        }
        queue.add(async () => {
            await this.#processChannelPtsUpdateInner(update, checkGap);
        });
    }
    async #processPtsUpdateInner(update, checkGap) {
        if (update.pts !== 0 && checkGap) {
            await this.#checkGap(update.pts, update.pts_count);
            if (await this.#needsGetDifference(update)) {
                await this.recoverUpdateGap("needsGetDifference");
            }
        }
        const localState = await this.#getLocalState();
        if (update.pts !== 0 && localState.pts + update.pts_count > update.pts) {
            return;
        }
        if (this.#c.guaranteeUpdateDelivery) {
            await this.#c.storage.setUpdate(_a.MAIN_BOX_ID, update);
        }
        if (update.pts !== 0) {
            await this.#setUpdatePts(update.pts);
        }
        this.#queueUpdate(update, 1n, false);
    }
    #ptsUpdateQueue = new Queue("ptsUpdate");
    #processPtsUpdate(update, checkGap) {
        this.#ptsUpdateQueue.add(async () => {
            await this.#processPtsUpdateInner(update, checkGap);
        });
    }
    async #processQtsUpdateInner(update, checkGap) {
        const localState = await this.#getLocalState();
        if (update.qts !== 0) {
            if (checkGap) {
                await this.#checkGapQts(update.qts);
            }
            if (localState.qts + _a.QTS_COUNT > update.qts) {
                return;
            }
        }
        if (this.#c.guaranteeUpdateDelivery) {
            await this.#c.storage.setUpdate(_a.MAIN_BOX_ID, update);
        }
        if (update.qts !== 0) {
            await this.#setUpdateQts(update.qts);
        }
        this.#queueUpdate(update, 0n, true);
    }
    #qtsUpdateQueue = new Queue("qtsUpdate");
    #processQtsUpdate(update, checkGap) {
        this.#qtsUpdateQueue.add(async () => {
            await this.#processQtsUpdateInner(update, checkGap);
        });
    }
    #processUpdatesQueue = new Queue("UpdateManager/processUpdates");
    processUpdates(updates, checkGap, call = null, callback) {
        this.#processUpdatesQueue.add(() => this.#processUpdates(updates, checkGap, call).finally(callback));
    }
    async #processUpdates(updates_, checkGap, call = null) {
        let updates;
        if (Api.is("updatesCombined", updates_) || Api.is("updates", updates_)) {
            updates = updates_.updates;
            const seq = updates_.seq;
            const seqStart = "seq_start" in updates_ ? updates_.seq_start : updates_.seq;
            if (checkGap) {
                if (seqStart === 0) {
                    checkGap = false;
                    this.#L$processUpdates.debug("seqStart=0");
                }
                else {
                    const localState = await this.#getLocalState();
                    const localSeq = localState.seq;
                    if (localSeq + 1 === seqStart) {
                        localState.seq = seq;
                        localState.date = updates_.date;
                        await this.#setUpdateStateDate(updates_.date);
                        await this.#setState(localState);
                    }
                    else if (localSeq + 1 > seqStart) {
                        this.#L$processUpdates.debug("localSeq + 1 > seqStart");
                        return;
                    }
                    else if (localSeq + 1 < seqStart) {
                        await this.recoverUpdateGap("localSeq + 1 < seqStart");
                    }
                }
            }
        }
        else if (Api.is("updateShort", updates_)) {
            updates = [updates_.update];
        }
        else if (Api.is("updateShortMessage", updates_)) {
            updates = [
                {
                    _: "updateNewMessage",
                    message: ({
                        _: "message",
                        out: updates_.out,
                        mentioned: updates_.mentioned,
                        media_unread: updates_.media_unread,
                        silent: updates_.silent,
                        id: updates_.id,
                        from_id: updates_.out ? ({ _: "peerUser", user_id: BigInt(await this.#c.getSelfId()) }) : ({ _: "peerUser", user_id: updates_.user_id }),
                        peer_id: ({ _: "peerUser", user_id: updates_.user_id }),
                        message: updates_.message,
                        date: updates_.date,
                        fwd_from: updates_.fwd_from,
                        via_bot_id: updates_.via_bot_id,
                        reply_to: updates_.reply_to,
                        entities: updates_.entities,
                        ttl_period: updates_.ttl_period,
                    }),
                    pts: updates_.pts,
                    pts_count: updates_.pts_count,
                },
            ];
        }
        else if (Api.is("updateShortChatMessage", updates_)) {
            updates = [
                {
                    _: "updateNewMessage",
                    message: ({
                        _: "message",
                        mentioned: updates_.mentioned,
                        media_unread: updates_.media_unread,
                        silent: updates_.silent,
                        id: updates_.id,
                        from_id: { _: "peerUser", user_id: updates_.from_id },
                        peer_id: { _: "peerChat", chat_id: updates_.chat_id },
                        fwd_from: updates_.fwd_from,
                        via_bot_id: updates_.via_bot_id,
                        reply_to: updates_.reply_to,
                        date: updates_.date,
                        message: updates_.message,
                        entities: updates_.entities,
                        ttl_period: updates_.ttl_period,
                    }),
                    pts: updates_.pts,
                    pts_count: updates_.pts_count,
                },
            ];
        }
        else if (Api.is("updateShortSentMessage", updates_)) {
            if (!Api.is("messages.sendMessage", call)) {
                unreachable();
            }
            updates = [{
                    _: "updateNewMessage",
                    message: ({
                        _: "message",
                        out: updates_.out,
                        silent: call.silent,
                        id: updates_.id,
                        from_id: { _: "peerUser", user_id: BigInt(await this.#c.getSelfId()) },
                        peer_id: Api.inputPeerToPeer(call.peer),
                        message: call.message,
                        media: updates_.media,
                        date: updates_.date,
                        entities: updates_.entities,
                        ttl_period: updates_.ttl_period,
                    }),
                    pts: updates_.pts,
                    pts_count: updates_.pts_count,
                }];
        }
        else if (Api.is("updatesTooLong", updates_)) {
            await this.recoverUpdateGap("updatesTooLong");
            return;
        }
        else if (Api.isOfEnum("Update", updates_)) {
            updates = [updates_];
        }
        else {
            unreachable();
        }
        if (Api.is("updates", updates_) || Api.is("updatesCombined", updates_)) {
            this.processChats(updates_.chats, updates_);
            this.processUsers(updates_.users, updates_);
            this.#setUpdateStateDate(updates_.date);
        }
        else if (Api.isOneOf([
            "updateShort",
            "updateShortMessage",
            "updateShortChatMessage",
            "updateShortSentMessage",
        ], updates_)) {
            await this.#setUpdateStateDate(updates_.date);
        }
        for (const update of updates) {
            if (Api.is("updatePtsChanged", update)) {
                await this.fetchState("updatePtsChanged");
                if (this.#updateState) {
                    await this.#setState(this.#updateState);
                }
                else {
                    unreachable();
                }
            }
            else if (_a.isPtsUpdate(update)) {
                this.#processPtsUpdate(update, checkGap);
            }
            else if (_a.isChannelPtsUpdate(update)) {
                this.#processChannelPtsUpdate(update, checkGap);
            }
            else if (_a.isQtsUpdate(update)) {
                this.#processQtsUpdate(update, checkGap);
            }
            else {
                this.#queueUpdate(update, 0n, false);
            }
        }
    }
    async #setUpdateStateDate(date) {
        const localState = await this.#getLocalState();
        localState.date = date;
        await this.#setState(localState);
    }
    async #setUpdatePts(pts) {
        const localState = await this.#getLocalState();
        localState.pts = pts;
        await this.#setState(localState);
    }
    async #setUpdateQts(qts) {
        const localState = await this.#getLocalState();
        localState.qts = qts;
        await this.#setState(localState);
    }
    async #getLocalState() {
        let localState = await this.#getState();
        if (!localState) {
            if (this.#updateState) {
                localState = this.#updateState;
                await this.#setState(localState);
            }
            else {
                await this.fetchState("getLocalState");
                if (this.#updateState) {
                    localState = this.#updateState;
                    await this.#setState(localState);
                }
                else {
                    unreachable();
                }
            }
        }
        return localState;
    }
    #recoveringUpdateGap = false;
    #recoverUpdateGapMutex = new Mutex();
    async recoverUpdateGap(source) {
        const wasRecoveringUpdateGap = this.#recoveringUpdateGap;
        const unlock = await this.#recoverUpdateGapMutex.lock();
        if (wasRecoveringUpdateGap) {
            this.#LrecoverUpdateGap.debug(`update gap was just recovered [${source}]`);
            unlock();
            return;
        }
        this.#recoveringUpdateGap = true;
        this.#LrecoverUpdateGap.debug(`recovering from update gap [${source}]`);
        this.#c.setConnectionState("updating");
        try {
            let retryIn = 5;
            let state = await this.#getLocalState();
            while (true) {
                let difference;
                try {
                    difference = await this.#c.invoke({ _: "updates.getDifference", pts: state.pts, date: state.date, qts: state.qts ?? 0 });
                }
                catch (err) {
                    if (err instanceof PersistentTimestampInvalid) {
                        await delay(retryIn * SECOND);
                        ++retryIn;
                        if (retryIn > 60) {
                            retryIn = 60;
                        }
                        continue;
                    }
                    else {
                        throw err;
                    }
                }
                if (Api.is("updates.difference", difference) || Api.is("updates.differenceSlice", difference)) {
                    this.processChats(difference.chats, difference);
                    this.processUsers(difference.users, difference);
                    for (const message of difference.new_messages) {
                        await this.#processUpdates({ _: "updateNewMessage", message, pts: 0, pts_count: 0 }, false);
                    }
                    for (const update of difference.other_updates) {
                        await this.#processUpdates(update, false);
                    }
                    if (Api.is("updates.difference", difference)) {
                        await this.#setState(difference.state);
                        this.#LrecoverUpdateGap.debug("recovered from update gap");
                        break;
                    }
                    else if (Api.is("updates.differenceSlice", difference)) {
                        state = difference.intermediate_state;
                        await this.#setState(state);
                    }
                    else {
                        unreachable();
                    }
                }
                else if (Api.is("updates.differenceTooLong", difference)) {
                    await this.#c.messageStorage.deleteMessages();
                    state.pts = difference.pts;
                    this.#LrecoverUpdateGap.debug("received differenceTooLong");
                }
                else if (Api.is("updates.differenceEmpty", difference)) {
                    await this.#setUpdateStateDate(difference.date);
                    this.#LrecoverUpdateGap.debug("there was no update gap");
                    break;
                }
                else {
                    unreachable();
                }
            }
        }
        catch (err) {
            this.#LrecoverUpdateGap.error(err);
        }
        finally {
            unlock();
            this.#c.resetConnectionState();
            this.#recoveringUpdateGap = false;
        }
    }
    async #recoverChannelUpdateGap(channelId, source) {
        let lastTimeout = 10;
        this.#LrecoverChannelUpdateGap.debug(`recovering channel update gap [${channelId}, ${source}]`);
        const pts_ = await this.#c.storage.channelPts.get([channelId]);
        let pts = pts_ === null ? 1 : pts_;
        let retryIn = 5;
        while (true) {
            const { access_hash } = await this.#c.getInputPeer(ZERO_CHANNEL_ID + -Number(channelId)).then((v) => Api.as("inputPeerChannel", v));
            let difference;
            try {
                difference = await this.#c.invoke({
                    _: "updates.getChannelDifference",
                    pts,
                    channel: { _: "inputChannel", channel_id: channelId, access_hash },
                    filter: { _: "channelMessagesFilterEmpty" },
                    limit: this.#c.storage.isBot ? CHANNEL_DIFFERENCE_LIMIT_BOT : CHANNEL_DIFFERENCE_LIMIT_USER,
                });
                lastTimeout = difference.timeout ?? lastTimeout;
            }
            catch (err) {
                if (err instanceof PersistentTimestampInvalid) {
                    await delay(retryIn * SECOND);
                    retryIn += 5;
                    if (retryIn > 60) {
                        retryIn = 60;
                    }
                    continue;
                }
                else {
                    throw err;
                }
            }
            if (Api.is("updates.channelDifference", difference)) {
                this.processChats(difference.chats, difference);
                this.processUsers(difference.users, difference);
                for (const message of difference.new_messages) {
                    await this.#processUpdates({ _: "updateNewChannelMessage", message, pts: 0, pts_count: 0 }, false);
                }
                for (const update of difference.other_updates) {
                    await this.#processUpdates(update, false);
                }
                this.#c.storage.channelPts.set([channelId], difference.pts);
                this.#LrecoverChannelUpdateGap.debug(`recovered from update gap [${channelId}, ${source}]`, channelId, source);
                break;
            }
            else if (Api.is("updates.channelDifferenceTooLong", difference)) {
                this.#LrecoverChannelUpdateGap.debug("received channelDifferenceTooLong");
                this.processChats(difference.chats, difference);
                this.processUsers(difference.users, difference);
                for (const message of difference.messages) {
                    await this.#processUpdates({ _: "updateNewChannelMessage", message, pts: 0, pts_count: 0 }, false);
                }
                const pts_ = Api.as("dialog", difference.dialog).pts;
                if (pts_ !== undefined) {
                    pts = pts_;
                }
                else {
                    unreachable();
                }
                this.#LrecoverChannelUpdateGap.debug("processed channelDifferenceTooLong");
            }
            else if (Api.is("updates.channelDifferenceEmpty", difference)) {
                this.#LrecoverChannelUpdateGap.debug("there was no update gap");
                break;
            }
        }
        return lastTimeout;
    }
    #handleUpdatesSet = new Set();
    async #handleStoredUpdates(boxId) {
        if (this.#handleUpdatesSet.has(boxId)) {
            return;
        }
        this.#handleUpdatesSet.add(boxId);
        do {
            const maybeUpdate = await this.#c.storage.getFirstUpdate(boxId);
            if (maybeUpdate === null) {
                break;
            }
            const [key, update] = maybeUpdate;
            for (let i = 0; i < 100; ++i) {
                try {
                    const handle = await this.#handleUpdate(update);
                    handle: for (let i = 0; i < 2; ++i) {
                        try {
                            await handle();
                            break handle;
                        }
                        catch {
                            continue handle;
                        }
                    }
                    break;
                }
                catch (err) {
                    this.#L$handleUpdate.error(err);
                }
            }
            await this.#c.storage.set(key, null);
        } while (true);
        this.#handleUpdatesSet.delete(boxId);
    }
    #handleUpdate(update) {
        const handler = this.#updateHandler;
        if (handler) {
            return handler(update);
        }
        else {
            return Promise.resolve(() => Promise.resolve());
        }
    }
    async #needsGetDifference(update) {
        const chatIds = this.#collectChatIds(update);
        if (!chatIds.size) {
            return false;
        }
        return (await Promise.all(chatIds.values().map((v) => this.#c.messageStorage.peers.get([v])))).some((v) => !v);
    }
    #collectChatIds(object) {
        const chatIds = new Set();
        if (Api.is("messageFwdHeader", object)) {
            if (object.from_id) {
                chatIds.add(peerToChatId(object.from_id));
            }
            if (object.saved_from_peer) {
                chatIds.add(peerToChatId(object.saved_from_peer));
            }
            return chatIds;
        }
        if (Api.isOfEnum("MessageMedia", object)) {
            switch (object._) {
                case "messageMediaContact":
                    if (object.user_id) {
                        chatIds.add(peerToChatId({ _: "peerUser", user_id: object.user_id }));
                    }
                    break;
                case "messageMediaStory":
                    chatIds.add(peerToChatId(object.peer));
                    break;
                case "messageMediaGiveaway":
                    for (const chatId of object.channels.map((v) => peerToChatId({ _: "peerChannel", channel_id: v }))) {
                        chatIds.add(chatId);
                    }
                    break;
                case "messageMediaGiveawayResults":
                    chatIds.add(peerToChatId({ _: "peerChannel", channel_id: object.channel_id }));
                    for (const chatId of object.winners.map((user_id) => peerToChatId({ _: "peerUser", user_id }))) {
                        chatIds.add(chatId);
                    }
            }
            return chatIds;
        }
        if (!("message" in object)) {
            return chatIds;
        }
        if (Api.is("messageEmpty", object.message)) {
            return chatIds;
        }
        chatIds.add(peerToChatId(object.message.peer_id));
        if (object.message.from_id) {
            chatIds.add(peerToChatId(object.message.from_id));
        }
        if (Api.is("messageService", object.message)) {
            switch (object.message.action._) {
                case "messageActionChatCreate":
                case "messageActionChatAddUser":
                case "messageActionInviteToGroupCall":
                    for (const user_id of object.message.action.users) {
                        chatIds.add(peerToChatId({ _: "peerUser", user_id }));
                    }
                    break;
                case "messageActionChatDeleteUser":
                    chatIds.add(peerToChatId({ _: "peerUser", user_id: object.message.action.user_id }));
                    break;
                case "messageActionChatMigrateTo":
                    chatIds.add(peerToChatId({ _: "peerChannel", channel_id: object.message.action.channel_id }));
                    break;
                case "messageActionChannelMigrateFrom":
                    chatIds.add(peerToChatId({ _: "peerChat", chat_id: object.message.action.chat_id }));
                    break;
                case "messageActionConferenceCall":
                    if (object.message.action.other_participants) {
                        for (const participant of object.message.action.other_participants) {
                            chatIds.add(peerToChatId(participant));
                        }
                    }
                    break;
                case "messageActionPaymentRefunded":
                    chatIds.add(peerToChatId(object.message.action.peer));
                    break;
                case "messageActionGiftCode":
                    if (object.message.action.boost_peer) {
                        chatIds.add(peerToChatId(object.message.action.boost_peer));
                    }
                    break;
                case "messageActionRequestedPeer":
                    if (!this.#c.storage.isBot) {
                        for (const peer of object.message.action.peers) {
                            chatIds.add(peerToChatId(peer));
                        }
                    }
                    break;
                case "messageActionSetMessagesTTL":
                    if (object.message.action.auto_setting_from) {
                        chatIds.add(peerToChatId({ _: "peerUser", user_id: object.message.action.auto_setting_from }));
                    }
            }
        }
        else {
            if (object.message.reply_to) {
                switch (object.message.reply_to._) {
                    case "messageReplyHeader":
                        if (object.message.reply_to.reply_to_peer_id) {
                            chatIds.add(peerToChatId(object.message.reply_to.reply_to_peer_id));
                        }
                        if (object.message.reply_to.reply_from) {
                            for (const chatId of this.#collectChatIds(object.message.reply_to.reply_from)) {
                                chatIds.add(chatId);
                            }
                        }
                        if (object.message.reply_to.quote_entities) {
                            for (const chatId of this.#collectChatIdsFromEntities(object.message.reply_to.quote_entities)) {
                                chatIds.add(chatId);
                            }
                        }
                        if (object.message.reply_to.reply_media) {
                            for (const chatId of this.#collectChatIds(object.message.reply_to.reply_media)) {
                                chatIds.add(chatId);
                            }
                        }
                        break;
                    case "messageReplyStoryHeader":
                        chatIds.add(peerToChatId(object.message.reply_to.peer));
                }
            }
            if (object.message.fwd_from) {
                for (const chatId of this.#collectChatIds(object.message.fwd_from)) {
                    chatIds.add(chatId);
                }
            }
            if (object.message.via_bot_id) {
                chatIds.add(peerToChatId({ _: "peerUser", user_id: object.message.via_bot_id }));
            }
            if (object.message.entities) {
                for (const chatId of this.#collectChatIdsFromEntities(object.message.entities)) {
                    chatIds.add(chatId);
                }
            }
            if (object.message.media) {
                for (const chatId of this.#collectChatIds(object.message.media)) {
                    chatIds.add(chatId);
                }
            }
        }
        return chatIds;
    }
    #collectChatIdsFromEntities(entities) {
        const chatIds = new Array();
        for (const user_id of entities.filter((v) => Api.is("messageEntityMentionName", v)).map((v) => v.user_id)) {
            chatIds.push(peerToChatId({ _: "peerUser", user_id }));
        }
        return chatIds;
    }
    setUpdateHandler(handler) {
        this.#updateHandler = handler;
    }
    #openChats = new Map();
    async openChat(chatId, params) {
        if (params?.timeout !== undefined && (params.timeout < 0 || params?.timeout === 0)) {
            throw new InputError("An invalid timeout was specified.");
        }
        const channel = await this.#c.getInputChannel(chatId);
        const channelId = channel.channel_id;
        if (this.#openChats.has(channelId)) {
            return;
        }
        const controller = new AbortController();
        const promise = Promise.resolve().then(async () => {
            const logger = this.#LopenChat.branch(Api.peerToChatId(channel) + "");
            while (true) {
                if (this.#c.disconnected()) {
                    logger.debug("disconnected, stopping the loop");
                    this.#openChats.delete(channelId);
                    break;
                }
                if (!this.#openChats.has(channelId)) {
                    const aborted = controller.signal.aborted;
                    logger.debug(`closed${(aborted ? " (aborted)" : "")}, stopping the loop`);
                    break;
                }
                try {
                    const Ti = Date.now();
                    const otherTimeout = await this.#recoverChannelUpdateGap(channelId, "openChat");
                    const timeout = params?.timeout ?? otherTimeout;
                    const dT = Date.now() - Ti;
                    const delayMs = Math.max(timeout * SECOND - dT, 0);
                    logger.debug("timeout =", timeout, params?.timeout !== undefined ? "(user-provided)" : "(not user-provided)", "delay =", delayMs, "dT =", dT);
                    if (delayMs) {
                        await delay(delayMs, { signal: controller.signal });
                    }
                }
                catch (err) {
                    if (this.#c.disconnected()) {
                        continue;
                    }
                    this.#LopenChat.error("an unexpected error occurred:", err);
                }
            }
        });
        this.#openChats.set(channelId, { controller, promise });
    }
    async closeChat(chatId) {
        const { channel_id } = await this.#c.getInputChannel(chatId);
        const openChat = this.#openChats.get(channel_id);
        if (openChat) {
            this.#openChats.delete(channel_id);
            openChat.controller.abort();
        }
        else {
            throw new InputError("Chat not open");
        }
    }
    closeAllChats() {
        for (const [channelId, openChat] of this.#openChats.entries()) {
            this.#openChats.delete(channelId);
            openChat.controller.abort();
        }
    }
}
_a = UpdateManager;
