import { getLogger, type Logger } from "../1_utilities.ts";
import type { Api, Mtproto } from "../2_tl.ts";
import type { DC } from "../3_transport.ts";
import type { BotCommand, BotTokenCheckResult, BusinessConnection, CallbackQueryAnswer, CallbackQueryQuestion, Chat, ChatAction, ChatListItem, ChatMember, ChatP, ChatPChannel, ChatPGroup, ChatPSupergroup, ChatSettings, ClaimedGifts, CodeCheckResult, FailedInvitation, FileSource, Gift, ID, InactiveChat, InlineQueryAnswer, InlineQueryResult, InputMedia, InputStoryContent, InviteLink, JoinRequest, LinkPreview, LiveStreamChannel, Message, MessageAnimation, MessageAudio, MessageContact, MessageDice, MessageDocument, MessageInvoice, MessageLocation, MessagePhoto, MessagePoll, MessageReactionList, MessageSticker, MessageText, MessageVenue, MessageVideo, MessageVideoNote, MessageVoice, MiniAppInfo, NetworkStatistics, ParseMode, PasswordCheckResult, Poll, PriceTag, Reaction, SavedChats, SlowModeDuration, Sticker, StickerSet, Story, Topic, Translation, Update, User, VideoChat, VideoChatActive, VideoChatScheduled, VoiceTranscription } from "../3_types.ts";
import { DOWNLOAD_MAX_CHUNK_SIZE } from "../4_constants.ts";
import type { AddChatMemberParams, AddContactParams, AddReactionParams, AnswerCallbackQueryParams, AnswerInlineQueryParams, AnswerPreCheckoutQueryParams, ApproveJoinRequestsParams, BanChatMemberParams, CreateChannelParams, CreateGroupParams, CreateInviteLinkParams, CreateStoryParams, CreateSupergroupParams, CreateTopicParams, DeclineJoinRequestsParams, DeleteMessageParams, DeleteMessagesParams, DownloadLiveStreamSegmentParams, DownloadParams, EditInlineMessageCaptionParams, EditInlineMessageMediaParams, EditInlineMessageTextParams, EditMessageCaptionParams, EditMessageLiveLocationParams, EditMessageMediaParams, EditMessageReplyMarkupParams, EditMessageTextParams, EditTopicParams, ForwardMessagesParams, GetChatMembersParams, GetChatsParams, GetClaimedGiftsParams, GetCommonChatsParams, GetCreatedInviteLinksParams, GetHistoryParams, GetJoinRequestsParams, GetLinkPreviewParams, GetMessageReactionsParams, GetMyCommandsParams, GetSavedChatsParams, GetSavedMessagesParams, GetTranslationsParams, InvokeParams, JoinVideoChatParams, OpenChatParams, OpenMiniAppParams, PinMessageParams, PromoteChatMemberParams, ScheduleVideoChatParams, SearchMessagesParams, SendAnimationParams, SendAudioParams, SendContactParams, SendDiceParams, SendDocumentParams, SendGiftParams, SendInlineQueryParams, SendInvoiceParams, SendLocationParams, SendMediaGroupParams, SendMessageParams, SendPhotoParams, SendPollParams, SendStickerParams, SendVenueParams, SendVideoNoteParams, SendVideoParams, SendVoiceParams, SetBirthdayParams, SetChatMemberRightsParams, SetChatPhotoParams, SetEmojiStatusParams, SetLocationParams, SetMyCommandsParams, SetNameColorParams, SetPersonalChannelParams, SetProfileColorParams, SetReactionsParams, SetSignaturesEnabledParams, SignInParams, StartBotParams, StartVideoChatParams, StopPollParams, UnpinMessageParams, UpdateProfileParams } from "./0_params.ts";
import { deserializeWorkerError, type WorkerError } from "./0_worker_error.ts";
import type { WorkerRequest } from "./0_worker_request.ts";
import type { ClientGeneric } from "./1_client_generic.ts";
import { type InvokeErrorHandler, skipInvoke } from "./1_invoke_middleware.ts";
import type { WorkerResponse } from "./1_worker_response.ts";
import type { Context } from "./2_context.ts";
import { signIn } from "./2_sign_in.ts";
import { Composer } from "./4_composer.ts";

export interface ClientDispatcherParams {

  storage?: "memory" | "indexeddb" | "denokv";

  parseMode?: ParseMode;

  appVersion?: string;

  deviceModel?: string;

  language?: string;

  platform?: string;

  systemLangCode?: string;

  systemVersion?: string;

  defaultHandlers?: boolean;

  outgoingMessages?: boolean;

  guaranteeUpdateDelivery?: boolean;

  dropPendingUpdates?: boolean;

  persistCache?: boolean;

  disableUpdates?: boolean;

  authString?: string;

  initialDc?: DC;
}

export class ClientDispatcher<C extends Context = Context> extends Composer<C> implements ClientGeneric {
  #worker: Worker;
  #id: string;
  #L: Logger;
  #LsignIn: Logger;

  #pendingRequests = new Map<string, PromiseWithResolvers<any>>();

  constructor(worker: Worker, id: string) {
    super();

    this.#worker = worker;
    this.#id = id;
    this.#L = getLogger("ClientDispatcher").branch(this.#id);
    this.#LsignIn = this.#L.branch("signIn");
  }

  async handleResponse(response: WorkerResponse) {
    if (response.clientId !== this.#id) {
      return;
    }

    this.#L.debug("handling response message", response);

    if (response.isError) {
      this.#pendingRequests.get(response.id)?.reject(deserializeWorkerError(response.data));
      this.#pendingRequests.delete(response.id);
    } else {
      if (response.id === "") {
        try {
          await this.handleUpdate(this, response.data as Update);
        } catch (err) {
          this.#L.error("Error handling update:", err);
        }
      } else {
        this.#pendingRequests.get(response.id)?.resolve(response.data);
        this.#pendingRequests.delete(response.id);
      }
    }
  }

  get id(): string {
    return this.#id;
  }

  async #dispatch(method: string, ...args: unknown[]) {

    const promiseWithResolvers = Promise.withResolvers<any>();

    const id = crypto.randomUUID();
    this.#pendingRequests.set(id, promiseWithResolvers);

    const request: WorkerRequest = {
      type: "request",
      clientId: this.#id,
      id,
      method,
      args,
    };
    this.#L.debug("posted message to worker", request);
    this.#worker.postMessage(request);

    return await promiseWithResolvers.promise;
  }

  #isInited = false;
  async init(params?: ClientDispatcherParams): Promise<void> {
    if (this.#isInited) {
      return;
    }
    this.#isInited = true;

    return await this.#dispatch("initClient", params);
  }

  async connect(): Promise<void> {
    return await this.#dispatch("connect");
  }

  async disconnect(): Promise<void> {
    return await this.#dispatch("disconnect");
  }

  async start(params?: SignInParams) {
    await this.connect();
    await this.signIn(params);
  }

  async #invoke<T extends Api.AnyFunction | Mtproto.ping, R = T extends Mtproto.ping ? Mtproto.pong : T extends Api.AnyGenericFunction<infer X> ? Api.ReturnType<X> : T["_"] extends keyof Api.Functions ? Api.ReturnType<T> extends never ? Api.ReturnType<Api.Functions[T["_"]]> : never : never>(function_: T, params?: InvokeParams): Promise<R> {
    let n = 1;
    while (true) {
      try {
        return await this.#dispatch("invoke", function_, params);
      } catch (err) {
        if (await this.#handleInvokeError(Object.freeze({ client: this, error: err, function: function_, n: n++ }), () => Promise.resolve(false))) {
          continue;
        } else {
          throw err;
        }
      }
    }
  }

  #handleInvokeError = skipInvoke<ClientDispatcher<C>>();

  async handleInvokeError(request: WorkerRequest): Promise<boolean> {
    const args = request.args[0] as { error: WorkerError; function: Api.AnyFunction | Mtproto.ping; n: number };
    return await this.#handleInvokeError({
      client: this,
      error: deserializeWorkerError(args.error),
      function: args.function,
      n: args.n,
    }, () => Promise.resolve(false));
  }

  invoke: {
    <T extends Api.AnyFunction | Mtproto.ping, R = T extends Mtproto.ping ? Mtproto.pong : T extends Api.AnyGenericFunction<infer X> ? Api.ReturnType<X> : T["_"] extends keyof Api.Functions ? Api.ReturnType<T> extends never ? Api.ReturnType<Api.Functions[T["_"]]> : never : never>(function_: T, params?: InvokeParams): Promise<R>;
    use: (handler: InvokeErrorHandler<ClientDispatcher<C>>) => void;
  } = Object.assign(
    this.#invoke,
    {
      use: (handler: InvokeErrorHandler<ClientDispatcher<C>>) => {
        const handle = this.#handleInvokeError;
        this.#handleInvokeError = async (ctx, next) => {
          let result: boolean | null = null;
          return await handle(ctx, async () => {
            if (result !== null) return result;
            result = await handler(ctx, next);
            return result;
          });
        };
      },
    },
  );

  async sendCode(phoneNumber: string): Promise<void> {
    return await this.#dispatch("sendCode", phoneNumber);
  }

  async checkCode(code: string): Promise<CodeCheckResult> {
    return await this.#dispatch("checkCode", code);
  }

  async getPasswordHint(): Promise<string | null> {
    return await this.#dispatch("getPasswordHint");
  }

  async checkPassword(password: string): Promise<PasswordCheckResult> {
    return await this.#dispatch("checkPassword", password);
  }

  async checkBotToken(botToken: string): Promise<BotTokenCheckResult> {
    return await this.#dispatch("checkBotToken", botToken);
  }

  async signIn(params?: SignInParams): Promise<void> {
    await signIn(this, this.#LsignIn, params);
  }

  async signOut(): Promise<void> {
    return await this.#dispatch("signOut");
  }

  async exportAuthString(): Promise<string> {
    return await this.#dispatch("exportAuthString");
  }

  async importAuthString(authString: string): Promise<void> {
    return await this.#dispatch("importAuthString", authString);
  }

  async getInputPeer(id: ID): Promise<Api.InputPeer> {
    return await this.#dispatch("getInputPeer", id);
  }

  async getInputChannel(id: ID): Promise<Api.inputChannel | Api.inputChannelFromMessage> {
    return await this.#dispatch("getInputChannel", id);
  }

  async getInputUser(id: ID): Promise<Api.inputUserSelf | Api.inputUser | Api.inputUserFromMessage> {
    return await this.#dispatch("getInputUser", id);
  }

  async getMe(): Promise<User> {
    return await this.#dispatch("getMe");
  }

  async showUsername(id: ID, username: string): Promise<void> {
    return await this.#dispatch("showUsername", id, username);
  }

  async hideUsername(id: ID, username: string): Promise<void> {
    return await this.#dispatch("hideUsername", id, username);
  }

  async reorderUsernames(id: ID, order: string[]): Promise<boolean> {
    return await this.#dispatch("reorderUsernames", id, order);
  }

  async hideUsernames(id: ID): Promise<boolean> {
    return await this.#dispatch("hideUsernames", id);
  }

  async getBusinessConnection(id: string): Promise<BusinessConnection> {
    return await this.#dispatch("getBusinessConnection", id);
  }

  async setOnline(online: boolean): Promise<void> {
    return await this.#dispatch("setOnline", online);
  }

  async setEmojiStatus(id: string, params?: SetEmojiStatusParams): Promise<void> {
    return await this.#dispatch(id, params);
  }

  async setUserEmojiStatus(userId: ID, id: string, params?: SetEmojiStatusParams): Promise<void> {
    return await this.#dispatch("setUserEmojiStatus", userId, id, params);
  }

  async updateProfile(params?: UpdateProfileParams): Promise<void> {
    return await this.#dispatch("updateProfile", params);
  }

  async setBirthday(params?: SetBirthdayParams): Promise<void> {
    return await this.#dispatch("setBirthday", params);
  }

  async setPersonalChannel(params?: SetPersonalChannelParams): Promise<void> {
    return await this.#dispatch("setPersonalChannel", params);
  }

  async setNameColor(color: number, params?: SetNameColorParams): Promise<void> {
    return await this.#dispatch("setNameColor", color, params);
  }

  async setProfileColor(color: number, params?: SetProfileColorParams): Promise<void> {
    return await this.#dispatch("setProfileColor", color, params);
  }

  async setLocation(params?: SetLocationParams): Promise<void> {
    return await this.#dispatch("setLocation", params);
  }

  async sendMessage(chatId: ID, text: string, params?: SendMessageParams): Promise<MessageText> {
    return await this.#dispatch("sendMessage", chatId, text, params);
  }

  async sendPhoto(chatId: ID, photo: FileSource, params?: SendPhotoParams): Promise<MessagePhoto> {
    return await this.#dispatch("sendPhoto", chatId, photo, params);
  }

  async sendDocument(chatId: ID, document: FileSource, params?: SendDocumentParams): Promise<MessageDocument> {
    return await this.#dispatch("sendDocument", chatId, document, params);
  }

  async sendSticker(chatId: ID, sticker: FileSource, params?: SendStickerParams): Promise<MessageSticker> {
    return await this.#dispatch("sendSticker", chatId, sticker, params);
  }

  async sendVideo(chatId: ID, video: FileSource, params?: SendVideoParams): Promise<MessageVideo> {
    return await this.#dispatch("sendVideo", chatId, video, params);
  }

  async sendAnimation(chatId: ID, animation: FileSource, params?: SendAnimationParams): Promise<MessageAnimation> {
    return await this.#dispatch("sendAnimation", chatId, animation, params);
  }

  async sendVoice(chatId: ID, voice: FileSource, params?: SendVoiceParams): Promise<MessageVoice> {
    return await this.#dispatch("sendVoice", chatId, voice, params);
  }

  async sendAudio(chatId: ID, audio: FileSource, params?: SendAudioParams): Promise<MessageAudio> {
    return await this.#dispatch("sendAudio", chatId, audio, params);
  }

  async sendMediaGroup(chatId: ID, media: InputMedia[], params?: SendMediaGroupParams): Promise<Message[]> {
    return await this.#dispatch("sendMediaGroup", chatId, media, params);
  }

  async sendVideoNote(chatId: ID, videoNote: FileSource, params?: SendVideoNoteParams): Promise<MessageVideoNote> {
    return await this.#dispatch("sendVideoNote", chatId, videoNote, params);
  }

  async sendLocation(chatId: ID, latitude: number, longitude: number, params?: SendLocationParams): Promise<MessageLocation> {
    return await this.#dispatch("sendLocation", chatId, latitude, longitude, params);
  }

  async sendContact(chatId: ID, firstName: string, number: string, params?: SendContactParams): Promise<MessageContact> {
    return await this.#dispatch("sendContact", chatId, firstName, number, params);
  }

  async sendDice(chatId: ID, params?: SendDiceParams): Promise<MessageDice> {
    return await this.#dispatch("sendDice", chatId, params);
  }

  async sendVenue(chatId: ID, latitude: number, longitude: number, title: string, address: string, params?: SendVenueParams): Promise<MessageVenue> {
    return await this.#dispatch("sendVenue", chatId, latitude, longitude, title, address, params);
  }

  async sendPoll(chatId: ID, question: string, options: string[], params?: SendPollParams): Promise<MessagePoll> {
    return await this.#dispatch("sendPoll", chatId, question, options, params);
  }

  async sendInvoice(chatId: ID, title: string, description: string, payload: string, currency: string, prices: PriceTag[], params?: SendInvoiceParams): Promise<MessageInvoice> {
    return await this.#dispatch("sendInvoice", chatId, title, description, payload, currency, prices, params);
  }

  async editMessageText(chatId: ID, messageId: number, text: string, params?: EditMessageTextParams): Promise<MessageText> {
    return await this.#dispatch("editMessageText", chatId, messageId, text, params);
  }

  async editMessageCaption(chatId: ID, messageId: number, params?: EditMessageCaptionParams): Promise<Message> {
    return await this.#dispatch("editMessageCaption", chatId, messageId, params);
  }

  async editMessageMedia(chatId: ID, messageId: number, media: InputMedia, params?: EditMessageMediaParams): Promise<Message> {
    return await this.#dispatch("editMessageMedia", chatId, messageId, media, params);
  }

  async editInlineMessageMedia(inlineMessageId: string, media: InputMedia, params?: EditInlineMessageMediaParams): Promise<void> {
    return await this.#dispatch("editInlineMessageMedia", inlineMessageId, media, params);
  }

  async editInlineMessageText(inlineMessageId: string, text: string, params?: EditInlineMessageTextParams): Promise<void> {
    return await this.#dispatch("editInlineMessageText", inlineMessageId, text, params);
  }

  async editInlineMessageCaption(inlineMessageId: string, params?: EditInlineMessageCaptionParams): Promise<void> {
    return await this.#dispatch("editInlineMessageCaption", inlineMessageId, params);
  }

  async editMessageReplyMarkup(chatId: ID, messageId: number, params?: EditMessageReplyMarkupParams): Promise<Message> {
    return await this.#dispatch("editMessageReplyMarkup", chatId, messageId, params);
  }

  async editInlineMessageReplyMarkup(inlineMessageId: string, params?: EditMessageReplyMarkupParams): Promise<void> {
    return await this.#dispatch("editInlineMessageReplyMarkup", inlineMessageId, params);
  }

  async editMessageLiveLocation(chatId: ID, messageId: number, latitude: number, longitude: number, params?: EditMessageLiveLocationParams): Promise<MessageLocation> {
    return await this.#dispatch("editMessageLiveLocation", chatId, messageId, latitude, longitude, params);
  }

  async editInlineMessageLiveLocation(inlineMessageId: string, latitude: number, longitude: number, params?: EditMessageLiveLocationParams): Promise<void> {
    return await this.#dispatch("editInlineMessageLiveLocation", inlineMessageId, latitude, longitude, params);
  }

  async getMessages(chatId: ID, messageIds: number[]): Promise<Message[]> {
    return await this.#dispatch("getMessages", chatId, messageIds);
  }

  async getMessage(chatId: ID, messageId: number): Promise<Message | null> {
    return await this.#dispatch("getMessage", chatId, messageId);
  }

  async resolveMessageLink(link: string): Promise<Message | null> {
    return await this.#dispatch("resolveMessageLink", link);
  }

  async deleteMessages(chatId: ID, messageIds: number[], params?: DeleteMessagesParams): Promise<void> {
    return await this.#dispatch("deleteMessages", chatId, messageIds, params);
  }

  async deleteMessage(chatId: ID, messageId: number, params?: DeleteMessageParams): Promise<void> {
    return await this.#dispatch("deleteMessage", chatId, messageId, params);
  }

  async deleteChatMemberMessages(chatId: ID, memberId: ID): Promise<void> {
    return await this.#dispatch("deleteChatMemberMessages", chatId, memberId);
  }

  async deleteScheduledMessages(chatId: ID, messageIds: number[]): Promise<void> {
    return await this.#dispatch("deleteScheduledMessages", chatId, messageIds);
  }

  async deleteScheduledMessage(chatId: ID, messageId: number): Promise<void> {
    return await this.#dispatch("deleteScheduledMessage", chatId, messageId);
  }

  async sendScheduledMessages(chatId: ID, messageIds: number[]): Promise<Message[]> {
    return await this.#dispatch("sendScheduledMessages", chatId, messageIds);
  }

  async sendScheduledMessage(chatId: ID, messageId: number): Promise<Message> {
    return await this.#dispatch("sendScheduledMessage", chatId, messageId);
  }

  async pinMessage(chatId: ID, messageId: number, params?: PinMessageParams): Promise<void> {
    return await this.#dispatch("pinMessage", chatId, messageId, params);
  }

  async unpinMessage(chatId: ID, messageId: number, params?: UnpinMessageParams): Promise<void> {
    return await this.#dispatch("unpinMessage", chatId, messageId, params);
  }

  async unpinMessages(chatId: ID): Promise<void> {
    return await this.#dispatch("unpinMessages", chatId);
  }

  async forwardMessages(from: ID, to: ID, messageIds: number[], params?: ForwardMessagesParams): Promise<Message[]> {
    return await this.#dispatch("forwardMessages", from, to, messageIds, params);
  }

  async forwardMessage(from: ID, to: ID, messageId: number, params?: ForwardMessagesParams): Promise<Message> {
    return await this.#dispatch("forwardMessage", from, to, messageId, params);
  }

  async stopPoll(chatId: ID, messageId: number, params?: StopPollParams): Promise<Poll> {
    return await this.#dispatch("stopPoll", chatId, messageId, params);
  }

  async sendChatAction(chatId: ID, action: ChatAction, params?: { messageThreadId?: number }): Promise<void> {
    return await this.#dispatch("sendChatAction", chatId, action, params);
  }

  async searchMessages(params?: SearchMessagesParams): Promise<Message[]> {
    return await this.#dispatch("searchMessages", params);
  }

  async readMessages(chatId: ID, untilMessageId: number): Promise<void> {
    return await this.#dispatch("readMessages", chatId, untilMessageId);
  }

  async startBot(botId: number, params?: StartBotParams): Promise<Message> {
    return await this.#dispatch("startBot", botId, params);
  }

  async transcribeVoice(chatId: ID, messageId: number): Promise<VoiceTranscription> {
    return await this.#dispatch("transcribeVoice", chatId, messageId);
  }

  async getStickerSet(name: string): Promise<StickerSet> {
    return await this.#dispatch("getStickerSet", name);
  }

  async getLinkPreview(text: string, params?: GetLinkPreviewParams): Promise<LinkPreview | null> {
    return await this.#dispatch("getLinkPreview", text, params);
  }

  async openMiniApp(botId: ID, chatId: ID, params?: OpenMiniAppParams): Promise<MiniAppInfo> {
    return await this.#dispatch("openMiniApp", botId, chatId, params);
  }

  async getProgressId(): Promise<string> {
    return await this.#dispatch("getProgressId");
  }

  async getSavedMessages(chatId: ID, params?: GetSavedMessagesParams): Promise<Message[]> {
    return await this.#dispatch("getSavedMessages", chatId, params);
  }

  async getSavedChats(params?: GetSavedChatsParams): Promise<SavedChats> {
    return await this.#dispatch("getSavedChats", params);
  }

  async getMessageReactions(chatId: ID, messageId: number, params?: GetMessageReactionsParams): Promise<MessageReactionList> {
    return await this.#dispatch("getMessageReactions", chatId, messageId, params);
  }

  async vote(chatId: ID, messageId: number, optionIndexes: number[]): Promise<void> {
    return await this.#dispatch("vote", chatId, messageId, optionIndexes);
  }

  async retractVote(chatId: ID, messageId: number): Promise<void> {
    return await this.#dispatch("retractVote", chatId, messageId);
  }

  async downloadChunk(fileId: string, params?: DownloadParams): Promise<Uint8Array> {
    return await this.#dispatch("downloadChunk", fileId, params);
  }

  async *download(fileId: string, params?: DownloadParams): AsyncGenerator<Uint8Array, void, unknown> {
    let offset = 0;
    const chunkSize = params?.chunkSize ?? DOWNLOAD_MAX_CHUNK_SIZE;

    while (true) {
      const chunk = await this.downloadChunk(fileId, { chunkSize, offset });
      yield chunk;

      if (chunk.length < chunkSize) {
        break;
      } else {
        offset += chunk.length;
      }
    }
  }

  async getCustomEmojiStickers(id: string | string[]): Promise<Sticker[]> {
    return await this.#dispatch("getCustomEmojiStickers", id);
  }

  async getChats(params?: GetChatsParams): Promise<ChatListItem[]> {
    return await this.#dispatch("getChats", params);
  }

  async getChat(chatId: ID): Promise<Chat> {
    return await this.#dispatch("getChat", chatId);
  }

  async getHistory(chatId: ID, params?: GetHistoryParams): Promise<Message[]> {
    return await this.#dispatch("getHistory", chatId, params);
  }

  async setAvailableReactions(chatId: ID, availableReactions: "none" | "all" | Reaction[]): Promise<void> {
    return await this.#dispatch("setAvailableReactions", chatId, availableReactions);
  }

  async setChatPhoto(chatId: ID, photo: FileSource, params?: SetChatPhotoParams): Promise<void> {
    return await this.#dispatch("setChatPhoto", chatId, photo, params);
  }

  async deleteChatPhoto(chatId: ID): Promise<void> {
    return await this.#dispatch("deleteChatPhoto", chatId);
  }

  async banChatMember(chatId: ID, memberId: ID, params?: BanChatMemberParams): Promise<void> {
    return await this.#dispatch("banChatMember", chatId, memberId, params);
  }

  async unbanChatMember(chatId: ID, memberId: ID): Promise<void> {
    return await this.#dispatch("unbanChatMember", chatId, memberId);
  }

  async kickChatMember(chatId: ID, memberId: ID): Promise<void> {
    return await this.#dispatch("kickChatMember", chatId, memberId);
  }

  async setChatMemberRights(chatId: ID, memberId: ID, params?: SetChatMemberRightsParams): Promise<void> {
    return await this.#dispatch("setChatMemberRights", chatId, memberId, params);
  }

  async getChatAdministrators(chatId: ID): Promise<ChatMember[]> {
    return await this.#dispatch("getChatAdministrators", chatId);
  }

  async enableJoinRequests(chatId: ID): Promise<void> {
    return await this.#dispatch("enableJoinRequests", chatId);
  }

  async disableJoinRequests(chatId: ID): Promise<void> {
    return await this.#dispatch("disableJoinRequests", chatId);
  }

  async getInactiveChats(): Promise<InactiveChat[]> {
    return await this.#dispatch("getInactiveChats");
  }

  async getCreatedInviteLinks(chatId: ID, params?: GetCreatedInviteLinksParams): Promise<InviteLink[]> {
    return await this.#dispatch("getCreatedInviteLinks", chatId, params);
  }

  async joinChat(chatId: ID): Promise<void> {
    return await this.#dispatch("joinChat", chatId);
  }

  async leaveChat(chatId: ID): Promise<void> {
    return await this.#dispatch("leaveChat", chatId);
  }

  async getChatMember(chatId: ID, userId: ID): Promise<ChatMember> {
    return await this.#dispatch("getChatMember", chatId, userId);
  }

  async getChatMembers(chatId: ID, params?: GetChatMembersParams): Promise<ChatMember[]> {
    return await this.#dispatch("getChatMembers", chatId, params);
  }

  async setChatStickerSet(chatId: ID, setName: string): Promise<void> {
    return await this.#dispatch("setChatStickerSet", chatId, setName);
  }

  async deleteChatStickerSet(chatId: ID): Promise<void> {
    return await this.#dispatch("deleteChatStickerSet", chatId);
  }

  async setBoostsRequiredToCircumventRestrictions(chatId: ID, boosts: number): Promise<void> {
    return await this.#dispatch("setBoostsRequiredToCircumventRestrictions", chatId, boosts);
  }

  async createInviteLink(chatId: ID, params?: CreateInviteLinkParams): Promise<InviteLink> {
    return await this.#dispatch("createInviteLink", chatId, params);
  }

  async approveJoinRequest(chatId: ID, userId: ID): Promise<void> {
    return await this.#dispatch("approveJoinRequest", chatId, userId);
  }

  async declineJoinRequest(chatId: ID, userId: ID): Promise<void> {
    return await this.#dispatch("declineJoinRequest", chatId, userId);
  }

  async approveJoinRequests(chatId: ID, params?: ApproveJoinRequestsParams): Promise<void> {
    return await this.#dispatch("approveJoinRequests", chatId, params);
  }

  async declineJoinRequests(chatId: ID, params?: DeclineJoinRequestsParams): Promise<void> {
    return await this.#dispatch("declineJoinRequests", chatId, params);
  }

  async getJoinRequests(chatId: ID, params?: GetJoinRequestsParams): Promise<JoinRequest[]> {
    return await this.#dispatch("getJoinRequests", chatId, params);
  }

  async addChatMember(chatId: ID, userId: ID, params?: AddChatMemberParams): Promise<FailedInvitation[]> {
    return await this.#dispatch("addChatMember", chatId, userId, params);
  }

  async addChatMembers(chatId: ID, userIds: ID[]): Promise<FailedInvitation[]> {
    return await this.#dispatch("addChatMembers", chatId, userIds);
  }

  async openChat(chatId: ID, params?: OpenChatParams): Promise<void> {
    return await this.#dispatch("openChat", chatId, params);
  }

  async closeChat(chatId: ID): Promise<void> {
    return await this.#dispatch("closeChat", chatId);
  }

  async createGroup(title: string, params?: CreateGroupParams): Promise<ChatPGroup> {
    return await this.#dispatch("createGroup", title, params);
  }

  async createSupergroup(title: string, params?: CreateSupergroupParams): Promise<ChatPSupergroup> {
    return await this.#dispatch("createSupergroup", title, params);
  }

  async createChannel(title: string, params?: CreateChannelParams): Promise<ChatPChannel> {
    return await this.#dispatch("createChannel", title, params);
  }

  async setMessageTtl(chatId: ID, messageTtl: number): Promise<void> {
    return await this.#dispatch("setMessageTtl", chatId, messageTtl);
  }

  async archiveChats(chatIds: ID[]): Promise<void> {
    return await this.#dispatch("archiveChats", chatIds);
  }

  async archiveChat(chatId: ID): Promise<void> {
    return await this.#dispatch("archiveChat", chatId);
  }

  async unarchiveChats(chatIds: ID[]): Promise<void> {
    return await this.#dispatch("unarchiveChats", chatIds);
  }

  async unarchiveChat(chatId: ID): Promise<void> {
    return await this.#dispatch("unarchiveChat", chatId);
  }

  async getCommonChats(userId: ID, params?: GetCommonChatsParams): Promise<ChatP[]> {
    return await this.#dispatch("getCommonChats", userId, params);
  }

  async getChatSettings(chatId: ID): Promise<ChatSettings> {
    return await this.#dispatch("getChatSettings", chatId);
  }

  async disableBusinessBots(chatId: ID): Promise<void> {
    return await this.#dispatch("disableBusinessBots", chatId);
  }

  async enableBusinessBots(chatId: ID): Promise<void> {
    return await this.#dispatch("enableBusinessBots", chatId);
  }

  async disableSlowMode(chatId: ID): Promise<void> {
    return await this.#dispatch("disableSlowMode", chatId);
  }

  async setSlowMode(chatId: ID, duration: SlowModeDuration): Promise<void> {
    return await this.#dispatch("setSlowMode", chatId, duration);
  }

  async setChatTitle(chatId: ID, title: string): Promise<void> {
    return await this.#dispatch("setChatTitle", chatId, title);
  }

  async setChatDescription(chatId: ID, description: string): Promise<void> {
    return await this.#dispatch("setChatDescription", chatId, description);
  }

  async setMemberListVisibility(chatId: ID, visible: boolean): Promise<void> {
    return await this.#dispatch("setMemberListVisibility", chatId, visible);
  }

  async setTopicsEnabled(chatId: ID, enabled: boolean, tabs: boolean): Promise<void> {
    return await this.#dispatch("setTopicsEnabled", chatId, enabled, tabs);
  }

  async setAntispamEnabled(chatId: ID, enabled: boolean): Promise<void> {
    return await this.#dispatch("setAntispamEnabled", chatId, enabled);
  }

  async setSignaturesEnabled(chatId: ID, enabled: boolean, params?: SetSignaturesEnabledParams): Promise<void> {
    return await this.#dispatch("setSignaturesEnabled", chatId, enabled, params);
  }

  async deleteChat(chatId: ID): Promise<void> {
    return await this.#dispatch("deleteChat", chatId);
  }

  async getDiscussionChatSuggestions(): Promise<ChatP[]> {
    return await this.#dispatch("getDiscussionChatSuggestions");
  }

  async setDiscussionChat(chatId: ID, discussionChatId: ID): Promise<void> {
    return await this.#dispatch("setDiscussionChat", chatId, discussionChatId);
  }

  async transferChatOwnership(chatId: ID, userId: ID, password: string): Promise<void> {
    return await this.#dispatch("transferChatOwnership", chatId, userId, password);
  }

  async createTopic(chatId: ID, title: string, params?: CreateTopicParams): Promise<Topic> {
    return await this.#dispatch("createTopic", chatId, title, params);
  }

  async editTopic(chatId: ID, topicId: number, title: string, params?: EditTopicParams): Promise<Topic> {
    return await this.#dispatch("editTopic", chatId, topicId, title, params);
  }

  async hideGeneralTopic(chatId: ID): Promise<void> {
    return await this.#dispatch("hideGeneralTopic", chatId);
  }

  async showGeneralTopic(chatId: ID): Promise<void> {
    return await this.#dispatch("showGeneralTopic", chatId);
  }

  async closeTopic(chatId: ID, topicId: number): Promise<void> {
    return await this.#dispatch("closeTopic", chatId, topicId);
  }

  async reopenTopic(chatId: ID, topicId: number): Promise<void> {
    return await this.#dispatch("reopenTopic", chatId, topicId);
  }

  async pinTopic(chatId: ID, topicId: number): Promise<void> {
    return await this.#dispatch("pinTopic", chatId, topicId);
  }

  async unpinTopic(chatId: ID, topicId: number): Promise<void> {
    return await this.#dispatch("unpinTopic", chatId, topicId);
  }

  async promoteChatMember(chatId: ID, userId: ID, params?: PromoteChatMemberParams): Promise<void> {
    return await this.#dispatch("promoteChatMember", chatId, userId, params);
  }

  async sendCallbackQuery(botId: ID, messageId: number, question: CallbackQueryQuestion): Promise<CallbackQueryAnswer> {
    return await this.#dispatch("sendCallbackQuery", botId, messageId, question);
  }

  async answerCallbackQuery(id: string, params?: AnswerCallbackQueryParams): Promise<void> {
    return await this.#dispatch("answerCallbackQuery", id, params);
  }

  async sendInlineQuery(botId: ID, chatId: ID, params?: SendInlineQueryParams): Promise<InlineQueryAnswer> {
    return await this.#dispatch("sendInlineQuery", botId, chatId, params);
  }

  async answerInlineQuery(id: string, results: InlineQueryResult[], params?: AnswerInlineQueryParams): Promise<void> {
    return await this.#dispatch("answerInlineQuery", id, results, params);
  }

  async setMyDescription(params?: { description?: string; languageCode?: string }): Promise<void> {
    return await this.#dispatch("setMyDescription", params);
  }

  async setMyName(params?: { name?: string; languageCode?: string }): Promise<void> {
    return await this.#dispatch("setMyName", params);
  }

  async setMyShortDescription(params?: { shortDescription?: string; languageCode?: string }): Promise<void> {
    return await this.#dispatch("setMyShortDescription", params);
  }

  async getMyDescription(params?: { languageCode?: string }): Promise<string> {
    return await this.#dispatch("getMyDescription", params);
  }

  async getMyName(params?: { languageCode?: string }): Promise<string> {
    return await this.#dispatch("getMyName", params);
  }

  async getMyShortDescription(params?: { languageCode?: string }): Promise<string> {
    return await this.#dispatch("getMyShortDescription", params);
  }

  async setMyCommands(commands: BotCommand[], params?: SetMyCommandsParams): Promise<void> {
    return await this.#dispatch("setMyCommands", commands, params);
  }

  async getMyCommands(params?: GetMyCommandsParams): Promise<BotCommand[]> {
    return await this.#dispatch("getMyCommands", params);
  }

  async setReactions(chatId: ID, messageId: number, reactions: Reaction[], params?: SetReactionsParams): Promise<void> {
    return await this.#dispatch("setReactions", chatId, messageId, reactions, params);
  }

  async addReaction(chatId: ID, messageId: number, reaction: Reaction, params?: AddReactionParams): Promise<void> {
    return await this.#dispatch("addReaction", chatId, messageId, reaction, params);
  }

  async removeReaction(chatId: ID, messageId: number, reaction: Reaction): Promise<void> {
    return await this.#dispatch("removeReaction", chatId, messageId, reaction);
  }

  async createStory(chatId: ID, content: InputStoryContent, params?: CreateStoryParams): Promise<Story> {
    return await this.#dispatch("createStory", chatId, content, params);
  }

  async getStories(chatId: ID, storyIds: number[]): Promise<Story[]> {
    return await this.#dispatch("getStories", chatId, storyIds);
  }

  async getStory(chatId: ID, storyId: number): Promise<Story | null> {
    return await this.#dispatch("getStory", chatId, storyId);
  }

  async deleteStories(chatId: ID, storyIds: number[]): Promise<void> {
    return await this.#dispatch("deleteStories", chatId, storyIds);
  }

  async deleteStory(chatId: ID, storyId: number): Promise<void> {
    return await this.#dispatch("deleteStory", chatId, storyId);
  }

  async addStoriesToHighlights(chatId: ID, storyIds: number[]): Promise<void> {
    return await this.#dispatch("addStoriesToHighlights", chatId, storyIds);
  }

  async addStoryToHighlights(chatId: ID, storyId: number): Promise<void> {
    return await this.#dispatch("addStoryToHighlights", chatId, storyId);
  }

  async removeStoriesFromHighlights(chatId: ID, storyIds: number[]): Promise<void> {
    return await this.#dispatch("removeStoriesFromHighlights", chatId, storyIds);
  }

  async removeStoryFromHighlights(chatId: ID, storyId: number): Promise<void> {
    return await this.#dispatch("removeStoryFromHighlights", chatId, storyId);
  }

  async getNetworkStatistics(): Promise<NetworkStatistics> {
    return await this.#dispatch("getNetworkStatistics");
  }

  async blockUser(userId: ID): Promise<void> {
    return await this.#dispatch("blockUser", userId);
  }

  async unblockUser(userId: ID): Promise<void> {
    return await this.#dispatch("unblockUser", userId);
  }

  async startVideoChat(chatId: ID, params?: StartVideoChatParams): Promise<VideoChatActive> {
    return await this.#dispatch("startVideoChat", chatId, params);
  }

  async scheduleVideoChat(chatId: ID, startAt: number, params?: ScheduleVideoChatParams): Promise<VideoChatScheduled> {
    return await this.#dispatch("scheduleVideoChat", chatId, startAt, params);
  }

  async joinVideoChat(id: string, params_: string, params?: JoinVideoChatParams): Promise<string> {
    return await this.#dispatch("joinVideoChat", id, params_, params);
  }

  async leaveVideoChat(id: string): Promise<void> {
    return await this.#dispatch("leaveVideoChat", id);
  }

  async joinLiveStream(id: string): Promise<void> {
    return await this.#dispatch("joinLiveStream", id);
  }

  async getVideoChat(id: string): Promise<VideoChat> {
    return await this.#dispatch("getVideoChat", id);
  }

  async getLiveStreamChannels(id: string): Promise<LiveStreamChannel[]> {
    return await this.#dispatch("getLiveStreamChannels", id);
  }

  async downloadLiveStreamSegment(id: string, channelId: number, scale: number, timestamp: number, params?: DownloadLiveStreamSegmentParams): Promise<Uint8Array> {
    return await this.#dispatch("downloadLiveStreamSegment", id, channelId, scale, timestamp, params);
  }

  async answerPreCheckoutQuery(preCheckoutQueryId: string, ok: boolean, params?: AnswerPreCheckoutQueryParams): Promise<void> {
    return await this.#dispatch("answerPreCheckoutQuery", preCheckoutQueryId, ok, params);
  }

  async refundStarPayment(userId: ID, telegramPaymentChargeId: string): Promise<void> {
    return await this.#dispatch("refundStarPayment", userId, telegramPaymentChargeId);
  }

  async getContacts(): Promise<User[]> {
    return await this.#dispatch("getContacts");
  }

  async deleteContacts(userIds: ID[]): Promise<void> {
    return await this.#dispatch("deleteContacts", userIds);
  }

  async deleteContact(userId: ID): Promise<void> {
    return await this.#dispatch("deleteContact", userId);
  }

  async addContact(userId: ID, params?: AddContactParams): Promise<void> {
    return await this.#dispatch("addContact", userId, params);
  }

  async getTranslations(params?: GetTranslationsParams): Promise<Translation[]> {
    return await this.#dispatch("getTranslations", params);
  }

  async getGifts(): Promise<Gift[]> {
    return await this.#dispatch("getGifts");
  }

  async getClaimedGifts(chatId: ID, params?: GetClaimedGiftsParams): Promise<ClaimedGifts> {
    return await this.#dispatch("getClaimedGifts", chatId, params);
  }

  async sendGift(chatId: ID, giftId: string, params?: SendGiftParams): Promise<void> {
    return await this.#dispatch("sendGift", chatId, giftId, params);
  }

  async sellGift(userId: ID, messageId: number): Promise<void> {
    return await this.#dispatch("sellGift", userId, messageId);
  }

  async getGift(slug: string): Promise<Gift> {
    return await this.#dispatch("getGift", slug);
  }
}
