import { unreachable } from "../0_deps.js";
import { InputError } from "../0_errors.js";
import { Queue } from "../1_utilities.js";
import { Api } from "../2_tl.js";
import { constructTranslation } from "../3_types.js";
const translationsManagerUpdates = [
    "updateLangPackTooLong",
    "updateLangPack",
];
export class TranslationsManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    canHandleUpdate(update) {
        return Api.isOneOf(translationsManagerUpdates, update);
    }
    async getTranslations(params) {
        this.#c.storage.assertUser("getTranslations");
        const platform = params?.platform ?? this.#c.langPack;
        if (!platform) {
            throw new InputError("No platform specified.");
        }
        const language = params?.language ?? this.#c.langCode;
        if (!language) {
            throw new InputError("No language specified.");
        }
        return await this.#getTranslationsInner(platform, language);
    }
    async #getTranslationsInner(platform, language, assert = false) {
        const maybeTranslations = await this.#c.messageStorage.translations.get([platform, language]);
        if (maybeTranslations !== null) {
            return maybeTranslations.translations;
        }
        else if (assert) {
            unreachable();
        }
        else {
            await this.#updateTranslations(platform, language);
            return await this.#getTranslationsInner(platform, language, true);
        }
    }
    #updateTranslationsQueue = new Queue("updateTranslations");
    async #updateTranslations(platform, language) {
        await new Promise((resolve, reject) => {
            this.#updateTranslationsQueue.add(async () => {
                try {
                    const maybeTranslations = await this.#c.messageStorage.translations.get([platform, language]);
                    if (maybeTranslations !== null) {
                        const difference = await this.#c.invoke({ _: "langpack.getDifference", lang_pack: platform, lang_code: language, from_version: maybeTranslations.version });
                        const newTranslations = this.#applyLangPackDifference(maybeTranslations.translations, difference.strings);
                        this.#c.messageStorage.translations.set([platform, language], { date: new Date(), version: difference.version, translations: newTranslations });
                    }
                    else {
                        const pack = await this.#c.invoke({ _: "langpack.getLangPack", lang_pack: platform, lang_code: language });
                        const version = pack.version;
                        const translations = pack.strings.map(constructTranslation);
                        this.#c.messageStorage.translations.set([platform, language], { date: new Date(), version, translations });
                    }
                    resolve();
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
    async #applyLangPackDifferenceAndSave(platform, language, version, fromVersion, strings) {
        const result = await new Promise((resolve, reject) => {
            this.#updateTranslationsQueue.add(async () => {
                try {
                    const maybeTranslations = await this.#c.messageStorage.translations.get([platform, language]);
                    let newTranslations = null;
                    if (maybeTranslations) {
                        if (fromVersion !== maybeTranslations.version) {
                            resolve("mustUpdate");
                            return;
                        }
                        newTranslations = this.#applyLangPackDifference(maybeTranslations.translations, strings);
                        this.#c.messageStorage.translations.set([platform, language], {
                            date: new Date(),
                            version,
                            translations: newTranslations,
                        });
                    }
                    resolve(newTranslations);
                }
                catch (err) {
                    reject(err);
                }
            });
        });
        if (result === "mustUpdate") {
            await this.#updateTranslations(platform, language);
            return await this.#getTranslationsInner(platform, language, true);
        }
        else {
            return result;
        }
    }
    #applyLangPackDifference(translations, strings) {
        for (const string of strings) {
            if (Api.is("langPackStringDeleted", string)) {
                translations = translations.filter((v) => v.key !== string.key);
            }
            else {
                const newTranslation = constructTranslation(string);
                const currentTranslation = translations.find((v) => v.key === string.key);
                if (currentTranslation) {
                    Object.assign(currentTranslation, newTranslation);
                }
                else {
                    translations.push(newTranslation);
                }
            }
        }
        return translations;
    }
    async handleUpdate(update) {
        if (!this.#c.langPack) {
            return null;
        }
        if (Api.is("updateLangPackTooLong", update)) {
            await this.#updateTranslations(this.#c.langPack, update.lang_code);
            const translations = await this.#getTranslationsInner(this.#c.langPack, update.lang_code, true);
            return { platform: this.#c.langPack, language: update.lang_code, translations };
        }
        else if (Api.is("updateLangPack", update)) {
            if (!this.#c.langCode) {
                return null;
            }
            const translations = await this.#applyLangPackDifferenceAndSave(this.#c.langPack, this.#c.langCode, update.difference.version, update.difference.from_version, update.difference.strings);
            if (!translations) {
                return null;
            }
            else {
                return { platform: this.#c.langPack, language: this.#c.langCode, translations };
            }
        }
        return null;
    }
}
