"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryManager = void 0;
const _0_deps_js_1 = require("../0_deps.js");
const _0_errors_js_1 = require("../0_errors.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _3_types_js_1 = require("../3_types.js");
const _0_utilities_js_1 = require("./0_utilities.js");
const storyManagerUpdates = [
    "updateStory",
];
class StoryManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    #updatesToStory(updates) {
        if (_2_tl_js_1.Api.is("updates", updates)) {
            const updateStory = updates.updates.find((v) => _2_tl_js_1.Api.is("updateStory", v));
            if (updateStory && _2_tl_js_1.Api.is("storyItem", updateStory.story)) {
                return (0, _3_types_js_1.constructStory)(updateStory.story, updateStory.peer, this.#c.getPeer);
            }
        }
        (0, _0_deps_js_1.unreachable)();
    }
    async createStory(chatId, content, params) {
        this.#c.storage.assertUser("createStory");
        let media = null;
        const source = "video" in content ? content.video : "photo" in content ? content.photo : (0, _0_deps_js_1.unreachable)();
        if (typeof source === "string") {
            const fileId = this.#c.messageManager.resolveFileId(source, _3_types_js_1.FileType.Photo);
            if (fileId !== null) {
                media = { _: "inputMediaPhoto", id: { ...fileId, _: "inputPhoto" } };
            }
        }
        if (media === null) {
            if (typeof source === "string" && (0, _0_utilities_js_1.isHttpUrl)(source)) {
                throw new _0_errors_js_1.InputError("URL not supported.");
            }
            else {
                const file = await this.#c.fileManager.upload(source, params, null, "video" in content);
                if (_2_tl_js_1.Api.is("inputFileStoryDocument", file)) {
                    (0, _0_deps_js_1.unreachable)();
                }
                const mimeType = (0, _0_deps_js_1.contentType)(file.name.split(".").slice(-1)[0]) ?? "application/octet-stream";
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
        const randomId = (0, _1_utilities_js_1.getRandomId)();
        const privacyRules = await (0, _3_types_js_1.storyPrivacyToTlObject)(params?.privacy ?? { everyoneExcept: [] }, this.#c.getPeer);
        const mediaAreas = new Array();
        if (params?.interactiveAreas?.length) {
            for (const area of params.interactiveAreas) {
                mediaAreas.push(await (0, _3_types_js_1.storyInteractiveAreaToTlObject)(area, this.#c.getPeer));
            }
        }
        const updates = await this.#c.invoke({ _: "stories.sendStory", peer, random_id: randomId, media, privacy_rules: privacyRules, caption, entities, noforwards: params?.protectContent ? true : undefined, period: params?.activeFor, pinned: params?.highlight ? true : undefined, media_areas: mediaAreas });
        return await this.#updatesToStory(updates);
    }
    async getStories(chatId, storyIds) {
        this.#c.storage.assertUser("getStories");
        (0, _0_utilities_js_1.checkArray)(storyIds, _0_utilities_js_1.checkStoryId);
        const peer = await this.#c.getInputPeer(chatId);
        const stories_ = await this.#c.invoke({ _: "stories.getStoriesByID", peer, id: storyIds });
        const stories = new Array();
        for (const story of stories_.stories) {
            stories.push((0, _3_types_js_1.constructStory)(_2_tl_js_1.Api.as("storyItem", story), _2_tl_js_1.Api.inputPeerToPeer(peer), this.#c.getPeer));
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
        (0, _0_utilities_js_1.checkArray)(storyIds, _0_utilities_js_1.checkStoryId);
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
        return _2_tl_js_1.Api.isOneOf(storyManagerUpdates, update);
    }
    handleUpdate(update) {
        if (_2_tl_js_1.Api.is("storyItemDeleted", update.story)) {
            const chatId = _2_tl_js_1.Api.peerToChatId(update.peer);
            const storyId = update.story.id;
            return { deletedStory: { chatId, storyId } };
        }
        else if (_2_tl_js_1.Api.is("storyItem", update.story)) {
            const story = (0, _3_types_js_1.constructStory)(update.story, update.peer, this.#c.getPeer);
            return { story };
        }
        else {
            return null;
        }
    }
}
exports.StoryManager = StoryManager;
