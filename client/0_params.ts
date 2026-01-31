import type { MaybePromise } from "../1_utilities.ts";
import type { DC } from "../3_transport.ts";
import type { Birthday, BotCommandScope, ChatListItem, ChatMemberRights, FileSource, ID, InlineQueryResultButton, InputLinkPreview, LinkPreview, MessageEntity, MessageSearchFilter, ParseMode, Reaction, ReplyMarkup, SelfDestructOption, StoryInteractiveArea, StoryPrivacy } from "../3_types.ts";
import type { MiniAppMode } from "../types/0_mini_app_mode.ts";
import type { ReplyTo } from "../types/4_reply_to.ts";

export interface InvokeParams {
  dc?: DC;
  type?: "download" | "upload";
}

export interface AnswerCallbackQueryParams {

  text?: string;

  alert?: boolean;

  url?: string;

  cacheTime?: number;
}

export interface SignInParamsUser<S = string> {

  phone: S | (() => MaybePromise<S>);

  code: S | (() => MaybePromise<S>);

  password: S | ((hint: string | null) => MaybePromise<S>);
}

export interface SignInParamsBot {

  botToken: string;
}

export type SignInParams = SignInParamsUser | SignInParamsBot;

export interface _BusinessConnectionIdCommon {

  businessConnectionId?: string;
}

export interface _ReplyMarkupCommon {

  replyMarkup?: ReplyMarkup;
}

export interface _PaidBroadcastCommon {
  paidBroadcast?: boolean;
}

export interface _SendCommon extends _BusinessConnectionIdCommon, _PaidBroadcastCommon {

  disableNotification?: boolean;

  protectContent?: boolean;

  replyTo?: ReplyTo;

  messageThreadId?: number;

  sendAs?: ID;

  effectId?: number;

  sendAt?: number;
}
export interface SendMessageParams extends _SendCommon, _ReplyMarkupCommon {

  parseMode?: ParseMode;

  entities?: MessageEntity[];

  linkPreview?: InputLinkPreview;
}

export interface SendChatActionParams extends _BusinessConnectionIdCommon {
  messageThreadId?: number;
}

export interface _EditMessageTextCommon extends _ReplyMarkupCommon {

  parseMode?: ParseMode;

  entities?: MessageEntity[];

  linkPreview?: LinkPreview;
}

export interface EditMessageTextParams extends _BusinessConnectionIdCommon, _EditMessageTextCommon {
}

export interface EditInlineMessageTextParams extends _EditMessageTextCommon {
}

export interface _EditMessageCaptionCommon extends _ReplyMarkupCommon {

  caption?: string;

  parseMode?: ParseMode;

  entities?: MessageEntity[];
}

export interface EditMessageCaptionParams extends _BusinessConnectionIdCommon, _EditMessageCaptionCommon {
}

export interface EditInlineMessageCaptionParams extends _EditMessageCaptionCommon {
}

export interface EditMessageReplyMarkupParams extends _BusinessConnectionIdCommon, _ReplyMarkupCommon {
}

export interface EditMessageMediaParams extends _BusinessConnectionIdCommon, _ReplyMarkupCommon {
}

export interface EditInlineMessageMediaParams extends _ReplyMarkupCommon {
}

export interface ForwardMessagesParams extends Omit<_SendCommon, "replyToMessageId" | "replyMarkup"> {

  dropSenderName?: boolean;

  dropCaption?: boolean;
}

export interface SendPollParams extends _SendCommon, _ReplyMarkupCommon {

  questionEntities?: MessageEntity[];

  questionParseMode?: ParseMode;

  optionParseMode?: ParseMode;

  isAnonymous?: boolean;

  type?: "quiz" | "regular";

  allowMultipleAnswers?: boolean;

  correctOptionIndex?: number;

  explanation?: string;

  explanationParseMode?: ParseMode;

  explanationEntities?: MessageEntity[];

  openPeriod?: number;

  closeDate?: number;

  isClosed?: boolean;
}

export interface SendInvoiceParams extends _SendCommon, _ReplyMarkupCommon {
  providerToken?: string;
  maxTipAmount?: number;
  suggestedTipAmounts?: number[];
  startParameter?: string;
  providerData?: string;
  photoUrl?: string;
  photoSize?: number;
  photoWidth?: number;
  photoHeight?: number;
  needName?: boolean;
  needPhoneNumber?: boolean;
  needEmail?: boolean;
  needShippingAddress?: boolean;
  sendPhoneNumberToProvider?: boolean;
  sendEmailToProvider?: boolean;
  flexible?: boolean;
}

export interface DownloadChunkParams {

  chunkSize?: number;

  offset?: number;
}

export interface DownloadParams {

  chunkSize?: number;

  offset?: number;

  signal?: AbortSignal;
}

export interface _UploadCommon {

  fileName?: string;

  fileSize?: number;

  mimeType?: string;

  chunkSize?: number;

  signal?: AbortSignal;

  progressId?: string;
}

export interface AnswerInlineQueryParams {

  cacheTime?: number;

  isPersonal?: boolean;

  nextOffset?: string;
  isGallery?: boolean;

  button?: InlineQueryResultButton;
}

export interface SetMyCommandsParams {

  languageCode?: string;

  scope?: BotCommandScope;
}

export type GetMyCommandsParams = SetMyCommandsParams;

export interface DeleteMessagesParams {

  onlyForMe?: boolean;
}

export interface DeleteMessageParams {

  onlyForMe?: boolean;
}

export interface _CaptionCommon {

  caption?: string;

  captionEntities?: MessageEntity[];

  parseMode?: ParseMode;
}
export interface _SpoilCommon {

  hasSpoiler?: boolean;
}
export interface _StarCount {

  starCount?: number;
}
export interface SendPhotoParams extends _CaptionCommon, _SpoilCommon, _UploadCommon, _SendCommon, _ReplyMarkupCommon, _StarCount {

  selfDestruct?: SelfDestructOption;
}

export interface SetChatPhotoParams extends _UploadCommon {
}

export interface _ThumbnailCommon {

  thumbnail?: FileSource;
}
export interface SendDocumentParams extends _CaptionCommon, _ThumbnailCommon, _UploadCommon, _SendCommon {
}

export interface SendStickerParams extends _UploadCommon, _SendCommon {

  emoji?: string;
}

export interface SendVideoParams extends _CaptionCommon, _ThumbnailCommon, _SpoilCommon, _UploadCommon, _SendCommon, _StarCount {

  duration?: number;

  width?: number;

  height?: number;

  supportsStreaming?: boolean;

  selfDestruct?: SelfDestructOption;
}

export interface SendAnimationParams extends _CaptionCommon, _ThumbnailCommon, _SpoilCommon, _UploadCommon, _SendCommon {

  duration?: number;

  width?: number;

  height?: number;
}

export interface SendVoiceParams extends _CaptionCommon, _ThumbnailCommon, _UploadCommon, _SendCommon {

  duration?: number;
}

export interface SendAudioParams extends _CaptionCommon, _ThumbnailCommon, _UploadCommon, _SendCommon {

  duration?: number;

  performer?: string;

  title?: string;
}

export interface SendVideoNoteParams extends _CaptionCommon, _ThumbnailCommon, _UploadCommon, _SendCommon {

  duration?: number;

  length?: number;
}

export interface SendMediaGroupParams extends _SendCommon {
}

export interface SendLocationParams extends _SendCommon, _ReplyMarkupCommon {

  horizontalAccuracy?: number;

  livePeriod?: number;

  heading?: number;

  proximityAlertRadius?: number;
}

export interface SendVenueParams extends _SendCommon, _ReplyMarkupCommon {

  foursquareId?: string;

  foursquareType?: string;
}

export interface SendContactParams extends _SendCommon, _ReplyMarkupCommon {

  lastName?: string;

  vcard?: string;
}

export interface SendDiceParams extends _SendCommon, _ReplyMarkupCommon {

  emoji?: "🎲" | "🎯" | "🏀" | "⚽" | "🎳" | "🎰";
}

export interface ReplyParams {

  quote?: boolean;
}

export interface GetHistoryParams {

  offsetId?: number;

  offsetDate?: number;

  addOffset?: number;

  limit?: number;
}

export interface GetSavedMessagesParams {

  offsetId?: number;

  offsetDate?: number;

  addOffset?: number;

  limit?: number;
}

export interface GetSavedChatsParams {

  offsetId?: number;

  offsetDate?: number;

  offsetChatId?: ID;

  addOffset?: number;

  limit?: number;

  excludePinned?: boolean;
}

export interface SetReactionsParams {

  big?: boolean;

  addToRecents?: boolean;
}

export interface AddReactionParams {

  big?: boolean;

  addToRecents?: boolean;
}

export interface GetChatsParams {

  from?: "main" | "archived";

  after?: ChatListItem;

  limit?: number;
}

export interface PinMessageParams extends _BusinessConnectionIdCommon {

  bothSides?: boolean;

  disableNotification?: boolean;
}

export interface UnpinMessageParams extends _BusinessConnectionIdCommon {
}

export interface BanChatMemberParams {

  until?: number;

  deleteMessages?: boolean;
}

export interface SetChatMemberRightsParams {

  rights?: ChatMemberRights;

  until?: number;
}

export interface CreateStoryParams extends _CaptionCommon, _UploadCommon {

  interactiveAreas?: StoryInteractiveArea[];

  privacy?: StoryPrivacy;

  activeFor?: number;

  highlight?: boolean;

  protectContent?: boolean;
}

export interface SearchMessagesParams {

  chatId?: ID;

  query?: string;

  from?: ID;

  filter?: MessageSearchFilter;

  offset?: number;

  addOffset?: number;

  threadId?: number;

  limit?: number;
}

export interface CreateInviteLinkParams {

  title?: string;

  expireAt?: number;

  limit?: number;

  requireApproval?: boolean;
}

export interface GetCreatedInviteLinksParams {

  by?: ID;

  limit?: number;

  revoked?: boolean;

  afterDate?: number;

  afterInviteLink?: string;
}

export interface StopPollParams extends _BusinessConnectionIdCommon, _ReplyMarkupCommon {
}

export interface EditMessageLiveLocationParams extends _BusinessConnectionIdCommon, _ReplyMarkupCommon {

  horizontalAccuracy?: number;

  heading?: number;

  proximityAlertRadius?: number;
}

export interface SendInlineQueryParams {

  query?: string;

  offset?: string;
}

export interface StartVideoChatParams {

  title?: string;

  liveStream?: boolean;
}

export interface ScheduleVideoChatParams extends StartVideoChatParams {
}

export interface JoinVideoChatParams {

  joinAs?: ID;

  inviteHash?: string;

  audio?: boolean;

  video?: boolean;
}

export interface DownloadLiveStreamSegmentParams {

  quality?: "low" | "medium" | "high";

  signal?: AbortSignal;
}

export interface AnswerPreCheckoutQueryParams {
  error?: string;
}

export interface ApproveJoinRequestsParams {

  inviteLink?: string;
}

export interface DeclineJoinRequestsParams {

  inviteLink?: string;
}

export interface AddChatMemberParams {

  historyLimit?: number;
}

export interface GetChatMembersParams {

  offset?: number;

  limit?: number;
}

export interface CreateGroupParams {

  users?: ID[];

  messageTtl?: number;
}

export interface CreateSupergroupParams {

  description?: string;

  forum?: boolean;

  messageTtl?: number;
}

export interface CreateChannelParams {

  description?: string;

  messageTtl?: number;
}

export interface StartBotParams {

  deeplink?: string;

  chatId?: ID;
}

export interface SetEmojiStatusParams {

  until?: number;
}

export interface AddContactParams {

  firstName?: string;

  lastName?: string;

  sharePhoneNumber?: boolean;
}

export interface UpdateProfileParams {

  firstName?: string;

  lastName?: string;

  bio?: string;
}

export interface GetTranslationsParams {

  platform?: string;

  language?: string;
}

export interface GetCommonChatsParams {

  fromChatId?: ID;

  limit?: number;
}

export interface GetClaimedGiftsParams {

  offset?: string;

  limit?: number;
}

export interface SendGiftParams {

  message?: string;

  parseMode?: ParseMode;

  entities?: MessageEntity[];

  private?: boolean;

  upgrade?: boolean;
}

export interface SetSignaturesEnabledParams {

  showAuthorProfile?: boolean;
}

export interface SetBirthdayParams {

  birthday?: Birthday;
}

export interface SetPersonalChannelParams {

  chatId?: ID;
}

export interface SetNameColorParams {

  customEmojiId?: string;
}

export interface SetProfileColorParams {

  customEmojiId?: string;
}

export interface SetLocationParams {

  address?: string;

  latitude?: number;

  longitude?: number;
}

export interface CreateTopicParams {

  color?: number;

  customEmojiId?: string;

  sendAs?: ID;
}

export interface EditTopicParams {

  customEmojiId?: string;
}

export interface GetLinkPreviewParams {

  parseMode?: ParseMode;

  entities?: MessageEntity[];
}

export interface GetJoinRequestsParams {

  inviteLink?: string;

  search?: string;

  fromDate?: number;

  fromUserId?: ID;

  limit?: number;
}

export interface OpenMiniAppParams {

  mode?: MiniAppMode;

  url?: string;

  startParameter?: string;

  themeParameters?: string;

  disableNotification?: boolean;

  sendAs?: ID;

  fromMenu?: boolean;

  replyTo?: ReplyTo;
}

export interface GetMessageReactionsParams {

  reaction?: Reaction;

  offset?: string;

  limit?: number;
}

export interface PromoteChatMemberParams {

  isAnonymous?: boolean;

  canManageChat?: boolean;

  canDeleteMessages?: boolean;

  canManageVideoChats?: boolean;

  canRestrictMembers?: boolean;

  canPromoteMembers?: boolean;

  canChangeInfo?: boolean;

  canInviteUsers?: boolean;

  canPostMessages?: boolean;

  canEditMessages?: boolean;

  canPinMessages?: boolean;

  canManageTopics?: boolean;

  canPostStories?: boolean;

  canEditStories?: boolean;

  canDeleteStories?: boolean;

  canManageDirectMessages?: boolean;

  title?: string;
}

export interface OpenChatParams {

  timeout?: number;
}
