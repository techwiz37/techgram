import { unreachable } from "../0_deps.js";
import { InputError } from "../0_errors.js";
import { Api } from "../2_tl.js";
import { PasswordHashInvalid, PhoneCodeInvalid, SessionPasswordNeeded } from "../3_errors.js";
import { birthdayToTlObject, constructInactiveChat, constructUser } from "../3_types.js";
import { checkPassword } from "./0_password.js";
import { canBeInputChannel, canBeInputUser, toInputChannel, toInputUser } from "./0_utilities.js";
export class AccountManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    async #toggleUsername(id, username, active) {
        const peer = await this.#c.getInputPeer(id);
        if (Api.is("inputPeerSelf", peer)) {
            await this.#c.invoke({ _: "account.toggleUsername", username, active });
        }
        else if (canBeInputUser(peer)) {
            await this.#c.invoke({ _: "bots.toggleUsername", bot: toInputUser(peer), username, active });
        }
        else if (canBeInputChannel(peer)) {
            await this.#c.invoke({ _: "channels.toggleUsername", channel: toInputChannel(peer), username, active });
        }
        else {
            unreachable();
        }
    }
    async showUsername(id, username) {
        this.#c.storage.assertUser("showUsername");
        await this.#toggleUsername(id, username, true);
    }
    async hideUsername(id, username) {
        this.#c.storage.assertUser("hideUsername");
        await this.#toggleUsername(id, username, false);
    }
    async reorderUsernames(id, order) {
        this.#c.storage.assertUser("reorderUsernames");
        const peer = await this.#c.getInputPeer(id);
        if (Api.is("inputPeerSelf", peer)) {
            return await this.#c.invoke({ _: "account.reorderUsernames", order });
        }
        else if (canBeInputUser(peer)) {
            return await this.#c.invoke({ _: "bots.reorderUsernames", bot: toInputUser(peer), order });
        }
        else if (canBeInputChannel(peer)) {
            return await this.#c.invoke({ _: "channels.reorderUsernames", channel: toInputChannel(peer), order });
        }
        else {
            unreachable();
        }
    }
    async hideUsernames(id) {
        this.#c.storage.assertUser("hideUsernames");
        const peer = await this.#c.getInputPeer(id);
        if (canBeInputChannel(peer)) {
            return await this.#c.invoke({ _: "channels.deactivateAllUsernames", channel: toInputChannel(peer) });
        }
        else {
            unreachable();
        }
    }
    async getInactiveChats() {
        this.#c.storage.assertUser("getInactiveChats");
        const { chats, dates } = await this.#c.invoke({ _: "channels.getInactiveChannels" });
        return chats.map((v, i) => constructInactiveChat(v, dates[i]));
    }
    async setOnline(online) {
        this.#c.storage.assertUser("setOnline");
        await this.#c.invoke({ _: "account.updateStatus", offline: !online });
    }
    async setEmojiStatus(id, params) {
        this.#c.storage.assertUser("setEmojiStatus");
        const document_id = BigInt(id);
        const until = params?.until;
        const emoji_status = { _: "emojiStatus", document_id, until };
        await this.#c.invoke({ _: "account.updateEmojiStatus", emoji_status });
    }
    async setUserEmojiStatus(userId, id, params) {
        this.#c.storage.assertBot("setUserEmojiStatus");
        const user_id = await this.#c.getInputUser(userId);
        const document_id = BigInt(id);
        const until = params?.until;
        const emoji_status = { _: "emojiStatus", document_id, until };
        await this.#c.invoke({ _: "bots.updateUserEmojiStatus", user_id, emoji_status });
    }
    async setBotCanSetEmojiStatus(botId, canSetEmojiStatus) {
        this.#c.storage.assertUser("setBotCanSetEmojiStatus");
        const bot = await this.#c.getInputUser(botId);
        const enabled = canSetEmojiStatus;
        await this.#c.invoke({ _: "bots.toggleUserEmojiStatusPermission", bot, enabled });
    }
    async getContacts() {
        this.#c.storage.assertUser("getContacts");
        const result = await this.#c.invoke({ _: "contacts.getContacts", hash: 0n });
        if (!Api.is("contacts.contacts", result)) {
            unreachable();
        }
        return result.users.map((v) => Api.is("user", v) ? constructUser(v) : null).filter((v) => v !== null);
    }
    async deleteContacts(userIds) {
        this.#c.storage.assertUser("deleteContacts");
        const id = await Promise.all(userIds.map((v) => this.#c.getInputUser(v)));
        await this.#c.invoke({ _: "contacts.deleteContacts", id });
    }
    async deleteContact(userId) {
        this.#c.storage.assertUser("deleteContact");
        await this.deleteContacts([userId]);
    }
    async addContact(userId, params) {
        this.#c.storage.assertUser("addContact");
        const id = await this.#c.getInputUser(userId);
        if (!Api.is("inputPeerUser", id)) {
            unreachable();
        }
        const peer = this.#c.getPeer(Api.inputPeerToPeer(id));
        if (!peer || peer[0].type !== "private") {
            unreachable();
        }
        const first_name = params?.firstName ?? peer[0].firstName ?? "";
        const last_name = params?.lastName ?? peer[0].lastName ?? "";
        const phone = "";
        const add_phone_privacy_exception = params?.sharePhoneNumber ? true : undefined;
        await this.#c.invoke({ _: "contacts.addContact", add_phone_privacy_exception, id, first_name, last_name, phone });
    }
    async #getUserFull(chatId) {
        const inputPeer = await this.#c.getInputPeer(chatId);
        const chatId_ = await this.#c.getInputPeerChatId(inputPeer);
        let fullChat = await this.#c.messageStorage.getFullChat(chatId_);
        if (fullChat !== null) {
            if (!Api.is("userFull", fullChat)) {
                unreachable();
            }
            return fullChat;
        }
        if (canBeInputUser(inputPeer)) {
            fullChat = (await this.#c.invoke({ _: "users.getFullUser", id: toInputUser(inputPeer) })).full_user;
        }
        else {
            unreachable();
        }
        return fullChat;
    }
    async updateProfile(params) {
        this.#c.storage.assertUser("updateProfile");
        const selfId = await this.#c.getSelfId();
        const userFull = await this.#getUserFull(selfId);
        const peer = this.#c.getPeer(Api.chatIdToPeer(selfId));
        if (!peer || peer[0].type !== "private") {
            unreachable();
        }
        params ??= {};
        if (params?.firstName) {
            params.firstName = params.firstName.trim();
        }
        else {
            params.firstName = peer[0].firstName;
        }
        if (params?.lastName) {
            params.lastName = params.lastName.trim();
        }
        else {
            params.lastName = peer[0].lastName;
        }
        if (params?.bio) {
            params.bio = params.bio.trim();
        }
        else {
            params.bio = userFull.about;
        }
        if (!params?.firstName && !params?.lastName && !params?.bio) {
            throw new InputError("At least one parameter must be specified.");
        }
        await this.#c.invoke({ _: "account.updateProfile", first_name: params.firstName, last_name: params.lastName, about: params.bio });
    }
    async setBirthday(params) {
        this.#c.storage.assertUser("setBirthday");
        const birthday = params?.birthday ? birthdayToTlObject(params.birthday) : undefined;
        await this.#c.invoke({ _: "account.updateBirthday", birthday });
    }
    async setPersonalChannel(params) {
        this.#c.storage.assertUser("setPersonalChannel");
        let channel = { _: "inputChannelEmpty" };
        if (params?.chatId) {
            channel = await this.#c.getInputChannel(params.chatId);
        }
        await this.#c.invoke({ _: "account.updatePersonalChannel", channel });
    }
    async setNameColor(color, params) {
        this.#c.storage.assertUser("setNameColor");
        const background_emoji_id = params?.customEmojiId ? BigInt(params.customEmojiId) : undefined;
        await this.#c.invoke({ _: "account.updateColor", color: { _: "peerColor", color, background_emoji_id } });
    }
    async setProfileColor(color, params) {
        this.#c.storage.assertUser("setProfileColor");
        const background_emoji_id = params?.customEmojiId ? BigInt(params.customEmojiId) : undefined;
        await this.#c.invoke({ _: "account.updateColor", for_profile: true, color: { _: "peerColor", color, background_emoji_id } });
    }
    async setLocation(params) {
        this.#c.storage.assertUser("setLocation");
        let address = params?.address;
        if (typeof address === "string") {
            address = address.trim();
            if (!address.length) {
                throw new InputError("Address cannot be empty.");
            }
            if (address.length > 96) {
                throw new InputError("Address is too long.");
            }
        }
        let geo_point;
        if (params?.latitude && params.longitude) {
            geo_point = { _: "inputGeoPoint", lat: params.latitude, long: params.longitude };
        }
        await this.#c.invoke({ _: "account.updateBusinessLocation", address, geo_point });
    }
    #phoneNumber;
    #sentCode;
    async sendCode(phoneNumber, apiId, apiHash) {
        this.#phoneNumber = phoneNumber;
        this.#sentCode = await this.#c.invoke({
            _: "auth.sendCode",
            phone_number: phoneNumber,
            api_id: apiId,
            api_hash: apiHash,
            settings: { _: "codeSettings" },
        }).then((v) => Api.as("auth.sentCode", v));
    }
    async checkCode(code) {
        if (!this.#phoneNumber || !this.#sentCode) {
            throw new InputError("Invalid sent code identifier.");
        }
        try {
            const auth = await this.#c.invoke({
                _: "auth.signIn",
                phone_number: this.#phoneNumber,
                phone_code: code,
                phone_code_hash: this.#sentCode.phone_code_hash,
            });
            return {
                type: "signed_in",
                userId: Number(Api.as("auth.authorization", auth).user.id),
            };
        }
        catch (err) {
            if (err instanceof PhoneCodeInvalid) {
                return {
                    type: "invalid_code",
                };
            }
            else if (err instanceof SessionPasswordNeeded) {
                return { type: "password_required" };
            }
            else {
                throw err;
            }
        }
    }
    async #getAccountPassword() {
        return await this.#c.invoke({ _: "account.getPassword" });
    }
    #ap;
    async getPasswordHint() {
        if (!this.#ap) {
            this.#ap = await this.#getAccountPassword();
        }
        return this.#ap.hint ?? "";
    }
    async checkPassword(password) {
        const ap = this.#ap = await this.#getAccountPassword();
        try {
            const input = await checkPassword(password, ap);
            const auth = await this.#c.invoke({ _: "auth.checkPassword", password: input });
            return {
                type: "signed_in",
                userId: Number(Api.as("auth.authorization", auth).user.id),
            };
        }
        catch (err) {
            if (err instanceof PasswordHashInvalid) {
                return {
                    type: "invalid_password",
                };
            }
            else {
                throw err;
            }
        }
    }
    async checkBotToken(botToken, apiId, apiHash) {
        const auth = await this.#c.invoke({ _: "auth.importBotAuthorization", api_id: apiId, api_hash: apiHash, bot_auth_token: botToken, flags: 0 });
        return {
            type: "signed_in",
            userId: Number(Api.as("auth.authorization", auth).user.id),
        };
    }
}
