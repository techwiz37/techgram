import type { Api } from "../2_tl.ts";
import type { AuthorizationState } from "./0_authorization_state.ts";
import type { ConnectionState } from "./0_connection_state.ts";
import type { MessageReference } from "./0_message_reference.ts";
import type { StoryReference } from "./0_story_reference.ts";
import type { Translation } from "./0_translation.ts";
import type { UploadProgress } from "./0_upload_progress.ts";
import type { VideoChat } from "./0_video_chat.ts";
import type { VoiceTranscription } from "./0_voice_transcription.ts";
import type { MessageInteractions } from "./2_message_interactions.ts";
import type { MessageReactionCount } from "./2_message_reaction_count.ts";
import type { PollAnswer } from "./2_poll_answer.ts";
import type { BusinessConnection } from "./3_business_connection.ts";
import type { ChosenInlineResult } from "./3_chosen_inline_result.ts";
import type { InlineQuery } from "./3_inline_query.ts";
import type { MessageReactions } from "./3_message_reactions.ts";
import type { PreCheckoutQuery } from "./3_pre_checkout_query.ts";
import type { Story } from "./3_story.ts";
import type { ChatMemberUpdated } from "./4_chat_member_updated.ts";
import type { JoinRequest } from "./4_join_request.ts";
import type { Poll } from "./4_poll.ts";
import type { LinkPreview } from "./5_link_preview.ts";
import type { Message } from "./6_message.ts";
import type { CallbackQuery } from "./7_callback_query.ts";
import type { ChatListItem } from "./7_chat_list_item.ts";

export interface UpdateConnectionState {

  connectionState: ConnectionState;
}

export interface UpdateAuthorizationState {

  authorizationState: AuthorizationState;
}

export interface UpdateLowLevel {

  update: Api.Update;
}

export interface UpdateNewMessage {

  message: Message;
}

export interface UpdateMessageEdited {

  editedMessage: Message;
}

export interface UpdateMessageScheduled {

  scheduledMessage: Message;
}

export interface UpdateMessagesDeleted {

  deletedMessages: MessageReference[];
  isScheduled?: boolean;
  businessConnectionId?: string;
}

export interface UpdateCallbackQuery {

  callbackQuery: CallbackQuery;
}

export interface UpdateInlineQuery {

  inlineQuery: InlineQuery;
}

export interface UpdateChosenInlineResult {

  chosenInlineResult: ChosenInlineResult;
}

export interface UpdateNewChat {

  newChat: ChatListItem;
}

export interface UpdateEditedChat {

  editedChat: ChatListItem;
}

export interface UpdateDeletedChat {

  deletedChat: { chatId: number };
}

export interface UpdateMessageInteractions {

  messageInteractions: MessageInteractions;
}

export interface UpdateMessageReactionCount {

  messageReactionCount: MessageReactionCount;
}

export interface UpdateMessageReactions {

  messageReactions: MessageReactions;
}

export interface UpdateChatMember {

  chatMember: ChatMemberUpdated;
}

export interface UpdateMyChatMember {

  myChatMember: ChatMemberUpdated;
}

export interface UpdateDeletedStory {

  deletedStory: StoryReference;
}

export interface UpdateNewStory {

  story: Story;
}

export interface UpdateBusinessConnection {

  businessConnection: BusinessConnection;
}

export interface UpdateVideoChat {

  videoChat: VideoChat;
}

export interface UpdatePreCheckoutQuery {

  preCheckoutQuery: PreCheckoutQuery;
}

export interface UpdateJoinRequest {

  joinRequest: JoinRequest;
}

export interface UpdateTranslations {

  translations: Translation[];

  platform: string;

  language: string;
}

export interface UpdatePoll {

  poll: Poll;
}

export interface UpdatePollAnswer {

  pollAnswer: PollAnswer;
}

export interface UpdateVoiceTranscription {

  voiceTranscription: VoiceTranscription;
}

export interface UpdateLinkPreview {

  linkPreview: LinkPreview;
}

export interface UpdateUploadProgress {

  uploadProgress: UploadProgress;
}

export interface UpdateMap {
  message: UpdateNewMessage;
  editedMessage: UpdateMessageEdited;
  scheduledMessage: UpdateMessageScheduled;
  connectionState: UpdateConnectionState;
  authorizationState: UpdateAuthorizationState;
  update: UpdateLowLevel;
  deletedMessages: UpdateMessagesDeleted;
  callbackQuery: UpdateCallbackQuery;
  inlineQuery: UpdateInlineQuery;
  chosenInlineResult: UpdateChosenInlineResult;
  newChat: UpdateNewChat;
  editedChat: UpdateEditedChat;
  deletedChat: UpdateDeletedChat;
  messageInteractions: UpdateMessageInteractions;
  messageReactionCount: UpdateMessageReactionCount;
  messageReactions: UpdateMessageReactions;
  chatMember: UpdateChatMember;
  myChatMember: UpdateMyChatMember;
  deletedStory: UpdateDeletedStory;
  story: UpdateNewStory;
  businessConnection: UpdateBusinessConnection;
  videoChat: UpdateVideoChat;
  preCheckoutQuery: UpdatePreCheckoutQuery;
  joinRequest: UpdateJoinRequest;
  translations: UpdateTranslations;
  poll: UpdatePoll;
  pollAnswer: UpdatePollAnswer;
  voiceTranscription: UpdateVoiceTranscription;
  linkPreview: UpdateLinkPreview;
  uploadProgress: UpdateUploadProgress;
}

export type UpdateIntersection = Partial<
  & UpdateConnectionState
  & UpdateAuthorizationState
  & UpdateLowLevel
  & UpdateNewMessage
  & UpdateMessageEdited
  & UpdateMessageScheduled
  & UpdateMessagesDeleted
  & UpdateCallbackQuery
  & UpdateInlineQuery
  & UpdateChosenInlineResult
  & UpdateNewChat
  & UpdateEditedChat
  & UpdateDeletedChat
  & UpdateMessageInteractions
  & UpdateMessageReactionCount
  & UpdateMessageReactions
  & UpdateChatMember
  & UpdateMyChatMember
  & UpdateDeletedStory
  & UpdateNewStory
  & UpdateBusinessConnection
  & UpdateVideoChat
  & UpdatePreCheckoutQuery
  & UpdateJoinRequest
  & UpdateTranslations
  & UpdatePoll
  & UpdatePollAnswer
  & UpdateVoiceTranscription
  & UpdateLinkPreview
  & UpdateUploadProgress
>;

export type Update =
  | UpdateConnectionState
  | UpdateAuthorizationState
  | UpdateLowLevel
  | UpdateNewMessage
  | UpdateMessageEdited
  | UpdateMessageScheduled
  | UpdateMessagesDeleted
  | UpdateCallbackQuery
  | UpdateInlineQuery
  | UpdateChosenInlineResult
  | UpdateNewChat
  | UpdateEditedChat
  | UpdateDeletedChat
  | UpdateMessageInteractions
  | UpdateMessageReactionCount
  | UpdateMessageReactions
  | UpdateChatMember
  | UpdateMyChatMember
  | UpdateDeletedStory
  | UpdateNewStory
  | UpdateBusinessConnection
  | UpdateVideoChat
  | UpdatePreCheckoutQuery
  | UpdateJoinRequest
  | UpdateTranslations
  | UpdatePoll
  | UpdatePollAnswer
  | UpdateVoiceTranscription
  | UpdateLinkPreview
  | UpdateUploadProgress;
