import { Api } from "../2_tl.js";
import { type ID, type Story, type Update } from "../3_types.js";
import type { InputStoryContent } from "../types/1_input_story_content.js";
import type { CreateStoryParams } from "./0_params.js";
import type { UpdateProcessor } from "./0_update_processor.js";
import type { C as C_ } from "./1_types.js";
import type { FileManager } from "./2_file_manager.js";
import type { MessageManager } from "./3_message_manager.js";
type C = C_ & {
    fileManager: FileManager;
    messageManager: MessageManager;
};
declare const storyManagerUpdates: readonly ["updateStory"];
type StoryManagerUpdate = Api.Types[(typeof storyManagerUpdates)[number]];
export declare class StoryManager implements UpdateProcessor<StoryManagerUpdate> {
    #private;
    constructor(c: C);
    createStory(chatId: ID, content: InputStoryContent, params?: CreateStoryParams): Promise<Story>;
    getStories(chatId: ID, storyIds: number[]): Promise<Story[]>;
    getStory(chatId: ID, storyId: number): Promise<Story>;
    deleteStories(chatId: ID, storyIds: number[]): Promise<void>;
    deleteStory(chatId: ID, storyId: number): Promise<void>;
    addStoriesToHighlights(chatId: ID, storyIds: number[]): Promise<void>;
    addStoryToHighlights(chatId: ID, storyId: number): Promise<void>;
    removeStoriesFromHighlights(chatId: ID, storyIds: number[]): Promise<void>;
    removeStoryFromHighlights(chatId: ID, storyId: number): Promise<void>;
    canHandleUpdate(update: Api.Update): update is StoryManagerUpdate;
    handleUpdate(update: StoryManagerUpdate): Update | null;
}
export {};
//# sourceMappingURL=4_story_manager.d.ts.map