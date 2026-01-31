import { botCommandScopeToTlObject } from "../3_types.js";
export class BotInfoManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    async #setMyInfo(info) {
        await this.#c.invoke({ _: "bots.setBotInfo", ...info });
    }
    async setMyDescription(params) {
        this.#c.storage.assertBot("setMyDescription");
        await this.#setMyInfo({ description: params?.description, lang_code: params?.languageCode ?? "" });
    }
    async setMyName(params) {
        this.#c.storage.assertBot("setMyName");
        await this.#setMyInfo({ name: params?.name, lang_code: params?.languageCode ?? "" });
    }
    async setMyShortDescription(params) {
        this.#c.storage.assertBot("setMyShortDescription");
        await this.#setMyInfo({ about: params?.shortDescription, lang_code: params?.languageCode ?? "" });
    }
    #getMyInfo(languageCode) {
        return this.#c.invoke({ _: "bots.getBotInfo", lang_code: languageCode ?? "" });
    }
    async getMyDescription(params) {
        this.#c.storage.assertBot("getMyDescription");
        return (await this.#getMyInfo(params?.languageCode)).description;
    }
    async getMyName(params) {
        this.#c.storage.assertBot("getMyName");
        return (await this.#getMyInfo(params?.languageCode)).description;
    }
    async getMyShortDescription(params) {
        this.#c.storage.assertBot("getMyShortDescription");
        return (await this.#getMyInfo(params?.languageCode)).about;
    }
    async getMyCommands(params) {
        this.#c.storage.assertBot("getMyCommands");
        const commands_ = await this.#c.invoke({
            _: "bots.getBotCommands",
            lang_code: params?.languageCode ?? "",
            scope: await botCommandScopeToTlObject(params?.scope ?? { type: "default" }, this.#c.getInputPeer),
        });
        return commands_.map((v) => ({ command: v.command, description: v.description }));
    }
    async setMyCommands(commands, params) {
        this.#c.storage.assertBot("setMyCommands");
        await this.#c.invoke({
            _: "bots.setBotCommands",
            commands: commands.map((v) => ({ ...v, _: "botCommand" })),
            lang_code: params?.languageCode ?? "",
            scope: await botCommandScopeToTlObject(params?.scope ?? { type: "default" }, this.#c.getInputPeer),
        });
    }
}
