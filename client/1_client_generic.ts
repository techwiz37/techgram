import type { Api, Mtproto } from "../2_tl.ts";
import type { BotCommand, BotTokenCheckResult, BusinessConnection, CallbackQueryAnswer, CallbackQueryQuestion, Chat, ChatAction, ChatListItem, ChatMember, ChatP, ChatPChannel, ChatPGroup, ChatPSupergroup, ChatSettings, ClaimedGifts, CodeCheckResult, FailedInvitation, FileSource, Gift, ID, InactiveChat, InlineQueryAnswer, InlineQueryResult, InputMedia, InputStoryContent, InviteLink, JoinRequest, LinkPreview, LiveStreamChannel, Message, MessageAnimation, MessageAudio, MessageContact, MessageDice, MessageDocument, MessageInvoice, MessageLocation, MessagePhoto, MessagePoll, MessageReactionList, MessageSticker, MessageText, MessageVenue, MessageVideo, MessageVideoNote, MessageVoice, MiniAppInfo, NetworkStatistics, PasswordCheckResult, Poll, PriceTag, Reaction, SavedChats, SlowModeDuration, Sticker, StickerSet, Story, Topic, Translation, User, VideoChat, VideoChatActive, VideoChatScheduled, VoiceTranscription } from "../3_types.ts";
import type { AddChatMemberParams, AddContactParams, AddReactionParams, AnswerCallbackQueryParams, AnswerInlineQueryParams, AnswerPreCheckoutQueryParams, ApproveJoinRequestsParams, BanChatMemberParams, CreateChannelParams, CreateGroupParams, CreateInviteLinkParams, CreateStoryParams, CreateSupergroupParams, CreateTopicParams, DeclineJoinRequestsParams, DeleteMessageParams, DeleteMessagesParams, DownloadLiveStreamSegmentParams, DownloadParams, EditInlineMessageCaptionParams, EditInlineMessageMediaParams, EditInlineMessageTextParams, EditMessageCaptionParams, EditMessageLiveLocationParams, EditMessageMediaParams, EditMessageReplyMarkupParams, EditMessageTextParams, EditTopicParams, ForwardMessagesParams, GetChatMembersParams, GetChatsParams, GetClaimedGiftsParams, GetCommonChatsParams, GetCreatedInviteLinksParams, GetHistoryParams, GetJoinRequestsParams, GetLinkPreviewParams, GetMessageReactionsParams, GetMyCommandsParams, GetSavedChatsParams, GetSavedMessagesParams, GetTranslationsParams, InvokeParams, JoinVideoChatParams, OpenChatParams, OpenMiniAppParams, PinMessageParams, PromoteChatMemberParams, ScheduleVideoChatParams, SearchMessagesParams, SendAnimationParams, SendAudioParams, SendContactParams, SendDiceParams, SendDocumentParams, SendGiftParams, SendInlineQueryParams, SendInvoiceParams, SendLocationParams, SendMediaGroupParams, SendMessageParams, SendPhotoParams, SendPollParams, SendStickerParams, SendVenueParams, SendVideoNoteParams, SendVideoParams, SendVoiceParams, SetBirthdayParams, SetChatMemberRightsParams, SetChatPhotoParams, SetEmojiStatusParams, SetLocationParams, SetMyCommandsParams, SetNameColorParams, SetPersonalChannelParams, SetProfileColorParams, SetReactionsParams, SetSignaturesEnabledParams, SignInParams, StartBotParams, StartVideoChatParams, StopPollParams, UnpinMessageParams, UpdateProfileParams } from "./0_params.ts";

export abstract class ClientGeneric {
  abstract connect(): Promise<void>;

  abstract disconnect(): Promise<void>;

  abstract start(params?: SignInParams): Promise<void>;

  abstract invoke<T extends Api.AnyFunction | Mtproto.ping, R = T extends Mtproto.ping ? Mtproto.pong : T extends Api.AnyGenericFunction<infer X> ? Api.ReturnType<X> : T["_"] extends keyof Api.Functions ? Api.ReturnType<T> extends never ? Api.ReturnType<Api.Functions[T["_"]]> : never : never>(function_: T, params?: InvokeParams): Promise<R>;

  abstract sendCode(phoneNumber: string): Promise<void>;

  abstract checkCode(code: string): Promise<CodeCheckResult>;

  abstract getPasswordHint(): Promise<string | null>;

  abstract checkPassword(password: string): Promise<PasswordCheckResult>;

  abstract checkBotToken(botToken: string): Promise<BotTokenCheckResult>;

  abstract signIn(params?: SignInParams): Promise<void>;

  abstract signOut(): Promise<void>;

  abstract exportAuthString(): Promise<string>;

  abstract importAuthString(authString: string): Promise<void>;

  abstract getInputPeer(id: ID): Promise<Api.InputPeer>;

  abstract getInputChannel(id: ID): Promise<Api.inputChannel | Api.inputChannelFromMessage>;

  abstract getInputUser(id: ID): Promise<Api.inputUserSelf | Api.inputUser | Api.inputUserFromMessage>;

  abstract getMe(): Promise<User>;

  abstract showUsername(id: ID, username: string): Promise<void>;

  abstract hideUsername(id: ID, username: string): Promise<void>;

  abstract reorderUsernames(id: ID, order: string[]): Promise<boolean>;

  abstract hideUsernames(id: ID): Promise<boolean>;

  abstract getBusinessConnection(id: string): Promise<BusinessConnection>;

  abstract setOnline(online: boolean): Promise<void>;

  abstract setEmojiStatus(id: string, params?: SetEmojiStatusParams): Promise<void>;

  abstract setUserEmojiStatus(userId: ID, id: string, params?: SetEmojiStatusParams): Promise<void>;

  abstract updateProfile(params?: UpdateProfileParams): Promise<void>;

  abstract setBirthday(params?: SetBirthdayParams): Promise<void>;

  abstract setPersonalChannel(params?: SetPersonalChannelParams): Promise<void>;

  abstract setNameColor(color: number, params?: SetNameColorParams): Promise<void>;

  abstract setProfileColor(color: number, params?: SetProfileColorParams): Promise<void>;

  abstract setLocation(params?: SetLocationParams): Promise<void>;

  abstract sendMessage(chatId: ID, text: string, params?: SendMessageParams): Promise<MessageText>;

  abstract sendPhoto(chatId: ID, photo: FileSource, params?: SendPhotoParams): Promise<MessagePhoto>;

  abstract sendDocument(chatId: ID, document: FileSource, params?: SendDocumentParams): Promise<MessageDocument>;

  abstract sendSticker(chatId: ID, sticker: FileSource, params?: SendStickerParams): Promise<MessageSticker>;

  abstract sendVideo(chatId: ID, video: FileSource, params?: SendVideoParams): Promise<MessageVideo>;

  abstract sendAnimation(chatId: ID, animation: FileSource, params?: SendAnimationParams): Promise<MessageAnimation>;

  abstract sendVoice(chatId: ID, voice: FileSource, params?: SendVoiceParams): Promise<MessageVoice>;

  abstract sendAudio(chatId: ID, audio: FileSource, params?: SendAudioParams): Promise<MessageAudio>;

  abstract sendMediaGroup(chatId: ID, media: InputMedia[], params?: SendMediaGroupParams): Promise<Message[]>;

  abstract sendVideoNote(chatId: ID, videoNote: FileSource, params?: SendVideoNoteParams): Promise<MessageVideoNote>;

  abstract sendLocation(chatId: ID, latitude: number, longitude: number, params?: SendLocationParams): Promise<MessageLocation>;

  abstract sendContact(chatId: ID, firstName: string, number: string, params?: SendContactParams): Promise<MessageContact>;

  abstract sendDice(chatId: ID, params?: SendDiceParams): Promise<MessageDice>;

  abstract sendVenue(chatId: ID, latitude: number, longitude: number, title: string, address: string, params?: SendVenueParams): Promise<MessageVenue>;

  abstract sendPoll(chatId: ID, question: string, options: string[], params?: SendPollParams): Promise<MessagePoll>;

  abstract sendInvoice(chatId: ID, title: string, description: string, payload: string, currency: string, prices: PriceTag[], params?: SendInvoiceParams): Promise<MessageInvoice>;

  abstract editMessageText(chatId: ID, messageId: number, text: string, params?: EditMessageTextParams): Promise<MessageText>;

  abstract editMessageCaption(chatId: ID, messageId: number, params?: EditMessageCaptionParams): Promise<Message>;

  abstract editMessageMedia(chatId: ID, messageId: number, media: InputMedia, params?: EditMessageMediaParams): Promise<Message>;

  abstract editInlineMessageMedia(inlineMessageId: string, media: InputMedia, params?: EditInlineMessageMediaParams): Promise<void>;

  abstract editInlineMessageText(inlineMessageId: string, text: string, params?: EditInlineMessageTextParams): Promise<void>;

  abstract editInlineMessageCaption(inlineMessageId: string, params?: EditInlineMessageCaptionParams): Promise<void>;

  abstract editMessageReplyMarkup(
    chatId: ID,
    messageId: number,
    params?: EditMessageReplyMarkupParams,
  ): Promise<Message>;

  abstract editInlineMessageReplyMarkup(inlineMessageId: string, params?: EditMessageReplyMarkupParams): Promise<void>;

  abstract editMessageLiveLocation(
    chatId: ID,
    messageId: number,
    latitude: number,
    longitude: number,
    params?: EditMessageLiveLocationParams,
  ): Promise<MessageLocation>;

  abstract editInlineMessageLiveLocation(
    inlineMessageId: string,
    latitude: number,
    longitude: number,
    params?: EditMessageLiveLocationParams,
  ): Promise<void>;

  abstract getMessages(chatId: ID, messageIds: number[]): Promise<Message[]>;

  abstract getMessage(chatId: ID, messageId: number): Promise<Message | null>;

  abstract resolveMessageLink(link: string): Promise<Message | null>;

  abstract deleteMessages(chatId: ID, messageIds: number[], params?: DeleteMessagesParams): Promise<void>;

  abstract deleteMessage(chatId: ID, messageId: number, params?: DeleteMessageParams): Promise<void>;

  abstract deleteChatMemberMessages(chatId: ID, memberId: ID): Promise<void>;

  abstract deleteScheduledMessages(chatId: ID, messageIds: number[]): Promise<void>;

  abstract deleteScheduledMessage(chatId: ID, messageId: number): Promise<void>;

  abstract sendScheduledMessages(chatId: ID, messageIds: number[]): Promise<Message[]>;

  abstract sendScheduledMessage(chatId: ID, messageId: number): Promise<Message>;

  abstract pinMessage(chatId: ID, messageId: number, params?: PinMessageParams): Promise<void>;

  abstract unpinMessage(chatId: ID, messageId: number, params?: UnpinMessageParams): Promise<void>;

  abstract unpinMessages(chatId: ID): Promise<void>;

  abstract forwardMessages(from: ID, to: ID, messageIds: number[], params?: ForwardMessagesParams): Promise<Message[]>;

  abstract forwardMessage(from: ID, to: ID, messageId: number, params?: ForwardMessagesParams): Promise<Message>;

  abstract stopPoll(chatId: ID, messageId: number, params?: StopPollParams): Promise<Poll>;

  abstract sendChatAction(chatId: ID, action: ChatAction, params?: { messageThreadId?: number }): Promise<void>;

  abstract searchMessages(params?: SearchMessagesParams): Promise<Message[]>;

  abstract readMessages(chatId: ID, untilMessageId: number): Promise<void>;

  abstract startBot(botId: number, params?: StartBotParams): Promise<Message>;

  abstract transcribeVoice(chatId: ID, messageId: number): Promise<VoiceTranscription>;

  abstract getStickerSet(name: string): Promise<StickerSet>;

  abstract getLinkPreview(text: string, params?: GetLinkPreviewParams): Promise<LinkPreview | null>;

  abstract openMiniApp(botId: ID, chatId: ID, params?: OpenMiniAppParams): Promise<MiniAppInfo>;

  abstract getProgressId(): Promise<string>;

  abstract getSavedMessages(chatId: ID, params?: GetSavedMessagesParams): Promise<Message[]>;

  abstract getSavedChats(params?: GetSavedChatsParams): Promise<SavedChats>;

  abstract getMessageReactions(chatId: ID, messageId: number, params?: GetMessageReactionsParams): Promise<MessageReactionList>;

  abstract vote(chatId: ID, messageId: number, optionIndexes: number[]): Promise<void>;

  abstract retractVote(chatId: ID, messageId: number): Promise<void>;

  abstract downloadChunk(fileId: string, params?: DownloadParams): Promise<Uint8Array>;

  abstract download(fileId: string, params?: DownloadParams): AsyncGenerator<Uint8Array, void, unknown>;

  abstract getCustomEmojiStickers(id: string | string[]): Promise<Sticker[]>;

  abstract getChats(params?: GetChatsParams): Promise<ChatListItem[]>;

  abstract getChat(chatId: ID): Promise<Chat>;

  abstract getHistory(chatId: ID, params?: GetHistoryParams): Promise<Message[]>;

  abstract setAvailableReactions(chatId: ID, availableReactions: "none" | "all" | Reaction[]): Promise<void>;

  abstract setChatPhoto(chatId: ID, photo: FileSource, params?: SetChatPhotoParams): Promise<void>;

  abstract deleteChatPhoto(chatId: ID): Promise<void>;

  abstract banChatMember(chatId: ID, memberId: ID, params?: BanChatMemberParams): Promise<void>;

  abstract unbanChatMember(chatId: ID, memberId: ID): Promise<void>;

  abstract kickChatMember(chatId: ID, memberId: ID): Promise<void>;

  abstract setChatMemberRights(chatId: ID, memberId: ID, params?: SetChatMemberRightsParams): Promise<void>;

  abstract getChatAdministrators(chatId: ID): Promise<ChatMember[]>;

  abstract enableJoinRequests(chatId: ID): Promise<void>;

  abstract disableJoinRequests(chatId: ID): Promise<void>;

  abstract getInactiveChats(): Promise<InactiveChat[]>;

  abstract getCreatedInviteLinks(chatId: ID, params?: GetCreatedInviteLinksParams): Promise<InviteLink[]>;

  abstract joinChat(chatId: ID): Promise<void>;

  abstract leaveChat(chatId: ID): Promise<void>;

  abstract getChatMember(chatId: ID, userId: ID): Promise<ChatMember>;

  abstract getChatMembers(chatId: ID, params?: GetChatMembersParams): Promise<ChatMember[]>;

  abstract setChatStickerSet(chatId: ID, setName: string): Promise<void>;

  abstract deleteChatStickerSet(chatId: ID): Promise<void>;

  abstract setBoostsRequiredToCircumventRestrictions(chatId: ID, boosts: number): Promise<void>;

  abstract createInviteLink(chatId: ID, params?: CreateInviteLinkParams): Promise<InviteLink>;

  abstract approveJoinRequest(chatId: ID, userId: ID): Promise<void>;

  abstract declineJoinRequest(chatId: ID, userId: ID): Promise<void>;

  abstract approveJoinRequests(chatId: ID, params?: ApproveJoinRequestsParams): Promise<void>;

  abstract declineJoinRequests(chatId: ID, params?: DeclineJoinRequestsParams): Promise<void>;

  abstract getJoinRequests(chatId: ID, params?: GetJoinRequestsParams): Promise<JoinRequest[]>;

  abstract addChatMember(chatId: ID, userId: ID, params?: AddChatMemberParams): Promise<FailedInvitation[]>;

  abstract addChatMembers(chatId: ID, userIds: ID[]): Promise<FailedInvitation[]>;

  abstract openChat(chatId: ID, params?: OpenChatParams): Promise<void>;

  abstract closeChat(chatId: ID): Promise<void>;

  abstract createGroup(title: string, params?: CreateGroupParams): Promise<ChatPGroup>;

  abstract createSupergroup(title: string, params?: CreateSupergroupParams): Promise<ChatPSupergroup>;

  abstract createChannel(title: string, params?: CreateChannelParams): Promise<ChatPChannel>;

  abstract setMessageTtl(chatId: ID, messageTtl: number): Promise<void>;

  abstract archiveChats(chatIds: ID[]): Promise<void>;

  abstract archiveChat(chatId: ID): Promise<void>;

  abstract unarchiveChats(chatIds: ID[]): Promise<void>;

  abstract unarchiveChat(chatId: ID): Promise<void>;

  abstract getCommonChats(userId: ID, params?: GetCommonChatsParams): Promise<ChatP[]>;

  abstract getChatSettings(chatId: ID): Promise<ChatSettings>;

  abstract disableBusinessBots(chatId: ID): Promise<void>;

  abstract enableBusinessBots(chatId: ID): Promise<void>;

  abstract disableSlowMode(chatId: ID): Promise<void>;

  abstract setSlowMode(chatId: ID, duration: SlowModeDuration): Promise<void>;

  abstract setChatTitle(chatId: ID, title: string): Promise<void>;

  abstract setChatDescription(chatId: ID, description: string): Promise<void>;

  abstract setMemberListVisibility(chatId: ID, visible: boolean): Promise<void>;

  abstract setTopicsEnabled(chatId: ID, enabled: boolean, tabs: boolean): Promise<void>;

  abstract setAntispamEnabled(chatId: ID, enabled: boolean): Promise<void>;

  abstract setSignaturesEnabled(chatId: ID, enabled: boolean, params?: SetSignaturesEnabledParams): Promise<void>;

  abstract deleteChat(chatId: ID): Promise<void>;

  abstract getDiscussionChatSuggestions(): Promise<ChatP[]>;

  abstract setDiscussionChat(chatId: ID, discussionChatId: ID): Promise<void>;

  abstract transferChatOwnership(chatId: ID, userId: ID, password: string): Promise<void>;

  abstract createTopic(chatId: ID, title: string, params?: CreateTopicParams): Promise<Topic>;

  abstract editTopic(chatId: ID, topicId: number, title: string, params?: EditTopicParams): Promise<Topic>;

  abstract hideGeneralTopic(chatId: ID): Promise<void>;

  abstract showGeneralTopic(chatId: ID): Promise<void>;

  abstract closeTopic(chatId: ID, topicId: number): Promise<void>;

  abstract reopenTopic(chatId: ID, topicId: number): Promise<void>;

  abstract pinTopic(chatId: ID, topicId: number): Promise<void>;

  abstract unpinTopic(chatId: ID, topicId: number): Promise<void>;

  abstract promoteChatMember(chatId: ID, userId: ID, params?: PromoteChatMemberParams): Promise<void>;

  abstract sendCallbackQuery(botId: ID, messageId: number, question: CallbackQueryQuestion): Promise<CallbackQueryAnswer>;

  abstract answerCallbackQuery(id: string, params?: AnswerCallbackQueryParams): Promise<void>;

  abstract sendInlineQuery(botId: ID, chatId: ID, params?: SendInlineQueryParams): Promise<InlineQueryAnswer>;

  abstract answerInlineQuery(id: string, results: InlineQueryResult[], params?: AnswerInlineQueryParams): Promise<void>;

  abstract setMyDescription(params?: { description?: string; languageCode?: string }): Promise<void>;

  abstract setMyName(params?: { name?: string; languageCode?: string }): Promise<void>;

  abstract setMyShortDescription(params?: { shortDescription?: string; languageCode?: string }): Promise<void>;

  abstract getMyDescription(params?: { languageCode?: string }): Promise<string>;

  abstract getMyName(params?: { languageCode?: string }): Promise<string>;

  abstract getMyShortDescription(params?: { languageCode?: string }): Promise<string>;

  abstract setMyCommands(commands: BotCommand[], params?: SetMyCommandsParams): Promise<void>;

  abstract getMyCommands(params?: GetMyCommandsParams): Promise<BotCommand[]>;

  abstract setReactions(chatId: ID, messageId: number, reactions: Reaction[], params?: SetReactionsParams): Promise<void>;

  abstract addReaction(chatId: ID, messageId: number, reaction: Reaction, params?: AddReactionParams): Promise<void>;

  abstract removeReaction(chatId: ID, messageId: number, reaction: Reaction): Promise<void>;

  abstract createStory(chatId: ID, content: InputStoryContent, params?: CreateStoryParams): Promise<Story>;

  abstract getStories(chatId: ID, storyIds: number[]): Promise<Story[]>;

  abstract getStory(chatId: ID, storyId: number): Promise<Story | null>;

  abstract deleteStories(chatId: ID, storyIds: number[]): Promise<void>;

  abstract deleteStory(chatId: ID, storyId: number): Promise<void>;

  abstract addStoriesToHighlights(chatId: ID, storyIds: number[]): Promise<void>;

  abstract addStoryToHighlights(chatId: ID, storyId: number): Promise<void>;

  abstract removeStoriesFromHighlights(chatId: ID, storyIds: number[]): Promise<void>;

  abstract removeStoryFromHighlights(chatId: ID, storyId: number): Promise<void>;

  abstract getNetworkStatistics(): Promise<NetworkStatistics>;

  abstract blockUser(userId: ID): Promise<void>;

  abstract unblockUser(userId: ID): Promise<void>;

  abstract startVideoChat(chatId: ID, params?: StartVideoChatParams): Promise<VideoChatActive>;

  abstract scheduleVideoChat(chatId: ID, startAt: number, params?: ScheduleVideoChatParams): Promise<VideoChatScheduled>;

  abstract joinVideoChat(id: string, params_: string, params?: JoinVideoChatParams): Promise<string>;

  abstract leaveVideoChat(id: string): Promise<void>;

  abstract joinLiveStream(id: string): Promise<void>;

  abstract getVideoChat(id: string): Promise<VideoChat>;

  abstract getLiveStreamChannels(id: string): Promise<LiveStreamChannel[]>;

  abstract downloadLiveStreamSegment(id: string, channelId: number, scale: number, timestamp: number, params?: DownloadLiveStreamSegmentParams): Promise<Uint8Array>;

  abstract answerPreCheckoutQuery(preCheckoutQueryId: string, ok: boolean, params?: AnswerPreCheckoutQueryParams): Promise<void>;

  abstract refundStarPayment(userId: ID, telegramPaymentChargeId: string): Promise<void>;

  abstract getContacts(): Promise<User[]>;

  abstract deleteContacts(userIds: ID[]): Promise<void>;

  abstract deleteContact(userId: ID): Promise<void>;

  abstract addContact(userId: ID, params?: AddContactParams): Promise<void>;

  abstract getTranslations(params?: GetTranslationsParams): Promise<Translation[]>;

  abstract getGifts(): Promise<Gift[]>;

  abstract getClaimedGifts(chatId: ID, params?: GetClaimedGiftsParams): Promise<ClaimedGifts>;

  abstract sendGift(chatId: ID, giftId: string, params?: SendGiftParams): Promise<void>;

  abstract sellGift(userId: ID, messageId: number): Promise<void>;

  abstract getGift(slug: string): Promise<Gift>;
}
