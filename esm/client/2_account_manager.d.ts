import { type BotTokenCheckResult, type CodeCheckResult, type ID, type PasswordCheckResult } from "../3_types.js";
import type { AddContactParams, SetBirthdayParams, SetEmojiStatusParams, SetLocationParams, SetNameColorParams, SetPersonalChannelParams, SetProfileColorParams, UpdateProfileParams } from "./0_params.js";
import type { C } from "./1_types.js";
export declare class AccountManager {
    #private;
    constructor(c: C);
    showUsername(id: ID, username: string): Promise<void>;
    hideUsername(id: ID, username: string): Promise<void>;
    reorderUsernames(id: ID, order: string[]): Promise<NonNullable<boolean | undefined>>;
    hideUsernames(id: ID): Promise<NonNullable<boolean | undefined>>;
    getInactiveChats(): Promise<import("../3_types.js").InactiveChat[]>;
    setOnline(online: boolean): Promise<void>;
    setEmojiStatus(id: string, params?: SetEmojiStatusParams): Promise<void>;
    setUserEmojiStatus(userId: ID, id: string, params?: SetEmojiStatusParams): Promise<void>;
    setBotCanSetEmojiStatus(botId: ID, canSetEmojiStatus: boolean): Promise<void>;
    getContacts(): Promise<import("../3_types.js").User[]>;
    deleteContacts(userIds: ID[]): Promise<void>;
    deleteContact(userId: ID): Promise<void>;
    addContact(userId: ID, params?: AddContactParams): Promise<void>;
    updateProfile(params?: UpdateProfileParams): Promise<void>;
    setBirthday(params?: SetBirthdayParams): Promise<void>;
    setPersonalChannel(params?: SetPersonalChannelParams): Promise<void>;
    setNameColor(color: number, params?: SetNameColorParams): Promise<void>;
    setProfileColor(color: number, params?: SetProfileColorParams): Promise<void>;
    setLocation(params?: SetLocationParams): Promise<void>;
    sendCode(phoneNumber: string, apiId: number, apiHash: string): Promise<void>;
    checkCode(code: string): Promise<CodeCheckResult>;
    getPasswordHint(): Promise<string | null>;
    checkPassword(password: string): Promise<PasswordCheckResult>;
    checkBotToken(botToken: string, apiId: number, apiHash: string): Promise<BotTokenCheckResult>;
}
//# sourceMappingURL=2_account_manager.d.ts.map