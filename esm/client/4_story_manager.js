import { contentType, unreachable } from "../0_deps.js";
import { InputError } from "../0_errors.js";
import { getRandomId } from "../1_utilities.js";
import { Api } from "../2_tl.js";
import { constructStory, FileType, storyInteractiveAreaToTlObject, storyPrivacyToTlObject } from "../3_types.js";
import { checkArray, checkStoryId, isHttpUrl } from "./0_utilities.js";
const storyManagerUpdates = [
    "updateStory",
];
export class StoryManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    #updatesToStory(updates) {
        if (Api.is("updates", updates)) {
            const updateStory = updates.updates.find((v) => Api.is("updateStory", v));
            if (updateStory && Api.is("storyItem", updateStory.story)) {
                return constructStory(updateStory.story, updateStory.peer, this.#c.getPeer);
            }
        }
        unreachable();
    }
    async createStory(chatId, content, params) {
        this.#c.storage.assertUser("createStory");
        let media = null;
        const source = "video" in content ? content.video : "photo" in content ? content.photo : unreachable();
        if (typeof source === "string") {
            const fileId = this.#c.messageManager.resolveFileId(source, FileType.Photo);
            if (fileId !== null) {
                media = { _: "inputMediaPhoto", id: { ...fileId, _: "inputPhoto" } };
            }
        }
        if (media === null) {
            if (typeof source === "string" && isHttpUrl(source)) {
                throw new InputError("URL not supported.");
            }
            else {
                const file = await this.#c.fileManager.upload(source, params, null, "video" in content);
                if (Api.is("inputFileStoryDocument", file)) {
                    unreachable();
                }
                const mimeType = contentType(file.name.split(".").slice(-1)[0]) ?? "application/octet-stream";
                if ("video" in content) {
                    media = { _: "inputMediaUploadedDocument", file, attributes: [{ _: "documentAttributeFilename", file_name: file.name }, { _: "documentAttributeVideo", w: 720, h: 1280, duration: content.duration }], mime_type: mimeType };
                }
                else {
                    media = { _: "inputMediaUploadedPhoto", file };
                }
            }
        }
        const caption_ = params?.caption;
        const parseResult = caption_ !== undefined ? await this.#c.messageManager.parseText(caption_, { parseMode: params?.parseMode, entities: params?.captionEntities }) : undefined;
        const caption = parseResult === undefined ? undefined : parseResult[0];
        const entities = parseResult === undefined ? undefined : parseResult[1];
        const peer = await this.#c.getInputPeer(chatId);
        const randomId = getRandomId();
        const privacyRules = await storyPrivacyToTlObject(params?.privacy ?? { everyoneExcept: [] }, this.#c.getPeer);
        const mediaAreas = new Array();
        if (params?.interactiveAreas?.length) {
            for (const area of params.interactiveAreas) {
                mediaAreas.push(await storyInteractiveAreaToTlObject(area, this.#c.getPeer));
            }
        }
        const updates = await this.#c.invoke({ _: "stories.sendStory", peer, random_id: randomId, media, privacy_rules: privacyRules, caption, entities, noforwards: params?.protectContent ? true : undefined, period: params?.activeFor, pinned: params?.highlight ? true : undefined, media_areas: mediaAreas });
        return await this.#updatesToStory(updates);
    }
    async getStories(chatId, storyIds) {
        this.#c.storage.assertUser("getStories");
        checkArray(storyIds, checkStoryId);
        const peer = await this.#c.getInputPeer(chatId);
        const stories_ = await this.#c.invoke({ _: "stories.getStoriesByID", peer, id: storyIds });
        const stories = new Array();
        for (const story of stories_.stories) {
            stories.push(constructStory(Api.as("storyItem", story), Api.inputPeerToPeer(peer), this.#c.getPeer));
        }
        return stories;
    }
    async getStory(chatId, storyId) {
        this.#c.storage.assertUser("getStory");
        return (await this.getStories(chatId, [storyId]))[0] ?? null;
    }
    async deleteStories(chatId, storyIds) {
        this.#c.storage.assertUser("deleteStories");
        const peer = await this.#c.getInputPeer(chatId);
        await this.#c.invoke({ _: "stories.deleteStories", peer, id: storyIds });
    }
    async deleteStory(chatId, storyId) {
        this.#c.storage.assertUser("deleteStory");
        await this.deleteStories(chatId, [storyId]);
    }
    async #togglePinned(chatId, storyIds, pinned) {
        checkArray(storyIds, checkStoryId);
        const peer = await this.#c.getInputPeer(chatId);
        await this.#c.invoke({ _: "stories.togglePinned", peer, id: storyIds, pinned });
    }
    async addStoriesToHighlights(chatId, storyIds) {
        this.#c.storage.assertUser("addStoriesToHighlights");
        await this.#togglePinned(chatId, storyIds, true);
    }
    async addStoryToHighlights(chatId, storyId) {
        this.#c.storage.assertUser("addStoryToHighlights");
        await this.addStoriesToHighlights(chatId, [storyId]);
    }
    async removeStoriesFromHighlights(chatId, storyIds) {
        this.#c.storage.assertUser("removeStoriesFromHighlights");
        await this.#togglePinned(chatId, storyIds, false);
    }
    async removeStoryFromHighlights(chatId, storyId) {
        this.#c.storage.assertUser("removeStoryFromHighlights");
        await this.removeStoriesFromHighlights(chatId, [storyId]);
    }
    canHandleUpdate(update) {
        return Api.isOneOf(storyManagerUpdates, update);
    }
    handleUpdate(update) {
        if (Api.is("storyItemDeleted", update.story)) {
            const chatId = Api.peerToChatId(update.peer);
            const storyId = update.story.id;
            return { deletedStory: { chatId, storyId } };
        }
        else if (Api.is("storyItem", update.story)) {
            const story = constructStory(update.story, update.peer, this.#c.getPeer);
            return { story };
        }
        else {
            return null;
        }
    }
}
