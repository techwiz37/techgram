import { Api } from "../2_tl.js";
import type { PeerGetter } from "./1_chat_p.js";
export interface StoryPrivacyEveryone {
    everyoneExcept: number[];
}
export interface StoryPrivacyConctacts {
    contactsExcept: number[];
}
export interface StoryPrivacyCloseFriends {
    closeFriends: true;
}
export interface StoryPrivacyOnly {
    only: number[];
}
export type StoryPrivacy = StoryPrivacyEveryone | StoryPrivacyConctacts | StoryPrivacyCloseFriends | StoryPrivacyOnly;
export declare function storyPrivacyToTlObject(privacy: StoryPrivacy, getPeer: PeerGetter): Api.InputPrivacyRule[];
export declare function constructStoryPrivacy(privacy: Api.PrivacyRule[]): StoryPrivacy;
//# sourceMappingURL=2_story_privacy.d.ts.map