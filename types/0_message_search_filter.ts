import { unreachable } from "../0_deps.ts";
import type { Api } from "../2_tl.ts";

export type MessageSearchFilter =
  | "empty"
  | "animations"
  | "audios"
  | "documents"
  | "photos"
  | "videos"
  | "voiceMessages"
  | "photosAndVideos"
  | "links"
  | "chatPhotos"
  | "videoNotes"
  | "voiceMessagesAndVideoNotes"
  | "mentions"
  | "pinned";

export function messageSearchFilterToTlObject(filter: MessageSearchFilter): Api.MessagesFilter {
  switch (filter) {
    case "empty":
      return { _: "inputMessagesFilterEmpty" };
    case "animations":
      return { _: "inputMessagesFilterGif" };
    case "audios":
      return { _: "inputMessagesFilterMusic" };
    case "documents":
      return { _: "inputMessagesFilterDocument" };
    case "photos":
      return { _: "inputMessagesFilterPhotos" };
    case "videos":
      return { _: "inputMessagesFilterVideo" };
    case "voiceMessages":
      return { _: "inputMessagesFilterVoice" };
    case "photosAndVideos":
      return { _: "inputMessagesFilterPhotoVideo" };
    case "links":
      return { _: "inputMessagesFilterUrl" };
    case "chatPhotos":
      return { _: "inputMessagesFilterChatPhotos" };
    case "videoNotes":
      return { _: "inputMessagesFilterRoundVideo" };
    case "voiceMessagesAndVideoNotes":
      return { _: "inputMessagesFilterRoundVoice" };
    case "mentions":
      return { _: "inputMessagesFilterMyMentions" };
    case "pinned":
      return { _: "inputMessagesFilterPinned" };
    default:
      unreachable();
  }
}
