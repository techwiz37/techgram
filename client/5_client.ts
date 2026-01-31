import { delay, MINUTE, SECOND, unreachable } from "../0_deps.ts";
import { AccessError, ConnectionError, InputError } from "../0_errors.ts";
import { drop, getLogger, type Logger, type MaybePromise, Mutex, ZERO_CHANNEL_ID } from "../1_utilities.ts";
import { type Storage, StorageMemory } from "../2_storage.ts";
import { Api, Mtproto } from "../2_tl.ts";
import { type DC, getDcId, type TransportProvider } from "../3_transport.ts";
import { type BotCommand, type BotTokenCheckResult, type BusinessConnection, type CallbackQueryAnswer, type CallbackQueryQuestion, type Chat, type ChatAction, type ChatListItem, type ChatMember, type ChatP, type ChatPChannel, type ChatPGroup, type ChatPPrivate, type ChatPSupergroup, type ChatSettings, type ClaimedGifts, type ConnectionState, constructChatP, constructUser2, type FailedInvitation, type FileSource, type Gift, type ID, type InactiveChat, type InlineQueryAnswer, type InlineQueryResult, type InputMedia, type InputStoryContent, type InviteLink, type JoinRequest, type LinkPreview, type LiveStreamChannel, type Message, type MessageAnimation, type MessageAudio, type MessageContact, type MessageDice, type MessageDocument, type MessageInvoice, type MessageLocation, type MessagePhoto, type MessagePoll, type MessageReactionList, type MessageSticker, type MessageText, type MessageVenue, type MessageVideo, type MessageVideoNote, type MessageVoice, type MiniAppInfo, type NetworkStatistics, type ParseMode, type PasswordCheckResult, type Poll, type PriceTag, type Reaction, type SavedChats, type SlowModeDuration, type Sticker, type StickerSet, type Story, type Topic, type Translation, type Update, type User, type VideoChat, type VideoChatActive, type VideoChatScheduled, type VoiceTranscription } from "../3_types.ts";
import { APP_VERSION, DEVICE_MODEL, INITIAL_DC, LANG_CODE, LANG_PACK, MAX_CHANNEL_ID, MAX_CHAT_ID, type PublicKeys, SYSTEM_LANG_CODE, SYSTEM_VERSION, USERNAME_TTL } from "../4_constants.ts";
import { AuthKeyUnregistered, FloodWait, Migrate, SessionRevoked } from "../4_errors.ts";
import { peerToChatId } from "../tl/2_telegram.ts";
import type { CodeCheckResult } from "../types/0_code_check_result.ts";
import { AbortableLoop } from "./0_abortable_loop.ts";
import type { AddChatMemberParams, AddContactParams, AddReactionParams, AnswerCallbackQueryParams, AnswerInlineQueryParams, AnswerPreCheckoutQueryParams, ApproveJoinRequestsParams, BanChatMemberParams, CreateChannelParams, CreateGroupParams, CreateInviteLinkParams, CreateStoryParams, CreateSupergroupParams, CreateTopicParams, DeclineJoinRequestsParams, DeleteMessageParams, DeleteMessagesParams, DownloadLiveStreamSegmentParams, DownloadParams, EditInlineMessageCaptionParams, EditInlineMessageMediaParams, EditInlineMessageTextParams, EditMessageCaptionParams, EditMessageLiveLocationParams, EditMessageMediaParams, EditMessageReplyMarkupParams, EditMessageTextParams, EditTopicParams, ForwardMessagesParams, GetChatMembersParams, GetChatsParams, GetClaimedGiftsParams, GetCommonChatsParams, GetCreatedInviteLinksParams, GetHistoryParams, GetJoinRequestsParams, GetLinkPreviewParams, GetMessageReactionsParams, GetMyCommandsParams, GetSavedChatsParams, GetSavedMessagesParams, GetTranslationsParams, InvokeParams, JoinVideoChatParams, OpenChatParams, OpenMiniAppParams, PinMessageParams, PromoteChatMemberParams, ScheduleVideoChatParams, SearchMessagesParams, SendAnimationParams, SendAudioParams, SendContactParams, SendDiceParams, SendDocumentParams, SendGiftParams, SendInlineQueryParams, SendInvoiceParams, SendLocationParams, SendMediaGroupParams, SendMessageParams, SendPhotoParams, SendPollParams, SendStickerParams, SendVenueParams, SendVideoNoteParams, SendVideoParams, SendVoiceParams, SetBirthdayParams, SetChatMemberRightsParams, SetChatPhotoParams, SetEmojiStatusParams, SetLocationParams, SetMyCommandsParams, SetNameColorParams, SetPersonalChannelParams, SetProfileColorParams, SetReactionsParams, SetSignaturesEnabledParams, SignInParams, StartBotParams, StartVideoChatParams, StopPollParams, UnpinMessageParams, UpdateProfileParams } from "./0_params.ts";
import { StorageOperations } from "./0_storage_operations.ts";
import { canBeInputChannel, canBeInputUser, DOWNLOAD_POOL_SIZE, getUsername, toInputChannel, toInputUser } from "./0_utilities.ts";
import type { ClientGeneric } from "./1_client_generic.ts";
import type { ClientPlainParams } from "./1_client_plain.ts";
import { type InvokeErrorHandler, skipInvoke } from "./1_invoke_middleware.ts";
import { AccountManager } from "./2_account_manager.ts";
import { BotInfoManager } from "./2_bot_info_manager.ts";
import { BusinessConnectionManager } from "./2_business_connection_manager.ts";
import { ClientEncrypted } from "./2_client_encrypted.ts";
import type { Context } from "./2_context.ts";
import { FileManager } from "./2_file_manager.ts";
import { NetworkStatisticsManager } from "./2_network_statistics_manager.ts";
import { PaymentManager } from "./2_payment_manager.ts";
import { ReactionManager } from "./2_reaction_manager.ts";
import { signIn } from "./2_sign_in.ts";
import { TranslationsManager } from "./2_translations_manager.ts";
import { UpdateManager } from "./2_update_manager.ts";
import { ClientEncryptedPool } from "./3_client_encrypted_pool.ts";
import { MessageManager } from "./3_message_manager.ts";
import { VideoChatManager } from "./3_video_chat_manager.ts";
import { CallbackQueryManager } from "./4_callback_query_manager.ts";
import { ChatListManager } from "./4_chat_list_manager.ts";
import { ChatManager } from "./4_chat_manager.ts";
import { Composer } from "./4_composer.ts";
import { ForumManager } from "./4_forum_manager.ts";
import { GiftManager } from "./4_gift_manager.ts";
import { InlineQueryManager } from "./4_inline_query_manager.ts";
import { LinkPreviewManager } from "./4_link_preview_manager.ts";
import { PollManager } from "./4_poll_manager.ts";
import { StoryManager } from "./4_story_manager.ts";

export { restartAuth } from "./2_sign_in.ts";

export const handleMigrationError = Symbol("handleMigrationError");

let id = 0;

const getPeer = Symbol();

const mustGetPeer = Symbol();

export interface ClientParams extends ClientPlainParams {

  storage?: Storage;

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

export class Client<C extends Context = Context> extends Composer<C> implements ClientGeneric {
  #clients = new Array<ClientEncrypted>();
  #downloadPools: Partial<Record<DC, ClientEncryptedPool>> = {};
  #uploadPools: Partial<Record<DC, ClientEncryptedPool>> = {};
  #guaranteeUpdateDelivery: boolean;

  #accountManager: AccountManager;
  #botInfoManager: BotInfoManager;
  #businessConnectionManager: BusinessConnectionManager;
  #fileManager: FileManager;
  #networkStatisticsManager: NetworkStatisticsManager;
  #paymentManager: PaymentManager;
  #reactionManager: ReactionManager;
  #translationsManager: TranslationsManager;
  #updateManager: UpdateManager;

  #messageManager: MessageManager;
  #videoChatManager: VideoChatManager;

  #callbackQueryManager: CallbackQueryManager;
  #chatListManager: ChatListManager;
  #chatManager: ChatManager;
  #forumManager: ForumManager;
  #giftManager: GiftManager;
  #inlineQueryManager: InlineQueryManager;
  #linkPreviewManager: LinkPreviewManager;
  #pollManager: PollManager;
  #storyManager: StoryManager;

  #managers?: Record<string, any>;

  get managers(): Record<string, any> {
    return this.#managers ?? (this.#managers ??= {

      accountManager: this.#accountManager,
      botInfoManager: this.#botInfoManager,
      businessConnectionManager: this.#businessConnectionManager,
      fileManager: this.#fileManager,
      networkStatisticsManager: this.#networkStatisticsManager,
      paymentManager: this.#paymentManager,
      reactionManager: this.#reactionManager,
      translationsManager: this.#translationsManager,
      updateManager: this.#updateManager,

      messageManager: this.#messageManager,
      videoChatManager: this.#videoChatManager,

      callbackQueryManager: this.#callbackQueryManager,
      chatListManager: this.#chatListManager,
      chatManager: this.#chatManager,
      forumManager: this.#forumManager,
      giftManager: this.#giftManager,
      inlineQueryManager: this.#inlineQueryManager,
      linkPreviewManager: this.#linkPreviewManager,
      pollManager: this.#pollManager,
      storyManager: this.#storyManager,
    });
  }

  #storage_: Storage;
  #messageStorage_: Storage;
  public readonly storage: StorageOperations;
  public readonly messageStorage: StorageOperations;
  #parseMode: ParseMode;

  #apiId: number;
  #apiHash: string;
  #transportProvider?: TransportProvider;
  public readonly appVersion: string;
  public readonly deviceModel: string;
  public readonly language: string;
  public readonly platform: string;
  public readonly systemLangCode: string;
  public readonly systemVersion: string;
  readonly #publicKeys?: PublicKeys;
  readonly #outgoingMessages: NonNullable<ClientParams["outgoingMessages"]>;
  #persistCache: boolean;
  #disableUpdates: boolean;
  #authString?: string;
  #initialDc: DC;

  #L: Logger;
  #LsignIn: Logger;
  #LupdateGapRecoveryLoop: Logger;
  #LstorageWriteLoop: Logger;
  #LhandleMigrationError: Logger;
  #Lmin: Logger;

  constructor(params?: ClientParams) {
    super();

    this.#apiId = params?.apiId ?? 0;
    this.#apiHash = params?.apiHash ?? "";
    this.#transportProvider = params?.transportProvider;
    this.#initialDc = params?.initialDc ?? INITIAL_DC;
    this.#storage_ = params?.storage || new StorageMemory();
    this.#persistCache = params?.persistCache ?? false;
    if (!this.#persistCache) {
      this.#messageStorage_ = new StorageMemory();
    } else {
      this.#messageStorage_ = this.#storage_;
    }
    this.storage = new StorageOperations(this.#storage_);
    this.messageStorage = new StorageOperations(this.#messageStorage_);
    this.#parseMode = params?.parseMode ?? null;
    this.#disableUpdates = params?.disableUpdates ?? false;
    this.#authString = params?.authString;

    this.appVersion = params?.appVersion ?? APP_VERSION;
    this.deviceModel = params?.deviceModel ?? DEVICE_MODEL;
    this.language = params?.language ?? LANG_CODE;
    this.platform = params?.platform ?? LANG_PACK;
    this.systemLangCode = params?.systemLangCode ?? SYSTEM_LANG_CODE;
    this.systemVersion = params?.systemVersion ?? SYSTEM_VERSION;
    this.#publicKeys = params?.publicKeys;
    this.#outgoingMessages = params?.outgoingMessages ?? false;
    this.#guaranteeUpdateDelivery = params?.guaranteeUpdateDelivery ?? false;

    const L = this.#L = getLogger("Client").client(id++);
    this.#LsignIn = L.branch("signIn");
    this.#LupdateGapRecoveryLoop = L.branch("updateGapRecoveryLoop");
    this.#LstorageWriteLoop = L.branch("storageWriteLoop");
    this.#LhandleMigrationError = L.branch("[handleMigrationError]");
    this.#Lmin = L.branch("min");

    const c = {
      id,
      getUploadPoolSize: this.#getUploadPoolSize.bind(this),
      invoke: async <T extends Api.AnyFunction | Mtproto.ping, R = T extends Mtproto.ping ? Mtproto.pong : T extends Api.AnyGenericFunction<infer X> ? Api.ReturnType<X> : T["_"] extends keyof Api.Functions ? Api.ReturnType<T> extends never ? Api.ReturnType<Api.Functions[T["_"]]> : never : never>(function_: T, params?: InvokeParams & { businessConnectionId?: string }): Promise<R> => {
        if (params?.businessConnectionId) {
          if (Mtproto.is("ping", function_)) {
            unreachable();
          }
          return await this.invoke({ _: "invokeWithBusinessConnection", connection_id: params.businessConnectionId, query: function_ }, params);
        } else {
          return await this.invoke(function_, params);
        }
      },
      storage: this.storage,
      messageStorage: this.messageStorage,
      guaranteeUpdateDelivery: this.#guaranteeUpdateDelivery,
      setConnectionState: this.#propagateConnectionState.bind(this),
      resetConnectionState: () => this.#stateChangeHandler(this.connected),
      getSelfId: this.#getSelfId.bind(this),
      getIsPremium: this.#getIsPremium.bind(this),
      getInputPeer: this.getInputPeer.bind(this),
      getInputChannel: this.getInputChannel.bind(this),
      getInputUser: this.getInputUser.bind(this),
      getInputPeerChatId: this.#getInputPeerChatId.bind(this),
      getPeer: this[mustGetPeer].bind(this),
      handleUpdate: this.#queueHandleCtxUpdate.bind(this),
      parseMode: this.#parseMode,
      outgoingMessages: this.#outgoingMessages,
      dropPendingUpdates: params?.dropPendingUpdates,
      disconnected: () => this.disconnected,
      langPack: this.platform,
      langCode: this.language,
    };

    this.#accountManager = new AccountManager(c);
    this.#botInfoManager = new BotInfoManager(c);
    this.#businessConnectionManager = new BusinessConnectionManager(c);
    const fileManager = this.#fileManager = new FileManager(c);
    this.#networkStatisticsManager = new NetworkStatisticsManager(c);
    this.#paymentManager = new PaymentManager(c);
    this.#reactionManager = new ReactionManager(c);
    this.#translationsManager = new TranslationsManager(c);
    this.#updateManager = new UpdateManager(c);

    const messageManager = this.#messageManager = new MessageManager({ ...c, fileManager });
    this.#videoChatManager = new VideoChatManager({ ...c, fileManager });

    this.#callbackQueryManager = new CallbackQueryManager({ ...c, messageManager });
    this.#chatListManager = new ChatListManager({ ...c, fileManager, messageManager });
    this.#chatManager = new ChatManager({ ...c, fileManager, messageManager });
    this.#forumManager = new ForumManager({ ...c, messageManager });
    this.#giftManager = new GiftManager({ ...c, messageManager });
    this.#inlineQueryManager = new InlineQueryManager({ ...c, messageManager });
    this.#linkPreviewManager = new LinkPreviewManager({ ...c, messageManager });
    this.#pollManager = new PollManager({ ...c, messageManager });
    this.#storyManager = new StoryManager({ ...c, fileManager, messageManager });

    this.#updateManager.setUpdateHandler(this.#handleUpdate.bind(this));

    if (params?.defaultHandlers ?? true) {
      this.invoke.use(async ({ error }, next) => {
        if (error instanceof FloodWait && error.seconds <= 10) {
          L.warning("sleeping for", error.seconds, "because of:", error);
          await delay(error.seconds * SECOND);
          return true;
        } else {
          return next();
        }
      });
    }
  }

  #setMainClient(client: ClientEncrypted) {
    this.#disconnectAllClients();
    this.#clients = [client];
    client.handlers.onUpdate = (updates) => {
      this.#updateManager.processUpdates(updates, true, null);
      this.#lastUpdates = new Date();
    };
    client.handlers.onDeserializationError = async () => {
      await this.#updateManager.recoverUpdateGap("deserialization error");
    };
    client.handlers.onNewServerSalt = async (serverSalt) => {
      await this.storage.setServerSalt(serverSalt);
    };
    client.onConnectionStateChange = this.#onConnectionStateChange.bind(this);
  }

  #newClient(dc: DC, main: boolean, cdn: boolean) {
    const client = new ClientEncrypted(dc, this.#apiId, {
      appVersion: this.appVersion,
      deviceModel: this.deviceModel,
      langCode: this.language,
      langPack: this.platform,
      systemLangCode: this.systemLangCode,
      systemVersion: this.systemVersion,
      transportProvider: this.#transportProvider,
      cdn,
      disableUpdates: !main || cdn,
      publicKeys: this.#publicKeys,
    });
    client.connectionCallback = this.#networkStatisticsManager.getTransportReadWriteCallback(cdn);
    return client;
  }

  #disconnectAllClients() {
    for (const client of this.#clients) {
      client.disconnect();
    }
    for (const pool of Object.values(this.#downloadPools)) {
      pool.disconnect();
    }
    for (const pool of Object.values(this.#uploadPools)) {
      pool.disconnect();
    }
  }

  get #client(): ClientEncrypted | undefined {
    return this.#clients[0];
  }

  get connected(): boolean {
    return this.#client?.connected ?? false;
  }
  get disconnected(): boolean {
    return this.#client?.disconnected ?? true;
  }

  #propagateConnectionState(connectionState: ConnectionState) {
    this.#queueHandleCtxUpdate({ connectionState });
    this.#lastPropagatedConnectionState = connectionState;
  }

  #lastPropagatedConnectionState: ConnectionState | null = null;
  #stateChangeHandler: (connected: boolean) => void = ((connected: boolean) => {
    const connectionState = connected ? "ready" : "notConnected";
    if (this.#lastPropagatedConnectionState !== connectionState) {
      this.#propagateConnectionState(connectionState);
    }
  }).bind(this);

  #storageInited = false;
  async #initStorage() {
    if (!this.#storageInited) {
      await this.storage.initialize();
      if (!this.#guaranteeUpdateDelivery) {
        await this.storage.deleteUpdates();
        await this.storage.commit(true);
      }
      this.#storageInited = true;
    }
  }

  #connectMutex = new Mutex();

  async connect() {
    const unlock = await this.#connectMutex.lock();
    try {
      if (this.connected) {
        return;
      }
      await this.#initStorage();
      if (this.#authString && !this.#authStringImported) {
        await this.importAuthString(this.#authString);
      }
      const auth = this.storage.auth.mustGet();
      if (auth.authKey !== null && auth.dc !== null) {
        if (!this.#client || this.#client.dc !== auth.dc) {
          this.#client?.disconnect();
          this.#setMainClient(this.#newClient(auth.dc, true, false));
        }
        await this.#client!.setAuthKey(auth.authKey);
        if (this.#client!.serverSalt === 0n) {
          this.#client!.serverSalt = await this.storage.getServerSalt() ?? 0n;
        }
      } else {
        const dc = auth.dc ?? this.#initialDc;
        if (!this.#client || this.#client.dc !== dc) {
          this.#client?.disconnect();
          this.#setMainClient(this.#newClient(dc, true, false));
        }
      }
      await this.#client!.connect();
      await this.storage.auth.update((v) => {
        v.authKey = this.#client!.authKey;
        v.dc = this.#client!.dc;
      });
      await this.storage.setServerSalt(this.#client!.serverSalt);
      this.#updateGapRecoveryLoop.start();
      this.#clientDisconnectionLoop.start();
      if (!this.#messageStorage_.isMemory) {
        this.#storageWriteLoop.start();
      } else {
        this.#L.debug("not starting storageWriteLoop");
      }
      await this.storage.commit(true);
    } finally {
      unlock();
    }
  }

  async [handleMigrationError](err: Migrate) {
    let newDc = String(err.dc);
    if (Math.abs(getDcId(this.#client!.dc, this.#client!.cdn)) >= 10_000) {
      newDc += "-test";
    }
    this.disconnect();
    await this.storage.auth.update((v) => {
      v.authKey = null;
      v.dc = newDc as DC;
    });
    await this.connect();
    this.#LhandleMigrationError.debug(`migrated to DC${newDc}`);
  }

  async disconnect() {
    this.#disconnectAllClients();
    this.#clientDisconnectionLoop.abort();
    this.#updateGapRecoveryLoop.abort();
    this.#storageWriteLoop.abort();
    this.#updateManager.closeAllChats();
    await this.messageStorage.commit(true);
  }

  #lastPropagatedAuthorizationState: boolean | null = null;
  async #propagateAuthorizationState(authorized: boolean) {
    if (this.#lastPropagatedAuthorizationState !== authorized) {
      await this.#handleCtxUpdate({ authorizationState: { isAuthorized: authorized } });
      this.#lastPropagatedAuthorizationState = authorized;
    }
  }

  async #getSelfId() {
    const id = await this.storage.getAccountId();
    if (id === null) {
      throw new Error("Unauthorized");
    }
    return id;
  }

  async #getIsPremium() {
    const maybeIsPremium = await this.storage.getIsPremium();
    if (maybeIsPremium !== null) {
      return maybeIsPremium;
    }
    return this.#lastGetMe?.isPremium ?? false;
  }

  #lastUpdates = new Date();
  #updateGapRecoveryLoop = new AbortableLoop(async (loop, signal) => {
    await delay(60 * SECOND, { signal });
    if (!this.connected) {
      loop.abort();
      return;
    }
    if (Date.now() - this.#lastUpdates.getTime() >= 15 * MINUTE) {
      drop(
        this.#updateManager.recoverUpdateGap("lastUpdates").then(() => {
          this.#lastUpdates = new Date();
        }),
      );
    }
  }, (loop, err) => {
    if (!this.connected) {
      loop.abort();
    } else {
      this.#LupdateGapRecoveryLoop.error(err);
    }
  });

  #clientDisconnectionLoop = new AbortableLoop(async (loop, signal) => {
    await delay(60 * SECOND, { signal });
    if (!this.connected) {
      loop.abort();
      return;
    }
    const now = Date.now();
    const disconnectAfter = 5 * MINUTE;
    for (const [i, client] of this.#clients.entries()) {
      if (i > 0 && !client.disconnected && client.lastRequest && now - client.lastRequest.getTime() >= disconnectAfter) {
        client?.disconnect();
      }
    }
  }, (loop) => {
    if (!this.connected) {
      loop.abort();
    }
  });

  #storageWriteLoop = new AbortableLoop(async (_loop, signal) => {
    await delay(60 * SECOND, { signal });
    await this.messageStorage.commit();
    await this.storage.commit();
  }, (err) => {
    this.#LstorageWriteLoop.error(err);
  });

  async #checkAuthorization() {
    if (this.#lastGetMe) {
      return this.#lastGetMe;
    }

    try {
      await this.#updateManager.fetchState("#checkAuthorization");
      const me = await this.#getMe();
      await this.#propagateAuthorizationState(true);
      drop(this.#updateManager.recoverUpdateGap("#checkAuthorization"));
      return me;
    } catch (err) {
      if (!(err instanceof AuthKeyUnregistered) && !(err instanceof SessionRevoked)) {
        throw err;
      }
    }
  }

  async sendCode(phoneNumber: string) {
    const me = await this.#checkAuthorization();
    if (me) {
      return;
    }

    try {
      await this.#accountManager.sendCode(phoneNumber, this.#apiId, this.#apiHash);
    } catch (err) {
      if (err instanceof Migrate) {
        await this[handleMigrationError](err);
        await this.#accountManager.sendCode(phoneNumber, this.#apiId, this.#apiHash);
      } else {
        throw err;
      }
    }
  }

  async checkCode(code: string): Promise<CodeCheckResult> {
    const result = await this.#accountManager.checkCode(code);
    if (result.type === "signed_in") {
      await this.storage.auth.update((v) => {
        v.userId = result.userId;
        v.isBot = false;
      });
      this.#LsignIn.debug("signed in as user");
      await this.#propagateAuthorizationState(true);
      await this.#updateManager.fetchState("checkCode");
    }

    return result;
  }

  async getPasswordHint(): Promise<string | null> {
    return await this.#accountManager.getPasswordHint();
  }

  async checkPassword(password: string): Promise<PasswordCheckResult> {
    const result = await this.#accountManager.checkPassword(password);
    if (result.type === "signed_in") {
      await this.storage.auth.update((v) => {
        v.userId = result.userId;
        v.isBot = false;
      });
      await this.storage.commit(true);
      this.#LsignIn.debug("signed in as user");
      await this.#propagateAuthorizationState(true);
      await this.#updateManager.fetchState("checkPassword");
    }

    return result;
  }

  async checkBotToken(botToken: string): Promise<BotTokenCheckResult> {
    const me = await this.#checkAuthorization();
    if (me) {
      return {
        type: "signed_in",
        userId: me.id,
      };
    }

    while (true) {
      try {
        const result = await this.#accountManager.checkBotToken(botToken, this.#apiId, this.#apiHash);
        if (result.type === "signed_in") {
          await this.storage.auth.update((v) => {
            v.userId = result.userId;
            v.isBot = true;
          });
          await this.storage.commit(true);
          this.#LsignIn.debug("signed in as bot");
          await this.#propagateAuthorizationState(true);
          await this.#updateManager.fetchState("checkBotToken");
        }

        return result;
      } catch (err) {
        if (err instanceof Migrate) {
          await this[handleMigrationError](err);
          continue;
        } else {
          throw err;
        }
      }
    }
  }

  async signIn(params?: SignInParams) {
    await signIn(this, this.#LsignIn, params);
  }

  async signOut() {
    try {
      await Promise.all([
        this.storage.reset(),
        this.invoke({ _: "auth.logOut" }).then(() => {
          this.#propagateAuthorizationState(false);
        }),
      ]);
    } finally {
      this.#lastGetMe = null;
      this.disconnect();
      await this.connect();
    }
  }

  async start(params?: SignInParams) {
    await this.connect();
    await this.signIn(params);
  }

  async #getClient(params: InvokeParams) {
    let client: ClientEncrypted;
    switch (params.type) {
      case undefined:
        client = await this.#getMainClient(params.dc);
        break;
      case "download":
        client = await this.#getDownloadClient(params.dc);
        break;
      case "upload":
        client = await this.#getUploadClient();
        break;
    }
    if (client !== this.#client && !this.disconnected && client.disconnected) {
      await client.connect();
    }
    return client;
  }

  #getMainClientMutex = new Mutex();
  async #getMainClient(dc?: DC) {
    if (dc === undefined || dc === this.#client?.dc) {
      return this.#client!;
    }
    let client = this.#clients.find((v) => v.dc === dc);
    if (client) {
      return client;
    }
    const unlock = await this.#getMainClientMutex.lock();
    client = this.#clients.find((v) => v.dc === dc);
    if (client) {
      return client;
    }
    try {
      client = this.#newClient(dc, false, false);
      await this.#setupClient(client);
      this.#clients.push(client);
      return client;
    } finally {
      unlock();
    }
  }

  async #getDownloadClient(dc?: DC) {
    dc ??= this.#client!.dc;
    const pool = this.#downloadPools[dc] ??= new ClientEncryptedPool();
    if (!pool.size) {
      if (!pool.size) {
        for (let i = 0; i < DOWNLOAD_POOL_SIZE; ++i) {
          pool.add(this.#newClient(dc, false, true));
        }
      }
    }
    const client = pool.nextClient();
    if (client.authKey.length) {
      return client;
    }
    await this.#setupClient(client);
    return client;
  }

  async #getUploadPoolSize() {
    const dc = this.#client!.dc;
    return (dc !== "2" && dc !== "4") || await this.#getIsPremium() ? 8 : 4;
  }

  async #getUploadClient() {
    const dc = this.#client!.dc;
    const poolSize = await this.#getUploadPoolSize();
    const pool = this.#uploadPools[dc] ??= new ClientEncryptedPool();
    if (!pool.size) {
      for (let i = 0; i < poolSize; ++i) {
        pool.add(await this.#newClient(dc, false, true));
      }
    }
    const client = pool.nextClient();
    if (client.authKey.length) {
      return client;
    }
    await this.#setupClient(client);
    return client;
  }

  async #setupClient(client: ClientEncrypted) {
    const storage = client.dc === this.#client!.dc ? this.storage : new StorageOperations(this.storage.provider.branch(client.dc + (client.cdn ? "_cdn" : "")));
    await storage.initialize();
    const auth = storage.auth.mustGet();
    const serverSalt = await storage.getServerSalt();
    if (auth.authKey !== null) {
      await client.setAuthKey(auth.authKey);
      if (serverSalt) {
        client.serverSalt = serverSalt;
      }
    }
    await client.connect();
    if (auth.authKey === null) {
      await this.#importAuthorization(client);
    }
    await storage.auth.update((v) => v.authKey = client.authKey);
    if (client.dc !== this.#client!.dc) {
      await storage.setServerSalt(client.serverSalt);
      client.handlers.onNewServerSalt = async (serverSalt) => {
        await storage.setServerSalt(serverSalt);
      };
    }
  }

  async #importAuthorization(client: ClientEncrypted) {
    if (this.#client!.dc === client.dc && this.#client!.cdn === client.cdn) {
      const auth = this.storage.auth.mustGet();
      const serverSalt = await this.storage.getServerSalt();
      if (auth.authKey !== null) {
        await client.setAuthKey(auth.authKey);
        if (serverSalt) {
          client.serverSalt = serverSalt;
        }
      }
      return;
    }
    const exportedAuthorization = await this.#client!.invoke({ _: "auth.exportAuthorization", dc_id: getDcId(client.dc, client.cdn) });
    await client.invoke({ ...exportedAuthorization, _: "auth.importAuthorization" });
  }

  async #invoke<T extends Api.AnyFunction | Mtproto.ping, R = T extends Mtproto.ping ? Mtproto.pong : T extends Api.AnyGenericFunction<infer X> ? Api.ReturnType<X> : T["_"] extends keyof Api.Functions ? Api.ReturnType<T> extends never ? Api.ReturnType<Api.Functions[T["_"]]> : never : never>(function_: T, params?: InvokeParams): Promise<R> {
    if (!this.#client) {
      throw new ConnectionError("The connection is not open.");
    }
    let n = 1;
    let client: ClientEncrypted;
    while (true) {
      client = params ? await this.#getClient(params) : this.#client!;
      const main = client === this.#client;
      try {
        const result = await client.invoke(function_);
        if (main) {
          try {
            await this.#updateManager.processResult(result as Api.DeserializedType);
          } catch (err) {
            this.#L.error("failed to process result:", err);
          }
          if (Api.isOfEnum("Update", result) || Api.isOfEnum("Updates", result)) {
            return new Promise<R>((resolve) => {
              this.#updateManager.processUpdates(result, true, Mtproto.is("ping", function_) ? null : function_, () => resolve(result as R));
            });
          }
        }
        return result as R;
      } catch (err) {
        if (err instanceof AuthKeyUnregistered && !main) {
          await this.#importAuthorization(client);
          continue;
        } else if (err instanceof ConnectionError && !main && !this.disconnected) {
          continue;
        } else if (await this.#handleInvokeError(Object.freeze({ client: this, error: err, function: function_, n: n++ }), () => Promise.resolve(false))) {
          continue;
        } else {
          throw err;
        }
      }
    }
  }

  #handleInvokeError = skipInvoke<Client<C>>();

  invoke: {
    <T extends Api.AnyFunction | Mtproto.ping, R = T extends Mtproto.ping ? Mtproto.pong : T extends Api.AnyGenericFunction<infer X> ? Api.ReturnType<X> : T["_"] extends keyof Api.Functions ? Api.ReturnType<T> extends never ? Api.ReturnType<Api.Functions[T["_"]]> : never : never>(function_: T, params?: InvokeParams): Promise<R>;
    use: (handler: InvokeErrorHandler<Client<C>>) => void;
  } = Object.assign(
    this.#invoke,
    {
      use: (handler: InvokeErrorHandler<Client<C>>) => {
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

  exportAuthString(): Promise<string> {
    return this.storage.exportAuthString(this.#apiId);
  }

  #authStringImported = false;
  async importAuthString(authString: string) {
    if (this.connected) {
      throw new Error("Cannot import auth string while the client is connected");
    }
    await this.#initStorage();
    await this.storage.importAuthString(authString);
    this.#authStringImported = true;
    if (!this.#apiId) {
      this.#apiId = this.storage.auth.mustGet().apiId;
    }
  }

  async #getUserAccessHash(userId: bigint) {
    const users = await this.invoke({ _: "users.getUsers", id: [{ _: "inputUser", user_id: userId, access_hash: 0n }] });
    const user = Api.is("user", users[0]) ? users[0] : undefined;
    return user?.access_hash ?? 0n;
  }

  async #getChannelAccessHash(channelId: bigint) {
    const channels = await this.invoke({ _: "channels.getChannels", id: [{ _: "inputChannel", channel_id: channelId, access_hash: 0n }] });
    const channel = Api.is("channel", channels.chats[0]) ? channels.chats[0] : undefined;
    return channel?.access_hash ?? 0n;
  }

  async getInputPeer(id: ID): Promise<Api.InputPeer> {
    if (id === "me" || id === await this.#getSelfId()) {
      return { _: "inputPeerSelf" };
    }
    const inputPeer = await this.#getInputPeerInner(id);
    if (((Api.is("inputPeerUser", inputPeer) || Api.is("inputPeerChannel", inputPeer)) && inputPeer.access_hash === 0n) && this.storage.isBot) {
      if ("channel_id" in inputPeer) {
        inputPeer.access_hash = await this.#getChannelAccessHash(inputPeer.channel_id);
      } else {
        inputPeer.access_hash = await this.#getUserAccessHash(inputPeer.user_id);
      }
    }
    if ((Api.is("inputPeerUser", inputPeer) || Api.is("inputPeerChannel", inputPeer)) && inputPeer.access_hash === 0n) {
      throw new AccessError(`The chat ${id} cannot be accessed.`);
    }
    return inputPeer;
  }

  async #getInputPeerChatId(inputPeer: Api.InputPeer | Api.InputUser | Api.InputChannel) {
    if (Api.isOneOf(["inputPeerSelf", "inputUserSelf"], inputPeer)) {
      return await this.#getSelfId();
    } else if (Api.isOneOf(["inputPeerEmpty", "inputUserEmpty", "inputChannelEmpty"], inputPeer)) {
      unreachable();
    } else {
      return Api.peerToChatId(inputPeer);
    }
  }

  async getInputChannel(id: ID): Promise<Api.inputChannel | Api.inputChannelFromMessage> {
    const inputPeer = await this.getInputPeer(id);
    if (!canBeInputChannel(inputPeer)) {
      throw new TypeError(`The chat ${id} is not a channel neither a supergroup.`);
    }
    return toInputChannel(inputPeer);
  }

  async getInputUser(id: ID): Promise<Api.inputUserSelf | Api.inputUser | Api.inputUserFromMessage> {
    const inputPeer = await this.getInputPeer(id);
    if (!canBeInputUser(inputPeer)) {
      throw new TypeError(`The chat ${id} is not a private chat.`);
    }
    return toInputUser(inputPeer);
  }

  async #getInputPeerInner(id: ID) {
    const idn = Number(id);
    if (!isNaN(idn)) {
      id = idn;
    }
    let peer: Api.InputPeer;
    if (typeof id === "string") {
      id = getUsername(id);
      let resolvedId = 0;
      const maybeUsername = await this.messageStorage.usernames.get([id]);
      if (maybeUsername !== null && Date.now() - maybeUsername[1].getTime() < USERNAME_TTL) {
        const [id] = maybeUsername;
        resolvedId = id;
      } else {
        const resolved = await this.invoke({ _: "contacts.resolveUsername", username: id });
        this.#updateManager.processChats(resolved.chats, resolved);
        this.#updateManager.processUsers(resolved.users, resolved);
        if (Api.is("peerUser", resolved.peer)) {
          resolvedId = Api.peerToChatId(resolved.peer);
        } else if (Api.is("peerChannel", resolved.peer)) {
          resolvedId = Api.peerToChatId(resolved.peer);
        } else {
          unreachable();
        }
      }
      const resolvedIdType = Api.getChatIdPeerType(resolvedId);
      if (resolvedIdType === "user") {
        const accessHash = await this.messageStorage.getUserAccessHash(resolvedId);
        peer = { _: "inputPeerUser", user_id: Api.chatIdToPeerId(resolvedId), access_hash: accessHash ?? 0n } as Api.inputPeerUser;
      } else if (resolvedIdType === "channel") {
        const accessHash = await this.messageStorage.getChannelAccessHash(resolvedId);
        peer = { _: "inputPeerChannel", channel_id: Api.chatIdToPeerId(resolvedId), access_hash: accessHash ?? 0n } as Api.inputPeerChannel;
      } else {
        unreachable();
      }
    } else if (id > 0) {
      const accessHash = await this.messageStorage.getUserAccessHash(id);
      peer = { _: "inputPeerUser", user_id: Api.chatIdToPeerId(id), access_hash: accessHash ?? 0n } as Api.inputPeerUser;
    } else if (-MAX_CHAT_ID <= id) {
      peer = { _: "inputPeerChat", chat_id: BigInt(Math.abs(id)) } as Api.inputPeerChat;
    } else if (ZERO_CHANNEL_ID - MAX_CHANNEL_ID <= id && id !== ZERO_CHANNEL_ID) {
      const accessHash = await this.messageStorage.getChannelAccessHash(id);
      peer = { _: "inputPeerChannel", channel_id: Api.chatIdToPeerId(id), access_hash: accessHash ?? 0n } as Api.inputPeerChannel;
    } else {
      throw new InputError("The ID is of an format unknown.");
    }

    if (!Api.is("inputPeerChat", peer) && !peer.access_hash) {

    }

    return peer;
  }

  async #getMinInputPeer(type: "user" | "channel", reference: { chatId: number; senderId: number; messageId: number }): Promise<Api.inputPeerUserFromMessage | Api.inputPeerChannelFromMessage | null> {
    const peer_ = await this.messageStorage.peers.get([reference.chatId]);
    if (peer_ !== null && (peer_[0].type === "channel" || peer_[0].type === "supergroup")) {
      const peer: Api.inputPeerChannel = { _: "inputPeerChannel", channel_id: BigInt(peer_[0].id), access_hash: peer_[1] };
      if (type === "user") {
        return { _: "inputPeerUserFromMessage", peer, msg_id: reference.messageId, user_id: Api.chatIdToPeerId(reference.senderId) };
      } else {
        return { _: "inputPeerChannelFromMessage", peer, msg_id: reference.messageId, channel_id: Api.chatIdToPeerId(reference.senderId) };
      }
    } else {
      return null;
    }
  }

  private [getPeer](peer: Api.peerUser): Promise<[ChatPPrivate, bigint] | null>;
  private [getPeer](peer: Api.peerChat): Promise<[ChatPGroup, bigint] | null>;
  private [getPeer](peer: Api.peerChannel): Promise<[ChatPChannel, bigint] | null>;
  private [getPeer](peer: Api.peerUser | Api.peerChat | Api.peerChannel): Promise<[ChatP, bigint] | null>;
  private async [getPeer](peer: Api.peerUser | Api.peerChat | Api.peerChannel) {
    const id = Api.peerToChatId(peer);
    const entity = await this.messageStorage.peers.get([id]);
    if (entity === null) {
      if (entity === null && this.storage.isBot && Api.is("peerUser", peer) || Api.is("peerChannel", peer)) {
        await this.getInputPeer(id);
      } else {
        return entity;
      }
    }
    return await this.messageStorage.peers.get([id]);
  }

  private [mustGetPeer](peer: Api.peerUser): [ChatPPrivate, bigint] | null;
  private [mustGetPeer](peer: Api.peerChat): [ChatPGroup, bigint] | null;
  private [mustGetPeer](peer: Api.peerChannel): [ChatPChannel, bigint] | null;
  private [mustGetPeer](peer: Api.peerUser | Api.peerChat | Api.peerChannel): [ChatP, bigint] | null;
  private [mustGetPeer](peer: Api.peerUser | Api.peerChat | Api.peerChannel) {
    return this.messageStorage.peers.mustGet([peerToChatId(peer)]);
  }

  async #handleCtxUpdate(update: Update) {
    if (this.#disableUpdates && !("authorizationState" in update) && !("connectionState" in update)) {
      return;
    }
    try {
      await this.handleUpdate(this, update);
    } catch (err) {
      this.#L.error("Failed to handle update:", err);
      throw err;
    }
  }

  #queueHandleCtxUpdate(update: Update) {
    this.#updateManager.getHandleUpdateQueue(UpdateManager.MAIN_BOX_ID).add(async () => {
      await this.#handleCtxUpdate(update);
    });
  }

  async #handleUpdate(update: Api.Update) {
    const maybePromises = new Array<() => MaybePromise<Update | null>>();
    if (Api.is("updateUserName", update)) {
      const value: [number, Date] = [Number(update.user_id), new Date()];
      for (const username_ of update.usernames) {
        const username = username_.username.toLowerCase();
        this.messageStorage.usernames.set([username], value);
      }
      const peer: Api.peerUser = { ...update, _: "peerUser" };
      const peer_ = await this[getPeer](peer);
      if (peer_ !== null) {
        const username = update.usernames[0];
        if (username !== undefined) {
          peer_[0].username = username.username;
          const also = update.usernames.filter((v) => v !== username);
          if (also.length) {
            peer_[0].also = also.map((v) => v.username);
          } else {
            delete peer_[0].also;
          }
        } else {
          delete peer_[0].username;
        }
        this.messageStorage.setPeer2(peer_[0], peer_[1]);
      }
    }

    if (this.#messageManager.canHandleUpdate(update)) {
      maybePromises.push(() => this.#messageManager.handleUpdate(update));
    }

    if (this.#chatManager.canHandleUpdate(update)) {
      maybePromises.push(() => this.#chatManager.handleUpdate(update));
    }

    if (this.#pollManager.canHandleUpdate(update)) {
      maybePromises.push(() => this.#pollManager.handleUpdate(update));
    }

    if (this.#videoChatManager.canHandleUpdate(update)) {
      maybePromises.push(() => this.#videoChatManager.handleUpdate(update));
    }

    if (this.#callbackQueryManager.canHandleUpdate(update)) {
      maybePromises.push(() => this.#callbackQueryManager.handleUpdate(update));
    }

    if (this.#inlineQueryManager.canHandleUpdate(update)) {
      maybePromises.push(() => this.#inlineQueryManager.handleUpdate(update));
    }

    if (this.#linkPreviewManager.canHandleUpdate(update)) {
      maybePromises.push(() => this.#linkPreviewManager.handleUpdate(update));
    }

    if (this.#reactionManager.canHandleUpdate(update)) {
      maybePromises.push(() => this.#reactionManager.handleUpdate(update));
    }

    if (this.#chatListManager.canHandleUpdate(update)) {
      maybePromises.push(() => this.#chatListManager.handleUpdate(update));
    }

    if (this.#storyManager.canHandleUpdate(update)) {
      maybePromises.push(() => this.#storyManager.handleUpdate(update));
    }

    if (this.#businessConnectionManager.canHandleUpdate(update)) {
      maybePromises.push(() => this.#businessConnectionManager.handleUpdate(update));
    }

    if (this.#storyManager.canHandleUpdate(update)) {
      maybePromises.push(() => this.#storyManager.handleUpdate(update));
    }

    if (this.#paymentManager.canHandleUpdate(update)) {
      maybePromises.push(() => this.#paymentManager.handleUpdate(update));
    }

    if (this.#translationsManager.canHandleUpdate(update)) {
      maybePromises.push(() => this.#translationsManager.handleUpdate(update));
    }

    return () =>
      Promise.resolve().then(async () => {
        const updates: Array<Update> = [{ update }];
        for (const maybePromise of maybePromises) {
          try {
            const value = maybePromise();
            const update = value instanceof Promise ? await value : value;
            if (update) {
              updates.push(update);
            }
          } catch (err) {
            this.#L.error("failed to construct update:", err);
          }
        }

        for (const update of updates) {
          try {
            await this.#handleCtxUpdate(update);
          } finally {
            if ("deletedMessages" in update) {
              for (const { chatId, messageId } of update.deletedMessages) {
                await this.messageStorage.setMessage(chatId, messageId, null);
              }
            }
          }
        }
      });
  }

  #lastGetMe: User | null = null;
  async #getMe() {
    if (this.#lastGetMe !== null) {
      return this.#lastGetMe;
    } else {
      const user = await this.#getMeInner();
      this.#lastGetMe = user;
      return user;
    }
  }

  async #getMeInner() {
    let chatP = (await this[getPeer]({ _: "peerUser", user_id: BigInt(await this.#getSelfId()) }))?.[0] ?? null;
    if (chatP === null) {
      const users = await this.invoke({ _: "users.getUsers", id: [{ _: "inputUserSelf" }] });
      chatP = constructChatP(Api.as("user", users[0]));
      await this.storage.setIsPremium(chatP.isPremium);
    }
    const user = constructUser2(chatP);
    this.#lastGetMe = user;
    return user;
  }

  #previouslyConnected = false;
  #lastConnectionState = false;
  #onConnectionStateChange(connected: boolean) {
    if (this.#lastConnectionState !== connected) {
      if (connected) {
        if (this.#previouslyConnected) {
          drop(this.#updateManager.recoverUpdateGap("reconnect"));
        }
        this.#previouslyConnected = true;
      }
      const connectionState = connected ? "ready" : "notConnected";
      this.#queueHandleCtxUpdate({ connectionState });
    }
  }

  async getMe(): Promise<User> {
    if (this.#lastGetMe === null) {
      const me = await this.#checkAuthorization();
      if (!me) {
        throw new InputError("Not signed in.");
      } else {
        return me;
      }
    }

    return await this.#getMeInner();
  }

  async showUsername(id: ID, username: string) {
    await this.#accountManager.showUsername(id, username);
  }

  async hideUsername(id: ID, username: string) {
    await this.#accountManager.hideUsername(id, username);
  }

  async reorderUsernames(id: ID, order: string[]): Promise<boolean> {
    return await this.#accountManager.reorderUsernames(id, order);
  }

  async hideUsernames(id: ID): Promise<boolean> {
    return await this.#accountManager.hideUsernames(id);
  }

  async getBusinessConnection(id: string): Promise<BusinessConnection> {
    return await this.#businessConnectionManager.getBusinessConnection(id);
  }

  async setOnline(online: boolean): Promise<void> {
    await this.#accountManager.setOnline(online);
  }

  async setEmojiStatus(id: string, params?: SetEmojiStatusParams) {
    await this.#accountManager.setEmojiStatus(id, params);
  }

  async setUserEmojiStatus(userId: ID, id: string, params?: SetEmojiStatusParams) {
    await this.#accountManager.setUserEmojiStatus(userId, id, params);
  }

  async updateProfile(params?: UpdateProfileParams): Promise<void> {
    await this.#accountManager.updateProfile(params);
  }

  async setBirthday(params?: SetBirthdayParams): Promise<void> {
    await this.#accountManager.setBirthday(params);
  }

  async setPersonalChannel(params?: SetPersonalChannelParams): Promise<void> {
    await this.#accountManager.setPersonalChannel(params);
  }

  async setNameColor(color: number, params?: SetNameColorParams): Promise<void> {
    await this.#accountManager.setNameColor(color, params);
  }

  async setProfileColor(color: number, params?: SetProfileColorParams): Promise<void> {
    await this.#accountManager.setProfileColor(color, params);
  }

  async setLocation(params?: SetLocationParams): Promise<void> {
    await this.#accountManager.setLocation(params);
  }

  async sendMessage(chatId: ID, text: string, params?: SendMessageParams): Promise<MessageText> {
    return await this.#messageManager.sendMessage(chatId, text, params);
  }

  async sendPhoto(chatId: ID, photo: FileSource, params?: SendPhotoParams): Promise<MessagePhoto> {
    return await this.#messageManager.sendPhoto(chatId, photo, params);
  }

  async sendDocument(chatId: ID, document: FileSource, params?: SendDocumentParams): Promise<MessageDocument> {
    return await this.#messageManager.sendDocument(chatId, document, params);
  }

  async sendSticker(chatId: ID, sticker: FileSource, params?: SendStickerParams): Promise<MessageSticker> {
    return await this.#messageManager.sendSticker(chatId, sticker, params);
  }

  async sendVideo(chatId: ID, video: FileSource, params?: SendVideoParams): Promise<MessageVideo> {
    return await this.#messageManager.sendVideo(chatId, video, params);
  }

  async sendAnimation(chatId: ID, animation: FileSource, params?: SendAnimationParams): Promise<MessageAnimation> {
    return await this.#messageManager.sendAnimation(chatId, animation, params);
  }

  async sendVoice(chatId: ID, voice: FileSource, params?: SendVoiceParams): Promise<MessageVoice> {
    return await this.#messageManager.sendVoice(chatId, voice, params);
  }

  async sendAudio(chatId: ID, audio: FileSource, params?: SendAudioParams): Promise<MessageAudio> {
    return await this.#messageManager.sendAudio(chatId, audio, params);
  }

  async sendMediaGroup(chatId: ID, media: InputMedia[], params?: SendMediaGroupParams): Promise<Message[]> {
    return await this.#messageManager.sendMediaGroup(chatId, media, params);
  }

  async sendVideoNote(chatId: ID, videoNote: FileSource, params?: SendVideoNoteParams): Promise<MessageVideoNote> {
    return await this.#messageManager.sendVideoNote(chatId, videoNote, params);
  }

  async sendLocation(chatId: ID, latitude: number, longitude: number, params?: SendLocationParams): Promise<MessageLocation> {
    return await this.#messageManager.sendLocation(chatId, latitude, longitude, params);
  }

  async sendContact(chatId: ID, firstName: string, number: string, params?: SendContactParams): Promise<MessageContact> {
    return await this.#messageManager.sendContact(chatId, firstName, number, params);
  }

  async sendDice(chatId: ID, params?: SendDiceParams): Promise<MessageDice> {
    return await this.#messageManager.sendDice(chatId, params);
  }

  async sendVenue(chatId: ID, latitude: number, longitude: number, title: string, address: string, params?: SendVenueParams): Promise<MessageVenue> {
    return await this.#messageManager.sendVenue(chatId, latitude, longitude, title, address, params);
  }

  async sendPoll(chatId: ID, question: string, options: string[], params?: SendPollParams): Promise<MessagePoll> {
    return await this.#messageManager.sendPoll(chatId, question, options, params);
  }

  async sendInvoice(chatId: ID, title: string, description: string, payload: string, currency: string, prices: PriceTag[], params?: SendInvoiceParams): Promise<MessageInvoice> {
    return await this.#messageManager.sendInvoice(chatId, title, description, payload, currency, prices, params);
  }

  async editMessageText(chatId: ID, messageId: number, text: string, params?: EditMessageTextParams): Promise<MessageText> {
    return await this.#messageManager.editMessageText(chatId, messageId, text, params);
  }

  async editMessageCaption(chatId: ID, messageId: number, params?: EditMessageCaptionParams): Promise<Message> {
    return await this.#messageManager.editMessageCaption(chatId, messageId, params);
  }

  async editMessageMedia(chatId: ID, messageId: number, media: InputMedia, params?: EditMessageMediaParams): Promise<Message> {
    return await this.#messageManager.editMessageMedia(chatId, messageId, media, params);
  }

  async editInlineMessageMedia(inlineMessageId: string, media: InputMedia, params?: EditInlineMessageMediaParams): Promise<void> {
    await this.#messageManager.editInlineMessageMedia(inlineMessageId, media, params);
  }

  async editInlineMessageText(inlineMessageId: string, text: string, params?: EditInlineMessageTextParams): Promise<void> {
    await this.#messageManager.editInlineMessageText(inlineMessageId, text, params);
  }

  async editInlineMessageCaption(inlineMessageId: string, params?: EditInlineMessageCaptionParams): Promise<void> {
    await this.#messageManager.editInlineMessageCaption(inlineMessageId, params);
  }

  async editMessageReplyMarkup(
    chatId: ID,
    messageId: number,
    params?: EditMessageReplyMarkupParams,
  ): Promise<Message> {
    return await this.#messageManager.editMessageReplyMarkup(chatId, messageId, params);
  }

  async editInlineMessageReplyMarkup(inlineMessageId: string, params?: EditMessageReplyMarkupParams) {
    await this.#messageManager.editInlineMessageReplyMarkup(inlineMessageId, params);
  }

  async editMessageLiveLocation(
    chatId: ID,
    messageId: number,
    latitude: number,
    longitude: number,
    params?: EditMessageLiveLocationParams,
  ): Promise<MessageLocation> {
    return await this.#messageManager.editMessageLiveLocation(chatId, messageId, latitude, longitude, params);
  }

  async editInlineMessageLiveLocation(
    inlineMessageId: string,
    latitude: number,
    longitude: number,
    params?: EditMessageLiveLocationParams,
  ) {
    await this.#messageManager.editInlineMessageLiveLocation(inlineMessageId, latitude, longitude, params);
  }

  async getMessages(chatId: ID, messageIds: number[]): Promise<Message[]> {
    return await this.#messageManager.getMessages(chatId, messageIds);
  }

  async getMessage(chatId: ID, messageId: number): Promise<Message | null> {
    return await this.#messageManager.getMessage(chatId, messageId);
  }

  async resolveMessageLink(link: string): Promise<Message | null> {
    return await this.#messageManager.resolveMessageLink(link);
  }

  async deleteMessages(chatId: ID, messageIds: number[], params?: DeleteMessagesParams) {
    await this.#messageManager.deleteMessages(chatId, messageIds, params);
  }

  async deleteMessage(chatId: ID, messageId: number, params?: DeleteMessageParams) {
    await this.#messageManager.deleteMessages(chatId, [messageId], params);
  }

  async deleteChatMemberMessages(chatId: ID, memberId: ID) {
    await this.#messageManager.deleteChatMemberMessages(chatId, memberId);
  }

  async deleteScheduledMessages(chatId: ID, messageIds: number[]) {
    await this.#messageManager.deleteScheduledMessages(chatId, messageIds);
  }

  async deleteScheduledMessage(chatId: ID, messageId: number) {
    await this.#messageManager.deleteScheduledMessage(chatId, messageId);
  }

  async sendScheduledMessages(chatId: ID, messageIds: number[]): Promise<Message[]> {
    return await this.#messageManager.sendScheduledMessages(chatId, messageIds);
  }

  async sendScheduledMessage(chatId: ID, messageId: number): Promise<Message> {
    return await this.#messageManager.sendScheduledMessage(chatId, messageId);
  }

  async pinMessage(chatId: ID, messageId: number, params?: PinMessageParams) {
    await this.#messageManager.pinMessage(chatId, messageId, params);
  }

  async unpinMessage(chatId: ID, messageId: number, params?: UnpinMessageParams) {
    await this.#messageManager.unpinMessage(chatId, messageId, params);
  }

  async unpinMessages(chatId: ID) {
    await this.#messageManager.unpinMessages(chatId);
  }

  async forwardMessages(from: ID, to: ID, messageIds: number[], params?: ForwardMessagesParams): Promise<Message[]> {
    return await this.#messageManager.forwardMessages(from, to, messageIds, params);
  }

  async forwardMessage(from: ID, to: ID, messageId: number, params?: ForwardMessagesParams): Promise<Message> {
    return (await this.forwardMessages(from, to, [messageId], params))[0];
  }

  async stopPoll(chatId: ID, messageId: number, params?: StopPollParams): Promise<Poll> {
    return await this.#messageManager.stopPoll(chatId, messageId, params);
  }

  async sendChatAction(chatId: ID, action: ChatAction, params?: { messageThreadId?: number }) {
    await this.#messageManager.sendChatAction(chatId, action, params);
  }

  async searchMessages(params?: SearchMessagesParams): Promise<Message[]> {
    return await this.#messageManager.searchMessages(params);
  }

  async readMessages(chatId: ID, untilMessageId: number): Promise<void> {
    await this.#messageManager.readMessages(chatId, untilMessageId);
  }

  async startBot(botId: number, params?: StartBotParams): Promise<Message> {
    return await this.#messageManager.startBot(botId, params);
  }

  async transcribeVoice(chatId: ID, messageId: number): Promise<VoiceTranscription> {
    return await this.#messageManager.transcribeVoice(chatId, messageId);
  }

  async getStickerSet(name: string): Promise<StickerSet> {
    return await this.#messageManager.getStickerSet(name);
  }

  async getLinkPreview(text: string, params?: GetLinkPreviewParams): Promise<LinkPreview | null> {
    return await this.#linkPreviewManager.getLinkPreview(text, params);
  }

  async openMiniApp(botId: ID, chatId: ID, params?: OpenMiniAppParams): Promise<MiniAppInfo> {
    return await this.#messageManager.openMiniApp(botId, chatId, params);
  }

  async getProgressId(): Promise<string> {
    return await this.#fileManager.getProgressId();
  }

  async getSavedMessages(chatId: ID, params?: GetSavedMessagesParams): Promise<Message[]> {
    return await this.#messageManager.getSavedMessages(chatId, params);
  }

  async getSavedChats(params?: GetSavedChatsParams): Promise<SavedChats> {
    return await this.#messageManager.getSavedChats(params);
  }

  async getMessageReactions(chatId: ID, messageId: number, params?: GetMessageReactionsParams): Promise<MessageReactionList> {
    return await this.#messageManager.getMessageReactions(chatId, messageId, params);
  }

  async vote(chatId: ID, messageId: number, optionIndexes: number[]) {
    await this.#pollManager.vote(chatId, messageId, optionIndexes);
  }

  async retractVote(chatId: ID, messageId: number) {
    await this.#pollManager.retractVote(chatId, messageId);
  }

  async downloadChunk(fileId: string, params?: DownloadParams): Promise<Uint8Array> {
    const controller = new AbortController();
    for await (const chunk of this.#fileManager.download(fileId, { ...params, signal: controller.signal })) {
      controller.abort();
      return chunk;
    }

    unreachable();
  }

  async *download(fileId: string, params?: DownloadParams): AsyncGenerator<Uint8Array, void, unknown> {
    for await (const chunk of this.#fileManager.download(fileId, params)) {
      yield chunk;
    }
  }

  async getCustomEmojiStickers(id: string | string[]): Promise<Sticker[]> {
    return await this.#fileManager.getCustomEmojiStickers(id);
  }

  async getChats(params?: GetChatsParams): Promise<ChatListItem[]> {
    return await this.#chatListManager.getChats(params?.from, params?.after, params?.limit);
  }

  async getChat(chatId: ID): Promise<Chat> {
    return await this.#chatListManager.getChat(chatId);
  }

  async getHistory(chatId: ID, params?: GetHistoryParams): Promise<Message[]> {
    return await this.#messageManager.getHistory(chatId, params);
  }

  async setAvailableReactions(chatId: ID, availableReactions: "none" | "all" | Reaction[]) {
    await this.#chatManager.setAvailableReactions(chatId, availableReactions);
  }

  async setChatPhoto(chatId: ID, photo: FileSource, params?: SetChatPhotoParams) {
    await this.#chatManager.setChatPhoto(chatId, photo, params);
  }

  async deleteChatPhoto(chatId: ID) {
    await this.#chatManager.deleteChatPhoto(chatId);
  }

  async banChatMember(chatId: ID, memberId: ID, params?: BanChatMemberParams) {
    await this.#chatManager.banChatMember(chatId, memberId, params);
  }

  async unbanChatMember(chatId: ID, memberId: ID) {
    await this.#chatManager.unbanChatMember(chatId, memberId);
  }

  async kickChatMember(chatId: ID, memberId: ID) {
    await this.#chatManager.banChatMember(chatId, memberId);
    await this.#chatManager.unbanChatMember(chatId, memberId);
  }

  async setChatMemberRights(chatId: ID, memberId: ID, params?: SetChatMemberRightsParams) {
    await this.#chatManager.setChatMemberRights(chatId, memberId, params);
  }

  async getChatAdministrators(chatId: ID): Promise<ChatMember[]> {
    return await this.#chatListManager.getChatAdministrators(chatId);
  }

  async enableJoinRequests(chatId: ID) {
    await this.#chatManager.enableJoinRequests(chatId);
  }

  async disableJoinRequests(chatId: ID) {
    await this.#chatManager.disableJoinRequests(chatId);
  }

  async getInactiveChats(): Promise<InactiveChat[]> {
    return await this.#accountManager.getInactiveChats();
  }

  async getCreatedInviteLinks(chatId: ID, params?: GetCreatedInviteLinksParams): Promise<InviteLink[]> {
    return await this.#chatManager.getCreatedInviteLinks(chatId, params);
  }

  async joinChat(chatId: ID) {
    await this.#chatManager.joinChat(chatId);
  }

  async leaveChat(chatId: ID) {
    await this.#chatManager.leaveChat(chatId);
  }

  async getChatMember(chatId: ID, userId: ID): Promise<ChatMember> {
    return await this.#chatListManager.getChatMember(chatId, userId);
  }

  async getChatMembers(chatId: ID, params?: GetChatMembersParams): Promise<ChatMember[]> {
    return await this.#chatListManager.getChatMembers(chatId, params);
  }

  async setChatStickerSet(chatId: ID, setName: string) {
    await this.#messageManager.setChatStickerSet(chatId, setName);
  }

  async deleteChatStickerSet(chatId: ID) {
    await this.#messageManager.deleteChatStickerSet(chatId);
  }

  async setBoostsRequiredToCircumventRestrictions(chatId: ID, boosts: number) {
    await this.#chatManager.setBoostsRequiredToCircumventRestrictions(chatId, boosts);
  }

  async createInviteLink(chatId: ID, params?: CreateInviteLinkParams): Promise<InviteLink> {
    return await this.#chatManager.createInviteLink(chatId, params);
  }

  async approveJoinRequest(chatId: ID, userId: ID): Promise<void> {
    await this.#chatManager.approveJoinRequest(chatId, userId);
  }

  async declineJoinRequest(chatId: ID, userId: ID): Promise<void> {
    await this.#chatManager.declineJoinRequest(chatId, userId);
  }

  async approveJoinRequests(chatId: ID, params?: ApproveJoinRequestsParams): Promise<void> {
    await this.#chatManager.approveJoinRequests(chatId, params);
  }

  async declineJoinRequests(chatId: ID, params?: DeclineJoinRequestsParams): Promise<void> {
    await this.#chatManager.declineJoinRequests(chatId, params);
  }

  async getJoinRequests(chatId: ID, params?: GetJoinRequestsParams): Promise<JoinRequest[]> {
    return await this.#chatManager.getJoinRequests(chatId, params);
  }

  async addChatMember(chatId: ID, userId: ID, params?: AddChatMemberParams): Promise<FailedInvitation[]> {
    return await this.#chatManager.addChatMember(chatId, userId, params);
  }

  async addChatMembers(chatId: ID, userIds: ID[]): Promise<FailedInvitation[]> {
    return await this.#chatManager.addChatMembers(chatId, userIds);
  }

  async openChat(chatId: ID, params?: OpenChatParams): Promise<void> {
    await this.#updateManager.openChat(chatId, params);
  }

  async closeChat(chatId: ID): Promise<void> {
    await this.#updateManager.closeChat(chatId);
  }

  async createGroup(title: string, params?: CreateGroupParams): Promise<ChatPGroup> {
    return await this.#chatListManager.createGroup(title, params);
  }

  async createSupergroup(title: string, params?: CreateSupergroupParams): Promise<ChatPSupergroup> {
    return await this.#chatListManager.createSupergroup(title, params);
  }

  async createChannel(title: string, params?: CreateChannelParams): Promise<ChatPChannel> {
    return await this.#chatListManager.createChannel(title, params);
  }

  async setMessageTtl(chatId: ID, messageTtl: number): Promise<void> {
    await this.#chatListManager.setMessageTtl(chatId, messageTtl);
  }

  async archiveChats(chatIds: ID[]): Promise<void> {
    await this.#chatListManager.archiveChats(chatIds);
  }

  async archiveChat(chatId: ID): Promise<void> {
    await this.#chatListManager.archiveChat(chatId);
  }

  async unarchiveChats(chatIds: ID[]): Promise<void> {
    await this.#chatListManager.unarchiveChats(chatIds);
  }

  async unarchiveChat(chatId: ID): Promise<void> {
    await this.#chatListManager.unarchiveChat(chatId);
  }

  async getCommonChats(userId: ID, params?: GetCommonChatsParams): Promise<ChatP[]> {
    return await this.#chatListManager.getCommonChats(userId, params);
  }

  async getChatSettings(chatId: ID): Promise<ChatSettings> {
    return await this.#chatListManager.getChatSettings(chatId);
  }

  async disableBusinessBots(chatId: ID): Promise<void> {
    await this.#chatListManager.disableBusinessBots(chatId);
  }

  async enableBusinessBots(chatId: ID): Promise<void> {
    await this.#chatListManager.enableBusinessBots(chatId);
  }

  async disableSlowMode(chatId: ID): Promise<void> {
    await this.#chatManager.disableSlowMode(chatId);
  }

  async setSlowMode(chatId: ID, duration: SlowModeDuration): Promise<void> {
    await this.#chatManager.setSlowMode(chatId, duration);
  }

  async setChatTitle(chatId: ID, title: string): Promise<void> {
    await this.#chatManager.setChatTitle(chatId, title);
  }

  async setChatDescription(chatId: ID, description: string): Promise<void> {
    await this.#chatManager.setChatDescription(chatId, description);
  }

  async setMemberListVisibility(chatId: ID, visible: boolean): Promise<void> {
    await this.#chatManager.setMemberListVisibility(chatId, visible);
  }

  async setTopicsEnabled(chatId: ID, enabled: boolean, tabs: boolean): Promise<void> {
    await this.#chatManager.setTopicsEnabled(chatId, enabled, tabs);
  }

  async setAntispamEnabled(chatId: ID, enabled: boolean): Promise<void> {
    await this.#chatManager.setAntispamEnabled(chatId, enabled);
  }

  async setSignaturesEnabled(chatId: ID, enabled: boolean, params?: SetSignaturesEnabledParams): Promise<void> {
    await this.#chatManager.setSignaturesEnabled(chatId, enabled, params);
  }

  async deleteChat(chatId: ID): Promise<void> {
    await this.#chatManager.deleteChat(chatId);
  }

  async getDiscussionChatSuggestions(): Promise<ChatP[]> {
    return await this.#chatManager.getDiscussionChatSuggestions();
  }

  async setDiscussionChat(chatId: ID, discussionChatId: ID): Promise<void> {
    await this.#chatManager.setDiscussionChat(chatId, discussionChatId);
  }

  async transferChatOwnership(chatId: ID, userId: ID, password: string): Promise<void> {
    await this.#chatManager.transferChatOwnership(chatId, userId, password);
  }

  async createTopic(chatId: ID, title: string, params?: CreateTopicParams): Promise<Topic> {
    return await this.#forumManager.createTopic(chatId, title, params);
  }

  async editTopic(chatId: ID, topicId: number, title: string, params?: EditTopicParams): Promise<Topic> {
    return await this.#forumManager.editTopic(chatId, topicId, title, params);
  }

  async hideGeneralTopic(chatId: ID): Promise<void> {
    await this.#forumManager.hideGeneralTopic(chatId);
  }

  async showGeneralTopic(chatId: ID): Promise<void> {
    await this.#forumManager.showGeneralTopic(chatId);
  }

  async closeTopic(chatId: ID, topicId: number): Promise<void> {
    await this.#forumManager.closeTopic(chatId, topicId);
  }

  async reopenTopic(chatId: ID, topicId: number): Promise<void> {
    await this.#forumManager.reopenTopic(chatId, topicId);
  }

  async pinTopic(chatId: ID, topicId: number): Promise<void> {
    await this.#forumManager.pinTopic(chatId, topicId);
  }

  async unpinTopic(chatId: ID, topicId: number): Promise<void> {
    await this.#forumManager.unpinTopic(chatId, topicId);
  }

  async promoteChatMember(chatId: ID, userId: ID, params?: PromoteChatMemberParams): Promise<void> {
    await this.#chatManager.promoteChatMember(chatId, userId, params);
  }

  async sendCallbackQuery(botId: ID, messageId: number, question: CallbackQueryQuestion): Promise<CallbackQueryAnswer> {
    return await this.#callbackQueryManager.sendCallbackQuery(botId, messageId, question);
  }

  async answerCallbackQuery(id: string, params?: AnswerCallbackQueryParams) {
    await this.#callbackQueryManager.answerCallbackQuery(id, params);
  }

  async sendInlineQuery(botId: ID, chatId: ID, params?: SendInlineQueryParams): Promise<InlineQueryAnswer> {
    return await this.#inlineQueryManager.sendInlineQuery(botId, chatId, params);
  }

  async answerInlineQuery(id: string, results: InlineQueryResult[], params?: AnswerInlineQueryParams) {
    await this.#inlineQueryManager.answerInlineQuery(id, results, params);
  }

  async setMyDescription(params?: { description?: string; languageCode?: string }) {
    await this.#botInfoManager.setMyDescription(params);
  }

  async setMyName(params?: { name?: string; languageCode?: string }) {
    await this.#botInfoManager.setMyName(params);
  }

  async setMyShortDescription(params?: { shortDescription?: string; languageCode?: string }) {
    await this.#botInfoManager.setMyShortDescription(params);
  }

  async getMyDescription(params?: { languageCode?: string }): Promise<string> {
    return await this.#botInfoManager.getMyDescription(params);
  }

  async getMyName(params?: { languageCode?: string }): Promise<string> {
    return await this.#botInfoManager.getMyName(params);
  }

  async getMyShortDescription(params?: { languageCode?: string }): Promise<string> {
    return await this.#botInfoManager.getMyShortDescription(params);
  }

  async setMyCommands(commands: BotCommand[], params?: SetMyCommandsParams) {
    await this.#botInfoManager.setMyCommands(commands, params);
  }

  async getMyCommands(params?: GetMyCommandsParams): Promise<BotCommand[]> {
    return await this.#botInfoManager.getMyCommands(params);
  }

  async setReactions(chatId: ID, messageId: number, reactions: Reaction[], params?: SetReactionsParams) {
    await this.#messageManager.setReactions(chatId, messageId, reactions, params);
  }

  async addReaction(chatId: ID, messageId: number, reaction: Reaction, params?: AddReactionParams) {
    await this.#messageManager.addReaction(chatId, messageId, reaction, params);
  }

  async removeReaction(chatId: ID, messageId: number, reaction: Reaction) {
    await this.#messageManager.removeReaction(chatId, messageId, reaction);
  }

  async createStory(chatId: ID, content: InputStoryContent, params?: CreateStoryParams): Promise<Story> {
    return await this.#storyManager.createStory(chatId, content, params);
  }

  async getStories(chatId: ID, storyIds: number[]): Promise<Story[]> {
    if (!storyIds.length) {
      return [];
    }
    return await this.#storyManager.getStories(chatId, storyIds);
  }

  async getStory(chatId: ID, storyId: number): Promise<Story | null> {
    return await this.#storyManager.getStory(chatId, storyId);
  }

  async deleteStories(chatId: ID, storyIds: number[]) {
    await this.#storyManager.deleteStories(chatId, storyIds);
  }

  async deleteStory(chatId: ID, storyId: number) {
    await this.#storyManager.deleteStory(chatId, storyId);
  }

  async addStoriesToHighlights(chatId: ID, storyIds: number[]) {
    await this.#storyManager.addStoriesToHighlights(chatId, storyIds);
  }

  async addStoryToHighlights(chatId: ID, storyId: number) {
    await this.#storyManager.addStoryToHighlights(chatId, storyId);
  }

  async removeStoriesFromHighlights(chatId: ID, storyIds: number[]) {
    await this.#storyManager.removeStoriesFromHighlights(chatId, storyIds);
  }

  async removeStoryFromHighlights(chatId: ID, storyId: number) {
    await this.#storyManager.removeStoryFromHighlights(chatId, storyId);
  }

  async getNetworkStatistics(): Promise<NetworkStatistics> {
    return await this.#networkStatisticsManager.getNetworkStatistics();
  }

  async blockUser(userId: ID) {
    await this.#messageManager.blockUser(userId);
  }

  async unblockUser(userId: ID) {
    await this.#messageManager.unblockUser(userId);
  }

  async startVideoChat(chatId: ID, params?: StartVideoChatParams): Promise<VideoChatActive> {
    return await this.#videoChatManager.startVideoChat(chatId, params);
  }

  async scheduleVideoChat(chatId: ID, startAt: number, params?: ScheduleVideoChatParams): Promise<VideoChatScheduled> {
    return await this.#videoChatManager.scheduleVideoChat(chatId, startAt, params);
  }

  async joinVideoChat(id: string, params_: string, params?: JoinVideoChatParams): Promise<string> {
    return await this.#videoChatManager.joinVideoChat(id, params_, params);
  }

  async leaveVideoChat(id: string): Promise<void> {
    await this.#videoChatManager.leaveVideoChat(id);
  }

  async joinLiveStream(id: string): Promise<void> {
    await this.#videoChatManager.joinLiveStream(id);
  }

  async getVideoChat(id: string): Promise<VideoChat> {
    return await this.#videoChatManager.getVideoChat(id);
  }

  async getLiveStreamChannels(id: string): Promise<LiveStreamChannel[]> {
    return await this.#videoChatManager.getLiveStreamChannels(id);
  }

  async downloadLiveStreamSegment(id: string, channelId: number, scale: number, timestamp: number, params?: DownloadLiveStreamSegmentParams): Promise<Uint8Array> {
    return await this.#videoChatManager.downloadLiveStreamSegment(id, channelId, scale, timestamp, params);
  }

  async answerPreCheckoutQuery(preCheckoutQueryId: string, ok: boolean, params?: AnswerPreCheckoutQueryParams): Promise<void> {
    await this.#paymentManager.answerPreCheckoutQuery(preCheckoutQueryId, ok, params);
  }

  async refundStarPayment(userId: ID, telegramPaymentChargeId: string): Promise<void> {
    await this.#paymentManager.refundStarPayment(userId, telegramPaymentChargeId);
  }

  async getContacts(): Promise<User[]> {
    return await this.#accountManager.getContacts();
  }

  async deleteContacts(userIds: ID[]): Promise<void> {
    await this.#accountManager.deleteContacts(userIds);
  }

  async deleteContact(userId: ID): Promise<void> {
    await this.#accountManager.deleteContact(userId);
  }

  async addContact(userId: ID, params?: AddContactParams): Promise<void> {
    await this.#accountManager.addContact(userId, params);
  }

  async getTranslations(params?: GetTranslationsParams): Promise<Translation[]> {
    return await this.#translationsManager.getTranslations(params);
  }

  async getGifts(): Promise<Gift[]> {
    return await this.#giftManager.getGifts();
  }

  async getClaimedGifts(chatId: ID, params?: GetClaimedGiftsParams): Promise<ClaimedGifts> {
    return await this.#giftManager.getClaimedGifts(chatId, params);
  }

  async sendGift(chatId: ID, giftId: string, params?: SendGiftParams): Promise<void> {
    await this.#giftManager.sendGift(chatId, giftId, params);
  }

  async sellGift(userId: ID, messageId: number): Promise<void> {
    await this.#giftManager.sellGift(userId, messageId);
  }

  async getGift(slug: string): Promise<Gift> {
    return await this.#giftManager.getGift(slug);
  }
}
