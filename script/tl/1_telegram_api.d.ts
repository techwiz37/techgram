import type { Schema } from "./0_types.js";
declare const R: unique symbol;
export type Function = {
    [R]?: unknown;
};
export type ReturnType<T> = T extends Function ? NonNullable<T[typeof R]> : never;
export interface true_ {
    _: "true";
}
export interface error {
    _: "error";
    code: number;
    text: string;
}
export interface ipPort {
    _: "ipPort";
    ipv4: number;
    port: number;
}
export interface ipPortSecret {
    _: "ipPortSecret";
    ipv4: number;
    port: number;
    secret: Uint8Array<ArrayBuffer>;
}
export interface accessPointRule {
    _: "accessPointRule";
    phone_prefix_rules: string;
    dc_id: number;
    ips: Array<IpPort>;
}
export interface help_configSimple {
    _: "help.configSimple";
    date: number;
    expires: number;
    rules: Array<AccessPointRule>;
}
export interface inputPeerPhotoFileLocationLegacy {
    _: "inputPeerPhotoFileLocationLegacy";
    big?: true;
    peer: InputPeer;
    volume_id: bigint;
    local_id: number;
}
export interface inputStickerSetThumbLegacy {
    _: "inputStickerSetThumbLegacy";
    stickerset: InputStickerSet;
    volume_id: bigint;
    local_id: number;
}
export interface inputPeerEmpty {
    _: "inputPeerEmpty";
}
export interface inputPeerSelf {
    _: "inputPeerSelf";
}
export interface inputPeerChat {
    _: "inputPeerChat";
    chat_id: bigint;
}
export interface inputPeerUser {
    _: "inputPeerUser";
    user_id: bigint;
    access_hash: bigint;
}
export interface inputPeerChannel {
    _: "inputPeerChannel";
    channel_id: bigint;
    access_hash: bigint;
}
export interface inputPeerUserFromMessage {
    _: "inputPeerUserFromMessage";
    peer: InputPeer;
    msg_id: number;
    user_id: bigint;
}
export interface inputPeerChannelFromMessage {
    _: "inputPeerChannelFromMessage";
    peer: InputPeer;
    msg_id: number;
    channel_id: bigint;
}
export interface inputUserEmpty {
    _: "inputUserEmpty";
}
export interface inputUserSelf {
    _: "inputUserSelf";
}
export interface inputUser {
    _: "inputUser";
    user_id: bigint;
    access_hash: bigint;
}
export interface inputUserFromMessage {
    _: "inputUserFromMessage";
    peer: InputPeer;
    msg_id: number;
    user_id: bigint;
}
export interface inputPhoneContact {
    _: "inputPhoneContact";
    client_id: bigint;
    phone: string;
    first_name: string;
    last_name: string;
    note?: TextWithEntities;
}
export interface inputFile {
    _: "inputFile";
    id: bigint;
    parts: number;
    name: string;
    md5_checksum: string;
}
export interface inputFileBig {
    _: "inputFileBig";
    id: bigint;
    parts: number;
    name: string;
}
export interface inputFileStoryDocument {
    _: "inputFileStoryDocument";
    id: InputDocument;
}
export interface inputMediaEmpty {
    _: "inputMediaEmpty";
}
export interface inputMediaUploadedPhoto {
    _: "inputMediaUploadedPhoto";
    spoiler?: true;
    file: InputFile;
    stickers?: Array<InputDocument>;
    ttl_seconds?: number;
}
export interface inputMediaPhoto {
    _: "inputMediaPhoto";
    spoiler?: true;
    id: InputPhoto;
    ttl_seconds?: number;
}
export interface inputMediaGeoPoint {
    _: "inputMediaGeoPoint";
    geo_point: InputGeoPoint;
}
export interface inputMediaContact {
    _: "inputMediaContact";
    phone_number: string;
    first_name: string;
    last_name: string;
    vcard: string;
}
export interface inputMediaUploadedDocument {
    _: "inputMediaUploadedDocument";
    nosound_video?: true;
    force_file?: true;
    spoiler?: true;
    file: InputFile;
    thumb?: InputFile;
    mime_type: string;
    attributes: Array<DocumentAttribute>;
    stickers?: Array<InputDocument>;
    video_cover?: InputPhoto;
    video_timestamp?: number;
    ttl_seconds?: number;
}
export interface inputMediaDocument {
    _: "inputMediaDocument";
    spoiler?: true;
    id: InputDocument;
    video_cover?: InputPhoto;
    video_timestamp?: number;
    ttl_seconds?: number;
    query?: string;
}
export interface inputMediaVenue {
    _: "inputMediaVenue";
    geo_point: InputGeoPoint;
    title: string;
    address: string;
    provider: string;
    venue_id: string;
    venue_type: string;
}
export interface inputMediaPhotoExternal {
    _: "inputMediaPhotoExternal";
    spoiler?: true;
    url: string;
    ttl_seconds?: number;
}
export interface inputMediaDocumentExternal {
    _: "inputMediaDocumentExternal";
    spoiler?: true;
    url: string;
    ttl_seconds?: number;
    video_cover?: InputPhoto;
    video_timestamp?: number;
}
export interface inputMediaGame {
    _: "inputMediaGame";
    id: InputGame;
}
export interface inputMediaInvoice {
    _: "inputMediaInvoice";
    title: string;
    description: string;
    photo?: InputWebDocument;
    invoice: Invoice;
    payload: Uint8Array<ArrayBuffer>;
    provider?: string;
    provider_data: DataJSON;
    start_param?: string;
    extended_media?: InputMedia;
}
export interface inputMediaGeoLive {
    _: "inputMediaGeoLive";
    stopped?: true;
    geo_point: InputGeoPoint;
    heading?: number;
    period?: number;
    proximity_notification_radius?: number;
}
export interface inputMediaPoll {
    _: "inputMediaPoll";
    poll: Poll;
    correct_answers?: Array<Uint8Array<ArrayBuffer>>;
    solution?: string;
    solution_entities?: Array<MessageEntity>;
}
export interface inputMediaDice {
    _: "inputMediaDice";
    emoticon: string;
}
export interface inputMediaStory {
    _: "inputMediaStory";
    peer: InputPeer;
    id: number;
}
export interface inputMediaWebPage {
    _: "inputMediaWebPage";
    force_large_media?: true;
    force_small_media?: true;
    optional?: true;
    url: string;
}
export interface inputMediaPaidMedia {
    _: "inputMediaPaidMedia";
    stars_amount: bigint;
    extended_media: Array<InputMedia>;
    payload?: string;
}
export interface inputMediaTodo {
    _: "inputMediaTodo";
    todo: TodoList;
}
export interface inputMediaStakeDice {
    _: "inputMediaStakeDice";
    game_hash: string;
    ton_amount: bigint;
    client_seed: Uint8Array<ArrayBuffer>;
}
export interface inputChatPhotoEmpty {
    _: "inputChatPhotoEmpty";
}
export interface inputChatUploadedPhoto {
    _: "inputChatUploadedPhoto";
    file?: InputFile;
    video?: InputFile;
    video_start_ts?: number;
    video_emoji_markup?: VideoSize;
}
export interface inputChatPhoto {
    _: "inputChatPhoto";
    id: InputPhoto;
}
export interface inputGeoPointEmpty {
    _: "inputGeoPointEmpty";
}
export interface inputGeoPoint {
    _: "inputGeoPoint";
    lat: number;
    long: number;
    accuracy_radius?: number;
}
export interface inputPhotoEmpty {
    _: "inputPhotoEmpty";
}
export interface inputPhoto {
    _: "inputPhoto";
    id: bigint;
    access_hash: bigint;
    file_reference: Uint8Array<ArrayBuffer>;
}
export interface inputFileLocation {
    _: "inputFileLocation";
    volume_id: bigint;
    local_id: number;
    secret: bigint;
    file_reference: Uint8Array<ArrayBuffer>;
}
export interface inputEncryptedFileLocation {
    _: "inputEncryptedFileLocation";
    id: bigint;
    access_hash: bigint;
}
export interface inputDocumentFileLocation {
    _: "inputDocumentFileLocation";
    id: bigint;
    access_hash: bigint;
    file_reference: Uint8Array<ArrayBuffer>;
    thumb_size: string;
}
export interface inputSecureFileLocation {
    _: "inputSecureFileLocation";
    id: bigint;
    access_hash: bigint;
}
export interface inputTakeoutFileLocation {
    _: "inputTakeoutFileLocation";
}
export interface inputPhotoFileLocation {
    _: "inputPhotoFileLocation";
    id: bigint;
    access_hash: bigint;
    file_reference: Uint8Array<ArrayBuffer>;
    thumb_size: string;
}
export interface inputPhotoLegacyFileLocation {
    _: "inputPhotoLegacyFileLocation";
    id: bigint;
    access_hash: bigint;
    file_reference: Uint8Array<ArrayBuffer>;
    volume_id: bigint;
    local_id: number;
    secret: bigint;
}
export interface inputPeerPhotoFileLocation {
    _: "inputPeerPhotoFileLocation";
    big?: true;
    peer: InputPeer;
    photo_id: bigint;
}
export interface inputStickerSetThumb {
    _: "inputStickerSetThumb";
    stickerset: InputStickerSet;
    thumb_version: number;
}
export interface inputGroupCallStream {
    _: "inputGroupCallStream";
    call: InputGroupCall;
    time_ms: bigint;
    scale: number;
    video_channel?: number;
    video_quality?: number;
}
export interface peerUser {
    _: "peerUser";
    user_id: bigint;
}
export interface peerChat {
    _: "peerChat";
    chat_id: bigint;
}
export interface peerChannel {
    _: "peerChannel";
    channel_id: bigint;
}
export interface storage_fileUnknown {
    _: "storage.fileUnknown";
}
export interface storage_filePartial {
    _: "storage.filePartial";
}
export interface storage_fileJpeg {
    _: "storage.fileJpeg";
}
export interface storage_fileGif {
    _: "storage.fileGif";
}
export interface storage_filePng {
    _: "storage.filePng";
}
export interface storage_filePdf {
    _: "storage.filePdf";
}
export interface storage_fileMp3 {
    _: "storage.fileMp3";
}
export interface storage_fileMov {
    _: "storage.fileMov";
}
export interface storage_fileMp4 {
    _: "storage.fileMp4";
}
export interface storage_fileWebp {
    _: "storage.fileWebp";
}
export interface userEmpty {
    _: "userEmpty";
    id: bigint;
}
export interface user {
    _: "user";
    self?: true;
    contact?: true;
    mutual_contact?: true;
    deleted?: true;
    bot?: true;
    bot_chat_history?: true;
    bot_nochats?: true;
    verified?: true;
    restricted?: true;
    min?: true;
    bot_inline_geo?: true;
    support?: true;
    scam?: true;
    apply_min_photo?: true;
    fake?: true;
    bot_attach_menu?: true;
    premium?: true;
    attach_menu_enabled?: true;
    bot_can_edit?: true;
    close_friend?: true;
    stories_hidden?: true;
    stories_unavailable?: true;
    contact_require_premium?: true;
    bot_business?: true;
    bot_has_main_app?: true;
    bot_forum_view?: true;
    id: bigint;
    access_hash?: bigint;
    first_name?: string;
    last_name?: string;
    username?: string;
    phone?: string;
    photo?: UserProfilePhoto;
    status?: UserStatus;
    bot_info_version?: number;
    restriction_reason?: Array<RestrictionReason>;
    bot_inline_placeholder?: string;
    lang_code?: string;
    emoji_status?: EmojiStatus;
    usernames?: Array<Username>;
    stories_max_id?: RecentStory;
    color?: PeerColor;
    profile_color?: PeerColor;
    bot_active_users?: number;
    bot_verification_icon?: bigint;
    send_paid_messages_stars?: bigint;
}
export interface userProfilePhotoEmpty {
    _: "userProfilePhotoEmpty";
}
export interface userProfilePhoto {
    _: "userProfilePhoto";
    has_video?: true;
    personal?: true;
    photo_id: bigint;
    stripped_thumb?: Uint8Array<ArrayBuffer>;
    dc_id: number;
}
export interface userStatusEmpty {
    _: "userStatusEmpty";
}
export interface userStatusOnline {
    _: "userStatusOnline";
    expires: number;
}
export interface userStatusOffline {
    _: "userStatusOffline";
    was_online: number;
}
export interface userStatusRecently {
    _: "userStatusRecently";
    by_me?: true;
}
export interface userStatusLastWeek {
    _: "userStatusLastWeek";
    by_me?: true;
}
export interface userStatusLastMonth {
    _: "userStatusLastMonth";
    by_me?: true;
}
export interface chatEmpty {
    _: "chatEmpty";
    id: bigint;
}
export interface chat {
    _: "chat";
    creator?: true;
    left?: true;
    deactivated?: true;
    call_active?: true;
    call_not_empty?: true;
    noforwards?: true;
    id: bigint;
    title: string;
    photo: ChatPhoto;
    participants_count: number;
    date: number;
    version: number;
    migrated_to?: InputChannel;
    admin_rights?: ChatAdminRights;
    default_banned_rights?: ChatBannedRights;
}
export interface chatForbidden {
    _: "chatForbidden";
    id: bigint;
    title: string;
}
export interface channel {
    _: "channel";
    creator?: true;
    left?: true;
    broadcast?: true;
    verified?: true;
    megagroup?: true;
    restricted?: true;
    signatures?: true;
    min?: true;
    scam?: true;
    has_link?: true;
    has_geo?: true;
    slowmode_enabled?: true;
    call_active?: true;
    call_not_empty?: true;
    fake?: true;
    gigagroup?: true;
    noforwards?: true;
    join_to_send?: true;
    join_request?: true;
    forum?: true;
    stories_hidden?: true;
    stories_hidden_min?: true;
    stories_unavailable?: true;
    signature_profiles?: true;
    autotranslation?: true;
    broadcast_messages_allowed?: true;
    monoforum?: true;
    forum_tabs?: true;
    id: bigint;
    access_hash?: bigint;
    title: string;
    username?: string;
    photo: ChatPhoto;
    date: number;
    restriction_reason?: Array<RestrictionReason>;
    admin_rights?: ChatAdminRights;
    banned_rights?: ChatBannedRights;
    default_banned_rights?: ChatBannedRights;
    participants_count?: number;
    usernames?: Array<Username>;
    stories_max_id?: RecentStory;
    color?: PeerColor;
    profile_color?: PeerColor;
    emoji_status?: EmojiStatus;
    level?: number;
    subscription_until_date?: number;
    bot_verification_icon?: bigint;
    send_paid_messages_stars?: bigint;
    linked_monoforum_id?: bigint;
}
export interface channelForbidden {
    _: "channelForbidden";
    broadcast?: true;
    megagroup?: true;
    id: bigint;
    access_hash: bigint;
    title: string;
    until_date?: number;
}
export interface chatFull {
    _: "chatFull";
    can_set_username?: true;
    has_scheduled?: true;
    translations_disabled?: true;
    id: bigint;
    about: string;
    participants: ChatParticipants;
    chat_photo?: Photo;
    notify_settings: PeerNotifySettings;
    exported_invite?: ExportedChatInvite;
    bot_info?: Array<BotInfo>;
    pinned_msg_id?: number;
    folder_id?: number;
    call?: InputGroupCall;
    ttl_period?: number;
    groupcall_default_join_as?: Peer;
    theme_emoticon?: string;
    requests_pending?: number;
    recent_requesters?: Array<bigint>;
    available_reactions?: ChatReactions;
    reactions_limit?: number;
}
export interface channelFull {
    _: "channelFull";
    can_view_participants?: true;
    can_set_username?: true;
    can_set_stickers?: true;
    hidden_prehistory?: true;
    can_set_location?: true;
    has_scheduled?: true;
    can_view_stats?: true;
    blocked?: true;
    can_delete_channel?: true;
    antispam?: true;
    participants_hidden?: true;
    translations_disabled?: true;
    stories_pinned_available?: true;
    view_forum_as_messages?: true;
    restricted_sponsored?: true;
    can_view_revenue?: true;
    paid_media_allowed?: true;
    can_view_stars_revenue?: true;
    paid_reactions_available?: true;
    stargifts_available?: true;
    paid_messages_available?: true;
    id: bigint;
    about: string;
    participants_count?: number;
    admins_count?: number;
    kicked_count?: number;
    banned_count?: number;
    online_count?: number;
    read_inbox_max_id: number;
    read_outbox_max_id: number;
    unread_count: number;
    chat_photo: Photo;
    notify_settings: PeerNotifySettings;
    exported_invite?: ExportedChatInvite;
    bot_info: Array<BotInfo>;
    migrated_from_chat_id?: bigint;
    migrated_from_max_id?: number;
    pinned_msg_id?: number;
    stickerset?: StickerSet;
    available_min_id?: number;
    folder_id?: number;
    linked_chat_id?: bigint;
    location?: ChannelLocation;
    slowmode_seconds?: number;
    slowmode_next_send_date?: number;
    stats_dc?: number;
    pts: number;
    call?: InputGroupCall;
    ttl_period?: number;
    pending_suggestions?: Array<string>;
    groupcall_default_join_as?: Peer;
    theme_emoticon?: string;
    requests_pending?: number;
    recent_requesters?: Array<bigint>;
    default_send_as?: Peer;
    available_reactions?: ChatReactions;
    reactions_limit?: number;
    stories?: PeerStories;
    wallpaper?: WallPaper;
    boosts_applied?: number;
    boosts_unrestrict?: number;
    emojiset?: StickerSet;
    bot_verification?: BotVerification;
    stargifts_count?: number;
    send_paid_messages_stars?: bigint;
    main_tab?: ProfileTab;
}
export interface chatParticipant {
    _: "chatParticipant";
    user_id: bigint;
    inviter_id: bigint;
    date: number;
}
export interface chatParticipantCreator {
    _: "chatParticipantCreator";
    user_id: bigint;
}
export interface chatParticipantAdmin {
    _: "chatParticipantAdmin";
    user_id: bigint;
    inviter_id: bigint;
    date: number;
}
export interface chatParticipantsForbidden {
    _: "chatParticipantsForbidden";
    chat_id: bigint;
    self_participant?: ChatParticipant;
}
export interface chatParticipants {
    _: "chatParticipants";
    chat_id: bigint;
    participants: Array<ChatParticipant>;
    version: number;
}
export interface chatPhotoEmpty {
    _: "chatPhotoEmpty";
}
export interface chatPhoto {
    _: "chatPhoto";
    has_video?: true;
    photo_id: bigint;
    stripped_thumb?: Uint8Array<ArrayBuffer>;
    dc_id: number;
}
export interface messageEmpty {
    _: "messageEmpty";
    id: number;
    peer_id?: Peer;
}
export interface message {
    _: "message";
    out?: true;
    mentioned?: true;
    media_unread?: true;
    silent?: true;
    post?: true;
    from_scheduled?: true;
    legacy?: true;
    edit_hide?: true;
    pinned?: true;
    noforwards?: true;
    invert_media?: true;
    offline?: true;
    video_processing_pending?: true;
    paid_suggested_post_stars?: true;
    paid_suggested_post_ton?: true;
    id: number;
    from_id?: Peer;
    from_boosts_applied?: number;
    peer_id: Peer;
    saved_peer_id?: Peer;
    fwd_from?: MessageFwdHeader;
    via_bot_id?: bigint;
    via_business_bot_id?: bigint;
    reply_to?: MessageReplyHeader;
    date: number;
    message: string;
    media?: MessageMedia;
    reply_markup?: ReplyMarkup;
    entities?: Array<MessageEntity>;
    views?: number;
    forwards?: number;
    replies?: MessageReplies;
    edit_date?: number;
    post_author?: string;
    grouped_id?: bigint;
    reactions?: MessageReactions;
    restriction_reason?: Array<RestrictionReason>;
    ttl_period?: number;
    quick_reply_shortcut_id?: number;
    effect?: bigint;
    factcheck?: FactCheck;
    report_delivery_until_date?: number;
    paid_message_stars?: bigint;
    suggested_post?: SuggestedPost;
    schedule_repeat_period?: number;
    summary_from_language?: string;
}
export interface messageService {
    _: "messageService";
    out?: true;
    mentioned?: true;
    media_unread?: true;
    reactions_are_possible?: true;
    silent?: true;
    post?: true;
    legacy?: true;
    id: number;
    from_id?: Peer;
    peer_id: Peer;
    saved_peer_id?: Peer;
    reply_to?: MessageReplyHeader;
    date: number;
    action: MessageAction;
    reactions?: MessageReactions;
    ttl_period?: number;
}
export interface messageMediaEmpty {
    _: "messageMediaEmpty";
}
export interface messageMediaPhoto {
    _: "messageMediaPhoto";
    spoiler?: true;
    photo?: Photo;
    ttl_seconds?: number;
}
export interface messageMediaGeo {
    _: "messageMediaGeo";
    geo: GeoPoint;
}
export interface messageMediaContact {
    _: "messageMediaContact";
    phone_number: string;
    first_name: string;
    last_name: string;
    vcard: string;
    user_id: bigint;
}
export interface messageMediaUnsupported {
    _: "messageMediaUnsupported";
}
export interface messageMediaDocument {
    _: "messageMediaDocument";
    nopremium?: true;
    spoiler?: true;
    video?: true;
    round?: true;
    voice?: true;
    document?: Document;
    alt_documents?: Array<Document>;
    video_cover?: Photo;
    video_timestamp?: number;
    ttl_seconds?: number;
}
export interface messageMediaWebPage {
    _: "messageMediaWebPage";
    force_large_media?: true;
    force_small_media?: true;
    manual?: true;
    safe?: true;
    webpage: WebPage;
}
export interface messageMediaVenue {
    _: "messageMediaVenue";
    geo: GeoPoint;
    title: string;
    address: string;
    provider: string;
    venue_id: string;
    venue_type: string;
}
export interface messageMediaGame {
    _: "messageMediaGame";
    game: Game;
}
export interface messageMediaInvoice {
    _: "messageMediaInvoice";
    shipping_address_requested?: true;
    test?: true;
    title: string;
    description: string;
    photo?: WebDocument;
    receipt_msg_id?: number;
    currency: string;
    total_amount: bigint;
    start_param: string;
    extended_media?: MessageExtendedMedia;
}
export interface messageMediaGeoLive {
    _: "messageMediaGeoLive";
    geo: GeoPoint;
    heading?: number;
    period: number;
    proximity_notification_radius?: number;
}
export interface messageMediaPoll {
    _: "messageMediaPoll";
    poll: Poll;
    results: PollResults;
}
export interface messageMediaDice {
    _: "messageMediaDice";
    value: number;
    emoticon: string;
    game_outcome?: messages_EmojiGameOutcome;
}
export interface messageMediaStory {
    _: "messageMediaStory";
    via_mention?: true;
    peer: Peer;
    id: number;
    story?: StoryItem;
}
export interface messageMediaGiveaway {
    _: "messageMediaGiveaway";
    only_new_subscribers?: true;
    winners_are_visible?: true;
    channels: Array<bigint>;
    countries_iso2?: Array<string>;
    prize_description?: string;
    quantity: number;
    months?: number;
    stars?: bigint;
    until_date: number;
}
export interface messageMediaGiveawayResults {
    _: "messageMediaGiveawayResults";
    only_new_subscribers?: true;
    refunded?: true;
    channel_id: bigint;
    additional_peers_count?: number;
    launch_msg_id: number;
    winners_count: number;
    unclaimed_count: number;
    winners: Array<bigint>;
    months?: number;
    stars?: bigint;
    prize_description?: string;
    until_date: number;
}
export interface messageMediaPaidMedia {
    _: "messageMediaPaidMedia";
    stars_amount: bigint;
    extended_media: Array<MessageExtendedMedia>;
}
export interface messageMediaToDo {
    _: "messageMediaToDo";
    todo: TodoList;
    completions?: Array<TodoCompletion>;
}
export interface messageMediaVideoStream {
    _: "messageMediaVideoStream";
    rtmp_stream?: true;
    call: InputGroupCall;
}
export interface messageActionEmpty {
    _: "messageActionEmpty";
}
export interface messageActionChatCreate {
    _: "messageActionChatCreate";
    title: string;
    users: Array<bigint>;
}
export interface messageActionChatEditTitle {
    _: "messageActionChatEditTitle";
    title: string;
}
export interface messageActionChatEditPhoto {
    _: "messageActionChatEditPhoto";
    photo: Photo;
}
export interface messageActionChatDeletePhoto {
    _: "messageActionChatDeletePhoto";
}
export interface messageActionChatAddUser {
    _: "messageActionChatAddUser";
    users: Array<bigint>;
}
export interface messageActionChatDeleteUser {
    _: "messageActionChatDeleteUser";
    user_id: bigint;
}
export interface messageActionChatJoinedByLink {
    _: "messageActionChatJoinedByLink";
    inviter_id: bigint;
}
export interface messageActionChannelCreate {
    _: "messageActionChannelCreate";
    title: string;
}
export interface messageActionChatMigrateTo {
    _: "messageActionChatMigrateTo";
    channel_id: bigint;
}
export interface messageActionChannelMigrateFrom {
    _: "messageActionChannelMigrateFrom";
    title: string;
    chat_id: bigint;
}
export interface messageActionPinMessage {
    _: "messageActionPinMessage";
}
export interface messageActionHistoryClear {
    _: "messageActionHistoryClear";
}
export interface messageActionGameScore {
    _: "messageActionGameScore";
    game_id: bigint;
    score: number;
}
export interface messageActionPaymentSentMe {
    _: "messageActionPaymentSentMe";
    recurring_init?: true;
    recurring_used?: true;
    currency: string;
    total_amount: bigint;
    payload: Uint8Array<ArrayBuffer>;
    info?: PaymentRequestedInfo;
    shipping_option_id?: string;
    charge: PaymentCharge;
    subscription_until_date?: number;
}
export interface messageActionPaymentSent {
    _: "messageActionPaymentSent";
    recurring_init?: true;
    recurring_used?: true;
    currency: string;
    total_amount: bigint;
    invoice_slug?: string;
    subscription_until_date?: number;
}
export interface messageActionPhoneCall {
    _: "messageActionPhoneCall";
    video?: true;
    call_id: bigint;
    reason?: PhoneCallDiscardReason;
    duration?: number;
}
export interface messageActionScreenshotTaken {
    _: "messageActionScreenshotTaken";
}
export interface messageActionCustomAction {
    _: "messageActionCustomAction";
    message: string;
}
export interface messageActionBotAllowed {
    _: "messageActionBotAllowed";
    attach_menu?: true;
    from_request?: true;
    domain?: string;
    app?: BotApp;
}
export interface messageActionSecureValuesSentMe {
    _: "messageActionSecureValuesSentMe";
    values: Array<SecureValue>;
    credentials: SecureCredentialsEncrypted;
}
export interface messageActionSecureValuesSent {
    _: "messageActionSecureValuesSent";
    types: Array<SecureValueType>;
}
export interface messageActionContactSignUp {
    _: "messageActionContactSignUp";
}
export interface messageActionGeoProximityReached {
    _: "messageActionGeoProximityReached";
    from_id: Peer;
    to_id: Peer;
    distance: number;
}
export interface messageActionGroupCall {
    _: "messageActionGroupCall";
    call: InputGroupCall;
    duration?: number;
}
export interface messageActionInviteToGroupCall {
    _: "messageActionInviteToGroupCall";
    call: InputGroupCall;
    users: Array<bigint>;
}
export interface messageActionSetMessagesTTL {
    _: "messageActionSetMessagesTTL";
    period: number;
    auto_setting_from?: bigint;
}
export interface messageActionGroupCallScheduled {
    _: "messageActionGroupCallScheduled";
    call: InputGroupCall;
    schedule_date: number;
}
export interface messageActionSetChatTheme {
    _: "messageActionSetChatTheme";
    theme: ChatTheme;
}
export interface messageActionChatJoinedByRequest {
    _: "messageActionChatJoinedByRequest";
}
export interface messageActionWebViewDataSentMe {
    _: "messageActionWebViewDataSentMe";
    text: string;
    data: string;
}
export interface messageActionWebViewDataSent {
    _: "messageActionWebViewDataSent";
    text: string;
}
export interface messageActionGiftPremium {
    _: "messageActionGiftPremium";
    currency: string;
    amount: bigint;
    days: number;
    crypto_currency?: string;
    crypto_amount?: bigint;
    message?: TextWithEntities;
}
export interface messageActionTopicCreate {
    _: "messageActionTopicCreate";
    title_missing?: true;
    title: string;
    icon_color: number;
    icon_emoji_id?: bigint;
}
export interface messageActionTopicEdit {
    _: "messageActionTopicEdit";
    title?: string;
    icon_emoji_id?: bigint;
    closed?: boolean;
    hidden?: boolean;
}
export interface messageActionSuggestProfilePhoto {
    _: "messageActionSuggestProfilePhoto";
    photo: Photo;
}
export interface messageActionRequestedPeer {
    _: "messageActionRequestedPeer";
    button_id: number;
    peers: Array<Peer>;
}
export interface messageActionSetChatWallPaper {
    _: "messageActionSetChatWallPaper";
    same?: true;
    for_both?: true;
    wallpaper: WallPaper;
}
export interface messageActionGiftCode {
    _: "messageActionGiftCode";
    via_giveaway?: true;
    unclaimed?: true;
    boost_peer?: Peer;
    days: number;
    slug: string;
    currency?: string;
    amount?: bigint;
    crypto_currency?: string;
    crypto_amount?: bigint;
    message?: TextWithEntities;
}
export interface messageActionGiveawayLaunch {
    _: "messageActionGiveawayLaunch";
    stars?: bigint;
}
export interface messageActionGiveawayResults {
    _: "messageActionGiveawayResults";
    stars?: true;
    winners_count: number;
    unclaimed_count: number;
}
export interface messageActionBoostApply {
    _: "messageActionBoostApply";
    boosts: number;
}
export interface messageActionRequestedPeerSentMe {
    _: "messageActionRequestedPeerSentMe";
    button_id: number;
    peers: Array<RequestedPeer>;
}
export interface messageActionPaymentRefunded {
    _: "messageActionPaymentRefunded";
    peer: Peer;
    currency: string;
    total_amount: bigint;
    payload?: Uint8Array<ArrayBuffer>;
    charge: PaymentCharge;
}
export interface messageActionGiftStars {
    _: "messageActionGiftStars";
    currency: string;
    amount: bigint;
    stars: bigint;
    crypto_currency?: string;
    crypto_amount?: bigint;
    transaction_id?: string;
}
export interface messageActionPrizeStars {
    _: "messageActionPrizeStars";
    unclaimed?: true;
    stars: bigint;
    transaction_id: string;
    boost_peer: Peer;
    giveaway_msg_id: number;
}
export interface messageActionStarGift {
    _: "messageActionStarGift";
    name_hidden?: true;
    saved?: true;
    converted?: true;
    upgraded?: true;
    refunded?: true;
    can_upgrade?: true;
    prepaid_upgrade?: true;
    upgrade_separate?: true;
    auction_acquired?: true;
    gift: StarGift;
    message?: TextWithEntities;
    convert_stars?: bigint;
    upgrade_msg_id?: number;
    upgrade_stars?: bigint;
    from_id?: Peer;
    peer?: Peer;
    saved_id?: bigint;
    prepaid_upgrade_hash?: string;
    gift_msg_id?: number;
    to_id?: Peer;
    gift_num?: number;
}
export interface messageActionStarGiftUnique {
    _: "messageActionStarGiftUnique";
    upgrade?: true;
    transferred?: true;
    saved?: true;
    refunded?: true;
    prepaid_upgrade?: true;
    assigned?: true;
    from_offer?: true;
    gift: StarGift;
    can_export_at?: number;
    transfer_stars?: bigint;
    from_id?: Peer;
    peer?: Peer;
    saved_id?: bigint;
    resale_amount?: StarsAmount;
    can_transfer_at?: number;
    can_resell_at?: number;
    drop_original_details_stars?: bigint;
}
export interface messageActionPaidMessagesRefunded {
    _: "messageActionPaidMessagesRefunded";
    count: number;
    stars: bigint;
}
export interface messageActionPaidMessagesPrice {
    _: "messageActionPaidMessagesPrice";
    broadcast_messages_allowed?: true;
    stars: bigint;
}
export interface messageActionConferenceCall {
    _: "messageActionConferenceCall";
    missed?: true;
    active?: true;
    video?: true;
    call_id: bigint;
    duration?: number;
    other_participants?: Array<Peer>;
}
export interface messageActionTodoCompletions {
    _: "messageActionTodoCompletions";
    completed: Array<number>;
    incompleted: Array<number>;
}
export interface messageActionTodoAppendTasks {
    _: "messageActionTodoAppendTasks";
    list: Array<TodoItem>;
}
export interface messageActionSuggestedPostApproval {
    _: "messageActionSuggestedPostApproval";
    rejected?: true;
    balance_too_low?: true;
    reject_comment?: string;
    schedule_date?: number;
    price?: StarsAmount;
}
export interface messageActionSuggestedPostSuccess {
    _: "messageActionSuggestedPostSuccess";
    price: StarsAmount;
}
export interface messageActionSuggestedPostRefund {
    _: "messageActionSuggestedPostRefund";
    payer_initiated?: true;
}
export interface messageActionGiftTon {
    _: "messageActionGiftTon";
    currency: string;
    amount: bigint;
    crypto_currency: string;
    crypto_amount: bigint;
    transaction_id?: string;
}
export interface messageActionSuggestBirthday {
    _: "messageActionSuggestBirthday";
    birthday: Birthday;
}
export interface messageActionStarGiftPurchaseOffer {
    _: "messageActionStarGiftPurchaseOffer";
    accepted?: true;
    declined?: true;
    gift: StarGift;
    price: StarsAmount;
    expires_at: number;
}
export interface messageActionStarGiftPurchaseOfferDeclined {
    _: "messageActionStarGiftPurchaseOfferDeclined";
    expired?: true;
    gift: StarGift;
    price: StarsAmount;
}
export interface dialog {
    _: "dialog";
    pinned?: true;
    unread_mark?: true;
    view_forum_as_messages?: true;
    peer: Peer;
    top_message: number;
    read_inbox_max_id: number;
    read_outbox_max_id: number;
    unread_count: number;
    unread_mentions_count: number;
    unread_reactions_count: number;
    notify_settings: PeerNotifySettings;
    pts?: number;
    draft?: DraftMessage;
    folder_id?: number;
    ttl_period?: number;
}
export interface dialogFolder {
    _: "dialogFolder";
    pinned?: true;
    folder: Folder;
    peer: Peer;
    top_message: number;
    unread_muted_peers_count: number;
    unread_unmuted_peers_count: number;
    unread_muted_messages_count: number;
    unread_unmuted_messages_count: number;
}
export interface photoEmpty {
    _: "photoEmpty";
    id: bigint;
}
export interface photo {
    _: "photo";
    has_stickers?: true;
    id: bigint;
    access_hash: bigint;
    file_reference: Uint8Array<ArrayBuffer>;
    date: number;
    sizes: Array<PhotoSize>;
    video_sizes?: Array<VideoSize>;
    dc_id: number;
}
export interface photoSizeEmpty {
    _: "photoSizeEmpty";
    type: string;
}
export interface photoSize {
    _: "photoSize";
    type: string;
    w: number;
    h: number;
    size: number;
}
export interface photoCachedSize {
    _: "photoCachedSize";
    type: string;
    w: number;
    h: number;
    bytes: Uint8Array<ArrayBuffer>;
}
export interface photoStrippedSize {
    _: "photoStrippedSize";
    type: string;
    bytes: Uint8Array<ArrayBuffer>;
}
export interface photoSizeProgressive {
    _: "photoSizeProgressive";
    type: string;
    w: number;
    h: number;
    sizes: Array<number>;
}
export interface photoPathSize {
    _: "photoPathSize";
    type: string;
    bytes: Uint8Array<ArrayBuffer>;
}
export interface geoPointEmpty {
    _: "geoPointEmpty";
}
export interface geoPoint {
    _: "geoPoint";
    long: number;
    lat: number;
    access_hash: bigint;
    accuracy_radius?: number;
}
export interface auth_sentCode {
    _: "auth.sentCode";
    type: auth_SentCodeType;
    phone_code_hash: string;
    next_type?: auth_CodeType;
    timeout?: number;
}
export interface auth_sentCodeSuccess {
    _: "auth.sentCodeSuccess";
    authorization: auth_Authorization;
}
export interface auth_sentCodePaymentRequired {
    _: "auth.sentCodePaymentRequired";
    store_product: string;
    phone_code_hash: string;
    support_email_address: string;
    support_email_subject: string;
    currency: string;
    amount: bigint;
}
export interface auth_authorization {
    _: "auth.authorization";
    setup_password_required?: true;
    otherwise_relogin_days?: number;
    tmp_sessions?: number;
    future_auth_token?: Uint8Array<ArrayBuffer>;
    user: User;
}
export interface auth_authorizationSignUpRequired {
    _: "auth.authorizationSignUpRequired";
    terms_of_service?: help_TermsOfService;
}
export interface auth_exportedAuthorization {
    _: "auth.exportedAuthorization";
    id: bigint;
    bytes: Uint8Array<ArrayBuffer>;
}
export interface inputNotifyPeer {
    _: "inputNotifyPeer";
    peer: InputPeer;
}
export interface inputNotifyUsers {
    _: "inputNotifyUsers";
}
export interface inputNotifyChats {
    _: "inputNotifyChats";
}
export interface inputNotifyBroadcasts {
    _: "inputNotifyBroadcasts";
}
export interface inputNotifyForumTopic {
    _: "inputNotifyForumTopic";
    peer: InputPeer;
    top_msg_id: number;
}
export interface inputPeerNotifySettings {
    _: "inputPeerNotifySettings";
    show_previews?: boolean;
    silent?: boolean;
    mute_until?: number;
    sound?: NotificationSound;
    stories_muted?: boolean;
    stories_hide_sender?: boolean;
    stories_sound?: NotificationSound;
}
export interface peerNotifySettings {
    _: "peerNotifySettings";
    show_previews?: boolean;
    silent?: boolean;
    mute_until?: number;
    ios_sound?: NotificationSound;
    android_sound?: NotificationSound;
    other_sound?: NotificationSound;
    stories_muted?: boolean;
    stories_hide_sender?: boolean;
    stories_ios_sound?: NotificationSound;
    stories_android_sound?: NotificationSound;
    stories_other_sound?: NotificationSound;
}
export interface peerSettings {
    _: "peerSettings";
    report_spam?: true;
    add_contact?: true;
    block_contact?: true;
    share_contact?: true;
    need_contacts_exception?: true;
    report_geo?: true;
    autoarchived?: true;
    invite_members?: true;
    request_chat_broadcast?: true;
    business_bot_paused?: true;
    business_bot_can_reply?: true;
    geo_distance?: number;
    request_chat_title?: string;
    request_chat_date?: number;
    business_bot_id?: bigint;
    business_bot_manage_url?: string;
    charge_paid_message_stars?: bigint;
    registration_month?: string;
    phone_country?: string;
    name_change_date?: number;
    photo_change_date?: number;
}
export interface wallPaper {
    _: "wallPaper";
    id: bigint;
    creator?: true;
    default?: true;
    pattern?: true;
    dark?: true;
    access_hash: bigint;
    slug: string;
    document: Document;
    settings?: WallPaperSettings;
}
export interface wallPaperNoFile {
    _: "wallPaperNoFile";
    id: bigint;
    default?: true;
    dark?: true;
    settings?: WallPaperSettings;
}
export interface inputReportReasonSpam {
    _: "inputReportReasonSpam";
}
export interface inputReportReasonViolence {
    _: "inputReportReasonViolence";
}
export interface inputReportReasonPornography {
    _: "inputReportReasonPornography";
}
export interface inputReportReasonChildAbuse {
    _: "inputReportReasonChildAbuse";
}
export interface inputReportReasonOther {
    _: "inputReportReasonOther";
}
export interface inputReportReasonCopyright {
    _: "inputReportReasonCopyright";
}
export interface inputReportReasonGeoIrrelevant {
    _: "inputReportReasonGeoIrrelevant";
}
export interface inputReportReasonFake {
    _: "inputReportReasonFake";
}
export interface inputReportReasonIllegalDrugs {
    _: "inputReportReasonIllegalDrugs";
}
export interface inputReportReasonPersonalDetails {
    _: "inputReportReasonPersonalDetails";
}
export interface userFull {
    _: "userFull";
    blocked?: true;
    phone_calls_available?: true;
    phone_calls_private?: true;
    can_pin_message?: true;
    has_scheduled?: true;
    video_calls_available?: true;
    voice_messages_forbidden?: true;
    translations_disabled?: true;
    stories_pinned_available?: true;
    blocked_my_stories_from?: true;
    wallpaper_overridden?: true;
    contact_require_premium?: true;
    read_dates_private?: true;
    sponsored_enabled?: true;
    can_view_revenue?: true;
    bot_can_manage_emoji_status?: true;
    display_gifts_button?: true;
    id: bigint;
    about?: string;
    settings: PeerSettings;
    personal_photo?: Photo;
    profile_photo?: Photo;
    fallback_photo?: Photo;
    notify_settings: PeerNotifySettings;
    bot_info?: BotInfo;
    pinned_msg_id?: number;
    common_chats_count: number;
    folder_id?: number;
    ttl_period?: number;
    theme?: ChatTheme;
    private_forward_name?: string;
    bot_group_admin_rights?: ChatAdminRights;
    bot_broadcast_admin_rights?: ChatAdminRights;
    wallpaper?: WallPaper;
    stories?: PeerStories;
    business_work_hours?: BusinessWorkHours;
    business_location?: BusinessLocation;
    business_greeting_message?: BusinessGreetingMessage;
    business_away_message?: BusinessAwayMessage;
    business_intro?: BusinessIntro;
    birthday?: Birthday;
    personal_channel_id?: bigint;
    personal_channel_message?: number;
    stargifts_count?: number;
    starref_program?: StarRefProgram;
    bot_verification?: BotVerification;
    send_paid_messages_stars?: bigint;
    disallowed_gifts?: DisallowedGiftsSettings;
    stars_rating?: StarsRating;
    stars_my_pending_rating?: StarsRating;
    stars_my_pending_rating_date?: number;
    main_tab?: ProfileTab;
    saved_music?: Document;
    note?: TextWithEntities;
}
export interface contact {
    _: "contact";
    user_id: bigint;
    mutual: boolean;
}
export interface importedContact {
    _: "importedContact";
    user_id: bigint;
    client_id: bigint;
}
export interface contactStatus {
    _: "contactStatus";
    user_id: bigint;
    status: UserStatus;
}
export interface contacts_contactsNotModified {
    _: "contacts.contactsNotModified";
}
export interface contacts_contacts {
    _: "contacts.contacts";
    contacts: Array<Contact>;
    saved_count: number;
    users: Array<User>;
}
export interface contacts_importedContacts {
    _: "contacts.importedContacts";
    imported: Array<ImportedContact>;
    popular_invites: Array<PopularContact>;
    retry_contacts: Array<bigint>;
    users: Array<User>;
}
export interface contacts_blocked {
    _: "contacts.blocked";
    blocked: Array<PeerBlocked>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface contacts_blockedSlice {
    _: "contacts.blockedSlice";
    count: number;
    blocked: Array<PeerBlocked>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface messages_dialogs {
    _: "messages.dialogs";
    dialogs: Array<Dialog>;
    messages: Array<Message>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface messages_dialogsSlice {
    _: "messages.dialogsSlice";
    count: number;
    dialogs: Array<Dialog>;
    messages: Array<Message>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface messages_dialogsNotModified {
    _: "messages.dialogsNotModified";
    count: number;
}
export interface messages_messages {
    _: "messages.messages";
    messages: Array<Message>;
    topics: Array<ForumTopic>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface messages_messagesSlice {
    _: "messages.messagesSlice";
    inexact?: true;
    count: number;
    next_rate?: number;
    offset_id_offset?: number;
    search_flood?: SearchPostsFlood;
    messages: Array<Message>;
    topics: Array<ForumTopic>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface messages_channelMessages {
    _: "messages.channelMessages";
    inexact?: true;
    pts: number;
    count: number;
    offset_id_offset?: number;
    messages: Array<Message>;
    topics: Array<ForumTopic>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface messages_messagesNotModified {
    _: "messages.messagesNotModified";
    count: number;
}
export interface messages_chats {
    _: "messages.chats";
    chats: Array<Chat>;
}
export interface messages_chatsSlice {
    _: "messages.chatsSlice";
    count: number;
    chats: Array<Chat>;
}
export interface messages_chatFull {
    _: "messages.chatFull";
    full_chat: ChatFull;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface messages_affectedHistory {
    _: "messages.affectedHistory";
    pts: number;
    pts_count: number;
    offset: number;
}
export interface inputMessagesFilterEmpty {
    _: "inputMessagesFilterEmpty";
}
export interface inputMessagesFilterPhotos {
    _: "inputMessagesFilterPhotos";
}
export interface inputMessagesFilterVideo {
    _: "inputMessagesFilterVideo";
}
export interface inputMessagesFilterPhotoVideo {
    _: "inputMessagesFilterPhotoVideo";
}
export interface inputMessagesFilterDocument {
    _: "inputMessagesFilterDocument";
}
export interface inputMessagesFilterUrl {
    _: "inputMessagesFilterUrl";
}
export interface inputMessagesFilterGif {
    _: "inputMessagesFilterGif";
}
export interface inputMessagesFilterVoice {
    _: "inputMessagesFilterVoice";
}
export interface inputMessagesFilterMusic {
    _: "inputMessagesFilterMusic";
}
export interface inputMessagesFilterChatPhotos {
    _: "inputMessagesFilterChatPhotos";
}
export interface inputMessagesFilterPhoneCalls {
    _: "inputMessagesFilterPhoneCalls";
    missed?: true;
}
export interface inputMessagesFilterRoundVoice {
    _: "inputMessagesFilterRoundVoice";
}
export interface inputMessagesFilterRoundVideo {
    _: "inputMessagesFilterRoundVideo";
}
export interface inputMessagesFilterMyMentions {
    _: "inputMessagesFilterMyMentions";
}
export interface inputMessagesFilterGeo {
    _: "inputMessagesFilterGeo";
}
export interface inputMessagesFilterContacts {
    _: "inputMessagesFilterContacts";
}
export interface inputMessagesFilterPinned {
    _: "inputMessagesFilterPinned";
}
export interface updateNewMessage {
    _: "updateNewMessage";
    message: Message;
    pts: number;
    pts_count: number;
}
export interface updateMessageID {
    _: "updateMessageID";
    id: number;
    random_id: bigint;
}
export interface updateDeleteMessages {
    _: "updateDeleteMessages";
    messages: Array<number>;
    pts: number;
    pts_count: number;
}
export interface updateUserTyping {
    _: "updateUserTyping";
    user_id: bigint;
    top_msg_id?: number;
    action: SendMessageAction;
}
export interface updateChatUserTyping {
    _: "updateChatUserTyping";
    chat_id: bigint;
    from_id: Peer;
    action: SendMessageAction;
}
export interface updateChatParticipants {
    _: "updateChatParticipants";
    participants: ChatParticipants;
}
export interface updateUserStatus {
    _: "updateUserStatus";
    user_id: bigint;
    status: UserStatus;
}
export interface updateUserName {
    _: "updateUserName";
    user_id: bigint;
    first_name: string;
    last_name: string;
    usernames: Array<Username>;
}
export interface updateNewAuthorization {
    _: "updateNewAuthorization";
    unconfirmed?: true;
    hash: bigint;
    date?: number;
    device?: string;
    location?: string;
}
export interface updateNewEncryptedMessage {
    _: "updateNewEncryptedMessage";
    message: EncryptedMessage;
    qts: number;
}
export interface updateEncryptedChatTyping {
    _: "updateEncryptedChatTyping";
    chat_id: number;
}
export interface updateEncryption {
    _: "updateEncryption";
    chat: EncryptedChat;
    date: number;
}
export interface updateEncryptedMessagesRead {
    _: "updateEncryptedMessagesRead";
    chat_id: number;
    max_date: number;
    date: number;
}
export interface updateChatParticipantAdd {
    _: "updateChatParticipantAdd";
    chat_id: bigint;
    user_id: bigint;
    inviter_id: bigint;
    date: number;
    version: number;
}
export interface updateChatParticipantDelete {
    _: "updateChatParticipantDelete";
    chat_id: bigint;
    user_id: bigint;
    version: number;
}
export interface updateDcOptions {
    _: "updateDcOptions";
    dc_options: Array<DcOption>;
}
export interface updateNotifySettings {
    _: "updateNotifySettings";
    peer: NotifyPeer;
    notify_settings: PeerNotifySettings;
}
export interface updateServiceNotification {
    _: "updateServiceNotification";
    popup?: true;
    invert_media?: true;
    inbox_date?: number;
    type: string;
    message: string;
    media: MessageMedia;
    entities: Array<MessageEntity>;
}
export interface updatePrivacy {
    _: "updatePrivacy";
    key: PrivacyKey;
    rules: Array<PrivacyRule>;
}
export interface updateUserPhone {
    _: "updateUserPhone";
    user_id: bigint;
    phone: string;
}
export interface updateReadHistoryInbox {
    _: "updateReadHistoryInbox";
    folder_id?: number;
    peer: Peer;
    top_msg_id?: number;
    max_id: number;
    still_unread_count: number;
    pts: number;
    pts_count: number;
}
export interface updateReadHistoryOutbox {
    _: "updateReadHistoryOutbox";
    peer: Peer;
    max_id: number;
    pts: number;
    pts_count: number;
}
export interface updateWebPage {
    _: "updateWebPage";
    webpage: WebPage;
    pts: number;
    pts_count: number;
}
export interface updateReadMessagesContents {
    _: "updateReadMessagesContents";
    messages: Array<number>;
    pts: number;
    pts_count: number;
    date?: number;
}
export interface updateChannelTooLong {
    _: "updateChannelTooLong";
    channel_id: bigint;
    pts?: number;
}
export interface updateChannel {
    _: "updateChannel";
    channel_id: bigint;
}
export interface updateNewChannelMessage {
    _: "updateNewChannelMessage";
    message: Message;
    pts: number;
    pts_count: number;
}
export interface updateReadChannelInbox {
    _: "updateReadChannelInbox";
    folder_id?: number;
    channel_id: bigint;
    max_id: number;
    still_unread_count: number;
    pts: number;
}
export interface updateDeleteChannelMessages {
    _: "updateDeleteChannelMessages";
    channel_id: bigint;
    messages: Array<number>;
    pts: number;
    pts_count: number;
}
export interface updateChannelMessageViews {
    _: "updateChannelMessageViews";
    channel_id: bigint;
    id: number;
    views: number;
}
export interface updateChatParticipantAdmin {
    _: "updateChatParticipantAdmin";
    chat_id: bigint;
    user_id: bigint;
    is_admin: boolean;
    version: number;
}
export interface updateNewStickerSet {
    _: "updateNewStickerSet";
    stickerset: messages_StickerSet;
}
export interface updateStickerSetsOrder {
    _: "updateStickerSetsOrder";
    masks?: true;
    emojis?: true;
    order: Array<bigint>;
}
export interface updateStickerSets {
    _: "updateStickerSets";
    masks?: true;
    emojis?: true;
}
export interface updateSavedGifs {
    _: "updateSavedGifs";
}
export interface updateBotInlineQuery {
    _: "updateBotInlineQuery";
    query_id: bigint;
    user_id: bigint;
    query: string;
    geo?: GeoPoint;
    peer_type?: InlineQueryPeerType;
    offset: string;
}
export interface updateBotInlineSend {
    _: "updateBotInlineSend";
    user_id: bigint;
    query: string;
    geo?: GeoPoint;
    id: string;
    msg_id?: InputBotInlineMessageID;
}
export interface updateEditChannelMessage {
    _: "updateEditChannelMessage";
    message: Message;
    pts: number;
    pts_count: number;
}
export interface updateBotCallbackQuery {
    _: "updateBotCallbackQuery";
    query_id: bigint;
    user_id: bigint;
    peer: Peer;
    msg_id: number;
    chat_instance: bigint;
    data?: Uint8Array<ArrayBuffer>;
    game_short_name?: string;
}
export interface updateEditMessage {
    _: "updateEditMessage";
    message: Message;
    pts: number;
    pts_count: number;
}
export interface updateInlineBotCallbackQuery {
    _: "updateInlineBotCallbackQuery";
    query_id: bigint;
    user_id: bigint;
    msg_id: InputBotInlineMessageID;
    chat_instance: bigint;
    data?: Uint8Array<ArrayBuffer>;
    game_short_name?: string;
}
export interface updateReadChannelOutbox {
    _: "updateReadChannelOutbox";
    channel_id: bigint;
    max_id: number;
}
export interface updateDraftMessage {
    _: "updateDraftMessage";
    peer: Peer;
    top_msg_id?: number;
    saved_peer_id?: Peer;
    draft: DraftMessage;
}
export interface updateReadFeaturedStickers {
    _: "updateReadFeaturedStickers";
}
export interface updateRecentStickers {
    _: "updateRecentStickers";
}
export interface updateConfig {
    _: "updateConfig";
}
export interface updatePtsChanged {
    _: "updatePtsChanged";
}
export interface updateChannelWebPage {
    _: "updateChannelWebPage";
    channel_id: bigint;
    webpage: WebPage;
    pts: number;
    pts_count: number;
}
export interface updateDialogPinned {
    _: "updateDialogPinned";
    pinned?: true;
    folder_id?: number;
    peer: DialogPeer;
}
export interface updatePinnedDialogs {
    _: "updatePinnedDialogs";
    folder_id?: number;
    order?: Array<DialogPeer>;
}
export interface updateBotWebhookJSON {
    _: "updateBotWebhookJSON";
    data: DataJSON;
}
export interface updateBotWebhookJSONQuery {
    _: "updateBotWebhookJSONQuery";
    query_id: bigint;
    data: DataJSON;
    timeout: number;
}
export interface updateBotShippingQuery {
    _: "updateBotShippingQuery";
    query_id: bigint;
    user_id: bigint;
    payload: Uint8Array<ArrayBuffer>;
    shipping_address: PostAddress;
}
export interface updateBotPrecheckoutQuery {
    _: "updateBotPrecheckoutQuery";
    query_id: bigint;
    user_id: bigint;
    payload: Uint8Array<ArrayBuffer>;
    info?: PaymentRequestedInfo;
    shipping_option_id?: string;
    currency: string;
    total_amount: bigint;
}
export interface updatePhoneCall {
    _: "updatePhoneCall";
    phone_call: PhoneCall;
}
export interface updateLangPackTooLong {
    _: "updateLangPackTooLong";
    lang_code: string;
}
export interface updateLangPack {
    _: "updateLangPack";
    difference: LangPackDifference;
}
export interface updateFavedStickers {
    _: "updateFavedStickers";
}
export interface updateChannelReadMessagesContents {
    _: "updateChannelReadMessagesContents";
    channel_id: bigint;
    top_msg_id?: number;
    saved_peer_id?: Peer;
    messages: Array<number>;
}
export interface updateContactsReset {
    _: "updateContactsReset";
}
export interface updateChannelAvailableMessages {
    _: "updateChannelAvailableMessages";
    channel_id: bigint;
    available_min_id: number;
}
export interface updateDialogUnreadMark {
    _: "updateDialogUnreadMark";
    unread?: true;
    peer: DialogPeer;
    saved_peer_id?: Peer;
}
export interface updateMessagePoll {
    _: "updateMessagePoll";
    poll_id: bigint;
    poll?: Poll;
    results: PollResults;
}
export interface updateChatDefaultBannedRights {
    _: "updateChatDefaultBannedRights";
    peer: Peer;
    default_banned_rights: ChatBannedRights;
    version: number;
}
export interface updateFolderPeers {
    _: "updateFolderPeers";
    folder_peers: Array<FolderPeer>;
    pts: number;
    pts_count: number;
}
export interface updatePeerSettings {
    _: "updatePeerSettings";
    peer: Peer;
    settings: PeerSettings;
}
export interface updatePeerLocated {
    _: "updatePeerLocated";
    peers: Array<PeerLocated>;
}
export interface updateNewScheduledMessage {
    _: "updateNewScheduledMessage";
    message: Message;
}
export interface updateDeleteScheduledMessages {
    _: "updateDeleteScheduledMessages";
    peer: Peer;
    messages: Array<number>;
    sent_messages?: Array<number>;
}
export interface updateTheme {
    _: "updateTheme";
    theme: Theme;
}
export interface updateGeoLiveViewed {
    _: "updateGeoLiveViewed";
    peer: Peer;
    msg_id: number;
}
export interface updateLoginToken {
    _: "updateLoginToken";
}
export interface updateMessagePollVote {
    _: "updateMessagePollVote";
    poll_id: bigint;
    peer: Peer;
    options: Array<Uint8Array<ArrayBuffer>>;
    qts: number;
}
export interface updateDialogFilter {
    _: "updateDialogFilter";
    id: number;
    filter?: DialogFilter;
}
export interface updateDialogFilterOrder {
    _: "updateDialogFilterOrder";
    order: Array<number>;
}
export interface updateDialogFilters {
    _: "updateDialogFilters";
}
export interface updatePhoneCallSignalingData {
    _: "updatePhoneCallSignalingData";
    phone_call_id: bigint;
    data: Uint8Array<ArrayBuffer>;
}
export interface updateChannelMessageForwards {
    _: "updateChannelMessageForwards";
    channel_id: bigint;
    id: number;
    forwards: number;
}
export interface updateReadChannelDiscussionInbox {
    _: "updateReadChannelDiscussionInbox";
    channel_id: bigint;
    top_msg_id: number;
    read_max_id: number;
    broadcast_id?: bigint;
    broadcast_post?: number;
}
export interface updateReadChannelDiscussionOutbox {
    _: "updateReadChannelDiscussionOutbox";
    channel_id: bigint;
    top_msg_id: number;
    read_max_id: number;
}
export interface updatePeerBlocked {
    _: "updatePeerBlocked";
    blocked?: true;
    blocked_my_stories_from?: true;
    peer_id: Peer;
}
export interface updateChannelUserTyping {
    _: "updateChannelUserTyping";
    channel_id: bigint;
    top_msg_id?: number;
    from_id: Peer;
    action: SendMessageAction;
}
export interface updatePinnedMessages {
    _: "updatePinnedMessages";
    pinned?: true;
    peer: Peer;
    messages: Array<number>;
    pts: number;
    pts_count: number;
}
export interface updatePinnedChannelMessages {
    _: "updatePinnedChannelMessages";
    pinned?: true;
    channel_id: bigint;
    messages: Array<number>;
    pts: number;
    pts_count: number;
}
export interface updateChat {
    _: "updateChat";
    chat_id: bigint;
}
export interface updateGroupCallParticipants {
    _: "updateGroupCallParticipants";
    call: InputGroupCall;
    participants: Array<GroupCallParticipant>;
    version: number;
}
export interface updateGroupCall {
    _: "updateGroupCall";
    live_story?: true;
    peer?: Peer;
    call: GroupCall;
}
export interface updatePeerHistoryTTL {
    _: "updatePeerHistoryTTL";
    peer: Peer;
    ttl_period?: number;
}
export interface updateChatParticipant {
    _: "updateChatParticipant";
    chat_id: bigint;
    date: number;
    actor_id: bigint;
    user_id: bigint;
    prev_participant?: ChatParticipant;
    new_participant?: ChatParticipant;
    invite?: ExportedChatInvite;
    qts: number;
}
export interface updateChannelParticipant {
    _: "updateChannelParticipant";
    via_chatlist?: true;
    channel_id: bigint;
    date: number;
    actor_id: bigint;
    user_id: bigint;
    prev_participant?: ChannelParticipant;
    new_participant?: ChannelParticipant;
    invite?: ExportedChatInvite;
    qts: number;
}
export interface updateBotStopped {
    _: "updateBotStopped";
    user_id: bigint;
    date: number;
    stopped: boolean;
    qts: number;
}
export interface updateGroupCallConnection {
    _: "updateGroupCallConnection";
    presentation?: true;
    params: DataJSON;
}
export interface updateBotCommands {
    _: "updateBotCommands";
    peer: Peer;
    bot_id: bigint;
    commands: Array<BotCommand>;
}
export interface updatePendingJoinRequests {
    _: "updatePendingJoinRequests";
    peer: Peer;
    requests_pending: number;
    recent_requesters: Array<bigint>;
}
export interface updateBotChatInviteRequester {
    _: "updateBotChatInviteRequester";
    peer: Peer;
    date: number;
    user_id: bigint;
    about: string;
    invite: ExportedChatInvite;
    qts: number;
}
export interface updateMessageReactions {
    _: "updateMessageReactions";
    peer: Peer;
    msg_id: number;
    top_msg_id?: number;
    saved_peer_id?: Peer;
    reactions: MessageReactions;
}
export interface updateAttachMenuBots {
    _: "updateAttachMenuBots";
}
export interface updateWebViewResultSent {
    _: "updateWebViewResultSent";
    query_id: bigint;
}
export interface updateBotMenuButton {
    _: "updateBotMenuButton";
    bot_id: bigint;
    button: BotMenuButton;
}
export interface updateSavedRingtones {
    _: "updateSavedRingtones";
}
export interface updateTranscribedAudio {
    _: "updateTranscribedAudio";
    pending?: true;
    peer: Peer;
    msg_id: number;
    transcription_id: bigint;
    text: string;
}
export interface updateReadFeaturedEmojiStickers {
    _: "updateReadFeaturedEmojiStickers";
}
export interface updateUserEmojiStatus {
    _: "updateUserEmojiStatus";
    user_id: bigint;
    emoji_status: EmojiStatus;
}
export interface updateRecentEmojiStatuses {
    _: "updateRecentEmojiStatuses";
}
export interface updateRecentReactions {
    _: "updateRecentReactions";
}
export interface updateMoveStickerSetToTop {
    _: "updateMoveStickerSetToTop";
    masks?: true;
    emojis?: true;
    stickerset: bigint;
}
export interface updateMessageExtendedMedia {
    _: "updateMessageExtendedMedia";
    peer: Peer;
    msg_id: number;
    extended_media: Array<MessageExtendedMedia>;
}
export interface updateUser {
    _: "updateUser";
    user_id: bigint;
}
export interface updateAutoSaveSettings {
    _: "updateAutoSaveSettings";
}
export interface updateStory {
    _: "updateStory";
    peer: Peer;
    story: StoryItem;
}
export interface updateReadStories {
    _: "updateReadStories";
    peer: Peer;
    max_id: number;
}
export interface updateStoryID {
    _: "updateStoryID";
    id: number;
    random_id: bigint;
}
export interface updateStoriesStealthMode {
    _: "updateStoriesStealthMode";
    stealth_mode: StoriesStealthMode;
}
export interface updateSentStoryReaction {
    _: "updateSentStoryReaction";
    peer: Peer;
    story_id: number;
    reaction: Reaction;
}
export interface updateBotChatBoost {
    _: "updateBotChatBoost";
    peer: Peer;
    boost: Boost;
    qts: number;
}
export interface updateChannelViewForumAsMessages {
    _: "updateChannelViewForumAsMessages";
    channel_id: bigint;
    enabled: boolean;
}
export interface updatePeerWallpaper {
    _: "updatePeerWallpaper";
    wallpaper_overridden?: true;
    peer: Peer;
    wallpaper?: WallPaper;
}
export interface updateBotMessageReaction {
    _: "updateBotMessageReaction";
    peer: Peer;
    msg_id: number;
    date: number;
    actor: Peer;
    old_reactions: Array<Reaction>;
    new_reactions: Array<Reaction>;
    qts: number;
}
export interface updateBotMessageReactions {
    _: "updateBotMessageReactions";
    peer: Peer;
    msg_id: number;
    date: number;
    reactions: Array<ReactionCount>;
    qts: number;
}
export interface updateSavedDialogPinned {
    _: "updateSavedDialogPinned";
    pinned?: true;
    peer: DialogPeer;
}
export interface updatePinnedSavedDialogs {
    _: "updatePinnedSavedDialogs";
    order?: Array<DialogPeer>;
}
export interface updateSavedReactionTags {
    _: "updateSavedReactionTags";
}
export interface updateSmsJob {
    _: "updateSmsJob";
    job_id: string;
}
export interface updateQuickReplies {
    _: "updateQuickReplies";
    quick_replies: Array<QuickReply>;
}
export interface updateNewQuickReply {
    _: "updateNewQuickReply";
    quick_reply: QuickReply;
}
export interface updateDeleteQuickReply {
    _: "updateDeleteQuickReply";
    shortcut_id: number;
}
export interface updateQuickReplyMessage {
    _: "updateQuickReplyMessage";
    message: Message;
}
export interface updateDeleteQuickReplyMessages {
    _: "updateDeleteQuickReplyMessages";
    shortcut_id: number;
    messages: Array<number>;
}
export interface updateBotBusinessConnect {
    _: "updateBotBusinessConnect";
    connection: BotBusinessConnection;
    qts: number;
}
export interface updateBotNewBusinessMessage {
    _: "updateBotNewBusinessMessage";
    connection_id: string;
    message: Message;
    reply_to_message?: Message;
    qts: number;
}
export interface updateBotEditBusinessMessage {
    _: "updateBotEditBusinessMessage";
    connection_id: string;
    message: Message;
    reply_to_message?: Message;
    qts: number;
}
export interface updateBotDeleteBusinessMessage {
    _: "updateBotDeleteBusinessMessage";
    connection_id: string;
    peer: Peer;
    messages: Array<number>;
    qts: number;
}
export interface updateNewStoryReaction {
    _: "updateNewStoryReaction";
    story_id: number;
    peer: Peer;
    reaction: Reaction;
}
export interface updateStarsBalance {
    _: "updateStarsBalance";
    balance: StarsAmount;
}
export interface updateBusinessBotCallbackQuery {
    _: "updateBusinessBotCallbackQuery";
    query_id: bigint;
    user_id: bigint;
    connection_id: string;
    message: Message;
    reply_to_message?: Message;
    chat_instance: bigint;
    data?: Uint8Array<ArrayBuffer>;
}
export interface updateStarsRevenueStatus {
    _: "updateStarsRevenueStatus";
    peer: Peer;
    status: StarsRevenueStatus;
}
export interface updateBotPurchasedPaidMedia {
    _: "updateBotPurchasedPaidMedia";
    user_id: bigint;
    payload: string;
    qts: number;
}
export interface updatePaidReactionPrivacy {
    _: "updatePaidReactionPrivacy";
    private: PaidReactionPrivacy;
}
export interface updateSentPhoneCode {
    _: "updateSentPhoneCode";
    sent_code: auth_SentCode;
}
export interface updateGroupCallChainBlocks {
    _: "updateGroupCallChainBlocks";
    call: InputGroupCall;
    sub_chain_id: number;
    blocks: Array<Uint8Array<ArrayBuffer>>;
    next_offset: number;
}
export interface updateReadMonoForumInbox {
    _: "updateReadMonoForumInbox";
    channel_id: bigint;
    saved_peer_id: Peer;
    read_max_id: number;
}
export interface updateReadMonoForumOutbox {
    _: "updateReadMonoForumOutbox";
    channel_id: bigint;
    saved_peer_id: Peer;
    read_max_id: number;
}
export interface updateMonoForumNoPaidException {
    _: "updateMonoForumNoPaidException";
    exception?: true;
    channel_id: bigint;
    saved_peer_id: Peer;
}
export interface updateGroupCallMessage {
    _: "updateGroupCallMessage";
    call: InputGroupCall;
    message: GroupCallMessage;
}
export interface updateGroupCallEncryptedMessage {
    _: "updateGroupCallEncryptedMessage";
    call: InputGroupCall;
    from_id: Peer;
    encrypted_message: Uint8Array<ArrayBuffer>;
}
export interface updatePinnedForumTopic {
    _: "updatePinnedForumTopic";
    pinned?: true;
    peer: Peer;
    topic_id: number;
}
export interface updatePinnedForumTopics {
    _: "updatePinnedForumTopics";
    peer: Peer;
    order?: Array<number>;
}
export interface updateDeleteGroupCallMessages {
    _: "updateDeleteGroupCallMessages";
    call: InputGroupCall;
    messages: Array<number>;
}
export interface updateStarGiftAuctionState {
    _: "updateStarGiftAuctionState";
    gift_id: bigint;
    state: StarGiftAuctionState;
}
export interface updateStarGiftAuctionUserState {
    _: "updateStarGiftAuctionUserState";
    gift_id: bigint;
    user_state: StarGiftAuctionUserState;
}
export interface updateEmojiGameInfo {
    _: "updateEmojiGameInfo";
    info: messages_EmojiGameInfo;
}
export interface updates_state {
    _: "updates.state";
    pts: number;
    qts: number;
    date: number;
    seq: number;
    unread_count: number;
}
export interface updates_differenceEmpty {
    _: "updates.differenceEmpty";
    date: number;
    seq: number;
}
export interface updates_difference {
    _: "updates.difference";
    new_messages: Array<Message>;
    new_encrypted_messages: Array<EncryptedMessage>;
    other_updates: Array<Update>;
    chats: Array<Chat>;
    users: Array<User>;
    state: updates_State;
}
export interface updates_differenceSlice {
    _: "updates.differenceSlice";
    new_messages: Array<Message>;
    new_encrypted_messages: Array<EncryptedMessage>;
    other_updates: Array<Update>;
    chats: Array<Chat>;
    users: Array<User>;
    intermediate_state: updates_State;
}
export interface updates_differenceTooLong {
    _: "updates.differenceTooLong";
    pts: number;
}
export interface updatesTooLong {
    _: "updatesTooLong";
}
export interface updateShortMessage {
    _: "updateShortMessage";
    out?: true;
    mentioned?: true;
    media_unread?: true;
    silent?: true;
    id: number;
    user_id: bigint;
    message: string;
    pts: number;
    pts_count: number;
    date: number;
    fwd_from?: MessageFwdHeader;
    via_bot_id?: bigint;
    reply_to?: MessageReplyHeader;
    entities?: Array<MessageEntity>;
    ttl_period?: number;
}
export interface updateShortChatMessage {
    _: "updateShortChatMessage";
    out?: true;
    mentioned?: true;
    media_unread?: true;
    silent?: true;
    id: number;
    from_id: bigint;
    chat_id: bigint;
    message: string;
    pts: number;
    pts_count: number;
    date: number;
    fwd_from?: MessageFwdHeader;
    via_bot_id?: bigint;
    reply_to?: MessageReplyHeader;
    entities?: Array<MessageEntity>;
    ttl_period?: number;
}
export interface updateShort {
    _: "updateShort";
    update: Update;
    date: number;
}
export interface updatesCombined {
    _: "updatesCombined";
    updates: Array<Update>;
    users: Array<User>;
    chats: Array<Chat>;
    date: number;
    seq_start: number;
    seq: number;
}
export interface updates {
    _: "updates";
    updates: Array<Update>;
    users: Array<User>;
    chats: Array<Chat>;
    date: number;
    seq: number;
}
export interface updateShortSentMessage {
    _: "updateShortSentMessage";
    out?: true;
    id: number;
    pts: number;
    pts_count: number;
    date: number;
    media?: MessageMedia;
    entities?: Array<MessageEntity>;
    ttl_period?: number;
}
export interface photos_photos {
    _: "photos.photos";
    photos: Array<Photo>;
    users: Array<User>;
}
export interface photos_photosSlice {
    _: "photos.photosSlice";
    count: number;
    photos: Array<Photo>;
    users: Array<User>;
}
export interface photos_photo {
    _: "photos.photo";
    photo: Photo;
    users: Array<User>;
}
export interface upload_file {
    _: "upload.file";
    type: storage_FileType;
    mtime: number;
    bytes: Uint8Array<ArrayBuffer>;
}
export interface upload_fileCdnRedirect {
    _: "upload.fileCdnRedirect";
    dc_id: number;
    file_token: Uint8Array<ArrayBuffer>;
    encryption_key: Uint8Array<ArrayBuffer>;
    encryption_iv: Uint8Array<ArrayBuffer>;
    file_hashes: Array<FileHash>;
}
export interface dcOption {
    _: "dcOption";
    ipv6?: true;
    media_only?: true;
    tcpo_only?: true;
    cdn?: true;
    static?: true;
    this_port_only?: true;
    id: number;
    ip_address: string;
    port: number;
    secret?: Uint8Array<ArrayBuffer>;
}
export interface config {
    _: "config";
    default_p2p_contacts?: true;
    preload_featured_stickers?: true;
    revoke_pm_inbox?: true;
    blocked_mode?: true;
    force_try_ipv6?: true;
    date: number;
    expires: number;
    test_mode: boolean;
    this_dc: number;
    dc_options: Array<DcOption>;
    dc_txt_domain_name: string;
    chat_size_max: number;
    megagroup_size_max: number;
    forwarded_count_max: number;
    online_update_period_ms: number;
    offline_blur_timeout_ms: number;
    offline_idle_timeout_ms: number;
    online_cloud_timeout_ms: number;
    notify_cloud_delay_ms: number;
    notify_default_delay_ms: number;
    push_chat_period_ms: number;
    push_chat_limit: number;
    edit_time_limit: number;
    revoke_time_limit: number;
    revoke_pm_time_limit: number;
    rating_e_decay: number;
    stickers_recent_limit: number;
    channels_read_media_period: number;
    tmp_sessions?: number;
    call_receive_timeout_ms: number;
    call_ring_timeout_ms: number;
    call_connect_timeout_ms: number;
    call_packet_timeout_ms: number;
    me_url_prefix: string;
    autoupdate_url_prefix?: string;
    gif_search_username?: string;
    venue_search_username?: string;
    img_search_username?: string;
    static_maps_provider?: string;
    caption_length_max: number;
    message_length_max: number;
    webfile_dc_id: number;
    suggested_lang_code?: string;
    lang_pack_version?: number;
    base_lang_pack_version?: number;
    reactions_default?: Reaction;
    autologin_token?: string;
}
export interface nearestDc {
    _: "nearestDc";
    country: string;
    this_dc: number;
    nearest_dc: number;
}
export interface help_appUpdate {
    _: "help.appUpdate";
    can_not_skip?: true;
    id: number;
    version: string;
    text: string;
    entities: Array<MessageEntity>;
    document?: Document;
    url?: string;
    sticker?: Document;
}
export interface help_noAppUpdate {
    _: "help.noAppUpdate";
}
export interface help_inviteText {
    _: "help.inviteText";
    message: string;
}
export interface encryptedChatEmpty {
    _: "encryptedChatEmpty";
    id: number;
}
export interface encryptedChatWaiting {
    _: "encryptedChatWaiting";
    id: number;
    access_hash: bigint;
    date: number;
    admin_id: bigint;
    participant_id: bigint;
}
export interface encryptedChatRequested {
    _: "encryptedChatRequested";
    folder_id?: number;
    id: number;
    access_hash: bigint;
    date: number;
    admin_id: bigint;
    participant_id: bigint;
    g_a: Uint8Array<ArrayBuffer>;
}
export interface encryptedChat {
    _: "encryptedChat";
    id: number;
    access_hash: bigint;
    date: number;
    admin_id: bigint;
    participant_id: bigint;
    g_a_or_b: Uint8Array<ArrayBuffer>;
    key_fingerprint: bigint;
}
export interface encryptedChatDiscarded {
    _: "encryptedChatDiscarded";
    history_deleted?: true;
    id: number;
}
export interface inputEncryptedChat {
    _: "inputEncryptedChat";
    chat_id: number;
    access_hash: bigint;
}
export interface encryptedFileEmpty {
    _: "encryptedFileEmpty";
}
export interface encryptedFile {
    _: "encryptedFile";
    id: bigint;
    access_hash: bigint;
    size: bigint;
    dc_id: number;
    key_fingerprint: number;
}
export interface inputEncryptedFileEmpty {
    _: "inputEncryptedFileEmpty";
}
export interface inputEncryptedFileUploaded {
    _: "inputEncryptedFileUploaded";
    id: bigint;
    parts: number;
    md5_checksum: string;
    key_fingerprint: number;
}
export interface inputEncryptedFile {
    _: "inputEncryptedFile";
    id: bigint;
    access_hash: bigint;
}
export interface inputEncryptedFileBigUploaded {
    _: "inputEncryptedFileBigUploaded";
    id: bigint;
    parts: number;
    key_fingerprint: number;
}
export interface encryptedMessage {
    _: "encryptedMessage";
    random_id: bigint;
    chat_id: number;
    date: number;
    bytes: Uint8Array<ArrayBuffer>;
    file: EncryptedFile;
}
export interface encryptedMessageService {
    _: "encryptedMessageService";
    random_id: bigint;
    chat_id: number;
    date: number;
    bytes: Uint8Array<ArrayBuffer>;
}
export interface messages_dhConfigNotModified {
    _: "messages.dhConfigNotModified";
    random: Uint8Array<ArrayBuffer>;
}
export interface messages_dhConfig {
    _: "messages.dhConfig";
    g: number;
    p: Uint8Array<ArrayBuffer>;
    version: number;
    random: Uint8Array<ArrayBuffer>;
}
export interface messages_sentEncryptedMessage {
    _: "messages.sentEncryptedMessage";
    date: number;
}
export interface messages_sentEncryptedFile {
    _: "messages.sentEncryptedFile";
    date: number;
    file: EncryptedFile;
}
export interface inputDocumentEmpty {
    _: "inputDocumentEmpty";
}
export interface inputDocument {
    _: "inputDocument";
    id: bigint;
    access_hash: bigint;
    file_reference: Uint8Array<ArrayBuffer>;
}
export interface documentEmpty {
    _: "documentEmpty";
    id: bigint;
}
export interface document {
    _: "document";
    id: bigint;
    access_hash: bigint;
    file_reference: Uint8Array<ArrayBuffer>;
    date: number;
    mime_type: string;
    size: bigint;
    thumbs?: Array<PhotoSize>;
    video_thumbs?: Array<VideoSize>;
    dc_id: number;
    attributes: Array<DocumentAttribute>;
}
export interface help_support {
    _: "help.support";
    phone_number: string;
    user: User;
}
export interface notifyPeer {
    _: "notifyPeer";
    peer: Peer;
}
export interface notifyUsers {
    _: "notifyUsers";
}
export interface notifyChats {
    _: "notifyChats";
}
export interface notifyBroadcasts {
    _: "notifyBroadcasts";
}
export interface notifyForumTopic {
    _: "notifyForumTopic";
    peer: Peer;
    top_msg_id: number;
}
export interface sendMessageTypingAction {
    _: "sendMessageTypingAction";
}
export interface sendMessageCancelAction {
    _: "sendMessageCancelAction";
}
export interface sendMessageRecordVideoAction {
    _: "sendMessageRecordVideoAction";
}
export interface sendMessageUploadVideoAction {
    _: "sendMessageUploadVideoAction";
    progress: number;
}
export interface sendMessageRecordAudioAction {
    _: "sendMessageRecordAudioAction";
}
export interface sendMessageUploadAudioAction {
    _: "sendMessageUploadAudioAction";
    progress: number;
}
export interface sendMessageUploadPhotoAction {
    _: "sendMessageUploadPhotoAction";
    progress: number;
}
export interface sendMessageUploadDocumentAction {
    _: "sendMessageUploadDocumentAction";
    progress: number;
}
export interface sendMessageGeoLocationAction {
    _: "sendMessageGeoLocationAction";
}
export interface sendMessageChooseContactAction {
    _: "sendMessageChooseContactAction";
}
export interface sendMessageGamePlayAction {
    _: "sendMessageGamePlayAction";
}
export interface sendMessageRecordRoundAction {
    _: "sendMessageRecordRoundAction";
}
export interface sendMessageUploadRoundAction {
    _: "sendMessageUploadRoundAction";
    progress: number;
}
export interface speakingInGroupCallAction {
    _: "speakingInGroupCallAction";
}
export interface sendMessageHistoryImportAction {
    _: "sendMessageHistoryImportAction";
    progress: number;
}
export interface sendMessageChooseStickerAction {
    _: "sendMessageChooseStickerAction";
}
export interface sendMessageEmojiInteraction {
    _: "sendMessageEmojiInteraction";
    emoticon: string;
    msg_id: number;
    interaction: DataJSON;
}
export interface sendMessageEmojiInteractionSeen {
    _: "sendMessageEmojiInteractionSeen";
    emoticon: string;
}
export interface sendMessageTextDraftAction {
    _: "sendMessageTextDraftAction";
    random_id: bigint;
    text: TextWithEntities;
}
export interface contacts_found {
    _: "contacts.found";
    my_results: Array<Peer>;
    results: Array<Peer>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface inputPrivacyKeyStatusTimestamp {
    _: "inputPrivacyKeyStatusTimestamp";
}
export interface inputPrivacyKeyChatInvite {
    _: "inputPrivacyKeyChatInvite";
}
export interface inputPrivacyKeyPhoneCall {
    _: "inputPrivacyKeyPhoneCall";
}
export interface inputPrivacyKeyPhoneP2P {
    _: "inputPrivacyKeyPhoneP2P";
}
export interface inputPrivacyKeyForwards {
    _: "inputPrivacyKeyForwards";
}
export interface inputPrivacyKeyProfilePhoto {
    _: "inputPrivacyKeyProfilePhoto";
}
export interface inputPrivacyKeyPhoneNumber {
    _: "inputPrivacyKeyPhoneNumber";
}
export interface inputPrivacyKeyAddedByPhone {
    _: "inputPrivacyKeyAddedByPhone";
}
export interface inputPrivacyKeyVoiceMessages {
    _: "inputPrivacyKeyVoiceMessages";
}
export interface inputPrivacyKeyAbout {
    _: "inputPrivacyKeyAbout";
}
export interface inputPrivacyKeyBirthday {
    _: "inputPrivacyKeyBirthday";
}
export interface inputPrivacyKeyStarGiftsAutoSave {
    _: "inputPrivacyKeyStarGiftsAutoSave";
}
export interface inputPrivacyKeyNoPaidMessages {
    _: "inputPrivacyKeyNoPaidMessages";
}
export interface inputPrivacyKeySavedMusic {
    _: "inputPrivacyKeySavedMusic";
}
export interface privacyKeyStatusTimestamp {
    _: "privacyKeyStatusTimestamp";
}
export interface privacyKeyChatInvite {
    _: "privacyKeyChatInvite";
}
export interface privacyKeyPhoneCall {
    _: "privacyKeyPhoneCall";
}
export interface privacyKeyPhoneP2P {
    _: "privacyKeyPhoneP2P";
}
export interface privacyKeyForwards {
    _: "privacyKeyForwards";
}
export interface privacyKeyProfilePhoto {
    _: "privacyKeyProfilePhoto";
}
export interface privacyKeyPhoneNumber {
    _: "privacyKeyPhoneNumber";
}
export interface privacyKeyAddedByPhone {
    _: "privacyKeyAddedByPhone";
}
export interface privacyKeyVoiceMessages {
    _: "privacyKeyVoiceMessages";
}
export interface privacyKeyAbout {
    _: "privacyKeyAbout";
}
export interface privacyKeyBirthday {
    _: "privacyKeyBirthday";
}
export interface privacyKeyStarGiftsAutoSave {
    _: "privacyKeyStarGiftsAutoSave";
}
export interface privacyKeyNoPaidMessages {
    _: "privacyKeyNoPaidMessages";
}
export interface privacyKeySavedMusic {
    _: "privacyKeySavedMusic";
}
export interface inputPrivacyValueAllowContacts {
    _: "inputPrivacyValueAllowContacts";
}
export interface inputPrivacyValueAllowAll {
    _: "inputPrivacyValueAllowAll";
}
export interface inputPrivacyValueAllowUsers {
    _: "inputPrivacyValueAllowUsers";
    users: Array<InputUser>;
}
export interface inputPrivacyValueDisallowContacts {
    _: "inputPrivacyValueDisallowContacts";
}
export interface inputPrivacyValueDisallowAll {
    _: "inputPrivacyValueDisallowAll";
}
export interface inputPrivacyValueDisallowUsers {
    _: "inputPrivacyValueDisallowUsers";
    users: Array<InputUser>;
}
export interface inputPrivacyValueAllowChatParticipants {
    _: "inputPrivacyValueAllowChatParticipants";
    chats: Array<bigint>;
}
export interface inputPrivacyValueDisallowChatParticipants {
    _: "inputPrivacyValueDisallowChatParticipants";
    chats: Array<bigint>;
}
export interface inputPrivacyValueAllowCloseFriends {
    _: "inputPrivacyValueAllowCloseFriends";
}
export interface inputPrivacyValueAllowPremium {
    _: "inputPrivacyValueAllowPremium";
}
export interface inputPrivacyValueAllowBots {
    _: "inputPrivacyValueAllowBots";
}
export interface inputPrivacyValueDisallowBots {
    _: "inputPrivacyValueDisallowBots";
}
export interface privacyValueAllowContacts {
    _: "privacyValueAllowContacts";
}
export interface privacyValueAllowAll {
    _: "privacyValueAllowAll";
}
export interface privacyValueAllowUsers {
    _: "privacyValueAllowUsers";
    users: Array<bigint>;
}
export interface privacyValueDisallowContacts {
    _: "privacyValueDisallowContacts";
}
export interface privacyValueDisallowAll {
    _: "privacyValueDisallowAll";
}
export interface privacyValueDisallowUsers {
    _: "privacyValueDisallowUsers";
    users: Array<bigint>;
}
export interface privacyValueAllowChatParticipants {
    _: "privacyValueAllowChatParticipants";
    chats: Array<bigint>;
}
export interface privacyValueDisallowChatParticipants {
    _: "privacyValueDisallowChatParticipants";
    chats: Array<bigint>;
}
export interface privacyValueAllowCloseFriends {
    _: "privacyValueAllowCloseFriends";
}
export interface privacyValueAllowPremium {
    _: "privacyValueAllowPremium";
}
export interface privacyValueAllowBots {
    _: "privacyValueAllowBots";
}
export interface privacyValueDisallowBots {
    _: "privacyValueDisallowBots";
}
export interface account_privacyRules {
    _: "account.privacyRules";
    rules: Array<PrivacyRule>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface accountDaysTTL {
    _: "accountDaysTTL";
    days: number;
}
export interface documentAttributeImageSize {
    _: "documentAttributeImageSize";
    w: number;
    h: number;
}
export interface documentAttributeAnimated {
    _: "documentAttributeAnimated";
}
export interface documentAttributeSticker {
    _: "documentAttributeSticker";
    mask?: true;
    alt: string;
    stickerset: InputStickerSet;
    mask_coords?: MaskCoords;
}
export interface documentAttributeVideo {
    _: "documentAttributeVideo";
    round_message?: true;
    supports_streaming?: true;
    nosound?: true;
    duration: number;
    w: number;
    h: number;
    preload_prefix_size?: number;
    video_start_ts?: number;
    video_codec?: string;
}
export interface documentAttributeAudio {
    _: "documentAttributeAudio";
    voice?: true;
    duration: number;
    title?: string;
    performer?: string;
    waveform?: Uint8Array<ArrayBuffer>;
}
export interface documentAttributeFilename {
    _: "documentAttributeFilename";
    file_name: string;
}
export interface documentAttributeHasStickers {
    _: "documentAttributeHasStickers";
}
export interface documentAttributeCustomEmoji {
    _: "documentAttributeCustomEmoji";
    free?: true;
    text_color?: true;
    alt: string;
    stickerset: InputStickerSet;
}
export interface messages_stickersNotModified {
    _: "messages.stickersNotModified";
}
export interface messages_stickers {
    _: "messages.stickers";
    hash: bigint;
    stickers: Array<Document>;
}
export interface stickerPack {
    _: "stickerPack";
    emoticon: string;
    documents: Array<bigint>;
}
export interface messages_allStickersNotModified {
    _: "messages.allStickersNotModified";
}
export interface messages_allStickers {
    _: "messages.allStickers";
    hash: bigint;
    sets: Array<StickerSet>;
}
export interface messages_affectedMessages {
    _: "messages.affectedMessages";
    pts: number;
    pts_count: number;
}
export interface webPageEmpty {
    _: "webPageEmpty";
    id: bigint;
    url?: string;
}
export interface webPagePending {
    _: "webPagePending";
    id: bigint;
    url?: string;
    date: number;
}
export interface webPage {
    _: "webPage";
    has_large_media?: true;
    video_cover_photo?: true;
    id: bigint;
    url: string;
    display_url: string;
    hash: number;
    type?: string;
    site_name?: string;
    title?: string;
    description?: string;
    photo?: Photo;
    embed_url?: string;
    embed_type?: string;
    embed_width?: number;
    embed_height?: number;
    duration?: number;
    author?: string;
    document?: Document;
    cached_page?: Page;
    attributes?: Array<WebPageAttribute>;
}
export interface webPageNotModified {
    _: "webPageNotModified";
    cached_page_views?: number;
}
export interface authorization {
    _: "authorization";
    current?: true;
    official_app?: true;
    password_pending?: true;
    encrypted_requests_disabled?: true;
    call_requests_disabled?: true;
    unconfirmed?: true;
    hash: bigint;
    device_model: string;
    platform: string;
    system_version: string;
    api_id: number;
    app_name: string;
    app_version: string;
    date_created: number;
    date_active: number;
    ip: string;
    country: string;
    region: string;
}
export interface account_authorizations {
    _: "account.authorizations";
    authorization_ttl_days: number;
    authorizations: Array<Authorization>;
}
export interface account_password {
    _: "account.password";
    has_recovery?: true;
    has_secure_values?: true;
    has_password?: true;
    current_algo?: PasswordKdfAlgo;
    srp_B?: Uint8Array<ArrayBuffer>;
    srp_id?: bigint;
    hint?: string;
    email_unconfirmed_pattern?: string;
    new_algo: PasswordKdfAlgo;
    new_secure_algo: SecurePasswordKdfAlgo;
    secure_random: Uint8Array<ArrayBuffer>;
    pending_reset_date?: number;
    login_email_pattern?: string;
}
export interface account_passwordSettings {
    _: "account.passwordSettings";
    email?: string;
    secure_settings?: SecureSecretSettings;
}
export interface account_passwordInputSettings {
    _: "account.passwordInputSettings";
    new_algo?: PasswordKdfAlgo;
    new_password_hash?: Uint8Array<ArrayBuffer>;
    hint?: string;
    email?: string;
    new_secure_settings?: SecureSecretSettings;
}
export interface auth_passwordRecovery {
    _: "auth.passwordRecovery";
    email_pattern: string;
}
export interface receivedNotifyMessage {
    _: "receivedNotifyMessage";
    id: number;
    flags: number;
}
export interface chatInviteExported {
    _: "chatInviteExported";
    revoked?: true;
    permanent?: true;
    request_needed?: true;
    link: string;
    admin_id: bigint;
    date: number;
    start_date?: number;
    expire_date?: number;
    usage_limit?: number;
    usage?: number;
    requested?: number;
    subscription_expired?: number;
    title?: string;
    subscription_pricing?: StarsSubscriptionPricing;
}
export interface chatInvitePublicJoinRequests {
    _: "chatInvitePublicJoinRequests";
}
export interface chatInviteAlready {
    _: "chatInviteAlready";
    chat: Chat;
}
export interface chatInvite {
    _: "chatInvite";
    channel?: true;
    broadcast?: true;
    public?: true;
    megagroup?: true;
    request_needed?: true;
    verified?: true;
    scam?: true;
    fake?: true;
    can_refulfill_subscription?: true;
    title: string;
    about?: string;
    photo: Photo;
    participants_count: number;
    participants?: Array<User>;
    color: number;
    subscription_pricing?: StarsSubscriptionPricing;
    subscription_form_id?: bigint;
    bot_verification?: BotVerification;
}
export interface chatInvitePeek {
    _: "chatInvitePeek";
    chat: Chat;
    expires: number;
}
export interface inputStickerSetEmpty {
    _: "inputStickerSetEmpty";
}
export interface inputStickerSetID {
    _: "inputStickerSetID";
    id: bigint;
    access_hash: bigint;
}
export interface inputStickerSetShortName {
    _: "inputStickerSetShortName";
    short_name: string;
}
export interface inputStickerSetAnimatedEmoji {
    _: "inputStickerSetAnimatedEmoji";
}
export interface inputStickerSetDice {
    _: "inputStickerSetDice";
    emoticon: string;
}
export interface inputStickerSetAnimatedEmojiAnimations {
    _: "inputStickerSetAnimatedEmojiAnimations";
}
export interface inputStickerSetPremiumGifts {
    _: "inputStickerSetPremiumGifts";
}
export interface inputStickerSetEmojiGenericAnimations {
    _: "inputStickerSetEmojiGenericAnimations";
}
export interface inputStickerSetEmojiDefaultStatuses {
    _: "inputStickerSetEmojiDefaultStatuses";
}
export interface inputStickerSetEmojiDefaultTopicIcons {
    _: "inputStickerSetEmojiDefaultTopicIcons";
}
export interface inputStickerSetEmojiChannelDefaultStatuses {
    _: "inputStickerSetEmojiChannelDefaultStatuses";
}
export interface inputStickerSetTonGifts {
    _: "inputStickerSetTonGifts";
}
export interface stickerSet {
    _: "stickerSet";
    archived?: true;
    official?: true;
    masks?: true;
    emojis?: true;
    text_color?: true;
    channel_emoji_status?: true;
    creator?: true;
    installed_date?: number;
    id: bigint;
    access_hash: bigint;
    title: string;
    short_name: string;
    thumbs?: Array<PhotoSize>;
    thumb_dc_id?: number;
    thumb_version?: number;
    thumb_document_id?: bigint;
    count: number;
    hash: number;
}
export interface messages_stickerSet {
    _: "messages.stickerSet";
    set: StickerSet;
    packs: Array<StickerPack>;
    keywords: Array<StickerKeyword>;
    documents: Array<Document>;
}
export interface messages_stickerSetNotModified {
    _: "messages.stickerSetNotModified";
}
export interface botCommand {
    _: "botCommand";
    command: string;
    description: string;
}
export interface botInfo {
    _: "botInfo";
    has_preview_medias?: true;
    user_id?: bigint;
    description?: string;
    description_photo?: Photo;
    description_document?: Document;
    commands?: Array<BotCommand>;
    menu_button?: BotMenuButton;
    privacy_policy_url?: string;
    app_settings?: BotAppSettings;
    verifier_settings?: BotVerifierSettings;
}
export interface keyboardButton {
    _: "keyboardButton";
    text: string;
}
export interface keyboardButtonUrl {
    _: "keyboardButtonUrl";
    text: string;
    url: string;
}
export interface keyboardButtonCallback {
    _: "keyboardButtonCallback";
    requires_password?: true;
    text: string;
    data: Uint8Array<ArrayBuffer>;
}
export interface keyboardButtonRequestPhone {
    _: "keyboardButtonRequestPhone";
    text: string;
}
export interface keyboardButtonRequestGeoLocation {
    _: "keyboardButtonRequestGeoLocation";
    text: string;
}
export interface keyboardButtonSwitchInline {
    _: "keyboardButtonSwitchInline";
    same_peer?: true;
    text: string;
    query: string;
    peer_types?: Array<InlineQueryPeerType>;
}
export interface keyboardButtonGame {
    _: "keyboardButtonGame";
    text: string;
}
export interface keyboardButtonBuy {
    _: "keyboardButtonBuy";
    text: string;
}
export interface keyboardButtonUrlAuth {
    _: "keyboardButtonUrlAuth";
    text: string;
    fwd_text?: string;
    url: string;
    button_id: number;
}
export interface inputKeyboardButtonUrlAuth {
    _: "inputKeyboardButtonUrlAuth";
    request_write_access?: true;
    text: string;
    fwd_text?: string;
    url: string;
    bot: InputUser;
}
export interface keyboardButtonRequestPoll {
    _: "keyboardButtonRequestPoll";
    quiz?: boolean;
    text: string;
}
export interface inputKeyboardButtonUserProfile {
    _: "inputKeyboardButtonUserProfile";
    text: string;
    user_id: InputUser;
}
export interface keyboardButtonUserProfile {
    _: "keyboardButtonUserProfile";
    text: string;
    user_id: bigint;
}
export interface keyboardButtonWebView {
    _: "keyboardButtonWebView";
    text: string;
    url: string;
}
export interface keyboardButtonSimpleWebView {
    _: "keyboardButtonSimpleWebView";
    text: string;
    url: string;
}
export interface keyboardButtonRequestPeer {
    _: "keyboardButtonRequestPeer";
    text: string;
    button_id: number;
    peer_type: RequestPeerType;
    max_quantity: number;
}
export interface inputKeyboardButtonRequestPeer {
    _: "inputKeyboardButtonRequestPeer";
    name_requested?: true;
    username_requested?: true;
    photo_requested?: true;
    text: string;
    button_id: number;
    peer_type: RequestPeerType;
    max_quantity: number;
}
export interface keyboardButtonCopy {
    _: "keyboardButtonCopy";
    text: string;
    copy_text: string;
}
export interface keyboardButtonRow {
    _: "keyboardButtonRow";
    buttons: Array<KeyboardButton>;
}
export interface replyKeyboardHide {
    _: "replyKeyboardHide";
    selective?: true;
}
export interface replyKeyboardForceReply {
    _: "replyKeyboardForceReply";
    single_use?: true;
    selective?: true;
    placeholder?: string;
}
export interface replyKeyboardMarkup {
    _: "replyKeyboardMarkup";
    resize?: true;
    single_use?: true;
    selective?: true;
    persistent?: true;
    rows: Array<KeyboardButtonRow>;
    placeholder?: string;
}
export interface replyInlineMarkup {
    _: "replyInlineMarkup";
    rows: Array<KeyboardButtonRow>;
}
export interface messageEntityUnknown {
    _: "messageEntityUnknown";
    offset: number;
    length: number;
}
export interface messageEntityMention {
    _: "messageEntityMention";
    offset: number;
    length: number;
}
export interface messageEntityHashtag {
    _: "messageEntityHashtag";
    offset: number;
    length: number;
}
export interface messageEntityBotCommand {
    _: "messageEntityBotCommand";
    offset: number;
    length: number;
}
export interface messageEntityUrl {
    _: "messageEntityUrl";
    offset: number;
    length: number;
}
export interface messageEntityEmail {
    _: "messageEntityEmail";
    offset: number;
    length: number;
}
export interface messageEntityBold {
    _: "messageEntityBold";
    offset: number;
    length: number;
}
export interface messageEntityItalic {
    _: "messageEntityItalic";
    offset: number;
    length: number;
}
export interface messageEntityCode {
    _: "messageEntityCode";
    offset: number;
    length: number;
}
export interface messageEntityPre {
    _: "messageEntityPre";
    offset: number;
    length: number;
    language: string;
}
export interface messageEntityTextUrl {
    _: "messageEntityTextUrl";
    offset: number;
    length: number;
    url: string;
}
export interface messageEntityMentionName {
    _: "messageEntityMentionName";
    offset: number;
    length: number;
    user_id: bigint;
}
export interface inputMessageEntityMentionName {
    _: "inputMessageEntityMentionName";
    offset: number;
    length: number;
    user_id: InputUser;
}
export interface messageEntityPhone {
    _: "messageEntityPhone";
    offset: number;
    length: number;
}
export interface messageEntityCashtag {
    _: "messageEntityCashtag";
    offset: number;
    length: number;
}
export interface messageEntityUnderline {
    _: "messageEntityUnderline";
    offset: number;
    length: number;
}
export interface messageEntityStrike {
    _: "messageEntityStrike";
    offset: number;
    length: number;
}
export interface messageEntityBankCard {
    _: "messageEntityBankCard";
    offset: number;
    length: number;
}
export interface messageEntitySpoiler {
    _: "messageEntitySpoiler";
    offset: number;
    length: number;
}
export interface messageEntityCustomEmoji {
    _: "messageEntityCustomEmoji";
    offset: number;
    length: number;
    document_id: bigint;
}
export interface messageEntityBlockquote {
    _: "messageEntityBlockquote";
    collapsed?: true;
    offset: number;
    length: number;
}
export interface inputChannelEmpty {
    _: "inputChannelEmpty";
}
export interface inputChannel {
    _: "inputChannel";
    channel_id: bigint;
    access_hash: bigint;
}
export interface inputChannelFromMessage {
    _: "inputChannelFromMessage";
    peer: InputPeer;
    msg_id: number;
    channel_id: bigint;
}
export interface contacts_resolvedPeer {
    _: "contacts.resolvedPeer";
    peer: Peer;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface messageRange {
    _: "messageRange";
    min_id: number;
    max_id: number;
}
export interface updates_channelDifferenceEmpty {
    _: "updates.channelDifferenceEmpty";
    final?: true;
    pts: number;
    timeout?: number;
}
export interface updates_channelDifferenceTooLong {
    _: "updates.channelDifferenceTooLong";
    final?: true;
    timeout?: number;
    dialog: Dialog;
    messages: Array<Message>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface updates_channelDifference {
    _: "updates.channelDifference";
    final?: true;
    pts: number;
    timeout?: number;
    new_messages: Array<Message>;
    other_updates: Array<Update>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface channelMessagesFilterEmpty {
    _: "channelMessagesFilterEmpty";
}
export interface channelMessagesFilter {
    _: "channelMessagesFilter";
    exclude_new_messages?: true;
    ranges: Array<MessageRange>;
}
export interface channelParticipant {
    _: "channelParticipant";
    user_id: bigint;
    date: number;
    subscription_until_date?: number;
}
export interface channelParticipantSelf {
    _: "channelParticipantSelf";
    via_request?: true;
    user_id: bigint;
    inviter_id: bigint;
    date: number;
    subscription_until_date?: number;
}
export interface channelParticipantCreator {
    _: "channelParticipantCreator";
    user_id: bigint;
    admin_rights: ChatAdminRights;
    rank?: string;
}
export interface channelParticipantAdmin {
    _: "channelParticipantAdmin";
    can_edit?: true;
    self?: true;
    user_id: bigint;
    inviter_id?: bigint;
    promoted_by: bigint;
    date: number;
    admin_rights: ChatAdminRights;
    rank?: string;
}
export interface channelParticipantBanned {
    _: "channelParticipantBanned";
    left?: true;
    peer: Peer;
    kicked_by: bigint;
    date: number;
    banned_rights: ChatBannedRights;
}
export interface channelParticipantLeft {
    _: "channelParticipantLeft";
    peer: Peer;
}
export interface channelParticipantsRecent {
    _: "channelParticipantsRecent";
}
export interface channelParticipantsAdmins {
    _: "channelParticipantsAdmins";
}
export interface channelParticipantsKicked {
    _: "channelParticipantsKicked";
    q: string;
}
export interface channelParticipantsBots {
    _: "channelParticipantsBots";
}
export interface channelParticipantsBanned {
    _: "channelParticipantsBanned";
    q: string;
}
export interface channelParticipantsSearch {
    _: "channelParticipantsSearch";
    q: string;
}
export interface channelParticipantsContacts {
    _: "channelParticipantsContacts";
    q: string;
}
export interface channelParticipantsMentions {
    _: "channelParticipantsMentions";
    q?: string;
    top_msg_id?: number;
}
export interface channels_channelParticipants {
    _: "channels.channelParticipants";
    count: number;
    participants: Array<ChannelParticipant>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface channels_channelParticipantsNotModified {
    _: "channels.channelParticipantsNotModified";
}
export interface channels_channelParticipant {
    _: "channels.channelParticipant";
    participant: ChannelParticipant;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface help_termsOfService {
    _: "help.termsOfService";
    popup?: true;
    id: DataJSON;
    text: string;
    entities: Array<MessageEntity>;
    min_age_confirm?: number;
}
export interface messages_savedGifsNotModified {
    _: "messages.savedGifsNotModified";
}
export interface messages_savedGifs {
    _: "messages.savedGifs";
    hash: bigint;
    gifs: Array<Document>;
}
export interface inputBotInlineMessageMediaAuto {
    _: "inputBotInlineMessageMediaAuto";
    invert_media?: true;
    message: string;
    entities?: Array<MessageEntity>;
    reply_markup?: ReplyMarkup;
}
export interface inputBotInlineMessageText {
    _: "inputBotInlineMessageText";
    no_webpage?: true;
    invert_media?: true;
    message: string;
    entities?: Array<MessageEntity>;
    reply_markup?: ReplyMarkup;
}
export interface inputBotInlineMessageMediaGeo {
    _: "inputBotInlineMessageMediaGeo";
    geo_point: InputGeoPoint;
    heading?: number;
    period?: number;
    proximity_notification_radius?: number;
    reply_markup?: ReplyMarkup;
}
export interface inputBotInlineMessageMediaVenue {
    _: "inputBotInlineMessageMediaVenue";
    geo_point: InputGeoPoint;
    title: string;
    address: string;
    provider: string;
    venue_id: string;
    venue_type: string;
    reply_markup?: ReplyMarkup;
}
export interface inputBotInlineMessageMediaContact {
    _: "inputBotInlineMessageMediaContact";
    phone_number: string;
    first_name: string;
    last_name: string;
    vcard: string;
    reply_markup?: ReplyMarkup;
}
export interface inputBotInlineMessageGame {
    _: "inputBotInlineMessageGame";
    reply_markup?: ReplyMarkup;
}
export interface inputBotInlineMessageMediaInvoice {
    _: "inputBotInlineMessageMediaInvoice";
    title: string;
    description: string;
    photo?: InputWebDocument;
    invoice: Invoice;
    payload: Uint8Array<ArrayBuffer>;
    provider: string;
    provider_data: DataJSON;
    reply_markup?: ReplyMarkup;
}
export interface inputBotInlineMessageMediaWebPage {
    _: "inputBotInlineMessageMediaWebPage";
    invert_media?: true;
    force_large_media?: true;
    force_small_media?: true;
    optional?: true;
    message: string;
    entities?: Array<MessageEntity>;
    url: string;
    reply_markup?: ReplyMarkup;
}
export interface inputBotInlineResult {
    _: "inputBotInlineResult";
    id: string;
    type: string;
    title?: string;
    description?: string;
    url?: string;
    thumb?: InputWebDocument;
    content?: InputWebDocument;
    send_message: InputBotInlineMessage;
}
export interface inputBotInlineResultPhoto {
    _: "inputBotInlineResultPhoto";
    id: string;
    type: string;
    photo: InputPhoto;
    send_message: InputBotInlineMessage;
}
export interface inputBotInlineResultDocument {
    _: "inputBotInlineResultDocument";
    id: string;
    type: string;
    title?: string;
    description?: string;
    document: InputDocument;
    send_message: InputBotInlineMessage;
}
export interface inputBotInlineResultGame {
    _: "inputBotInlineResultGame";
    id: string;
    short_name: string;
    send_message: InputBotInlineMessage;
}
export interface botInlineMessageMediaAuto {
    _: "botInlineMessageMediaAuto";
    invert_media?: true;
    message: string;
    entities?: Array<MessageEntity>;
    reply_markup?: ReplyMarkup;
}
export interface botInlineMessageText {
    _: "botInlineMessageText";
    no_webpage?: true;
    invert_media?: true;
    message: string;
    entities?: Array<MessageEntity>;
    reply_markup?: ReplyMarkup;
}
export interface botInlineMessageMediaGeo {
    _: "botInlineMessageMediaGeo";
    geo: GeoPoint;
    heading?: number;
    period?: number;
    proximity_notification_radius?: number;
    reply_markup?: ReplyMarkup;
}
export interface botInlineMessageMediaVenue {
    _: "botInlineMessageMediaVenue";
    geo: GeoPoint;
    title: string;
    address: string;
    provider: string;
    venue_id: string;
    venue_type: string;
    reply_markup?: ReplyMarkup;
}
export interface botInlineMessageMediaContact {
    _: "botInlineMessageMediaContact";
    phone_number: string;
    first_name: string;
    last_name: string;
    vcard: string;
    reply_markup?: ReplyMarkup;
}
export interface botInlineMessageMediaInvoice {
    _: "botInlineMessageMediaInvoice";
    shipping_address_requested?: true;
    test?: true;
    title: string;
    description: string;
    photo?: WebDocument;
    currency: string;
    total_amount: bigint;
    reply_markup?: ReplyMarkup;
}
export interface botInlineMessageMediaWebPage {
    _: "botInlineMessageMediaWebPage";
    invert_media?: true;
    force_large_media?: true;
    force_small_media?: true;
    manual?: true;
    safe?: true;
    message: string;
    entities?: Array<MessageEntity>;
    url: string;
    reply_markup?: ReplyMarkup;
}
export interface botInlineResult {
    _: "botInlineResult";
    id: string;
    type: string;
    title?: string;
    description?: string;
    url?: string;
    thumb?: WebDocument;
    content?: WebDocument;
    send_message: BotInlineMessage;
}
export interface botInlineMediaResult {
    _: "botInlineMediaResult";
    id: string;
    type: string;
    photo?: Photo;
    document?: Document;
    title?: string;
    description?: string;
    send_message: BotInlineMessage;
}
export interface messages_botResults {
    _: "messages.botResults";
    gallery?: true;
    query_id: bigint;
    next_offset?: string;
    switch_pm?: InlineBotSwitchPM;
    switch_webview?: InlineBotWebView;
    results: Array<BotInlineResult>;
    cache_time: number;
    users: Array<User>;
}
export interface exportedMessageLink {
    _: "exportedMessageLink";
    link: string;
    html: string;
}
export interface messageFwdHeader {
    _: "messageFwdHeader";
    imported?: true;
    saved_out?: true;
    from_id?: Peer;
    from_name?: string;
    date: number;
    channel_post?: number;
    post_author?: string;
    saved_from_peer?: Peer;
    saved_from_msg_id?: number;
    saved_from_id?: Peer;
    saved_from_name?: string;
    saved_date?: number;
    psa_type?: string;
}
export interface auth_codeTypeSms {
    _: "auth.codeTypeSms";
}
export interface auth_codeTypeCall {
    _: "auth.codeTypeCall";
}
export interface auth_codeTypeFlashCall {
    _: "auth.codeTypeFlashCall";
}
export interface auth_codeTypeMissedCall {
    _: "auth.codeTypeMissedCall";
}
export interface auth_codeTypeFragmentSms {
    _: "auth.codeTypeFragmentSms";
}
export interface auth_sentCodeTypeApp {
    _: "auth.sentCodeTypeApp";
    length: number;
}
export interface auth_sentCodeTypeSms {
    _: "auth.sentCodeTypeSms";
    length: number;
}
export interface auth_sentCodeTypeCall {
    _: "auth.sentCodeTypeCall";
    length: number;
}
export interface auth_sentCodeTypeFlashCall {
    _: "auth.sentCodeTypeFlashCall";
    pattern: string;
}
export interface auth_sentCodeTypeMissedCall {
    _: "auth.sentCodeTypeMissedCall";
    prefix: string;
    length: number;
}
export interface auth_sentCodeTypeEmailCode {
    _: "auth.sentCodeTypeEmailCode";
    apple_signin_allowed?: true;
    google_signin_allowed?: true;
    email_pattern: string;
    length: number;
    reset_available_period?: number;
    reset_pending_date?: number;
}
export interface auth_sentCodeTypeSetUpEmailRequired {
    _: "auth.sentCodeTypeSetUpEmailRequired";
    apple_signin_allowed?: true;
    google_signin_allowed?: true;
}
export interface auth_sentCodeTypeFragmentSms {
    _: "auth.sentCodeTypeFragmentSms";
    url: string;
    length: number;
}
export interface auth_sentCodeTypeFirebaseSms {
    _: "auth.sentCodeTypeFirebaseSms";
    nonce?: Uint8Array<ArrayBuffer>;
    play_integrity_project_id?: bigint;
    play_integrity_nonce?: Uint8Array<ArrayBuffer>;
    receipt?: string;
    push_timeout?: number;
    length: number;
}
export interface auth_sentCodeTypeSmsWord {
    _: "auth.sentCodeTypeSmsWord";
    beginning?: string;
}
export interface auth_sentCodeTypeSmsPhrase {
    _: "auth.sentCodeTypeSmsPhrase";
    beginning?: string;
}
export interface messages_botCallbackAnswer {
    _: "messages.botCallbackAnswer";
    alert?: true;
    has_url?: true;
    native_ui?: true;
    message?: string;
    url?: string;
    cache_time: number;
}
export interface messages_messageEditData {
    _: "messages.messageEditData";
    caption?: true;
}
export interface inputBotInlineMessageID {
    _: "inputBotInlineMessageID";
    dc_id: number;
    id: bigint;
    access_hash: bigint;
}
export interface inputBotInlineMessageID64 {
    _: "inputBotInlineMessageID64";
    dc_id: number;
    owner_id: bigint;
    id: number;
    access_hash: bigint;
}
export interface inlineBotSwitchPM {
    _: "inlineBotSwitchPM";
    text: string;
    start_param: string;
}
export interface messages_peerDialogs {
    _: "messages.peerDialogs";
    dialogs: Array<Dialog>;
    messages: Array<Message>;
    chats: Array<Chat>;
    users: Array<User>;
    state: updates_State;
}
export interface topPeer {
    _: "topPeer";
    peer: Peer;
    rating: number;
}
export interface topPeerCategoryBotsPM {
    _: "topPeerCategoryBotsPM";
}
export interface topPeerCategoryBotsInline {
    _: "topPeerCategoryBotsInline";
}
export interface topPeerCategoryCorrespondents {
    _: "topPeerCategoryCorrespondents";
}
export interface topPeerCategoryGroups {
    _: "topPeerCategoryGroups";
}
export interface topPeerCategoryChannels {
    _: "topPeerCategoryChannels";
}
export interface topPeerCategoryPhoneCalls {
    _: "topPeerCategoryPhoneCalls";
}
export interface topPeerCategoryForwardUsers {
    _: "topPeerCategoryForwardUsers";
}
export interface topPeerCategoryForwardChats {
    _: "topPeerCategoryForwardChats";
}
export interface topPeerCategoryBotsApp {
    _: "topPeerCategoryBotsApp";
}
export interface topPeerCategoryPeers {
    _: "topPeerCategoryPeers";
    category: TopPeerCategory;
    count: number;
    peers: Array<TopPeer>;
}
export interface contacts_topPeersNotModified {
    _: "contacts.topPeersNotModified";
}
export interface contacts_topPeers {
    _: "contacts.topPeers";
    categories: Array<TopPeerCategoryPeers>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface contacts_topPeersDisabled {
    _: "contacts.topPeersDisabled";
}
export interface draftMessageEmpty {
    _: "draftMessageEmpty";
    date?: number;
}
export interface draftMessage {
    _: "draftMessage";
    no_webpage?: true;
    invert_media?: true;
    reply_to?: InputReplyTo;
    message: string;
    entities?: Array<MessageEntity>;
    media?: InputMedia;
    date: number;
    effect?: bigint;
    suggested_post?: SuggestedPost;
}
export interface messages_featuredStickersNotModified {
    _: "messages.featuredStickersNotModified";
    count: number;
}
export interface messages_featuredStickers {
    _: "messages.featuredStickers";
    premium?: true;
    hash: bigint;
    count: number;
    sets: Array<StickerSetCovered>;
    unread: Array<bigint>;
}
export interface messages_recentStickersNotModified {
    _: "messages.recentStickersNotModified";
}
export interface messages_recentStickers {
    _: "messages.recentStickers";
    hash: bigint;
    packs: Array<StickerPack>;
    stickers: Array<Document>;
    dates: Array<number>;
}
export interface messages_archivedStickers {
    _: "messages.archivedStickers";
    count: number;
    sets: Array<StickerSetCovered>;
}
export interface messages_stickerSetInstallResultSuccess {
    _: "messages.stickerSetInstallResultSuccess";
}
export interface messages_stickerSetInstallResultArchive {
    _: "messages.stickerSetInstallResultArchive";
    sets: Array<StickerSetCovered>;
}
export interface stickerSetCovered {
    _: "stickerSetCovered";
    set: StickerSet;
    cover: Document;
}
export interface stickerSetMultiCovered {
    _: "stickerSetMultiCovered";
    set: StickerSet;
    covers: Array<Document>;
}
export interface stickerSetFullCovered {
    _: "stickerSetFullCovered";
    set: StickerSet;
    packs: Array<StickerPack>;
    keywords: Array<StickerKeyword>;
    documents: Array<Document>;
}
export interface stickerSetNoCovered {
    _: "stickerSetNoCovered";
    set: StickerSet;
}
export interface maskCoords {
    _: "maskCoords";
    n: number;
    x: number;
    y: number;
    zoom: number;
}
export interface inputStickeredMediaPhoto {
    _: "inputStickeredMediaPhoto";
    id: InputPhoto;
}
export interface inputStickeredMediaDocument {
    _: "inputStickeredMediaDocument";
    id: InputDocument;
}
export interface game {
    _: "game";
    id: bigint;
    access_hash: bigint;
    short_name: string;
    title: string;
    description: string;
    photo: Photo;
    document?: Document;
}
export interface inputGameID {
    _: "inputGameID";
    id: bigint;
    access_hash: bigint;
}
export interface inputGameShortName {
    _: "inputGameShortName";
    bot_id: InputUser;
    short_name: string;
}
export interface highScore {
    _: "highScore";
    pos: number;
    user_id: bigint;
    score: number;
}
export interface messages_highScores {
    _: "messages.highScores";
    scores: Array<HighScore>;
    users: Array<User>;
}
export interface textEmpty {
    _: "textEmpty";
}
export interface textPlain {
    _: "textPlain";
    text: string;
}
export interface textBold {
    _: "textBold";
    text: RichText;
}
export interface textItalic {
    _: "textItalic";
    text: RichText;
}
export interface textUnderline {
    _: "textUnderline";
    text: RichText;
}
export interface textStrike {
    _: "textStrike";
    text: RichText;
}
export interface textFixed {
    _: "textFixed";
    text: RichText;
}
export interface textUrl {
    _: "textUrl";
    text: RichText;
    url: string;
    webpage_id: bigint;
}
export interface textEmail {
    _: "textEmail";
    text: RichText;
    email: string;
}
export interface textConcat {
    _: "textConcat";
    texts: Array<RichText>;
}
export interface textSubscript {
    _: "textSubscript";
    text: RichText;
}
export interface textSuperscript {
    _: "textSuperscript";
    text: RichText;
}
export interface textMarked {
    _: "textMarked";
    text: RichText;
}
export interface textPhone {
    _: "textPhone";
    text: RichText;
    phone: string;
}
export interface textImage {
    _: "textImage";
    document_id: bigint;
    w: number;
    h: number;
}
export interface textAnchor {
    _: "textAnchor";
    text: RichText;
    name: string;
}
export interface pageBlockUnsupported {
    _: "pageBlockUnsupported";
}
export interface pageBlockTitle {
    _: "pageBlockTitle";
    text: RichText;
}
export interface pageBlockSubtitle {
    _: "pageBlockSubtitle";
    text: RichText;
}
export interface pageBlockAuthorDate {
    _: "pageBlockAuthorDate";
    author: RichText;
    published_date: number;
}
export interface pageBlockHeader {
    _: "pageBlockHeader";
    text: RichText;
}
export interface pageBlockSubheader {
    _: "pageBlockSubheader";
    text: RichText;
}
export interface pageBlockParagraph {
    _: "pageBlockParagraph";
    text: RichText;
}
export interface pageBlockPreformatted {
    _: "pageBlockPreformatted";
    text: RichText;
    language: string;
}
export interface pageBlockFooter {
    _: "pageBlockFooter";
    text: RichText;
}
export interface pageBlockDivider {
    _: "pageBlockDivider";
}
export interface pageBlockAnchor {
    _: "pageBlockAnchor";
    name: string;
}
export interface pageBlockList {
    _: "pageBlockList";
    items: Array<PageListItem>;
}
export interface pageBlockBlockquote {
    _: "pageBlockBlockquote";
    text: RichText;
    caption: RichText;
}
export interface pageBlockPullquote {
    _: "pageBlockPullquote";
    text: RichText;
    caption: RichText;
}
export interface pageBlockPhoto {
    _: "pageBlockPhoto";
    photo_id: bigint;
    caption: PageCaption;
    url?: string;
    webpage_id?: bigint;
}
export interface pageBlockVideo {
    _: "pageBlockVideo";
    autoplay?: true;
    loop?: true;
    video_id: bigint;
    caption: PageCaption;
}
export interface pageBlockCover {
    _: "pageBlockCover";
    cover: PageBlock;
}
export interface pageBlockEmbed {
    _: "pageBlockEmbed";
    full_width?: true;
    allow_scrolling?: true;
    url?: string;
    html?: string;
    poster_photo_id?: bigint;
    w?: number;
    h?: number;
    caption: PageCaption;
}
export interface pageBlockEmbedPost {
    _: "pageBlockEmbedPost";
    url: string;
    webpage_id: bigint;
    author_photo_id: bigint;
    author: string;
    date: number;
    blocks: Array<PageBlock>;
    caption: PageCaption;
}
export interface pageBlockCollage {
    _: "pageBlockCollage";
    items: Array<PageBlock>;
    caption: PageCaption;
}
export interface pageBlockSlideshow {
    _: "pageBlockSlideshow";
    items: Array<PageBlock>;
    caption: PageCaption;
}
export interface pageBlockChannel {
    _: "pageBlockChannel";
    channel: Chat;
}
export interface pageBlockAudio {
    _: "pageBlockAudio";
    audio_id: bigint;
    caption: PageCaption;
}
export interface pageBlockKicker {
    _: "pageBlockKicker";
    text: RichText;
}
export interface pageBlockTable {
    _: "pageBlockTable";
    bordered?: true;
    striped?: true;
    title: RichText;
    rows: Array<PageTableRow>;
}
export interface pageBlockOrderedList {
    _: "pageBlockOrderedList";
    items: Array<PageListOrderedItem>;
}
export interface pageBlockDetails {
    _: "pageBlockDetails";
    open?: true;
    blocks: Array<PageBlock>;
    title: RichText;
}
export interface pageBlockRelatedArticles {
    _: "pageBlockRelatedArticles";
    title: RichText;
    articles: Array<PageRelatedArticle>;
}
export interface pageBlockMap {
    _: "pageBlockMap";
    geo: GeoPoint;
    zoom: number;
    w: number;
    h: number;
    caption: PageCaption;
}
export interface phoneCallDiscardReasonMissed {
    _: "phoneCallDiscardReasonMissed";
}
export interface phoneCallDiscardReasonDisconnect {
    _: "phoneCallDiscardReasonDisconnect";
}
export interface phoneCallDiscardReasonHangup {
    _: "phoneCallDiscardReasonHangup";
}
export interface phoneCallDiscardReasonBusy {
    _: "phoneCallDiscardReasonBusy";
}
export interface phoneCallDiscardReasonMigrateConferenceCall {
    _: "phoneCallDiscardReasonMigrateConferenceCall";
    slug: string;
}
export interface dataJSON {
    _: "dataJSON";
    data: string;
}
export interface labeledPrice {
    _: "labeledPrice";
    label: string;
    amount: bigint;
}
export interface invoice {
    _: "invoice";
    test?: true;
    name_requested?: true;
    phone_requested?: true;
    email_requested?: true;
    shipping_address_requested?: true;
    flexible?: true;
    phone_to_provider?: true;
    email_to_provider?: true;
    recurring?: true;
    currency: string;
    prices: Array<LabeledPrice>;
    max_tip_amount?: bigint;
    suggested_tip_amounts?: Array<bigint>;
    terms_url?: string;
    subscription_period?: number;
}
export interface paymentCharge {
    _: "paymentCharge";
    id: string;
    provider_charge_id: string;
}
export interface postAddress {
    _: "postAddress";
    street_line1: string;
    street_line2: string;
    city: string;
    state: string;
    country_iso2: string;
    post_code: string;
}
export interface paymentRequestedInfo {
    _: "paymentRequestedInfo";
    name?: string;
    phone?: string;
    email?: string;
    shipping_address?: PostAddress;
}
export interface paymentSavedCredentialsCard {
    _: "paymentSavedCredentialsCard";
    id: string;
    title: string;
}
export interface webDocument {
    _: "webDocument";
    url: string;
    access_hash: bigint;
    size: number;
    mime_type: string;
    attributes: Array<DocumentAttribute>;
}
export interface webDocumentNoProxy {
    _: "webDocumentNoProxy";
    url: string;
    size: number;
    mime_type: string;
    attributes: Array<DocumentAttribute>;
}
export interface inputWebDocument {
    _: "inputWebDocument";
    url: string;
    size: number;
    mime_type: string;
    attributes: Array<DocumentAttribute>;
}
export interface inputWebFileLocation {
    _: "inputWebFileLocation";
    url: string;
    access_hash: bigint;
}
export interface inputWebFileGeoPointLocation {
    _: "inputWebFileGeoPointLocation";
    geo_point: InputGeoPoint;
    access_hash: bigint;
    w: number;
    h: number;
    zoom: number;
    scale: number;
}
export interface inputWebFileAudioAlbumThumbLocation {
    _: "inputWebFileAudioAlbumThumbLocation";
    small?: true;
    document?: InputDocument;
    title?: string;
    performer?: string;
}
export interface upload_webFile {
    _: "upload.webFile";
    size: number;
    mime_type: string;
    file_type: storage_FileType;
    mtime: number;
    bytes: Uint8Array<ArrayBuffer>;
}
export interface payments_paymentForm {
    _: "payments.paymentForm";
    can_save_credentials?: true;
    password_missing?: true;
    form_id: bigint;
    bot_id: bigint;
    title: string;
    description: string;
    photo?: WebDocument;
    invoice: Invoice;
    provider_id: bigint;
    url: string;
    native_provider?: string;
    native_params?: DataJSON;
    additional_methods?: Array<PaymentFormMethod>;
    saved_info?: PaymentRequestedInfo;
    saved_credentials?: Array<PaymentSavedCredentials>;
    users: Array<User>;
}
export interface payments_paymentFormStars {
    _: "payments.paymentFormStars";
    form_id: bigint;
    bot_id: bigint;
    title: string;
    description: string;
    photo?: WebDocument;
    invoice: Invoice;
    users: Array<User>;
}
export interface payments_paymentFormStarGift {
    _: "payments.paymentFormStarGift";
    form_id: bigint;
    invoice: Invoice;
}
export interface payments_validatedRequestedInfo {
    _: "payments.validatedRequestedInfo";
    id?: string;
    shipping_options?: Array<ShippingOption>;
}
export interface payments_paymentResult {
    _: "payments.paymentResult";
    updates: Updates;
}
export interface payments_paymentVerificationNeeded {
    _: "payments.paymentVerificationNeeded";
    url: string;
}
export interface payments_paymentReceipt {
    _: "payments.paymentReceipt";
    date: number;
    bot_id: bigint;
    provider_id: bigint;
    title: string;
    description: string;
    photo?: WebDocument;
    invoice: Invoice;
    info?: PaymentRequestedInfo;
    shipping?: ShippingOption;
    tip_amount?: bigint;
    currency: string;
    total_amount: bigint;
    credentials_title: string;
    users: Array<User>;
}
export interface payments_paymentReceiptStars {
    _: "payments.paymentReceiptStars";
    date: number;
    bot_id: bigint;
    title: string;
    description: string;
    photo?: WebDocument;
    invoice: Invoice;
    currency: string;
    total_amount: bigint;
    transaction_id: string;
    users: Array<User>;
}
export interface payments_savedInfo {
    _: "payments.savedInfo";
    has_saved_credentials?: true;
    saved_info?: PaymentRequestedInfo;
}
export interface inputPaymentCredentialsSaved {
    _: "inputPaymentCredentialsSaved";
    id: string;
    tmp_password: Uint8Array<ArrayBuffer>;
}
export interface inputPaymentCredentials {
    _: "inputPaymentCredentials";
    save?: true;
    data: DataJSON;
}
export interface inputPaymentCredentialsApplePay {
    _: "inputPaymentCredentialsApplePay";
    payment_data: DataJSON;
}
export interface inputPaymentCredentialsGooglePay {
    _: "inputPaymentCredentialsGooglePay";
    payment_token: DataJSON;
}
export interface account_tmpPassword {
    _: "account.tmpPassword";
    tmp_password: Uint8Array<ArrayBuffer>;
    valid_until: number;
}
export interface shippingOption {
    _: "shippingOption";
    id: string;
    title: string;
    prices: Array<LabeledPrice>;
}
export interface inputStickerSetItem {
    _: "inputStickerSetItem";
    document: InputDocument;
    emoji: string;
    mask_coords?: MaskCoords;
    keywords?: string;
}
export interface inputPhoneCall {
    _: "inputPhoneCall";
    id: bigint;
    access_hash: bigint;
}
export interface phoneCallEmpty {
    _: "phoneCallEmpty";
    id: bigint;
}
export interface phoneCallWaiting {
    _: "phoneCallWaiting";
    video?: true;
    id: bigint;
    access_hash: bigint;
    date: number;
    admin_id: bigint;
    participant_id: bigint;
    protocol: PhoneCallProtocol;
    receive_date?: number;
}
export interface phoneCallRequested {
    _: "phoneCallRequested";
    video?: true;
    id: bigint;
    access_hash: bigint;
    date: number;
    admin_id: bigint;
    participant_id: bigint;
    g_a_hash: Uint8Array<ArrayBuffer>;
    protocol: PhoneCallProtocol;
}
export interface phoneCallAccepted {
    _: "phoneCallAccepted";
    video?: true;
    id: bigint;
    access_hash: bigint;
    date: number;
    admin_id: bigint;
    participant_id: bigint;
    g_b: Uint8Array<ArrayBuffer>;
    protocol: PhoneCallProtocol;
}
export interface phoneCall {
    _: "phoneCall";
    p2p_allowed?: true;
    video?: true;
    conference_supported?: true;
    id: bigint;
    access_hash: bigint;
    date: number;
    admin_id: bigint;
    participant_id: bigint;
    g_a_or_b: Uint8Array<ArrayBuffer>;
    key_fingerprint: bigint;
    protocol: PhoneCallProtocol;
    connections: Array<PhoneConnection>;
    start_date: number;
    custom_parameters?: DataJSON;
}
export interface phoneCallDiscarded {
    _: "phoneCallDiscarded";
    need_rating?: true;
    need_debug?: true;
    video?: true;
    id: bigint;
    reason?: PhoneCallDiscardReason;
    duration?: number;
}
export interface phoneConnection {
    _: "phoneConnection";
    tcp?: true;
    id: bigint;
    ip: string;
    ipv6: string;
    port: number;
    peer_tag: Uint8Array<ArrayBuffer>;
}
export interface phoneConnectionWebrtc {
    _: "phoneConnectionWebrtc";
    turn?: true;
    stun?: true;
    id: bigint;
    ip: string;
    ipv6: string;
    port: number;
    username: string;
    password: string;
}
export interface phoneCallProtocol {
    _: "phoneCallProtocol";
    udp_p2p?: true;
    udp_reflector?: true;
    min_layer: number;
    max_layer: number;
    library_versions: Array<string>;
}
export interface phone_phoneCall {
    _: "phone.phoneCall";
    phone_call: PhoneCall;
    users: Array<User>;
}
export interface upload_cdnFileReuploadNeeded {
    _: "upload.cdnFileReuploadNeeded";
    request_token: Uint8Array<ArrayBuffer>;
}
export interface upload_cdnFile {
    _: "upload.cdnFile";
    bytes: Uint8Array<ArrayBuffer>;
}
export interface cdnPublicKey {
    _: "cdnPublicKey";
    dc_id: number;
    public_key: string;
}
export interface cdnConfig {
    _: "cdnConfig";
    public_keys: Array<CdnPublicKey>;
}
export interface langPackString {
    _: "langPackString";
    key: string;
    value: string;
}
export interface langPackStringPluralized {
    _: "langPackStringPluralized";
    key: string;
    zero_value?: string;
    one_value?: string;
    two_value?: string;
    few_value?: string;
    many_value?: string;
    other_value: string;
}
export interface langPackStringDeleted {
    _: "langPackStringDeleted";
    key: string;
}
export interface langPackDifference {
    _: "langPackDifference";
    lang_code: string;
    from_version: number;
    version: number;
    strings: Array<LangPackString>;
}
export interface langPackLanguage {
    _: "langPackLanguage";
    official?: true;
    rtl?: true;
    beta?: true;
    name: string;
    native_name: string;
    lang_code: string;
    base_lang_code?: string;
    plural_code: string;
    strings_count: number;
    translated_count: number;
    translations_url: string;
}
export interface channelAdminLogEventActionChangeTitle {
    _: "channelAdminLogEventActionChangeTitle";
    prev_value: string;
    new_value: string;
}
export interface channelAdminLogEventActionChangeAbout {
    _: "channelAdminLogEventActionChangeAbout";
    prev_value: string;
    new_value: string;
}
export interface channelAdminLogEventActionChangeUsername {
    _: "channelAdminLogEventActionChangeUsername";
    prev_value: string;
    new_value: string;
}
export interface channelAdminLogEventActionChangePhoto {
    _: "channelAdminLogEventActionChangePhoto";
    prev_photo: Photo;
    new_photo: Photo;
}
export interface channelAdminLogEventActionToggleInvites {
    _: "channelAdminLogEventActionToggleInvites";
    new_value: boolean;
}
export interface channelAdminLogEventActionToggleSignatures {
    _: "channelAdminLogEventActionToggleSignatures";
    new_value: boolean;
}
export interface channelAdminLogEventActionUpdatePinned {
    _: "channelAdminLogEventActionUpdatePinned";
    message: Message;
}
export interface channelAdminLogEventActionEditMessage {
    _: "channelAdminLogEventActionEditMessage";
    prev_message: Message;
    new_message: Message;
}
export interface channelAdminLogEventActionDeleteMessage {
    _: "channelAdminLogEventActionDeleteMessage";
    message: Message;
}
export interface channelAdminLogEventActionParticipantJoin {
    _: "channelAdminLogEventActionParticipantJoin";
}
export interface channelAdminLogEventActionParticipantLeave {
    _: "channelAdminLogEventActionParticipantLeave";
}
export interface channelAdminLogEventActionParticipantInvite {
    _: "channelAdminLogEventActionParticipantInvite";
    participant: ChannelParticipant;
}
export interface channelAdminLogEventActionParticipantToggleBan {
    _: "channelAdminLogEventActionParticipantToggleBan";
    prev_participant: ChannelParticipant;
    new_participant: ChannelParticipant;
}
export interface channelAdminLogEventActionParticipantToggleAdmin {
    _: "channelAdminLogEventActionParticipantToggleAdmin";
    prev_participant: ChannelParticipant;
    new_participant: ChannelParticipant;
}
export interface channelAdminLogEventActionChangeStickerSet {
    _: "channelAdminLogEventActionChangeStickerSet";
    prev_stickerset: InputStickerSet;
    new_stickerset: InputStickerSet;
}
export interface channelAdminLogEventActionTogglePreHistoryHidden {
    _: "channelAdminLogEventActionTogglePreHistoryHidden";
    new_value: boolean;
}
export interface channelAdminLogEventActionDefaultBannedRights {
    _: "channelAdminLogEventActionDefaultBannedRights";
    prev_banned_rights: ChatBannedRights;
    new_banned_rights: ChatBannedRights;
}
export interface channelAdminLogEventActionStopPoll {
    _: "channelAdminLogEventActionStopPoll";
    message: Message;
}
export interface channelAdminLogEventActionChangeLinkedChat {
    _: "channelAdminLogEventActionChangeLinkedChat";
    prev_value: bigint;
    new_value: bigint;
}
export interface channelAdminLogEventActionChangeLocation {
    _: "channelAdminLogEventActionChangeLocation";
    prev_value: ChannelLocation;
    new_value: ChannelLocation;
}
export interface channelAdminLogEventActionToggleSlowMode {
    _: "channelAdminLogEventActionToggleSlowMode";
    prev_value: number;
    new_value: number;
}
export interface channelAdminLogEventActionStartGroupCall {
    _: "channelAdminLogEventActionStartGroupCall";
    call: InputGroupCall;
}
export interface channelAdminLogEventActionDiscardGroupCall {
    _: "channelAdminLogEventActionDiscardGroupCall";
    call: InputGroupCall;
}
export interface channelAdminLogEventActionParticipantMute {
    _: "channelAdminLogEventActionParticipantMute";
    participant: GroupCallParticipant;
}
export interface channelAdminLogEventActionParticipantUnmute {
    _: "channelAdminLogEventActionParticipantUnmute";
    participant: GroupCallParticipant;
}
export interface channelAdminLogEventActionToggleGroupCallSetting {
    _: "channelAdminLogEventActionToggleGroupCallSetting";
    join_muted: boolean;
}
export interface channelAdminLogEventActionParticipantJoinByInvite {
    _: "channelAdminLogEventActionParticipantJoinByInvite";
    via_chatlist?: true;
    invite: ExportedChatInvite;
}
export interface channelAdminLogEventActionExportedInviteDelete {
    _: "channelAdminLogEventActionExportedInviteDelete";
    invite: ExportedChatInvite;
}
export interface channelAdminLogEventActionExportedInviteRevoke {
    _: "channelAdminLogEventActionExportedInviteRevoke";
    invite: ExportedChatInvite;
}
export interface channelAdminLogEventActionExportedInviteEdit {
    _: "channelAdminLogEventActionExportedInviteEdit";
    prev_invite: ExportedChatInvite;
    new_invite: ExportedChatInvite;
}
export interface channelAdminLogEventActionParticipantVolume {
    _: "channelAdminLogEventActionParticipantVolume";
    participant: GroupCallParticipant;
}
export interface channelAdminLogEventActionChangeHistoryTTL {
    _: "channelAdminLogEventActionChangeHistoryTTL";
    prev_value: number;
    new_value: number;
}
export interface channelAdminLogEventActionParticipantJoinByRequest {
    _: "channelAdminLogEventActionParticipantJoinByRequest";
    invite: ExportedChatInvite;
    approved_by: bigint;
}
export interface channelAdminLogEventActionToggleNoForwards {
    _: "channelAdminLogEventActionToggleNoForwards";
    new_value: boolean;
}
export interface channelAdminLogEventActionSendMessage {
    _: "channelAdminLogEventActionSendMessage";
    message: Message;
}
export interface channelAdminLogEventActionChangeAvailableReactions {
    _: "channelAdminLogEventActionChangeAvailableReactions";
    prev_value: ChatReactions;
    new_value: ChatReactions;
}
export interface channelAdminLogEventActionChangeUsernames {
    _: "channelAdminLogEventActionChangeUsernames";
    prev_value: Array<string>;
    new_value: Array<string>;
}
export interface channelAdminLogEventActionToggleForum {
    _: "channelAdminLogEventActionToggleForum";
    new_value: boolean;
}
export interface channelAdminLogEventActionCreateTopic {
    _: "channelAdminLogEventActionCreateTopic";
    topic: ForumTopic;
}
export interface channelAdminLogEventActionEditTopic {
    _: "channelAdminLogEventActionEditTopic";
    prev_topic: ForumTopic;
    new_topic: ForumTopic;
}
export interface channelAdminLogEventActionDeleteTopic {
    _: "channelAdminLogEventActionDeleteTopic";
    topic: ForumTopic;
}
export interface channelAdminLogEventActionPinTopic {
    _: "channelAdminLogEventActionPinTopic";
    prev_topic?: ForumTopic;
    new_topic?: ForumTopic;
}
export interface channelAdminLogEventActionToggleAntiSpam {
    _: "channelAdminLogEventActionToggleAntiSpam";
    new_value: boolean;
}
export interface channelAdminLogEventActionChangePeerColor {
    _: "channelAdminLogEventActionChangePeerColor";
    prev_value: PeerColor;
    new_value: PeerColor;
}
export interface channelAdminLogEventActionChangeProfilePeerColor {
    _: "channelAdminLogEventActionChangeProfilePeerColor";
    prev_value: PeerColor;
    new_value: PeerColor;
}
export interface channelAdminLogEventActionChangeWallpaper {
    _: "channelAdminLogEventActionChangeWallpaper";
    prev_value: WallPaper;
    new_value: WallPaper;
}
export interface channelAdminLogEventActionChangeEmojiStatus {
    _: "channelAdminLogEventActionChangeEmojiStatus";
    prev_value: EmojiStatus;
    new_value: EmojiStatus;
}
export interface channelAdminLogEventActionChangeEmojiStickerSet {
    _: "channelAdminLogEventActionChangeEmojiStickerSet";
    prev_stickerset: InputStickerSet;
    new_stickerset: InputStickerSet;
}
export interface channelAdminLogEventActionToggleSignatureProfiles {
    _: "channelAdminLogEventActionToggleSignatureProfiles";
    new_value: boolean;
}
export interface channelAdminLogEventActionParticipantSubExtend {
    _: "channelAdminLogEventActionParticipantSubExtend";
    prev_participant: ChannelParticipant;
    new_participant: ChannelParticipant;
}
export interface channelAdminLogEventActionToggleAutotranslation {
    _: "channelAdminLogEventActionToggleAutotranslation";
    new_value: boolean;
}
export interface channelAdminLogEvent {
    _: "channelAdminLogEvent";
    id: bigint;
    date: number;
    user_id: bigint;
    action: ChannelAdminLogEventAction;
}
export interface channels_adminLogResults {
    _: "channels.adminLogResults";
    events: Array<ChannelAdminLogEvent>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface channelAdminLogEventsFilter {
    _: "channelAdminLogEventsFilter";
    join?: true;
    leave?: true;
    invite?: true;
    ban?: true;
    unban?: true;
    kick?: true;
    unkick?: true;
    promote?: true;
    demote?: true;
    info?: true;
    settings?: true;
    pinned?: true;
    edit?: true;
    delete?: true;
    group_call?: true;
    invites?: true;
    send?: true;
    forums?: true;
    sub_extend?: true;
}
export interface popularContact {
    _: "popularContact";
    client_id: bigint;
    importers: number;
}
export interface messages_favedStickersNotModified {
    _: "messages.favedStickersNotModified";
}
export interface messages_favedStickers {
    _: "messages.favedStickers";
    hash: bigint;
    packs: Array<StickerPack>;
    stickers: Array<Document>;
}
export interface recentMeUrlUnknown {
    _: "recentMeUrlUnknown";
    url: string;
}
export interface recentMeUrlUser {
    _: "recentMeUrlUser";
    url: string;
    user_id: bigint;
}
export interface recentMeUrlChat {
    _: "recentMeUrlChat";
    url: string;
    chat_id: bigint;
}
export interface recentMeUrlChatInvite {
    _: "recentMeUrlChatInvite";
    url: string;
    chat_invite: ChatInvite;
}
export interface recentMeUrlStickerSet {
    _: "recentMeUrlStickerSet";
    url: string;
    set: StickerSetCovered;
}
export interface help_recentMeUrls {
    _: "help.recentMeUrls";
    urls: Array<RecentMeUrl>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface inputSingleMedia {
    _: "inputSingleMedia";
    media: InputMedia;
    random_id: bigint;
    message: string;
    entities?: Array<MessageEntity>;
}
export interface webAuthorization {
    _: "webAuthorization";
    hash: bigint;
    bot_id: bigint;
    domain: string;
    browser: string;
    platform: string;
    date_created: number;
    date_active: number;
    ip: string;
    region: string;
}
export interface account_webAuthorizations {
    _: "account.webAuthorizations";
    authorizations: Array<WebAuthorization>;
    users: Array<User>;
}
export interface inputMessageID {
    _: "inputMessageID";
    id: number;
}
export interface inputMessageReplyTo {
    _: "inputMessageReplyTo";
    id: number;
}
export interface inputMessagePinned {
    _: "inputMessagePinned";
}
export interface inputMessageCallbackQuery {
    _: "inputMessageCallbackQuery";
    id: number;
    query_id: bigint;
}
export interface inputDialogPeer {
    _: "inputDialogPeer";
    peer: InputPeer;
}
export interface inputDialogPeerFolder {
    _: "inputDialogPeerFolder";
    folder_id: number;
}
export interface dialogPeer {
    _: "dialogPeer";
    peer: Peer;
}
export interface dialogPeerFolder {
    _: "dialogPeerFolder";
    folder_id: number;
}
export interface messages_foundStickerSetsNotModified {
    _: "messages.foundStickerSetsNotModified";
}
export interface messages_foundStickerSets {
    _: "messages.foundStickerSets";
    hash: bigint;
    sets: Array<StickerSetCovered>;
}
export interface fileHash {
    _: "fileHash";
    offset: bigint;
    limit: number;
    hash: Uint8Array<ArrayBuffer>;
}
export interface inputClientProxy {
    _: "inputClientProxy";
    address: string;
    port: number;
}
export interface help_termsOfServiceUpdateEmpty {
    _: "help.termsOfServiceUpdateEmpty";
    expires: number;
}
export interface help_termsOfServiceUpdate {
    _: "help.termsOfServiceUpdate";
    expires: number;
    terms_of_service: help_TermsOfService;
}
export interface inputSecureFileUploaded {
    _: "inputSecureFileUploaded";
    id: bigint;
    parts: number;
    md5_checksum: string;
    file_hash: Uint8Array<ArrayBuffer>;
    secret: Uint8Array<ArrayBuffer>;
}
export interface inputSecureFile {
    _: "inputSecureFile";
    id: bigint;
    access_hash: bigint;
}
export interface secureFileEmpty {
    _: "secureFileEmpty";
}
export interface secureFile {
    _: "secureFile";
    id: bigint;
    access_hash: bigint;
    size: bigint;
    dc_id: number;
    date: number;
    file_hash: Uint8Array<ArrayBuffer>;
    secret: Uint8Array<ArrayBuffer>;
}
export interface secureData {
    _: "secureData";
    data: Uint8Array<ArrayBuffer>;
    data_hash: Uint8Array<ArrayBuffer>;
    secret: Uint8Array<ArrayBuffer>;
}
export interface securePlainPhone {
    _: "securePlainPhone";
    phone: string;
}
export interface securePlainEmail {
    _: "securePlainEmail";
    email: string;
}
export interface secureValueTypePersonalDetails {
    _: "secureValueTypePersonalDetails";
}
export interface secureValueTypePassport {
    _: "secureValueTypePassport";
}
export interface secureValueTypeDriverLicense {
    _: "secureValueTypeDriverLicense";
}
export interface secureValueTypeIdentityCard {
    _: "secureValueTypeIdentityCard";
}
export interface secureValueTypeInternalPassport {
    _: "secureValueTypeInternalPassport";
}
export interface secureValueTypeAddress {
    _: "secureValueTypeAddress";
}
export interface secureValueTypeUtilityBill {
    _: "secureValueTypeUtilityBill";
}
export interface secureValueTypeBankStatement {
    _: "secureValueTypeBankStatement";
}
export interface secureValueTypeRentalAgreement {
    _: "secureValueTypeRentalAgreement";
}
export interface secureValueTypePassportRegistration {
    _: "secureValueTypePassportRegistration";
}
export interface secureValueTypeTemporaryRegistration {
    _: "secureValueTypeTemporaryRegistration";
}
export interface secureValueTypePhone {
    _: "secureValueTypePhone";
}
export interface secureValueTypeEmail {
    _: "secureValueTypeEmail";
}
export interface secureValue {
    _: "secureValue";
    type: SecureValueType;
    data?: SecureData;
    front_side?: SecureFile;
    reverse_side?: SecureFile;
    selfie?: SecureFile;
    translation?: Array<SecureFile>;
    files?: Array<SecureFile>;
    plain_data?: SecurePlainData;
    hash: Uint8Array<ArrayBuffer>;
}
export interface inputSecureValue {
    _: "inputSecureValue";
    type: SecureValueType;
    data?: SecureData;
    front_side?: InputSecureFile;
    reverse_side?: InputSecureFile;
    selfie?: InputSecureFile;
    translation?: Array<InputSecureFile>;
    files?: Array<InputSecureFile>;
    plain_data?: SecurePlainData;
}
export interface secureValueHash {
    _: "secureValueHash";
    type: SecureValueType;
    hash: Uint8Array<ArrayBuffer>;
}
export interface secureValueErrorData {
    _: "secureValueErrorData";
    type: SecureValueType;
    data_hash: Uint8Array<ArrayBuffer>;
    field: string;
    text: string;
}
export interface secureValueErrorFrontSide {
    _: "secureValueErrorFrontSide";
    type: SecureValueType;
    file_hash: Uint8Array<ArrayBuffer>;
    text: string;
}
export interface secureValueErrorReverseSide {
    _: "secureValueErrorReverseSide";
    type: SecureValueType;
    file_hash: Uint8Array<ArrayBuffer>;
    text: string;
}
export interface secureValueErrorSelfie {
    _: "secureValueErrorSelfie";
    type: SecureValueType;
    file_hash: Uint8Array<ArrayBuffer>;
    text: string;
}
export interface secureValueErrorFile {
    _: "secureValueErrorFile";
    type: SecureValueType;
    file_hash: Uint8Array<ArrayBuffer>;
    text: string;
}
export interface secureValueErrorFiles {
    _: "secureValueErrorFiles";
    type: SecureValueType;
    file_hash: Array<Uint8Array<ArrayBuffer>>;
    text: string;
}
export interface secureValueError {
    _: "secureValueError";
    type: SecureValueType;
    hash: Uint8Array<ArrayBuffer>;
    text: string;
}
export interface secureValueErrorTranslationFile {
    _: "secureValueErrorTranslationFile";
    type: SecureValueType;
    file_hash: Uint8Array<ArrayBuffer>;
    text: string;
}
export interface secureValueErrorTranslationFiles {
    _: "secureValueErrorTranslationFiles";
    type: SecureValueType;
    file_hash: Array<Uint8Array<ArrayBuffer>>;
    text: string;
}
export interface secureCredentialsEncrypted {
    _: "secureCredentialsEncrypted";
    data: Uint8Array<ArrayBuffer>;
    hash: Uint8Array<ArrayBuffer>;
    secret: Uint8Array<ArrayBuffer>;
}
export interface account_authorizationForm {
    _: "account.authorizationForm";
    required_types: Array<SecureRequiredType>;
    values: Array<SecureValue>;
    errors: Array<SecureValueError>;
    users: Array<User>;
    privacy_policy_url?: string;
}
export interface account_sentEmailCode {
    _: "account.sentEmailCode";
    email_pattern: string;
    length: number;
}
export interface help_deepLinkInfoEmpty {
    _: "help.deepLinkInfoEmpty";
}
export interface help_deepLinkInfo {
    _: "help.deepLinkInfo";
    update_app?: true;
    message: string;
    entities?: Array<MessageEntity>;
}
export interface savedPhoneContact {
    _: "savedPhoneContact";
    phone: string;
    first_name: string;
    last_name: string;
    date: number;
}
export interface account_takeout {
    _: "account.takeout";
    id: bigint;
}
export interface passwordKdfAlgoUnknown {
    _: "passwordKdfAlgoUnknown";
}
export interface passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow {
    _: "passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow";
    salt1: Uint8Array<ArrayBuffer>;
    salt2: Uint8Array<ArrayBuffer>;
    g: number;
    p: Uint8Array<ArrayBuffer>;
}
export interface securePasswordKdfAlgoUnknown {
    _: "securePasswordKdfAlgoUnknown";
}
export interface securePasswordKdfAlgoPBKDF2HMACSHA512iter100000 {
    _: "securePasswordKdfAlgoPBKDF2HMACSHA512iter100000";
    salt: Uint8Array<ArrayBuffer>;
}
export interface securePasswordKdfAlgoSHA512 {
    _: "securePasswordKdfAlgoSHA512";
    salt: Uint8Array<ArrayBuffer>;
}
export interface secureSecretSettings {
    _: "secureSecretSettings";
    secure_algo: SecurePasswordKdfAlgo;
    secure_secret: Uint8Array<ArrayBuffer>;
    secure_secret_id: bigint;
}
export interface inputCheckPasswordEmpty {
    _: "inputCheckPasswordEmpty";
}
export interface inputCheckPasswordSRP {
    _: "inputCheckPasswordSRP";
    srp_id: bigint;
    A: Uint8Array<ArrayBuffer>;
    M1: Uint8Array<ArrayBuffer>;
}
export interface secureRequiredType {
    _: "secureRequiredType";
    native_names?: true;
    selfie_required?: true;
    translation_required?: true;
    type: SecureValueType;
}
export interface secureRequiredTypeOneOf {
    _: "secureRequiredTypeOneOf";
    types: Array<SecureRequiredType>;
}
export interface help_passportConfigNotModified {
    _: "help.passportConfigNotModified";
}
export interface help_passportConfig {
    _: "help.passportConfig";
    hash: number;
    countries_langs: DataJSON;
}
export interface inputAppEvent {
    _: "inputAppEvent";
    time: number;
    type: string;
    peer: bigint;
    data: JSONValue;
}
export interface jsonObjectValue {
    _: "jsonObjectValue";
    key: string;
    value: JSONValue;
}
export interface jsonNull {
    _: "jsonNull";
}
export interface jsonBool {
    _: "jsonBool";
    value: boolean;
}
export interface jsonNumber {
    _: "jsonNumber";
    value: number;
}
export interface jsonString {
    _: "jsonString";
    value: string;
}
export interface jsonArray {
    _: "jsonArray";
    value: Array<JSONValue>;
}
export interface jsonObject {
    _: "jsonObject";
    value: Array<JSONObjectValue>;
}
export interface pageTableCell {
    _: "pageTableCell";
    header?: true;
    align_center?: true;
    align_right?: true;
    valign_middle?: true;
    valign_bottom?: true;
    text?: RichText;
    colspan?: number;
    rowspan?: number;
}
export interface pageTableRow {
    _: "pageTableRow";
    cells: Array<PageTableCell>;
}
export interface pageCaption {
    _: "pageCaption";
    text: RichText;
    credit: RichText;
}
export interface pageListItemText {
    _: "pageListItemText";
    text: RichText;
}
export interface pageListItemBlocks {
    _: "pageListItemBlocks";
    blocks: Array<PageBlock>;
}
export interface pageListOrderedItemText {
    _: "pageListOrderedItemText";
    num: string;
    text: RichText;
}
export interface pageListOrderedItemBlocks {
    _: "pageListOrderedItemBlocks";
    num: string;
    blocks: Array<PageBlock>;
}
export interface pageRelatedArticle {
    _: "pageRelatedArticle";
    url: string;
    webpage_id: bigint;
    title?: string;
    description?: string;
    photo_id?: bigint;
    author?: string;
    published_date?: number;
}
export interface page {
    _: "page";
    part?: true;
    rtl?: true;
    v2?: true;
    url: string;
    blocks: Array<PageBlock>;
    photos: Array<Photo>;
    documents: Array<Document>;
    views?: number;
}
export interface help_supportName {
    _: "help.supportName";
    name: string;
}
export interface help_userInfoEmpty {
    _: "help.userInfoEmpty";
}
export interface help_userInfo {
    _: "help.userInfo";
    message: string;
    entities: Array<MessageEntity>;
    author: string;
    date: number;
}
export interface pollAnswer {
    _: "pollAnswer";
    text: TextWithEntities;
    option: Uint8Array<ArrayBuffer>;
}
export interface poll {
    _: "poll";
    id: bigint;
    closed?: true;
    public_voters?: true;
    multiple_choice?: true;
    quiz?: true;
    question: TextWithEntities;
    answers: Array<PollAnswer>;
    close_period?: number;
    close_date?: number;
}
export interface pollAnswerVoters {
    _: "pollAnswerVoters";
    chosen?: true;
    correct?: true;
    option: Uint8Array<ArrayBuffer>;
    voters: number;
}
export interface pollResults {
    _: "pollResults";
    min?: true;
    results?: Array<PollAnswerVoters>;
    total_voters?: number;
    recent_voters?: Array<Peer>;
    solution?: string;
    solution_entities?: Array<MessageEntity>;
}
export interface chatOnlines {
    _: "chatOnlines";
    onlines: number;
}
export interface statsURL {
    _: "statsURL";
    url: string;
}
export interface chatAdminRights {
    _: "chatAdminRights";
    change_info?: true;
    post_messages?: true;
    edit_messages?: true;
    delete_messages?: true;
    ban_users?: true;
    invite_users?: true;
    pin_messages?: true;
    add_admins?: true;
    anonymous?: true;
    manage_call?: true;
    other?: true;
    manage_topics?: true;
    post_stories?: true;
    edit_stories?: true;
    delete_stories?: true;
    manage_direct_messages?: true;
}
export interface chatBannedRights {
    _: "chatBannedRights";
    view_messages?: true;
    send_messages?: true;
    send_media?: true;
    send_stickers?: true;
    send_gifs?: true;
    send_games?: true;
    send_inline?: true;
    embed_links?: true;
    send_polls?: true;
    change_info?: true;
    invite_users?: true;
    pin_messages?: true;
    manage_topics?: true;
    send_photos?: true;
    send_videos?: true;
    send_roundvideos?: true;
    send_audios?: true;
    send_voices?: true;
    send_docs?: true;
    send_plain?: true;
    until_date: number;
}
export interface inputWallPaper {
    _: "inputWallPaper";
    id: bigint;
    access_hash: bigint;
}
export interface inputWallPaperSlug {
    _: "inputWallPaperSlug";
    slug: string;
}
export interface inputWallPaperNoFile {
    _: "inputWallPaperNoFile";
    id: bigint;
}
export interface account_wallPapersNotModified {
    _: "account.wallPapersNotModified";
}
export interface account_wallPapers {
    _: "account.wallPapers";
    hash: bigint;
    wallpapers: Array<WallPaper>;
}
export interface codeSettings {
    _: "codeSettings";
    allow_flashcall?: true;
    current_number?: true;
    allow_app_hash?: true;
    allow_missed_call?: true;
    allow_firebase?: true;
    unknown_number?: true;
    logout_tokens?: Array<Uint8Array<ArrayBuffer>>;
    token?: string;
    app_sandbox?: boolean;
}
export interface wallPaperSettings {
    _: "wallPaperSettings";
    blur?: true;
    motion?: true;
    background_color?: number;
    second_background_color?: number;
    third_background_color?: number;
    fourth_background_color?: number;
    intensity?: number;
    rotation?: number;
    emoticon?: string;
}
export interface autoDownloadSettings {
    _: "autoDownloadSettings";
    disabled?: true;
    video_preload_large?: true;
    audio_preload_next?: true;
    phonecalls_less_data?: true;
    stories_preload?: true;
    photo_size_max: number;
    video_size_max: bigint;
    file_size_max: bigint;
    video_upload_maxbitrate: number;
    small_queue_active_operations_max: number;
    large_queue_active_operations_max: number;
}
export interface account_autoDownloadSettings {
    _: "account.autoDownloadSettings";
    low: AutoDownloadSettings;
    medium: AutoDownloadSettings;
    high: AutoDownloadSettings;
}
export interface emojiKeyword {
    _: "emojiKeyword";
    keyword: string;
    emoticons: Array<string>;
}
export interface emojiKeywordDeleted {
    _: "emojiKeywordDeleted";
    keyword: string;
    emoticons: Array<string>;
}
export interface emojiKeywordsDifference {
    _: "emojiKeywordsDifference";
    lang_code: string;
    from_version: number;
    version: number;
    keywords: Array<EmojiKeyword>;
}
export interface emojiURL {
    _: "emojiURL";
    url: string;
}
export interface emojiLanguage {
    _: "emojiLanguage";
    lang_code: string;
}
export interface folder {
    _: "folder";
    autofill_new_broadcasts?: true;
    autofill_public_groups?: true;
    autofill_new_correspondents?: true;
    id: number;
    title: string;
    photo?: ChatPhoto;
}
export interface inputFolderPeer {
    _: "inputFolderPeer";
    peer: InputPeer;
    folder_id: number;
}
export interface folderPeer {
    _: "folderPeer";
    peer: Peer;
    folder_id: number;
}
export interface messages_searchCounter {
    _: "messages.searchCounter";
    inexact?: true;
    filter: MessagesFilter;
    count: number;
}
export interface urlAuthResultRequest {
    _: "urlAuthResultRequest";
    request_write_access?: true;
    bot: User;
    domain: string;
}
export interface urlAuthResultAccepted {
    _: "urlAuthResultAccepted";
    url: string;
}
export interface urlAuthResultDefault {
    _: "urlAuthResultDefault";
}
export interface channelLocationEmpty {
    _: "channelLocationEmpty";
}
export interface channelLocation {
    _: "channelLocation";
    geo_point: GeoPoint;
    address: string;
}
export interface peerLocated {
    _: "peerLocated";
    peer: Peer;
    expires: number;
    distance: number;
}
export interface peerSelfLocated {
    _: "peerSelfLocated";
    expires: number;
}
export interface restrictionReason {
    _: "restrictionReason";
    platform: string;
    reason: string;
    text: string;
}
export interface inputTheme {
    _: "inputTheme";
    id: bigint;
    access_hash: bigint;
}
export interface inputThemeSlug {
    _: "inputThemeSlug";
    slug: string;
}
export interface theme {
    _: "theme";
    creator?: true;
    default?: true;
    for_chat?: true;
    id: bigint;
    access_hash: bigint;
    slug: string;
    title: string;
    document?: Document;
    settings?: Array<ThemeSettings>;
    emoticon?: string;
    installs_count?: number;
}
export interface account_themesNotModified {
    _: "account.themesNotModified";
}
export interface account_themes {
    _: "account.themes";
    hash: bigint;
    themes: Array<Theme>;
}
export interface auth_loginToken {
    _: "auth.loginToken";
    expires: number;
    token: Uint8Array<ArrayBuffer>;
}
export interface auth_loginTokenMigrateTo {
    _: "auth.loginTokenMigrateTo";
    dc_id: number;
    token: Uint8Array<ArrayBuffer>;
}
export interface auth_loginTokenSuccess {
    _: "auth.loginTokenSuccess";
    authorization: auth_Authorization;
}
export interface account_contentSettings {
    _: "account.contentSettings";
    sensitive_enabled?: true;
    sensitive_can_change?: true;
}
export interface messages_inactiveChats {
    _: "messages.inactiveChats";
    dates: Array<number>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface baseThemeClassic {
    _: "baseThemeClassic";
}
export interface baseThemeDay {
    _: "baseThemeDay";
}
export interface baseThemeNight {
    _: "baseThemeNight";
}
export interface baseThemeTinted {
    _: "baseThemeTinted";
}
export interface baseThemeArctic {
    _: "baseThemeArctic";
}
export interface inputThemeSettings {
    _: "inputThemeSettings";
    message_colors_animated?: true;
    base_theme: BaseTheme;
    accent_color: number;
    outbox_accent_color?: number;
    message_colors?: Array<number>;
    wallpaper?: InputWallPaper;
    wallpaper_settings?: WallPaperSettings;
}
export interface themeSettings {
    _: "themeSettings";
    message_colors_animated?: true;
    base_theme: BaseTheme;
    accent_color: number;
    outbox_accent_color?: number;
    message_colors?: Array<number>;
    wallpaper?: WallPaper;
}
export interface webPageAttributeTheme {
    _: "webPageAttributeTheme";
    documents?: Array<Document>;
    settings?: ThemeSettings;
}
export interface webPageAttributeStory {
    _: "webPageAttributeStory";
    peer: Peer;
    id: number;
    story?: StoryItem;
}
export interface webPageAttributeStickerSet {
    _: "webPageAttributeStickerSet";
    emojis?: true;
    text_color?: true;
    stickers: Array<Document>;
}
export interface webPageAttributeUniqueStarGift {
    _: "webPageAttributeUniqueStarGift";
    gift: StarGift;
}
export interface webPageAttributeStarGiftCollection {
    _: "webPageAttributeStarGiftCollection";
    icons: Array<Document>;
}
export interface webPageAttributeStarGiftAuction {
    _: "webPageAttributeStarGiftAuction";
    gift: StarGift;
    end_date: number;
}
export interface messages_votesList {
    _: "messages.votesList";
    count: number;
    votes: Array<MessagePeerVote>;
    chats: Array<Chat>;
    users: Array<User>;
    next_offset?: string;
}
export interface bankCardOpenUrl {
    _: "bankCardOpenUrl";
    url: string;
    name: string;
}
export interface payments_bankCardData {
    _: "payments.bankCardData";
    title: string;
    open_urls: Array<BankCardOpenUrl>;
}
export interface dialogFilter {
    _: "dialogFilter";
    contacts?: true;
    non_contacts?: true;
    groups?: true;
    broadcasts?: true;
    bots?: true;
    exclude_muted?: true;
    exclude_read?: true;
    exclude_archived?: true;
    title_noanimate?: true;
    id: number;
    title: TextWithEntities;
    emoticon?: string;
    color?: number;
    pinned_peers: Array<InputPeer>;
    include_peers: Array<InputPeer>;
    exclude_peers: Array<InputPeer>;
}
export interface dialogFilterDefault {
    _: "dialogFilterDefault";
}
export interface dialogFilterChatlist {
    _: "dialogFilterChatlist";
    has_my_invites?: true;
    title_noanimate?: true;
    id: number;
    title: TextWithEntities;
    emoticon?: string;
    color?: number;
    pinned_peers: Array<InputPeer>;
    include_peers: Array<InputPeer>;
}
export interface dialogFilterSuggested {
    _: "dialogFilterSuggested";
    filter: DialogFilter;
    description: string;
}
export interface statsDateRangeDays {
    _: "statsDateRangeDays";
    min_date: number;
    max_date: number;
}
export interface statsAbsValueAndPrev {
    _: "statsAbsValueAndPrev";
    current: number;
    previous: number;
}
export interface statsPercentValue {
    _: "statsPercentValue";
    part: number;
    total: number;
}
export interface statsGraphAsync {
    _: "statsGraphAsync";
    token: string;
}
export interface statsGraphError {
    _: "statsGraphError";
    error: string;
}
export interface statsGraph {
    _: "statsGraph";
    json: DataJSON;
    zoom_token?: string;
}
export interface stats_broadcastStats {
    _: "stats.broadcastStats";
    period: StatsDateRangeDays;
    followers: StatsAbsValueAndPrev;
    views_per_post: StatsAbsValueAndPrev;
    shares_per_post: StatsAbsValueAndPrev;
    reactions_per_post: StatsAbsValueAndPrev;
    views_per_story: StatsAbsValueAndPrev;
    shares_per_story: StatsAbsValueAndPrev;
    reactions_per_story: StatsAbsValueAndPrev;
    enabled_notifications: StatsPercentValue;
    growth_graph: StatsGraph;
    followers_graph: StatsGraph;
    mute_graph: StatsGraph;
    top_hours_graph: StatsGraph;
    interactions_graph: StatsGraph;
    iv_interactions_graph: StatsGraph;
    views_by_source_graph: StatsGraph;
    new_followers_by_source_graph: StatsGraph;
    languages_graph: StatsGraph;
    reactions_by_emotion_graph: StatsGraph;
    story_interactions_graph: StatsGraph;
    story_reactions_by_emotion_graph: StatsGraph;
    recent_posts_interactions: Array<PostInteractionCounters>;
}
export interface help_promoDataEmpty {
    _: "help.promoDataEmpty";
    expires: number;
}
export interface help_promoData {
    _: "help.promoData";
    proxy?: true;
    expires: number;
    peer?: Peer;
    psa_type?: string;
    psa_message?: string;
    pending_suggestions: Array<string>;
    dismissed_suggestions: Array<string>;
    custom_pending_suggestion?: PendingSuggestion;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface videoSize {
    _: "videoSize";
    type: string;
    w: number;
    h: number;
    size: number;
    video_start_ts?: number;
}
export interface videoSizeEmojiMarkup {
    _: "videoSizeEmojiMarkup";
    emoji_id: bigint;
    background_colors: Array<number>;
}
export interface videoSizeStickerMarkup {
    _: "videoSizeStickerMarkup";
    stickerset: InputStickerSet;
    sticker_id: bigint;
    background_colors: Array<number>;
}
export interface statsGroupTopPoster {
    _: "statsGroupTopPoster";
    user_id: bigint;
    messages: number;
    avg_chars: number;
}
export interface statsGroupTopAdmin {
    _: "statsGroupTopAdmin";
    user_id: bigint;
    deleted: number;
    kicked: number;
    banned: number;
}
export interface statsGroupTopInviter {
    _: "statsGroupTopInviter";
    user_id: bigint;
    invitations: number;
}
export interface stats_megagroupStats {
    _: "stats.megagroupStats";
    period: StatsDateRangeDays;
    members: StatsAbsValueAndPrev;
    messages: StatsAbsValueAndPrev;
    viewers: StatsAbsValueAndPrev;
    posters: StatsAbsValueAndPrev;
    growth_graph: StatsGraph;
    members_graph: StatsGraph;
    new_members_by_source_graph: StatsGraph;
    languages_graph: StatsGraph;
    messages_graph: StatsGraph;
    actions_graph: StatsGraph;
    top_hours_graph: StatsGraph;
    weekdays_graph: StatsGraph;
    top_posters: Array<StatsGroupTopPoster>;
    top_admins: Array<StatsGroupTopAdmin>;
    top_inviters: Array<StatsGroupTopInviter>;
    users: Array<User>;
}
export interface globalPrivacySettings {
    _: "globalPrivacySettings";
    archive_and_mute_new_noncontact_peers?: true;
    keep_archived_unmuted?: true;
    keep_archived_folders?: true;
    hide_read_marks?: true;
    new_noncontact_peers_require_premium?: true;
    display_gifts_button?: true;
    noncontact_peers_paid_stars?: bigint;
    disallowed_gifts?: DisallowedGiftsSettings;
}
export interface help_countryCode {
    _: "help.countryCode";
    country_code: string;
    prefixes?: Array<string>;
    patterns?: Array<string>;
}
export interface help_country {
    _: "help.country";
    hidden?: true;
    iso2: string;
    default_name: string;
    name?: string;
    country_codes: Array<help_CountryCode>;
}
export interface help_countriesListNotModified {
    _: "help.countriesListNotModified";
}
export interface help_countriesList {
    _: "help.countriesList";
    countries: Array<help_Country>;
    hash: number;
}
export interface messageViews {
    _: "messageViews";
    views?: number;
    forwards?: number;
    replies?: MessageReplies;
}
export interface messages_messageViews {
    _: "messages.messageViews";
    views: Array<MessageViews>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface messages_discussionMessage {
    _: "messages.discussionMessage";
    messages: Array<Message>;
    max_id?: number;
    read_inbox_max_id?: number;
    read_outbox_max_id?: number;
    unread_count: number;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface messageReplyHeader {
    _: "messageReplyHeader";
    reply_to_scheduled?: true;
    forum_topic?: true;
    quote?: true;
    reply_to_msg_id?: number;
    reply_to_peer_id?: Peer;
    reply_from?: MessageFwdHeader;
    reply_media?: MessageMedia;
    reply_to_top_id?: number;
    quote_text?: string;
    quote_entities?: Array<MessageEntity>;
    quote_offset?: number;
    todo_item_id?: number;
}
export interface messageReplyStoryHeader {
    _: "messageReplyStoryHeader";
    peer: Peer;
    story_id: number;
}
export interface messageReplies {
    _: "messageReplies";
    comments?: true;
    replies: number;
    replies_pts: number;
    recent_repliers?: Array<Peer>;
    channel_id?: bigint;
    max_id?: number;
    read_max_id?: number;
}
export interface peerBlocked {
    _: "peerBlocked";
    peer_id: Peer;
    date: number;
}
export interface stats_messageStats {
    _: "stats.messageStats";
    views_graph: StatsGraph;
    reactions_by_emotion_graph: StatsGraph;
}
export interface groupCallDiscarded {
    _: "groupCallDiscarded";
    id: bigint;
    access_hash: bigint;
    duration: number;
}
export interface groupCall {
    _: "groupCall";
    join_muted?: true;
    can_change_join_muted?: true;
    join_date_asc?: true;
    schedule_start_subscribed?: true;
    can_start_video?: true;
    record_video_active?: true;
    rtmp_stream?: true;
    listeners_hidden?: true;
    conference?: true;
    creator?: true;
    messages_enabled?: true;
    can_change_messages_enabled?: true;
    min?: true;
    id: bigint;
    access_hash: bigint;
    participants_count: number;
    title?: string;
    stream_dc_id?: number;
    record_start_date?: number;
    schedule_date?: number;
    unmuted_video_count?: number;
    unmuted_video_limit: number;
    version: number;
    invite_link?: string;
    send_paid_messages_stars?: bigint;
    default_send_as?: Peer;
}
export interface inputGroupCall {
    _: "inputGroupCall";
    id: bigint;
    access_hash: bigint;
}
export interface inputGroupCallSlug {
    _: "inputGroupCallSlug";
    slug: string;
}
export interface inputGroupCallInviteMessage {
    _: "inputGroupCallInviteMessage";
    msg_id: number;
}
export interface groupCallParticipant {
    _: "groupCallParticipant";
    muted?: true;
    left?: true;
    can_self_unmute?: true;
    just_joined?: true;
    versioned?: true;
    min?: true;
    muted_by_you?: true;
    volume_by_admin?: true;
    self?: true;
    video_joined?: true;
    peer: Peer;
    date: number;
    active_date?: number;
    source: number;
    volume?: number;
    about?: string;
    raise_hand_rating?: bigint;
    video?: GroupCallParticipantVideo;
    presentation?: GroupCallParticipantVideo;
    paid_stars_total?: bigint;
}
export interface phone_groupCall {
    _: "phone.groupCall";
    call: GroupCall;
    participants: Array<GroupCallParticipant>;
    participants_next_offset: string;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface phone_groupParticipants {
    _: "phone.groupParticipants";
    count: number;
    participants: Array<GroupCallParticipant>;
    next_offset: string;
    chats: Array<Chat>;
    users: Array<User>;
    version: number;
}
export interface inlineQueryPeerTypeSameBotPM {
    _: "inlineQueryPeerTypeSameBotPM";
}
export interface inlineQueryPeerTypePM {
    _: "inlineQueryPeerTypePM";
}
export interface inlineQueryPeerTypeChat {
    _: "inlineQueryPeerTypeChat";
}
export interface inlineQueryPeerTypeMegagroup {
    _: "inlineQueryPeerTypeMegagroup";
}
export interface inlineQueryPeerTypeBroadcast {
    _: "inlineQueryPeerTypeBroadcast";
}
export interface inlineQueryPeerTypeBotPM {
    _: "inlineQueryPeerTypeBotPM";
}
export interface messages_historyImport {
    _: "messages.historyImport";
    id: bigint;
}
export interface messages_historyImportParsed {
    _: "messages.historyImportParsed";
    pm?: true;
    group?: true;
    title?: string;
}
export interface messages_affectedFoundMessages {
    _: "messages.affectedFoundMessages";
    pts: number;
    pts_count: number;
    offset: number;
    messages: Array<number>;
}
export interface chatInviteImporter {
    _: "chatInviteImporter";
    requested?: true;
    via_chatlist?: true;
    user_id: bigint;
    date: number;
    about?: string;
    approved_by?: bigint;
}
export interface messages_exportedChatInvites {
    _: "messages.exportedChatInvites";
    count: number;
    invites: Array<ExportedChatInvite>;
    users: Array<User>;
}
export interface messages_exportedChatInvite {
    _: "messages.exportedChatInvite";
    invite: ExportedChatInvite;
    users: Array<User>;
}
export interface messages_exportedChatInviteReplaced {
    _: "messages.exportedChatInviteReplaced";
    invite: ExportedChatInvite;
    new_invite: ExportedChatInvite;
    users: Array<User>;
}
export interface messages_chatInviteImporters {
    _: "messages.chatInviteImporters";
    count: number;
    importers: Array<ChatInviteImporter>;
    users: Array<User>;
}
export interface chatAdminWithInvites {
    _: "chatAdminWithInvites";
    admin_id: bigint;
    invites_count: number;
    revoked_invites_count: number;
}
export interface messages_chatAdminsWithInvites {
    _: "messages.chatAdminsWithInvites";
    admins: Array<ChatAdminWithInvites>;
    users: Array<User>;
}
export interface messages_checkedHistoryImportPeer {
    _: "messages.checkedHistoryImportPeer";
    confirm_text: string;
}
export interface phone_joinAsPeers {
    _: "phone.joinAsPeers";
    peers: Array<Peer>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface phone_exportedGroupCallInvite {
    _: "phone.exportedGroupCallInvite";
    link: string;
}
export interface groupCallParticipantVideoSourceGroup {
    _: "groupCallParticipantVideoSourceGroup";
    semantics: string;
    sources: Array<number>;
}
export interface groupCallParticipantVideo {
    _: "groupCallParticipantVideo";
    paused?: true;
    endpoint: string;
    source_groups: Array<GroupCallParticipantVideoSourceGroup>;
    audio_source?: number;
}
export interface stickers_suggestedShortName {
    _: "stickers.suggestedShortName";
    short_name: string;
}
export interface botCommandScopeDefault {
    _: "botCommandScopeDefault";
}
export interface botCommandScopeUsers {
    _: "botCommandScopeUsers";
}
export interface botCommandScopeChats {
    _: "botCommandScopeChats";
}
export interface botCommandScopeChatAdmins {
    _: "botCommandScopeChatAdmins";
}
export interface botCommandScopePeer {
    _: "botCommandScopePeer";
    peer: InputPeer;
}
export interface botCommandScopePeerAdmins {
    _: "botCommandScopePeerAdmins";
    peer: InputPeer;
}
export interface botCommandScopePeerUser {
    _: "botCommandScopePeerUser";
    peer: InputPeer;
    user_id: InputUser;
}
export interface account_resetPasswordFailedWait {
    _: "account.resetPasswordFailedWait";
    retry_date: number;
}
export interface account_resetPasswordRequestedWait {
    _: "account.resetPasswordRequestedWait";
    until_date: number;
}
export interface account_resetPasswordOk {
    _: "account.resetPasswordOk";
}
export interface chatTheme {
    _: "chatTheme";
    emoticon: string;
}
export interface chatThemeUniqueGift {
    _: "chatThemeUniqueGift";
    gift: StarGift;
    theme_settings: Array<ThemeSettings>;
}
export interface account_chatThemesNotModified {
    _: "account.chatThemesNotModified";
}
export interface account_chatThemes {
    _: "account.chatThemes";
    hash: bigint;
    themes: Array<ChatTheme>;
    chats: Array<Chat>;
    users: Array<User>;
    next_offset?: string;
}
export interface sponsoredMessage {
    _: "sponsoredMessage";
    recommended?: true;
    can_report?: true;
    random_id: Uint8Array<ArrayBuffer>;
    url: string;
    title: string;
    message: string;
    entities?: Array<MessageEntity>;
    photo?: Photo;
    media?: MessageMedia;
    color?: PeerColor;
    button_text: string;
    sponsor_info?: string;
    additional_info?: string;
    min_display_duration?: number;
    max_display_duration?: number;
}
export interface messages_sponsoredMessages {
    _: "messages.sponsoredMessages";
    posts_between?: number;
    start_delay?: number;
    between_delay?: number;
    messages: Array<SponsoredMessage>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface messages_sponsoredMessagesEmpty {
    _: "messages.sponsoredMessagesEmpty";
}
export interface searchResultsCalendarPeriod {
    _: "searchResultsCalendarPeriod";
    date: number;
    min_msg_id: number;
    max_msg_id: number;
    count: number;
}
export interface messages_searchResultsCalendar {
    _: "messages.searchResultsCalendar";
    inexact?: true;
    count: number;
    min_date: number;
    min_msg_id: number;
    offset_id_offset?: number;
    periods: Array<SearchResultsCalendarPeriod>;
    messages: Array<Message>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface searchResultPosition {
    _: "searchResultPosition";
    msg_id: number;
    date: number;
    offset: number;
}
export interface messages_searchResultsPositions {
    _: "messages.searchResultsPositions";
    count: number;
    positions: Array<SearchResultsPosition>;
}
export interface channels_sendAsPeers {
    _: "channels.sendAsPeers";
    peers: Array<SendAsPeer>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface users_userFull {
    _: "users.userFull";
    full_user: UserFull;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface messages_peerSettings {
    _: "messages.peerSettings";
    settings: PeerSettings;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface auth_loggedOut {
    _: "auth.loggedOut";
    future_auth_token?: Uint8Array<ArrayBuffer>;
}
export interface reactionCount {
    _: "reactionCount";
    chosen_order?: number;
    reaction: Reaction;
    count: number;
}
export interface messageReactions {
    _: "messageReactions";
    min?: true;
    can_see_list?: true;
    reactions_as_tags?: true;
    results: Array<ReactionCount>;
    recent_reactions?: Array<MessagePeerReaction>;
    top_reactors?: Array<MessageReactor>;
}
export interface messages_messageReactionsList {
    _: "messages.messageReactionsList";
    count: number;
    reactions: Array<MessagePeerReaction>;
    chats: Array<Chat>;
    users: Array<User>;
    next_offset?: string;
}
export interface availableReaction {
    _: "availableReaction";
    inactive?: true;
    premium?: true;
    reaction: string;
    title: string;
    static_icon: Document;
    appear_animation: Document;
    select_animation: Document;
    activate_animation: Document;
    effect_animation: Document;
    around_animation?: Document;
    center_icon?: Document;
}
export interface messages_availableReactionsNotModified {
    _: "messages.availableReactionsNotModified";
}
export interface messages_availableReactions {
    _: "messages.availableReactions";
    hash: number;
    reactions: Array<AvailableReaction>;
}
export interface messagePeerReaction {
    _: "messagePeerReaction";
    big?: true;
    unread?: true;
    my?: true;
    peer_id: Peer;
    date: number;
    reaction: Reaction;
}
export interface groupCallStreamChannel {
    _: "groupCallStreamChannel";
    channel: number;
    scale: number;
    last_timestamp_ms: bigint;
}
export interface phone_groupCallStreamChannels {
    _: "phone.groupCallStreamChannels";
    channels: Array<GroupCallStreamChannel>;
}
export interface phone_groupCallStreamRtmpUrl {
    _: "phone.groupCallStreamRtmpUrl";
    url: string;
    key: string;
}
export interface attachMenuBotIconColor {
    _: "attachMenuBotIconColor";
    name: string;
    color: number;
}
export interface attachMenuBotIcon {
    _: "attachMenuBotIcon";
    name: string;
    icon: Document;
    colors?: Array<AttachMenuBotIconColor>;
}
export interface attachMenuBot {
    _: "attachMenuBot";
    inactive?: true;
    has_settings?: true;
    request_write_access?: true;
    show_in_attach_menu?: true;
    show_in_side_menu?: true;
    side_menu_disclaimer_needed?: true;
    bot_id: bigint;
    short_name: string;
    peer_types?: Array<AttachMenuPeerType>;
    icons: Array<AttachMenuBotIcon>;
}
export interface attachMenuBotsNotModified {
    _: "attachMenuBotsNotModified";
}
export interface attachMenuBots {
    _: "attachMenuBots";
    hash: bigint;
    bots: Array<AttachMenuBot>;
    users: Array<User>;
}
export interface attachMenuBotsBot {
    _: "attachMenuBotsBot";
    bot: AttachMenuBot;
    users: Array<User>;
}
export interface webViewResultUrl {
    _: "webViewResultUrl";
    fullsize?: true;
    fullscreen?: true;
    query_id?: bigint;
    url: string;
}
export interface webViewMessageSent {
    _: "webViewMessageSent";
    msg_id?: InputBotInlineMessageID;
}
export interface botMenuButtonDefault {
    _: "botMenuButtonDefault";
}
export interface botMenuButtonCommands {
    _: "botMenuButtonCommands";
}
export interface botMenuButton {
    _: "botMenuButton";
    text: string;
    url: string;
}
export interface account_savedRingtonesNotModified {
    _: "account.savedRingtonesNotModified";
}
export interface account_savedRingtones {
    _: "account.savedRingtones";
    hash: bigint;
    ringtones: Array<Document>;
}
export interface notificationSoundDefault {
    _: "notificationSoundDefault";
}
export interface notificationSoundNone {
    _: "notificationSoundNone";
}
export interface notificationSoundLocal {
    _: "notificationSoundLocal";
    title: string;
    data: string;
}
export interface notificationSoundRingtone {
    _: "notificationSoundRingtone";
    id: bigint;
}
export interface account_savedRingtone {
    _: "account.savedRingtone";
}
export interface account_savedRingtoneConverted {
    _: "account.savedRingtoneConverted";
    document: Document;
}
export interface attachMenuPeerTypeSameBotPM {
    _: "attachMenuPeerTypeSameBotPM";
}
export interface attachMenuPeerTypeBotPM {
    _: "attachMenuPeerTypeBotPM";
}
export interface attachMenuPeerTypePM {
    _: "attachMenuPeerTypePM";
}
export interface attachMenuPeerTypeChat {
    _: "attachMenuPeerTypeChat";
}
export interface attachMenuPeerTypeBroadcast {
    _: "attachMenuPeerTypeBroadcast";
}
export interface inputInvoiceMessage {
    _: "inputInvoiceMessage";
    peer: InputPeer;
    msg_id: number;
}
export interface inputInvoiceSlug {
    _: "inputInvoiceSlug";
    slug: string;
}
export interface inputInvoicePremiumGiftCode {
    _: "inputInvoicePremiumGiftCode";
    purpose: InputStorePaymentPurpose;
    option: PremiumGiftCodeOption;
}
export interface inputInvoiceStars {
    _: "inputInvoiceStars";
    purpose: InputStorePaymentPurpose;
}
export interface inputInvoiceChatInviteSubscription {
    _: "inputInvoiceChatInviteSubscription";
    hash: string;
}
export interface inputInvoiceStarGift {
    _: "inputInvoiceStarGift";
    hide_name?: true;
    include_upgrade?: true;
    peer: InputPeer;
    gift_id: bigint;
    message?: TextWithEntities;
}
export interface inputInvoiceStarGiftUpgrade {
    _: "inputInvoiceStarGiftUpgrade";
    keep_original_details?: true;
    stargift: InputSavedStarGift;
}
export interface inputInvoiceStarGiftTransfer {
    _: "inputInvoiceStarGiftTransfer";
    stargift: InputSavedStarGift;
    to_id: InputPeer;
}
export interface inputInvoicePremiumGiftStars {
    _: "inputInvoicePremiumGiftStars";
    user_id: InputUser;
    months: number;
    message?: TextWithEntities;
}
export interface inputInvoiceBusinessBotTransferStars {
    _: "inputInvoiceBusinessBotTransferStars";
    bot: InputUser;
    stars: bigint;
}
export interface inputInvoiceStarGiftResale {
    _: "inputInvoiceStarGiftResale";
    ton?: true;
    slug: string;
    to_id: InputPeer;
}
export interface inputInvoiceStarGiftPrepaidUpgrade {
    _: "inputInvoiceStarGiftPrepaidUpgrade";
    peer: InputPeer;
    hash: string;
}
export interface inputInvoicePremiumAuthCode {
    _: "inputInvoicePremiumAuthCode";
    purpose: InputStorePaymentPurpose;
}
export interface inputInvoiceStarGiftDropOriginalDetails {
    _: "inputInvoiceStarGiftDropOriginalDetails";
    stargift: InputSavedStarGift;
}
export interface inputInvoiceStarGiftAuctionBid {
    _: "inputInvoiceStarGiftAuctionBid";
    hide_name?: true;
    update_bid?: true;
    peer?: InputPeer;
    gift_id: bigint;
    bid_amount: bigint;
    message?: TextWithEntities;
}
export interface payments_exportedInvoice {
    _: "payments.exportedInvoice";
    url: string;
}
export interface messages_transcribedAudio {
    _: "messages.transcribedAudio";
    pending?: true;
    transcription_id: bigint;
    text: string;
    trial_remains_num?: number;
    trial_remains_until_date?: number;
}
export interface help_premiumPromo {
    _: "help.premiumPromo";
    status_text: string;
    status_entities: Array<MessageEntity>;
    video_sections: Array<string>;
    videos: Array<Document>;
    period_options: Array<PremiumSubscriptionOption>;
    users: Array<User>;
}
export interface inputStorePaymentPremiumSubscription {
    _: "inputStorePaymentPremiumSubscription";
    restore?: true;
    upgrade?: true;
}
export interface inputStorePaymentGiftPremium {
    _: "inputStorePaymentGiftPremium";
    user_id: InputUser;
    currency: string;
    amount: bigint;
}
export interface inputStorePaymentPremiumGiftCode {
    _: "inputStorePaymentPremiumGiftCode";
    users: Array<InputUser>;
    boost_peer?: InputPeer;
    currency: string;
    amount: bigint;
    message?: TextWithEntities;
}
export interface inputStorePaymentPremiumGiveaway {
    _: "inputStorePaymentPremiumGiveaway";
    only_new_subscribers?: true;
    winners_are_visible?: true;
    boost_peer: InputPeer;
    additional_peers?: Array<InputPeer>;
    countries_iso2?: Array<string>;
    prize_description?: string;
    random_id: bigint;
    until_date: number;
    currency: string;
    amount: bigint;
}
export interface inputStorePaymentStarsTopup {
    _: "inputStorePaymentStarsTopup";
    stars: bigint;
    currency: string;
    amount: bigint;
    spend_purpose_peer?: InputPeer;
}
export interface inputStorePaymentStarsGift {
    _: "inputStorePaymentStarsGift";
    user_id: InputUser;
    stars: bigint;
    currency: string;
    amount: bigint;
}
export interface inputStorePaymentStarsGiveaway {
    _: "inputStorePaymentStarsGiveaway";
    only_new_subscribers?: true;
    winners_are_visible?: true;
    stars: bigint;
    boost_peer: InputPeer;
    additional_peers?: Array<InputPeer>;
    countries_iso2?: Array<string>;
    prize_description?: string;
    random_id: bigint;
    until_date: number;
    currency: string;
    amount: bigint;
    users: number;
}
export interface inputStorePaymentAuthCode {
    _: "inputStorePaymentAuthCode";
    restore?: true;
    phone_number: string;
    phone_code_hash: string;
    currency: string;
    amount: bigint;
}
export interface paymentFormMethod {
    _: "paymentFormMethod";
    url: string;
    title: string;
}
export interface emojiStatusEmpty {
    _: "emojiStatusEmpty";
}
export interface emojiStatus {
    _: "emojiStatus";
    document_id: bigint;
    until?: number;
}
export interface emojiStatusCollectible {
    _: "emojiStatusCollectible";
    collectible_id: bigint;
    document_id: bigint;
    title: string;
    slug: string;
    pattern_document_id: bigint;
    center_color: number;
    edge_color: number;
    pattern_color: number;
    text_color: number;
    until?: number;
}
export interface inputEmojiStatusCollectible {
    _: "inputEmojiStatusCollectible";
    collectible_id: bigint;
    until?: number;
}
export interface account_emojiStatusesNotModified {
    _: "account.emojiStatusesNotModified";
}
export interface account_emojiStatuses {
    _: "account.emojiStatuses";
    hash: bigint;
    statuses: Array<EmojiStatus>;
}
export interface reactionEmpty {
    _: "reactionEmpty";
}
export interface reactionEmoji {
    _: "reactionEmoji";
    emoticon: string;
}
export interface reactionCustomEmoji {
    _: "reactionCustomEmoji";
    document_id: bigint;
}
export interface reactionPaid {
    _: "reactionPaid";
}
export interface chatReactionsNone {
    _: "chatReactionsNone";
}
export interface chatReactionsAll {
    _: "chatReactionsAll";
    allow_custom?: true;
}
export interface chatReactionsSome {
    _: "chatReactionsSome";
    reactions: Array<Reaction>;
}
export interface messages_reactionsNotModified {
    _: "messages.reactionsNotModified";
}
export interface messages_reactions {
    _: "messages.reactions";
    hash: bigint;
    reactions: Array<Reaction>;
}
export interface emailVerifyPurposeLoginSetup {
    _: "emailVerifyPurposeLoginSetup";
    phone_number: string;
    phone_code_hash: string;
}
export interface emailVerifyPurposeLoginChange {
    _: "emailVerifyPurposeLoginChange";
}
export interface emailVerifyPurposePassport {
    _: "emailVerifyPurposePassport";
}
export interface emailVerificationCode {
    _: "emailVerificationCode";
    code: string;
}
export interface emailVerificationGoogle {
    _: "emailVerificationGoogle";
    token: string;
}
export interface emailVerificationApple {
    _: "emailVerificationApple";
    token: string;
}
export interface account_emailVerified {
    _: "account.emailVerified";
    email: string;
}
export interface account_emailVerifiedLogin {
    _: "account.emailVerifiedLogin";
    email: string;
    sent_code: auth_SentCode;
}
export interface premiumSubscriptionOption {
    _: "premiumSubscriptionOption";
    current?: true;
    can_purchase_upgrade?: true;
    transaction?: string;
    months: number;
    currency: string;
    amount: bigint;
    bot_url: string;
    store_product?: string;
}
export interface sendAsPeer {
    _: "sendAsPeer";
    premium_required?: true;
    peer: Peer;
}
export interface messageExtendedMediaPreview {
    _: "messageExtendedMediaPreview";
    w?: number;
    h?: number;
    thumb?: PhotoSize;
    video_duration?: number;
}
export interface messageExtendedMedia {
    _: "messageExtendedMedia";
    media: MessageMedia;
}
export interface stickerKeyword {
    _: "stickerKeyword";
    document_id: bigint;
    keyword: Array<string>;
}
export interface username {
    _: "username";
    editable?: true;
    active?: true;
    username: string;
}
export interface forumTopicDeleted {
    _: "forumTopicDeleted";
    id: number;
}
export interface forumTopic {
    _: "forumTopic";
    my?: true;
    closed?: true;
    pinned?: true;
    short?: true;
    hidden?: true;
    title_missing?: true;
    id: number;
    date: number;
    peer: Peer;
    title: string;
    icon_color: number;
    icon_emoji_id?: bigint;
    top_message: number;
    read_inbox_max_id: number;
    read_outbox_max_id: number;
    unread_count: number;
    unread_mentions_count: number;
    unread_reactions_count: number;
    from_id: Peer;
    notify_settings: PeerNotifySettings;
    draft?: DraftMessage;
}
export interface messages_forumTopics {
    _: "messages.forumTopics";
    order_by_create_date?: true;
    count: number;
    topics: Array<ForumTopic>;
    messages: Array<Message>;
    chats: Array<Chat>;
    users: Array<User>;
    pts: number;
}
export interface defaultHistoryTTL {
    _: "defaultHistoryTTL";
    period: number;
}
export interface exportedContactToken {
    _: "exportedContactToken";
    url: string;
    expires: number;
}
export interface requestPeerTypeUser {
    _: "requestPeerTypeUser";
    bot?: boolean;
    premium?: boolean;
}
export interface requestPeerTypeChat {
    _: "requestPeerTypeChat";
    creator?: true;
    bot_participant?: true;
    has_username?: boolean;
    forum?: boolean;
    user_admin_rights?: ChatAdminRights;
    bot_admin_rights?: ChatAdminRights;
}
export interface requestPeerTypeBroadcast {
    _: "requestPeerTypeBroadcast";
    creator?: true;
    has_username?: boolean;
    user_admin_rights?: ChatAdminRights;
    bot_admin_rights?: ChatAdminRights;
}
export interface emojiListNotModified {
    _: "emojiListNotModified";
}
export interface emojiList {
    _: "emojiList";
    hash: bigint;
    document_id: Array<bigint>;
}
export interface emojiGroup {
    _: "emojiGroup";
    title: string;
    icon_emoji_id: bigint;
    emoticons: Array<string>;
}
export interface emojiGroupGreeting {
    _: "emojiGroupGreeting";
    title: string;
    icon_emoji_id: bigint;
    emoticons: Array<string>;
}
export interface emojiGroupPremium {
    _: "emojiGroupPremium";
    title: string;
    icon_emoji_id: bigint;
}
export interface messages_emojiGroupsNotModified {
    _: "messages.emojiGroupsNotModified";
}
export interface messages_emojiGroups {
    _: "messages.emojiGroups";
    hash: number;
    groups: Array<EmojiGroup>;
}
export interface textWithEntities {
    _: "textWithEntities";
    text: string;
    entities: Array<MessageEntity>;
}
export interface messages_translateResult {
    _: "messages.translateResult";
    result: Array<TextWithEntities>;
}
export interface autoSaveSettings {
    _: "autoSaveSettings";
    photos?: true;
    videos?: true;
    video_max_size?: bigint;
}
export interface autoSaveException {
    _: "autoSaveException";
    peer: Peer;
    settings: AutoSaveSettings;
}
export interface account_autoSaveSettings {
    _: "account.autoSaveSettings";
    users_settings: AutoSaveSettings;
    chats_settings: AutoSaveSettings;
    broadcasts_settings: AutoSaveSettings;
    exceptions: Array<AutoSaveException>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface help_appConfigNotModified {
    _: "help.appConfigNotModified";
}
export interface help_appConfig {
    _: "help.appConfig";
    hash: number;
    config: JSONValue;
}
export interface inputBotAppID {
    _: "inputBotAppID";
    id: bigint;
    access_hash: bigint;
}
export interface inputBotAppShortName {
    _: "inputBotAppShortName";
    bot_id: InputUser;
    short_name: string;
}
export interface botAppNotModified {
    _: "botAppNotModified";
}
export interface botApp {
    _: "botApp";
    id: bigint;
    access_hash: bigint;
    short_name: string;
    title: string;
    description: string;
    photo: Photo;
    document?: Document;
    hash: bigint;
}
export interface messages_botApp {
    _: "messages.botApp";
    inactive?: true;
    request_write_access?: true;
    has_settings?: true;
    app: BotApp;
}
export interface inlineBotWebView {
    _: "inlineBotWebView";
    text: string;
    url: string;
}
export interface readParticipantDate {
    _: "readParticipantDate";
    user_id: bigint;
    date: number;
}
export interface inputChatlistDialogFilter {
    _: "inputChatlistDialogFilter";
    filter_id: number;
}
export interface exportedChatlistInvite {
    _: "exportedChatlistInvite";
    title: string;
    url: string;
    peers: Array<Peer>;
}
export interface chatlists_exportedChatlistInvite {
    _: "chatlists.exportedChatlistInvite";
    filter: DialogFilter;
    invite: ExportedChatlistInvite;
}
export interface chatlists_exportedInvites {
    _: "chatlists.exportedInvites";
    invites: Array<ExportedChatlistInvite>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface chatlists_chatlistInviteAlready {
    _: "chatlists.chatlistInviteAlready";
    filter_id: number;
    missing_peers: Array<Peer>;
    already_peers: Array<Peer>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface chatlists_chatlistInvite {
    _: "chatlists.chatlistInvite";
    title_noanimate?: true;
    title: TextWithEntities;
    emoticon?: string;
    peers: Array<Peer>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface chatlists_chatlistUpdates {
    _: "chatlists.chatlistUpdates";
    missing_peers: Array<Peer>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface bots_botInfo {
    _: "bots.botInfo";
    name: string;
    about: string;
    description: string;
}
export interface messagePeerVote {
    _: "messagePeerVote";
    peer: Peer;
    option: Uint8Array<ArrayBuffer>;
    date: number;
}
export interface messagePeerVoteInputOption {
    _: "messagePeerVoteInputOption";
    peer: Peer;
    date: number;
}
export interface messagePeerVoteMultiple {
    _: "messagePeerVoteMultiple";
    peer: Peer;
    options: Array<Uint8Array<ArrayBuffer>>;
    date: number;
}
export interface storyViews {
    _: "storyViews";
    has_viewers?: true;
    views_count: number;
    forwards_count?: number;
    reactions?: Array<ReactionCount>;
    reactions_count?: number;
    recent_viewers?: Array<bigint>;
}
export interface storyItemDeleted {
    _: "storyItemDeleted";
    id: number;
}
export interface storyItemSkipped {
    _: "storyItemSkipped";
    close_friends?: true;
    live?: true;
    id: number;
    date: number;
    expire_date: number;
}
export interface storyItem {
    _: "storyItem";
    pinned?: true;
    public?: true;
    close_friends?: true;
    min?: true;
    noforwards?: true;
    edited?: true;
    contacts?: true;
    selected_contacts?: true;
    out?: true;
    id: number;
    date: number;
    from_id?: Peer;
    fwd_from?: StoryFwdHeader;
    expire_date: number;
    caption?: string;
    entities?: Array<MessageEntity>;
    media: MessageMedia;
    media_areas?: Array<MediaArea>;
    privacy?: Array<PrivacyRule>;
    views?: StoryViews;
    sent_reaction?: Reaction;
    albums?: Array<number>;
}
export interface stories_allStoriesNotModified {
    _: "stories.allStoriesNotModified";
    state: string;
    stealth_mode: StoriesStealthMode;
}
export interface stories_allStories {
    _: "stories.allStories";
    has_more?: true;
    count: number;
    state: string;
    peer_stories: Array<PeerStories>;
    chats: Array<Chat>;
    users: Array<User>;
    stealth_mode: StoriesStealthMode;
}
export interface stories_stories {
    _: "stories.stories";
    count: number;
    stories: Array<StoryItem>;
    pinned_to_top?: Array<number>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface storyView {
    _: "storyView";
    blocked?: true;
    blocked_my_stories_from?: true;
    user_id: bigint;
    date: number;
    reaction?: Reaction;
}
export interface storyViewPublicForward {
    _: "storyViewPublicForward";
    blocked?: true;
    blocked_my_stories_from?: true;
    message: Message;
}
export interface storyViewPublicRepost {
    _: "storyViewPublicRepost";
    blocked?: true;
    blocked_my_stories_from?: true;
    peer_id: Peer;
    story: StoryItem;
}
export interface stories_storyViewsList {
    _: "stories.storyViewsList";
    count: number;
    views_count: number;
    forwards_count: number;
    reactions_count: number;
    views: Array<StoryView>;
    chats: Array<Chat>;
    users: Array<User>;
    next_offset?: string;
}
export interface stories_storyViews {
    _: "stories.storyViews";
    views: Array<StoryViews>;
    users: Array<User>;
}
export interface inputReplyToMessage {
    _: "inputReplyToMessage";
    reply_to_msg_id: number;
    top_msg_id?: number;
    reply_to_peer_id?: InputPeer;
    quote_text?: string;
    quote_entities?: Array<MessageEntity>;
    quote_offset?: number;
    monoforum_peer_id?: InputPeer;
    todo_item_id?: number;
}
export interface inputReplyToStory {
    _: "inputReplyToStory";
    peer: InputPeer;
    story_id: number;
}
export interface inputReplyToMonoForum {
    _: "inputReplyToMonoForum";
    monoforum_peer_id: InputPeer;
}
export interface exportedStoryLink {
    _: "exportedStoryLink";
    link: string;
}
export interface storiesStealthMode {
    _: "storiesStealthMode";
    active_until_date?: number;
    cooldown_until_date?: number;
}
export interface mediaAreaCoordinates {
    _: "mediaAreaCoordinates";
    x: number;
    y: number;
    w: number;
    h: number;
    rotation: number;
    radius?: number;
}
export interface mediaAreaVenue {
    _: "mediaAreaVenue";
    coordinates: MediaAreaCoordinates;
    geo: GeoPoint;
    title: string;
    address: string;
    provider: string;
    venue_id: string;
    venue_type: string;
}
export interface inputMediaAreaVenue {
    _: "inputMediaAreaVenue";
    coordinates: MediaAreaCoordinates;
    query_id: bigint;
    result_id: string;
}
export interface mediaAreaGeoPoint {
    _: "mediaAreaGeoPoint";
    coordinates: MediaAreaCoordinates;
    geo: GeoPoint;
    address?: GeoPointAddress;
}
export interface mediaAreaSuggestedReaction {
    _: "mediaAreaSuggestedReaction";
    dark?: true;
    flipped?: true;
    coordinates: MediaAreaCoordinates;
    reaction: Reaction;
}
export interface mediaAreaChannelPost {
    _: "mediaAreaChannelPost";
    coordinates: MediaAreaCoordinates;
    channel_id: bigint;
    msg_id: number;
}
export interface inputMediaAreaChannelPost {
    _: "inputMediaAreaChannelPost";
    coordinates: MediaAreaCoordinates;
    channel: InputChannel;
    msg_id: number;
}
export interface mediaAreaUrl {
    _: "mediaAreaUrl";
    coordinates: MediaAreaCoordinates;
    url: string;
}
export interface mediaAreaWeather {
    _: "mediaAreaWeather";
    coordinates: MediaAreaCoordinates;
    emoji: string;
    temperature_c: number;
    color: number;
}
export interface mediaAreaStarGift {
    _: "mediaAreaStarGift";
    coordinates: MediaAreaCoordinates;
    slug: string;
}
export interface peerStories {
    _: "peerStories";
    peer: Peer;
    max_read_id?: number;
    stories: Array<StoryItem>;
}
export interface stories_peerStories {
    _: "stories.peerStories";
    stories: PeerStories;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface messages_webPage {
    _: "messages.webPage";
    webpage: WebPage;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface premiumGiftCodeOption {
    _: "premiumGiftCodeOption";
    users: number;
    months: number;
    store_product?: string;
    store_quantity?: number;
    currency: string;
    amount: bigint;
}
export interface payments_checkedGiftCode {
    _: "payments.checkedGiftCode";
    via_giveaway?: true;
    from_id?: Peer;
    giveaway_msg_id?: number;
    to_id?: bigint;
    date: number;
    days: number;
    used_date?: number;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface payments_giveawayInfo {
    _: "payments.giveawayInfo";
    participating?: true;
    preparing_results?: true;
    start_date: number;
    joined_too_early_date?: number;
    admin_disallowed_chat_id?: bigint;
    disallowed_country?: string;
}
export interface payments_giveawayInfoResults {
    _: "payments.giveawayInfoResults";
    winner?: true;
    refunded?: true;
    start_date: number;
    gift_code_slug?: string;
    stars_prize?: bigint;
    finish_date: number;
    winners_count: number;
    activated_count?: number;
}
export interface prepaidGiveaway {
    _: "prepaidGiveaway";
    id: bigint;
    months: number;
    quantity: number;
    date: number;
}
export interface prepaidStarsGiveaway {
    _: "prepaidStarsGiveaway";
    id: bigint;
    stars: bigint;
    quantity: number;
    boosts: number;
    date: number;
}
export interface boost {
    _: "boost";
    gift?: true;
    giveaway?: true;
    unclaimed?: true;
    id: string;
    user_id?: bigint;
    giveaway_msg_id?: number;
    date: number;
    expires: number;
    used_gift_slug?: string;
    multiplier?: number;
    stars?: bigint;
}
export interface premium_boostsList {
    _: "premium.boostsList";
    count: number;
    boosts: Array<Boost>;
    next_offset?: string;
    users: Array<User>;
}
export interface myBoost {
    _: "myBoost";
    slot: number;
    peer?: Peer;
    date: number;
    expires: number;
    cooldown_until_date?: number;
}
export interface premium_myBoosts {
    _: "premium.myBoosts";
    my_boosts: Array<MyBoost>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface premium_boostsStatus {
    _: "premium.boostsStatus";
    my_boost?: true;
    level: number;
    current_level_boosts: number;
    boosts: number;
    gift_boosts?: number;
    next_level_boosts?: number;
    premium_audience?: StatsPercentValue;
    boost_url: string;
    prepaid_giveaways?: Array<PrepaidGiveaway>;
    my_boost_slots?: Array<number>;
}
export interface storyFwdHeader {
    _: "storyFwdHeader";
    modified?: true;
    from?: Peer;
    from_name?: string;
    story_id?: number;
}
export interface postInteractionCountersMessage {
    _: "postInteractionCountersMessage";
    msg_id: number;
    views: number;
    forwards: number;
    reactions: number;
}
export interface postInteractionCountersStory {
    _: "postInteractionCountersStory";
    story_id: number;
    views: number;
    forwards: number;
    reactions: number;
}
export interface stats_storyStats {
    _: "stats.storyStats";
    views_graph: StatsGraph;
    reactions_by_emotion_graph: StatsGraph;
}
export interface publicForwardMessage {
    _: "publicForwardMessage";
    message: Message;
}
export interface publicForwardStory {
    _: "publicForwardStory";
    peer: Peer;
    story: StoryItem;
}
export interface stats_publicForwards {
    _: "stats.publicForwards";
    count: number;
    forwards: Array<PublicForward>;
    next_offset?: string;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface peerColor {
    _: "peerColor";
    color?: number;
    background_emoji_id?: bigint;
}
export interface peerColorCollectible {
    _: "peerColorCollectible";
    collectible_id: bigint;
    gift_emoji_id: bigint;
    background_emoji_id: bigint;
    accent_color: number;
    colors: Array<number>;
    dark_accent_color?: number;
    dark_colors?: Array<number>;
}
export interface inputPeerColorCollectible {
    _: "inputPeerColorCollectible";
    collectible_id: bigint;
}
export interface help_peerColorSet {
    _: "help.peerColorSet";
    colors: Array<number>;
}
export interface help_peerColorProfileSet {
    _: "help.peerColorProfileSet";
    palette_colors: Array<number>;
    bg_colors: Array<number>;
    story_colors: Array<number>;
}
export interface help_peerColorOption {
    _: "help.peerColorOption";
    hidden?: true;
    color_id: number;
    colors?: help_PeerColorSet;
    dark_colors?: help_PeerColorSet;
    channel_min_level?: number;
    group_min_level?: number;
}
export interface help_peerColorsNotModified {
    _: "help.peerColorsNotModified";
}
export interface help_peerColors {
    _: "help.peerColors";
    hash: number;
    colors: Array<help_PeerColorOption>;
}
export interface storyReaction {
    _: "storyReaction";
    peer_id: Peer;
    date: number;
    reaction: Reaction;
}
export interface storyReactionPublicForward {
    _: "storyReactionPublicForward";
    message: Message;
}
export interface storyReactionPublicRepost {
    _: "storyReactionPublicRepost";
    peer_id: Peer;
    story: StoryItem;
}
export interface stories_storyReactionsList {
    _: "stories.storyReactionsList";
    count: number;
    reactions: Array<StoryReaction>;
    chats: Array<Chat>;
    users: Array<User>;
    next_offset?: string;
}
export interface savedDialog {
    _: "savedDialog";
    pinned?: true;
    peer: Peer;
    top_message: number;
}
export interface monoForumDialog {
    _: "monoForumDialog";
    unread_mark?: true;
    nopaid_messages_exception?: true;
    peer: Peer;
    top_message: number;
    read_inbox_max_id: number;
    read_outbox_max_id: number;
    unread_count: number;
    unread_reactions_count: number;
    draft?: DraftMessage;
}
export interface messages_savedDialogs {
    _: "messages.savedDialogs";
    dialogs: Array<SavedDialog>;
    messages: Array<Message>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface messages_savedDialogsSlice {
    _: "messages.savedDialogsSlice";
    count: number;
    dialogs: Array<SavedDialog>;
    messages: Array<Message>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface messages_savedDialogsNotModified {
    _: "messages.savedDialogsNotModified";
    count: number;
}
export interface savedReactionTag {
    _: "savedReactionTag";
    reaction: Reaction;
    title?: string;
    count: number;
}
export interface messages_savedReactionTagsNotModified {
    _: "messages.savedReactionTagsNotModified";
}
export interface messages_savedReactionTags {
    _: "messages.savedReactionTags";
    tags: Array<SavedReactionTag>;
    hash: bigint;
}
export interface outboxReadDate {
    _: "outboxReadDate";
    date: number;
}
export interface smsjobs_eligibleToJoin {
    _: "smsjobs.eligibleToJoin";
    terms_url: string;
    monthly_sent_sms: number;
}
export interface smsjobs_status {
    _: "smsjobs.status";
    allow_international?: true;
    recent_sent: number;
    recent_since: number;
    recent_remains: number;
    total_sent: number;
    total_since: number;
    last_gift_slug?: string;
    terms_url: string;
}
export interface smsJob {
    _: "smsJob";
    job_id: string;
    phone_number: string;
    text: string;
}
export interface businessWeeklyOpen {
    _: "businessWeeklyOpen";
    start_minute: number;
    end_minute: number;
}
export interface businessWorkHours {
    _: "businessWorkHours";
    open_now?: true;
    timezone_id: string;
    weekly_open: Array<BusinessWeeklyOpen>;
}
export interface businessLocation {
    _: "businessLocation";
    geo_point?: GeoPoint;
    address: string;
}
export interface inputBusinessRecipients {
    _: "inputBusinessRecipients";
    existing_chats?: true;
    new_chats?: true;
    contacts?: true;
    non_contacts?: true;
    exclude_selected?: true;
    users?: Array<InputUser>;
}
export interface businessRecipients {
    _: "businessRecipients";
    existing_chats?: true;
    new_chats?: true;
    contacts?: true;
    non_contacts?: true;
    exclude_selected?: true;
    users?: Array<bigint>;
}
export interface businessAwayMessageScheduleAlways {
    _: "businessAwayMessageScheduleAlways";
}
export interface businessAwayMessageScheduleOutsideWorkHours {
    _: "businessAwayMessageScheduleOutsideWorkHours";
}
export interface businessAwayMessageScheduleCustom {
    _: "businessAwayMessageScheduleCustom";
    start_date: number;
    end_date: number;
}
export interface inputBusinessGreetingMessage {
    _: "inputBusinessGreetingMessage";
    shortcut_id: number;
    recipients: InputBusinessRecipients;
    no_activity_days: number;
}
export interface businessGreetingMessage {
    _: "businessGreetingMessage";
    shortcut_id: number;
    recipients: BusinessRecipients;
    no_activity_days: number;
}
export interface inputBusinessAwayMessage {
    _: "inputBusinessAwayMessage";
    offline_only?: true;
    shortcut_id: number;
    schedule: BusinessAwayMessageSchedule;
    recipients: InputBusinessRecipients;
}
export interface businessAwayMessage {
    _: "businessAwayMessage";
    offline_only?: true;
    shortcut_id: number;
    schedule: BusinessAwayMessageSchedule;
    recipients: BusinessRecipients;
}
export interface timezone {
    _: "timezone";
    id: string;
    name: string;
    utc_offset: number;
}
export interface help_timezonesListNotModified {
    _: "help.timezonesListNotModified";
}
export interface help_timezonesList {
    _: "help.timezonesList";
    timezones: Array<Timezone>;
    hash: number;
}
export interface quickReply {
    _: "quickReply";
    shortcut_id: number;
    shortcut: string;
    top_message: number;
    count: number;
}
export interface inputQuickReplyShortcut {
    _: "inputQuickReplyShortcut";
    shortcut: string;
}
export interface inputQuickReplyShortcutId {
    _: "inputQuickReplyShortcutId";
    shortcut_id: number;
}
export interface messages_quickReplies {
    _: "messages.quickReplies";
    quick_replies: Array<QuickReply>;
    messages: Array<Message>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface messages_quickRepliesNotModified {
    _: "messages.quickRepliesNotModified";
}
export interface connectedBot {
    _: "connectedBot";
    bot_id: bigint;
    recipients: BusinessBotRecipients;
    rights: BusinessBotRights;
}
export interface account_connectedBots {
    _: "account.connectedBots";
    connected_bots: Array<ConnectedBot>;
    users: Array<User>;
}
export interface messages_dialogFilters {
    _: "messages.dialogFilters";
    tags_enabled?: true;
    filters: Array<DialogFilter>;
}
export interface birthday {
    _: "birthday";
    day: number;
    month: number;
    year?: number;
}
export interface botBusinessConnection {
    _: "botBusinessConnection";
    disabled?: true;
    connection_id: string;
    user_id: bigint;
    dc_id: number;
    date: number;
    rights?: BusinessBotRights;
}
export interface inputBusinessIntro {
    _: "inputBusinessIntro";
    title: string;
    description: string;
    sticker?: InputDocument;
}
export interface businessIntro {
    _: "businessIntro";
    title: string;
    description: string;
    sticker?: Document;
}
export interface messages_myStickers {
    _: "messages.myStickers";
    count: number;
    sets: Array<StickerSetCovered>;
}
export interface inputCollectibleUsername {
    _: "inputCollectibleUsername";
    username: string;
}
export interface inputCollectiblePhone {
    _: "inputCollectiblePhone";
    phone: string;
}
export interface fragment_collectibleInfo {
    _: "fragment.collectibleInfo";
    purchase_date: number;
    currency: string;
    amount: bigint;
    crypto_currency: string;
    crypto_amount: bigint;
    url: string;
}
export interface inputBusinessBotRecipients {
    _: "inputBusinessBotRecipients";
    existing_chats?: true;
    new_chats?: true;
    contacts?: true;
    non_contacts?: true;
    exclude_selected?: true;
    users?: Array<InputUser>;
    exclude_users?: Array<InputUser>;
}
export interface businessBotRecipients {
    _: "businessBotRecipients";
    existing_chats?: true;
    new_chats?: true;
    contacts?: true;
    non_contacts?: true;
    exclude_selected?: true;
    users?: Array<bigint>;
    exclude_users?: Array<bigint>;
}
export interface contactBirthday {
    _: "contactBirthday";
    contact_id: bigint;
    birthday: Birthday;
}
export interface contacts_contactBirthdays {
    _: "contacts.contactBirthdays";
    contacts: Array<ContactBirthday>;
    users: Array<User>;
}
export interface missingInvitee {
    _: "missingInvitee";
    premium_would_allow_invite?: true;
    premium_required_for_pm?: true;
    user_id: bigint;
}
export interface messages_invitedUsers {
    _: "messages.invitedUsers";
    updates: Updates;
    missing_invitees: Array<MissingInvitee>;
}
export interface inputBusinessChatLink {
    _: "inputBusinessChatLink";
    message: string;
    entities?: Array<MessageEntity>;
    title?: string;
}
export interface businessChatLink {
    _: "businessChatLink";
    link: string;
    message: string;
    entities?: Array<MessageEntity>;
    title?: string;
    views: number;
}
export interface account_businessChatLinks {
    _: "account.businessChatLinks";
    links: Array<BusinessChatLink>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface account_resolvedBusinessChatLinks {
    _: "account.resolvedBusinessChatLinks";
    peer: Peer;
    message: string;
    entities?: Array<MessageEntity>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface requestedPeerUser {
    _: "requestedPeerUser";
    user_id: bigint;
    first_name?: string;
    last_name?: string;
    username?: string;
    photo?: Photo;
}
export interface requestedPeerChat {
    _: "requestedPeerChat";
    chat_id: bigint;
    title?: string;
    photo?: Photo;
}
export interface requestedPeerChannel {
    _: "requestedPeerChannel";
    channel_id: bigint;
    title?: string;
    username?: string;
    photo?: Photo;
}
export interface sponsoredMessageReportOption {
    _: "sponsoredMessageReportOption";
    text: string;
    option: Uint8Array<ArrayBuffer>;
}
export interface channels_sponsoredMessageReportResultChooseOption {
    _: "channels.sponsoredMessageReportResultChooseOption";
    title: string;
    options: Array<SponsoredMessageReportOption>;
}
export interface channels_sponsoredMessageReportResultAdsHidden {
    _: "channels.sponsoredMessageReportResultAdsHidden";
}
export interface channels_sponsoredMessageReportResultReported {
    _: "channels.sponsoredMessageReportResultReported";
}
export interface reactionNotificationsFromContacts {
    _: "reactionNotificationsFromContacts";
}
export interface reactionNotificationsFromAll {
    _: "reactionNotificationsFromAll";
}
export interface reactionsNotifySettings {
    _: "reactionsNotifySettings";
    messages_notify_from?: ReactionNotificationsFrom;
    stories_notify_from?: ReactionNotificationsFrom;
    sound: NotificationSound;
    show_previews: boolean;
}
export interface availableEffect {
    _: "availableEffect";
    premium_required?: true;
    id: bigint;
    emoticon: string;
    static_icon_id?: bigint;
    effect_sticker_id: bigint;
    effect_animation_id?: bigint;
}
export interface messages_availableEffectsNotModified {
    _: "messages.availableEffectsNotModified";
}
export interface messages_availableEffects {
    _: "messages.availableEffects";
    hash: number;
    effects: Array<AvailableEffect>;
    documents: Array<Document>;
}
export interface factCheck {
    _: "factCheck";
    need_check?: true;
    country?: string;
    text?: TextWithEntities;
    hash: bigint;
}
export interface starsTransactionPeerUnsupported {
    _: "starsTransactionPeerUnsupported";
}
export interface starsTransactionPeerAppStore {
    _: "starsTransactionPeerAppStore";
}
export interface starsTransactionPeerPlayMarket {
    _: "starsTransactionPeerPlayMarket";
}
export interface starsTransactionPeerPremiumBot {
    _: "starsTransactionPeerPremiumBot";
}
export interface starsTransactionPeerFragment {
    _: "starsTransactionPeerFragment";
}
export interface starsTransactionPeer {
    _: "starsTransactionPeer";
    peer: Peer;
}
export interface starsTransactionPeerAds {
    _: "starsTransactionPeerAds";
}
export interface starsTransactionPeerAPI {
    _: "starsTransactionPeerAPI";
}
export interface starsTopupOption {
    _: "starsTopupOption";
    extended?: true;
    stars: bigint;
    store_product?: string;
    currency: string;
    amount: bigint;
}
export interface starsTransaction {
    _: "starsTransaction";
    refund?: true;
    pending?: true;
    failed?: true;
    gift?: true;
    reaction?: true;
    stargift_upgrade?: true;
    business_transfer?: true;
    stargift_resale?: true;
    posts_search?: true;
    stargift_prepaid_upgrade?: true;
    stargift_drop_original_details?: true;
    phonegroup_message?: true;
    stargift_auction_bid?: true;
    offer?: true;
    id: string;
    amount: StarsAmount;
    date: number;
    peer: StarsTransactionPeer;
    title?: string;
    description?: string;
    photo?: WebDocument;
    transaction_date?: number;
    transaction_url?: string;
    bot_payload?: Uint8Array<ArrayBuffer>;
    msg_id?: number;
    extended_media?: Array<MessageMedia>;
    subscription_period?: number;
    giveaway_post_id?: number;
    stargift?: StarGift;
    floodskip_number?: number;
    starref_commission_permille?: number;
    starref_peer?: Peer;
    starref_amount?: StarsAmount;
    paid_messages?: number;
    premium_gift_months?: number;
    ads_proceeds_from_date?: number;
    ads_proceeds_to_date?: number;
}
export interface payments_starsStatus {
    _: "payments.starsStatus";
    balance: StarsAmount;
    subscriptions?: Array<StarsSubscription>;
    subscriptions_next_offset?: string;
    subscriptions_missing_balance?: bigint;
    history?: Array<StarsTransaction>;
    next_offset?: string;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface foundStory {
    _: "foundStory";
    peer: Peer;
    story: StoryItem;
}
export interface stories_foundStories {
    _: "stories.foundStories";
    count: number;
    stories: Array<FoundStory>;
    next_offset?: string;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface geoPointAddress {
    _: "geoPointAddress";
    country_iso2: string;
    state?: string;
    city?: string;
    street?: string;
}
export interface starsRevenueStatus {
    _: "starsRevenueStatus";
    withdrawal_enabled?: true;
    current_balance: StarsAmount;
    available_balance: StarsAmount;
    overall_revenue: StarsAmount;
    next_withdrawal_at?: number;
}
export interface payments_starsRevenueStats {
    _: "payments.starsRevenueStats";
    top_hours_graph?: StatsGraph;
    revenue_graph: StatsGraph;
    status: StarsRevenueStatus;
    usd_rate: number;
}
export interface payments_starsRevenueWithdrawalUrl {
    _: "payments.starsRevenueWithdrawalUrl";
    url: string;
}
export interface payments_starsRevenueAdsAccountUrl {
    _: "payments.starsRevenueAdsAccountUrl";
    url: string;
}
export interface inputStarsTransaction {
    _: "inputStarsTransaction";
    refund?: true;
    id: string;
}
export interface starsGiftOption {
    _: "starsGiftOption";
    extended?: true;
    stars: bigint;
    store_product?: string;
    currency: string;
    amount: bigint;
}
export interface bots_popularAppBots {
    _: "bots.popularAppBots";
    next_offset?: string;
    users: Array<User>;
}
export interface botPreviewMedia {
    _: "botPreviewMedia";
    date: number;
    media: MessageMedia;
}
export interface bots_previewInfo {
    _: "bots.previewInfo";
    media: Array<BotPreviewMedia>;
    lang_codes: Array<string>;
}
export interface starsSubscriptionPricing {
    _: "starsSubscriptionPricing";
    period: number;
    amount: bigint;
}
export interface starsSubscription {
    _: "starsSubscription";
    canceled?: true;
    can_refulfill?: true;
    missing_balance?: true;
    bot_canceled?: true;
    id: string;
    peer: Peer;
    until_date: number;
    pricing: StarsSubscriptionPricing;
    chat_invite_hash?: string;
    title?: string;
    photo?: WebDocument;
    invoice_slug?: string;
}
export interface messageReactor {
    _: "messageReactor";
    top?: true;
    my?: true;
    anonymous?: true;
    peer_id?: Peer;
    count: number;
}
export interface starsGiveawayOption {
    _: "starsGiveawayOption";
    extended?: true;
    default?: true;
    stars: bigint;
    yearly_boosts: number;
    store_product?: string;
    currency: string;
    amount: bigint;
    winners: Array<StarsGiveawayWinnersOption>;
}
export interface starsGiveawayWinnersOption {
    _: "starsGiveawayWinnersOption";
    default?: true;
    users: number;
    per_user_stars: bigint;
}
export interface starGift {
    _: "starGift";
    limited?: true;
    sold_out?: true;
    birthday?: true;
    require_premium?: true;
    limited_per_user?: true;
    peer_color_available?: true;
    auction?: true;
    id: bigint;
    sticker: Document;
    stars: bigint;
    availability_remains?: number;
    availability_total?: number;
    availability_resale?: bigint;
    convert_stars: bigint;
    first_sale_date?: number;
    last_sale_date?: number;
    upgrade_stars?: bigint;
    resell_min_stars?: bigint;
    title?: string;
    released_by?: Peer;
    per_user_total?: number;
    per_user_remains?: number;
    locked_until_date?: number;
    auction_slug?: string;
    gifts_per_round?: number;
    auction_start_date?: number;
    upgrade_variants?: number;
    background?: StarGiftBackground;
}
export interface starGiftUnique {
    _: "starGiftUnique";
    require_premium?: true;
    resale_ton_only?: true;
    theme_available?: true;
    id: bigint;
    gift_id: bigint;
    title: string;
    slug: string;
    num: number;
    owner_id?: Peer;
    owner_name?: string;
    owner_address?: string;
    attributes: Array<StarGiftAttribute>;
    availability_issued: number;
    availability_total: number;
    gift_address?: string;
    resell_amount?: Array<StarsAmount>;
    released_by?: Peer;
    value_amount?: bigint;
    value_currency?: string;
    value_usd_amount?: bigint;
    theme_peer?: Peer;
    peer_color?: PeerColor;
    host_id?: Peer;
    offer_min_stars?: number;
}
export interface payments_starGiftsNotModified {
    _: "payments.starGiftsNotModified";
}
export interface payments_starGifts {
    _: "payments.starGifts";
    hash: number;
    gifts: Array<StarGift>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface messageReportOption {
    _: "messageReportOption";
    text: string;
    option: Uint8Array<ArrayBuffer>;
}
export interface reportResultChooseOption {
    _: "reportResultChooseOption";
    title: string;
    options: Array<MessageReportOption>;
}
export interface reportResultAddComment {
    _: "reportResultAddComment";
    optional?: true;
    option: Uint8Array<ArrayBuffer>;
}
export interface reportResultReported {
    _: "reportResultReported";
}
export interface messages_botPreparedInlineMessage {
    _: "messages.botPreparedInlineMessage";
    id: string;
    expire_date: number;
}
export interface messages_preparedInlineMessage {
    _: "messages.preparedInlineMessage";
    query_id: bigint;
    result: BotInlineResult;
    peer_types: Array<InlineQueryPeerType>;
    cache_time: number;
    users: Array<User>;
}
export interface botAppSettings {
    _: "botAppSettings";
    placeholder_path?: Uint8Array<ArrayBuffer>;
    background_color?: number;
    background_dark_color?: number;
    header_color?: number;
    header_dark_color?: number;
}
export interface starRefProgram {
    _: "starRefProgram";
    bot_id: bigint;
    commission_permille: number;
    duration_months?: number;
    end_date?: number;
    daily_revenue_per_user?: StarsAmount;
}
export interface connectedBotStarRef {
    _: "connectedBotStarRef";
    revoked?: true;
    url: string;
    date: number;
    bot_id: bigint;
    commission_permille: number;
    duration_months?: number;
    participants: bigint;
    revenue: bigint;
}
export interface payments_connectedStarRefBots {
    _: "payments.connectedStarRefBots";
    count: number;
    connected_bots: Array<ConnectedBotStarRef>;
    users: Array<User>;
}
export interface payments_suggestedStarRefBots {
    _: "payments.suggestedStarRefBots";
    count: number;
    suggested_bots: Array<StarRefProgram>;
    users: Array<User>;
    next_offset?: string;
}
export interface starsAmount {
    _: "starsAmount";
    amount: bigint;
    nanos: number;
}
export interface starsTonAmount {
    _: "starsTonAmount";
    amount: bigint;
}
export interface messages_foundStickersNotModified {
    _: "messages.foundStickersNotModified";
    next_offset?: number;
}
export interface messages_foundStickers {
    _: "messages.foundStickers";
    next_offset?: number;
    hash: bigint;
    stickers: Array<Document>;
}
export interface botVerifierSettings {
    _: "botVerifierSettings";
    can_modify_custom_description?: true;
    icon: bigint;
    company: string;
    custom_description?: string;
}
export interface botVerification {
    _: "botVerification";
    bot_id: bigint;
    icon: bigint;
    description: string;
}
export interface starGiftAttributeModel {
    _: "starGiftAttributeModel";
    name: string;
    document: Document;
    rarity_permille: number;
}
export interface starGiftAttributePattern {
    _: "starGiftAttributePattern";
    name: string;
    document: Document;
    rarity_permille: number;
}
export interface starGiftAttributeBackdrop {
    _: "starGiftAttributeBackdrop";
    name: string;
    backdrop_id: number;
    center_color: number;
    edge_color: number;
    pattern_color: number;
    text_color: number;
    rarity_permille: number;
}
export interface starGiftAttributeOriginalDetails {
    _: "starGiftAttributeOriginalDetails";
    sender_id?: Peer;
    recipient_id: Peer;
    date: number;
    message?: TextWithEntities;
}
export interface payments_starGiftUpgradePreview {
    _: "payments.starGiftUpgradePreview";
    sample_attributes: Array<StarGiftAttribute>;
    prices: Array<StarGiftUpgradePrice>;
    next_prices: Array<StarGiftUpgradePrice>;
}
export interface users_users {
    _: "users.users";
    users: Array<User>;
}
export interface users_usersSlice {
    _: "users.usersSlice";
    count: number;
    users: Array<User>;
}
export interface payments_uniqueStarGift {
    _: "payments.uniqueStarGift";
    gift: StarGift;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface messages_webPagePreview {
    _: "messages.webPagePreview";
    media: MessageMedia;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface savedStarGift {
    _: "savedStarGift";
    name_hidden?: true;
    unsaved?: true;
    refunded?: true;
    can_upgrade?: true;
    pinned_to_top?: true;
    upgrade_separate?: true;
    from_id?: Peer;
    date: number;
    gift: StarGift;
    message?: TextWithEntities;
    msg_id?: number;
    saved_id?: bigint;
    convert_stars?: bigint;
    upgrade_stars?: bigint;
    can_export_at?: number;
    transfer_stars?: bigint;
    can_transfer_at?: number;
    can_resell_at?: number;
    collection_id?: Array<number>;
    prepaid_upgrade_hash?: string;
    drop_original_details_stars?: bigint;
    gift_num?: number;
}
export interface payments_savedStarGifts {
    _: "payments.savedStarGifts";
    count: number;
    chat_notifications_enabled?: boolean;
    gifts: Array<SavedStarGift>;
    next_offset?: string;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface inputSavedStarGiftUser {
    _: "inputSavedStarGiftUser";
    msg_id: number;
}
export interface inputSavedStarGiftChat {
    _: "inputSavedStarGiftChat";
    peer: InputPeer;
    saved_id: bigint;
}
export interface inputSavedStarGiftSlug {
    _: "inputSavedStarGiftSlug";
    slug: string;
}
export interface payments_starGiftWithdrawalUrl {
    _: "payments.starGiftWithdrawalUrl";
    url: string;
}
export interface paidReactionPrivacyDefault {
    _: "paidReactionPrivacyDefault";
}
export interface paidReactionPrivacyAnonymous {
    _: "paidReactionPrivacyAnonymous";
}
export interface paidReactionPrivacyPeer {
    _: "paidReactionPrivacyPeer";
    peer: InputPeer;
}
export interface account_paidMessagesRevenue {
    _: "account.paidMessagesRevenue";
    stars_amount: bigint;
}
export interface requirementToContactEmpty {
    _: "requirementToContactEmpty";
}
export interface requirementToContactPremium {
    _: "requirementToContactPremium";
}
export interface requirementToContactPaidMessages {
    _: "requirementToContactPaidMessages";
    stars_amount: bigint;
}
export interface businessBotRights {
    _: "businessBotRights";
    reply?: true;
    read_messages?: true;
    delete_sent_messages?: true;
    delete_received_messages?: true;
    edit_name?: true;
    edit_bio?: true;
    edit_profile_photo?: true;
    edit_username?: true;
    view_gifts?: true;
    sell_gifts?: true;
    change_gift_settings?: true;
    transfer_and_upgrade_gifts?: true;
    transfer_stars?: true;
    manage_stories?: true;
}
export interface disallowedGiftsSettings {
    _: "disallowedGiftsSettings";
    disallow_unlimited_stargifts?: true;
    disallow_limited_stargifts?: true;
    disallow_unique_stargifts?: true;
    disallow_premium_gifts?: true;
    disallow_stargifts_from_channels?: true;
}
export interface sponsoredPeer {
    _: "sponsoredPeer";
    random_id: Uint8Array<ArrayBuffer>;
    peer: Peer;
    sponsor_info?: string;
    additional_info?: string;
}
export interface contacts_sponsoredPeersEmpty {
    _: "contacts.sponsoredPeersEmpty";
}
export interface contacts_sponsoredPeers {
    _: "contacts.sponsoredPeers";
    peers: Array<SponsoredPeer>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface starGiftAttributeIdModel {
    _: "starGiftAttributeIdModel";
    document_id: bigint;
}
export interface starGiftAttributeIdPattern {
    _: "starGiftAttributeIdPattern";
    document_id: bigint;
}
export interface starGiftAttributeIdBackdrop {
    _: "starGiftAttributeIdBackdrop";
    backdrop_id: number;
}
export interface starGiftAttributeCounter {
    _: "starGiftAttributeCounter";
    attribute: StarGiftAttributeId;
    count: number;
}
export interface payments_resaleStarGifts {
    _: "payments.resaleStarGifts";
    count: number;
    gifts: Array<StarGift>;
    next_offset?: string;
    attributes?: Array<StarGiftAttribute>;
    attributes_hash?: bigint;
    chats: Array<Chat>;
    counters?: Array<StarGiftAttributeCounter>;
    users: Array<User>;
}
export interface stories_canSendStoryCount {
    _: "stories.canSendStoryCount";
    count_remains: number;
}
export interface pendingSuggestion {
    _: "pendingSuggestion";
    suggestion: string;
    title: TextWithEntities;
    description: TextWithEntities;
    url: string;
}
export interface todoItem {
    _: "todoItem";
    id: number;
    title: TextWithEntities;
}
export interface todoList {
    _: "todoList";
    others_can_append?: true;
    others_can_complete?: true;
    title: TextWithEntities;
    list: Array<TodoItem>;
}
export interface todoCompletion {
    _: "todoCompletion";
    id: number;
    completed_by: Peer;
    date: number;
}
export interface suggestedPost {
    _: "suggestedPost";
    accepted?: true;
    rejected?: true;
    price?: StarsAmount;
    schedule_date?: number;
}
export interface starsRating {
    _: "starsRating";
    level: number;
    current_level_stars: bigint;
    stars: bigint;
    next_level_stars?: bigint;
}
export interface starGiftCollection {
    _: "starGiftCollection";
    collection_id: number;
    title: string;
    icon?: Document;
    gifts_count: number;
    hash: bigint;
}
export interface payments_starGiftCollectionsNotModified {
    _: "payments.starGiftCollectionsNotModified";
}
export interface payments_starGiftCollections {
    _: "payments.starGiftCollections";
    collections: Array<StarGiftCollection>;
}
export interface storyAlbum {
    _: "storyAlbum";
    album_id: number;
    title: string;
    icon_photo?: Photo;
    icon_video?: Document;
}
export interface stories_albumsNotModified {
    _: "stories.albumsNotModified";
}
export interface stories_albums {
    _: "stories.albums";
    hash: bigint;
    albums: Array<StoryAlbum>;
}
export interface searchPostsFlood {
    _: "searchPostsFlood";
    query_is_free?: true;
    total_daily: number;
    remains: number;
    wait_till?: number;
    stars_amount: bigint;
}
export interface payments_uniqueStarGiftValueInfo {
    _: "payments.uniqueStarGiftValueInfo";
    last_sale_on_fragment?: true;
    value_is_average?: true;
    currency: string;
    value: bigint;
    initial_sale_date: number;
    initial_sale_stars: bigint;
    initial_sale_price: bigint;
    last_sale_date?: number;
    last_sale_price?: bigint;
    floor_price?: bigint;
    average_price?: bigint;
    listed_count?: number;
    fragment_listed_count?: number;
    fragment_listed_url?: string;
}
export interface profileTabPosts {
    _: "profileTabPosts";
}
export interface profileTabGifts {
    _: "profileTabGifts";
}
export interface profileTabMedia {
    _: "profileTabMedia";
}
export interface profileTabFiles {
    _: "profileTabFiles";
}
export interface profileTabMusic {
    _: "profileTabMusic";
}
export interface profileTabVoice {
    _: "profileTabVoice";
}
export interface profileTabLinks {
    _: "profileTabLinks";
}
export interface profileTabGifs {
    _: "profileTabGifs";
}
export interface users_savedMusicNotModified {
    _: "users.savedMusicNotModified";
    count: number;
}
export interface users_savedMusic {
    _: "users.savedMusic";
    count: number;
    documents: Array<Document>;
}
export interface account_savedMusicIdsNotModified {
    _: "account.savedMusicIdsNotModified";
}
export interface account_savedMusicIds {
    _: "account.savedMusicIds";
    ids: Array<bigint>;
}
export interface payments_checkCanSendGiftResultOk {
    _: "payments.checkCanSendGiftResultOk";
}
export interface payments_checkCanSendGiftResultFail {
    _: "payments.checkCanSendGiftResultFail";
    reason: TextWithEntities;
}
export interface inputChatThemeEmpty {
    _: "inputChatThemeEmpty";
}
export interface inputChatTheme {
    _: "inputChatTheme";
    emoticon: string;
}
export interface inputChatThemeUniqueGift {
    _: "inputChatThemeUniqueGift";
    slug: string;
}
export interface starGiftUpgradePrice {
    _: "starGiftUpgradePrice";
    date: number;
    upgrade_stars: bigint;
}
export interface groupCallMessage {
    _: "groupCallMessage";
    from_admin?: true;
    id: number;
    from_id: Peer;
    date: number;
    message: TextWithEntities;
    paid_message_stars?: bigint;
}
export interface groupCallDonor {
    _: "groupCallDonor";
    top?: true;
    my?: true;
    peer_id?: Peer;
    stars: bigint;
}
export interface phone_groupCallStars {
    _: "phone.groupCallStars";
    total_stars: bigint;
    top_donors: Array<GroupCallDonor>;
    chats: Array<Chat>;
    users: Array<User>;
}
export interface recentStory {
    _: "recentStory";
    live?: true;
    max_id?: number;
}
export interface auctionBidLevel {
    _: "auctionBidLevel";
    pos: number;
    amount: bigint;
    date: number;
}
export interface starGiftAuctionStateNotModified {
    _: "starGiftAuctionStateNotModified";
}
export interface starGiftAuctionState {
    _: "starGiftAuctionState";
    version: number;
    start_date: number;
    end_date: number;
    min_bid_amount: bigint;
    bid_levels: Array<AuctionBidLevel>;
    top_bidders: Array<bigint>;
    next_round_at: number;
    last_gift_num: number;
    gifts_left: number;
    current_round: number;
    total_rounds: number;
    rounds: Array<StarGiftAuctionRound>;
}
export interface starGiftAuctionStateFinished {
    _: "starGiftAuctionStateFinished";
    start_date: number;
    end_date: number;
    average_price: bigint;
    listed_count?: number;
    fragment_listed_count?: number;
    fragment_listed_url?: string;
}
export interface starGiftAuctionUserState {
    _: "starGiftAuctionUserState";
    returned?: true;
    bid_amount?: bigint;
    bid_date?: number;
    min_bid_amount?: bigint;
    bid_peer?: Peer;
    acquired_count: number;
}
export interface payments_starGiftAuctionState {
    _: "payments.starGiftAuctionState";
    gift: StarGift;
    state: StarGiftAuctionState;
    user_state: StarGiftAuctionUserState;
    timeout: number;
    users: Array<User>;
    chats: Array<Chat>;
}
export interface starGiftAuctionAcquiredGift {
    _: "starGiftAuctionAcquiredGift";
    name_hidden?: true;
    peer: Peer;
    date: number;
    bid_amount: bigint;
    round: number;
    pos: number;
    message?: TextWithEntities;
    gift_num?: number;
}
export interface payments_starGiftAuctionAcquiredGifts {
    _: "payments.starGiftAuctionAcquiredGifts";
    gifts: Array<StarGiftAuctionAcquiredGift>;
    users: Array<User>;
    chats: Array<Chat>;
}
export interface starGiftActiveAuctionState {
    _: "starGiftActiveAuctionState";
    gift: StarGift;
    state: StarGiftAuctionState;
    user_state: StarGiftAuctionUserState;
}
export interface payments_starGiftActiveAuctionsNotModified {
    _: "payments.starGiftActiveAuctionsNotModified";
}
export interface payments_starGiftActiveAuctions {
    _: "payments.starGiftActiveAuctions";
    auctions: Array<StarGiftActiveAuctionState>;
    users: Array<User>;
    chats: Array<Chat>;
}
export interface inputStarGiftAuction {
    _: "inputStarGiftAuction";
    gift_id: bigint;
}
export interface inputStarGiftAuctionSlug {
    _: "inputStarGiftAuctionSlug";
    slug: string;
}
export interface passkey {
    _: "passkey";
    id: string;
    name: string;
    date: number;
    software_emoji_id?: bigint;
    last_usage_date?: number;
}
export interface account_passkeys {
    _: "account.passkeys";
    passkeys: Array<Passkey>;
}
export interface account_passkeyRegistrationOptions {
    _: "account.passkeyRegistrationOptions";
    options: DataJSON;
}
export interface auth_passkeyLoginOptions {
    _: "auth.passkeyLoginOptions";
    options: DataJSON;
}
export interface inputPasskeyResponseRegister {
    _: "inputPasskeyResponseRegister";
    client_data: DataJSON;
    attestation_data: Uint8Array<ArrayBuffer>;
}
export interface inputPasskeyResponseLogin {
    _: "inputPasskeyResponseLogin";
    client_data: DataJSON;
    authenticator_data: Uint8Array<ArrayBuffer>;
    signature: Uint8Array<ArrayBuffer>;
    user_handle: string;
}
export interface inputPasskeyCredentialPublicKey {
    _: "inputPasskeyCredentialPublicKey";
    id: string;
    raw_id: string;
    response: InputPasskeyResponse;
}
export interface inputPasskeyCredentialFirebasePNV {
    _: "inputPasskeyCredentialFirebasePNV";
    pnv_token: string;
}
export interface starGiftBackground {
    _: "starGiftBackground";
    center_color: number;
    edge_color: number;
    text_color: number;
}
export interface starGiftAuctionRound {
    _: "starGiftAuctionRound";
    num: number;
    duration: number;
}
export interface starGiftAuctionRoundExtendable {
    _: "starGiftAuctionRoundExtendable";
    num: number;
    duration: number;
    extend_top: number;
    extend_window: number;
}
export interface payments_starGiftUpgradeAttributes {
    _: "payments.starGiftUpgradeAttributes";
    attributes: Array<StarGiftAttribute>;
}
export interface messages_emojiGameOutcome {
    _: "messages.emojiGameOutcome";
    seed: Uint8Array<ArrayBuffer>;
    stake_ton_amount: bigint;
    ton_amount: bigint;
}
export interface messages_emojiGameUnavailable {
    _: "messages.emojiGameUnavailable";
}
export interface messages_emojiGameDiceInfo {
    _: "messages.emojiGameDiceInfo";
    game_hash: string;
    prev_stake: bigint;
    current_streak: number;
    params: Array<number>;
    plays_left?: number;
}
export interface invokeWithBusinessConnectionPrefix {
    _: "invokeWithBusinessConnectionPrefix";
    connection_id: string;
    [R]?: Error;
}
export interface invokeWithGooglePlayIntegrityPrefix {
    _: "invokeWithGooglePlayIntegrityPrefix";
    nonce: string;
    token: string;
    [R]?: Error;
}
export interface invokeWithApnsSecretPrefix {
    _: "invokeWithApnsSecretPrefix";
    nonce: string;
    secret: string;
    [R]?: Error;
}
export interface invokeWithReCaptchaPrefix {
    _: "invokeWithReCaptchaPrefix";
    token: string;
    [R]?: Error;
}
export interface invokeAfterMsg<T> {
    _: "invokeAfterMsg";
    msg_id: bigint;
    query: T;
    [R]?: ReturnType<T>;
}
export interface invokeAfterMsgs<T> {
    _: "invokeAfterMsgs";
    msg_ids: Array<bigint>;
    query: T;
    [R]?: ReturnType<T>;
}
export interface initConnection<T> {
    _: "initConnection";
    api_id: number;
    device_model: string;
    system_version: string;
    app_version: string;
    system_lang_code: string;
    lang_pack: string;
    lang_code: string;
    proxy?: InputClientProxy;
    params?: JSONValue;
    query: T;
    [R]?: ReturnType<T>;
}
export interface invokeWithLayer<T> {
    _: "invokeWithLayer";
    layer: number;
    query: T;
    [R]?: ReturnType<T>;
}
export interface invokeWithoutUpdates<T> {
    _: "invokeWithoutUpdates";
    query: T;
    [R]?: ReturnType<T>;
}
export interface invokeWithMessagesRange<T> {
    _: "invokeWithMessagesRange";
    range: MessageRange;
    query: T;
    [R]?: ReturnType<T>;
}
export interface invokeWithTakeout<T> {
    _: "invokeWithTakeout";
    takeout_id: bigint;
    query: T;
    [R]?: ReturnType<T>;
}
export interface invokeWithBusinessConnection<T> {
    _: "invokeWithBusinessConnection";
    connection_id: string;
    query: T;
    [R]?: ReturnType<T>;
}
export interface invokeWithGooglePlayIntegrity<T> {
    _: "invokeWithGooglePlayIntegrity";
    nonce: string;
    token: string;
    query: T;
    [R]?: ReturnType<T>;
}
export interface invokeWithApnsSecret<T> {
    _: "invokeWithApnsSecret";
    nonce: string;
    secret: string;
    query: T;
    [R]?: ReturnType<T>;
}
export interface invokeWithReCaptcha<T> {
    _: "invokeWithReCaptcha";
    token: string;
    query: T;
    [R]?: ReturnType<T>;
}
export interface auth_sendCode {
    _: "auth.sendCode";
    phone_number: string;
    api_id: number;
    api_hash: string;
    settings: CodeSettings;
    [R]?: auth_SentCode;
}
export interface auth_signUp {
    _: "auth.signUp";
    no_joined_notifications?: true;
    phone_number: string;
    phone_code_hash: string;
    first_name: string;
    last_name: string;
    [R]?: auth_Authorization;
}
export interface auth_signIn {
    _: "auth.signIn";
    phone_number: string;
    phone_code_hash: string;
    phone_code?: string;
    email_verification?: EmailVerification;
    [R]?: auth_Authorization;
}
export interface auth_logOut {
    _: "auth.logOut";
    [R]?: auth_LoggedOut;
}
export interface auth_resetAuthorizations {
    _: "auth.resetAuthorizations";
    [R]?: boolean;
}
export interface auth_exportAuthorization {
    _: "auth.exportAuthorization";
    dc_id: number;
    [R]?: auth_ExportedAuthorization;
}
export interface auth_importAuthorization {
    _: "auth.importAuthorization";
    id: bigint;
    bytes: Uint8Array<ArrayBuffer>;
    [R]?: auth_Authorization;
}
export interface auth_bindTempAuthKey {
    _: "auth.bindTempAuthKey";
    perm_auth_key_id: bigint;
    nonce: bigint;
    expires_at: number;
    encrypted_message: Uint8Array<ArrayBuffer>;
    [R]?: boolean;
}
export interface auth_importBotAuthorization {
    _: "auth.importBotAuthorization";
    flags: number;
    api_id: number;
    api_hash: string;
    bot_auth_token: string;
    [R]?: auth_Authorization;
}
export interface auth_checkPassword {
    _: "auth.checkPassword";
    password: InputCheckPasswordSRP;
    [R]?: auth_Authorization;
}
export interface auth_requestPasswordRecovery {
    _: "auth.requestPasswordRecovery";
    [R]?: auth_PasswordRecovery;
}
export interface auth_recoverPassword {
    _: "auth.recoverPassword";
    code: string;
    new_settings?: account_PasswordInputSettings;
    [R]?: auth_Authorization;
}
export interface auth_resendCode {
    _: "auth.resendCode";
    phone_number: string;
    phone_code_hash: string;
    reason?: string;
    [R]?: auth_SentCode;
}
export interface auth_cancelCode {
    _: "auth.cancelCode";
    phone_number: string;
    phone_code_hash: string;
    [R]?: boolean;
}
export interface auth_dropTempAuthKeys {
    _: "auth.dropTempAuthKeys";
    except_auth_keys: Array<bigint>;
    [R]?: boolean;
}
export interface auth_exportLoginToken {
    _: "auth.exportLoginToken";
    api_id: number;
    api_hash: string;
    except_ids: Array<bigint>;
    [R]?: auth_LoginToken;
}
export interface auth_importLoginToken {
    _: "auth.importLoginToken";
    token: Uint8Array<ArrayBuffer>;
    [R]?: auth_LoginToken;
}
export interface auth_acceptLoginToken {
    _: "auth.acceptLoginToken";
    token: Uint8Array<ArrayBuffer>;
    [R]?: Authorization;
}
export interface auth_checkRecoveryPassword {
    _: "auth.checkRecoveryPassword";
    code: string;
    [R]?: boolean;
}
export interface auth_importWebTokenAuthorization {
    _: "auth.importWebTokenAuthorization";
    api_id: number;
    api_hash: string;
    web_auth_token: string;
    [R]?: auth_Authorization;
}
export interface auth_requestFirebaseSms {
    _: "auth.requestFirebaseSms";
    phone_number: string;
    phone_code_hash: string;
    safety_net_token?: string;
    play_integrity_token?: string;
    ios_push_secret?: string;
    [R]?: boolean;
}
export interface auth_resetLoginEmail {
    _: "auth.resetLoginEmail";
    phone_number: string;
    phone_code_hash: string;
    [R]?: auth_SentCode;
}
export interface auth_reportMissingCode {
    _: "auth.reportMissingCode";
    phone_number: string;
    phone_code_hash: string;
    mnc: string;
    [R]?: boolean;
}
export interface auth_checkPaidAuth {
    _: "auth.checkPaidAuth";
    phone_number: string;
    phone_code_hash: string;
    form_id: bigint;
    [R]?: auth_SentCode;
}
export interface auth_initPasskeyLogin {
    _: "auth.initPasskeyLogin";
    api_id: number;
    api_hash: string;
    [R]?: auth_PasskeyLoginOptions;
}
export interface auth_finishPasskeyLogin {
    _: "auth.finishPasskeyLogin";
    credential: InputPasskeyCredential;
    from_dc_id?: number;
    from_auth_key_id?: bigint;
    [R]?: auth_Authorization;
}
export interface account_registerDevice {
    _: "account.registerDevice";
    no_muted?: true;
    token_type: number;
    token: string;
    app_sandbox: boolean;
    secret: Uint8Array<ArrayBuffer>;
    other_uids: Array<bigint>;
    [R]?: boolean;
}
export interface account_unregisterDevice {
    _: "account.unregisterDevice";
    token_type: number;
    token: string;
    other_uids: Array<bigint>;
    [R]?: boolean;
}
export interface account_updateNotifySettings {
    _: "account.updateNotifySettings";
    peer: InputNotifyPeer;
    settings: InputPeerNotifySettings;
    [R]?: boolean;
}
export interface account_getNotifySettings {
    _: "account.getNotifySettings";
    peer: InputNotifyPeer;
    [R]?: PeerNotifySettings;
}
export interface account_resetNotifySettings {
    _: "account.resetNotifySettings";
    [R]?: boolean;
}
export interface account_updateProfile {
    _: "account.updateProfile";
    first_name?: string;
    last_name?: string;
    about?: string;
    [R]?: User;
}
export interface account_updateStatus {
    _: "account.updateStatus";
    offline: boolean;
    [R]?: boolean;
}
export interface account_getWallPapers {
    _: "account.getWallPapers";
    hash: bigint;
    [R]?: account_WallPapers;
}
export interface account_reportPeer {
    _: "account.reportPeer";
    peer: InputPeer;
    reason: ReportReason;
    message: string;
    [R]?: boolean;
}
export interface account_checkUsername {
    _: "account.checkUsername";
    username: string;
    [R]?: boolean;
}
export interface account_updateUsername {
    _: "account.updateUsername";
    username: string;
    [R]?: User;
}
export interface account_getPrivacy {
    _: "account.getPrivacy";
    key: InputPrivacyKey;
    [R]?: account_PrivacyRules;
}
export interface account_setPrivacy {
    _: "account.setPrivacy";
    key: InputPrivacyKey;
    rules: Array<InputPrivacyRule>;
    [R]?: account_PrivacyRules;
}
export interface account_deleteAccount {
    _: "account.deleteAccount";
    reason: string;
    password?: InputCheckPasswordSRP;
    [R]?: boolean;
}
export interface account_getAccountTTL {
    _: "account.getAccountTTL";
    [R]?: AccountDaysTTL;
}
export interface account_setAccountTTL {
    _: "account.setAccountTTL";
    ttl: AccountDaysTTL;
    [R]?: boolean;
}
export interface account_sendChangePhoneCode {
    _: "account.sendChangePhoneCode";
    phone_number: string;
    settings: CodeSettings;
    [R]?: auth_SentCode;
}
export interface account_changePhone {
    _: "account.changePhone";
    phone_number: string;
    phone_code_hash: string;
    phone_code: string;
    [R]?: User;
}
export interface account_updateDeviceLocked {
    _: "account.updateDeviceLocked";
    period: number;
    [R]?: boolean;
}
export interface account_getAuthorizations {
    _: "account.getAuthorizations";
    [R]?: account_Authorizations;
}
export interface account_resetAuthorization {
    _: "account.resetAuthorization";
    hash: bigint;
    [R]?: boolean;
}
export interface account_getPassword {
    _: "account.getPassword";
    [R]?: account_Password;
}
export interface account_getPasswordSettings {
    _: "account.getPasswordSettings";
    password: InputCheckPasswordSRP;
    [R]?: account_PasswordSettings;
}
export interface account_updatePasswordSettings {
    _: "account.updatePasswordSettings";
    password: InputCheckPasswordSRP;
    new_settings: account_PasswordInputSettings;
    [R]?: boolean;
}
export interface account_sendConfirmPhoneCode {
    _: "account.sendConfirmPhoneCode";
    hash: string;
    settings: CodeSettings;
    [R]?: auth_SentCode;
}
export interface account_confirmPhone {
    _: "account.confirmPhone";
    phone_code_hash: string;
    phone_code: string;
    [R]?: boolean;
}
export interface account_getTmpPassword {
    _: "account.getTmpPassword";
    password: InputCheckPasswordSRP;
    period: number;
    [R]?: account_TmpPassword;
}
export interface account_getWebAuthorizations {
    _: "account.getWebAuthorizations";
    [R]?: account_WebAuthorizations;
}
export interface account_resetWebAuthorization {
    _: "account.resetWebAuthorization";
    hash: bigint;
    [R]?: boolean;
}
export interface account_resetWebAuthorizations {
    _: "account.resetWebAuthorizations";
    [R]?: boolean;
}
export interface account_getAllSecureValues {
    _: "account.getAllSecureValues";
    [R]?: Array<SecureValue>;
}
export interface account_getSecureValue {
    _: "account.getSecureValue";
    types: Array<SecureValueType>;
    [R]?: Array<SecureValue>;
}
export interface account_saveSecureValue {
    _: "account.saveSecureValue";
    value: InputSecureValue;
    secure_secret_id: bigint;
    [R]?: SecureValue;
}
export interface account_deleteSecureValue {
    _: "account.deleteSecureValue";
    types: Array<SecureValueType>;
    [R]?: boolean;
}
export interface account_getAuthorizationForm {
    _: "account.getAuthorizationForm";
    bot_id: bigint;
    scope: string;
    public_key: string;
    [R]?: account_AuthorizationForm;
}
export interface account_acceptAuthorization {
    _: "account.acceptAuthorization";
    bot_id: bigint;
    scope: string;
    public_key: string;
    value_hashes: Array<SecureValueHash>;
    credentials: SecureCredentialsEncrypted;
    [R]?: boolean;
}
export interface account_sendVerifyPhoneCode {
    _: "account.sendVerifyPhoneCode";
    phone_number: string;
    settings: CodeSettings;
    [R]?: auth_SentCode;
}
export interface account_verifyPhone {
    _: "account.verifyPhone";
    phone_number: string;
    phone_code_hash: string;
    phone_code: string;
    [R]?: boolean;
}
export interface account_sendVerifyEmailCode {
    _: "account.sendVerifyEmailCode";
    purpose: EmailVerifyPurpose;
    email: string;
    [R]?: account_SentEmailCode;
}
export interface account_verifyEmail {
    _: "account.verifyEmail";
    purpose: EmailVerifyPurpose;
    verification: EmailVerification;
    [R]?: account_EmailVerified;
}
export interface account_initTakeoutSession {
    _: "account.initTakeoutSession";
    contacts?: true;
    message_users?: true;
    message_chats?: true;
    message_megagroups?: true;
    message_channels?: true;
    files?: true;
    file_max_size?: bigint;
    [R]?: account_Takeout;
}
export interface account_finishTakeoutSession {
    _: "account.finishTakeoutSession";
    success?: true;
    [R]?: boolean;
}
export interface account_confirmPasswordEmail {
    _: "account.confirmPasswordEmail";
    code: string;
    [R]?: boolean;
}
export interface account_resendPasswordEmail {
    _: "account.resendPasswordEmail";
    [R]?: boolean;
}
export interface account_cancelPasswordEmail {
    _: "account.cancelPasswordEmail";
    [R]?: boolean;
}
export interface account_getContactSignUpNotification {
    _: "account.getContactSignUpNotification";
    [R]?: boolean;
}
export interface account_setContactSignUpNotification {
    _: "account.setContactSignUpNotification";
    silent: boolean;
    [R]?: boolean;
}
export interface account_getNotifyExceptions {
    _: "account.getNotifyExceptions";
    compare_sound?: true;
    compare_stories?: true;
    peer?: InputNotifyPeer;
    [R]?: Updates;
}
export interface account_getWallPaper {
    _: "account.getWallPaper";
    wallpaper: InputWallPaper;
    [R]?: WallPaper;
}
export interface account_uploadWallPaper {
    _: "account.uploadWallPaper";
    for_chat?: true;
    file: InputFile;
    mime_type: string;
    settings: WallPaperSettings;
    [R]?: WallPaper;
}
export interface account_saveWallPaper {
    _: "account.saveWallPaper";
    wallpaper: InputWallPaper;
    unsave: boolean;
    settings: WallPaperSettings;
    [R]?: boolean;
}
export interface account_installWallPaper {
    _: "account.installWallPaper";
    wallpaper: InputWallPaper;
    settings: WallPaperSettings;
    [R]?: boolean;
}
export interface account_resetWallPapers {
    _: "account.resetWallPapers";
    [R]?: boolean;
}
export interface account_getAutoDownloadSettings {
    _: "account.getAutoDownloadSettings";
    [R]?: account_AutoDownloadSettings;
}
export interface account_saveAutoDownloadSettings {
    _: "account.saveAutoDownloadSettings";
    low?: true;
    high?: true;
    settings: AutoDownloadSettings;
    [R]?: boolean;
}
export interface account_uploadTheme {
    _: "account.uploadTheme";
    file: InputFile;
    thumb?: InputFile;
    file_name: string;
    mime_type: string;
    [R]?: Document;
}
export interface account_createTheme {
    _: "account.createTheme";
    slug: string;
    title: string;
    document?: InputDocument;
    settings?: Array<InputThemeSettings>;
    [R]?: Theme;
}
export interface account_updateTheme {
    _: "account.updateTheme";
    format: string;
    theme: InputTheme;
    slug?: string;
    title?: string;
    document?: InputDocument;
    settings?: Array<InputThemeSettings>;
    [R]?: Theme;
}
export interface account_saveTheme {
    _: "account.saveTheme";
    theme: InputTheme;
    unsave: boolean;
    [R]?: boolean;
}
export interface account_installTheme {
    _: "account.installTheme";
    dark?: true;
    theme?: InputTheme;
    format?: string;
    base_theme?: BaseTheme;
    [R]?: boolean;
}
export interface account_getTheme {
    _: "account.getTheme";
    format: string;
    theme: InputTheme;
    [R]?: Theme;
}
export interface account_getThemes {
    _: "account.getThemes";
    format: string;
    hash: bigint;
    [R]?: account_Themes;
}
export interface account_setContentSettings {
    _: "account.setContentSettings";
    sensitive_enabled?: true;
    [R]?: boolean;
}
export interface account_getContentSettings {
    _: "account.getContentSettings";
    [R]?: account_ContentSettings;
}
export interface account_getMultiWallPapers {
    _: "account.getMultiWallPapers";
    wallpapers: Array<InputWallPaper>;
    [R]?: Array<WallPaper>;
}
export interface account_getGlobalPrivacySettings {
    _: "account.getGlobalPrivacySettings";
    [R]?: GlobalPrivacySettings;
}
export interface account_setGlobalPrivacySettings {
    _: "account.setGlobalPrivacySettings";
    settings: GlobalPrivacySettings;
    [R]?: GlobalPrivacySettings;
}
export interface account_reportProfilePhoto {
    _: "account.reportProfilePhoto";
    peer: InputPeer;
    photo_id: InputPhoto;
    reason: ReportReason;
    message: string;
    [R]?: boolean;
}
export interface account_resetPassword {
    _: "account.resetPassword";
    [R]?: account_ResetPasswordResult;
}
export interface account_declinePasswordReset {
    _: "account.declinePasswordReset";
    [R]?: boolean;
}
export interface account_getChatThemes {
    _: "account.getChatThemes";
    hash: bigint;
    [R]?: account_Themes;
}
export interface account_setAuthorizationTTL {
    _: "account.setAuthorizationTTL";
    authorization_ttl_days: number;
    [R]?: boolean;
}
export interface account_changeAuthorizationSettings {
    _: "account.changeAuthorizationSettings";
    confirmed?: true;
    hash: bigint;
    encrypted_requests_disabled?: boolean;
    call_requests_disabled?: boolean;
    [R]?: boolean;
}
export interface account_getSavedRingtones {
    _: "account.getSavedRingtones";
    hash: bigint;
    [R]?: account_SavedRingtones;
}
export interface account_saveRingtone {
    _: "account.saveRingtone";
    id: InputDocument;
    unsave: boolean;
    [R]?: account_SavedRingtone;
}
export interface account_uploadRingtone {
    _: "account.uploadRingtone";
    file: InputFile;
    file_name: string;
    mime_type: string;
    [R]?: Document;
}
export interface account_updateEmojiStatus {
    _: "account.updateEmojiStatus";
    emoji_status: EmojiStatus;
    [R]?: boolean;
}
export interface account_getDefaultEmojiStatuses {
    _: "account.getDefaultEmojiStatuses";
    hash: bigint;
    [R]?: account_EmojiStatuses;
}
export interface account_getRecentEmojiStatuses {
    _: "account.getRecentEmojiStatuses";
    hash: bigint;
    [R]?: account_EmojiStatuses;
}
export interface account_clearRecentEmojiStatuses {
    _: "account.clearRecentEmojiStatuses";
    [R]?: boolean;
}
export interface account_reorderUsernames {
    _: "account.reorderUsernames";
    order: Array<string>;
    [R]?: boolean;
}
export interface account_toggleUsername {
    _: "account.toggleUsername";
    username: string;
    active: boolean;
    [R]?: boolean;
}
export interface account_getDefaultProfilePhotoEmojis {
    _: "account.getDefaultProfilePhotoEmojis";
    hash: bigint;
    [R]?: EmojiList;
}
export interface account_getDefaultGroupPhotoEmojis {
    _: "account.getDefaultGroupPhotoEmojis";
    hash: bigint;
    [R]?: EmojiList;
}
export interface account_getAutoSaveSettings {
    _: "account.getAutoSaveSettings";
    [R]?: account_AutoSaveSettings;
}
export interface account_saveAutoSaveSettings {
    _: "account.saveAutoSaveSettings";
    users?: true;
    chats?: true;
    broadcasts?: true;
    peer?: InputPeer;
    settings: AutoSaveSettings;
    [R]?: boolean;
}
export interface account_deleteAutoSaveExceptions {
    _: "account.deleteAutoSaveExceptions";
    [R]?: boolean;
}
export interface account_invalidateSignInCodes {
    _: "account.invalidateSignInCodes";
    codes: Array<string>;
    [R]?: boolean;
}
export interface account_updateColor {
    _: "account.updateColor";
    for_profile?: true;
    color?: PeerColor;
    [R]?: boolean;
}
export interface account_getDefaultBackgroundEmojis {
    _: "account.getDefaultBackgroundEmojis";
    hash: bigint;
    [R]?: EmojiList;
}
export interface account_getChannelDefaultEmojiStatuses {
    _: "account.getChannelDefaultEmojiStatuses";
    hash: bigint;
    [R]?: account_EmojiStatuses;
}
export interface account_getChannelRestrictedStatusEmojis {
    _: "account.getChannelRestrictedStatusEmojis";
    hash: bigint;
    [R]?: EmojiList;
}
export interface account_updateBusinessWorkHours {
    _: "account.updateBusinessWorkHours";
    business_work_hours?: BusinessWorkHours;
    [R]?: boolean;
}
export interface account_updateBusinessLocation {
    _: "account.updateBusinessLocation";
    geo_point?: InputGeoPoint;
    address?: string;
    [R]?: boolean;
}
export interface account_updateBusinessGreetingMessage {
    _: "account.updateBusinessGreetingMessage";
    message?: InputBusinessGreetingMessage;
    [R]?: boolean;
}
export interface account_updateBusinessAwayMessage {
    _: "account.updateBusinessAwayMessage";
    message?: InputBusinessAwayMessage;
    [R]?: boolean;
}
export interface account_updateConnectedBot {
    _: "account.updateConnectedBot";
    deleted?: true;
    rights?: BusinessBotRights;
    bot: InputUser;
    recipients: InputBusinessBotRecipients;
    [R]?: Updates;
}
export interface account_getConnectedBots {
    _: "account.getConnectedBots";
    [R]?: account_ConnectedBots;
}
export interface account_getBotBusinessConnection {
    _: "account.getBotBusinessConnection";
    connection_id: string;
    [R]?: Updates;
}
export interface account_updateBusinessIntro {
    _: "account.updateBusinessIntro";
    intro?: InputBusinessIntro;
    [R]?: boolean;
}
export interface account_toggleConnectedBotPaused {
    _: "account.toggleConnectedBotPaused";
    peer: InputPeer;
    paused: boolean;
    [R]?: boolean;
}
export interface account_disablePeerConnectedBot {
    _: "account.disablePeerConnectedBot";
    peer: InputPeer;
    [R]?: boolean;
}
export interface account_updateBirthday {
    _: "account.updateBirthday";
    birthday?: Birthday;
    [R]?: boolean;
}
export interface account_createBusinessChatLink {
    _: "account.createBusinessChatLink";
    link: InputBusinessChatLink;
    [R]?: BusinessChatLink;
}
export interface account_editBusinessChatLink {
    _: "account.editBusinessChatLink";
    slug: string;
    link: InputBusinessChatLink;
    [R]?: BusinessChatLink;
}
export interface account_deleteBusinessChatLink {
    _: "account.deleteBusinessChatLink";
    slug: string;
    [R]?: boolean;
}
export interface account_getBusinessChatLinks {
    _: "account.getBusinessChatLinks";
    [R]?: account_BusinessChatLinks;
}
export interface account_resolveBusinessChatLink {
    _: "account.resolveBusinessChatLink";
    slug: string;
    [R]?: account_ResolvedBusinessChatLinks;
}
export interface account_updatePersonalChannel {
    _: "account.updatePersonalChannel";
    channel: InputChannel;
    [R]?: boolean;
}
export interface account_toggleSponsoredMessages {
    _: "account.toggleSponsoredMessages";
    enabled: boolean;
    [R]?: boolean;
}
export interface account_getReactionsNotifySettings {
    _: "account.getReactionsNotifySettings";
    [R]?: ReactionsNotifySettings;
}
export interface account_setReactionsNotifySettings {
    _: "account.setReactionsNotifySettings";
    settings: ReactionsNotifySettings;
    [R]?: ReactionsNotifySettings;
}
export interface account_getCollectibleEmojiStatuses {
    _: "account.getCollectibleEmojiStatuses";
    hash: bigint;
    [R]?: account_EmojiStatuses;
}
export interface account_getPaidMessagesRevenue {
    _: "account.getPaidMessagesRevenue";
    parent_peer?: InputPeer;
    user_id: InputUser;
    [R]?: account_PaidMessagesRevenue;
}
export interface account_toggleNoPaidMessagesException {
    _: "account.toggleNoPaidMessagesException";
    refund_charged?: true;
    require_payment?: true;
    parent_peer?: InputPeer;
    user_id: InputUser;
    [R]?: boolean;
}
export interface account_setMainProfileTab {
    _: "account.setMainProfileTab";
    tab: ProfileTab;
    [R]?: boolean;
}
export interface account_saveMusic {
    _: "account.saveMusic";
    unsave?: true;
    id: InputDocument;
    after_id?: InputDocument;
    [R]?: boolean;
}
export interface account_getSavedMusicIds {
    _: "account.getSavedMusicIds";
    hash: bigint;
    [R]?: account_SavedMusicIds;
}
export interface account_getUniqueGiftChatThemes {
    _: "account.getUniqueGiftChatThemes";
    offset: string;
    limit: number;
    hash: bigint;
    [R]?: account_ChatThemes;
}
export interface account_initPasskeyRegistration {
    _: "account.initPasskeyRegistration";
    [R]?: account_PasskeyRegistrationOptions;
}
export interface account_registerPasskey {
    _: "account.registerPasskey";
    credential: InputPasskeyCredential;
    [R]?: Passkey;
}
export interface account_getPasskeys {
    _: "account.getPasskeys";
    [R]?: account_Passkeys;
}
export interface account_deletePasskey {
    _: "account.deletePasskey";
    id: string;
    [R]?: boolean;
}
export interface users_getUsers {
    _: "users.getUsers";
    id: Array<InputUser>;
    [R]?: Array<User>;
}
export interface users_getFullUser {
    _: "users.getFullUser";
    id: InputUser;
    [R]?: users_UserFull;
}
export interface users_setSecureValueErrors {
    _: "users.setSecureValueErrors";
    id: InputUser;
    errors: Array<SecureValueError>;
    [R]?: boolean;
}
export interface users_getRequirementsToContact {
    _: "users.getRequirementsToContact";
    id: Array<InputUser>;
    [R]?: Array<RequirementToContact>;
}
export interface users_getSavedMusic {
    _: "users.getSavedMusic";
    id: InputUser;
    offset: number;
    limit: number;
    hash: bigint;
    [R]?: users_SavedMusic;
}
export interface users_getSavedMusicByID {
    _: "users.getSavedMusicByID";
    id: InputUser;
    documents: Array<InputDocument>;
    [R]?: users_SavedMusic;
}
export interface users_suggestBirthday {
    _: "users.suggestBirthday";
    id: InputUser;
    birthday: Birthday;
    [R]?: Updates;
}
export interface contacts_getContactIDs {
    _: "contacts.getContactIDs";
    hash: bigint;
    [R]?: Array<number>;
}
export interface contacts_getStatuses {
    _: "contacts.getStatuses";
    [R]?: Array<ContactStatus>;
}
export interface contacts_getContacts {
    _: "contacts.getContacts";
    hash: bigint;
    [R]?: contacts_Contacts;
}
export interface contacts_importContacts {
    _: "contacts.importContacts";
    contacts: Array<InputContact>;
    [R]?: contacts_ImportedContacts;
}
export interface contacts_deleteContacts {
    _: "contacts.deleteContacts";
    id: Array<InputUser>;
    [R]?: Updates;
}
export interface contacts_deleteByPhones {
    _: "contacts.deleteByPhones";
    phones: Array<string>;
    [R]?: boolean;
}
export interface contacts_block {
    _: "contacts.block";
    my_stories_from?: true;
    id: InputPeer;
    [R]?: boolean;
}
export interface contacts_unblock {
    _: "contacts.unblock";
    my_stories_from?: true;
    id: InputPeer;
    [R]?: boolean;
}
export interface contacts_getBlocked {
    _: "contacts.getBlocked";
    my_stories_from?: true;
    offset: number;
    limit: number;
    [R]?: contacts_Blocked;
}
export interface contacts_search {
    _: "contacts.search";
    q: string;
    limit: number;
    [R]?: contacts_Found;
}
export interface contacts_resolveUsername {
    _: "contacts.resolveUsername";
    username: string;
    referer?: string;
    [R]?: contacts_ResolvedPeer;
}
export interface contacts_getTopPeers {
    _: "contacts.getTopPeers";
    correspondents?: true;
    bots_pm?: true;
    bots_inline?: true;
    phone_calls?: true;
    forward_users?: true;
    forward_chats?: true;
    groups?: true;
    channels?: true;
    bots_app?: true;
    offset: number;
    limit: number;
    hash: bigint;
    [R]?: contacts_TopPeers;
}
export interface contacts_resetTopPeerRating {
    _: "contacts.resetTopPeerRating";
    category: TopPeerCategory;
    peer: InputPeer;
    [R]?: boolean;
}
export interface contacts_resetSaved {
    _: "contacts.resetSaved";
    [R]?: boolean;
}
export interface contacts_getSaved {
    _: "contacts.getSaved";
    [R]?: Array<SavedContact>;
}
export interface contacts_toggleTopPeers {
    _: "contacts.toggleTopPeers";
    enabled: boolean;
    [R]?: boolean;
}
export interface contacts_addContact {
    _: "contacts.addContact";
    add_phone_privacy_exception?: true;
    id: InputUser;
    first_name: string;
    last_name: string;
    phone: string;
    note?: TextWithEntities;
    [R]?: Updates;
}
export interface contacts_acceptContact {
    _: "contacts.acceptContact";
    id: InputUser;
    [R]?: Updates;
}
export interface contacts_getLocated {
    _: "contacts.getLocated";
    background?: true;
    geo_point: InputGeoPoint;
    self_expires?: number;
    [R]?: Updates;
}
export interface contacts_blockFromReplies {
    _: "contacts.blockFromReplies";
    delete_message?: true;
    delete_history?: true;
    report_spam?: true;
    msg_id: number;
    [R]?: Updates;
}
export interface contacts_resolvePhone {
    _: "contacts.resolvePhone";
    phone: string;
    [R]?: contacts_ResolvedPeer;
}
export interface contacts_exportContactToken {
    _: "contacts.exportContactToken";
    [R]?: ExportedContactToken;
}
export interface contacts_importContactToken {
    _: "contacts.importContactToken";
    token: string;
    [R]?: User;
}
export interface contacts_editCloseFriends {
    _: "contacts.editCloseFriends";
    id: Array<bigint>;
    [R]?: boolean;
}
export interface contacts_setBlocked {
    _: "contacts.setBlocked";
    my_stories_from?: true;
    id: Array<InputPeer>;
    limit: number;
    [R]?: boolean;
}
export interface contacts_getBirthdays {
    _: "contacts.getBirthdays";
    [R]?: contacts_ContactBirthdays;
}
export interface contacts_getSponsoredPeers {
    _: "contacts.getSponsoredPeers";
    q: string;
    [R]?: contacts_SponsoredPeers;
}
export interface contacts_updateContactNote {
    _: "contacts.updateContactNote";
    id: InputUser;
    note: TextWithEntities;
    [R]?: boolean;
}
export interface messages_getMessages {
    _: "messages.getMessages";
    id: Array<InputMessage>;
    [R]?: messages_Messages;
}
export interface messages_getDialogs {
    _: "messages.getDialogs";
    exclude_pinned?: true;
    folder_id?: number;
    offset_date: number;
    offset_id: number;
    offset_peer: InputPeer;
    limit: number;
    hash: bigint;
    [R]?: messages_Dialogs;
}
export interface messages_getHistory {
    _: "messages.getHistory";
    peer: InputPeer;
    offset_id: number;
    offset_date: number;
    add_offset: number;
    limit: number;
    max_id: number;
    min_id: number;
    hash: bigint;
    [R]?: messages_Messages;
}
export interface messages_search {
    _: "messages.search";
    peer: InputPeer;
    q: string;
    from_id?: InputPeer;
    saved_peer_id?: InputPeer;
    saved_reaction?: Array<Reaction>;
    top_msg_id?: number;
    filter: MessagesFilter;
    min_date: number;
    max_date: number;
    offset_id: number;
    add_offset: number;
    limit: number;
    max_id: number;
    min_id: number;
    hash: bigint;
    [R]?: messages_Messages;
}
export interface messages_readHistory {
    _: "messages.readHistory";
    peer: InputPeer;
    max_id: number;
    [R]?: messages_AffectedMessages;
}
export interface messages_deleteHistory {
    _: "messages.deleteHistory";
    just_clear?: true;
    revoke?: true;
    peer: InputPeer;
    max_id: number;
    min_date?: number;
    max_date?: number;
    [R]?: messages_AffectedHistory;
}
export interface messages_deleteMessages {
    _: "messages.deleteMessages";
    revoke?: true;
    id: Array<number>;
    [R]?: messages_AffectedMessages;
}
export interface messages_receivedMessages {
    _: "messages.receivedMessages";
    max_id: number;
    [R]?: Array<ReceivedNotifyMessage>;
}
export interface messages_setTyping {
    _: "messages.setTyping";
    peer: InputPeer;
    top_msg_id?: number;
    action: SendMessageAction;
    [R]?: boolean;
}
export interface messages_sendMessage {
    _: "messages.sendMessage";
    no_webpage?: true;
    silent?: true;
    background?: true;
    clear_draft?: true;
    noforwards?: true;
    update_stickersets_order?: true;
    invert_media?: true;
    allow_paid_floodskip?: true;
    peer: InputPeer;
    reply_to?: InputReplyTo;
    message: string;
    random_id: bigint;
    reply_markup?: ReplyMarkup;
    entities?: Array<MessageEntity>;
    schedule_date?: number;
    schedule_repeat_period?: number;
    send_as?: InputPeer;
    quick_reply_shortcut?: InputQuickReplyShortcut;
    effect?: bigint;
    allow_paid_stars?: bigint;
    suggested_post?: SuggestedPost;
    [R]?: Updates;
}
export interface messages_sendMedia {
    _: "messages.sendMedia";
    silent?: true;
    background?: true;
    clear_draft?: true;
    noforwards?: true;
    update_stickersets_order?: true;
    invert_media?: true;
    allow_paid_floodskip?: true;
    peer: InputPeer;
    reply_to?: InputReplyTo;
    media: InputMedia;
    message: string;
    random_id: bigint;
    reply_markup?: ReplyMarkup;
    entities?: Array<MessageEntity>;
    schedule_date?: number;
    schedule_repeat_period?: number;
    send_as?: InputPeer;
    quick_reply_shortcut?: InputQuickReplyShortcut;
    effect?: bigint;
    allow_paid_stars?: bigint;
    suggested_post?: SuggestedPost;
    [R]?: Updates;
}
export interface messages_forwardMessages {
    _: "messages.forwardMessages";
    silent?: true;
    background?: true;
    with_my_score?: true;
    drop_author?: true;
    drop_media_captions?: true;
    noforwards?: true;
    allow_paid_floodskip?: true;
    from_peer: InputPeer;
    id: Array<number>;
    random_id: Array<bigint>;
    to_peer: InputPeer;
    top_msg_id?: number;
    reply_to?: InputReplyTo;
    schedule_date?: number;
    schedule_repeat_period?: number;
    send_as?: InputPeer;
    quick_reply_shortcut?: InputQuickReplyShortcut;
    effect?: bigint;
    video_timestamp?: number;
    allow_paid_stars?: bigint;
    suggested_post?: SuggestedPost;
    [R]?: Updates;
}
export interface messages_reportSpam {
    _: "messages.reportSpam";
    peer: InputPeer;
    [R]?: boolean;
}
export interface messages_getPeerSettings {
    _: "messages.getPeerSettings";
    peer: InputPeer;
    [R]?: messages_PeerSettings;
}
export interface messages_report {
    _: "messages.report";
    peer: InputPeer;
    id: Array<number>;
    option: Uint8Array<ArrayBuffer>;
    message: string;
    [R]?: ReportResult;
}
export interface messages_getChats {
    _: "messages.getChats";
    id: Array<bigint>;
    [R]?: messages_Chats;
}
export interface messages_getFullChat {
    _: "messages.getFullChat";
    chat_id: bigint;
    [R]?: messages_ChatFull;
}
export interface messages_editChatTitle {
    _: "messages.editChatTitle";
    chat_id: bigint;
    title: string;
    [R]?: Updates;
}
export interface messages_editChatPhoto {
    _: "messages.editChatPhoto";
    chat_id: bigint;
    photo: InputChatPhoto;
    [R]?: Updates;
}
export interface messages_addChatUser {
    _: "messages.addChatUser";
    chat_id: bigint;
    user_id: InputUser;
    fwd_limit: number;
    [R]?: messages_InvitedUsers;
}
export interface messages_deleteChatUser {
    _: "messages.deleteChatUser";
    revoke_history?: true;
    chat_id: bigint;
    user_id: InputUser;
    [R]?: Updates;
}
export interface messages_createChat {
    _: "messages.createChat";
    users: Array<InputUser>;
    title: string;
    ttl_period?: number;
    [R]?: messages_InvitedUsers;
}
export interface messages_getDhConfig {
    _: "messages.getDhConfig";
    version: number;
    random_length: number;
    [R]?: messages_DhConfig;
}
export interface messages_requestEncryption {
    _: "messages.requestEncryption";
    user_id: InputUser;
    random_id: number;
    g_a: Uint8Array<ArrayBuffer>;
    [R]?: EncryptedChat;
}
export interface messages_acceptEncryption {
    _: "messages.acceptEncryption";
    peer: InputEncryptedChat;
    g_b: Uint8Array<ArrayBuffer>;
    key_fingerprint: bigint;
    [R]?: EncryptedChat;
}
export interface messages_discardEncryption {
    _: "messages.discardEncryption";
    delete_history?: true;
    chat_id: number;
    [R]?: boolean;
}
export interface messages_setEncryptedTyping {
    _: "messages.setEncryptedTyping";
    peer: InputEncryptedChat;
    typing: boolean;
    [R]?: boolean;
}
export interface messages_readEncryptedHistory {
    _: "messages.readEncryptedHistory";
    peer: InputEncryptedChat;
    max_date: number;
    [R]?: boolean;
}
export interface messages_sendEncrypted {
    _: "messages.sendEncrypted";
    silent?: true;
    peer: InputEncryptedChat;
    random_id: bigint;
    data: Uint8Array<ArrayBuffer>;
    [R]?: messages_SentEncryptedMessage;
}
export interface messages_sendEncryptedFile {
    _: "messages.sendEncryptedFile";
    silent?: true;
    peer: InputEncryptedChat;
    random_id: bigint;
    data: Uint8Array<ArrayBuffer>;
    file: InputEncryptedFile;
    [R]?: messages_SentEncryptedMessage;
}
export interface messages_sendEncryptedService {
    _: "messages.sendEncryptedService";
    peer: InputEncryptedChat;
    random_id: bigint;
    data: Uint8Array<ArrayBuffer>;
    [R]?: messages_SentEncryptedMessage;
}
export interface messages_receivedQueue {
    _: "messages.receivedQueue";
    max_qts: number;
    [R]?: Array<bigint>;
}
export interface messages_reportEncryptedSpam {
    _: "messages.reportEncryptedSpam";
    peer: InputEncryptedChat;
    [R]?: boolean;
}
export interface messages_readMessageContents {
    _: "messages.readMessageContents";
    id: Array<number>;
    [R]?: messages_AffectedMessages;
}
export interface messages_getStickers {
    _: "messages.getStickers";
    emoticon: string;
    hash: bigint;
    [R]?: messages_Stickers;
}
export interface messages_getAllStickers {
    _: "messages.getAllStickers";
    hash: bigint;
    [R]?: messages_AllStickers;
}
export interface messages_getWebPagePreview {
    _: "messages.getWebPagePreview";
    message: string;
    entities?: Array<MessageEntity>;
    [R]?: messages_WebPagePreview;
}
export interface messages_exportChatInvite {
    _: "messages.exportChatInvite";
    legacy_revoke_permanent?: true;
    request_needed?: true;
    peer: InputPeer;
    expire_date?: number;
    usage_limit?: number;
    title?: string;
    subscription_pricing?: StarsSubscriptionPricing;
    [R]?: ExportedChatInvite;
}
export interface messages_checkChatInvite {
    _: "messages.checkChatInvite";
    hash: string;
    [R]?: ChatInvite;
}
export interface messages_importChatInvite {
    _: "messages.importChatInvite";
    hash: string;
    [R]?: Updates;
}
export interface messages_getStickerSet {
    _: "messages.getStickerSet";
    stickerset: InputStickerSet;
    hash: number;
    [R]?: messages_StickerSet;
}
export interface messages_installStickerSet {
    _: "messages.installStickerSet";
    stickerset: InputStickerSet;
    archived: boolean;
    [R]?: messages_StickerSetInstallResult;
}
export interface messages_uninstallStickerSet {
    _: "messages.uninstallStickerSet";
    stickerset: InputStickerSet;
    [R]?: boolean;
}
export interface messages_startBot {
    _: "messages.startBot";
    bot: InputUser;
    peer: InputPeer;
    random_id: bigint;
    start_param: string;
    [R]?: Updates;
}
export interface messages_getMessagesViews {
    _: "messages.getMessagesViews";
    peer: InputPeer;
    id: Array<number>;
    increment: boolean;
    [R]?: messages_MessageViews;
}
export interface messages_editChatAdmin {
    _: "messages.editChatAdmin";
    chat_id: bigint;
    user_id: InputUser;
    is_admin: boolean;
    [R]?: boolean;
}
export interface messages_migrateChat {
    _: "messages.migrateChat";
    chat_id: bigint;
    [R]?: Updates;
}
export interface messages_searchGlobal {
    _: "messages.searchGlobal";
    broadcasts_only?: true;
    groups_only?: true;
    users_only?: true;
    folder_id?: number;
    q: string;
    filter: MessagesFilter;
    min_date: number;
    max_date: number;
    offset_rate: number;
    offset_peer: InputPeer;
    offset_id: number;
    limit: number;
    [R]?: messages_Messages;
}
export interface messages_reorderStickerSets {
    _: "messages.reorderStickerSets";
    masks?: true;
    emojis?: true;
    order: Array<bigint>;
    [R]?: boolean;
}
export interface messages_getDocumentByHash {
    _: "messages.getDocumentByHash";
    sha256: Uint8Array<ArrayBuffer>;
    size: bigint;
    mime_type: string;
    [R]?: Document;
}
export interface messages_getSavedGifs {
    _: "messages.getSavedGifs";
    hash: bigint;
    [R]?: messages_SavedGifs;
}
export interface messages_saveGif {
    _: "messages.saveGif";
    id: InputDocument;
    unsave: boolean;
    [R]?: boolean;
}
export interface messages_getInlineBotResults {
    _: "messages.getInlineBotResults";
    bot: InputUser;
    peer: InputPeer;
    geo_point?: InputGeoPoint;
    query: string;
    offset: string;
    [R]?: messages_BotResults;
}
export interface messages_setInlineBotResults {
    _: "messages.setInlineBotResults";
    gallery?: true;
    private?: true;
    query_id: bigint;
    results: Array<InputBotInlineResult>;
    cache_time: number;
    next_offset?: string;
    switch_pm?: InlineBotSwitchPM;
    switch_webview?: InlineBotWebView;
    [R]?: boolean;
}
export interface messages_sendInlineBotResult {
    _: "messages.sendInlineBotResult";
    silent?: true;
    background?: true;
    clear_draft?: true;
    hide_via?: true;
    peer: InputPeer;
    reply_to?: InputReplyTo;
    random_id: bigint;
    query_id: bigint;
    id: string;
    schedule_date?: number;
    send_as?: InputPeer;
    quick_reply_shortcut?: InputQuickReplyShortcut;
    allow_paid_stars?: bigint;
    [R]?: Updates;
}
export interface messages_getMessageEditData {
    _: "messages.getMessageEditData";
    peer: InputPeer;
    id: number;
    [R]?: messages_MessageEditData;
}
export interface messages_editMessage {
    _: "messages.editMessage";
    no_webpage?: true;
    invert_media?: true;
    peer: InputPeer;
    id: number;
    message?: string;
    media?: InputMedia;
    reply_markup?: ReplyMarkup;
    entities?: Array<MessageEntity>;
    schedule_date?: number;
    schedule_repeat_period?: number;
    quick_reply_shortcut_id?: number;
    [R]?: Updates;
}
export interface messages_editInlineBotMessage {
    _: "messages.editInlineBotMessage";
    no_webpage?: true;
    invert_media?: true;
    id: InputBotInlineMessageID;
    message?: string;
    media?: InputMedia;
    reply_markup?: ReplyMarkup;
    entities?: Array<MessageEntity>;
    [R]?: boolean;
}
export interface messages_getBotCallbackAnswer {
    _: "messages.getBotCallbackAnswer";
    game?: true;
    peer: InputPeer;
    msg_id: number;
    data?: Uint8Array<ArrayBuffer>;
    password?: InputCheckPasswordSRP;
    [R]?: messages_BotCallbackAnswer;
}
export interface messages_setBotCallbackAnswer {
    _: "messages.setBotCallbackAnswer";
    alert?: true;
    query_id: bigint;
    message?: string;
    url?: string;
    cache_time: number;
    [R]?: boolean;
}
export interface messages_getPeerDialogs {
    _: "messages.getPeerDialogs";
    peers: Array<InputDialogPeer>;
    [R]?: messages_PeerDialogs;
}
export interface messages_saveDraft {
    _: "messages.saveDraft";
    no_webpage?: true;
    invert_media?: true;
    reply_to?: InputReplyTo;
    peer: InputPeer;
    message: string;
    entities?: Array<MessageEntity>;
    media?: InputMedia;
    effect?: bigint;
    suggested_post?: SuggestedPost;
    [R]?: boolean;
}
export interface messages_getAllDrafts {
    _: "messages.getAllDrafts";
    [R]?: Updates;
}
export interface messages_getFeaturedStickers {
    _: "messages.getFeaturedStickers";
    hash: bigint;
    [R]?: messages_FeaturedStickers;
}
export interface messages_readFeaturedStickers {
    _: "messages.readFeaturedStickers";
    id: Array<bigint>;
    [R]?: boolean;
}
export interface messages_getRecentStickers {
    _: "messages.getRecentStickers";
    attached?: true;
    hash: bigint;
    [R]?: messages_RecentStickers;
}
export interface messages_saveRecentSticker {
    _: "messages.saveRecentSticker";
    attached?: true;
    id: InputDocument;
    unsave: boolean;
    [R]?: boolean;
}
export interface messages_clearRecentStickers {
    _: "messages.clearRecentStickers";
    attached?: true;
    [R]?: boolean;
}
export interface messages_getArchivedStickers {
    _: "messages.getArchivedStickers";
    masks?: true;
    emojis?: true;
    offset_id: bigint;
    limit: number;
    [R]?: messages_ArchivedStickers;
}
export interface messages_getMaskStickers {
    _: "messages.getMaskStickers";
    hash: bigint;
    [R]?: messages_AllStickers;
}
export interface messages_getAttachedStickers {
    _: "messages.getAttachedStickers";
    media: InputStickeredMedia;
    [R]?: Array<StickerSetCovered>;
}
export interface messages_setGameScore {
    _: "messages.setGameScore";
    edit_message?: true;
    force?: true;
    peer: InputPeer;
    id: number;
    user_id: InputUser;
    score: number;
    [R]?: Updates;
}
export interface messages_setInlineGameScore {
    _: "messages.setInlineGameScore";
    edit_message?: true;
    force?: true;
    id: InputBotInlineMessageID;
    user_id: InputUser;
    score: number;
    [R]?: boolean;
}
export interface messages_getGameHighScores {
    _: "messages.getGameHighScores";
    peer: InputPeer;
    id: number;
    user_id: InputUser;
    [R]?: messages_HighScores;
}
export interface messages_getInlineGameHighScores {
    _: "messages.getInlineGameHighScores";
    id: InputBotInlineMessageID;
    user_id: InputUser;
    [R]?: messages_HighScores;
}
export interface messages_getCommonChats {
    _: "messages.getCommonChats";
    user_id: InputUser;
    max_id: bigint;
    limit: number;
    [R]?: messages_Chats;
}
export interface messages_getWebPage {
    _: "messages.getWebPage";
    url: string;
    hash: number;
    [R]?: messages_WebPage;
}
export interface messages_toggleDialogPin {
    _: "messages.toggleDialogPin";
    pinned?: true;
    peer: InputDialogPeer;
    [R]?: boolean;
}
export interface messages_reorderPinnedDialogs {
    _: "messages.reorderPinnedDialogs";
    force?: true;
    folder_id: number;
    order: Array<InputDialogPeer>;
    [R]?: boolean;
}
export interface messages_getPinnedDialogs {
    _: "messages.getPinnedDialogs";
    folder_id: number;
    [R]?: messages_PeerDialogs;
}
export interface messages_setBotShippingResults {
    _: "messages.setBotShippingResults";
    query_id: bigint;
    error?: string;
    shipping_options?: Array<ShippingOption>;
    [R]?: boolean;
}
export interface messages_setBotPrecheckoutResults {
    _: "messages.setBotPrecheckoutResults";
    success?: true;
    query_id: bigint;
    error?: string;
    [R]?: boolean;
}
export interface messages_uploadMedia {
    _: "messages.uploadMedia";
    business_connection_id?: string;
    peer: InputPeer;
    media: InputMedia;
    [R]?: MessageMedia;
}
export interface messages_sendScreenshotNotification {
    _: "messages.sendScreenshotNotification";
    peer: InputPeer;
    reply_to: InputReplyTo;
    random_id: bigint;
    [R]?: Updates;
}
export interface messages_getFavedStickers {
    _: "messages.getFavedStickers";
    hash: bigint;
    [R]?: messages_FavedStickers;
}
export interface messages_faveSticker {
    _: "messages.faveSticker";
    id: InputDocument;
    unfave: boolean;
    [R]?: boolean;
}
export interface messages_getUnreadMentions {
    _: "messages.getUnreadMentions";
    peer: InputPeer;
    top_msg_id?: number;
    offset_id: number;
    add_offset: number;
    limit: number;
    max_id: number;
    min_id: number;
    [R]?: messages_Messages;
}
export interface messages_readMentions {
    _: "messages.readMentions";
    peer: InputPeer;
    top_msg_id?: number;
    [R]?: messages_AffectedHistory;
}
export interface messages_getRecentLocations {
    _: "messages.getRecentLocations";
    peer: InputPeer;
    limit: number;
    hash: bigint;
    [R]?: messages_Messages;
}
export interface messages_sendMultiMedia {
    _: "messages.sendMultiMedia";
    silent?: true;
    background?: true;
    clear_draft?: true;
    noforwards?: true;
    update_stickersets_order?: true;
    invert_media?: true;
    allow_paid_floodskip?: true;
    peer: InputPeer;
    reply_to?: InputReplyTo;
    multi_media: Array<InputSingleMedia>;
    schedule_date?: number;
    send_as?: InputPeer;
    quick_reply_shortcut?: InputQuickReplyShortcut;
    effect?: bigint;
    allow_paid_stars?: bigint;
    [R]?: Updates;
}
export interface messages_uploadEncryptedFile {
    _: "messages.uploadEncryptedFile";
    peer: InputEncryptedChat;
    file: InputEncryptedFile;
    [R]?: EncryptedFile;
}
export interface messages_searchStickerSets {
    _: "messages.searchStickerSets";
    exclude_featured?: true;
    q: string;
    hash: bigint;
    [R]?: messages_FoundStickerSets;
}
export interface messages_getSplitRanges {
    _: "messages.getSplitRanges";
    [R]?: Array<MessageRange>;
}
export interface messages_markDialogUnread {
    _: "messages.markDialogUnread";
    unread?: true;
    parent_peer?: InputPeer;
    peer: InputDialogPeer;
    [R]?: boolean;
}
export interface messages_getDialogUnreadMarks {
    _: "messages.getDialogUnreadMarks";
    parent_peer?: InputPeer;
    [R]?: Array<DialogPeer>;
}
export interface messages_clearAllDrafts {
    _: "messages.clearAllDrafts";
    [R]?: boolean;
}
export interface messages_updatePinnedMessage {
    _: "messages.updatePinnedMessage";
    silent?: true;
    unpin?: true;
    pm_oneside?: true;
    peer: InputPeer;
    id: number;
    [R]?: Updates;
}
export interface messages_sendVote {
    _: "messages.sendVote";
    peer: InputPeer;
    msg_id: number;
    options: Array<Uint8Array<ArrayBuffer>>;
    [R]?: Updates;
}
export interface messages_getPollResults {
    _: "messages.getPollResults";
    peer: InputPeer;
    msg_id: number;
    [R]?: Updates;
}
export interface messages_getOnlines {
    _: "messages.getOnlines";
    peer: InputPeer;
    [R]?: ChatOnlines;
}
export interface messages_editChatAbout {
    _: "messages.editChatAbout";
    peer: InputPeer;
    about: string;
    [R]?: boolean;
}
export interface messages_editChatDefaultBannedRights {
    _: "messages.editChatDefaultBannedRights";
    peer: InputPeer;
    banned_rights: ChatBannedRights;
    [R]?: Updates;
}
export interface messages_getEmojiKeywords {
    _: "messages.getEmojiKeywords";
    lang_code: string;
    [R]?: EmojiKeywordsDifference;
}
export interface messages_getEmojiKeywordsDifference {
    _: "messages.getEmojiKeywordsDifference";
    lang_code: string;
    from_version: number;
    [R]?: EmojiKeywordsDifference;
}
export interface messages_getEmojiKeywordsLanguages {
    _: "messages.getEmojiKeywordsLanguages";
    lang_codes: Array<string>;
    [R]?: Array<EmojiLanguage>;
}
export interface messages_getEmojiURL {
    _: "messages.getEmojiURL";
    lang_code: string;
    [R]?: EmojiURL;
}
export interface messages_getSearchCounters {
    _: "messages.getSearchCounters";
    peer: InputPeer;
    saved_peer_id?: InputPeer;
    top_msg_id?: number;
    filters: Array<MessagesFilter>;
    [R]?: Array<messages_SearchCounter>;
}
export interface messages_requestUrlAuth {
    _: "messages.requestUrlAuth";
    peer?: InputPeer;
    msg_id?: number;
    button_id?: number;
    url?: string;
    [R]?: UrlAuthResult;
}
export interface messages_acceptUrlAuth {
    _: "messages.acceptUrlAuth";
    write_allowed?: true;
    peer?: InputPeer;
    msg_id?: number;
    button_id?: number;
    url?: string;
    [R]?: UrlAuthResult;
}
export interface messages_hidePeerSettingsBar {
    _: "messages.hidePeerSettingsBar";
    peer: InputPeer;
    [R]?: boolean;
}
export interface messages_getScheduledHistory {
    _: "messages.getScheduledHistory";
    peer: InputPeer;
    hash: bigint;
    [R]?: messages_Messages;
}
export interface messages_getScheduledMessages {
    _: "messages.getScheduledMessages";
    peer: InputPeer;
    id: Array<number>;
    [R]?: messages_Messages;
}
export interface messages_sendScheduledMessages {
    _: "messages.sendScheduledMessages";
    peer: InputPeer;
    id: Array<number>;
    [R]?: Updates;
}
export interface messages_deleteScheduledMessages {
    _: "messages.deleteScheduledMessages";
    peer: InputPeer;
    id: Array<number>;
    [R]?: Updates;
}
export interface messages_getPollVotes {
    _: "messages.getPollVotes";
    peer: InputPeer;
    id: number;
    option?: Uint8Array<ArrayBuffer>;
    offset?: string;
    limit: number;
    [R]?: messages_VotesList;
}
export interface messages_toggleStickerSets {
    _: "messages.toggleStickerSets";
    uninstall?: true;
    archive?: true;
    unarchive?: true;
    stickersets: Array<InputStickerSet>;
    [R]?: boolean;
}
export interface messages_getDialogFilters {
    _: "messages.getDialogFilters";
    [R]?: messages_DialogFilters;
}
export interface messages_getSuggestedDialogFilters {
    _: "messages.getSuggestedDialogFilters";
    [R]?: Array<DialogFilterSuggested>;
}
export interface messages_updateDialogFilter {
    _: "messages.updateDialogFilter";
    id: number;
    filter?: DialogFilter;
    [R]?: boolean;
}
export interface messages_updateDialogFiltersOrder {
    _: "messages.updateDialogFiltersOrder";
    order: Array<number>;
    [R]?: boolean;
}
export interface messages_getOldFeaturedStickers {
    _: "messages.getOldFeaturedStickers";
    offset: number;
    limit: number;
    hash: bigint;
    [R]?: messages_FeaturedStickers;
}
export interface messages_getReplies {
    _: "messages.getReplies";
    peer: InputPeer;
    msg_id: number;
    offset_id: number;
    offset_date: number;
    add_offset: number;
    limit: number;
    max_id: number;
    min_id: number;
    hash: bigint;
    [R]?: messages_Messages;
}
export interface messages_getDiscussionMessage {
    _: "messages.getDiscussionMessage";
    peer: InputPeer;
    msg_id: number;
    [R]?: messages_DiscussionMessage;
}
export interface messages_readDiscussion {
    _: "messages.readDiscussion";
    peer: InputPeer;
    msg_id: number;
    read_max_id: number;
    [R]?: boolean;
}
export interface messages_unpinAllMessages {
    _: "messages.unpinAllMessages";
    peer: InputPeer;
    top_msg_id?: number;
    saved_peer_id?: InputPeer;
    [R]?: messages_AffectedHistory;
}
export interface messages_deleteChat {
    _: "messages.deleteChat";
    chat_id: bigint;
    [R]?: boolean;
}
export interface messages_deletePhoneCallHistory {
    _: "messages.deletePhoneCallHistory";
    revoke?: true;
    [R]?: messages_AffectedFoundMessages;
}
export interface messages_checkHistoryImport {
    _: "messages.checkHistoryImport";
    import_head: string;
    [R]?: messages_HistoryImportParsed;
}
export interface messages_initHistoryImport {
    _: "messages.initHistoryImport";
    peer: InputPeer;
    file: InputFile;
    media_count: number;
    [R]?: messages_HistoryImport;
}
export interface messages_uploadImportedMedia {
    _: "messages.uploadImportedMedia";
    peer: InputPeer;
    import_id: bigint;
    file_name: string;
    media: InputMedia;
    [R]?: MessageMedia;
}
export interface messages_startHistoryImport {
    _: "messages.startHistoryImport";
    peer: InputPeer;
    import_id: bigint;
    [R]?: boolean;
}
export interface messages_getExportedChatInvites {
    _: "messages.getExportedChatInvites";
    revoked?: true;
    peer: InputPeer;
    admin_id: InputUser;
    offset_date?: number;
    offset_link?: string;
    limit: number;
    [R]?: messages_ExportedChatInvites;
}
export interface messages_getExportedChatInvite {
    _: "messages.getExportedChatInvite";
    peer: InputPeer;
    link: string;
    [R]?: messages_ExportedChatInvite;
}
export interface messages_editExportedChatInvite {
    _: "messages.editExportedChatInvite";
    revoked?: true;
    peer: InputPeer;
    link: string;
    expire_date?: number;
    usage_limit?: number;
    request_needed?: boolean;
    title?: string;
    [R]?: messages_ExportedChatInvite;
}
export interface messages_deleteRevokedExportedChatInvites {
    _: "messages.deleteRevokedExportedChatInvites";
    peer: InputPeer;
    admin_id: InputUser;
    [R]?: boolean;
}
export interface messages_deleteExportedChatInvite {
    _: "messages.deleteExportedChatInvite";
    peer: InputPeer;
    link: string;
    [R]?: boolean;
}
export interface messages_getAdminsWithInvites {
    _: "messages.getAdminsWithInvites";
    peer: InputPeer;
    [R]?: messages_ChatAdminsWithInvites;
}
export interface messages_getChatInviteImporters {
    _: "messages.getChatInviteImporters";
    requested?: true;
    subscription_expired?: true;
    peer: InputPeer;
    link?: string;
    q?: string;
    offset_date: number;
    offset_user: InputUser;
    limit: number;
    [R]?: messages_ChatInviteImporters;
}
export interface messages_setHistoryTTL {
    _: "messages.setHistoryTTL";
    peer: InputPeer;
    period: number;
    [R]?: Updates;
}
export interface messages_checkHistoryImportPeer {
    _: "messages.checkHistoryImportPeer";
    peer: InputPeer;
    [R]?: messages_CheckedHistoryImportPeer;
}
export interface messages_setChatTheme {
    _: "messages.setChatTheme";
    peer: InputPeer;
    theme: InputChatTheme;
    [R]?: Updates;
}
export interface messages_getMessageReadParticipants {
    _: "messages.getMessageReadParticipants";
    peer: InputPeer;
    msg_id: number;
    [R]?: Array<ReadParticipantDate>;
}
export interface messages_getSearchResultsCalendar {
    _: "messages.getSearchResultsCalendar";
    peer: InputPeer;
    saved_peer_id?: InputPeer;
    filter: MessagesFilter;
    offset_id: number;
    offset_date: number;
    [R]?: messages_SearchResultsCalendar;
}
export interface messages_getSearchResultsPositions {
    _: "messages.getSearchResultsPositions";
    peer: InputPeer;
    saved_peer_id?: InputPeer;
    filter: MessagesFilter;
    offset_id: number;
    limit: number;
    [R]?: messages_SearchResultsPositions;
}
export interface messages_hideChatJoinRequest {
    _: "messages.hideChatJoinRequest";
    approved?: true;
    peer: InputPeer;
    user_id: InputUser;
    [R]?: Updates;
}
export interface messages_hideAllChatJoinRequests {
    _: "messages.hideAllChatJoinRequests";
    approved?: true;
    peer: InputPeer;
    link?: string;
    [R]?: Updates;
}
export interface messages_toggleNoForwards {
    _: "messages.toggleNoForwards";
    peer: InputPeer;
    enabled: boolean;
    [R]?: Updates;
}
export interface messages_saveDefaultSendAs {
    _: "messages.saveDefaultSendAs";
    peer: InputPeer;
    send_as: InputPeer;
    [R]?: boolean;
}
export interface messages_sendReaction {
    _: "messages.sendReaction";
    big?: true;
    add_to_recent?: true;
    peer: InputPeer;
    msg_id: number;
    reaction?: Array<Reaction>;
    [R]?: Updates;
}
export interface messages_getMessagesReactions {
    _: "messages.getMessagesReactions";
    peer: InputPeer;
    id: Array<number>;
    [R]?: Updates;
}
export interface messages_getMessageReactionsList {
    _: "messages.getMessageReactionsList";
    peer: InputPeer;
    id: number;
    reaction?: Reaction;
    offset?: string;
    limit: number;
    [R]?: messages_MessageReactionsList;
}
export interface messages_setChatAvailableReactions {
    _: "messages.setChatAvailableReactions";
    peer: InputPeer;
    available_reactions: ChatReactions;
    reactions_limit?: number;
    paid_enabled?: boolean;
    [R]?: Updates;
}
export interface messages_getAvailableReactions {
    _: "messages.getAvailableReactions";
    hash: number;
    [R]?: messages_AvailableReactions;
}
export interface messages_setDefaultReaction {
    _: "messages.setDefaultReaction";
    reaction: Reaction;
    [R]?: boolean;
}
export interface messages_translateText {
    _: "messages.translateText";
    peer?: InputPeer;
    id?: Array<number>;
    text?: Array<TextWithEntities>;
    to_lang: string;
    [R]?: messages_TranslatedText;
}
export interface messages_getUnreadReactions {
    _: "messages.getUnreadReactions";
    peer: InputPeer;
    top_msg_id?: number;
    saved_peer_id?: InputPeer;
    offset_id: number;
    add_offset: number;
    limit: number;
    max_id: number;
    min_id: number;
    [R]?: messages_Messages;
}
export interface messages_readReactions {
    _: "messages.readReactions";
    peer: InputPeer;
    top_msg_id?: number;
    saved_peer_id?: InputPeer;
    [R]?: messages_AffectedHistory;
}
export interface messages_searchSentMedia {
    _: "messages.searchSentMedia";
    q: string;
    filter: MessagesFilter;
    limit: number;
    [R]?: messages_Messages;
}
export interface messages_getAttachMenuBots {
    _: "messages.getAttachMenuBots";
    hash: bigint;
    [R]?: AttachMenuBots;
}
export interface messages_getAttachMenuBot {
    _: "messages.getAttachMenuBot";
    bot: InputUser;
    [R]?: AttachMenuBotsBot;
}
export interface messages_toggleBotInAttachMenu {
    _: "messages.toggleBotInAttachMenu";
    write_allowed?: true;
    bot: InputUser;
    enabled: boolean;
    [R]?: boolean;
}
export interface messages_requestWebView {
    _: "messages.requestWebView";
    from_bot_menu?: true;
    silent?: true;
    compact?: true;
    fullscreen?: true;
    peer: InputPeer;
    bot: InputUser;
    url?: string;
    start_param?: string;
    theme_params?: DataJSON;
    platform: string;
    reply_to?: InputReplyTo;
    send_as?: InputPeer;
    [R]?: WebViewResult;
}
export interface messages_prolongWebView {
    _: "messages.prolongWebView";
    silent?: true;
    peer: InputPeer;
    bot: InputUser;
    query_id: bigint;
    reply_to?: InputReplyTo;
    send_as?: InputPeer;
    [R]?: boolean;
}
export interface messages_requestSimpleWebView {
    _: "messages.requestSimpleWebView";
    from_switch_webview?: true;
    from_side_menu?: true;
    compact?: true;
    fullscreen?: true;
    bot: InputUser;
    url?: string;
    start_param?: string;
    theme_params?: DataJSON;
    platform: string;
    [R]?: WebViewResult;
}
export interface messages_sendWebViewResultMessage {
    _: "messages.sendWebViewResultMessage";
    bot_query_id: string;
    result: InputBotInlineResult;
    [R]?: WebViewMessageSent;
}
export interface messages_sendWebViewData {
    _: "messages.sendWebViewData";
    bot: InputUser;
    random_id: bigint;
    button_text: string;
    data: string;
    [R]?: Updates;
}
export interface messages_transcribeAudio {
    _: "messages.transcribeAudio";
    peer: InputPeer;
    msg_id: number;
    [R]?: messages_TranscribedAudio;
}
export interface messages_rateTranscribedAudio {
    _: "messages.rateTranscribedAudio";
    peer: InputPeer;
    msg_id: number;
    transcription_id: bigint;
    good: boolean;
    [R]?: boolean;
}
export interface messages_getCustomEmojiDocuments {
    _: "messages.getCustomEmojiDocuments";
    document_id: Array<bigint>;
    [R]?: Array<Document>;
}
export interface messages_getEmojiStickers {
    _: "messages.getEmojiStickers";
    hash: bigint;
    [R]?: messages_AllStickers;
}
export interface messages_getFeaturedEmojiStickers {
    _: "messages.getFeaturedEmojiStickers";
    hash: bigint;
    [R]?: messages_FeaturedStickers;
}
export interface messages_reportReaction {
    _: "messages.reportReaction";
    peer: InputPeer;
    id: number;
    reaction_peer: InputPeer;
    [R]?: boolean;
}
export interface messages_getTopReactions {
    _: "messages.getTopReactions";
    limit: number;
    hash: bigint;
    [R]?: messages_Reactions;
}
export interface messages_getRecentReactions {
    _: "messages.getRecentReactions";
    limit: number;
    hash: bigint;
    [R]?: messages_Reactions;
}
export interface messages_clearRecentReactions {
    _: "messages.clearRecentReactions";
    [R]?: boolean;
}
export interface messages_getExtendedMedia {
    _: "messages.getExtendedMedia";
    peer: InputPeer;
    id: Array<number>;
    [R]?: Updates;
}
export interface messages_setDefaultHistoryTTL {
    _: "messages.setDefaultHistoryTTL";
    period: number;
    [R]?: boolean;
}
export interface messages_getDefaultHistoryTTL {
    _: "messages.getDefaultHistoryTTL";
    [R]?: DefaultHistoryTTL;
}
export interface messages_sendBotRequestedPeer {
    _: "messages.sendBotRequestedPeer";
    peer: InputPeer;
    msg_id: number;
    button_id: number;
    requested_peers: Array<InputPeer>;
    [R]?: Updates;
}
export interface messages_getEmojiGroups {
    _: "messages.getEmojiGroups";
    hash: number;
    [R]?: messages_EmojiGroups;
}
export interface messages_getEmojiStatusGroups {
    _: "messages.getEmojiStatusGroups";
    hash: number;
    [R]?: messages_EmojiGroups;
}
export interface messages_getEmojiProfilePhotoGroups {
    _: "messages.getEmojiProfilePhotoGroups";
    hash: number;
    [R]?: messages_EmojiGroups;
}
export interface messages_searchCustomEmoji {
    _: "messages.searchCustomEmoji";
    emoticon: string;
    hash: bigint;
    [R]?: EmojiList;
}
export interface messages_togglePeerTranslations {
    _: "messages.togglePeerTranslations";
    disabled?: true;
    peer: InputPeer;
    [R]?: boolean;
}
export interface messages_getBotApp {
    _: "messages.getBotApp";
    app: InputBotApp;
    hash: bigint;
    [R]?: messages_BotApp;
}
export interface messages_requestAppWebView {
    _: "messages.requestAppWebView";
    write_allowed?: true;
    compact?: true;
    fullscreen?: true;
    peer: InputPeer;
    app: InputBotApp;
    start_param?: string;
    theme_params?: DataJSON;
    platform: string;
    [R]?: WebViewResult;
}
export interface messages_setChatWallPaper {
    _: "messages.setChatWallPaper";
    for_both?: true;
    revert?: true;
    peer: InputPeer;
    wallpaper?: InputWallPaper;
    settings?: WallPaperSettings;
    id?: number;
    [R]?: Updates;
}
export interface messages_searchEmojiStickerSets {
    _: "messages.searchEmojiStickerSets";
    exclude_featured?: true;
    q: string;
    hash: bigint;
    [R]?: messages_FoundStickerSets;
}
export interface messages_getSavedDialogs {
    _: "messages.getSavedDialogs";
    exclude_pinned?: true;
    parent_peer?: InputPeer;
    offset_date: number;
    offset_id: number;
    offset_peer: InputPeer;
    limit: number;
    hash: bigint;
    [R]?: messages_SavedDialogs;
}
export interface messages_getSavedHistory {
    _: "messages.getSavedHistory";
    parent_peer?: InputPeer;
    peer: InputPeer;
    offset_id: number;
    offset_date: number;
    add_offset: number;
    limit: number;
    max_id: number;
    min_id: number;
    hash: bigint;
    [R]?: messages_Messages;
}
export interface messages_deleteSavedHistory {
    _: "messages.deleteSavedHistory";
    parent_peer?: InputPeer;
    peer: InputPeer;
    max_id: number;
    min_date?: number;
    max_date?: number;
    [R]?: messages_AffectedHistory;
}
export interface messages_getPinnedSavedDialogs {
    _: "messages.getPinnedSavedDialogs";
    [R]?: messages_SavedDialogs;
}
export interface messages_toggleSavedDialogPin {
    _: "messages.toggleSavedDialogPin";
    pinned?: true;
    peer: InputDialogPeer;
    [R]?: boolean;
}
export interface messages_reorderPinnedSavedDialogs {
    _: "messages.reorderPinnedSavedDialogs";
    force?: true;
    order: Array<InputDialogPeer>;
    [R]?: boolean;
}
export interface messages_getSavedReactionTags {
    _: "messages.getSavedReactionTags";
    peer?: InputPeer;
    hash: bigint;
    [R]?: messages_SavedReactionTags;
}
export interface messages_updateSavedReactionTag {
    _: "messages.updateSavedReactionTag";
    reaction: Reaction;
    title?: string;
    [R]?: boolean;
}
export interface messages_getDefaultTagReactions {
    _: "messages.getDefaultTagReactions";
    hash: bigint;
    [R]?: messages_Reactions;
}
export interface messages_getOutboxReadDate {
    _: "messages.getOutboxReadDate";
    peer: InputPeer;
    msg_id: number;
    [R]?: OutboxReadDate;
}
export interface messages_getQuickReplies {
    _: "messages.getQuickReplies";
    hash: bigint;
    [R]?: messages_QuickReplies;
}
export interface messages_reorderQuickReplies {
    _: "messages.reorderQuickReplies";
    order: Array<number>;
    [R]?: boolean;
}
export interface messages_checkQuickReplyShortcut {
    _: "messages.checkQuickReplyShortcut";
    shortcut: string;
    [R]?: boolean;
}
export interface messages_editQuickReplyShortcut {
    _: "messages.editQuickReplyShortcut";
    shortcut_id: number;
    shortcut: string;
    [R]?: boolean;
}
export interface messages_deleteQuickReplyShortcut {
    _: "messages.deleteQuickReplyShortcut";
    shortcut_id: number;
    [R]?: boolean;
}
export interface messages_getQuickReplyMessages {
    _: "messages.getQuickReplyMessages";
    shortcut_id: number;
    id?: Array<number>;
    hash: bigint;
    [R]?: messages_Messages;
}
export interface messages_sendQuickReplyMessages {
    _: "messages.sendQuickReplyMessages";
    peer: InputPeer;
    shortcut_id: number;
    id: Array<number>;
    random_id: Array<bigint>;
    [R]?: Updates;
}
export interface messages_deleteQuickReplyMessages {
    _: "messages.deleteQuickReplyMessages";
    shortcut_id: number;
    id: Array<number>;
    [R]?: Updates;
}
export interface messages_toggleDialogFilterTags {
    _: "messages.toggleDialogFilterTags";
    enabled: boolean;
    [R]?: boolean;
}
export interface messages_getMyStickers {
    _: "messages.getMyStickers";
    offset_id: bigint;
    limit: number;
    [R]?: messages_MyStickers;
}
export interface messages_getEmojiStickerGroups {
    _: "messages.getEmojiStickerGroups";
    hash: number;
    [R]?: messages_EmojiGroups;
}
export interface messages_getAvailableEffects {
    _: "messages.getAvailableEffects";
    hash: number;
    [R]?: messages_AvailableEffects;
}
export interface messages_editFactCheck {
    _: "messages.editFactCheck";
    peer: InputPeer;
    msg_id: number;
    text: TextWithEntities;
    [R]?: Updates;
}
export interface messages_deleteFactCheck {
    _: "messages.deleteFactCheck";
    peer: InputPeer;
    msg_id: number;
    [R]?: Updates;
}
export interface messages_getFactCheck {
    _: "messages.getFactCheck";
    peer: InputPeer;
    msg_id: Array<number>;
    [R]?: Array<FactCheck>;
}
export interface messages_requestMainWebView {
    _: "messages.requestMainWebView";
    compact?: true;
    fullscreen?: true;
    peer: InputPeer;
    bot: InputUser;
    start_param?: string;
    theme_params?: DataJSON;
    platform: string;
    [R]?: WebViewResult;
}
export interface messages_sendPaidReaction {
    _: "messages.sendPaidReaction";
    peer: InputPeer;
    msg_id: number;
    count: number;
    random_id: bigint;
    private?: PaidReactionPrivacy;
    [R]?: Updates;
}
export interface messages_togglePaidReactionPrivacy {
    _: "messages.togglePaidReactionPrivacy";
    peer: InputPeer;
    msg_id: number;
    private: PaidReactionPrivacy;
    [R]?: boolean;
}
export interface messages_getPaidReactionPrivacy {
    _: "messages.getPaidReactionPrivacy";
    [R]?: Updates;
}
export interface messages_viewSponsoredMessage {
    _: "messages.viewSponsoredMessage";
    random_id: Uint8Array<ArrayBuffer>;
    [R]?: boolean;
}
export interface messages_clickSponsoredMessage {
    _: "messages.clickSponsoredMessage";
    media?: true;
    fullscreen?: true;
    random_id: Uint8Array<ArrayBuffer>;
    [R]?: boolean;
}
export interface messages_reportSponsoredMessage {
    _: "messages.reportSponsoredMessage";
    random_id: Uint8Array<ArrayBuffer>;
    option: Uint8Array<ArrayBuffer>;
    [R]?: channels_SponsoredMessageReportResult;
}
export interface messages_getSponsoredMessages {
    _: "messages.getSponsoredMessages";
    peer: InputPeer;
    msg_id?: number;
    [R]?: messages_SponsoredMessages;
}
export interface messages_savePreparedInlineMessage {
    _: "messages.savePreparedInlineMessage";
    result: InputBotInlineResult;
    user_id: InputUser;
    peer_types?: Array<InlineQueryPeerType>;
    [R]?: messages_BotPreparedInlineMessage;
}
export interface messages_getPreparedInlineMessage {
    _: "messages.getPreparedInlineMessage";
    bot: InputUser;
    id: string;
    [R]?: messages_PreparedInlineMessage;
}
export interface messages_searchStickers {
    _: "messages.searchStickers";
    emojis?: true;
    q: string;
    emoticon: string;
    lang_code: Array<string>;
    offset: number;
    limit: number;
    hash: bigint;
    [R]?: messages_FoundStickers;
}
export interface messages_reportMessagesDelivery {
    _: "messages.reportMessagesDelivery";
    push?: true;
    peer: InputPeer;
    id: Array<number>;
    [R]?: boolean;
}
export interface messages_getSavedDialogsByID {
    _: "messages.getSavedDialogsByID";
    parent_peer?: InputPeer;
    ids: Array<InputPeer>;
    [R]?: messages_SavedDialogs;
}
export interface messages_readSavedHistory {
    _: "messages.readSavedHistory";
    parent_peer: InputPeer;
    peer: InputPeer;
    max_id: number;
    [R]?: boolean;
}
export interface messages_toggleTodoCompleted {
    _: "messages.toggleTodoCompleted";
    peer: InputPeer;
    msg_id: number;
    completed: Array<number>;
    incompleted: Array<number>;
    [R]?: Updates;
}
export interface messages_appendTodoList {
    _: "messages.appendTodoList";
    peer: InputPeer;
    msg_id: number;
    list: Array<TodoItem>;
    [R]?: Updates;
}
export interface messages_toggleSuggestedPostApproval {
    _: "messages.toggleSuggestedPostApproval";
    reject?: true;
    peer: InputPeer;
    msg_id: number;
    schedule_date?: number;
    reject_comment?: string;
    [R]?: Updates;
}
export interface messages_getForumTopics {
    _: "messages.getForumTopics";
    peer: InputPeer;
    q?: string;
    offset_date: number;
    offset_id: number;
    offset_topic: number;
    limit: number;
    [R]?: messages_ForumTopics;
}
export interface messages_getForumTopicsByID {
    _: "messages.getForumTopicsByID";
    peer: InputPeer;
    topics: Array<number>;
    [R]?: messages_ForumTopics;
}
export interface messages_editForumTopic {
    _: "messages.editForumTopic";
    peer: InputPeer;
    topic_id: number;
    title?: string;
    icon_emoji_id?: bigint;
    closed?: boolean;
    hidden?: boolean;
    [R]?: Updates;
}
export interface messages_updatePinnedForumTopic {
    _: "messages.updatePinnedForumTopic";
    peer: InputPeer;
    topic_id: number;
    pinned: boolean;
    [R]?: Updates;
}
export interface messages_reorderPinnedForumTopics {
    _: "messages.reorderPinnedForumTopics";
    force?: true;
    peer: InputPeer;
    order: Array<number>;
    [R]?: Updates;
}
export interface messages_createForumTopic {
    _: "messages.createForumTopic";
    title_missing?: true;
    peer: InputPeer;
    title: string;
    icon_color?: number;
    icon_emoji_id?: bigint;
    random_id: bigint;
    send_as?: InputPeer;
    [R]?: Updates;
}
export interface messages_deleteTopicHistory {
    _: "messages.deleteTopicHistory";
    peer: InputPeer;
    top_msg_id: number;
    [R]?: messages_AffectedHistory;
}
export interface messages_getEmojiGameInfo {
    _: "messages.getEmojiGameInfo";
    [R]?: messages_EmojiGameInfo;
}
export interface messages_summarizeText {
    _: "messages.summarizeText";
    peer: InputPeer;
    id: number;
    to_lang?: string;
    [R]?: TextWithEntities;
}
export interface updates_getState {
    _: "updates.getState";
    [R]?: updates_State;
}
export interface updates_getDifference {
    _: "updates.getDifference";
    pts: number;
    pts_limit?: number;
    pts_total_limit?: number;
    date: number;
    qts: number;
    qts_limit?: number;
    [R]?: updates_Difference;
}
export interface updates_getChannelDifference {
    _: "updates.getChannelDifference";
    force?: true;
    channel: InputChannel;
    filter: ChannelMessagesFilter;
    pts: number;
    limit: number;
    [R]?: updates_ChannelDifference;
}
export interface photos_updateProfilePhoto {
    _: "photos.updateProfilePhoto";
    fallback?: true;
    bot?: InputUser;
    id: InputPhoto;
    [R]?: photos_Photo;
}
export interface photos_uploadProfilePhoto {
    _: "photos.uploadProfilePhoto";
    fallback?: true;
    bot?: InputUser;
    file?: InputFile;
    video?: InputFile;
    video_start_ts?: number;
    video_emoji_markup?: VideoSize;
    [R]?: photos_Photo;
}
export interface photos_deletePhotos {
    _: "photos.deletePhotos";
    id: Array<InputPhoto>;
    [R]?: Array<bigint>;
}
export interface photos_getUserPhotos {
    _: "photos.getUserPhotos";
    user_id: InputUser;
    offset: number;
    max_id: bigint;
    limit: number;
    [R]?: photos_Photos;
}
export interface photos_uploadContactProfilePhoto {
    _: "photos.uploadContactProfilePhoto";
    suggest?: true;
    save?: true;
    user_id: InputUser;
    file?: InputFile;
    video?: InputFile;
    video_start_ts?: number;
    video_emoji_markup?: VideoSize;
    [R]?: photos_Photo;
}
export interface upload_saveFilePart {
    _: "upload.saveFilePart";
    file_id: bigint;
    file_part: number;
    bytes: Uint8Array<ArrayBuffer>;
    [R]?: boolean;
}
export interface upload_getFile {
    _: "upload.getFile";
    precise?: true;
    cdn_supported?: true;
    location: InputFileLocation;
    offset: bigint;
    limit: number;
    [R]?: upload_File;
}
export interface upload_saveBigFilePart {
    _: "upload.saveBigFilePart";
    file_id: bigint;
    file_part: number;
    file_total_parts: number;
    bytes: Uint8Array<ArrayBuffer>;
    [R]?: boolean;
}
export interface upload_getWebFile {
    _: "upload.getWebFile";
    location: InputWebFileLocation;
    offset: number;
    limit: number;
    [R]?: upload_WebFile;
}
export interface upload_getCdnFile {
    _: "upload.getCdnFile";
    file_token: Uint8Array<ArrayBuffer>;
    offset: bigint;
    limit: number;
    [R]?: upload_CdnFile;
}
export interface upload_reuploadCdnFile {
    _: "upload.reuploadCdnFile";
    file_token: Uint8Array<ArrayBuffer>;
    request_token: Uint8Array<ArrayBuffer>;
    [R]?: Array<FileHash>;
}
export interface upload_getCdnFileHashes {
    _: "upload.getCdnFileHashes";
    file_token: Uint8Array<ArrayBuffer>;
    offset: bigint;
    [R]?: Array<FileHash>;
}
export interface upload_getFileHashes {
    _: "upload.getFileHashes";
    location: InputFileLocation;
    offset: bigint;
    [R]?: Array<FileHash>;
}
export interface help_getConfig {
    _: "help.getConfig";
    [R]?: Config;
}
export interface help_getNearestDc {
    _: "help.getNearestDc";
    [R]?: NearestDc;
}
export interface help_getAppUpdate {
    _: "help.getAppUpdate";
    source: string;
    [R]?: help_AppUpdate;
}
export interface help_getInviteText {
    _: "help.getInviteText";
    [R]?: help_InviteText;
}
export interface help_getSupport {
    _: "help.getSupport";
    [R]?: help_Support;
}
export interface help_setBotUpdatesStatus {
    _: "help.setBotUpdatesStatus";
    pending_updates_count: number;
    message: string;
    [R]?: boolean;
}
export interface help_getCdnConfig {
    _: "help.getCdnConfig";
    [R]?: CdnConfig;
}
export interface help_getRecentMeUrls {
    _: "help.getRecentMeUrls";
    referer: string;
    [R]?: help_RecentMeUrls;
}
export interface help_getTermsOfServiceUpdate {
    _: "help.getTermsOfServiceUpdate";
    [R]?: help_TermsOfServiceUpdate;
}
export interface help_acceptTermsOfService {
    _: "help.acceptTermsOfService";
    id: DataJSON;
    [R]?: boolean;
}
export interface help_getDeepLinkInfo {
    _: "help.getDeepLinkInfo";
    path: string;
    [R]?: help_DeepLinkInfo;
}
export interface help_getAppConfig {
    _: "help.getAppConfig";
    hash: number;
    [R]?: help_AppConfig;
}
export interface help_saveAppLog {
    _: "help.saveAppLog";
    events: Array<InputAppEvent>;
    [R]?: boolean;
}
export interface help_getPassportConfig {
    _: "help.getPassportConfig";
    hash: number;
    [R]?: help_PassportConfig;
}
export interface help_getSupportName {
    _: "help.getSupportName";
    [R]?: help_SupportName;
}
export interface help_getUserInfo {
    _: "help.getUserInfo";
    user_id: InputUser;
    [R]?: help_UserInfo;
}
export interface help_editUserInfo {
    _: "help.editUserInfo";
    user_id: InputUser;
    message: string;
    entities: Array<MessageEntity>;
    [R]?: help_UserInfo;
}
export interface help_getPromoData {
    _: "help.getPromoData";
    [R]?: help_PromoData;
}
export interface help_hidePromoData {
    _: "help.hidePromoData";
    peer: InputPeer;
    [R]?: boolean;
}
export interface help_dismissSuggestion {
    _: "help.dismissSuggestion";
    peer: InputPeer;
    suggestion: string;
    [R]?: boolean;
}
export interface help_getCountriesList {
    _: "help.getCountriesList";
    lang_code: string;
    hash: number;
    [R]?: help_CountriesList;
}
export interface help_getPremiumPromo {
    _: "help.getPremiumPromo";
    [R]?: help_PremiumPromo;
}
export interface help_getPeerColors {
    _: "help.getPeerColors";
    hash: number;
    [R]?: help_PeerColors;
}
export interface help_getPeerProfileColors {
    _: "help.getPeerProfileColors";
    hash: number;
    [R]?: help_PeerColors;
}
export interface help_getTimezonesList {
    _: "help.getTimezonesList";
    hash: number;
    [R]?: help_TimezonesList;
}
export interface channels_readHistory {
    _: "channels.readHistory";
    channel: InputChannel;
    max_id: number;
    [R]?: boolean;
}
export interface channels_deleteMessages {
    _: "channels.deleteMessages";
    channel: InputChannel;
    id: Array<number>;
    [R]?: messages_AffectedMessages;
}
export interface channels_reportSpam {
    _: "channels.reportSpam";
    channel: InputChannel;
    participant: InputPeer;
    id: Array<number>;
    [R]?: boolean;
}
export interface channels_getMessages {
    _: "channels.getMessages";
    channel: InputChannel;
    id: Array<InputMessage>;
    [R]?: messages_Messages;
}
export interface channels_getParticipants {
    _: "channels.getParticipants";
    channel: InputChannel;
    filter: ChannelParticipantsFilter;
    offset: number;
    limit: number;
    hash: bigint;
    [R]?: channels_ChannelParticipants;
}
export interface channels_getParticipant {
    _: "channels.getParticipant";
    channel: InputChannel;
    participant: InputPeer;
    [R]?: channels_ChannelParticipant;
}
export interface channels_getChannels {
    _: "channels.getChannels";
    id: Array<InputChannel>;
    [R]?: messages_Chats;
}
export interface channels_getFullChannel {
    _: "channels.getFullChannel";
    channel: InputChannel;
    [R]?: messages_ChatFull;
}
export interface channels_createChannel {
    _: "channels.createChannel";
    broadcast?: true;
    megagroup?: true;
    for_import?: true;
    forum?: true;
    title: string;
    about: string;
    geo_point?: InputGeoPoint;
    address?: string;
    ttl_period?: number;
    [R]?: Updates;
}
export interface channels_editAdmin {
    _: "channels.editAdmin";
    channel: InputChannel;
    user_id: InputUser;
    admin_rights: ChatAdminRights;
    rank: string;
    [R]?: Updates;
}
export interface channels_editTitle {
    _: "channels.editTitle";
    channel: InputChannel;
    title: string;
    [R]?: Updates;
}
export interface channels_editPhoto {
    _: "channels.editPhoto";
    channel: InputChannel;
    photo: InputChatPhoto;
    [R]?: Updates;
}
export interface channels_checkUsername {
    _: "channels.checkUsername";
    channel: InputChannel;
    username: string;
    [R]?: boolean;
}
export interface channels_updateUsername {
    _: "channels.updateUsername";
    channel: InputChannel;
    username: string;
    [R]?: boolean;
}
export interface channels_joinChannel {
    _: "channels.joinChannel";
    channel: InputChannel;
    [R]?: Updates;
}
export interface channels_leaveChannel {
    _: "channels.leaveChannel";
    channel: InputChannel;
    [R]?: Updates;
}
export interface channels_inviteToChannel {
    _: "channels.inviteToChannel";
    channel: InputChannel;
    users: Array<InputUser>;
    [R]?: messages_InvitedUsers;
}
export interface channels_deleteChannel {
    _: "channels.deleteChannel";
    channel: InputChannel;
    [R]?: Updates;
}
export interface channels_exportMessageLink {
    _: "channels.exportMessageLink";
    grouped?: true;
    thread?: true;
    channel: InputChannel;
    id: number;
    [R]?: ExportedMessageLink;
}
export interface channels_toggleSignatures {
    _: "channels.toggleSignatures";
    signatures_enabled?: true;
    profiles_enabled?: true;
    channel: InputChannel;
    [R]?: Updates;
}
export interface channels_getAdminedPublicChannels {
    _: "channels.getAdminedPublicChannels";
    by_location?: true;
    check_limit?: true;
    for_personal?: true;
    [R]?: messages_Chats;
}
export interface channels_editBanned {
    _: "channels.editBanned";
    channel: InputChannel;
    participant: InputPeer;
    banned_rights: ChatBannedRights;
    [R]?: Updates;
}
export interface channels_getAdminLog {
    _: "channels.getAdminLog";
    channel: InputChannel;
    q: string;
    events_filter?: ChannelAdminLogEventsFilter;
    admins?: Array<InputUser>;
    max_id: bigint;
    min_id: bigint;
    limit: number;
    [R]?: channels_AdminLogResults;
}
export interface channels_setStickers {
    _: "channels.setStickers";
    channel: InputChannel;
    stickerset: InputStickerSet;
    [R]?: boolean;
}
export interface channels_readMessageContents {
    _: "channels.readMessageContents";
    channel: InputChannel;
    id: Array<number>;
    [R]?: boolean;
}
export interface channels_deleteHistory {
    _: "channels.deleteHistory";
    for_everyone?: true;
    channel: InputChannel;
    max_id: number;
    [R]?: Updates;
}
export interface channels_togglePreHistoryHidden {
    _: "channels.togglePreHistoryHidden";
    channel: InputChannel;
    enabled: boolean;
    [R]?: Updates;
}
export interface channels_getLeftChannels {
    _: "channels.getLeftChannels";
    offset: number;
    [R]?: messages_Chats;
}
export interface channels_getGroupsForDiscussion {
    _: "channels.getGroupsForDiscussion";
    [R]?: messages_Chats;
}
export interface channels_setDiscussionGroup {
    _: "channels.setDiscussionGroup";
    broadcast: InputChannel;
    group: InputChannel;
    [R]?: boolean;
}
export interface channels_editCreator {
    _: "channels.editCreator";
    channel: InputChannel;
    user_id: InputUser;
    password: InputCheckPasswordSRP;
    [R]?: Updates;
}
export interface channels_editLocation {
    _: "channels.editLocation";
    channel: InputChannel;
    geo_point: InputGeoPoint;
    address: string;
    [R]?: boolean;
}
export interface channels_toggleSlowMode {
    _: "channels.toggleSlowMode";
    channel: InputChannel;
    seconds: number;
    [R]?: Updates;
}
export interface channels_getInactiveChannels {
    _: "channels.getInactiveChannels";
    [R]?: messages_InactiveChats;
}
export interface channels_convertToGigagroup {
    _: "channels.convertToGigagroup";
    channel: InputChannel;
    [R]?: Updates;
}
export interface channels_getSendAs {
    _: "channels.getSendAs";
    for_paid_reactions?: true;
    for_live_stories?: true;
    peer: InputPeer;
    [R]?: channels_SendAsPeers;
}
export interface channels_deleteParticipantHistory {
    _: "channels.deleteParticipantHistory";
    channel: InputChannel;
    participant: InputPeer;
    [R]?: messages_AffectedHistory;
}
export interface channels_toggleJoinToSend {
    _: "channels.toggleJoinToSend";
    channel: InputChannel;
    enabled: boolean;
    [R]?: Updates;
}
export interface channels_toggleJoinRequest {
    _: "channels.toggleJoinRequest";
    channel: InputChannel;
    enabled: boolean;
    [R]?: Updates;
}
export interface channels_reorderUsernames {
    _: "channels.reorderUsernames";
    channel: InputChannel;
    order: Array<string>;
    [R]?: boolean;
}
export interface channels_toggleUsername {
    _: "channels.toggleUsername";
    channel: InputChannel;
    username: string;
    active: boolean;
    [R]?: boolean;
}
export interface channels_deactivateAllUsernames {
    _: "channels.deactivateAllUsernames";
    channel: InputChannel;
    [R]?: boolean;
}
export interface channels_toggleForum {
    _: "channels.toggleForum";
    channel: InputChannel;
    enabled: boolean;
    tabs: boolean;
    [R]?: Updates;
}
export interface channels_toggleAntiSpam {
    _: "channels.toggleAntiSpam";
    channel: InputChannel;
    enabled: boolean;
    [R]?: Updates;
}
export interface channels_reportAntiSpamFalsePositive {
    _: "channels.reportAntiSpamFalsePositive";
    channel: InputChannel;
    msg_id: number;
    [R]?: boolean;
}
export interface channels_toggleParticipantsHidden {
    _: "channels.toggleParticipantsHidden";
    channel: InputChannel;
    enabled: boolean;
    [R]?: Updates;
}
export interface channels_updateColor {
    _: "channels.updateColor";
    for_profile?: true;
    channel: InputChannel;
    color?: number;
    background_emoji_id?: bigint;
    [R]?: Updates;
}
export interface channels_toggleViewForumAsMessages {
    _: "channels.toggleViewForumAsMessages";
    channel: InputChannel;
    enabled: boolean;
    [R]?: Updates;
}
export interface channels_getChannelRecommendations {
    _: "channels.getChannelRecommendations";
    channel?: InputChannel;
    [R]?: messages_Chats;
}
export interface channels_updateEmojiStatus {
    _: "channels.updateEmojiStatus";
    channel: InputChannel;
    emoji_status: EmojiStatus;
    [R]?: Updates;
}
export interface channels_setBoostsToUnblockRestrictions {
    _: "channels.setBoostsToUnblockRestrictions";
    channel: InputChannel;
    boosts: number;
    [R]?: Updates;
}
export interface channels_setEmojiStickers {
    _: "channels.setEmojiStickers";
    channel: InputChannel;
    stickerset: InputStickerSet;
    [R]?: boolean;
}
export interface channels_restrictSponsoredMessages {
    _: "channels.restrictSponsoredMessages";
    channel: InputChannel;
    restricted: boolean;
    [R]?: Updates;
}
export interface channels_searchPosts {
    _: "channels.searchPosts";
    hashtag?: string;
    query?: string;
    offset_rate: number;
    offset_peer: InputPeer;
    offset_id: number;
    limit: number;
    allow_paid_stars?: bigint;
    [R]?: messages_Messages;
}
export interface channels_updatePaidMessagesPrice {
    _: "channels.updatePaidMessagesPrice";
    broadcast_messages_allowed?: true;
    channel: InputChannel;
    send_paid_messages_stars: bigint;
    [R]?: Updates;
}
export interface channels_toggleAutotranslation {
    _: "channels.toggleAutotranslation";
    channel: InputChannel;
    enabled: boolean;
    [R]?: Updates;
}
export interface channels_getMessageAuthor {
    _: "channels.getMessageAuthor";
    channel: InputChannel;
    id: number;
    [R]?: User;
}
export interface channels_checkSearchPostsFlood {
    _: "channels.checkSearchPostsFlood";
    query?: string;
    [R]?: SearchPostsFlood;
}
export interface channels_setMainProfileTab {
    _: "channels.setMainProfileTab";
    channel: InputChannel;
    tab: ProfileTab;
    [R]?: boolean;
}
export interface bots_sendCustomRequest {
    _: "bots.sendCustomRequest";
    custom_method: string;
    params: DataJSON;
    [R]?: DataJSON;
}
export interface bots_answerWebhookJSONQuery {
    _: "bots.answerWebhookJSONQuery";
    query_id: bigint;
    data: DataJSON;
    [R]?: boolean;
}
export interface bots_setBotCommands {
    _: "bots.setBotCommands";
    scope: BotCommandScope;
    lang_code: string;
    commands: Array<BotCommand>;
    [R]?: boolean;
}
export interface bots_resetBotCommands {
    _: "bots.resetBotCommands";
    scope: BotCommandScope;
    lang_code: string;
    [R]?: boolean;
}
export interface bots_getBotCommands {
    _: "bots.getBotCommands";
    scope: BotCommandScope;
    lang_code: string;
    [R]?: Array<BotCommand>;
}
export interface bots_setBotMenuButton {
    _: "bots.setBotMenuButton";
    user_id: InputUser;
    button: BotMenuButton;
    [R]?: boolean;
}
export interface bots_getBotMenuButton {
    _: "bots.getBotMenuButton";
    user_id: InputUser;
    [R]?: BotMenuButton;
}
export interface bots_setBotBroadcastDefaultAdminRights {
    _: "bots.setBotBroadcastDefaultAdminRights";
    admin_rights: ChatAdminRights;
    [R]?: boolean;
}
export interface bots_setBotGroupDefaultAdminRights {
    _: "bots.setBotGroupDefaultAdminRights";
    admin_rights: ChatAdminRights;
    [R]?: boolean;
}
export interface bots_setBotInfo {
    _: "bots.setBotInfo";
    bot?: InputUser;
    lang_code: string;
    name?: string;
    about?: string;
    description?: string;
    [R]?: boolean;
}
export interface bots_getBotInfo {
    _: "bots.getBotInfo";
    bot?: InputUser;
    lang_code: string;
    [R]?: bots_BotInfo;
}
export interface bots_reorderUsernames {
    _: "bots.reorderUsernames";
    bot: InputUser;
    order: Array<string>;
    [R]?: boolean;
}
export interface bots_toggleUsername {
    _: "bots.toggleUsername";
    bot: InputUser;
    username: string;
    active: boolean;
    [R]?: boolean;
}
export interface bots_canSendMessage {
    _: "bots.canSendMessage";
    bot: InputUser;
    [R]?: boolean;
}
export interface bots_allowSendMessage {
    _: "bots.allowSendMessage";
    bot: InputUser;
    [R]?: Updates;
}
export interface bots_invokeWebViewCustomMethod {
    _: "bots.invokeWebViewCustomMethod";
    bot: InputUser;
    custom_method: string;
    params: DataJSON;
    [R]?: DataJSON;
}
export interface bots_getPopularAppBots {
    _: "bots.getPopularAppBots";
    offset: string;
    limit: number;
    [R]?: bots_PopularAppBots;
}
export interface bots_addPreviewMedia {
    _: "bots.addPreviewMedia";
    bot: InputUser;
    lang_code: string;
    media: InputMedia;
    [R]?: BotPreviewMedia;
}
export interface bots_editPreviewMedia {
    _: "bots.editPreviewMedia";
    bot: InputUser;
    lang_code: string;
    media: InputMedia;
    new_media: InputMedia;
    [R]?: BotPreviewMedia;
}
export interface bots_deletePreviewMedia {
    _: "bots.deletePreviewMedia";
    bot: InputUser;
    lang_code: string;
    media: Array<InputMedia>;
    [R]?: boolean;
}
export interface bots_reorderPreviewMedias {
    _: "bots.reorderPreviewMedias";
    bot: InputUser;
    lang_code: string;
    order: Array<InputMedia>;
    [R]?: boolean;
}
export interface bots_getPreviewInfo {
    _: "bots.getPreviewInfo";
    bot: InputUser;
    lang_code: string;
    [R]?: bots_PreviewInfo;
}
export interface bots_getPreviewMedias {
    _: "bots.getPreviewMedias";
    bot: InputUser;
    [R]?: Array<BotPreviewMedia>;
}
export interface bots_updateUserEmojiStatus {
    _: "bots.updateUserEmojiStatus";
    user_id: InputUser;
    emoji_status: EmojiStatus;
    [R]?: boolean;
}
export interface bots_toggleUserEmojiStatusPermission {
    _: "bots.toggleUserEmojiStatusPermission";
    bot: InputUser;
    enabled: boolean;
    [R]?: boolean;
}
export interface bots_checkDownloadFileParams {
    _: "bots.checkDownloadFileParams";
    bot: InputUser;
    file_name: string;
    url: string;
    [R]?: boolean;
}
export interface bots_getAdminedBots {
    _: "bots.getAdminedBots";
    [R]?: Array<User>;
}
export interface bots_updateStarRefProgram {
    _: "bots.updateStarRefProgram";
    bot: InputUser;
    commission_permille: number;
    duration_months?: number;
    [R]?: StarRefProgram;
}
export interface bots_setCustomVerification {
    _: "bots.setCustomVerification";
    enabled?: true;
    bot?: InputUser;
    peer: InputPeer;
    custom_description?: string;
    [R]?: boolean;
}
export interface bots_getBotRecommendations {
    _: "bots.getBotRecommendations";
    bot: InputUser;
    [R]?: users_Users;
}
export interface payments_getPaymentForm {
    _: "payments.getPaymentForm";
    invoice: InputInvoice;
    theme_params?: DataJSON;
    [R]?: payments_PaymentForm;
}
export interface payments_getPaymentReceipt {
    _: "payments.getPaymentReceipt";
    peer: InputPeer;
    msg_id: number;
    [R]?: payments_PaymentReceipt;
}
export interface payments_validateRequestedInfo {
    _: "payments.validateRequestedInfo";
    save?: true;
    invoice: InputInvoice;
    info: PaymentRequestedInfo;
    [R]?: payments_ValidatedRequestedInfo;
}
export interface payments_sendPaymentForm {
    _: "payments.sendPaymentForm";
    form_id: bigint;
    invoice: InputInvoice;
    requested_info_id?: string;
    shipping_option_id?: string;
    credentials: InputPaymentCredentials;
    tip_amount?: bigint;
    [R]?: payments_PaymentResult;
}
export interface payments_getSavedInfo {
    _: "payments.getSavedInfo";
    [R]?: payments_SavedInfo;
}
export interface payments_clearSavedInfo {
    _: "payments.clearSavedInfo";
    credentials?: true;
    info?: true;
    [R]?: boolean;
}
export interface payments_getBankCardData {
    _: "payments.getBankCardData";
    number: string;
    [R]?: payments_BankCardData;
}
export interface payments_exportInvoice {
    _: "payments.exportInvoice";
    invoice_media: InputMedia;
    [R]?: payments_ExportedInvoice;
}
export interface payments_assignAppStoreTransaction {
    _: "payments.assignAppStoreTransaction";
    receipt: Uint8Array<ArrayBuffer>;
    purpose: InputStorePaymentPurpose;
    [R]?: Updates;
}
export interface payments_assignPlayMarketTransaction {
    _: "payments.assignPlayMarketTransaction";
    receipt: DataJSON;
    purpose: InputStorePaymentPurpose;
    [R]?: Updates;
}
export interface payments_getPremiumGiftCodeOptions {
    _: "payments.getPremiumGiftCodeOptions";
    boost_peer?: InputPeer;
    [R]?: Array<PremiumGiftCodeOption>;
}
export interface payments_checkGiftCode {
    _: "payments.checkGiftCode";
    slug: string;
    [R]?: payments_CheckedGiftCode;
}
export interface payments_applyGiftCode {
    _: "payments.applyGiftCode";
    slug: string;
    [R]?: Updates;
}
export interface payments_getGiveawayInfo {
    _: "payments.getGiveawayInfo";
    peer: InputPeer;
    msg_id: number;
    [R]?: payments_GiveawayInfo;
}
export interface payments_launchPrepaidGiveaway {
    _: "payments.launchPrepaidGiveaway";
    peer: InputPeer;
    giveaway_id: bigint;
    purpose: InputStorePaymentPurpose;
    [R]?: Updates;
}
export interface payments_getStarsTopupOptions {
    _: "payments.getStarsTopupOptions";
    [R]?: Array<StarsTopupOption>;
}
export interface payments_getStarsStatus {
    _: "payments.getStarsStatus";
    ton?: true;
    peer: InputPeer;
    [R]?: payments_StarsStatus;
}
export interface payments_getStarsTransactions {
    _: "payments.getStarsTransactions";
    inbound?: true;
    outbound?: true;
    ascending?: true;
    ton?: true;
    subscription_id?: string;
    peer: InputPeer;
    offset: string;
    limit: number;
    [R]?: payments_StarsStatus;
}
export interface payments_sendStarsForm {
    _: "payments.sendStarsForm";
    form_id: bigint;
    invoice: InputInvoice;
    [R]?: payments_PaymentResult;
}
export interface payments_refundStarsCharge {
    _: "payments.refundStarsCharge";
    user_id: InputUser;
    charge_id: string;
    [R]?: Updates;
}
export interface payments_getStarsRevenueStats {
    _: "payments.getStarsRevenueStats";
    dark?: true;
    ton?: true;
    peer: InputPeer;
    [R]?: payments_StarsRevenueStats;
}
export interface payments_getStarsRevenueWithdrawalUrl {
    _: "payments.getStarsRevenueWithdrawalUrl";
    ton?: true;
    peer: InputPeer;
    amount?: bigint;
    password: InputCheckPasswordSRP;
    [R]?: payments_StarsRevenueWithdrawalUrl;
}
export interface payments_getStarsRevenueAdsAccountUrl {
    _: "payments.getStarsRevenueAdsAccountUrl";
    peer: InputPeer;
    [R]?: payments_StarsRevenueAdsAccountUrl;
}
export interface payments_getStarsTransactionsByID {
    _: "payments.getStarsTransactionsByID";
    ton?: true;
    peer: InputPeer;
    id: Array<InputStarsTransaction>;
    [R]?: payments_StarsStatus;
}
export interface payments_getStarsGiftOptions {
    _: "payments.getStarsGiftOptions";
    user_id?: InputUser;
    [R]?: Array<StarsGiftOption>;
}
export interface payments_getStarsSubscriptions {
    _: "payments.getStarsSubscriptions";
    missing_balance?: true;
    peer: InputPeer;
    offset: string;
    [R]?: payments_StarsStatus;
}
export interface payments_changeStarsSubscription {
    _: "payments.changeStarsSubscription";
    peer: InputPeer;
    subscription_id: string;
    canceled?: boolean;
    [R]?: boolean;
}
export interface payments_fulfillStarsSubscription {
    _: "payments.fulfillStarsSubscription";
    peer: InputPeer;
    subscription_id: string;
    [R]?: boolean;
}
export interface payments_getStarsGiveawayOptions {
    _: "payments.getStarsGiveawayOptions";
    [R]?: Array<StarsGiveawayOption>;
}
export interface payments_getStarGifts {
    _: "payments.getStarGifts";
    hash: number;
    [R]?: payments_StarGifts;
}
export interface payments_saveStarGift {
    _: "payments.saveStarGift";
    unsave?: true;
    stargift: InputSavedStarGift;
    [R]?: boolean;
}
export interface payments_convertStarGift {
    _: "payments.convertStarGift";
    stargift: InputSavedStarGift;
    [R]?: boolean;
}
export interface payments_botCancelStarsSubscription {
    _: "payments.botCancelStarsSubscription";
    restore?: true;
    user_id: InputUser;
    charge_id: string;
    [R]?: boolean;
}
export interface payments_getConnectedStarRefBots {
    _: "payments.getConnectedStarRefBots";
    peer: InputPeer;
    offset_date?: number;
    offset_link?: string;
    limit: number;
    [R]?: payments_ConnectedStarRefBots;
}
export interface payments_getConnectedStarRefBot {
    _: "payments.getConnectedStarRefBot";
    peer: InputPeer;
    bot: InputUser;
    [R]?: payments_ConnectedStarRefBots;
}
export interface payments_getSuggestedStarRefBots {
    _: "payments.getSuggestedStarRefBots";
    order_by_revenue?: true;
    order_by_date?: true;
    peer: InputPeer;
    offset: string;
    limit: number;
    [R]?: payments_SuggestedStarRefBots;
}
export interface payments_connectStarRefBot {
    _: "payments.connectStarRefBot";
    peer: InputPeer;
    bot: InputUser;
    [R]?: payments_ConnectedStarRefBots;
}
export interface payments_editConnectedStarRefBot {
    _: "payments.editConnectedStarRefBot";
    revoked?: true;
    peer: InputPeer;
    link: string;
    [R]?: payments_ConnectedStarRefBots;
}
export interface payments_getStarGiftUpgradePreview {
    _: "payments.getStarGiftUpgradePreview";
    gift_id: bigint;
    [R]?: payments_StarGiftUpgradePreview;
}
export interface payments_upgradeStarGift {
    _: "payments.upgradeStarGift";
    keep_original_details?: true;
    stargift: InputSavedStarGift;
    [R]?: Updates;
}
export interface payments_transferStarGift {
    _: "payments.transferStarGift";
    stargift: InputSavedStarGift;
    to_id: InputPeer;
    [R]?: Updates;
}
export interface payments_getUniqueStarGift {
    _: "payments.getUniqueStarGift";
    slug: string;
    [R]?: payments_UniqueStarGift;
}
export interface payments_getSavedStarGifts {
    _: "payments.getSavedStarGifts";
    exclude_unsaved?: true;
    exclude_saved?: true;
    exclude_unlimited?: true;
    exclude_unique?: true;
    sort_by_value?: true;
    exclude_upgradable?: true;
    exclude_unupgradable?: true;
    peer_color_available?: true;
    exclude_hosted?: true;
    peer: InputPeer;
    collection_id?: number;
    offset: string;
    limit: number;
    [R]?: payments_SavedStarGifts;
}
export interface payments_getSavedStarGift {
    _: "payments.getSavedStarGift";
    stargift: Array<InputSavedStarGift>;
    [R]?: payments_SavedStarGifts;
}
export interface payments_getStarGiftWithdrawalUrl {
    _: "payments.getStarGiftWithdrawalUrl";
    stargift: InputSavedStarGift;
    password: InputCheckPasswordSRP;
    [R]?: payments_StarGiftWithdrawalUrl;
}
export interface payments_toggleChatStarGiftNotifications {
    _: "payments.toggleChatStarGiftNotifications";
    enabled?: true;
    peer: InputPeer;
    [R]?: boolean;
}
export interface payments_toggleStarGiftsPinnedToTop {
    _: "payments.toggleStarGiftsPinnedToTop";
    peer: InputPeer;
    stargift: Array<InputSavedStarGift>;
    [R]?: boolean;
}
export interface payments_canPurchaseStore {
    _: "payments.canPurchaseStore";
    purpose: InputStorePaymentPurpose;
    [R]?: boolean;
}
export interface payments_getResaleStarGifts {
    _: "payments.getResaleStarGifts";
    sort_by_price?: true;
    sort_by_num?: true;
    attributes_hash?: bigint;
    gift_id: bigint;
    attributes?: Array<StarGiftAttributeId>;
    offset: string;
    limit: number;
    [R]?: payments_ResaleStarGifts;
}
export interface payments_updateStarGiftPrice {
    _: "payments.updateStarGiftPrice";
    stargift: InputSavedStarGift;
    resell_amount: StarsAmount;
    [R]?: Updates;
}
export interface payments_createStarGiftCollection {
    _: "payments.createStarGiftCollection";
    peer: InputPeer;
    title: string;
    stargift: Array<InputSavedStarGift>;
    [R]?: StarGiftCollection;
}
export interface payments_updateStarGiftCollection {
    _: "payments.updateStarGiftCollection";
    peer: InputPeer;
    collection_id: number;
    title?: string;
    delete_stargift?: Array<InputSavedStarGift>;
    add_stargift?: Array<InputSavedStarGift>;
    order?: Array<InputSavedStarGift>;
    [R]?: StarGiftCollection;
}
export interface payments_reorderStarGiftCollections {
    _: "payments.reorderStarGiftCollections";
    peer: InputPeer;
    order: Array<number>;
    [R]?: boolean;
}
export interface payments_deleteStarGiftCollection {
    _: "payments.deleteStarGiftCollection";
    peer: InputPeer;
    collection_id: number;
    [R]?: boolean;
}
export interface payments_getStarGiftCollections {
    _: "payments.getStarGiftCollections";
    peer: InputPeer;
    hash: bigint;
    [R]?: payments_StarGiftCollections;
}
export interface payments_getUniqueStarGiftValueInfo {
    _: "payments.getUniqueStarGiftValueInfo";
    slug: string;
    [R]?: payments_UniqueStarGiftValueInfo;
}
export interface payments_checkCanSendGift {
    _: "payments.checkCanSendGift";
    gift_id: bigint;
    [R]?: payments_CheckCanSendGiftResult;
}
export interface payments_getStarGiftAuctionState {
    _: "payments.getStarGiftAuctionState";
    auction: InputStarGiftAuction;
    version: number;
    [R]?: payments_StarGiftAuctionState;
}
export interface payments_getStarGiftAuctionAcquiredGifts {
    _: "payments.getStarGiftAuctionAcquiredGifts";
    gift_id: bigint;
    [R]?: payments_StarGiftAuctionAcquiredGifts;
}
export interface payments_getStarGiftActiveAuctions {
    _: "payments.getStarGiftActiveAuctions";
    hash: bigint;
    [R]?: payments_StarGiftActiveAuctions;
}
export interface payments_resolveStarGiftOffer {
    _: "payments.resolveStarGiftOffer";
    decline?: true;
    offer_msg_id: number;
    [R]?: Updates;
}
export interface payments_sendStarGiftOffer {
    _: "payments.sendStarGiftOffer";
    peer: InputPeer;
    slug: string;
    price: StarsAmount;
    duration: number;
    random_id: bigint;
    allow_paid_stars?: bigint;
    [R]?: Updates;
}
export interface payments_getStarGiftUpgradeAttributes {
    _: "payments.getStarGiftUpgradeAttributes";
    gift_id: bigint;
    [R]?: payments_StarGiftUpgradeAttributes;
}
export interface stickers_createStickerSet {
    _: "stickers.createStickerSet";
    masks?: true;
    emojis?: true;
    text_color?: true;
    user_id: InputUser;
    title: string;
    short_name: string;
    thumb?: InputDocument;
    stickers: Array<InputStickerSetItem>;
    software?: string;
    [R]?: messages_StickerSet;
}
export interface stickers_removeStickerFromSet {
    _: "stickers.removeStickerFromSet";
    sticker: InputDocument;
    [R]?: messages_StickerSet;
}
export interface stickers_changeStickerPosition {
    _: "stickers.changeStickerPosition";
    sticker: InputDocument;
    position: number;
    [R]?: messages_StickerSet;
}
export interface stickers_addStickerToSet {
    _: "stickers.addStickerToSet";
    stickerset: InputStickerSet;
    sticker: InputStickerSetItem;
    [R]?: messages_StickerSet;
}
export interface stickers_setStickerSetThumb {
    _: "stickers.setStickerSetThumb";
    stickerset: InputStickerSet;
    thumb?: InputDocument;
    thumb_document_id?: bigint;
    [R]?: messages_StickerSet;
}
export interface stickers_checkShortName {
    _: "stickers.checkShortName";
    short_name: string;
    [R]?: boolean;
}
export interface stickers_suggestShortName {
    _: "stickers.suggestShortName";
    title: string;
    [R]?: stickers_SuggestedShortName;
}
export interface stickers_changeSticker {
    _: "stickers.changeSticker";
    sticker: InputDocument;
    emoji?: string;
    mask_coords?: MaskCoords;
    keywords?: string;
    [R]?: messages_StickerSet;
}
export interface stickers_renameStickerSet {
    _: "stickers.renameStickerSet";
    stickerset: InputStickerSet;
    title: string;
    [R]?: messages_StickerSet;
}
export interface stickers_deleteStickerSet {
    _: "stickers.deleteStickerSet";
    stickerset: InputStickerSet;
    [R]?: boolean;
}
export interface stickers_replaceSticker {
    _: "stickers.replaceSticker";
    sticker: InputDocument;
    new_sticker: InputStickerSetItem;
    [R]?: messages_StickerSet;
}
export interface phone_getCallConfig {
    _: "phone.getCallConfig";
    [R]?: DataJSON;
}
export interface phone_requestCall {
    _: "phone.requestCall";
    video?: true;
    user_id: InputUser;
    random_id: number;
    g_a_hash: Uint8Array<ArrayBuffer>;
    protocol: PhoneCallProtocol;
    [R]?: phone_PhoneCall;
}
export interface phone_acceptCall {
    _: "phone.acceptCall";
    peer: InputPhoneCall;
    g_b: Uint8Array<ArrayBuffer>;
    protocol: PhoneCallProtocol;
    [R]?: phone_PhoneCall;
}
export interface phone_confirmCall {
    _: "phone.confirmCall";
    peer: InputPhoneCall;
    g_a: Uint8Array<ArrayBuffer>;
    key_fingerprint: bigint;
    protocol: PhoneCallProtocol;
    [R]?: phone_PhoneCall;
}
export interface phone_receivedCall {
    _: "phone.receivedCall";
    peer: InputPhoneCall;
    [R]?: boolean;
}
export interface phone_discardCall {
    _: "phone.discardCall";
    video?: true;
    peer: InputPhoneCall;
    duration: number;
    reason: PhoneCallDiscardReason;
    connection_id: bigint;
    [R]?: Updates;
}
export interface phone_setCallRating {
    _: "phone.setCallRating";
    user_initiative?: true;
    peer: InputPhoneCall;
    rating: number;
    comment: string;
    [R]?: Updates;
}
export interface phone_saveCallDebug {
    _: "phone.saveCallDebug";
    peer: InputPhoneCall;
    debug: DataJSON;
    [R]?: boolean;
}
export interface phone_sendSignalingData {
    _: "phone.sendSignalingData";
    peer: InputPhoneCall;
    data: Uint8Array<ArrayBuffer>;
    [R]?: boolean;
}
export interface phone_createGroupCall {
    _: "phone.createGroupCall";
    rtmp_stream?: true;
    peer: InputPeer;
    random_id: number;
    title?: string;
    schedule_date?: number;
    [R]?: Updates;
}
export interface phone_joinGroupCall {
    _: "phone.joinGroupCall";
    muted?: true;
    video_stopped?: true;
    call: InputGroupCall;
    join_as: InputPeer;
    invite_hash?: string;
    public_key?: bigint;
    block?: Uint8Array<ArrayBuffer>;
    params: DataJSON;
    [R]?: Updates;
}
export interface phone_leaveGroupCall {
    _: "phone.leaveGroupCall";
    call: InputGroupCall;
    source: number;
    [R]?: Updates;
}
export interface phone_inviteToGroupCall {
    _: "phone.inviteToGroupCall";
    call: InputGroupCall;
    users: Array<InputUser>;
    [R]?: Updates;
}
export interface phone_discardGroupCall {
    _: "phone.discardGroupCall";
    call: InputGroupCall;
    [R]?: Updates;
}
export interface phone_toggleGroupCallSettings {
    _: "phone.toggleGroupCallSettings";
    reset_invite_hash?: true;
    call: InputGroupCall;
    join_muted?: boolean;
    messages_enabled?: boolean;
    send_paid_messages_stars?: bigint;
    [R]?: Updates;
}
export interface phone_getGroupCall {
    _: "phone.getGroupCall";
    call: InputGroupCall;
    limit: number;
    [R]?: phone_GroupCall;
}
export interface phone_getGroupParticipants {
    _: "phone.getGroupParticipants";
    call: InputGroupCall;
    ids: Array<InputPeer>;
    sources: Array<number>;
    offset: string;
    limit: number;
    [R]?: phone_GroupParticipants;
}
export interface phone_checkGroupCall {
    _: "phone.checkGroupCall";
    call: InputGroupCall;
    sources: Array<number>;
    [R]?: Array<number>;
}
export interface phone_toggleGroupCallRecord {
    _: "phone.toggleGroupCallRecord";
    start?: true;
    video?: true;
    call: InputGroupCall;
    title?: string;
    video_portrait?: boolean;
    [R]?: Updates;
}
export interface phone_editGroupCallParticipant {
    _: "phone.editGroupCallParticipant";
    call: InputGroupCall;
    participant: InputPeer;
    muted?: boolean;
    volume?: number;
    raise_hand?: boolean;
    video_stopped?: boolean;
    video_paused?: boolean;
    presentation_paused?: boolean;
    [R]?: Updates;
}
export interface phone_editGroupCallTitle {
    _: "phone.editGroupCallTitle";
    call: InputGroupCall;
    title: string;
    [R]?: Updates;
}
export interface phone_getGroupCallJoinAs {
    _: "phone.getGroupCallJoinAs";
    peer: InputPeer;
    [R]?: phone_JoinAsPeers;
}
export interface phone_exportGroupCallInvite {
    _: "phone.exportGroupCallInvite";
    can_self_unmute?: true;
    call: InputGroupCall;
    [R]?: phone_ExportedGroupCallInvite;
}
export interface phone_toggleGroupCallStartSubscription {
    _: "phone.toggleGroupCallStartSubscription";
    call: InputGroupCall;
    subscribed: boolean;
    [R]?: Updates;
}
export interface phone_startScheduledGroupCall {
    _: "phone.startScheduledGroupCall";
    call: InputGroupCall;
    [R]?: Updates;
}
export interface phone_saveDefaultGroupCallJoinAs {
    _: "phone.saveDefaultGroupCallJoinAs";
    peer: InputPeer;
    join_as: InputPeer;
    [R]?: boolean;
}
export interface phone_joinGroupCallPresentation {
    _: "phone.joinGroupCallPresentation";
    call: InputGroupCall;
    params: DataJSON;
    [R]?: Updates;
}
export interface phone_leaveGroupCallPresentation {
    _: "phone.leaveGroupCallPresentation";
    call: InputGroupCall;
    [R]?: Updates;
}
export interface phone_getGroupCallStreamChannels {
    _: "phone.getGroupCallStreamChannels";
    call: InputGroupCall;
    [R]?: phone_GroupCallStreamChannels;
}
export interface phone_getGroupCallStreamRtmpUrl {
    _: "phone.getGroupCallStreamRtmpUrl";
    live_story?: true;
    peer: InputPeer;
    revoke: boolean;
    [R]?: phone_GroupCallStreamRtmpUrl;
}
export interface phone_saveCallLog {
    _: "phone.saveCallLog";
    peer: InputPhoneCall;
    file: InputFile;
    [R]?: boolean;
}
export interface phone_createConferenceCall {
    _: "phone.createConferenceCall";
    muted?: true;
    video_stopped?: true;
    join?: true;
    random_id: number;
    public_key?: bigint;
    block?: Uint8Array<ArrayBuffer>;
    params?: DataJSON;
    [R]?: Updates;
}
export interface phone_deleteConferenceCallParticipants {
    _: "phone.deleteConferenceCallParticipants";
    only_left?: true;
    kick?: true;
    call: InputGroupCall;
    ids: Array<bigint>;
    block: Uint8Array<ArrayBuffer>;
    [R]?: Updates;
}
export interface phone_sendConferenceCallBroadcast {
    _: "phone.sendConferenceCallBroadcast";
    call: InputGroupCall;
    block: Uint8Array<ArrayBuffer>;
    [R]?: Updates;
}
export interface phone_inviteConferenceCallParticipant {
    _: "phone.inviteConferenceCallParticipant";
    video?: true;
    call: InputGroupCall;
    user_id: InputUser;
    [R]?: Updates;
}
export interface phone_declineConferenceCallInvite {
    _: "phone.declineConferenceCallInvite";
    msg_id: number;
    [R]?: Updates;
}
export interface phone_getGroupCallChainBlocks {
    _: "phone.getGroupCallChainBlocks";
    call: InputGroupCall;
    sub_chain_id: number;
    offset: number;
    limit: number;
    [R]?: Updates;
}
export interface phone_sendGroupCallMessage {
    _: "phone.sendGroupCallMessage";
    call: InputGroupCall;
    random_id: bigint;
    message: TextWithEntities;
    allow_paid_stars?: bigint;
    send_as?: InputPeer;
    [R]?: Updates;
}
export interface phone_sendGroupCallEncryptedMessage {
    _: "phone.sendGroupCallEncryptedMessage";
    call: InputGroupCall;
    encrypted_message: Uint8Array<ArrayBuffer>;
    [R]?: boolean;
}
export interface phone_deleteGroupCallMessages {
    _: "phone.deleteGroupCallMessages";
    report_spam?: true;
    call: InputGroupCall;
    messages: Array<number>;
    [R]?: Updates;
}
export interface phone_deleteGroupCallParticipantMessages {
    _: "phone.deleteGroupCallParticipantMessages";
    report_spam?: true;
    call: InputGroupCall;
    participant: InputPeer;
    [R]?: Updates;
}
export interface phone_getGroupCallStars {
    _: "phone.getGroupCallStars";
    call: InputGroupCall;
    [R]?: phone_GroupCallStars;
}
export interface phone_saveDefaultSendAs {
    _: "phone.saveDefaultSendAs";
    call: InputGroupCall;
    send_as: InputPeer;
    [R]?: boolean;
}
export interface langpack_getLangPack {
    _: "langpack.getLangPack";
    lang_pack: string;
    lang_code: string;
    [R]?: LangPackDifference;
}
export interface langpack_getStrings {
    _: "langpack.getStrings";
    lang_pack: string;
    lang_code: string;
    keys: Array<string>;
    [R]?: Array<LangPackString>;
}
export interface langpack_getDifference {
    _: "langpack.getDifference";
    lang_pack: string;
    lang_code: string;
    from_version: number;
    [R]?: LangPackDifference;
}
export interface langpack_getLanguages {
    _: "langpack.getLanguages";
    lang_pack: string;
    [R]?: Array<LangPackLanguage>;
}
export interface langpack_getLanguage {
    _: "langpack.getLanguage";
    lang_pack: string;
    lang_code: string;
    [R]?: LangPackLanguage;
}
export interface folders_editPeerFolders {
    _: "folders.editPeerFolders";
    folder_peers: Array<InputFolderPeer>;
    [R]?: Updates;
}
export interface stats_getBroadcastStats {
    _: "stats.getBroadcastStats";
    dark?: true;
    channel: InputChannel;
    [R]?: stats_BroadcastStats;
}
export interface stats_loadAsyncGraph {
    _: "stats.loadAsyncGraph";
    token: string;
    x?: bigint;
    [R]?: StatsGraph;
}
export interface stats_getMegagroupStats {
    _: "stats.getMegagroupStats";
    dark?: true;
    channel: InputChannel;
    [R]?: stats_MegagroupStats;
}
export interface stats_getMessagePublicForwards {
    _: "stats.getMessagePublicForwards";
    channel: InputChannel;
    msg_id: number;
    offset: string;
    limit: number;
    [R]?: stats_PublicForwards;
}
export interface stats_getMessageStats {
    _: "stats.getMessageStats";
    dark?: true;
    channel: InputChannel;
    msg_id: number;
    [R]?: stats_MessageStats;
}
export interface stats_getStoryStats {
    _: "stats.getStoryStats";
    dark?: true;
    peer: InputPeer;
    id: number;
    [R]?: stats_StoryStats;
}
export interface stats_getStoryPublicForwards {
    _: "stats.getStoryPublicForwards";
    peer: InputPeer;
    id: number;
    offset: string;
    limit: number;
    [R]?: stats_PublicForwards;
}
export interface chatlists_exportChatlistInvite {
    _: "chatlists.exportChatlistInvite";
    chatlist: InputChatlist;
    title: string;
    peers: Array<InputPeer>;
    [R]?: chatlists_ExportedChatlistInvite;
}
export interface chatlists_deleteExportedInvite {
    _: "chatlists.deleteExportedInvite";
    chatlist: InputChatlist;
    slug: string;
    [R]?: boolean;
}
export interface chatlists_editExportedInvite {
    _: "chatlists.editExportedInvite";
    chatlist: InputChatlist;
    slug: string;
    title?: string;
    peers?: Array<InputPeer>;
    [R]?: ExportedChatlistInvite;
}
export interface chatlists_getExportedInvites {
    _: "chatlists.getExportedInvites";
    chatlist: InputChatlist;
    [R]?: chatlists_ExportedInvites;
}
export interface chatlists_checkChatlistInvite {
    _: "chatlists.checkChatlistInvite";
    slug: string;
    [R]?: chatlists_ChatlistInvite;
}
export interface chatlists_joinChatlistInvite {
    _: "chatlists.joinChatlistInvite";
    slug: string;
    peers: Array<InputPeer>;
    [R]?: Updates;
}
export interface chatlists_getChatlistUpdates {
    _: "chatlists.getChatlistUpdates";
    chatlist: InputChatlist;
    [R]?: chatlists_ChatlistUpdates;
}
export interface chatlists_joinChatlistUpdates {
    _: "chatlists.joinChatlistUpdates";
    chatlist: InputChatlist;
    peers: Array<InputPeer>;
    [R]?: Updates;
}
export interface chatlists_hideChatlistUpdates {
    _: "chatlists.hideChatlistUpdates";
    chatlist: InputChatlist;
    [R]?: boolean;
}
export interface chatlists_getLeaveChatlistSuggestions {
    _: "chatlists.getLeaveChatlistSuggestions";
    chatlist: InputChatlist;
    [R]?: Array<Peer>;
}
export interface chatlists_leaveChatlist {
    _: "chatlists.leaveChatlist";
    chatlist: InputChatlist;
    peers: Array<InputPeer>;
    [R]?: Updates;
}
export interface stories_canSendStory {
    _: "stories.canSendStory";
    peer: InputPeer;
    [R]?: stories_CanSendStoryCount;
}
export interface stories_sendStory {
    _: "stories.sendStory";
    pinned?: true;
    noforwards?: true;
    fwd_modified?: true;
    peer: InputPeer;
    media: InputMedia;
    media_areas?: Array<MediaArea>;
    caption?: string;
    entities?: Array<MessageEntity>;
    privacy_rules: Array<InputPrivacyRule>;
    random_id: bigint;
    period?: number;
    fwd_from_id?: InputPeer;
    fwd_from_story?: number;
    albums?: Array<number>;
    [R]?: Updates;
}
export interface stories_editStory {
    _: "stories.editStory";
    peer: InputPeer;
    id: number;
    media?: InputMedia;
    media_areas?: Array<MediaArea>;
    caption?: string;
    entities?: Array<MessageEntity>;
    privacy_rules?: Array<InputPrivacyRule>;
    [R]?: Updates;
}
export interface stories_deleteStories {
    _: "stories.deleteStories";
    peer: InputPeer;
    id: Array<number>;
    [R]?: Array<number>;
}
export interface stories_togglePinned {
    _: "stories.togglePinned";
    peer: InputPeer;
    id: Array<number>;
    pinned: boolean;
    [R]?: Array<number>;
}
export interface stories_getAllStories {
    _: "stories.getAllStories";
    next?: true;
    hidden?: true;
    state?: string;
    [R]?: stories_AllStories;
}
export interface stories_getPinnedStories {
    _: "stories.getPinnedStories";
    peer: InputPeer;
    offset_id: number;
    limit: number;
    [R]?: stories_Stories;
}
export interface stories_getStoriesArchive {
    _: "stories.getStoriesArchive";
    peer: InputPeer;
    offset_id: number;
    limit: number;
    [R]?: stories_Stories;
}
export interface stories_getStoriesByID {
    _: "stories.getStoriesByID";
    peer: InputPeer;
    id: Array<number>;
    [R]?: stories_Stories;
}
export interface stories_toggleAllStoriesHidden {
    _: "stories.toggleAllStoriesHidden";
    hidden: boolean;
    [R]?: boolean;
}
export interface stories_readStories {
    _: "stories.readStories";
    peer: InputPeer;
    max_id: number;
    [R]?: Array<number>;
}
export interface stories_incrementStoryViews {
    _: "stories.incrementStoryViews";
    peer: InputPeer;
    id: Array<number>;
    [R]?: boolean;
}
export interface stories_getStoryViewsList {
    _: "stories.getStoryViewsList";
    just_contacts?: true;
    reactions_first?: true;
    forwards_first?: true;
    peer: InputPeer;
    q?: string;
    id: number;
    offset: string;
    limit: number;
    [R]?: stories_StoryViewsList;
}
export interface stories_getStoriesViews {
    _: "stories.getStoriesViews";
    peer: InputPeer;
    id: Array<number>;
    [R]?: stories_StoryViews;
}
export interface stories_exportStoryLink {
    _: "stories.exportStoryLink";
    peer: InputPeer;
    id: number;
    [R]?: ExportedStoryLink;
}
export interface stories_report {
    _: "stories.report";
    peer: InputPeer;
    id: Array<number>;
    option: Uint8Array<ArrayBuffer>;
    message: string;
    [R]?: ReportResult;
}
export interface stories_activateStealthMode {
    _: "stories.activateStealthMode";
    past?: true;
    future?: true;
    [R]?: Updates;
}
export interface stories_sendReaction {
    _: "stories.sendReaction";
    add_to_recent?: true;
    peer: InputPeer;
    story_id: number;
    reaction: Reaction;
    [R]?: Updates;
}
export interface stories_getPeerStories {
    _: "stories.getPeerStories";
    peer: InputPeer;
    [R]?: stories_PeerStories;
}
export interface stories_getAllReadPeerStories {
    _: "stories.getAllReadPeerStories";
    [R]?: Updates;
}
export interface stories_getPeerMaxIDs {
    _: "stories.getPeerMaxIDs";
    id: Array<InputPeer>;
    [R]?: Array<RecentStory>;
}
export interface stories_getChatsToSend {
    _: "stories.getChatsToSend";
    [R]?: messages_Chats;
}
export interface stories_togglePeerStoriesHidden {
    _: "stories.togglePeerStoriesHidden";
    peer: InputPeer;
    hidden: boolean;
    [R]?: boolean;
}
export interface stories_getStoryReactionsList {
    _: "stories.getStoryReactionsList";
    forwards_first?: true;
    peer: InputPeer;
    id: number;
    reaction?: Reaction;
    offset?: string;
    limit: number;
    [R]?: stories_StoryReactionsList;
}
export interface stories_togglePinnedToTop {
    _: "stories.togglePinnedToTop";
    peer: InputPeer;
    id: Array<number>;
    [R]?: boolean;
}
export interface stories_searchPosts {
    _: "stories.searchPosts";
    hashtag?: string;
    area?: MediaArea;
    peer?: InputPeer;
    offset: string;
    limit: number;
    [R]?: stories_FoundStories;
}
export interface stories_createAlbum {
    _: "stories.createAlbum";
    peer: InputPeer;
    title: string;
    stories: Array<number>;
    [R]?: StoryAlbum;
}
export interface stories_updateAlbum {
    _: "stories.updateAlbum";
    peer: InputPeer;
    album_id: number;
    title?: string;
    delete_stories?: Array<number>;
    add_stories?: Array<number>;
    order?: Array<number>;
    [R]?: StoryAlbum;
}
export interface stories_reorderAlbums {
    _: "stories.reorderAlbums";
    peer: InputPeer;
    order: Array<number>;
    [R]?: boolean;
}
export interface stories_deleteAlbum {
    _: "stories.deleteAlbum";
    peer: InputPeer;
    album_id: number;
    [R]?: boolean;
}
export interface stories_getAlbums {
    _: "stories.getAlbums";
    peer: InputPeer;
    hash: bigint;
    [R]?: stories_Albums;
}
export interface stories_getAlbumStories {
    _: "stories.getAlbumStories";
    peer: InputPeer;
    album_id: number;
    offset: number;
    limit: number;
    [R]?: stories_Stories;
}
export interface stories_startLive {
    _: "stories.startLive";
    pinned?: true;
    noforwards?: true;
    rtmp_stream?: true;
    peer: InputPeer;
    caption?: string;
    entities?: Array<MessageEntity>;
    privacy_rules: Array<InputPrivacyRule>;
    random_id: bigint;
    messages_enabled?: boolean;
    send_paid_messages_stars?: bigint;
    [R]?: Updates;
}
export interface premium_getBoostsList {
    _: "premium.getBoostsList";
    gifts?: true;
    peer: InputPeer;
    offset: string;
    limit: number;
    [R]?: premium_BoostsList;
}
export interface premium_getMyBoosts {
    _: "premium.getMyBoosts";
    [R]?: premium_MyBoosts;
}
export interface premium_applyBoost {
    _: "premium.applyBoost";
    slots?: Array<number>;
    peer: InputPeer;
    [R]?: premium_MyBoosts;
}
export interface premium_getBoostsStatus {
    _: "premium.getBoostsStatus";
    peer: InputPeer;
    [R]?: premium_BoostsStatus;
}
export interface premium_getUserBoosts {
    _: "premium.getUserBoosts";
    peer: InputPeer;
    user_id: InputUser;
    [R]?: premium_BoostsList;
}
export interface smsjobs_isEligibleToJoin {
    _: "smsjobs.isEligibleToJoin";
    [R]?: smsjobs_EligibilityToJoin;
}
export interface smsjobs_join {
    _: "smsjobs.join";
    [R]?: boolean;
}
export interface smsjobs_leave {
    _: "smsjobs.leave";
    [R]?: boolean;
}
export interface smsjobs_updateSettings {
    _: "smsjobs.updateSettings";
    allow_international?: true;
    [R]?: boolean;
}
export interface smsjobs_getStatus {
    _: "smsjobs.getStatus";
    [R]?: smsjobs_Status;
}
export interface smsjobs_getSmsJob {
    _: "smsjobs.getSmsJob";
    job_id: string;
    [R]?: SmsJob;
}
export interface smsjobs_finishJob {
    _: "smsjobs.finishJob";
    job_id: string;
    error?: string;
    [R]?: boolean;
}
export interface fragment_getCollectibleInfo {
    _: "fragment.getCollectibleInfo";
    collectible: InputCollectible;
    [R]?: fragment_CollectibleInfo;
}
export interface Types {
    "true": true_;
    "error": error;
    "ipPort": ipPort;
    "ipPortSecret": ipPortSecret;
    "accessPointRule": accessPointRule;
    "help.configSimple": help_configSimple;
    "inputPeerPhotoFileLocationLegacy": inputPeerPhotoFileLocationLegacy;
    "inputStickerSetThumbLegacy": inputStickerSetThumbLegacy;
    "inputPeerEmpty": inputPeerEmpty;
    "inputPeerSelf": inputPeerSelf;
    "inputPeerChat": inputPeerChat;
    "inputPeerUser": inputPeerUser;
    "inputPeerChannel": inputPeerChannel;
    "inputPeerUserFromMessage": inputPeerUserFromMessage;
    "inputPeerChannelFromMessage": inputPeerChannelFromMessage;
    "inputUserEmpty": inputUserEmpty;
    "inputUserSelf": inputUserSelf;
    "inputUser": inputUser;
    "inputUserFromMessage": inputUserFromMessage;
    "inputPhoneContact": inputPhoneContact;
    "inputFile": inputFile;
    "inputFileBig": inputFileBig;
    "inputFileStoryDocument": inputFileStoryDocument;
    "inputMediaEmpty": inputMediaEmpty;
    "inputMediaUploadedPhoto": inputMediaUploadedPhoto;
    "inputMediaPhoto": inputMediaPhoto;
    "inputMediaGeoPoint": inputMediaGeoPoint;
    "inputMediaContact": inputMediaContact;
    "inputMediaUploadedDocument": inputMediaUploadedDocument;
    "inputMediaDocument": inputMediaDocument;
    "inputMediaVenue": inputMediaVenue;
    "inputMediaPhotoExternal": inputMediaPhotoExternal;
    "inputMediaDocumentExternal": inputMediaDocumentExternal;
    "inputMediaGame": inputMediaGame;
    "inputMediaInvoice": inputMediaInvoice;
    "inputMediaGeoLive": inputMediaGeoLive;
    "inputMediaPoll": inputMediaPoll;
    "inputMediaDice": inputMediaDice;
    "inputMediaStory": inputMediaStory;
    "inputMediaWebPage": inputMediaWebPage;
    "inputMediaPaidMedia": inputMediaPaidMedia;
    "inputMediaTodo": inputMediaTodo;
    "inputMediaStakeDice": inputMediaStakeDice;
    "inputChatPhotoEmpty": inputChatPhotoEmpty;
    "inputChatUploadedPhoto": inputChatUploadedPhoto;
    "inputChatPhoto": inputChatPhoto;
    "inputGeoPointEmpty": inputGeoPointEmpty;
    "inputGeoPoint": inputGeoPoint;
    "inputPhotoEmpty": inputPhotoEmpty;
    "inputPhoto": inputPhoto;
    "inputFileLocation": inputFileLocation;
    "inputEncryptedFileLocation": inputEncryptedFileLocation;
    "inputDocumentFileLocation": inputDocumentFileLocation;
    "inputSecureFileLocation": inputSecureFileLocation;
    "inputTakeoutFileLocation": inputTakeoutFileLocation;
    "inputPhotoFileLocation": inputPhotoFileLocation;
    "inputPhotoLegacyFileLocation": inputPhotoLegacyFileLocation;
    "inputPeerPhotoFileLocation": inputPeerPhotoFileLocation;
    "inputStickerSetThumb": inputStickerSetThumb;
    "inputGroupCallStream": inputGroupCallStream;
    "peerUser": peerUser;
    "peerChat": peerChat;
    "peerChannel": peerChannel;
    "storage.fileUnknown": storage_fileUnknown;
    "storage.filePartial": storage_filePartial;
    "storage.fileJpeg": storage_fileJpeg;
    "storage.fileGif": storage_fileGif;
    "storage.filePng": storage_filePng;
    "storage.filePdf": storage_filePdf;
    "storage.fileMp3": storage_fileMp3;
    "storage.fileMov": storage_fileMov;
    "storage.fileMp4": storage_fileMp4;
    "storage.fileWebp": storage_fileWebp;
    "userEmpty": userEmpty;
    "user": user;
    "userProfilePhotoEmpty": userProfilePhotoEmpty;
    "userProfilePhoto": userProfilePhoto;
    "userStatusEmpty": userStatusEmpty;
    "userStatusOnline": userStatusOnline;
    "userStatusOffline": userStatusOffline;
    "userStatusRecently": userStatusRecently;
    "userStatusLastWeek": userStatusLastWeek;
    "userStatusLastMonth": userStatusLastMonth;
    "chatEmpty": chatEmpty;
    "chat": chat;
    "chatForbidden": chatForbidden;
    "channel": channel;
    "channelForbidden": channelForbidden;
    "chatFull": chatFull;
    "channelFull": channelFull;
    "chatParticipant": chatParticipant;
    "chatParticipantCreator": chatParticipantCreator;
    "chatParticipantAdmin": chatParticipantAdmin;
    "chatParticipantsForbidden": chatParticipantsForbidden;
    "chatParticipants": chatParticipants;
    "chatPhotoEmpty": chatPhotoEmpty;
    "chatPhoto": chatPhoto;
    "messageEmpty": messageEmpty;
    "message": message;
    "messageService": messageService;
    "messageMediaEmpty": messageMediaEmpty;
    "messageMediaPhoto": messageMediaPhoto;
    "messageMediaGeo": messageMediaGeo;
    "messageMediaContact": messageMediaContact;
    "messageMediaUnsupported": messageMediaUnsupported;
    "messageMediaDocument": messageMediaDocument;
    "messageMediaWebPage": messageMediaWebPage;
    "messageMediaVenue": messageMediaVenue;
    "messageMediaGame": messageMediaGame;
    "messageMediaInvoice": messageMediaInvoice;
    "messageMediaGeoLive": messageMediaGeoLive;
    "messageMediaPoll": messageMediaPoll;
    "messageMediaDice": messageMediaDice;
    "messageMediaStory": messageMediaStory;
    "messageMediaGiveaway": messageMediaGiveaway;
    "messageMediaGiveawayResults": messageMediaGiveawayResults;
    "messageMediaPaidMedia": messageMediaPaidMedia;
    "messageMediaToDo": messageMediaToDo;
    "messageMediaVideoStream": messageMediaVideoStream;
    "messageActionEmpty": messageActionEmpty;
    "messageActionChatCreate": messageActionChatCreate;
    "messageActionChatEditTitle": messageActionChatEditTitle;
    "messageActionChatEditPhoto": messageActionChatEditPhoto;
    "messageActionChatDeletePhoto": messageActionChatDeletePhoto;
    "messageActionChatAddUser": messageActionChatAddUser;
    "messageActionChatDeleteUser": messageActionChatDeleteUser;
    "messageActionChatJoinedByLink": messageActionChatJoinedByLink;
    "messageActionChannelCreate": messageActionChannelCreate;
    "messageActionChatMigrateTo": messageActionChatMigrateTo;
    "messageActionChannelMigrateFrom": messageActionChannelMigrateFrom;
    "messageActionPinMessage": messageActionPinMessage;
    "messageActionHistoryClear": messageActionHistoryClear;
    "messageActionGameScore": messageActionGameScore;
    "messageActionPaymentSentMe": messageActionPaymentSentMe;
    "messageActionPaymentSent": messageActionPaymentSent;
    "messageActionPhoneCall": messageActionPhoneCall;
    "messageActionScreenshotTaken": messageActionScreenshotTaken;
    "messageActionCustomAction": messageActionCustomAction;
    "messageActionBotAllowed": messageActionBotAllowed;
    "messageActionSecureValuesSentMe": messageActionSecureValuesSentMe;
    "messageActionSecureValuesSent": messageActionSecureValuesSent;
    "messageActionContactSignUp": messageActionContactSignUp;
    "messageActionGeoProximityReached": messageActionGeoProximityReached;
    "messageActionGroupCall": messageActionGroupCall;
    "messageActionInviteToGroupCall": messageActionInviteToGroupCall;
    "messageActionSetMessagesTTL": messageActionSetMessagesTTL;
    "messageActionGroupCallScheduled": messageActionGroupCallScheduled;
    "messageActionSetChatTheme": messageActionSetChatTheme;
    "messageActionChatJoinedByRequest": messageActionChatJoinedByRequest;
    "messageActionWebViewDataSentMe": messageActionWebViewDataSentMe;
    "messageActionWebViewDataSent": messageActionWebViewDataSent;
    "messageActionGiftPremium": messageActionGiftPremium;
    "messageActionTopicCreate": messageActionTopicCreate;
    "messageActionTopicEdit": messageActionTopicEdit;
    "messageActionSuggestProfilePhoto": messageActionSuggestProfilePhoto;
    "messageActionRequestedPeer": messageActionRequestedPeer;
    "messageActionSetChatWallPaper": messageActionSetChatWallPaper;
    "messageActionGiftCode": messageActionGiftCode;
    "messageActionGiveawayLaunch": messageActionGiveawayLaunch;
    "messageActionGiveawayResults": messageActionGiveawayResults;
    "messageActionBoostApply": messageActionBoostApply;
    "messageActionRequestedPeerSentMe": messageActionRequestedPeerSentMe;
    "messageActionPaymentRefunded": messageActionPaymentRefunded;
    "messageActionGiftStars": messageActionGiftStars;
    "messageActionPrizeStars": messageActionPrizeStars;
    "messageActionStarGift": messageActionStarGift;
    "messageActionStarGiftUnique": messageActionStarGiftUnique;
    "messageActionPaidMessagesRefunded": messageActionPaidMessagesRefunded;
    "messageActionPaidMessagesPrice": messageActionPaidMessagesPrice;
    "messageActionConferenceCall": messageActionConferenceCall;
    "messageActionTodoCompletions": messageActionTodoCompletions;
    "messageActionTodoAppendTasks": messageActionTodoAppendTasks;
    "messageActionSuggestedPostApproval": messageActionSuggestedPostApproval;
    "messageActionSuggestedPostSuccess": messageActionSuggestedPostSuccess;
    "messageActionSuggestedPostRefund": messageActionSuggestedPostRefund;
    "messageActionGiftTon": messageActionGiftTon;
    "messageActionSuggestBirthday": messageActionSuggestBirthday;
    "messageActionStarGiftPurchaseOffer": messageActionStarGiftPurchaseOffer;
    "messageActionStarGiftPurchaseOfferDeclined": messageActionStarGiftPurchaseOfferDeclined;
    "dialog": dialog;
    "dialogFolder": dialogFolder;
    "photoEmpty": photoEmpty;
    "photo": photo;
    "photoSizeEmpty": photoSizeEmpty;
    "photoSize": photoSize;
    "photoCachedSize": photoCachedSize;
    "photoStrippedSize": photoStrippedSize;
    "photoSizeProgressive": photoSizeProgressive;
    "photoPathSize": photoPathSize;
    "geoPointEmpty": geoPointEmpty;
    "geoPoint": geoPoint;
    "auth.sentCode": auth_sentCode;
    "auth.sentCodeSuccess": auth_sentCodeSuccess;
    "auth.sentCodePaymentRequired": auth_sentCodePaymentRequired;
    "auth.authorization": auth_authorization;
    "auth.authorizationSignUpRequired": auth_authorizationSignUpRequired;
    "auth.exportedAuthorization": auth_exportedAuthorization;
    "inputNotifyPeer": inputNotifyPeer;
    "inputNotifyUsers": inputNotifyUsers;
    "inputNotifyChats": inputNotifyChats;
    "inputNotifyBroadcasts": inputNotifyBroadcasts;
    "inputNotifyForumTopic": inputNotifyForumTopic;
    "inputPeerNotifySettings": inputPeerNotifySettings;
    "peerNotifySettings": peerNotifySettings;
    "peerSettings": peerSettings;
    "wallPaper": wallPaper;
    "wallPaperNoFile": wallPaperNoFile;
    "inputReportReasonSpam": inputReportReasonSpam;
    "inputReportReasonViolence": inputReportReasonViolence;
    "inputReportReasonPornography": inputReportReasonPornography;
    "inputReportReasonChildAbuse": inputReportReasonChildAbuse;
    "inputReportReasonOther": inputReportReasonOther;
    "inputReportReasonCopyright": inputReportReasonCopyright;
    "inputReportReasonGeoIrrelevant": inputReportReasonGeoIrrelevant;
    "inputReportReasonFake": inputReportReasonFake;
    "inputReportReasonIllegalDrugs": inputReportReasonIllegalDrugs;
    "inputReportReasonPersonalDetails": inputReportReasonPersonalDetails;
    "userFull": userFull;
    "contact": contact;
    "importedContact": importedContact;
    "contactStatus": contactStatus;
    "contacts.contactsNotModified": contacts_contactsNotModified;
    "contacts.contacts": contacts_contacts;
    "contacts.importedContacts": contacts_importedContacts;
    "contacts.blocked": contacts_blocked;
    "contacts.blockedSlice": contacts_blockedSlice;
    "messages.dialogs": messages_dialogs;
    "messages.dialogsSlice": messages_dialogsSlice;
    "messages.dialogsNotModified": messages_dialogsNotModified;
    "messages.messages": messages_messages;
    "messages.messagesSlice": messages_messagesSlice;
    "messages.channelMessages": messages_channelMessages;
    "messages.messagesNotModified": messages_messagesNotModified;
    "messages.chats": messages_chats;
    "messages.chatsSlice": messages_chatsSlice;
    "messages.chatFull": messages_chatFull;
    "messages.affectedHistory": messages_affectedHistory;
    "inputMessagesFilterEmpty": inputMessagesFilterEmpty;
    "inputMessagesFilterPhotos": inputMessagesFilterPhotos;
    "inputMessagesFilterVideo": inputMessagesFilterVideo;
    "inputMessagesFilterPhotoVideo": inputMessagesFilterPhotoVideo;
    "inputMessagesFilterDocument": inputMessagesFilterDocument;
    "inputMessagesFilterUrl": inputMessagesFilterUrl;
    "inputMessagesFilterGif": inputMessagesFilterGif;
    "inputMessagesFilterVoice": inputMessagesFilterVoice;
    "inputMessagesFilterMusic": inputMessagesFilterMusic;
    "inputMessagesFilterChatPhotos": inputMessagesFilterChatPhotos;
    "inputMessagesFilterPhoneCalls": inputMessagesFilterPhoneCalls;
    "inputMessagesFilterRoundVoice": inputMessagesFilterRoundVoice;
    "inputMessagesFilterRoundVideo": inputMessagesFilterRoundVideo;
    "inputMessagesFilterMyMentions": inputMessagesFilterMyMentions;
    "inputMessagesFilterGeo": inputMessagesFilterGeo;
    "inputMessagesFilterContacts": inputMessagesFilterContacts;
    "inputMessagesFilterPinned": inputMessagesFilterPinned;
    "updateNewMessage": updateNewMessage;
    "updateMessageID": updateMessageID;
    "updateDeleteMessages": updateDeleteMessages;
    "updateUserTyping": updateUserTyping;
    "updateChatUserTyping": updateChatUserTyping;
    "updateChatParticipants": updateChatParticipants;
    "updateUserStatus": updateUserStatus;
    "updateUserName": updateUserName;
    "updateNewAuthorization": updateNewAuthorization;
    "updateNewEncryptedMessage": updateNewEncryptedMessage;
    "updateEncryptedChatTyping": updateEncryptedChatTyping;
    "updateEncryption": updateEncryption;
    "updateEncryptedMessagesRead": updateEncryptedMessagesRead;
    "updateChatParticipantAdd": updateChatParticipantAdd;
    "updateChatParticipantDelete": updateChatParticipantDelete;
    "updateDcOptions": updateDcOptions;
    "updateNotifySettings": updateNotifySettings;
    "updateServiceNotification": updateServiceNotification;
    "updatePrivacy": updatePrivacy;
    "updateUserPhone": updateUserPhone;
    "updateReadHistoryInbox": updateReadHistoryInbox;
    "updateReadHistoryOutbox": updateReadHistoryOutbox;
    "updateWebPage": updateWebPage;
    "updateReadMessagesContents": updateReadMessagesContents;
    "updateChannelTooLong": updateChannelTooLong;
    "updateChannel": updateChannel;
    "updateNewChannelMessage": updateNewChannelMessage;
    "updateReadChannelInbox": updateReadChannelInbox;
    "updateDeleteChannelMessages": updateDeleteChannelMessages;
    "updateChannelMessageViews": updateChannelMessageViews;
    "updateChatParticipantAdmin": updateChatParticipantAdmin;
    "updateNewStickerSet": updateNewStickerSet;
    "updateStickerSetsOrder": updateStickerSetsOrder;
    "updateStickerSets": updateStickerSets;
    "updateSavedGifs": updateSavedGifs;
    "updateBotInlineQuery": updateBotInlineQuery;
    "updateBotInlineSend": updateBotInlineSend;
    "updateEditChannelMessage": updateEditChannelMessage;
    "updateBotCallbackQuery": updateBotCallbackQuery;
    "updateEditMessage": updateEditMessage;
    "updateInlineBotCallbackQuery": updateInlineBotCallbackQuery;
    "updateReadChannelOutbox": updateReadChannelOutbox;
    "updateDraftMessage": updateDraftMessage;
    "updateReadFeaturedStickers": updateReadFeaturedStickers;
    "updateRecentStickers": updateRecentStickers;
    "updateConfig": updateConfig;
    "updatePtsChanged": updatePtsChanged;
    "updateChannelWebPage": updateChannelWebPage;
    "updateDialogPinned": updateDialogPinned;
    "updatePinnedDialogs": updatePinnedDialogs;
    "updateBotWebhookJSON": updateBotWebhookJSON;
    "updateBotWebhookJSONQuery": updateBotWebhookJSONQuery;
    "updateBotShippingQuery": updateBotShippingQuery;
    "updateBotPrecheckoutQuery": updateBotPrecheckoutQuery;
    "updatePhoneCall": updatePhoneCall;
    "updateLangPackTooLong": updateLangPackTooLong;
    "updateLangPack": updateLangPack;
    "updateFavedStickers": updateFavedStickers;
    "updateChannelReadMessagesContents": updateChannelReadMessagesContents;
    "updateContactsReset": updateContactsReset;
    "updateChannelAvailableMessages": updateChannelAvailableMessages;
    "updateDialogUnreadMark": updateDialogUnreadMark;
    "updateMessagePoll": updateMessagePoll;
    "updateChatDefaultBannedRights": updateChatDefaultBannedRights;
    "updateFolderPeers": updateFolderPeers;
    "updatePeerSettings": updatePeerSettings;
    "updatePeerLocated": updatePeerLocated;
    "updateNewScheduledMessage": updateNewScheduledMessage;
    "updateDeleteScheduledMessages": updateDeleteScheduledMessages;
    "updateTheme": updateTheme;
    "updateGeoLiveViewed": updateGeoLiveViewed;
    "updateLoginToken": updateLoginToken;
    "updateMessagePollVote": updateMessagePollVote;
    "updateDialogFilter": updateDialogFilter;
    "updateDialogFilterOrder": updateDialogFilterOrder;
    "updateDialogFilters": updateDialogFilters;
    "updatePhoneCallSignalingData": updatePhoneCallSignalingData;
    "updateChannelMessageForwards": updateChannelMessageForwards;
    "updateReadChannelDiscussionInbox": updateReadChannelDiscussionInbox;
    "updateReadChannelDiscussionOutbox": updateReadChannelDiscussionOutbox;
    "updatePeerBlocked": updatePeerBlocked;
    "updateChannelUserTyping": updateChannelUserTyping;
    "updatePinnedMessages": updatePinnedMessages;
    "updatePinnedChannelMessages": updatePinnedChannelMessages;
    "updateChat": updateChat;
    "updateGroupCallParticipants": updateGroupCallParticipants;
    "updateGroupCall": updateGroupCall;
    "updatePeerHistoryTTL": updatePeerHistoryTTL;
    "updateChatParticipant": updateChatParticipant;
    "updateChannelParticipant": updateChannelParticipant;
    "updateBotStopped": updateBotStopped;
    "updateGroupCallConnection": updateGroupCallConnection;
    "updateBotCommands": updateBotCommands;
    "updatePendingJoinRequests": updatePendingJoinRequests;
    "updateBotChatInviteRequester": updateBotChatInviteRequester;
    "updateMessageReactions": updateMessageReactions;
    "updateAttachMenuBots": updateAttachMenuBots;
    "updateWebViewResultSent": updateWebViewResultSent;
    "updateBotMenuButton": updateBotMenuButton;
    "updateSavedRingtones": updateSavedRingtones;
    "updateTranscribedAudio": updateTranscribedAudio;
    "updateReadFeaturedEmojiStickers": updateReadFeaturedEmojiStickers;
    "updateUserEmojiStatus": updateUserEmojiStatus;
    "updateRecentEmojiStatuses": updateRecentEmojiStatuses;
    "updateRecentReactions": updateRecentReactions;
    "updateMoveStickerSetToTop": updateMoveStickerSetToTop;
    "updateMessageExtendedMedia": updateMessageExtendedMedia;
    "updateUser": updateUser;
    "updateAutoSaveSettings": updateAutoSaveSettings;
    "updateStory": updateStory;
    "updateReadStories": updateReadStories;
    "updateStoryID": updateStoryID;
    "updateStoriesStealthMode": updateStoriesStealthMode;
    "updateSentStoryReaction": updateSentStoryReaction;
    "updateBotChatBoost": updateBotChatBoost;
    "updateChannelViewForumAsMessages": updateChannelViewForumAsMessages;
    "updatePeerWallpaper": updatePeerWallpaper;
    "updateBotMessageReaction": updateBotMessageReaction;
    "updateBotMessageReactions": updateBotMessageReactions;
    "updateSavedDialogPinned": updateSavedDialogPinned;
    "updatePinnedSavedDialogs": updatePinnedSavedDialogs;
    "updateSavedReactionTags": updateSavedReactionTags;
    "updateSmsJob": updateSmsJob;
    "updateQuickReplies": updateQuickReplies;
    "updateNewQuickReply": updateNewQuickReply;
    "updateDeleteQuickReply": updateDeleteQuickReply;
    "updateQuickReplyMessage": updateQuickReplyMessage;
    "updateDeleteQuickReplyMessages": updateDeleteQuickReplyMessages;
    "updateBotBusinessConnect": updateBotBusinessConnect;
    "updateBotNewBusinessMessage": updateBotNewBusinessMessage;
    "updateBotEditBusinessMessage": updateBotEditBusinessMessage;
    "updateBotDeleteBusinessMessage": updateBotDeleteBusinessMessage;
    "updateNewStoryReaction": updateNewStoryReaction;
    "updateStarsBalance": updateStarsBalance;
    "updateBusinessBotCallbackQuery": updateBusinessBotCallbackQuery;
    "updateStarsRevenueStatus": updateStarsRevenueStatus;
    "updateBotPurchasedPaidMedia": updateBotPurchasedPaidMedia;
    "updatePaidReactionPrivacy": updatePaidReactionPrivacy;
    "updateSentPhoneCode": updateSentPhoneCode;
    "updateGroupCallChainBlocks": updateGroupCallChainBlocks;
    "updateReadMonoForumInbox": updateReadMonoForumInbox;
    "updateReadMonoForumOutbox": updateReadMonoForumOutbox;
    "updateMonoForumNoPaidException": updateMonoForumNoPaidException;
    "updateGroupCallMessage": updateGroupCallMessage;
    "updateGroupCallEncryptedMessage": updateGroupCallEncryptedMessage;
    "updatePinnedForumTopic": updatePinnedForumTopic;
    "updatePinnedForumTopics": updatePinnedForumTopics;
    "updateDeleteGroupCallMessages": updateDeleteGroupCallMessages;
    "updateStarGiftAuctionState": updateStarGiftAuctionState;
    "updateStarGiftAuctionUserState": updateStarGiftAuctionUserState;
    "updateEmojiGameInfo": updateEmojiGameInfo;
    "updates.state": updates_state;
    "updates.differenceEmpty": updates_differenceEmpty;
    "updates.difference": updates_difference;
    "updates.differenceSlice": updates_differenceSlice;
    "updates.differenceTooLong": updates_differenceTooLong;
    "updatesTooLong": updatesTooLong;
    "updateShortMessage": updateShortMessage;
    "updateShortChatMessage": updateShortChatMessage;
    "updateShort": updateShort;
    "updatesCombined": updatesCombined;
    "updates": updates;
    "updateShortSentMessage": updateShortSentMessage;
    "photos.photos": photos_photos;
    "photos.photosSlice": photos_photosSlice;
    "photos.photo": photos_photo;
    "upload.file": upload_file;
    "upload.fileCdnRedirect": upload_fileCdnRedirect;
    "dcOption": dcOption;
    "config": config;
    "nearestDc": nearestDc;
    "help.appUpdate": help_appUpdate;
    "help.noAppUpdate": help_noAppUpdate;
    "help.inviteText": help_inviteText;
    "encryptedChatEmpty": encryptedChatEmpty;
    "encryptedChatWaiting": encryptedChatWaiting;
    "encryptedChatRequested": encryptedChatRequested;
    "encryptedChat": encryptedChat;
    "encryptedChatDiscarded": encryptedChatDiscarded;
    "inputEncryptedChat": inputEncryptedChat;
    "encryptedFileEmpty": encryptedFileEmpty;
    "encryptedFile": encryptedFile;
    "inputEncryptedFileEmpty": inputEncryptedFileEmpty;
    "inputEncryptedFileUploaded": inputEncryptedFileUploaded;
    "inputEncryptedFile": inputEncryptedFile;
    "inputEncryptedFileBigUploaded": inputEncryptedFileBigUploaded;
    "encryptedMessage": encryptedMessage;
    "encryptedMessageService": encryptedMessageService;
    "messages.dhConfigNotModified": messages_dhConfigNotModified;
    "messages.dhConfig": messages_dhConfig;
    "messages.sentEncryptedMessage": messages_sentEncryptedMessage;
    "messages.sentEncryptedFile": messages_sentEncryptedFile;
    "inputDocumentEmpty": inputDocumentEmpty;
    "inputDocument": inputDocument;
    "documentEmpty": documentEmpty;
    "document": document;
    "help.support": help_support;
    "notifyPeer": notifyPeer;
    "notifyUsers": notifyUsers;
    "notifyChats": notifyChats;
    "notifyBroadcasts": notifyBroadcasts;
    "notifyForumTopic": notifyForumTopic;
    "sendMessageTypingAction": sendMessageTypingAction;
    "sendMessageCancelAction": sendMessageCancelAction;
    "sendMessageRecordVideoAction": sendMessageRecordVideoAction;
    "sendMessageUploadVideoAction": sendMessageUploadVideoAction;
    "sendMessageRecordAudioAction": sendMessageRecordAudioAction;
    "sendMessageUploadAudioAction": sendMessageUploadAudioAction;
    "sendMessageUploadPhotoAction": sendMessageUploadPhotoAction;
    "sendMessageUploadDocumentAction": sendMessageUploadDocumentAction;
    "sendMessageGeoLocationAction": sendMessageGeoLocationAction;
    "sendMessageChooseContactAction": sendMessageChooseContactAction;
    "sendMessageGamePlayAction": sendMessageGamePlayAction;
    "sendMessageRecordRoundAction": sendMessageRecordRoundAction;
    "sendMessageUploadRoundAction": sendMessageUploadRoundAction;
    "speakingInGroupCallAction": speakingInGroupCallAction;
    "sendMessageHistoryImportAction": sendMessageHistoryImportAction;
    "sendMessageChooseStickerAction": sendMessageChooseStickerAction;
    "sendMessageEmojiInteraction": sendMessageEmojiInteraction;
    "sendMessageEmojiInteractionSeen": sendMessageEmojiInteractionSeen;
    "sendMessageTextDraftAction": sendMessageTextDraftAction;
    "contacts.found": contacts_found;
    "inputPrivacyKeyStatusTimestamp": inputPrivacyKeyStatusTimestamp;
    "inputPrivacyKeyChatInvite": inputPrivacyKeyChatInvite;
    "inputPrivacyKeyPhoneCall": inputPrivacyKeyPhoneCall;
    "inputPrivacyKeyPhoneP2P": inputPrivacyKeyPhoneP2P;
    "inputPrivacyKeyForwards": inputPrivacyKeyForwards;
    "inputPrivacyKeyProfilePhoto": inputPrivacyKeyProfilePhoto;
    "inputPrivacyKeyPhoneNumber": inputPrivacyKeyPhoneNumber;
    "inputPrivacyKeyAddedByPhone": inputPrivacyKeyAddedByPhone;
    "inputPrivacyKeyVoiceMessages": inputPrivacyKeyVoiceMessages;
    "inputPrivacyKeyAbout": inputPrivacyKeyAbout;
    "inputPrivacyKeyBirthday": inputPrivacyKeyBirthday;
    "inputPrivacyKeyStarGiftsAutoSave": inputPrivacyKeyStarGiftsAutoSave;
    "inputPrivacyKeyNoPaidMessages": inputPrivacyKeyNoPaidMessages;
    "inputPrivacyKeySavedMusic": inputPrivacyKeySavedMusic;
    "privacyKeyStatusTimestamp": privacyKeyStatusTimestamp;
    "privacyKeyChatInvite": privacyKeyChatInvite;
    "privacyKeyPhoneCall": privacyKeyPhoneCall;
    "privacyKeyPhoneP2P": privacyKeyPhoneP2P;
    "privacyKeyForwards": privacyKeyForwards;
    "privacyKeyProfilePhoto": privacyKeyProfilePhoto;
    "privacyKeyPhoneNumber": privacyKeyPhoneNumber;
    "privacyKeyAddedByPhone": privacyKeyAddedByPhone;
    "privacyKeyVoiceMessages": privacyKeyVoiceMessages;
    "privacyKeyAbout": privacyKeyAbout;
    "privacyKeyBirthday": privacyKeyBirthday;
    "privacyKeyStarGiftsAutoSave": privacyKeyStarGiftsAutoSave;
    "privacyKeyNoPaidMessages": privacyKeyNoPaidMessages;
    "privacyKeySavedMusic": privacyKeySavedMusic;
    "inputPrivacyValueAllowContacts": inputPrivacyValueAllowContacts;
    "inputPrivacyValueAllowAll": inputPrivacyValueAllowAll;
    "inputPrivacyValueAllowUsers": inputPrivacyValueAllowUsers;
    "inputPrivacyValueDisallowContacts": inputPrivacyValueDisallowContacts;
    "inputPrivacyValueDisallowAll": inputPrivacyValueDisallowAll;
    "inputPrivacyValueDisallowUsers": inputPrivacyValueDisallowUsers;
    "inputPrivacyValueAllowChatParticipants": inputPrivacyValueAllowChatParticipants;
    "inputPrivacyValueDisallowChatParticipants": inputPrivacyValueDisallowChatParticipants;
    "inputPrivacyValueAllowCloseFriends": inputPrivacyValueAllowCloseFriends;
    "inputPrivacyValueAllowPremium": inputPrivacyValueAllowPremium;
    "inputPrivacyValueAllowBots": inputPrivacyValueAllowBots;
    "inputPrivacyValueDisallowBots": inputPrivacyValueDisallowBots;
    "privacyValueAllowContacts": privacyValueAllowContacts;
    "privacyValueAllowAll": privacyValueAllowAll;
    "privacyValueAllowUsers": privacyValueAllowUsers;
    "privacyValueDisallowContacts": privacyValueDisallowContacts;
    "privacyValueDisallowAll": privacyValueDisallowAll;
    "privacyValueDisallowUsers": privacyValueDisallowUsers;
    "privacyValueAllowChatParticipants": privacyValueAllowChatParticipants;
    "privacyValueDisallowChatParticipants": privacyValueDisallowChatParticipants;
    "privacyValueAllowCloseFriends": privacyValueAllowCloseFriends;
    "privacyValueAllowPremium": privacyValueAllowPremium;
    "privacyValueAllowBots": privacyValueAllowBots;
    "privacyValueDisallowBots": privacyValueDisallowBots;
    "account.privacyRules": account_privacyRules;
    "accountDaysTTL": accountDaysTTL;
    "documentAttributeImageSize": documentAttributeImageSize;
    "documentAttributeAnimated": documentAttributeAnimated;
    "documentAttributeSticker": documentAttributeSticker;
    "documentAttributeVideo": documentAttributeVideo;
    "documentAttributeAudio": documentAttributeAudio;
    "documentAttributeFilename": documentAttributeFilename;
    "documentAttributeHasStickers": documentAttributeHasStickers;
    "documentAttributeCustomEmoji": documentAttributeCustomEmoji;
    "messages.stickersNotModified": messages_stickersNotModified;
    "messages.stickers": messages_stickers;
    "stickerPack": stickerPack;
    "messages.allStickersNotModified": messages_allStickersNotModified;
    "messages.allStickers": messages_allStickers;
    "messages.affectedMessages": messages_affectedMessages;
    "webPageEmpty": webPageEmpty;
    "webPagePending": webPagePending;
    "webPage": webPage;
    "webPageNotModified": webPageNotModified;
    "authorization": authorization;
    "account.authorizations": account_authorizations;
    "account.password": account_password;
    "account.passwordSettings": account_passwordSettings;
    "account.passwordInputSettings": account_passwordInputSettings;
    "auth.passwordRecovery": auth_passwordRecovery;
    "receivedNotifyMessage": receivedNotifyMessage;
    "chatInviteExported": chatInviteExported;
    "chatInvitePublicJoinRequests": chatInvitePublicJoinRequests;
    "chatInviteAlready": chatInviteAlready;
    "chatInvite": chatInvite;
    "chatInvitePeek": chatInvitePeek;
    "inputStickerSetEmpty": inputStickerSetEmpty;
    "inputStickerSetID": inputStickerSetID;
    "inputStickerSetShortName": inputStickerSetShortName;
    "inputStickerSetAnimatedEmoji": inputStickerSetAnimatedEmoji;
    "inputStickerSetDice": inputStickerSetDice;
    "inputStickerSetAnimatedEmojiAnimations": inputStickerSetAnimatedEmojiAnimations;
    "inputStickerSetPremiumGifts": inputStickerSetPremiumGifts;
    "inputStickerSetEmojiGenericAnimations": inputStickerSetEmojiGenericAnimations;
    "inputStickerSetEmojiDefaultStatuses": inputStickerSetEmojiDefaultStatuses;
    "inputStickerSetEmojiDefaultTopicIcons": inputStickerSetEmojiDefaultTopicIcons;
    "inputStickerSetEmojiChannelDefaultStatuses": inputStickerSetEmojiChannelDefaultStatuses;
    "inputStickerSetTonGifts": inputStickerSetTonGifts;
    "stickerSet": stickerSet;
    "messages.stickerSet": messages_stickerSet;
    "messages.stickerSetNotModified": messages_stickerSetNotModified;
    "botCommand": botCommand;
    "botInfo": botInfo;
    "keyboardButton": keyboardButton;
    "keyboardButtonUrl": keyboardButtonUrl;
    "keyboardButtonCallback": keyboardButtonCallback;
    "keyboardButtonRequestPhone": keyboardButtonRequestPhone;
    "keyboardButtonRequestGeoLocation": keyboardButtonRequestGeoLocation;
    "keyboardButtonSwitchInline": keyboardButtonSwitchInline;
    "keyboardButtonGame": keyboardButtonGame;
    "keyboardButtonBuy": keyboardButtonBuy;
    "keyboardButtonUrlAuth": keyboardButtonUrlAuth;
    "inputKeyboardButtonUrlAuth": inputKeyboardButtonUrlAuth;
    "keyboardButtonRequestPoll": keyboardButtonRequestPoll;
    "inputKeyboardButtonUserProfile": inputKeyboardButtonUserProfile;
    "keyboardButtonUserProfile": keyboardButtonUserProfile;
    "keyboardButtonWebView": keyboardButtonWebView;
    "keyboardButtonSimpleWebView": keyboardButtonSimpleWebView;
    "keyboardButtonRequestPeer": keyboardButtonRequestPeer;
    "inputKeyboardButtonRequestPeer": inputKeyboardButtonRequestPeer;
    "keyboardButtonCopy": keyboardButtonCopy;
    "keyboardButtonRow": keyboardButtonRow;
    "replyKeyboardHide": replyKeyboardHide;
    "replyKeyboardForceReply": replyKeyboardForceReply;
    "replyKeyboardMarkup": replyKeyboardMarkup;
    "replyInlineMarkup": replyInlineMarkup;
    "messageEntityUnknown": messageEntityUnknown;
    "messageEntityMention": messageEntityMention;
    "messageEntityHashtag": messageEntityHashtag;
    "messageEntityBotCommand": messageEntityBotCommand;
    "messageEntityUrl": messageEntityUrl;
    "messageEntityEmail": messageEntityEmail;
    "messageEntityBold": messageEntityBold;
    "messageEntityItalic": messageEntityItalic;
    "messageEntityCode": messageEntityCode;
    "messageEntityPre": messageEntityPre;
    "messageEntityTextUrl": messageEntityTextUrl;
    "messageEntityMentionName": messageEntityMentionName;
    "inputMessageEntityMentionName": inputMessageEntityMentionName;
    "messageEntityPhone": messageEntityPhone;
    "messageEntityCashtag": messageEntityCashtag;
    "messageEntityUnderline": messageEntityUnderline;
    "messageEntityStrike": messageEntityStrike;
    "messageEntityBankCard": messageEntityBankCard;
    "messageEntitySpoiler": messageEntitySpoiler;
    "messageEntityCustomEmoji": messageEntityCustomEmoji;
    "messageEntityBlockquote": messageEntityBlockquote;
    "inputChannelEmpty": inputChannelEmpty;
    "inputChannel": inputChannel;
    "inputChannelFromMessage": inputChannelFromMessage;
    "contacts.resolvedPeer": contacts_resolvedPeer;
    "messageRange": messageRange;
    "updates.channelDifferenceEmpty": updates_channelDifferenceEmpty;
    "updates.channelDifferenceTooLong": updates_channelDifferenceTooLong;
    "updates.channelDifference": updates_channelDifference;
    "channelMessagesFilterEmpty": channelMessagesFilterEmpty;
    "channelMessagesFilter": channelMessagesFilter;
    "channelParticipant": channelParticipant;
    "channelParticipantSelf": channelParticipantSelf;
    "channelParticipantCreator": channelParticipantCreator;
    "channelParticipantAdmin": channelParticipantAdmin;
    "channelParticipantBanned": channelParticipantBanned;
    "channelParticipantLeft": channelParticipantLeft;
    "channelParticipantsRecent": channelParticipantsRecent;
    "channelParticipantsAdmins": channelParticipantsAdmins;
    "channelParticipantsKicked": channelParticipantsKicked;
    "channelParticipantsBots": channelParticipantsBots;
    "channelParticipantsBanned": channelParticipantsBanned;
    "channelParticipantsSearch": channelParticipantsSearch;
    "channelParticipantsContacts": channelParticipantsContacts;
    "channelParticipantsMentions": channelParticipantsMentions;
    "channels.channelParticipants": channels_channelParticipants;
    "channels.channelParticipantsNotModified": channels_channelParticipantsNotModified;
    "channels.channelParticipant": channels_channelParticipant;
    "help.termsOfService": help_termsOfService;
    "messages.savedGifsNotModified": messages_savedGifsNotModified;
    "messages.savedGifs": messages_savedGifs;
    "inputBotInlineMessageMediaAuto": inputBotInlineMessageMediaAuto;
    "inputBotInlineMessageText": inputBotInlineMessageText;
    "inputBotInlineMessageMediaGeo": inputBotInlineMessageMediaGeo;
    "inputBotInlineMessageMediaVenue": inputBotInlineMessageMediaVenue;
    "inputBotInlineMessageMediaContact": inputBotInlineMessageMediaContact;
    "inputBotInlineMessageGame": inputBotInlineMessageGame;
    "inputBotInlineMessageMediaInvoice": inputBotInlineMessageMediaInvoice;
    "inputBotInlineMessageMediaWebPage": inputBotInlineMessageMediaWebPage;
    "inputBotInlineResult": inputBotInlineResult;
    "inputBotInlineResultPhoto": inputBotInlineResultPhoto;
    "inputBotInlineResultDocument": inputBotInlineResultDocument;
    "inputBotInlineResultGame": inputBotInlineResultGame;
    "botInlineMessageMediaAuto": botInlineMessageMediaAuto;
    "botInlineMessageText": botInlineMessageText;
    "botInlineMessageMediaGeo": botInlineMessageMediaGeo;
    "botInlineMessageMediaVenue": botInlineMessageMediaVenue;
    "botInlineMessageMediaContact": botInlineMessageMediaContact;
    "botInlineMessageMediaInvoice": botInlineMessageMediaInvoice;
    "botInlineMessageMediaWebPage": botInlineMessageMediaWebPage;
    "botInlineResult": botInlineResult;
    "botInlineMediaResult": botInlineMediaResult;
    "messages.botResults": messages_botResults;
    "exportedMessageLink": exportedMessageLink;
    "messageFwdHeader": messageFwdHeader;
    "auth.codeTypeSms": auth_codeTypeSms;
    "auth.codeTypeCall": auth_codeTypeCall;
    "auth.codeTypeFlashCall": auth_codeTypeFlashCall;
    "auth.codeTypeMissedCall": auth_codeTypeMissedCall;
    "auth.codeTypeFragmentSms": auth_codeTypeFragmentSms;
    "auth.sentCodeTypeApp": auth_sentCodeTypeApp;
    "auth.sentCodeTypeSms": auth_sentCodeTypeSms;
    "auth.sentCodeTypeCall": auth_sentCodeTypeCall;
    "auth.sentCodeTypeFlashCall": auth_sentCodeTypeFlashCall;
    "auth.sentCodeTypeMissedCall": auth_sentCodeTypeMissedCall;
    "auth.sentCodeTypeEmailCode": auth_sentCodeTypeEmailCode;
    "auth.sentCodeTypeSetUpEmailRequired": auth_sentCodeTypeSetUpEmailRequired;
    "auth.sentCodeTypeFragmentSms": auth_sentCodeTypeFragmentSms;
    "auth.sentCodeTypeFirebaseSms": auth_sentCodeTypeFirebaseSms;
    "auth.sentCodeTypeSmsWord": auth_sentCodeTypeSmsWord;
    "auth.sentCodeTypeSmsPhrase": auth_sentCodeTypeSmsPhrase;
    "messages.botCallbackAnswer": messages_botCallbackAnswer;
    "messages.messageEditData": messages_messageEditData;
    "inputBotInlineMessageID": inputBotInlineMessageID;
    "inputBotInlineMessageID64": inputBotInlineMessageID64;
    "inlineBotSwitchPM": inlineBotSwitchPM;
    "messages.peerDialogs": messages_peerDialogs;
    "topPeer": topPeer;
    "topPeerCategoryBotsPM": topPeerCategoryBotsPM;
    "topPeerCategoryBotsInline": topPeerCategoryBotsInline;
    "topPeerCategoryCorrespondents": topPeerCategoryCorrespondents;
    "topPeerCategoryGroups": topPeerCategoryGroups;
    "topPeerCategoryChannels": topPeerCategoryChannels;
    "topPeerCategoryPhoneCalls": topPeerCategoryPhoneCalls;
    "topPeerCategoryForwardUsers": topPeerCategoryForwardUsers;
    "topPeerCategoryForwardChats": topPeerCategoryForwardChats;
    "topPeerCategoryBotsApp": topPeerCategoryBotsApp;
    "topPeerCategoryPeers": topPeerCategoryPeers;
    "contacts.topPeersNotModified": contacts_topPeersNotModified;
    "contacts.topPeers": contacts_topPeers;
    "contacts.topPeersDisabled": contacts_topPeersDisabled;
    "draftMessageEmpty": draftMessageEmpty;
    "draftMessage": draftMessage;
    "messages.featuredStickersNotModified": messages_featuredStickersNotModified;
    "messages.featuredStickers": messages_featuredStickers;
    "messages.recentStickersNotModified": messages_recentStickersNotModified;
    "messages.recentStickers": messages_recentStickers;
    "messages.archivedStickers": messages_archivedStickers;
    "messages.stickerSetInstallResultSuccess": messages_stickerSetInstallResultSuccess;
    "messages.stickerSetInstallResultArchive": messages_stickerSetInstallResultArchive;
    "stickerSetCovered": stickerSetCovered;
    "stickerSetMultiCovered": stickerSetMultiCovered;
    "stickerSetFullCovered": stickerSetFullCovered;
    "stickerSetNoCovered": stickerSetNoCovered;
    "maskCoords": maskCoords;
    "inputStickeredMediaPhoto": inputStickeredMediaPhoto;
    "inputStickeredMediaDocument": inputStickeredMediaDocument;
    "game": game;
    "inputGameID": inputGameID;
    "inputGameShortName": inputGameShortName;
    "highScore": highScore;
    "messages.highScores": messages_highScores;
    "textEmpty": textEmpty;
    "textPlain": textPlain;
    "textBold": textBold;
    "textItalic": textItalic;
    "textUnderline": textUnderline;
    "textStrike": textStrike;
    "textFixed": textFixed;
    "textUrl": textUrl;
    "textEmail": textEmail;
    "textConcat": textConcat;
    "textSubscript": textSubscript;
    "textSuperscript": textSuperscript;
    "textMarked": textMarked;
    "textPhone": textPhone;
    "textImage": textImage;
    "textAnchor": textAnchor;
    "pageBlockUnsupported": pageBlockUnsupported;
    "pageBlockTitle": pageBlockTitle;
    "pageBlockSubtitle": pageBlockSubtitle;
    "pageBlockAuthorDate": pageBlockAuthorDate;
    "pageBlockHeader": pageBlockHeader;
    "pageBlockSubheader": pageBlockSubheader;
    "pageBlockParagraph": pageBlockParagraph;
    "pageBlockPreformatted": pageBlockPreformatted;
    "pageBlockFooter": pageBlockFooter;
    "pageBlockDivider": pageBlockDivider;
    "pageBlockAnchor": pageBlockAnchor;
    "pageBlockList": pageBlockList;
    "pageBlockBlockquote": pageBlockBlockquote;
    "pageBlockPullquote": pageBlockPullquote;
    "pageBlockPhoto": pageBlockPhoto;
    "pageBlockVideo": pageBlockVideo;
    "pageBlockCover": pageBlockCover;
    "pageBlockEmbed": pageBlockEmbed;
    "pageBlockEmbedPost": pageBlockEmbedPost;
    "pageBlockCollage": pageBlockCollage;
    "pageBlockSlideshow": pageBlockSlideshow;
    "pageBlockChannel": pageBlockChannel;
    "pageBlockAudio": pageBlockAudio;
    "pageBlockKicker": pageBlockKicker;
    "pageBlockTable": pageBlockTable;
    "pageBlockOrderedList": pageBlockOrderedList;
    "pageBlockDetails": pageBlockDetails;
    "pageBlockRelatedArticles": pageBlockRelatedArticles;
    "pageBlockMap": pageBlockMap;
    "phoneCallDiscardReasonMissed": phoneCallDiscardReasonMissed;
    "phoneCallDiscardReasonDisconnect": phoneCallDiscardReasonDisconnect;
    "phoneCallDiscardReasonHangup": phoneCallDiscardReasonHangup;
    "phoneCallDiscardReasonBusy": phoneCallDiscardReasonBusy;
    "phoneCallDiscardReasonMigrateConferenceCall": phoneCallDiscardReasonMigrateConferenceCall;
    "dataJSON": dataJSON;
    "labeledPrice": labeledPrice;
    "invoice": invoice;
    "paymentCharge": paymentCharge;
    "postAddress": postAddress;
    "paymentRequestedInfo": paymentRequestedInfo;
    "paymentSavedCredentialsCard": paymentSavedCredentialsCard;
    "webDocument": webDocument;
    "webDocumentNoProxy": webDocumentNoProxy;
    "inputWebDocument": inputWebDocument;
    "inputWebFileLocation": inputWebFileLocation;
    "inputWebFileGeoPointLocation": inputWebFileGeoPointLocation;
    "inputWebFileAudioAlbumThumbLocation": inputWebFileAudioAlbumThumbLocation;
    "upload.webFile": upload_webFile;
    "payments.paymentForm": payments_paymentForm;
    "payments.paymentFormStars": payments_paymentFormStars;
    "payments.paymentFormStarGift": payments_paymentFormStarGift;
    "payments.validatedRequestedInfo": payments_validatedRequestedInfo;
    "payments.paymentResult": payments_paymentResult;
    "payments.paymentVerificationNeeded": payments_paymentVerificationNeeded;
    "payments.paymentReceipt": payments_paymentReceipt;
    "payments.paymentReceiptStars": payments_paymentReceiptStars;
    "payments.savedInfo": payments_savedInfo;
    "inputPaymentCredentialsSaved": inputPaymentCredentialsSaved;
    "inputPaymentCredentials": inputPaymentCredentials;
    "inputPaymentCredentialsApplePay": inputPaymentCredentialsApplePay;
    "inputPaymentCredentialsGooglePay": inputPaymentCredentialsGooglePay;
    "account.tmpPassword": account_tmpPassword;
    "shippingOption": shippingOption;
    "inputStickerSetItem": inputStickerSetItem;
    "inputPhoneCall": inputPhoneCall;
    "phoneCallEmpty": phoneCallEmpty;
    "phoneCallWaiting": phoneCallWaiting;
    "phoneCallRequested": phoneCallRequested;
    "phoneCallAccepted": phoneCallAccepted;
    "phoneCall": phoneCall;
    "phoneCallDiscarded": phoneCallDiscarded;
    "phoneConnection": phoneConnection;
    "phoneConnectionWebrtc": phoneConnectionWebrtc;
    "phoneCallProtocol": phoneCallProtocol;
    "phone.phoneCall": phone_phoneCall;
    "upload.cdnFileReuploadNeeded": upload_cdnFileReuploadNeeded;
    "upload.cdnFile": upload_cdnFile;
    "cdnPublicKey": cdnPublicKey;
    "cdnConfig": cdnConfig;
    "langPackString": langPackString;
    "langPackStringPluralized": langPackStringPluralized;
    "langPackStringDeleted": langPackStringDeleted;
    "langPackDifference": langPackDifference;
    "langPackLanguage": langPackLanguage;
    "channelAdminLogEventActionChangeTitle": channelAdminLogEventActionChangeTitle;
    "channelAdminLogEventActionChangeAbout": channelAdminLogEventActionChangeAbout;
    "channelAdminLogEventActionChangeUsername": channelAdminLogEventActionChangeUsername;
    "channelAdminLogEventActionChangePhoto": channelAdminLogEventActionChangePhoto;
    "channelAdminLogEventActionToggleInvites": channelAdminLogEventActionToggleInvites;
    "channelAdminLogEventActionToggleSignatures": channelAdminLogEventActionToggleSignatures;
    "channelAdminLogEventActionUpdatePinned": channelAdminLogEventActionUpdatePinned;
    "channelAdminLogEventActionEditMessage": channelAdminLogEventActionEditMessage;
    "channelAdminLogEventActionDeleteMessage": channelAdminLogEventActionDeleteMessage;
    "channelAdminLogEventActionParticipantJoin": channelAdminLogEventActionParticipantJoin;
    "channelAdminLogEventActionParticipantLeave": channelAdminLogEventActionParticipantLeave;
    "channelAdminLogEventActionParticipantInvite": channelAdminLogEventActionParticipantInvite;
    "channelAdminLogEventActionParticipantToggleBan": channelAdminLogEventActionParticipantToggleBan;
    "channelAdminLogEventActionParticipantToggleAdmin": channelAdminLogEventActionParticipantToggleAdmin;
    "channelAdminLogEventActionChangeStickerSet": channelAdminLogEventActionChangeStickerSet;
    "channelAdminLogEventActionTogglePreHistoryHidden": channelAdminLogEventActionTogglePreHistoryHidden;
    "channelAdminLogEventActionDefaultBannedRights": channelAdminLogEventActionDefaultBannedRights;
    "channelAdminLogEventActionStopPoll": channelAdminLogEventActionStopPoll;
    "channelAdminLogEventActionChangeLinkedChat": channelAdminLogEventActionChangeLinkedChat;
    "channelAdminLogEventActionChangeLocation": channelAdminLogEventActionChangeLocation;
    "channelAdminLogEventActionToggleSlowMode": channelAdminLogEventActionToggleSlowMode;
    "channelAdminLogEventActionStartGroupCall": channelAdminLogEventActionStartGroupCall;
    "channelAdminLogEventActionDiscardGroupCall": channelAdminLogEventActionDiscardGroupCall;
    "channelAdminLogEventActionParticipantMute": channelAdminLogEventActionParticipantMute;
    "channelAdminLogEventActionParticipantUnmute": channelAdminLogEventActionParticipantUnmute;
    "channelAdminLogEventActionToggleGroupCallSetting": channelAdminLogEventActionToggleGroupCallSetting;
    "channelAdminLogEventActionParticipantJoinByInvite": channelAdminLogEventActionParticipantJoinByInvite;
    "channelAdminLogEventActionExportedInviteDelete": channelAdminLogEventActionExportedInviteDelete;
    "channelAdminLogEventActionExportedInviteRevoke": channelAdminLogEventActionExportedInviteRevoke;
    "channelAdminLogEventActionExportedInviteEdit": channelAdminLogEventActionExportedInviteEdit;
    "channelAdminLogEventActionParticipantVolume": channelAdminLogEventActionParticipantVolume;
    "channelAdminLogEventActionChangeHistoryTTL": channelAdminLogEventActionChangeHistoryTTL;
    "channelAdminLogEventActionParticipantJoinByRequest": channelAdminLogEventActionParticipantJoinByRequest;
    "channelAdminLogEventActionToggleNoForwards": channelAdminLogEventActionToggleNoForwards;
    "channelAdminLogEventActionSendMessage": channelAdminLogEventActionSendMessage;
    "channelAdminLogEventActionChangeAvailableReactions": channelAdminLogEventActionChangeAvailableReactions;
    "channelAdminLogEventActionChangeUsernames": channelAdminLogEventActionChangeUsernames;
    "channelAdminLogEventActionToggleForum": channelAdminLogEventActionToggleForum;
    "channelAdminLogEventActionCreateTopic": channelAdminLogEventActionCreateTopic;
    "channelAdminLogEventActionEditTopic": channelAdminLogEventActionEditTopic;
    "channelAdminLogEventActionDeleteTopic": channelAdminLogEventActionDeleteTopic;
    "channelAdminLogEventActionPinTopic": channelAdminLogEventActionPinTopic;
    "channelAdminLogEventActionToggleAntiSpam": channelAdminLogEventActionToggleAntiSpam;
    "channelAdminLogEventActionChangePeerColor": channelAdminLogEventActionChangePeerColor;
    "channelAdminLogEventActionChangeProfilePeerColor": channelAdminLogEventActionChangeProfilePeerColor;
    "channelAdminLogEventActionChangeWallpaper": channelAdminLogEventActionChangeWallpaper;
    "channelAdminLogEventActionChangeEmojiStatus": channelAdminLogEventActionChangeEmojiStatus;
    "channelAdminLogEventActionChangeEmojiStickerSet": channelAdminLogEventActionChangeEmojiStickerSet;
    "channelAdminLogEventActionToggleSignatureProfiles": channelAdminLogEventActionToggleSignatureProfiles;
    "channelAdminLogEventActionParticipantSubExtend": channelAdminLogEventActionParticipantSubExtend;
    "channelAdminLogEventActionToggleAutotranslation": channelAdminLogEventActionToggleAutotranslation;
    "channelAdminLogEvent": channelAdminLogEvent;
    "channels.adminLogResults": channels_adminLogResults;
    "channelAdminLogEventsFilter": channelAdminLogEventsFilter;
    "popularContact": popularContact;
    "messages.favedStickersNotModified": messages_favedStickersNotModified;
    "messages.favedStickers": messages_favedStickers;
    "recentMeUrlUnknown": recentMeUrlUnknown;
    "recentMeUrlUser": recentMeUrlUser;
    "recentMeUrlChat": recentMeUrlChat;
    "recentMeUrlChatInvite": recentMeUrlChatInvite;
    "recentMeUrlStickerSet": recentMeUrlStickerSet;
    "help.recentMeUrls": help_recentMeUrls;
    "inputSingleMedia": inputSingleMedia;
    "webAuthorization": webAuthorization;
    "account.webAuthorizations": account_webAuthorizations;
    "inputMessageID": inputMessageID;
    "inputMessageReplyTo": inputMessageReplyTo;
    "inputMessagePinned": inputMessagePinned;
    "inputMessageCallbackQuery": inputMessageCallbackQuery;
    "inputDialogPeer": inputDialogPeer;
    "inputDialogPeerFolder": inputDialogPeerFolder;
    "dialogPeer": dialogPeer;
    "dialogPeerFolder": dialogPeerFolder;
    "messages.foundStickerSetsNotModified": messages_foundStickerSetsNotModified;
    "messages.foundStickerSets": messages_foundStickerSets;
    "fileHash": fileHash;
    "inputClientProxy": inputClientProxy;
    "help.termsOfServiceUpdateEmpty": help_termsOfServiceUpdateEmpty;
    "help.termsOfServiceUpdate": help_termsOfServiceUpdate;
    "inputSecureFileUploaded": inputSecureFileUploaded;
    "inputSecureFile": inputSecureFile;
    "secureFileEmpty": secureFileEmpty;
    "secureFile": secureFile;
    "secureData": secureData;
    "securePlainPhone": securePlainPhone;
    "securePlainEmail": securePlainEmail;
    "secureValueTypePersonalDetails": secureValueTypePersonalDetails;
    "secureValueTypePassport": secureValueTypePassport;
    "secureValueTypeDriverLicense": secureValueTypeDriverLicense;
    "secureValueTypeIdentityCard": secureValueTypeIdentityCard;
    "secureValueTypeInternalPassport": secureValueTypeInternalPassport;
    "secureValueTypeAddress": secureValueTypeAddress;
    "secureValueTypeUtilityBill": secureValueTypeUtilityBill;
    "secureValueTypeBankStatement": secureValueTypeBankStatement;
    "secureValueTypeRentalAgreement": secureValueTypeRentalAgreement;
    "secureValueTypePassportRegistration": secureValueTypePassportRegistration;
    "secureValueTypeTemporaryRegistration": secureValueTypeTemporaryRegistration;
    "secureValueTypePhone": secureValueTypePhone;
    "secureValueTypeEmail": secureValueTypeEmail;
    "secureValue": secureValue;
    "inputSecureValue": inputSecureValue;
    "secureValueHash": secureValueHash;
    "secureValueErrorData": secureValueErrorData;
    "secureValueErrorFrontSide": secureValueErrorFrontSide;
    "secureValueErrorReverseSide": secureValueErrorReverseSide;
    "secureValueErrorSelfie": secureValueErrorSelfie;
    "secureValueErrorFile": secureValueErrorFile;
    "secureValueErrorFiles": secureValueErrorFiles;
    "secureValueError": secureValueError;
    "secureValueErrorTranslationFile": secureValueErrorTranslationFile;
    "secureValueErrorTranslationFiles": secureValueErrorTranslationFiles;
    "secureCredentialsEncrypted": secureCredentialsEncrypted;
    "account.authorizationForm": account_authorizationForm;
    "account.sentEmailCode": account_sentEmailCode;
    "help.deepLinkInfoEmpty": help_deepLinkInfoEmpty;
    "help.deepLinkInfo": help_deepLinkInfo;
    "savedPhoneContact": savedPhoneContact;
    "account.takeout": account_takeout;
    "passwordKdfAlgoUnknown": passwordKdfAlgoUnknown;
    "passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow": passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow;
    "securePasswordKdfAlgoUnknown": securePasswordKdfAlgoUnknown;
    "securePasswordKdfAlgoPBKDF2HMACSHA512iter100000": securePasswordKdfAlgoPBKDF2HMACSHA512iter100000;
    "securePasswordKdfAlgoSHA512": securePasswordKdfAlgoSHA512;
    "secureSecretSettings": secureSecretSettings;
    "inputCheckPasswordEmpty": inputCheckPasswordEmpty;
    "inputCheckPasswordSRP": inputCheckPasswordSRP;
    "secureRequiredType": secureRequiredType;
    "secureRequiredTypeOneOf": secureRequiredTypeOneOf;
    "help.passportConfigNotModified": help_passportConfigNotModified;
    "help.passportConfig": help_passportConfig;
    "inputAppEvent": inputAppEvent;
    "jsonObjectValue": jsonObjectValue;
    "jsonNull": jsonNull;
    "jsonBool": jsonBool;
    "jsonNumber": jsonNumber;
    "jsonString": jsonString;
    "jsonArray": jsonArray;
    "jsonObject": jsonObject;
    "pageTableCell": pageTableCell;
    "pageTableRow": pageTableRow;
    "pageCaption": pageCaption;
    "pageListItemText": pageListItemText;
    "pageListItemBlocks": pageListItemBlocks;
    "pageListOrderedItemText": pageListOrderedItemText;
    "pageListOrderedItemBlocks": pageListOrderedItemBlocks;
    "pageRelatedArticle": pageRelatedArticle;
    "page": page;
    "help.supportName": help_supportName;
    "help.userInfoEmpty": help_userInfoEmpty;
    "help.userInfo": help_userInfo;
    "pollAnswer": pollAnswer;
    "poll": poll;
    "pollAnswerVoters": pollAnswerVoters;
    "pollResults": pollResults;
    "chatOnlines": chatOnlines;
    "statsURL": statsURL;
    "chatAdminRights": chatAdminRights;
    "chatBannedRights": chatBannedRights;
    "inputWallPaper": inputWallPaper;
    "inputWallPaperSlug": inputWallPaperSlug;
    "inputWallPaperNoFile": inputWallPaperNoFile;
    "account.wallPapersNotModified": account_wallPapersNotModified;
    "account.wallPapers": account_wallPapers;
    "codeSettings": codeSettings;
    "wallPaperSettings": wallPaperSettings;
    "autoDownloadSettings": autoDownloadSettings;
    "account.autoDownloadSettings": account_autoDownloadSettings;
    "emojiKeyword": emojiKeyword;
    "emojiKeywordDeleted": emojiKeywordDeleted;
    "emojiKeywordsDifference": emojiKeywordsDifference;
    "emojiURL": emojiURL;
    "emojiLanguage": emojiLanguage;
    "folder": folder;
    "inputFolderPeer": inputFolderPeer;
    "folderPeer": folderPeer;
    "messages.searchCounter": messages_searchCounter;
    "urlAuthResultRequest": urlAuthResultRequest;
    "urlAuthResultAccepted": urlAuthResultAccepted;
    "urlAuthResultDefault": urlAuthResultDefault;
    "channelLocationEmpty": channelLocationEmpty;
    "channelLocation": channelLocation;
    "peerLocated": peerLocated;
    "peerSelfLocated": peerSelfLocated;
    "restrictionReason": restrictionReason;
    "inputTheme": inputTheme;
    "inputThemeSlug": inputThemeSlug;
    "theme": theme;
    "account.themesNotModified": account_themesNotModified;
    "account.themes": account_themes;
    "auth.loginToken": auth_loginToken;
    "auth.loginTokenMigrateTo": auth_loginTokenMigrateTo;
    "auth.loginTokenSuccess": auth_loginTokenSuccess;
    "account.contentSettings": account_contentSettings;
    "messages.inactiveChats": messages_inactiveChats;
    "baseThemeClassic": baseThemeClassic;
    "baseThemeDay": baseThemeDay;
    "baseThemeNight": baseThemeNight;
    "baseThemeTinted": baseThemeTinted;
    "baseThemeArctic": baseThemeArctic;
    "inputThemeSettings": inputThemeSettings;
    "themeSettings": themeSettings;
    "webPageAttributeTheme": webPageAttributeTheme;
    "webPageAttributeStory": webPageAttributeStory;
    "webPageAttributeStickerSet": webPageAttributeStickerSet;
    "webPageAttributeUniqueStarGift": webPageAttributeUniqueStarGift;
    "webPageAttributeStarGiftCollection": webPageAttributeStarGiftCollection;
    "webPageAttributeStarGiftAuction": webPageAttributeStarGiftAuction;
    "messages.votesList": messages_votesList;
    "bankCardOpenUrl": bankCardOpenUrl;
    "payments.bankCardData": payments_bankCardData;
    "dialogFilter": dialogFilter;
    "dialogFilterDefault": dialogFilterDefault;
    "dialogFilterChatlist": dialogFilterChatlist;
    "dialogFilterSuggested": dialogFilterSuggested;
    "statsDateRangeDays": statsDateRangeDays;
    "statsAbsValueAndPrev": statsAbsValueAndPrev;
    "statsPercentValue": statsPercentValue;
    "statsGraphAsync": statsGraphAsync;
    "statsGraphError": statsGraphError;
    "statsGraph": statsGraph;
    "stats.broadcastStats": stats_broadcastStats;
    "help.promoDataEmpty": help_promoDataEmpty;
    "help.promoData": help_promoData;
    "videoSize": videoSize;
    "videoSizeEmojiMarkup": videoSizeEmojiMarkup;
    "videoSizeStickerMarkup": videoSizeStickerMarkup;
    "statsGroupTopPoster": statsGroupTopPoster;
    "statsGroupTopAdmin": statsGroupTopAdmin;
    "statsGroupTopInviter": statsGroupTopInviter;
    "stats.megagroupStats": stats_megagroupStats;
    "globalPrivacySettings": globalPrivacySettings;
    "help.countryCode": help_countryCode;
    "help.country": help_country;
    "help.countriesListNotModified": help_countriesListNotModified;
    "help.countriesList": help_countriesList;
    "messageViews": messageViews;
    "messages.messageViews": messages_messageViews;
    "messages.discussionMessage": messages_discussionMessage;
    "messageReplyHeader": messageReplyHeader;
    "messageReplyStoryHeader": messageReplyStoryHeader;
    "messageReplies": messageReplies;
    "peerBlocked": peerBlocked;
    "stats.messageStats": stats_messageStats;
    "groupCallDiscarded": groupCallDiscarded;
    "groupCall": groupCall;
    "inputGroupCall": inputGroupCall;
    "inputGroupCallSlug": inputGroupCallSlug;
    "inputGroupCallInviteMessage": inputGroupCallInviteMessage;
    "groupCallParticipant": groupCallParticipant;
    "phone.groupCall": phone_groupCall;
    "phone.groupParticipants": phone_groupParticipants;
    "inlineQueryPeerTypeSameBotPM": inlineQueryPeerTypeSameBotPM;
    "inlineQueryPeerTypePM": inlineQueryPeerTypePM;
    "inlineQueryPeerTypeChat": inlineQueryPeerTypeChat;
    "inlineQueryPeerTypeMegagroup": inlineQueryPeerTypeMegagroup;
    "inlineQueryPeerTypeBroadcast": inlineQueryPeerTypeBroadcast;
    "inlineQueryPeerTypeBotPM": inlineQueryPeerTypeBotPM;
    "messages.historyImport": messages_historyImport;
    "messages.historyImportParsed": messages_historyImportParsed;
    "messages.affectedFoundMessages": messages_affectedFoundMessages;
    "chatInviteImporter": chatInviteImporter;
    "messages.exportedChatInvites": messages_exportedChatInvites;
    "messages.exportedChatInvite": messages_exportedChatInvite;
    "messages.exportedChatInviteReplaced": messages_exportedChatInviteReplaced;
    "messages.chatInviteImporters": messages_chatInviteImporters;
    "chatAdminWithInvites": chatAdminWithInvites;
    "messages.chatAdminsWithInvites": messages_chatAdminsWithInvites;
    "messages.checkedHistoryImportPeer": messages_checkedHistoryImportPeer;
    "phone.joinAsPeers": phone_joinAsPeers;
    "phone.exportedGroupCallInvite": phone_exportedGroupCallInvite;
    "groupCallParticipantVideoSourceGroup": groupCallParticipantVideoSourceGroup;
    "groupCallParticipantVideo": groupCallParticipantVideo;
    "stickers.suggestedShortName": stickers_suggestedShortName;
    "botCommandScopeDefault": botCommandScopeDefault;
    "botCommandScopeUsers": botCommandScopeUsers;
    "botCommandScopeChats": botCommandScopeChats;
    "botCommandScopeChatAdmins": botCommandScopeChatAdmins;
    "botCommandScopePeer": botCommandScopePeer;
    "botCommandScopePeerAdmins": botCommandScopePeerAdmins;
    "botCommandScopePeerUser": botCommandScopePeerUser;
    "account.resetPasswordFailedWait": account_resetPasswordFailedWait;
    "account.resetPasswordRequestedWait": account_resetPasswordRequestedWait;
    "account.resetPasswordOk": account_resetPasswordOk;
    "chatTheme": chatTheme;
    "chatThemeUniqueGift": chatThemeUniqueGift;
    "account.chatThemesNotModified": account_chatThemesNotModified;
    "account.chatThemes": account_chatThemes;
    "sponsoredMessage": sponsoredMessage;
    "messages.sponsoredMessages": messages_sponsoredMessages;
    "messages.sponsoredMessagesEmpty": messages_sponsoredMessagesEmpty;
    "searchResultsCalendarPeriod": searchResultsCalendarPeriod;
    "messages.searchResultsCalendar": messages_searchResultsCalendar;
    "searchResultPosition": searchResultPosition;
    "messages.searchResultsPositions": messages_searchResultsPositions;
    "channels.sendAsPeers": channels_sendAsPeers;
    "users.userFull": users_userFull;
    "messages.peerSettings": messages_peerSettings;
    "auth.loggedOut": auth_loggedOut;
    "reactionCount": reactionCount;
    "messageReactions": messageReactions;
    "messages.messageReactionsList": messages_messageReactionsList;
    "availableReaction": availableReaction;
    "messages.availableReactionsNotModified": messages_availableReactionsNotModified;
    "messages.availableReactions": messages_availableReactions;
    "messagePeerReaction": messagePeerReaction;
    "groupCallStreamChannel": groupCallStreamChannel;
    "phone.groupCallStreamChannels": phone_groupCallStreamChannels;
    "phone.groupCallStreamRtmpUrl": phone_groupCallStreamRtmpUrl;
    "attachMenuBotIconColor": attachMenuBotIconColor;
    "attachMenuBotIcon": attachMenuBotIcon;
    "attachMenuBot": attachMenuBot;
    "attachMenuBotsNotModified": attachMenuBotsNotModified;
    "attachMenuBots": attachMenuBots;
    "attachMenuBotsBot": attachMenuBotsBot;
    "webViewResultUrl": webViewResultUrl;
    "webViewMessageSent": webViewMessageSent;
    "botMenuButtonDefault": botMenuButtonDefault;
    "botMenuButtonCommands": botMenuButtonCommands;
    "botMenuButton": botMenuButton;
    "account.savedRingtonesNotModified": account_savedRingtonesNotModified;
    "account.savedRingtones": account_savedRingtones;
    "notificationSoundDefault": notificationSoundDefault;
    "notificationSoundNone": notificationSoundNone;
    "notificationSoundLocal": notificationSoundLocal;
    "notificationSoundRingtone": notificationSoundRingtone;
    "account.savedRingtone": account_savedRingtone;
    "account.savedRingtoneConverted": account_savedRingtoneConverted;
    "attachMenuPeerTypeSameBotPM": attachMenuPeerTypeSameBotPM;
    "attachMenuPeerTypeBotPM": attachMenuPeerTypeBotPM;
    "attachMenuPeerTypePM": attachMenuPeerTypePM;
    "attachMenuPeerTypeChat": attachMenuPeerTypeChat;
    "attachMenuPeerTypeBroadcast": attachMenuPeerTypeBroadcast;
    "inputInvoiceMessage": inputInvoiceMessage;
    "inputInvoiceSlug": inputInvoiceSlug;
    "inputInvoicePremiumGiftCode": inputInvoicePremiumGiftCode;
    "inputInvoiceStars": inputInvoiceStars;
    "inputInvoiceChatInviteSubscription": inputInvoiceChatInviteSubscription;
    "inputInvoiceStarGift": inputInvoiceStarGift;
    "inputInvoiceStarGiftUpgrade": inputInvoiceStarGiftUpgrade;
    "inputInvoiceStarGiftTransfer": inputInvoiceStarGiftTransfer;
    "inputInvoicePremiumGiftStars": inputInvoicePremiumGiftStars;
    "inputInvoiceBusinessBotTransferStars": inputInvoiceBusinessBotTransferStars;
    "inputInvoiceStarGiftResale": inputInvoiceStarGiftResale;
    "inputInvoiceStarGiftPrepaidUpgrade": inputInvoiceStarGiftPrepaidUpgrade;
    "inputInvoicePremiumAuthCode": inputInvoicePremiumAuthCode;
    "inputInvoiceStarGiftDropOriginalDetails": inputInvoiceStarGiftDropOriginalDetails;
    "inputInvoiceStarGiftAuctionBid": inputInvoiceStarGiftAuctionBid;
    "payments.exportedInvoice": payments_exportedInvoice;
    "messages.transcribedAudio": messages_transcribedAudio;
    "help.premiumPromo": help_premiumPromo;
    "inputStorePaymentPremiumSubscription": inputStorePaymentPremiumSubscription;
    "inputStorePaymentGiftPremium": inputStorePaymentGiftPremium;
    "inputStorePaymentPremiumGiftCode": inputStorePaymentPremiumGiftCode;
    "inputStorePaymentPremiumGiveaway": inputStorePaymentPremiumGiveaway;
    "inputStorePaymentStarsTopup": inputStorePaymentStarsTopup;
    "inputStorePaymentStarsGift": inputStorePaymentStarsGift;
    "inputStorePaymentStarsGiveaway": inputStorePaymentStarsGiveaway;
    "inputStorePaymentAuthCode": inputStorePaymentAuthCode;
    "paymentFormMethod": paymentFormMethod;
    "emojiStatusEmpty": emojiStatusEmpty;
    "emojiStatus": emojiStatus;
    "emojiStatusCollectible": emojiStatusCollectible;
    "inputEmojiStatusCollectible": inputEmojiStatusCollectible;
    "account.emojiStatusesNotModified": account_emojiStatusesNotModified;
    "account.emojiStatuses": account_emojiStatuses;
    "reactionEmpty": reactionEmpty;
    "reactionEmoji": reactionEmoji;
    "reactionCustomEmoji": reactionCustomEmoji;
    "reactionPaid": reactionPaid;
    "chatReactionsNone": chatReactionsNone;
    "chatReactionsAll": chatReactionsAll;
    "chatReactionsSome": chatReactionsSome;
    "messages.reactionsNotModified": messages_reactionsNotModified;
    "messages.reactions": messages_reactions;
    "emailVerifyPurposeLoginSetup": emailVerifyPurposeLoginSetup;
    "emailVerifyPurposeLoginChange": emailVerifyPurposeLoginChange;
    "emailVerifyPurposePassport": emailVerifyPurposePassport;
    "emailVerificationCode": emailVerificationCode;
    "emailVerificationGoogle": emailVerificationGoogle;
    "emailVerificationApple": emailVerificationApple;
    "account.emailVerified": account_emailVerified;
    "account.emailVerifiedLogin": account_emailVerifiedLogin;
    "premiumSubscriptionOption": premiumSubscriptionOption;
    "sendAsPeer": sendAsPeer;
    "messageExtendedMediaPreview": messageExtendedMediaPreview;
    "messageExtendedMedia": messageExtendedMedia;
    "stickerKeyword": stickerKeyword;
    "username": username;
    "forumTopicDeleted": forumTopicDeleted;
    "forumTopic": forumTopic;
    "messages.forumTopics": messages_forumTopics;
    "defaultHistoryTTL": defaultHistoryTTL;
    "exportedContactToken": exportedContactToken;
    "requestPeerTypeUser": requestPeerTypeUser;
    "requestPeerTypeChat": requestPeerTypeChat;
    "requestPeerTypeBroadcast": requestPeerTypeBroadcast;
    "emojiListNotModified": emojiListNotModified;
    "emojiList": emojiList;
    "emojiGroup": emojiGroup;
    "emojiGroupGreeting": emojiGroupGreeting;
    "emojiGroupPremium": emojiGroupPremium;
    "messages.emojiGroupsNotModified": messages_emojiGroupsNotModified;
    "messages.emojiGroups": messages_emojiGroups;
    "textWithEntities": textWithEntities;
    "messages.translateResult": messages_translateResult;
    "autoSaveSettings": autoSaveSettings;
    "autoSaveException": autoSaveException;
    "account.autoSaveSettings": account_autoSaveSettings;
    "help.appConfigNotModified": help_appConfigNotModified;
    "help.appConfig": help_appConfig;
    "inputBotAppID": inputBotAppID;
    "inputBotAppShortName": inputBotAppShortName;
    "botAppNotModified": botAppNotModified;
    "botApp": botApp;
    "messages.botApp": messages_botApp;
    "inlineBotWebView": inlineBotWebView;
    "readParticipantDate": readParticipantDate;
    "inputChatlistDialogFilter": inputChatlistDialogFilter;
    "exportedChatlistInvite": exportedChatlistInvite;
    "chatlists.exportedChatlistInvite": chatlists_exportedChatlistInvite;
    "chatlists.exportedInvites": chatlists_exportedInvites;
    "chatlists.chatlistInviteAlready": chatlists_chatlistInviteAlready;
    "chatlists.chatlistInvite": chatlists_chatlistInvite;
    "chatlists.chatlistUpdates": chatlists_chatlistUpdates;
    "bots.botInfo": bots_botInfo;
    "messagePeerVote": messagePeerVote;
    "messagePeerVoteInputOption": messagePeerVoteInputOption;
    "messagePeerVoteMultiple": messagePeerVoteMultiple;
    "storyViews": storyViews;
    "storyItemDeleted": storyItemDeleted;
    "storyItemSkipped": storyItemSkipped;
    "storyItem": storyItem;
    "stories.allStoriesNotModified": stories_allStoriesNotModified;
    "stories.allStories": stories_allStories;
    "stories.stories": stories_stories;
    "storyView": storyView;
    "storyViewPublicForward": storyViewPublicForward;
    "storyViewPublicRepost": storyViewPublicRepost;
    "stories.storyViewsList": stories_storyViewsList;
    "stories.storyViews": stories_storyViews;
    "inputReplyToMessage": inputReplyToMessage;
    "inputReplyToStory": inputReplyToStory;
    "inputReplyToMonoForum": inputReplyToMonoForum;
    "exportedStoryLink": exportedStoryLink;
    "storiesStealthMode": storiesStealthMode;
    "mediaAreaCoordinates": mediaAreaCoordinates;
    "mediaAreaVenue": mediaAreaVenue;
    "inputMediaAreaVenue": inputMediaAreaVenue;
    "mediaAreaGeoPoint": mediaAreaGeoPoint;
    "mediaAreaSuggestedReaction": mediaAreaSuggestedReaction;
    "mediaAreaChannelPost": mediaAreaChannelPost;
    "inputMediaAreaChannelPost": inputMediaAreaChannelPost;
    "mediaAreaUrl": mediaAreaUrl;
    "mediaAreaWeather": mediaAreaWeather;
    "mediaAreaStarGift": mediaAreaStarGift;
    "peerStories": peerStories;
    "stories.peerStories": stories_peerStories;
    "messages.webPage": messages_webPage;
    "premiumGiftCodeOption": premiumGiftCodeOption;
    "payments.checkedGiftCode": payments_checkedGiftCode;
    "payments.giveawayInfo": payments_giveawayInfo;
    "payments.giveawayInfoResults": payments_giveawayInfoResults;
    "prepaidGiveaway": prepaidGiveaway;
    "prepaidStarsGiveaway": prepaidStarsGiveaway;
    "boost": boost;
    "premium.boostsList": premium_boostsList;
    "myBoost": myBoost;
    "premium.myBoosts": premium_myBoosts;
    "premium.boostsStatus": premium_boostsStatus;
    "storyFwdHeader": storyFwdHeader;
    "postInteractionCountersMessage": postInteractionCountersMessage;
    "postInteractionCountersStory": postInteractionCountersStory;
    "stats.storyStats": stats_storyStats;
    "publicForwardMessage": publicForwardMessage;
    "publicForwardStory": publicForwardStory;
    "stats.publicForwards": stats_publicForwards;
    "peerColor": peerColor;
    "peerColorCollectible": peerColorCollectible;
    "inputPeerColorCollectible": inputPeerColorCollectible;
    "help.peerColorSet": help_peerColorSet;
    "help.peerColorProfileSet": help_peerColorProfileSet;
    "help.peerColorOption": help_peerColorOption;
    "help.peerColorsNotModified": help_peerColorsNotModified;
    "help.peerColors": help_peerColors;
    "storyReaction": storyReaction;
    "storyReactionPublicForward": storyReactionPublicForward;
    "storyReactionPublicRepost": storyReactionPublicRepost;
    "stories.storyReactionsList": stories_storyReactionsList;
    "savedDialog": savedDialog;
    "monoForumDialog": monoForumDialog;
    "messages.savedDialogs": messages_savedDialogs;
    "messages.savedDialogsSlice": messages_savedDialogsSlice;
    "messages.savedDialogsNotModified": messages_savedDialogsNotModified;
    "savedReactionTag": savedReactionTag;
    "messages.savedReactionTagsNotModified": messages_savedReactionTagsNotModified;
    "messages.savedReactionTags": messages_savedReactionTags;
    "outboxReadDate": outboxReadDate;
    "smsjobs.eligibleToJoin": smsjobs_eligibleToJoin;
    "smsjobs.status": smsjobs_status;
    "smsJob": smsJob;
    "businessWeeklyOpen": businessWeeklyOpen;
    "businessWorkHours": businessWorkHours;
    "businessLocation": businessLocation;
    "inputBusinessRecipients": inputBusinessRecipients;
    "businessRecipients": businessRecipients;
    "businessAwayMessageScheduleAlways": businessAwayMessageScheduleAlways;
    "businessAwayMessageScheduleOutsideWorkHours": businessAwayMessageScheduleOutsideWorkHours;
    "businessAwayMessageScheduleCustom": businessAwayMessageScheduleCustom;
    "inputBusinessGreetingMessage": inputBusinessGreetingMessage;
    "businessGreetingMessage": businessGreetingMessage;
    "inputBusinessAwayMessage": inputBusinessAwayMessage;
    "businessAwayMessage": businessAwayMessage;
    "timezone": timezone;
    "help.timezonesListNotModified": help_timezonesListNotModified;
    "help.timezonesList": help_timezonesList;
    "quickReply": quickReply;
    "inputQuickReplyShortcut": inputQuickReplyShortcut;
    "inputQuickReplyShortcutId": inputQuickReplyShortcutId;
    "messages.quickReplies": messages_quickReplies;
    "messages.quickRepliesNotModified": messages_quickRepliesNotModified;
    "connectedBot": connectedBot;
    "account.connectedBots": account_connectedBots;
    "messages.dialogFilters": messages_dialogFilters;
    "birthday": birthday;
    "botBusinessConnection": botBusinessConnection;
    "inputBusinessIntro": inputBusinessIntro;
    "businessIntro": businessIntro;
    "messages.myStickers": messages_myStickers;
    "inputCollectibleUsername": inputCollectibleUsername;
    "inputCollectiblePhone": inputCollectiblePhone;
    "fragment.collectibleInfo": fragment_collectibleInfo;
    "inputBusinessBotRecipients": inputBusinessBotRecipients;
    "businessBotRecipients": businessBotRecipients;
    "contactBirthday": contactBirthday;
    "contacts.contactBirthdays": contacts_contactBirthdays;
    "missingInvitee": missingInvitee;
    "messages.invitedUsers": messages_invitedUsers;
    "inputBusinessChatLink": inputBusinessChatLink;
    "businessChatLink": businessChatLink;
    "account.businessChatLinks": account_businessChatLinks;
    "account.resolvedBusinessChatLinks": account_resolvedBusinessChatLinks;
    "requestedPeerUser": requestedPeerUser;
    "requestedPeerChat": requestedPeerChat;
    "requestedPeerChannel": requestedPeerChannel;
    "sponsoredMessageReportOption": sponsoredMessageReportOption;
    "channels.sponsoredMessageReportResultChooseOption": channels_sponsoredMessageReportResultChooseOption;
    "channels.sponsoredMessageReportResultAdsHidden": channels_sponsoredMessageReportResultAdsHidden;
    "channels.sponsoredMessageReportResultReported": channels_sponsoredMessageReportResultReported;
    "reactionNotificationsFromContacts": reactionNotificationsFromContacts;
    "reactionNotificationsFromAll": reactionNotificationsFromAll;
    "reactionsNotifySettings": reactionsNotifySettings;
    "availableEffect": availableEffect;
    "messages.availableEffectsNotModified": messages_availableEffectsNotModified;
    "messages.availableEffects": messages_availableEffects;
    "factCheck": factCheck;
    "starsTransactionPeerUnsupported": starsTransactionPeerUnsupported;
    "starsTransactionPeerAppStore": starsTransactionPeerAppStore;
    "starsTransactionPeerPlayMarket": starsTransactionPeerPlayMarket;
    "starsTransactionPeerPremiumBot": starsTransactionPeerPremiumBot;
    "starsTransactionPeerFragment": starsTransactionPeerFragment;
    "starsTransactionPeer": starsTransactionPeer;
    "starsTransactionPeerAds": starsTransactionPeerAds;
    "starsTransactionPeerAPI": starsTransactionPeerAPI;
    "starsTopupOption": starsTopupOption;
    "starsTransaction": starsTransaction;
    "payments.starsStatus": payments_starsStatus;
    "foundStory": foundStory;
    "stories.foundStories": stories_foundStories;
    "geoPointAddress": geoPointAddress;
    "starsRevenueStatus": starsRevenueStatus;
    "payments.starsRevenueStats": payments_starsRevenueStats;
    "payments.starsRevenueWithdrawalUrl": payments_starsRevenueWithdrawalUrl;
    "payments.starsRevenueAdsAccountUrl": payments_starsRevenueAdsAccountUrl;
    "inputStarsTransaction": inputStarsTransaction;
    "starsGiftOption": starsGiftOption;
    "bots.popularAppBots": bots_popularAppBots;
    "botPreviewMedia": botPreviewMedia;
    "bots.previewInfo": bots_previewInfo;
    "starsSubscriptionPricing": starsSubscriptionPricing;
    "starsSubscription": starsSubscription;
    "messageReactor": messageReactor;
    "starsGiveawayOption": starsGiveawayOption;
    "starsGiveawayWinnersOption": starsGiveawayWinnersOption;
    "starGift": starGift;
    "starGiftUnique": starGiftUnique;
    "payments.starGiftsNotModified": payments_starGiftsNotModified;
    "payments.starGifts": payments_starGifts;
    "messageReportOption": messageReportOption;
    "reportResultChooseOption": reportResultChooseOption;
    "reportResultAddComment": reportResultAddComment;
    "reportResultReported": reportResultReported;
    "messages.botPreparedInlineMessage": messages_botPreparedInlineMessage;
    "messages.preparedInlineMessage": messages_preparedInlineMessage;
    "botAppSettings": botAppSettings;
    "starRefProgram": starRefProgram;
    "connectedBotStarRef": connectedBotStarRef;
    "payments.connectedStarRefBots": payments_connectedStarRefBots;
    "payments.suggestedStarRefBots": payments_suggestedStarRefBots;
    "starsAmount": starsAmount;
    "starsTonAmount": starsTonAmount;
    "messages.foundStickersNotModified": messages_foundStickersNotModified;
    "messages.foundStickers": messages_foundStickers;
    "botVerifierSettings": botVerifierSettings;
    "botVerification": botVerification;
    "starGiftAttributeModel": starGiftAttributeModel;
    "starGiftAttributePattern": starGiftAttributePattern;
    "starGiftAttributeBackdrop": starGiftAttributeBackdrop;
    "starGiftAttributeOriginalDetails": starGiftAttributeOriginalDetails;
    "payments.starGiftUpgradePreview": payments_starGiftUpgradePreview;
    "users.users": users_users;
    "users.usersSlice": users_usersSlice;
    "payments.uniqueStarGift": payments_uniqueStarGift;
    "messages.webPagePreview": messages_webPagePreview;
    "savedStarGift": savedStarGift;
    "payments.savedStarGifts": payments_savedStarGifts;
    "inputSavedStarGiftUser": inputSavedStarGiftUser;
    "inputSavedStarGiftChat": inputSavedStarGiftChat;
    "inputSavedStarGiftSlug": inputSavedStarGiftSlug;
    "payments.starGiftWithdrawalUrl": payments_starGiftWithdrawalUrl;
    "paidReactionPrivacyDefault": paidReactionPrivacyDefault;
    "paidReactionPrivacyAnonymous": paidReactionPrivacyAnonymous;
    "paidReactionPrivacyPeer": paidReactionPrivacyPeer;
    "account.paidMessagesRevenue": account_paidMessagesRevenue;
    "requirementToContactEmpty": requirementToContactEmpty;
    "requirementToContactPremium": requirementToContactPremium;
    "requirementToContactPaidMessages": requirementToContactPaidMessages;
    "businessBotRights": businessBotRights;
    "disallowedGiftsSettings": disallowedGiftsSettings;
    "sponsoredPeer": sponsoredPeer;
    "contacts.sponsoredPeersEmpty": contacts_sponsoredPeersEmpty;
    "contacts.sponsoredPeers": contacts_sponsoredPeers;
    "starGiftAttributeIdModel": starGiftAttributeIdModel;
    "starGiftAttributeIdPattern": starGiftAttributeIdPattern;
    "starGiftAttributeIdBackdrop": starGiftAttributeIdBackdrop;
    "starGiftAttributeCounter": starGiftAttributeCounter;
    "payments.resaleStarGifts": payments_resaleStarGifts;
    "stories.canSendStoryCount": stories_canSendStoryCount;
    "pendingSuggestion": pendingSuggestion;
    "todoItem": todoItem;
    "todoList": todoList;
    "todoCompletion": todoCompletion;
    "suggestedPost": suggestedPost;
    "starsRating": starsRating;
    "starGiftCollection": starGiftCollection;
    "payments.starGiftCollectionsNotModified": payments_starGiftCollectionsNotModified;
    "payments.starGiftCollections": payments_starGiftCollections;
    "storyAlbum": storyAlbum;
    "stories.albumsNotModified": stories_albumsNotModified;
    "stories.albums": stories_albums;
    "searchPostsFlood": searchPostsFlood;
    "payments.uniqueStarGiftValueInfo": payments_uniqueStarGiftValueInfo;
    "profileTabPosts": profileTabPosts;
    "profileTabGifts": profileTabGifts;
    "profileTabMedia": profileTabMedia;
    "profileTabFiles": profileTabFiles;
    "profileTabMusic": profileTabMusic;
    "profileTabVoice": profileTabVoice;
    "profileTabLinks": profileTabLinks;
    "profileTabGifs": profileTabGifs;
    "users.savedMusicNotModified": users_savedMusicNotModified;
    "users.savedMusic": users_savedMusic;
    "account.savedMusicIdsNotModified": account_savedMusicIdsNotModified;
    "account.savedMusicIds": account_savedMusicIds;
    "payments.checkCanSendGiftResultOk": payments_checkCanSendGiftResultOk;
    "payments.checkCanSendGiftResultFail": payments_checkCanSendGiftResultFail;
    "inputChatThemeEmpty": inputChatThemeEmpty;
    "inputChatTheme": inputChatTheme;
    "inputChatThemeUniqueGift": inputChatThemeUniqueGift;
    "starGiftUpgradePrice": starGiftUpgradePrice;
    "groupCallMessage": groupCallMessage;
    "groupCallDonor": groupCallDonor;
    "phone.groupCallStars": phone_groupCallStars;
    "recentStory": recentStory;
    "auctionBidLevel": auctionBidLevel;
    "starGiftAuctionStateNotModified": starGiftAuctionStateNotModified;
    "starGiftAuctionState": starGiftAuctionState;
    "starGiftAuctionStateFinished": starGiftAuctionStateFinished;
    "starGiftAuctionUserState": starGiftAuctionUserState;
    "payments.starGiftAuctionState": payments_starGiftAuctionState;
    "starGiftAuctionAcquiredGift": starGiftAuctionAcquiredGift;
    "payments.starGiftAuctionAcquiredGifts": payments_starGiftAuctionAcquiredGifts;
    "starGiftActiveAuctionState": starGiftActiveAuctionState;
    "payments.starGiftActiveAuctionsNotModified": payments_starGiftActiveAuctionsNotModified;
    "payments.starGiftActiveAuctions": payments_starGiftActiveAuctions;
    "inputStarGiftAuction": inputStarGiftAuction;
    "inputStarGiftAuctionSlug": inputStarGiftAuctionSlug;
    "passkey": passkey;
    "account.passkeys": account_passkeys;
    "account.passkeyRegistrationOptions": account_passkeyRegistrationOptions;
    "auth.passkeyLoginOptions": auth_passkeyLoginOptions;
    "inputPasskeyResponseRegister": inputPasskeyResponseRegister;
    "inputPasskeyResponseLogin": inputPasskeyResponseLogin;
    "inputPasskeyCredentialPublicKey": inputPasskeyCredentialPublicKey;
    "inputPasskeyCredentialFirebasePNV": inputPasskeyCredentialFirebasePNV;
    "starGiftBackground": starGiftBackground;
    "starGiftAuctionRound": starGiftAuctionRound;
    "starGiftAuctionRoundExtendable": starGiftAuctionRoundExtendable;
    "payments.starGiftUpgradeAttributes": payments_starGiftUpgradeAttributes;
    "messages.emojiGameOutcome": messages_emojiGameOutcome;
    "messages.emojiGameUnavailable": messages_emojiGameUnavailable;
    "messages.emojiGameDiceInfo": messages_emojiGameDiceInfo;
}
export interface Functions<T = Function> {
    "invokeWithBusinessConnectionPrefix": invokeWithBusinessConnectionPrefix;
    "invokeWithGooglePlayIntegrityPrefix": invokeWithGooglePlayIntegrityPrefix;
    "invokeWithApnsSecretPrefix": invokeWithApnsSecretPrefix;
    "invokeWithReCaptchaPrefix": invokeWithReCaptchaPrefix;
    "invokeAfterMsg": invokeAfterMsg<T>;
    "invokeAfterMsgs": invokeAfterMsgs<T>;
    "initConnection": initConnection<T>;
    "invokeWithLayer": invokeWithLayer<T>;
    "invokeWithoutUpdates": invokeWithoutUpdates<T>;
    "invokeWithMessagesRange": invokeWithMessagesRange<T>;
    "invokeWithTakeout": invokeWithTakeout<T>;
    "invokeWithBusinessConnection": invokeWithBusinessConnection<T>;
    "invokeWithGooglePlayIntegrity": invokeWithGooglePlayIntegrity<T>;
    "invokeWithApnsSecret": invokeWithApnsSecret<T>;
    "invokeWithReCaptcha": invokeWithReCaptcha<T>;
    "auth.sendCode": auth_sendCode;
    "auth.signUp": auth_signUp;
    "auth.signIn": auth_signIn;
    "auth.logOut": auth_logOut;
    "auth.resetAuthorizations": auth_resetAuthorizations;
    "auth.exportAuthorization": auth_exportAuthorization;
    "auth.importAuthorization": auth_importAuthorization;
    "auth.bindTempAuthKey": auth_bindTempAuthKey;
    "auth.importBotAuthorization": auth_importBotAuthorization;
    "auth.checkPassword": auth_checkPassword;
    "auth.requestPasswordRecovery": auth_requestPasswordRecovery;
    "auth.recoverPassword": auth_recoverPassword;
    "auth.resendCode": auth_resendCode;
    "auth.cancelCode": auth_cancelCode;
    "auth.dropTempAuthKeys": auth_dropTempAuthKeys;
    "auth.exportLoginToken": auth_exportLoginToken;
    "auth.importLoginToken": auth_importLoginToken;
    "auth.acceptLoginToken": auth_acceptLoginToken;
    "auth.checkRecoveryPassword": auth_checkRecoveryPassword;
    "auth.importWebTokenAuthorization": auth_importWebTokenAuthorization;
    "auth.requestFirebaseSms": auth_requestFirebaseSms;
    "auth.resetLoginEmail": auth_resetLoginEmail;
    "auth.reportMissingCode": auth_reportMissingCode;
    "auth.checkPaidAuth": auth_checkPaidAuth;
    "auth.initPasskeyLogin": auth_initPasskeyLogin;
    "auth.finishPasskeyLogin": auth_finishPasskeyLogin;
    "account.registerDevice": account_registerDevice;
    "account.unregisterDevice": account_unregisterDevice;
    "account.updateNotifySettings": account_updateNotifySettings;
    "account.getNotifySettings": account_getNotifySettings;
    "account.resetNotifySettings": account_resetNotifySettings;
    "account.updateProfile": account_updateProfile;
    "account.updateStatus": account_updateStatus;
    "account.getWallPapers": account_getWallPapers;
    "account.reportPeer": account_reportPeer;
    "account.checkUsername": account_checkUsername;
    "account.updateUsername": account_updateUsername;
    "account.getPrivacy": account_getPrivacy;
    "account.setPrivacy": account_setPrivacy;
    "account.deleteAccount": account_deleteAccount;
    "account.getAccountTTL": account_getAccountTTL;
    "account.setAccountTTL": account_setAccountTTL;
    "account.sendChangePhoneCode": account_sendChangePhoneCode;
    "account.changePhone": account_changePhone;
    "account.updateDeviceLocked": account_updateDeviceLocked;
    "account.getAuthorizations": account_getAuthorizations;
    "account.resetAuthorization": account_resetAuthorization;
    "account.getPassword": account_getPassword;
    "account.getPasswordSettings": account_getPasswordSettings;
    "account.updatePasswordSettings": account_updatePasswordSettings;
    "account.sendConfirmPhoneCode": account_sendConfirmPhoneCode;
    "account.confirmPhone": account_confirmPhone;
    "account.getTmpPassword": account_getTmpPassword;
    "account.getWebAuthorizations": account_getWebAuthorizations;
    "account.resetWebAuthorization": account_resetWebAuthorization;
    "account.resetWebAuthorizations": account_resetWebAuthorizations;
    "account.getAllSecureValues": account_getAllSecureValues;
    "account.getSecureValue": account_getSecureValue;
    "account.saveSecureValue": account_saveSecureValue;
    "account.deleteSecureValue": account_deleteSecureValue;
    "account.getAuthorizationForm": account_getAuthorizationForm;
    "account.acceptAuthorization": account_acceptAuthorization;
    "account.sendVerifyPhoneCode": account_sendVerifyPhoneCode;
    "account.verifyPhone": account_verifyPhone;
    "account.sendVerifyEmailCode": account_sendVerifyEmailCode;
    "account.verifyEmail": account_verifyEmail;
    "account.initTakeoutSession": account_initTakeoutSession;
    "account.finishTakeoutSession": account_finishTakeoutSession;
    "account.confirmPasswordEmail": account_confirmPasswordEmail;
    "account.resendPasswordEmail": account_resendPasswordEmail;
    "account.cancelPasswordEmail": account_cancelPasswordEmail;
    "account.getContactSignUpNotification": account_getContactSignUpNotification;
    "account.setContactSignUpNotification": account_setContactSignUpNotification;
    "account.getNotifyExceptions": account_getNotifyExceptions;
    "account.getWallPaper": account_getWallPaper;
    "account.uploadWallPaper": account_uploadWallPaper;
    "account.saveWallPaper": account_saveWallPaper;
    "account.installWallPaper": account_installWallPaper;
    "account.resetWallPapers": account_resetWallPapers;
    "account.getAutoDownloadSettings": account_getAutoDownloadSettings;
    "account.saveAutoDownloadSettings": account_saveAutoDownloadSettings;
    "account.uploadTheme": account_uploadTheme;
    "account.createTheme": account_createTheme;
    "account.updateTheme": account_updateTheme;
    "account.saveTheme": account_saveTheme;
    "account.installTheme": account_installTheme;
    "account.getTheme": account_getTheme;
    "account.getThemes": account_getThemes;
    "account.setContentSettings": account_setContentSettings;
    "account.getContentSettings": account_getContentSettings;
    "account.getMultiWallPapers": account_getMultiWallPapers;
    "account.getGlobalPrivacySettings": account_getGlobalPrivacySettings;
    "account.setGlobalPrivacySettings": account_setGlobalPrivacySettings;
    "account.reportProfilePhoto": account_reportProfilePhoto;
    "account.resetPassword": account_resetPassword;
    "account.declinePasswordReset": account_declinePasswordReset;
    "account.getChatThemes": account_getChatThemes;
    "account.setAuthorizationTTL": account_setAuthorizationTTL;
    "account.changeAuthorizationSettings": account_changeAuthorizationSettings;
    "account.getSavedRingtones": account_getSavedRingtones;
    "account.saveRingtone": account_saveRingtone;
    "account.uploadRingtone": account_uploadRingtone;
    "account.updateEmojiStatus": account_updateEmojiStatus;
    "account.getDefaultEmojiStatuses": account_getDefaultEmojiStatuses;
    "account.getRecentEmojiStatuses": account_getRecentEmojiStatuses;
    "account.clearRecentEmojiStatuses": account_clearRecentEmojiStatuses;
    "account.reorderUsernames": account_reorderUsernames;
    "account.toggleUsername": account_toggleUsername;
    "account.getDefaultProfilePhotoEmojis": account_getDefaultProfilePhotoEmojis;
    "account.getDefaultGroupPhotoEmojis": account_getDefaultGroupPhotoEmojis;
    "account.getAutoSaveSettings": account_getAutoSaveSettings;
    "account.saveAutoSaveSettings": account_saveAutoSaveSettings;
    "account.deleteAutoSaveExceptions": account_deleteAutoSaveExceptions;
    "account.invalidateSignInCodes": account_invalidateSignInCodes;
    "account.updateColor": account_updateColor;
    "account.getDefaultBackgroundEmojis": account_getDefaultBackgroundEmojis;
    "account.getChannelDefaultEmojiStatuses": account_getChannelDefaultEmojiStatuses;
    "account.getChannelRestrictedStatusEmojis": account_getChannelRestrictedStatusEmojis;
    "account.updateBusinessWorkHours": account_updateBusinessWorkHours;
    "account.updateBusinessLocation": account_updateBusinessLocation;
    "account.updateBusinessGreetingMessage": account_updateBusinessGreetingMessage;
    "account.updateBusinessAwayMessage": account_updateBusinessAwayMessage;
    "account.updateConnectedBot": account_updateConnectedBot;
    "account.getConnectedBots": account_getConnectedBots;
    "account.getBotBusinessConnection": account_getBotBusinessConnection;
    "account.updateBusinessIntro": account_updateBusinessIntro;
    "account.toggleConnectedBotPaused": account_toggleConnectedBotPaused;
    "account.disablePeerConnectedBot": account_disablePeerConnectedBot;
    "account.updateBirthday": account_updateBirthday;
    "account.createBusinessChatLink": account_createBusinessChatLink;
    "account.editBusinessChatLink": account_editBusinessChatLink;
    "account.deleteBusinessChatLink": account_deleteBusinessChatLink;
    "account.getBusinessChatLinks": account_getBusinessChatLinks;
    "account.resolveBusinessChatLink": account_resolveBusinessChatLink;
    "account.updatePersonalChannel": account_updatePersonalChannel;
    "account.toggleSponsoredMessages": account_toggleSponsoredMessages;
    "account.getReactionsNotifySettings": account_getReactionsNotifySettings;
    "account.setReactionsNotifySettings": account_setReactionsNotifySettings;
    "account.getCollectibleEmojiStatuses": account_getCollectibleEmojiStatuses;
    "account.getPaidMessagesRevenue": account_getPaidMessagesRevenue;
    "account.toggleNoPaidMessagesException": account_toggleNoPaidMessagesException;
    "account.setMainProfileTab": account_setMainProfileTab;
    "account.saveMusic": account_saveMusic;
    "account.getSavedMusicIds": account_getSavedMusicIds;
    "account.getUniqueGiftChatThemes": account_getUniqueGiftChatThemes;
    "account.initPasskeyRegistration": account_initPasskeyRegistration;
    "account.registerPasskey": account_registerPasskey;
    "account.getPasskeys": account_getPasskeys;
    "account.deletePasskey": account_deletePasskey;
    "users.getUsers": users_getUsers;
    "users.getFullUser": users_getFullUser;
    "users.setSecureValueErrors": users_setSecureValueErrors;
    "users.getRequirementsToContact": users_getRequirementsToContact;
    "users.getSavedMusic": users_getSavedMusic;
    "users.getSavedMusicByID": users_getSavedMusicByID;
    "users.suggestBirthday": users_suggestBirthday;
    "contacts.getContactIDs": contacts_getContactIDs;
    "contacts.getStatuses": contacts_getStatuses;
    "contacts.getContacts": contacts_getContacts;
    "contacts.importContacts": contacts_importContacts;
    "contacts.deleteContacts": contacts_deleteContacts;
    "contacts.deleteByPhones": contacts_deleteByPhones;
    "contacts.block": contacts_block;
    "contacts.unblock": contacts_unblock;
    "contacts.getBlocked": contacts_getBlocked;
    "contacts.search": contacts_search;
    "contacts.resolveUsername": contacts_resolveUsername;
    "contacts.getTopPeers": contacts_getTopPeers;
    "contacts.resetTopPeerRating": contacts_resetTopPeerRating;
    "contacts.resetSaved": contacts_resetSaved;
    "contacts.getSaved": contacts_getSaved;
    "contacts.toggleTopPeers": contacts_toggleTopPeers;
    "contacts.addContact": contacts_addContact;
    "contacts.acceptContact": contacts_acceptContact;
    "contacts.getLocated": contacts_getLocated;
    "contacts.blockFromReplies": contacts_blockFromReplies;
    "contacts.resolvePhone": contacts_resolvePhone;
    "contacts.exportContactToken": contacts_exportContactToken;
    "contacts.importContactToken": contacts_importContactToken;
    "contacts.editCloseFriends": contacts_editCloseFriends;
    "contacts.setBlocked": contacts_setBlocked;
    "contacts.getBirthdays": contacts_getBirthdays;
    "contacts.getSponsoredPeers": contacts_getSponsoredPeers;
    "contacts.updateContactNote": contacts_updateContactNote;
    "messages.getMessages": messages_getMessages;
    "messages.getDialogs": messages_getDialogs;
    "messages.getHistory": messages_getHistory;
    "messages.search": messages_search;
    "messages.readHistory": messages_readHistory;
    "messages.deleteHistory": messages_deleteHistory;
    "messages.deleteMessages": messages_deleteMessages;
    "messages.receivedMessages": messages_receivedMessages;
    "messages.setTyping": messages_setTyping;
    "messages.sendMessage": messages_sendMessage;
    "messages.sendMedia": messages_sendMedia;
    "messages.forwardMessages": messages_forwardMessages;
    "messages.reportSpam": messages_reportSpam;
    "messages.getPeerSettings": messages_getPeerSettings;
    "messages.report": messages_report;
    "messages.getChats": messages_getChats;
    "messages.getFullChat": messages_getFullChat;
    "messages.editChatTitle": messages_editChatTitle;
    "messages.editChatPhoto": messages_editChatPhoto;
    "messages.addChatUser": messages_addChatUser;
    "messages.deleteChatUser": messages_deleteChatUser;
    "messages.createChat": messages_createChat;
    "messages.getDhConfig": messages_getDhConfig;
    "messages.requestEncryption": messages_requestEncryption;
    "messages.acceptEncryption": messages_acceptEncryption;
    "messages.discardEncryption": messages_discardEncryption;
    "messages.setEncryptedTyping": messages_setEncryptedTyping;
    "messages.readEncryptedHistory": messages_readEncryptedHistory;
    "messages.sendEncrypted": messages_sendEncrypted;
    "messages.sendEncryptedFile": messages_sendEncryptedFile;
    "messages.sendEncryptedService": messages_sendEncryptedService;
    "messages.receivedQueue": messages_receivedQueue;
    "messages.reportEncryptedSpam": messages_reportEncryptedSpam;
    "messages.readMessageContents": messages_readMessageContents;
    "messages.getStickers": messages_getStickers;
    "messages.getAllStickers": messages_getAllStickers;
    "messages.getWebPagePreview": messages_getWebPagePreview;
    "messages.exportChatInvite": messages_exportChatInvite;
    "messages.checkChatInvite": messages_checkChatInvite;
    "messages.importChatInvite": messages_importChatInvite;
    "messages.getStickerSet": messages_getStickerSet;
    "messages.installStickerSet": messages_installStickerSet;
    "messages.uninstallStickerSet": messages_uninstallStickerSet;
    "messages.startBot": messages_startBot;
    "messages.getMessagesViews": messages_getMessagesViews;
    "messages.editChatAdmin": messages_editChatAdmin;
    "messages.migrateChat": messages_migrateChat;
    "messages.searchGlobal": messages_searchGlobal;
    "messages.reorderStickerSets": messages_reorderStickerSets;
    "messages.getDocumentByHash": messages_getDocumentByHash;
    "messages.getSavedGifs": messages_getSavedGifs;
    "messages.saveGif": messages_saveGif;
    "messages.getInlineBotResults": messages_getInlineBotResults;
    "messages.setInlineBotResults": messages_setInlineBotResults;
    "messages.sendInlineBotResult": messages_sendInlineBotResult;
    "messages.getMessageEditData": messages_getMessageEditData;
    "messages.editMessage": messages_editMessage;
    "messages.editInlineBotMessage": messages_editInlineBotMessage;
    "messages.getBotCallbackAnswer": messages_getBotCallbackAnswer;
    "messages.setBotCallbackAnswer": messages_setBotCallbackAnswer;
    "messages.getPeerDialogs": messages_getPeerDialogs;
    "messages.saveDraft": messages_saveDraft;
    "messages.getAllDrafts": messages_getAllDrafts;
    "messages.getFeaturedStickers": messages_getFeaturedStickers;
    "messages.readFeaturedStickers": messages_readFeaturedStickers;
    "messages.getRecentStickers": messages_getRecentStickers;
    "messages.saveRecentSticker": messages_saveRecentSticker;
    "messages.clearRecentStickers": messages_clearRecentStickers;
    "messages.getArchivedStickers": messages_getArchivedStickers;
    "messages.getMaskStickers": messages_getMaskStickers;
    "messages.getAttachedStickers": messages_getAttachedStickers;
    "messages.setGameScore": messages_setGameScore;
    "messages.setInlineGameScore": messages_setInlineGameScore;
    "messages.getGameHighScores": messages_getGameHighScores;
    "messages.getInlineGameHighScores": messages_getInlineGameHighScores;
    "messages.getCommonChats": messages_getCommonChats;
    "messages.getWebPage": messages_getWebPage;
    "messages.toggleDialogPin": messages_toggleDialogPin;
    "messages.reorderPinnedDialogs": messages_reorderPinnedDialogs;
    "messages.getPinnedDialogs": messages_getPinnedDialogs;
    "messages.setBotShippingResults": messages_setBotShippingResults;
    "messages.setBotPrecheckoutResults": messages_setBotPrecheckoutResults;
    "messages.uploadMedia": messages_uploadMedia;
    "messages.sendScreenshotNotification": messages_sendScreenshotNotification;
    "messages.getFavedStickers": messages_getFavedStickers;
    "messages.faveSticker": messages_faveSticker;
    "messages.getUnreadMentions": messages_getUnreadMentions;
    "messages.readMentions": messages_readMentions;
    "messages.getRecentLocations": messages_getRecentLocations;
    "messages.sendMultiMedia": messages_sendMultiMedia;
    "messages.uploadEncryptedFile": messages_uploadEncryptedFile;
    "messages.searchStickerSets": messages_searchStickerSets;
    "messages.getSplitRanges": messages_getSplitRanges;
    "messages.markDialogUnread": messages_markDialogUnread;
    "messages.getDialogUnreadMarks": messages_getDialogUnreadMarks;
    "messages.clearAllDrafts": messages_clearAllDrafts;
    "messages.updatePinnedMessage": messages_updatePinnedMessage;
    "messages.sendVote": messages_sendVote;
    "messages.getPollResults": messages_getPollResults;
    "messages.getOnlines": messages_getOnlines;
    "messages.editChatAbout": messages_editChatAbout;
    "messages.editChatDefaultBannedRights": messages_editChatDefaultBannedRights;
    "messages.getEmojiKeywords": messages_getEmojiKeywords;
    "messages.getEmojiKeywordsDifference": messages_getEmojiKeywordsDifference;
    "messages.getEmojiKeywordsLanguages": messages_getEmojiKeywordsLanguages;
    "messages.getEmojiURL": messages_getEmojiURL;
    "messages.getSearchCounters": messages_getSearchCounters;
    "messages.requestUrlAuth": messages_requestUrlAuth;
    "messages.acceptUrlAuth": messages_acceptUrlAuth;
    "messages.hidePeerSettingsBar": messages_hidePeerSettingsBar;
    "messages.getScheduledHistory": messages_getScheduledHistory;
    "messages.getScheduledMessages": messages_getScheduledMessages;
    "messages.sendScheduledMessages": messages_sendScheduledMessages;
    "messages.deleteScheduledMessages": messages_deleteScheduledMessages;
    "messages.getPollVotes": messages_getPollVotes;
    "messages.toggleStickerSets": messages_toggleStickerSets;
    "messages.getDialogFilters": messages_getDialogFilters;
    "messages.getSuggestedDialogFilters": messages_getSuggestedDialogFilters;
    "messages.updateDialogFilter": messages_updateDialogFilter;
    "messages.updateDialogFiltersOrder": messages_updateDialogFiltersOrder;
    "messages.getOldFeaturedStickers": messages_getOldFeaturedStickers;
    "messages.getReplies": messages_getReplies;
    "messages.getDiscussionMessage": messages_getDiscussionMessage;
    "messages.readDiscussion": messages_readDiscussion;
    "messages.unpinAllMessages": messages_unpinAllMessages;
    "messages.deleteChat": messages_deleteChat;
    "messages.deletePhoneCallHistory": messages_deletePhoneCallHistory;
    "messages.checkHistoryImport": messages_checkHistoryImport;
    "messages.initHistoryImport": messages_initHistoryImport;
    "messages.uploadImportedMedia": messages_uploadImportedMedia;
    "messages.startHistoryImport": messages_startHistoryImport;
    "messages.getExportedChatInvites": messages_getExportedChatInvites;
    "messages.getExportedChatInvite": messages_getExportedChatInvite;
    "messages.editExportedChatInvite": messages_editExportedChatInvite;
    "messages.deleteRevokedExportedChatInvites": messages_deleteRevokedExportedChatInvites;
    "messages.deleteExportedChatInvite": messages_deleteExportedChatInvite;
    "messages.getAdminsWithInvites": messages_getAdminsWithInvites;
    "messages.getChatInviteImporters": messages_getChatInviteImporters;
    "messages.setHistoryTTL": messages_setHistoryTTL;
    "messages.checkHistoryImportPeer": messages_checkHistoryImportPeer;
    "messages.setChatTheme": messages_setChatTheme;
    "messages.getMessageReadParticipants": messages_getMessageReadParticipants;
    "messages.getSearchResultsCalendar": messages_getSearchResultsCalendar;
    "messages.getSearchResultsPositions": messages_getSearchResultsPositions;
    "messages.hideChatJoinRequest": messages_hideChatJoinRequest;
    "messages.hideAllChatJoinRequests": messages_hideAllChatJoinRequests;
    "messages.toggleNoForwards": messages_toggleNoForwards;
    "messages.saveDefaultSendAs": messages_saveDefaultSendAs;
    "messages.sendReaction": messages_sendReaction;
    "messages.getMessagesReactions": messages_getMessagesReactions;
    "messages.getMessageReactionsList": messages_getMessageReactionsList;
    "messages.setChatAvailableReactions": messages_setChatAvailableReactions;
    "messages.getAvailableReactions": messages_getAvailableReactions;
    "messages.setDefaultReaction": messages_setDefaultReaction;
    "messages.translateText": messages_translateText;
    "messages.getUnreadReactions": messages_getUnreadReactions;
    "messages.readReactions": messages_readReactions;
    "messages.searchSentMedia": messages_searchSentMedia;
    "messages.getAttachMenuBots": messages_getAttachMenuBots;
    "messages.getAttachMenuBot": messages_getAttachMenuBot;
    "messages.toggleBotInAttachMenu": messages_toggleBotInAttachMenu;
    "messages.requestWebView": messages_requestWebView;
    "messages.prolongWebView": messages_prolongWebView;
    "messages.requestSimpleWebView": messages_requestSimpleWebView;
    "messages.sendWebViewResultMessage": messages_sendWebViewResultMessage;
    "messages.sendWebViewData": messages_sendWebViewData;
    "messages.transcribeAudio": messages_transcribeAudio;
    "messages.rateTranscribedAudio": messages_rateTranscribedAudio;
    "messages.getCustomEmojiDocuments": messages_getCustomEmojiDocuments;
    "messages.getEmojiStickers": messages_getEmojiStickers;
    "messages.getFeaturedEmojiStickers": messages_getFeaturedEmojiStickers;
    "messages.reportReaction": messages_reportReaction;
    "messages.getTopReactions": messages_getTopReactions;
    "messages.getRecentReactions": messages_getRecentReactions;
    "messages.clearRecentReactions": messages_clearRecentReactions;
    "messages.getExtendedMedia": messages_getExtendedMedia;
    "messages.setDefaultHistoryTTL": messages_setDefaultHistoryTTL;
    "messages.getDefaultHistoryTTL": messages_getDefaultHistoryTTL;
    "messages.sendBotRequestedPeer": messages_sendBotRequestedPeer;
    "messages.getEmojiGroups": messages_getEmojiGroups;
    "messages.getEmojiStatusGroups": messages_getEmojiStatusGroups;
    "messages.getEmojiProfilePhotoGroups": messages_getEmojiProfilePhotoGroups;
    "messages.searchCustomEmoji": messages_searchCustomEmoji;
    "messages.togglePeerTranslations": messages_togglePeerTranslations;
    "messages.getBotApp": messages_getBotApp;
    "messages.requestAppWebView": messages_requestAppWebView;
    "messages.setChatWallPaper": messages_setChatWallPaper;
    "messages.searchEmojiStickerSets": messages_searchEmojiStickerSets;
    "messages.getSavedDialogs": messages_getSavedDialogs;
    "messages.getSavedHistory": messages_getSavedHistory;
    "messages.deleteSavedHistory": messages_deleteSavedHistory;
    "messages.getPinnedSavedDialogs": messages_getPinnedSavedDialogs;
    "messages.toggleSavedDialogPin": messages_toggleSavedDialogPin;
    "messages.reorderPinnedSavedDialogs": messages_reorderPinnedSavedDialogs;
    "messages.getSavedReactionTags": messages_getSavedReactionTags;
    "messages.updateSavedReactionTag": messages_updateSavedReactionTag;
    "messages.getDefaultTagReactions": messages_getDefaultTagReactions;
    "messages.getOutboxReadDate": messages_getOutboxReadDate;
    "messages.getQuickReplies": messages_getQuickReplies;
    "messages.reorderQuickReplies": messages_reorderQuickReplies;
    "messages.checkQuickReplyShortcut": messages_checkQuickReplyShortcut;
    "messages.editQuickReplyShortcut": messages_editQuickReplyShortcut;
    "messages.deleteQuickReplyShortcut": messages_deleteQuickReplyShortcut;
    "messages.getQuickReplyMessages": messages_getQuickReplyMessages;
    "messages.sendQuickReplyMessages": messages_sendQuickReplyMessages;
    "messages.deleteQuickReplyMessages": messages_deleteQuickReplyMessages;
    "messages.toggleDialogFilterTags": messages_toggleDialogFilterTags;
    "messages.getMyStickers": messages_getMyStickers;
    "messages.getEmojiStickerGroups": messages_getEmojiStickerGroups;
    "messages.getAvailableEffects": messages_getAvailableEffects;
    "messages.editFactCheck": messages_editFactCheck;
    "messages.deleteFactCheck": messages_deleteFactCheck;
    "messages.getFactCheck": messages_getFactCheck;
    "messages.requestMainWebView": messages_requestMainWebView;
    "messages.sendPaidReaction": messages_sendPaidReaction;
    "messages.togglePaidReactionPrivacy": messages_togglePaidReactionPrivacy;
    "messages.getPaidReactionPrivacy": messages_getPaidReactionPrivacy;
    "messages.viewSponsoredMessage": messages_viewSponsoredMessage;
    "messages.clickSponsoredMessage": messages_clickSponsoredMessage;
    "messages.reportSponsoredMessage": messages_reportSponsoredMessage;
    "messages.getSponsoredMessages": messages_getSponsoredMessages;
    "messages.savePreparedInlineMessage": messages_savePreparedInlineMessage;
    "messages.getPreparedInlineMessage": messages_getPreparedInlineMessage;
    "messages.searchStickers": messages_searchStickers;
    "messages.reportMessagesDelivery": messages_reportMessagesDelivery;
    "messages.getSavedDialogsByID": messages_getSavedDialogsByID;
    "messages.readSavedHistory": messages_readSavedHistory;
    "messages.toggleTodoCompleted": messages_toggleTodoCompleted;
    "messages.appendTodoList": messages_appendTodoList;
    "messages.toggleSuggestedPostApproval": messages_toggleSuggestedPostApproval;
    "messages.getForumTopics": messages_getForumTopics;
    "messages.getForumTopicsByID": messages_getForumTopicsByID;
    "messages.editForumTopic": messages_editForumTopic;
    "messages.updatePinnedForumTopic": messages_updatePinnedForumTopic;
    "messages.reorderPinnedForumTopics": messages_reorderPinnedForumTopics;
    "messages.createForumTopic": messages_createForumTopic;
    "messages.deleteTopicHistory": messages_deleteTopicHistory;
    "messages.getEmojiGameInfo": messages_getEmojiGameInfo;
    "messages.summarizeText": messages_summarizeText;
    "updates.getState": updates_getState;
    "updates.getDifference": updates_getDifference;
    "updates.getChannelDifference": updates_getChannelDifference;
    "photos.updateProfilePhoto": photos_updateProfilePhoto;
    "photos.uploadProfilePhoto": photos_uploadProfilePhoto;
    "photos.deletePhotos": photos_deletePhotos;
    "photos.getUserPhotos": photos_getUserPhotos;
    "photos.uploadContactProfilePhoto": photos_uploadContactProfilePhoto;
    "upload.saveFilePart": upload_saveFilePart;
    "upload.getFile": upload_getFile;
    "upload.saveBigFilePart": upload_saveBigFilePart;
    "upload.getWebFile": upload_getWebFile;
    "upload.getCdnFile": upload_getCdnFile;
    "upload.reuploadCdnFile": upload_reuploadCdnFile;
    "upload.getCdnFileHashes": upload_getCdnFileHashes;
    "upload.getFileHashes": upload_getFileHashes;
    "help.getConfig": help_getConfig;
    "help.getNearestDc": help_getNearestDc;
    "help.getAppUpdate": help_getAppUpdate;
    "help.getInviteText": help_getInviteText;
    "help.getSupport": help_getSupport;
    "help.setBotUpdatesStatus": help_setBotUpdatesStatus;
    "help.getCdnConfig": help_getCdnConfig;
    "help.getRecentMeUrls": help_getRecentMeUrls;
    "help.getTermsOfServiceUpdate": help_getTermsOfServiceUpdate;
    "help.acceptTermsOfService": help_acceptTermsOfService;
    "help.getDeepLinkInfo": help_getDeepLinkInfo;
    "help.getAppConfig": help_getAppConfig;
    "help.saveAppLog": help_saveAppLog;
    "help.getPassportConfig": help_getPassportConfig;
    "help.getSupportName": help_getSupportName;
    "help.getUserInfo": help_getUserInfo;
    "help.editUserInfo": help_editUserInfo;
    "help.getPromoData": help_getPromoData;
    "help.hidePromoData": help_hidePromoData;
    "help.dismissSuggestion": help_dismissSuggestion;
    "help.getCountriesList": help_getCountriesList;
    "help.getPremiumPromo": help_getPremiumPromo;
    "help.getPeerColors": help_getPeerColors;
    "help.getPeerProfileColors": help_getPeerProfileColors;
    "help.getTimezonesList": help_getTimezonesList;
    "channels.readHistory": channels_readHistory;
    "channels.deleteMessages": channels_deleteMessages;
    "channels.reportSpam": channels_reportSpam;
    "channels.getMessages": channels_getMessages;
    "channels.getParticipants": channels_getParticipants;
    "channels.getParticipant": channels_getParticipant;
    "channels.getChannels": channels_getChannels;
    "channels.getFullChannel": channels_getFullChannel;
    "channels.createChannel": channels_createChannel;
    "channels.editAdmin": channels_editAdmin;
    "channels.editTitle": channels_editTitle;
    "channels.editPhoto": channels_editPhoto;
    "channels.checkUsername": channels_checkUsername;
    "channels.updateUsername": channels_updateUsername;
    "channels.joinChannel": channels_joinChannel;
    "channels.leaveChannel": channels_leaveChannel;
    "channels.inviteToChannel": channels_inviteToChannel;
    "channels.deleteChannel": channels_deleteChannel;
    "channels.exportMessageLink": channels_exportMessageLink;
    "channels.toggleSignatures": channels_toggleSignatures;
    "channels.getAdminedPublicChannels": channels_getAdminedPublicChannels;
    "channels.editBanned": channels_editBanned;
    "channels.getAdminLog": channels_getAdminLog;
    "channels.setStickers": channels_setStickers;
    "channels.readMessageContents": channels_readMessageContents;
    "channels.deleteHistory": channels_deleteHistory;
    "channels.togglePreHistoryHidden": channels_togglePreHistoryHidden;
    "channels.getLeftChannels": channels_getLeftChannels;
    "channels.getGroupsForDiscussion": channels_getGroupsForDiscussion;
    "channels.setDiscussionGroup": channels_setDiscussionGroup;
    "channels.editCreator": channels_editCreator;
    "channels.editLocation": channels_editLocation;
    "channels.toggleSlowMode": channels_toggleSlowMode;
    "channels.getInactiveChannels": channels_getInactiveChannels;
    "channels.convertToGigagroup": channels_convertToGigagroup;
    "channels.getSendAs": channels_getSendAs;
    "channels.deleteParticipantHistory": channels_deleteParticipantHistory;
    "channels.toggleJoinToSend": channels_toggleJoinToSend;
    "channels.toggleJoinRequest": channels_toggleJoinRequest;
    "channels.reorderUsernames": channels_reorderUsernames;
    "channels.toggleUsername": channels_toggleUsername;
    "channels.deactivateAllUsernames": channels_deactivateAllUsernames;
    "channels.toggleForum": channels_toggleForum;
    "channels.toggleAntiSpam": channels_toggleAntiSpam;
    "channels.reportAntiSpamFalsePositive": channels_reportAntiSpamFalsePositive;
    "channels.toggleParticipantsHidden": channels_toggleParticipantsHidden;
    "channels.updateColor": channels_updateColor;
    "channels.toggleViewForumAsMessages": channels_toggleViewForumAsMessages;
    "channels.getChannelRecommendations": channels_getChannelRecommendations;
    "channels.updateEmojiStatus": channels_updateEmojiStatus;
    "channels.setBoostsToUnblockRestrictions": channels_setBoostsToUnblockRestrictions;
    "channels.setEmojiStickers": channels_setEmojiStickers;
    "channels.restrictSponsoredMessages": channels_restrictSponsoredMessages;
    "channels.searchPosts": channels_searchPosts;
    "channels.updatePaidMessagesPrice": channels_updatePaidMessagesPrice;
    "channels.toggleAutotranslation": channels_toggleAutotranslation;
    "channels.getMessageAuthor": channels_getMessageAuthor;
    "channels.checkSearchPostsFlood": channels_checkSearchPostsFlood;
    "channels.setMainProfileTab": channels_setMainProfileTab;
    "bots.sendCustomRequest": bots_sendCustomRequest;
    "bots.answerWebhookJSONQuery": bots_answerWebhookJSONQuery;
    "bots.setBotCommands": bots_setBotCommands;
    "bots.resetBotCommands": bots_resetBotCommands;
    "bots.getBotCommands": bots_getBotCommands;
    "bots.setBotMenuButton": bots_setBotMenuButton;
    "bots.getBotMenuButton": bots_getBotMenuButton;
    "bots.setBotBroadcastDefaultAdminRights": bots_setBotBroadcastDefaultAdminRights;
    "bots.setBotGroupDefaultAdminRights": bots_setBotGroupDefaultAdminRights;
    "bots.setBotInfo": bots_setBotInfo;
    "bots.getBotInfo": bots_getBotInfo;
    "bots.reorderUsernames": bots_reorderUsernames;
    "bots.toggleUsername": bots_toggleUsername;
    "bots.canSendMessage": bots_canSendMessage;
    "bots.allowSendMessage": bots_allowSendMessage;
    "bots.invokeWebViewCustomMethod": bots_invokeWebViewCustomMethod;
    "bots.getPopularAppBots": bots_getPopularAppBots;
    "bots.addPreviewMedia": bots_addPreviewMedia;
    "bots.editPreviewMedia": bots_editPreviewMedia;
    "bots.deletePreviewMedia": bots_deletePreviewMedia;
    "bots.reorderPreviewMedias": bots_reorderPreviewMedias;
    "bots.getPreviewInfo": bots_getPreviewInfo;
    "bots.getPreviewMedias": bots_getPreviewMedias;
    "bots.updateUserEmojiStatus": bots_updateUserEmojiStatus;
    "bots.toggleUserEmojiStatusPermission": bots_toggleUserEmojiStatusPermission;
    "bots.checkDownloadFileParams": bots_checkDownloadFileParams;
    "bots.getAdminedBots": bots_getAdminedBots;
    "bots.updateStarRefProgram": bots_updateStarRefProgram;
    "bots.setCustomVerification": bots_setCustomVerification;
    "bots.getBotRecommendations": bots_getBotRecommendations;
    "payments.getPaymentForm": payments_getPaymentForm;
    "payments.getPaymentReceipt": payments_getPaymentReceipt;
    "payments.validateRequestedInfo": payments_validateRequestedInfo;
    "payments.sendPaymentForm": payments_sendPaymentForm;
    "payments.getSavedInfo": payments_getSavedInfo;
    "payments.clearSavedInfo": payments_clearSavedInfo;
    "payments.getBankCardData": payments_getBankCardData;
    "payments.exportInvoice": payments_exportInvoice;
    "payments.assignAppStoreTransaction": payments_assignAppStoreTransaction;
    "payments.assignPlayMarketTransaction": payments_assignPlayMarketTransaction;
    "payments.getPremiumGiftCodeOptions": payments_getPremiumGiftCodeOptions;
    "payments.checkGiftCode": payments_checkGiftCode;
    "payments.applyGiftCode": payments_applyGiftCode;
    "payments.getGiveawayInfo": payments_getGiveawayInfo;
    "payments.launchPrepaidGiveaway": payments_launchPrepaidGiveaway;
    "payments.getStarsTopupOptions": payments_getStarsTopupOptions;
    "payments.getStarsStatus": payments_getStarsStatus;
    "payments.getStarsTransactions": payments_getStarsTransactions;
    "payments.sendStarsForm": payments_sendStarsForm;
    "payments.refundStarsCharge": payments_refundStarsCharge;
    "payments.getStarsRevenueStats": payments_getStarsRevenueStats;
    "payments.getStarsRevenueWithdrawalUrl": payments_getStarsRevenueWithdrawalUrl;
    "payments.getStarsRevenueAdsAccountUrl": payments_getStarsRevenueAdsAccountUrl;
    "payments.getStarsTransactionsByID": payments_getStarsTransactionsByID;
    "payments.getStarsGiftOptions": payments_getStarsGiftOptions;
    "payments.getStarsSubscriptions": payments_getStarsSubscriptions;
    "payments.changeStarsSubscription": payments_changeStarsSubscription;
    "payments.fulfillStarsSubscription": payments_fulfillStarsSubscription;
    "payments.getStarsGiveawayOptions": payments_getStarsGiveawayOptions;
    "payments.getStarGifts": payments_getStarGifts;
    "payments.saveStarGift": payments_saveStarGift;
    "payments.convertStarGift": payments_convertStarGift;
    "payments.botCancelStarsSubscription": payments_botCancelStarsSubscription;
    "payments.getConnectedStarRefBots": payments_getConnectedStarRefBots;
    "payments.getConnectedStarRefBot": payments_getConnectedStarRefBot;
    "payments.getSuggestedStarRefBots": payments_getSuggestedStarRefBots;
    "payments.connectStarRefBot": payments_connectStarRefBot;
    "payments.editConnectedStarRefBot": payments_editConnectedStarRefBot;
    "payments.getStarGiftUpgradePreview": payments_getStarGiftUpgradePreview;
    "payments.upgradeStarGift": payments_upgradeStarGift;
    "payments.transferStarGift": payments_transferStarGift;
    "payments.getUniqueStarGift": payments_getUniqueStarGift;
    "payments.getSavedStarGifts": payments_getSavedStarGifts;
    "payments.getSavedStarGift": payments_getSavedStarGift;
    "payments.getStarGiftWithdrawalUrl": payments_getStarGiftWithdrawalUrl;
    "payments.toggleChatStarGiftNotifications": payments_toggleChatStarGiftNotifications;
    "payments.toggleStarGiftsPinnedToTop": payments_toggleStarGiftsPinnedToTop;
    "payments.canPurchaseStore": payments_canPurchaseStore;
    "payments.getResaleStarGifts": payments_getResaleStarGifts;
    "payments.updateStarGiftPrice": payments_updateStarGiftPrice;
    "payments.createStarGiftCollection": payments_createStarGiftCollection;
    "payments.updateStarGiftCollection": payments_updateStarGiftCollection;
    "payments.reorderStarGiftCollections": payments_reorderStarGiftCollections;
    "payments.deleteStarGiftCollection": payments_deleteStarGiftCollection;
    "payments.getStarGiftCollections": payments_getStarGiftCollections;
    "payments.getUniqueStarGiftValueInfo": payments_getUniqueStarGiftValueInfo;
    "payments.checkCanSendGift": payments_checkCanSendGift;
    "payments.getStarGiftAuctionState": payments_getStarGiftAuctionState;
    "payments.getStarGiftAuctionAcquiredGifts": payments_getStarGiftAuctionAcquiredGifts;
    "payments.getStarGiftActiveAuctions": payments_getStarGiftActiveAuctions;
    "payments.resolveStarGiftOffer": payments_resolveStarGiftOffer;
    "payments.sendStarGiftOffer": payments_sendStarGiftOffer;
    "payments.getStarGiftUpgradeAttributes": payments_getStarGiftUpgradeAttributes;
    "stickers.createStickerSet": stickers_createStickerSet;
    "stickers.removeStickerFromSet": stickers_removeStickerFromSet;
    "stickers.changeStickerPosition": stickers_changeStickerPosition;
    "stickers.addStickerToSet": stickers_addStickerToSet;
    "stickers.setStickerSetThumb": stickers_setStickerSetThumb;
    "stickers.checkShortName": stickers_checkShortName;
    "stickers.suggestShortName": stickers_suggestShortName;
    "stickers.changeSticker": stickers_changeSticker;
    "stickers.renameStickerSet": stickers_renameStickerSet;
    "stickers.deleteStickerSet": stickers_deleteStickerSet;
    "stickers.replaceSticker": stickers_replaceSticker;
    "phone.getCallConfig": phone_getCallConfig;
    "phone.requestCall": phone_requestCall;
    "phone.acceptCall": phone_acceptCall;
    "phone.confirmCall": phone_confirmCall;
    "phone.receivedCall": phone_receivedCall;
    "phone.discardCall": phone_discardCall;
    "phone.setCallRating": phone_setCallRating;
    "phone.saveCallDebug": phone_saveCallDebug;
    "phone.sendSignalingData": phone_sendSignalingData;
    "phone.createGroupCall": phone_createGroupCall;
    "phone.joinGroupCall": phone_joinGroupCall;
    "phone.leaveGroupCall": phone_leaveGroupCall;
    "phone.inviteToGroupCall": phone_inviteToGroupCall;
    "phone.discardGroupCall": phone_discardGroupCall;
    "phone.toggleGroupCallSettings": phone_toggleGroupCallSettings;
    "phone.getGroupCall": phone_getGroupCall;
    "phone.getGroupParticipants": phone_getGroupParticipants;
    "phone.checkGroupCall": phone_checkGroupCall;
    "phone.toggleGroupCallRecord": phone_toggleGroupCallRecord;
    "phone.editGroupCallParticipant": phone_editGroupCallParticipant;
    "phone.editGroupCallTitle": phone_editGroupCallTitle;
    "phone.getGroupCallJoinAs": phone_getGroupCallJoinAs;
    "phone.exportGroupCallInvite": phone_exportGroupCallInvite;
    "phone.toggleGroupCallStartSubscription": phone_toggleGroupCallStartSubscription;
    "phone.startScheduledGroupCall": phone_startScheduledGroupCall;
    "phone.saveDefaultGroupCallJoinAs": phone_saveDefaultGroupCallJoinAs;
    "phone.joinGroupCallPresentation": phone_joinGroupCallPresentation;
    "phone.leaveGroupCallPresentation": phone_leaveGroupCallPresentation;
    "phone.getGroupCallStreamChannels": phone_getGroupCallStreamChannels;
    "phone.getGroupCallStreamRtmpUrl": phone_getGroupCallStreamRtmpUrl;
    "phone.saveCallLog": phone_saveCallLog;
    "phone.createConferenceCall": phone_createConferenceCall;
    "phone.deleteConferenceCallParticipants": phone_deleteConferenceCallParticipants;
    "phone.sendConferenceCallBroadcast": phone_sendConferenceCallBroadcast;
    "phone.inviteConferenceCallParticipant": phone_inviteConferenceCallParticipant;
    "phone.declineConferenceCallInvite": phone_declineConferenceCallInvite;
    "phone.getGroupCallChainBlocks": phone_getGroupCallChainBlocks;
    "phone.sendGroupCallMessage": phone_sendGroupCallMessage;
    "phone.sendGroupCallEncryptedMessage": phone_sendGroupCallEncryptedMessage;
    "phone.deleteGroupCallMessages": phone_deleteGroupCallMessages;
    "phone.deleteGroupCallParticipantMessages": phone_deleteGroupCallParticipantMessages;
    "phone.getGroupCallStars": phone_getGroupCallStars;
    "phone.saveDefaultSendAs": phone_saveDefaultSendAs;
    "langpack.getLangPack": langpack_getLangPack;
    "langpack.getStrings": langpack_getStrings;
    "langpack.getDifference": langpack_getDifference;
    "langpack.getLanguages": langpack_getLanguages;
    "langpack.getLanguage": langpack_getLanguage;
    "folders.editPeerFolders": folders_editPeerFolders;
    "stats.getBroadcastStats": stats_getBroadcastStats;
    "stats.loadAsyncGraph": stats_loadAsyncGraph;
    "stats.getMegagroupStats": stats_getMegagroupStats;
    "stats.getMessagePublicForwards": stats_getMessagePublicForwards;
    "stats.getMessageStats": stats_getMessageStats;
    "stats.getStoryStats": stats_getStoryStats;
    "stats.getStoryPublicForwards": stats_getStoryPublicForwards;
    "chatlists.exportChatlistInvite": chatlists_exportChatlistInvite;
    "chatlists.deleteExportedInvite": chatlists_deleteExportedInvite;
    "chatlists.editExportedInvite": chatlists_editExportedInvite;
    "chatlists.getExportedInvites": chatlists_getExportedInvites;
    "chatlists.checkChatlistInvite": chatlists_checkChatlistInvite;
    "chatlists.joinChatlistInvite": chatlists_joinChatlistInvite;
    "chatlists.getChatlistUpdates": chatlists_getChatlistUpdates;
    "chatlists.joinChatlistUpdates": chatlists_joinChatlistUpdates;
    "chatlists.hideChatlistUpdates": chatlists_hideChatlistUpdates;
    "chatlists.getLeaveChatlistSuggestions": chatlists_getLeaveChatlistSuggestions;
    "chatlists.leaveChatlist": chatlists_leaveChatlist;
    "stories.canSendStory": stories_canSendStory;
    "stories.sendStory": stories_sendStory;
    "stories.editStory": stories_editStory;
    "stories.deleteStories": stories_deleteStories;
    "stories.togglePinned": stories_togglePinned;
    "stories.getAllStories": stories_getAllStories;
    "stories.getPinnedStories": stories_getPinnedStories;
    "stories.getStoriesArchive": stories_getStoriesArchive;
    "stories.getStoriesByID": stories_getStoriesByID;
    "stories.toggleAllStoriesHidden": stories_toggleAllStoriesHidden;
    "stories.readStories": stories_readStories;
    "stories.incrementStoryViews": stories_incrementStoryViews;
    "stories.getStoryViewsList": stories_getStoryViewsList;
    "stories.getStoriesViews": stories_getStoriesViews;
    "stories.exportStoryLink": stories_exportStoryLink;
    "stories.report": stories_report;
    "stories.activateStealthMode": stories_activateStealthMode;
    "stories.sendReaction": stories_sendReaction;
    "stories.getPeerStories": stories_getPeerStories;
    "stories.getAllReadPeerStories": stories_getAllReadPeerStories;
    "stories.getPeerMaxIDs": stories_getPeerMaxIDs;
    "stories.getChatsToSend": stories_getChatsToSend;
    "stories.togglePeerStoriesHidden": stories_togglePeerStoriesHidden;
    "stories.getStoryReactionsList": stories_getStoryReactionsList;
    "stories.togglePinnedToTop": stories_togglePinnedToTop;
    "stories.searchPosts": stories_searchPosts;
    "stories.createAlbum": stories_createAlbum;
    "stories.updateAlbum": stories_updateAlbum;
    "stories.reorderAlbums": stories_reorderAlbums;
    "stories.deleteAlbum": stories_deleteAlbum;
    "stories.getAlbums": stories_getAlbums;
    "stories.getAlbumStories": stories_getAlbumStories;
    "stories.startLive": stories_startLive;
    "premium.getBoostsList": premium_getBoostsList;
    "premium.getMyBoosts": premium_getMyBoosts;
    "premium.applyBoost": premium_applyBoost;
    "premium.getBoostsStatus": premium_getBoostsStatus;
    "premium.getUserBoosts": premium_getUserBoosts;
    "smsjobs.isEligibleToJoin": smsjobs_isEligibleToJoin;
    "smsjobs.join": smsjobs_join;
    "smsjobs.leave": smsjobs_leave;
    "smsjobs.updateSettings": smsjobs_updateSettings;
    "smsjobs.getStatus": smsjobs_getStatus;
    "smsjobs.getSmsJob": smsjobs_getSmsJob;
    "smsjobs.finishJob": smsjobs_finishJob;
    "fragment.getCollectibleInfo": fragment_getCollectibleInfo;
}
export interface Enums {
    "True": True;
    "Error": Error;
    "IpPort": IpPort;
    "AccessPointRule": AccessPointRule;
    "help.ConfigSimple": help_ConfigSimple;
    "InputFileLocation": InputFileLocation;
    "InputPeer": InputPeer;
    "InputUser": InputUser;
    "InputContact": InputContact;
    "InputFile": InputFile;
    "InputMedia": InputMedia;
    "InputChatPhoto": InputChatPhoto;
    "InputGeoPoint": InputGeoPoint;
    "InputPhoto": InputPhoto;
    "Peer": Peer;
    "storage.FileType": storage_FileType;
    "User": User;
    "UserProfilePhoto": UserProfilePhoto;
    "UserStatus": UserStatus;
    "Chat": Chat;
    "ChatFull": ChatFull;
    "ChatParticipant": ChatParticipant;
    "ChatParticipants": ChatParticipants;
    "ChatPhoto": ChatPhoto;
    "Message": Message;
    "MessageMedia": MessageMedia;
    "MessageAction": MessageAction;
    "Dialog": Dialog;
    "Photo": Photo;
    "PhotoSize": PhotoSize;
    "GeoPoint": GeoPoint;
    "auth.SentCode": auth_SentCode;
    "auth.Authorization": auth_Authorization;
    "auth.ExportedAuthorization": auth_ExportedAuthorization;
    "InputNotifyPeer": InputNotifyPeer;
    "InputPeerNotifySettings": InputPeerNotifySettings;
    "PeerNotifySettings": PeerNotifySettings;
    "PeerSettings": PeerSettings;
    "WallPaper": WallPaper;
    "ReportReason": ReportReason;
    "UserFull": UserFull;
    "Contact": Contact;
    "ImportedContact": ImportedContact;
    "ContactStatus": ContactStatus;
    "contacts.Contacts": contacts_Contacts;
    "contacts.ImportedContacts": contacts_ImportedContacts;
    "contacts.Blocked": contacts_Blocked;
    "messages.Dialogs": messages_Dialogs;
    "messages.Messages": messages_Messages;
    "messages.Chats": messages_Chats;
    "messages.ChatFull": messages_ChatFull;
    "messages.AffectedHistory": messages_AffectedHistory;
    "MessagesFilter": MessagesFilter;
    "Update": Update;
    "updates.State": updates_State;
    "updates.Difference": updates_Difference;
    "Updates": Updates;
    "photos.Photos": photos_Photos;
    "photos.Photo": photos_Photo;
    "upload.File": upload_File;
    "DcOption": DcOption;
    "Config": Config;
    "NearestDc": NearestDc;
    "help.AppUpdate": help_AppUpdate;
    "help.InviteText": help_InviteText;
    "EncryptedChat": EncryptedChat;
    "InputEncryptedChat": InputEncryptedChat;
    "EncryptedFile": EncryptedFile;
    "InputEncryptedFile": InputEncryptedFile;
    "EncryptedMessage": EncryptedMessage;
    "messages.DhConfig": messages_DhConfig;
    "messages.SentEncryptedMessage": messages_SentEncryptedMessage;
    "InputDocument": InputDocument;
    "Document": Document;
    "help.Support": help_Support;
    "NotifyPeer": NotifyPeer;
    "SendMessageAction": SendMessageAction;
    "contacts.Found": contacts_Found;
    "InputPrivacyKey": InputPrivacyKey;
    "PrivacyKey": PrivacyKey;
    "InputPrivacyRule": InputPrivacyRule;
    "PrivacyRule": PrivacyRule;
    "account.PrivacyRules": account_PrivacyRules;
    "AccountDaysTTL": AccountDaysTTL;
    "DocumentAttribute": DocumentAttribute;
    "messages.Stickers": messages_Stickers;
    "StickerPack": StickerPack;
    "messages.AllStickers": messages_AllStickers;
    "messages.AffectedMessages": messages_AffectedMessages;
    "WebPage": WebPage;
    "Authorization": Authorization;
    "account.Authorizations": account_Authorizations;
    "account.Password": account_Password;
    "account.PasswordSettings": account_PasswordSettings;
    "account.PasswordInputSettings": account_PasswordInputSettings;
    "auth.PasswordRecovery": auth_PasswordRecovery;
    "ReceivedNotifyMessage": ReceivedNotifyMessage;
    "ExportedChatInvite": ExportedChatInvite;
    "ChatInvite": ChatInvite;
    "InputStickerSet": InputStickerSet;
    "StickerSet": StickerSet;
    "messages.StickerSet": messages_StickerSet;
    "BotCommand": BotCommand;
    "BotInfo": BotInfo;
    "KeyboardButton": KeyboardButton;
    "KeyboardButtonRow": KeyboardButtonRow;
    "ReplyMarkup": ReplyMarkup;
    "MessageEntity": MessageEntity;
    "InputChannel": InputChannel;
    "contacts.ResolvedPeer": contacts_ResolvedPeer;
    "MessageRange": MessageRange;
    "updates.ChannelDifference": updates_ChannelDifference;
    "ChannelMessagesFilter": ChannelMessagesFilter;
    "ChannelParticipant": ChannelParticipant;
    "ChannelParticipantsFilter": ChannelParticipantsFilter;
    "channels.ChannelParticipants": channels_ChannelParticipants;
    "channels.ChannelParticipant": channels_ChannelParticipant;
    "help.TermsOfService": help_TermsOfService;
    "messages.SavedGifs": messages_SavedGifs;
    "InputBotInlineMessage": InputBotInlineMessage;
    "InputBotInlineResult": InputBotInlineResult;
    "BotInlineMessage": BotInlineMessage;
    "BotInlineResult": BotInlineResult;
    "messages.BotResults": messages_BotResults;
    "ExportedMessageLink": ExportedMessageLink;
    "MessageFwdHeader": MessageFwdHeader;
    "auth.CodeType": auth_CodeType;
    "auth.SentCodeType": auth_SentCodeType;
    "messages.BotCallbackAnswer": messages_BotCallbackAnswer;
    "messages.MessageEditData": messages_MessageEditData;
    "InputBotInlineMessageID": InputBotInlineMessageID;
    "InlineBotSwitchPM": InlineBotSwitchPM;
    "messages.PeerDialogs": messages_PeerDialogs;
    "TopPeer": TopPeer;
    "TopPeerCategory": TopPeerCategory;
    "TopPeerCategoryPeers": TopPeerCategoryPeers;
    "contacts.TopPeers": contacts_TopPeers;
    "DraftMessage": DraftMessage;
    "messages.FeaturedStickers": messages_FeaturedStickers;
    "messages.RecentStickers": messages_RecentStickers;
    "messages.ArchivedStickers": messages_ArchivedStickers;
    "messages.StickerSetInstallResult": messages_StickerSetInstallResult;
    "StickerSetCovered": StickerSetCovered;
    "MaskCoords": MaskCoords;
    "InputStickeredMedia": InputStickeredMedia;
    "Game": Game;
    "InputGame": InputGame;
    "HighScore": HighScore;
    "messages.HighScores": messages_HighScores;
    "RichText": RichText;
    "PageBlock": PageBlock;
    "PhoneCallDiscardReason": PhoneCallDiscardReason;
    "DataJSON": DataJSON;
    "LabeledPrice": LabeledPrice;
    "Invoice": Invoice;
    "PaymentCharge": PaymentCharge;
    "PostAddress": PostAddress;
    "PaymentRequestedInfo": PaymentRequestedInfo;
    "PaymentSavedCredentials": PaymentSavedCredentials;
    "WebDocument": WebDocument;
    "InputWebDocument": InputWebDocument;
    "InputWebFileLocation": InputWebFileLocation;
    "upload.WebFile": upload_WebFile;
    "payments.PaymentForm": payments_PaymentForm;
    "payments.ValidatedRequestedInfo": payments_ValidatedRequestedInfo;
    "payments.PaymentResult": payments_PaymentResult;
    "payments.PaymentReceipt": payments_PaymentReceipt;
    "payments.SavedInfo": payments_SavedInfo;
    "InputPaymentCredentials": InputPaymentCredentials;
    "account.TmpPassword": account_TmpPassword;
    "ShippingOption": ShippingOption;
    "InputStickerSetItem": InputStickerSetItem;
    "InputPhoneCall": InputPhoneCall;
    "PhoneCall": PhoneCall;
    "PhoneConnection": PhoneConnection;
    "PhoneCallProtocol": PhoneCallProtocol;
    "phone.PhoneCall": phone_PhoneCall;
    "upload.CdnFile": upload_CdnFile;
    "CdnPublicKey": CdnPublicKey;
    "CdnConfig": CdnConfig;
    "LangPackString": LangPackString;
    "LangPackDifference": LangPackDifference;
    "LangPackLanguage": LangPackLanguage;
    "ChannelAdminLogEventAction": ChannelAdminLogEventAction;
    "ChannelAdminLogEvent": ChannelAdminLogEvent;
    "channels.AdminLogResults": channels_AdminLogResults;
    "ChannelAdminLogEventsFilter": ChannelAdminLogEventsFilter;
    "PopularContact": PopularContact;
    "messages.FavedStickers": messages_FavedStickers;
    "RecentMeUrl": RecentMeUrl;
    "help.RecentMeUrls": help_RecentMeUrls;
    "InputSingleMedia": InputSingleMedia;
    "WebAuthorization": WebAuthorization;
    "account.WebAuthorizations": account_WebAuthorizations;
    "InputMessage": InputMessage;
    "InputDialogPeer": InputDialogPeer;
    "DialogPeer": DialogPeer;
    "messages.FoundStickerSets": messages_FoundStickerSets;
    "FileHash": FileHash;
    "InputClientProxy": InputClientProxy;
    "help.TermsOfServiceUpdate": help_TermsOfServiceUpdate;
    "InputSecureFile": InputSecureFile;
    "SecureFile": SecureFile;
    "SecureData": SecureData;
    "SecurePlainData": SecurePlainData;
    "SecureValueType": SecureValueType;
    "SecureValue": SecureValue;
    "InputSecureValue": InputSecureValue;
    "SecureValueHash": SecureValueHash;
    "SecureValueError": SecureValueError;
    "SecureCredentialsEncrypted": SecureCredentialsEncrypted;
    "account.AuthorizationForm": account_AuthorizationForm;
    "account.SentEmailCode": account_SentEmailCode;
    "help.DeepLinkInfo": help_DeepLinkInfo;
    "SavedContact": SavedContact;
    "account.Takeout": account_Takeout;
    "PasswordKdfAlgo": PasswordKdfAlgo;
    "SecurePasswordKdfAlgo": SecurePasswordKdfAlgo;
    "SecureSecretSettings": SecureSecretSettings;
    "InputCheckPasswordSRP": InputCheckPasswordSRP;
    "SecureRequiredType": SecureRequiredType;
    "help.PassportConfig": help_PassportConfig;
    "InputAppEvent": InputAppEvent;
    "JSONObjectValue": JSONObjectValue;
    "JSONValue": JSONValue;
    "PageTableCell": PageTableCell;
    "PageTableRow": PageTableRow;
    "PageCaption": PageCaption;
    "PageListItem": PageListItem;
    "PageListOrderedItem": PageListOrderedItem;
    "PageRelatedArticle": PageRelatedArticle;
    "Page": Page;
    "help.SupportName": help_SupportName;
    "help.UserInfo": help_UserInfo;
    "PollAnswer": PollAnswer;
    "Poll": Poll;
    "PollAnswerVoters": PollAnswerVoters;
    "PollResults": PollResults;
    "ChatOnlines": ChatOnlines;
    "StatsURL": StatsURL;
    "ChatAdminRights": ChatAdminRights;
    "ChatBannedRights": ChatBannedRights;
    "InputWallPaper": InputWallPaper;
    "account.WallPapers": account_WallPapers;
    "CodeSettings": CodeSettings;
    "WallPaperSettings": WallPaperSettings;
    "AutoDownloadSettings": AutoDownloadSettings;
    "account.AutoDownloadSettings": account_AutoDownloadSettings;
    "EmojiKeyword": EmojiKeyword;
    "EmojiKeywordsDifference": EmojiKeywordsDifference;
    "EmojiURL": EmojiURL;
    "EmojiLanguage": EmojiLanguage;
    "Folder": Folder;
    "InputFolderPeer": InputFolderPeer;
    "FolderPeer": FolderPeer;
    "messages.SearchCounter": messages_SearchCounter;
    "UrlAuthResult": UrlAuthResult;
    "ChannelLocation": ChannelLocation;
    "PeerLocated": PeerLocated;
    "RestrictionReason": RestrictionReason;
    "InputTheme": InputTheme;
    "Theme": Theme;
    "account.Themes": account_Themes;
    "auth.LoginToken": auth_LoginToken;
    "account.ContentSettings": account_ContentSettings;
    "messages.InactiveChats": messages_InactiveChats;
    "BaseTheme": BaseTheme;
    "InputThemeSettings": InputThemeSettings;
    "ThemeSettings": ThemeSettings;
    "WebPageAttribute": WebPageAttribute;
    "messages.VotesList": messages_VotesList;
    "BankCardOpenUrl": BankCardOpenUrl;
    "payments.BankCardData": payments_BankCardData;
    "DialogFilter": DialogFilter;
    "DialogFilterSuggested": DialogFilterSuggested;
    "StatsDateRangeDays": StatsDateRangeDays;
    "StatsAbsValueAndPrev": StatsAbsValueAndPrev;
    "StatsPercentValue": StatsPercentValue;
    "StatsGraph": StatsGraph;
    "stats.BroadcastStats": stats_BroadcastStats;
    "help.PromoData": help_PromoData;
    "VideoSize": VideoSize;
    "StatsGroupTopPoster": StatsGroupTopPoster;
    "StatsGroupTopAdmin": StatsGroupTopAdmin;
    "StatsGroupTopInviter": StatsGroupTopInviter;
    "stats.MegagroupStats": stats_MegagroupStats;
    "GlobalPrivacySettings": GlobalPrivacySettings;
    "help.CountryCode": help_CountryCode;
    "help.Country": help_Country;
    "help.CountriesList": help_CountriesList;
    "MessageViews": MessageViews;
    "messages.MessageViews": messages_MessageViews;
    "messages.DiscussionMessage": messages_DiscussionMessage;
    "MessageReplyHeader": MessageReplyHeader;
    "MessageReplies": MessageReplies;
    "PeerBlocked": PeerBlocked;
    "stats.MessageStats": stats_MessageStats;
    "GroupCall": GroupCall;
    "InputGroupCall": InputGroupCall;
    "GroupCallParticipant": GroupCallParticipant;
    "phone.GroupCall": phone_GroupCall;
    "phone.GroupParticipants": phone_GroupParticipants;
    "InlineQueryPeerType": InlineQueryPeerType;
    "messages.HistoryImport": messages_HistoryImport;
    "messages.HistoryImportParsed": messages_HistoryImportParsed;
    "messages.AffectedFoundMessages": messages_AffectedFoundMessages;
    "ChatInviteImporter": ChatInviteImporter;
    "messages.ExportedChatInvites": messages_ExportedChatInvites;
    "messages.ExportedChatInvite": messages_ExportedChatInvite;
    "messages.ChatInviteImporters": messages_ChatInviteImporters;
    "ChatAdminWithInvites": ChatAdminWithInvites;
    "messages.ChatAdminsWithInvites": messages_ChatAdminsWithInvites;
    "messages.CheckedHistoryImportPeer": messages_CheckedHistoryImportPeer;
    "phone.JoinAsPeers": phone_JoinAsPeers;
    "phone.ExportedGroupCallInvite": phone_ExportedGroupCallInvite;
    "GroupCallParticipantVideoSourceGroup": GroupCallParticipantVideoSourceGroup;
    "GroupCallParticipantVideo": GroupCallParticipantVideo;
    "stickers.SuggestedShortName": stickers_SuggestedShortName;
    "BotCommandScope": BotCommandScope;
    "account.ResetPasswordResult": account_ResetPasswordResult;
    "ChatTheme": ChatTheme;
    "account.ChatThemes": account_ChatThemes;
    "SponsoredMessage": SponsoredMessage;
    "messages.SponsoredMessages": messages_SponsoredMessages;
    "SearchResultsCalendarPeriod": SearchResultsCalendarPeriod;
    "messages.SearchResultsCalendar": messages_SearchResultsCalendar;
    "SearchResultsPosition": SearchResultsPosition;
    "messages.SearchResultsPositions": messages_SearchResultsPositions;
    "channels.SendAsPeers": channels_SendAsPeers;
    "users.UserFull": users_UserFull;
    "messages.PeerSettings": messages_PeerSettings;
    "auth.LoggedOut": auth_LoggedOut;
    "ReactionCount": ReactionCount;
    "MessageReactions": MessageReactions;
    "messages.MessageReactionsList": messages_MessageReactionsList;
    "AvailableReaction": AvailableReaction;
    "messages.AvailableReactions": messages_AvailableReactions;
    "MessagePeerReaction": MessagePeerReaction;
    "GroupCallStreamChannel": GroupCallStreamChannel;
    "phone.GroupCallStreamChannels": phone_GroupCallStreamChannels;
    "phone.GroupCallStreamRtmpUrl": phone_GroupCallStreamRtmpUrl;
    "AttachMenuBotIconColor": AttachMenuBotIconColor;
    "AttachMenuBotIcon": AttachMenuBotIcon;
    "AttachMenuBot": AttachMenuBot;
    "AttachMenuBots": AttachMenuBots;
    "AttachMenuBotsBot": AttachMenuBotsBot;
    "WebViewResult": WebViewResult;
    "WebViewMessageSent": WebViewMessageSent;
    "BotMenuButton": BotMenuButton;
    "account.SavedRingtones": account_SavedRingtones;
    "NotificationSound": NotificationSound;
    "account.SavedRingtone": account_SavedRingtone;
    "AttachMenuPeerType": AttachMenuPeerType;
    "InputInvoice": InputInvoice;
    "payments.ExportedInvoice": payments_ExportedInvoice;
    "messages.TranscribedAudio": messages_TranscribedAudio;
    "help.PremiumPromo": help_PremiumPromo;
    "InputStorePaymentPurpose": InputStorePaymentPurpose;
    "PaymentFormMethod": PaymentFormMethod;
    "EmojiStatus": EmojiStatus;
    "account.EmojiStatuses": account_EmojiStatuses;
    "Reaction": Reaction;
    "ChatReactions": ChatReactions;
    "messages.Reactions": messages_Reactions;
    "EmailVerifyPurpose": EmailVerifyPurpose;
    "EmailVerification": EmailVerification;
    "account.EmailVerified": account_EmailVerified;
    "PremiumSubscriptionOption": PremiumSubscriptionOption;
    "SendAsPeer": SendAsPeer;
    "MessageExtendedMedia": MessageExtendedMedia;
    "StickerKeyword": StickerKeyword;
    "Username": Username;
    "ForumTopic": ForumTopic;
    "messages.ForumTopics": messages_ForumTopics;
    "DefaultHistoryTTL": DefaultHistoryTTL;
    "ExportedContactToken": ExportedContactToken;
    "RequestPeerType": RequestPeerType;
    "EmojiList": EmojiList;
    "EmojiGroup": EmojiGroup;
    "messages.EmojiGroups": messages_EmojiGroups;
    "TextWithEntities": TextWithEntities;
    "messages.TranslatedText": messages_TranslatedText;
    "AutoSaveSettings": AutoSaveSettings;
    "AutoSaveException": AutoSaveException;
    "account.AutoSaveSettings": account_AutoSaveSettings;
    "help.AppConfig": help_AppConfig;
    "InputBotApp": InputBotApp;
    "BotApp": BotApp;
    "messages.BotApp": messages_BotApp;
    "InlineBotWebView": InlineBotWebView;
    "ReadParticipantDate": ReadParticipantDate;
    "InputChatlist": InputChatlist;
    "ExportedChatlistInvite": ExportedChatlistInvite;
    "chatlists.ExportedChatlistInvite": chatlists_ExportedChatlistInvite;
    "chatlists.ExportedInvites": chatlists_ExportedInvites;
    "chatlists.ChatlistInvite": chatlists_ChatlistInvite;
    "chatlists.ChatlistUpdates": chatlists_ChatlistUpdates;
    "bots.BotInfo": bots_BotInfo;
    "MessagePeerVote": MessagePeerVote;
    "StoryViews": StoryViews;
    "StoryItem": StoryItem;
    "stories.AllStories": stories_AllStories;
    "stories.Stories": stories_Stories;
    "StoryView": StoryView;
    "stories.StoryViewsList": stories_StoryViewsList;
    "stories.StoryViews": stories_StoryViews;
    "InputReplyTo": InputReplyTo;
    "ExportedStoryLink": ExportedStoryLink;
    "StoriesStealthMode": StoriesStealthMode;
    "MediaAreaCoordinates": MediaAreaCoordinates;
    "MediaArea": MediaArea;
    "PeerStories": PeerStories;
    "stories.PeerStories": stories_PeerStories;
    "messages.WebPage": messages_WebPage;
    "PremiumGiftCodeOption": PremiumGiftCodeOption;
    "payments.CheckedGiftCode": payments_CheckedGiftCode;
    "payments.GiveawayInfo": payments_GiveawayInfo;
    "PrepaidGiveaway": PrepaidGiveaway;
    "Boost": Boost;
    "premium.BoostsList": premium_BoostsList;
    "MyBoost": MyBoost;
    "premium.MyBoosts": premium_MyBoosts;
    "premium.BoostsStatus": premium_BoostsStatus;
    "StoryFwdHeader": StoryFwdHeader;
    "PostInteractionCounters": PostInteractionCounters;
    "stats.StoryStats": stats_StoryStats;
    "PublicForward": PublicForward;
    "stats.PublicForwards": stats_PublicForwards;
    "PeerColor": PeerColor;
    "help.PeerColorSet": help_PeerColorSet;
    "help.PeerColorOption": help_PeerColorOption;
    "help.PeerColors": help_PeerColors;
    "StoryReaction": StoryReaction;
    "stories.StoryReactionsList": stories_StoryReactionsList;
    "SavedDialog": SavedDialog;
    "messages.SavedDialogs": messages_SavedDialogs;
    "SavedReactionTag": SavedReactionTag;
    "messages.SavedReactionTags": messages_SavedReactionTags;
    "OutboxReadDate": OutboxReadDate;
    "smsjobs.EligibilityToJoin": smsjobs_EligibilityToJoin;
    "smsjobs.Status": smsjobs_Status;
    "SmsJob": SmsJob;
    "BusinessWeeklyOpen": BusinessWeeklyOpen;
    "BusinessWorkHours": BusinessWorkHours;
    "BusinessLocation": BusinessLocation;
    "InputBusinessRecipients": InputBusinessRecipients;
    "BusinessRecipients": BusinessRecipients;
    "BusinessAwayMessageSchedule": BusinessAwayMessageSchedule;
    "InputBusinessGreetingMessage": InputBusinessGreetingMessage;
    "BusinessGreetingMessage": BusinessGreetingMessage;
    "InputBusinessAwayMessage": InputBusinessAwayMessage;
    "BusinessAwayMessage": BusinessAwayMessage;
    "Timezone": Timezone;
    "help.TimezonesList": help_TimezonesList;
    "QuickReply": QuickReply;
    "InputQuickReplyShortcut": InputQuickReplyShortcut;
    "messages.QuickReplies": messages_QuickReplies;
    "ConnectedBot": ConnectedBot;
    "account.ConnectedBots": account_ConnectedBots;
    "messages.DialogFilters": messages_DialogFilters;
    "Birthday": Birthday;
    "BotBusinessConnection": BotBusinessConnection;
    "InputBusinessIntro": InputBusinessIntro;
    "BusinessIntro": BusinessIntro;
    "messages.MyStickers": messages_MyStickers;
    "InputCollectible": InputCollectible;
    "fragment.CollectibleInfo": fragment_CollectibleInfo;
    "InputBusinessBotRecipients": InputBusinessBotRecipients;
    "BusinessBotRecipients": BusinessBotRecipients;
    "ContactBirthday": ContactBirthday;
    "contacts.ContactBirthdays": contacts_ContactBirthdays;
    "MissingInvitee": MissingInvitee;
    "messages.InvitedUsers": messages_InvitedUsers;
    "InputBusinessChatLink": InputBusinessChatLink;
    "BusinessChatLink": BusinessChatLink;
    "account.BusinessChatLinks": account_BusinessChatLinks;
    "account.ResolvedBusinessChatLinks": account_ResolvedBusinessChatLinks;
    "RequestedPeer": RequestedPeer;
    "SponsoredMessageReportOption": SponsoredMessageReportOption;
    "channels.SponsoredMessageReportResult": channels_SponsoredMessageReportResult;
    "ReactionNotificationsFrom": ReactionNotificationsFrom;
    "ReactionsNotifySettings": ReactionsNotifySettings;
    "AvailableEffect": AvailableEffect;
    "messages.AvailableEffects": messages_AvailableEffects;
    "FactCheck": FactCheck;
    "StarsTransactionPeer": StarsTransactionPeer;
    "StarsTopupOption": StarsTopupOption;
    "StarsTransaction": StarsTransaction;
    "payments.StarsStatus": payments_StarsStatus;
    "FoundStory": FoundStory;
    "stories.FoundStories": stories_FoundStories;
    "GeoPointAddress": GeoPointAddress;
    "StarsRevenueStatus": StarsRevenueStatus;
    "payments.StarsRevenueStats": payments_StarsRevenueStats;
    "payments.StarsRevenueWithdrawalUrl": payments_StarsRevenueWithdrawalUrl;
    "payments.StarsRevenueAdsAccountUrl": payments_StarsRevenueAdsAccountUrl;
    "InputStarsTransaction": InputStarsTransaction;
    "StarsGiftOption": StarsGiftOption;
    "bots.PopularAppBots": bots_PopularAppBots;
    "BotPreviewMedia": BotPreviewMedia;
    "bots.PreviewInfo": bots_PreviewInfo;
    "StarsSubscriptionPricing": StarsSubscriptionPricing;
    "StarsSubscription": StarsSubscription;
    "MessageReactor": MessageReactor;
    "StarsGiveawayOption": StarsGiveawayOption;
    "StarsGiveawayWinnersOption": StarsGiveawayWinnersOption;
    "StarGift": StarGift;
    "payments.StarGifts": payments_StarGifts;
    "MessageReportOption": MessageReportOption;
    "ReportResult": ReportResult;
    "messages.BotPreparedInlineMessage": messages_BotPreparedInlineMessage;
    "messages.PreparedInlineMessage": messages_PreparedInlineMessage;
    "BotAppSettings": BotAppSettings;
    "StarRefProgram": StarRefProgram;
    "ConnectedBotStarRef": ConnectedBotStarRef;
    "payments.ConnectedStarRefBots": payments_ConnectedStarRefBots;
    "payments.SuggestedStarRefBots": payments_SuggestedStarRefBots;
    "StarsAmount": StarsAmount;
    "messages.FoundStickers": messages_FoundStickers;
    "BotVerifierSettings": BotVerifierSettings;
    "BotVerification": BotVerification;
    "StarGiftAttribute": StarGiftAttribute;
    "payments.StarGiftUpgradePreview": payments_StarGiftUpgradePreview;
    "users.Users": users_Users;
    "payments.UniqueStarGift": payments_UniqueStarGift;
    "messages.WebPagePreview": messages_WebPagePreview;
    "SavedStarGift": SavedStarGift;
    "payments.SavedStarGifts": payments_SavedStarGifts;
    "InputSavedStarGift": InputSavedStarGift;
    "payments.StarGiftWithdrawalUrl": payments_StarGiftWithdrawalUrl;
    "PaidReactionPrivacy": PaidReactionPrivacy;
    "account.PaidMessagesRevenue": account_PaidMessagesRevenue;
    "RequirementToContact": RequirementToContact;
    "BusinessBotRights": BusinessBotRights;
    "DisallowedGiftsSettings": DisallowedGiftsSettings;
    "SponsoredPeer": SponsoredPeer;
    "contacts.SponsoredPeers": contacts_SponsoredPeers;
    "StarGiftAttributeId": StarGiftAttributeId;
    "StarGiftAttributeCounter": StarGiftAttributeCounter;
    "payments.ResaleStarGifts": payments_ResaleStarGifts;
    "stories.CanSendStoryCount": stories_CanSendStoryCount;
    "PendingSuggestion": PendingSuggestion;
    "TodoItem": TodoItem;
    "TodoList": TodoList;
    "TodoCompletion": TodoCompletion;
    "SuggestedPost": SuggestedPost;
    "StarsRating": StarsRating;
    "StarGiftCollection": StarGiftCollection;
    "payments.StarGiftCollections": payments_StarGiftCollections;
    "StoryAlbum": StoryAlbum;
    "stories.Albums": stories_Albums;
    "SearchPostsFlood": SearchPostsFlood;
    "payments.UniqueStarGiftValueInfo": payments_UniqueStarGiftValueInfo;
    "ProfileTab": ProfileTab;
    "users.SavedMusic": users_SavedMusic;
    "account.SavedMusicIds": account_SavedMusicIds;
    "payments.CheckCanSendGiftResult": payments_CheckCanSendGiftResult;
    "InputChatTheme": InputChatTheme;
    "StarGiftUpgradePrice": StarGiftUpgradePrice;
    "GroupCallMessage": GroupCallMessage;
    "GroupCallDonor": GroupCallDonor;
    "phone.GroupCallStars": phone_GroupCallStars;
    "RecentStory": RecentStory;
    "AuctionBidLevel": AuctionBidLevel;
    "StarGiftAuctionState": StarGiftAuctionState;
    "StarGiftAuctionUserState": StarGiftAuctionUserState;
    "payments.StarGiftAuctionState": payments_StarGiftAuctionState;
    "StarGiftAuctionAcquiredGift": StarGiftAuctionAcquiredGift;
    "payments.StarGiftAuctionAcquiredGifts": payments_StarGiftAuctionAcquiredGifts;
    "StarGiftActiveAuctionState": StarGiftActiveAuctionState;
    "payments.StarGiftActiveAuctions": payments_StarGiftActiveAuctions;
    "InputStarGiftAuction": InputStarGiftAuction;
    "Passkey": Passkey;
    "account.Passkeys": account_Passkeys;
    "account.PasskeyRegistrationOptions": account_PasskeyRegistrationOptions;
    "auth.PasskeyLoginOptions": auth_PasskeyLoginOptions;
    "InputPasskeyResponse": InputPasskeyResponse;
    "InputPasskeyCredential": InputPasskeyCredential;
    "StarGiftBackground": StarGiftBackground;
    "StarGiftAuctionRound": StarGiftAuctionRound;
    "payments.StarGiftUpgradeAttributes": payments_StarGiftUpgradeAttributes;
    "messages.EmojiGameOutcome": messages_EmojiGameOutcome;
    "messages.EmojiGameInfo": messages_EmojiGameInfo;
}
export type AnyType = Types[keyof Types];
export type AnyFunction<T = Function> = Functions<T>[keyof Functions<T>];
export type AnyGenericFunction<T> = invokeAfterMsg<T> | invokeAfterMsgs<T> | initConnection<T> | invokeWithLayer<T> | invokeWithoutUpdates<T> | invokeWithMessagesRange<T> | invokeWithTakeout<T> | invokeWithBusinessConnection<T> | invokeWithGooglePlayIntegrity<T> | invokeWithApnsSecret<T> | invokeWithReCaptcha<T>;
export type AnyObject<T = Function> = AnyType | AnyFunction<T>;
export type True = true_;
export type Error = error;
export type IpPort = ipPort | ipPortSecret;
export type AccessPointRule = accessPointRule;
export type help_ConfigSimple = help_configSimple;
export type InputFileLocation = inputPeerPhotoFileLocationLegacy | inputStickerSetThumbLegacy | inputFileLocation | inputEncryptedFileLocation | inputDocumentFileLocation | inputSecureFileLocation | inputTakeoutFileLocation | inputPhotoFileLocation | inputPhotoLegacyFileLocation | inputPeerPhotoFileLocation | inputStickerSetThumb | inputGroupCallStream;
export type InputPeer = inputPeerEmpty | inputPeerSelf | inputPeerChat | inputPeerUser | inputPeerChannel | inputPeerUserFromMessage | inputPeerChannelFromMessage;
export type InputUser = inputUserEmpty | inputUserSelf | inputUser | inputUserFromMessage;
export type InputContact = inputPhoneContact;
export type InputFile = inputFile | inputFileBig | inputFileStoryDocument;
export type InputMedia = inputMediaEmpty | inputMediaUploadedPhoto | inputMediaPhoto | inputMediaGeoPoint | inputMediaContact | inputMediaUploadedDocument | inputMediaDocument | inputMediaVenue | inputMediaPhotoExternal | inputMediaDocumentExternal | inputMediaGame | inputMediaInvoice | inputMediaGeoLive | inputMediaPoll | inputMediaDice | inputMediaStory | inputMediaWebPage | inputMediaPaidMedia | inputMediaTodo | inputMediaStakeDice;
export type InputChatPhoto = inputChatPhotoEmpty | inputChatUploadedPhoto | inputChatPhoto;
export type InputGeoPoint = inputGeoPointEmpty | inputGeoPoint;
export type InputPhoto = inputPhotoEmpty | inputPhoto;
export type Peer = peerUser | peerChat | peerChannel;
export type storage_FileType = storage_fileUnknown | storage_filePartial | storage_fileJpeg | storage_fileGif | storage_filePng | storage_filePdf | storage_fileMp3 | storage_fileMov | storage_fileMp4 | storage_fileWebp;
export type User = userEmpty | user;
export type UserProfilePhoto = userProfilePhotoEmpty | userProfilePhoto;
export type UserStatus = userStatusEmpty | userStatusOnline | userStatusOffline | userStatusRecently | userStatusLastWeek | userStatusLastMonth;
export type Chat = chatEmpty | chat | chatForbidden | channel | channelForbidden;
export type ChatFull = chatFull | channelFull;
export type ChatParticipant = chatParticipant | chatParticipantCreator | chatParticipantAdmin;
export type ChatParticipants = chatParticipantsForbidden | chatParticipants;
export type ChatPhoto = chatPhotoEmpty | chatPhoto;
export type Message = messageEmpty | message | messageService;
export type MessageMedia = messageMediaEmpty | messageMediaPhoto | messageMediaGeo | messageMediaContact | messageMediaUnsupported | messageMediaDocument | messageMediaWebPage | messageMediaVenue | messageMediaGame | messageMediaInvoice | messageMediaGeoLive | messageMediaPoll | messageMediaDice | messageMediaStory | messageMediaGiveaway | messageMediaGiveawayResults | messageMediaPaidMedia | messageMediaToDo | messageMediaVideoStream;
export type MessageAction = messageActionEmpty | messageActionChatCreate | messageActionChatEditTitle | messageActionChatEditPhoto | messageActionChatDeletePhoto | messageActionChatAddUser | messageActionChatDeleteUser | messageActionChatJoinedByLink | messageActionChannelCreate | messageActionChatMigrateTo | messageActionChannelMigrateFrom | messageActionPinMessage | messageActionHistoryClear | messageActionGameScore | messageActionPaymentSentMe | messageActionPaymentSent | messageActionPhoneCall | messageActionScreenshotTaken | messageActionCustomAction | messageActionBotAllowed | messageActionSecureValuesSentMe | messageActionSecureValuesSent | messageActionContactSignUp | messageActionGeoProximityReached | messageActionGroupCall | messageActionInviteToGroupCall | messageActionSetMessagesTTL | messageActionGroupCallScheduled | messageActionSetChatTheme | messageActionChatJoinedByRequest | messageActionWebViewDataSentMe | messageActionWebViewDataSent | messageActionGiftPremium | messageActionTopicCreate | messageActionTopicEdit | messageActionSuggestProfilePhoto | messageActionRequestedPeer | messageActionSetChatWallPaper | messageActionGiftCode | messageActionGiveawayLaunch | messageActionGiveawayResults | messageActionBoostApply | messageActionRequestedPeerSentMe | messageActionPaymentRefunded | messageActionGiftStars | messageActionPrizeStars | messageActionStarGift | messageActionStarGiftUnique | messageActionPaidMessagesRefunded | messageActionPaidMessagesPrice | messageActionConferenceCall | messageActionTodoCompletions | messageActionTodoAppendTasks | messageActionSuggestedPostApproval | messageActionSuggestedPostSuccess | messageActionSuggestedPostRefund | messageActionGiftTon | messageActionSuggestBirthday | messageActionStarGiftPurchaseOffer | messageActionStarGiftPurchaseOfferDeclined;
export type Dialog = dialog | dialogFolder;
export type Photo = photoEmpty | photo;
export type PhotoSize = photoSizeEmpty | photoSize | photoCachedSize | photoStrippedSize | photoSizeProgressive | photoPathSize;
export type GeoPoint = geoPointEmpty | geoPoint;
export type auth_SentCode = auth_sentCode | auth_sentCodeSuccess | auth_sentCodePaymentRequired;
export type auth_Authorization = auth_authorization | auth_authorizationSignUpRequired;
export type auth_ExportedAuthorization = auth_exportedAuthorization;
export type InputNotifyPeer = inputNotifyPeer | inputNotifyUsers | inputNotifyChats | inputNotifyBroadcasts | inputNotifyForumTopic;
export type InputPeerNotifySettings = inputPeerNotifySettings;
export type PeerNotifySettings = peerNotifySettings;
export type PeerSettings = peerSettings;
export type WallPaper = wallPaper | wallPaperNoFile;
export type ReportReason = inputReportReasonSpam | inputReportReasonViolence | inputReportReasonPornography | inputReportReasonChildAbuse | inputReportReasonOther | inputReportReasonCopyright | inputReportReasonGeoIrrelevant | inputReportReasonFake | inputReportReasonIllegalDrugs | inputReportReasonPersonalDetails;
export type UserFull = userFull;
export type Contact = contact;
export type ImportedContact = importedContact;
export type ContactStatus = contactStatus;
export type contacts_Contacts = contacts_contactsNotModified | contacts_contacts;
export type contacts_ImportedContacts = contacts_importedContacts;
export type contacts_Blocked = contacts_blocked | contacts_blockedSlice;
export type messages_Dialogs = messages_dialogs | messages_dialogsSlice | messages_dialogsNotModified;
export type messages_Messages = messages_messages | messages_messagesSlice | messages_channelMessages | messages_messagesNotModified;
export type messages_Chats = messages_chats | messages_chatsSlice;
export type messages_ChatFull = messages_chatFull;
export type messages_AffectedHistory = messages_affectedHistory;
export type MessagesFilter = inputMessagesFilterEmpty | inputMessagesFilterPhotos | inputMessagesFilterVideo | inputMessagesFilterPhotoVideo | inputMessagesFilterDocument | inputMessagesFilterUrl | inputMessagesFilterGif | inputMessagesFilterVoice | inputMessagesFilterMusic | inputMessagesFilterChatPhotos | inputMessagesFilterPhoneCalls | inputMessagesFilterRoundVoice | inputMessagesFilterRoundVideo | inputMessagesFilterMyMentions | inputMessagesFilterGeo | inputMessagesFilterContacts | inputMessagesFilterPinned;
export type Update = updateNewMessage | updateMessageID | updateDeleteMessages | updateUserTyping | updateChatUserTyping | updateChatParticipants | updateUserStatus | updateUserName | updateNewAuthorization | updateNewEncryptedMessage | updateEncryptedChatTyping | updateEncryption | updateEncryptedMessagesRead | updateChatParticipantAdd | updateChatParticipantDelete | updateDcOptions | updateNotifySettings | updateServiceNotification | updatePrivacy | updateUserPhone | updateReadHistoryInbox | updateReadHistoryOutbox | updateWebPage | updateReadMessagesContents | updateChannelTooLong | updateChannel | updateNewChannelMessage | updateReadChannelInbox | updateDeleteChannelMessages | updateChannelMessageViews | updateChatParticipantAdmin | updateNewStickerSet | updateStickerSetsOrder | updateStickerSets | updateSavedGifs | updateBotInlineQuery | updateBotInlineSend | updateEditChannelMessage | updateBotCallbackQuery | updateEditMessage | updateInlineBotCallbackQuery | updateReadChannelOutbox | updateDraftMessage | updateReadFeaturedStickers | updateRecentStickers | updateConfig | updatePtsChanged | updateChannelWebPage | updateDialogPinned | updatePinnedDialogs | updateBotWebhookJSON | updateBotWebhookJSONQuery | updateBotShippingQuery | updateBotPrecheckoutQuery | updatePhoneCall | updateLangPackTooLong | updateLangPack | updateFavedStickers | updateChannelReadMessagesContents | updateContactsReset | updateChannelAvailableMessages | updateDialogUnreadMark | updateMessagePoll | updateChatDefaultBannedRights | updateFolderPeers | updatePeerSettings | updatePeerLocated | updateNewScheduledMessage | updateDeleteScheduledMessages | updateTheme | updateGeoLiveViewed | updateLoginToken | updateMessagePollVote | updateDialogFilter | updateDialogFilterOrder | updateDialogFilters | updatePhoneCallSignalingData | updateChannelMessageForwards | updateReadChannelDiscussionInbox | updateReadChannelDiscussionOutbox | updatePeerBlocked | updateChannelUserTyping | updatePinnedMessages | updatePinnedChannelMessages | updateChat | updateGroupCallParticipants | updateGroupCall | updatePeerHistoryTTL | updateChatParticipant | updateChannelParticipant | updateBotStopped | updateGroupCallConnection | updateBotCommands | updatePendingJoinRequests | updateBotChatInviteRequester | updateMessageReactions | updateAttachMenuBots | updateWebViewResultSent | updateBotMenuButton | updateSavedRingtones | updateTranscribedAudio | updateReadFeaturedEmojiStickers | updateUserEmojiStatus | updateRecentEmojiStatuses | updateRecentReactions | updateMoveStickerSetToTop | updateMessageExtendedMedia | updateUser | updateAutoSaveSettings | updateStory | updateReadStories | updateStoryID | updateStoriesStealthMode | updateSentStoryReaction | updateBotChatBoost | updateChannelViewForumAsMessages | updatePeerWallpaper | updateBotMessageReaction | updateBotMessageReactions | updateSavedDialogPinned | updatePinnedSavedDialogs | updateSavedReactionTags | updateSmsJob | updateQuickReplies | updateNewQuickReply | updateDeleteQuickReply | updateQuickReplyMessage | updateDeleteQuickReplyMessages | updateBotBusinessConnect | updateBotNewBusinessMessage | updateBotEditBusinessMessage | updateBotDeleteBusinessMessage | updateNewStoryReaction | updateStarsBalance | updateBusinessBotCallbackQuery | updateStarsRevenueStatus | updateBotPurchasedPaidMedia | updatePaidReactionPrivacy | updateSentPhoneCode | updateGroupCallChainBlocks | updateReadMonoForumInbox | updateReadMonoForumOutbox | updateMonoForumNoPaidException | updateGroupCallMessage | updateGroupCallEncryptedMessage | updatePinnedForumTopic | updatePinnedForumTopics | updateDeleteGroupCallMessages | updateStarGiftAuctionState | updateStarGiftAuctionUserState | updateEmojiGameInfo;
export type updates_State = updates_state;
export type updates_Difference = updates_differenceEmpty | updates_difference | updates_differenceSlice | updates_differenceTooLong;
export type Updates = updatesTooLong | updateShortMessage | updateShortChatMessage | updateShort | updatesCombined | updates | updateShortSentMessage;
export type photos_Photos = photos_photos | photos_photosSlice;
export type photos_Photo = photos_photo;
export type upload_File = upload_file | upload_fileCdnRedirect;
export type DcOption = dcOption;
export type Config = config;
export type NearestDc = nearestDc;
export type help_AppUpdate = help_appUpdate | help_noAppUpdate;
export type help_InviteText = help_inviteText;
export type EncryptedChat = encryptedChatEmpty | encryptedChatWaiting | encryptedChatRequested | encryptedChat | encryptedChatDiscarded;
export type InputEncryptedChat = inputEncryptedChat;
export type EncryptedFile = encryptedFileEmpty | encryptedFile;
export type InputEncryptedFile = inputEncryptedFileEmpty | inputEncryptedFileUploaded | inputEncryptedFile | inputEncryptedFileBigUploaded;
export type EncryptedMessage = encryptedMessage | encryptedMessageService;
export type messages_DhConfig = messages_dhConfigNotModified | messages_dhConfig;
export type messages_SentEncryptedMessage = messages_sentEncryptedMessage | messages_sentEncryptedFile;
export type InputDocument = inputDocumentEmpty | inputDocument;
export type Document = documentEmpty | document;
export type help_Support = help_support;
export type NotifyPeer = notifyPeer | notifyUsers | notifyChats | notifyBroadcasts | notifyForumTopic;
export type SendMessageAction = sendMessageTypingAction | sendMessageCancelAction | sendMessageRecordVideoAction | sendMessageUploadVideoAction | sendMessageRecordAudioAction | sendMessageUploadAudioAction | sendMessageUploadPhotoAction | sendMessageUploadDocumentAction | sendMessageGeoLocationAction | sendMessageChooseContactAction | sendMessageGamePlayAction | sendMessageRecordRoundAction | sendMessageUploadRoundAction | speakingInGroupCallAction | sendMessageHistoryImportAction | sendMessageChooseStickerAction | sendMessageEmojiInteraction | sendMessageEmojiInteractionSeen | sendMessageTextDraftAction;
export type contacts_Found = contacts_found;
export type InputPrivacyKey = inputPrivacyKeyStatusTimestamp | inputPrivacyKeyChatInvite | inputPrivacyKeyPhoneCall | inputPrivacyKeyPhoneP2P | inputPrivacyKeyForwards | inputPrivacyKeyProfilePhoto | inputPrivacyKeyPhoneNumber | inputPrivacyKeyAddedByPhone | inputPrivacyKeyVoiceMessages | inputPrivacyKeyAbout | inputPrivacyKeyBirthday | inputPrivacyKeyStarGiftsAutoSave | inputPrivacyKeyNoPaidMessages | inputPrivacyKeySavedMusic;
export type PrivacyKey = privacyKeyStatusTimestamp | privacyKeyChatInvite | privacyKeyPhoneCall | privacyKeyPhoneP2P | privacyKeyForwards | privacyKeyProfilePhoto | privacyKeyPhoneNumber | privacyKeyAddedByPhone | privacyKeyVoiceMessages | privacyKeyAbout | privacyKeyBirthday | privacyKeyStarGiftsAutoSave | privacyKeyNoPaidMessages | privacyKeySavedMusic;
export type InputPrivacyRule = inputPrivacyValueAllowContacts | inputPrivacyValueAllowAll | inputPrivacyValueAllowUsers | inputPrivacyValueDisallowContacts | inputPrivacyValueDisallowAll | inputPrivacyValueDisallowUsers | inputPrivacyValueAllowChatParticipants | inputPrivacyValueDisallowChatParticipants | inputPrivacyValueAllowCloseFriends | inputPrivacyValueAllowPremium | inputPrivacyValueAllowBots | inputPrivacyValueDisallowBots;
export type PrivacyRule = privacyValueAllowContacts | privacyValueAllowAll | privacyValueAllowUsers | privacyValueDisallowContacts | privacyValueDisallowAll | privacyValueDisallowUsers | privacyValueAllowChatParticipants | privacyValueDisallowChatParticipants | privacyValueAllowCloseFriends | privacyValueAllowPremium | privacyValueAllowBots | privacyValueDisallowBots;
export type account_PrivacyRules = account_privacyRules;
export type AccountDaysTTL = accountDaysTTL;
export type DocumentAttribute = documentAttributeImageSize | documentAttributeAnimated | documentAttributeSticker | documentAttributeVideo | documentAttributeAudio | documentAttributeFilename | documentAttributeHasStickers | documentAttributeCustomEmoji;
export type messages_Stickers = messages_stickersNotModified | messages_stickers;
export type StickerPack = stickerPack;
export type messages_AllStickers = messages_allStickersNotModified | messages_allStickers;
export type messages_AffectedMessages = messages_affectedMessages;
export type WebPage = webPageEmpty | webPagePending | webPage | webPageNotModified;
export type Authorization = authorization;
export type account_Authorizations = account_authorizations;
export type account_Password = account_password;
export type account_PasswordSettings = account_passwordSettings;
export type account_PasswordInputSettings = account_passwordInputSettings;
export type auth_PasswordRecovery = auth_passwordRecovery;
export type ReceivedNotifyMessage = receivedNotifyMessage;
export type ExportedChatInvite = chatInviteExported | chatInvitePublicJoinRequests;
export type ChatInvite = chatInviteAlready | chatInvite | chatInvitePeek;
export type InputStickerSet = inputStickerSetEmpty | inputStickerSetID | inputStickerSetShortName | inputStickerSetAnimatedEmoji | inputStickerSetDice | inputStickerSetAnimatedEmojiAnimations | inputStickerSetPremiumGifts | inputStickerSetEmojiGenericAnimations | inputStickerSetEmojiDefaultStatuses | inputStickerSetEmojiDefaultTopicIcons | inputStickerSetEmojiChannelDefaultStatuses | inputStickerSetTonGifts;
export type StickerSet = stickerSet;
export type messages_StickerSet = messages_stickerSet | messages_stickerSetNotModified;
export type BotCommand = botCommand;
export type BotInfo = botInfo;
export type KeyboardButton = keyboardButton | keyboardButtonUrl | keyboardButtonCallback | keyboardButtonRequestPhone | keyboardButtonRequestGeoLocation | keyboardButtonSwitchInline | keyboardButtonGame | keyboardButtonBuy | keyboardButtonUrlAuth | inputKeyboardButtonUrlAuth | keyboardButtonRequestPoll | inputKeyboardButtonUserProfile | keyboardButtonUserProfile | keyboardButtonWebView | keyboardButtonSimpleWebView | keyboardButtonRequestPeer | inputKeyboardButtonRequestPeer | keyboardButtonCopy;
export type KeyboardButtonRow = keyboardButtonRow;
export type ReplyMarkup = replyKeyboardHide | replyKeyboardForceReply | replyKeyboardMarkup | replyInlineMarkup;
export type MessageEntity = messageEntityUnknown | messageEntityMention | messageEntityHashtag | messageEntityBotCommand | messageEntityUrl | messageEntityEmail | messageEntityBold | messageEntityItalic | messageEntityCode | messageEntityPre | messageEntityTextUrl | messageEntityMentionName | inputMessageEntityMentionName | messageEntityPhone | messageEntityCashtag | messageEntityUnderline | messageEntityStrike | messageEntityBankCard | messageEntitySpoiler | messageEntityCustomEmoji | messageEntityBlockquote;
export type InputChannel = inputChannelEmpty | inputChannel | inputChannelFromMessage;
export type contacts_ResolvedPeer = contacts_resolvedPeer;
export type MessageRange = messageRange;
export type updates_ChannelDifference = updates_channelDifferenceEmpty | updates_channelDifferenceTooLong | updates_channelDifference;
export type ChannelMessagesFilter = channelMessagesFilterEmpty | channelMessagesFilter;
export type ChannelParticipant = channelParticipant | channelParticipantSelf | channelParticipantCreator | channelParticipantAdmin | channelParticipantBanned | channelParticipantLeft;
export type ChannelParticipantsFilter = channelParticipantsRecent | channelParticipantsAdmins | channelParticipantsKicked | channelParticipantsBots | channelParticipantsBanned | channelParticipantsSearch | channelParticipantsContacts | channelParticipantsMentions;
export type channels_ChannelParticipants = channels_channelParticipants | channels_channelParticipantsNotModified;
export type channels_ChannelParticipant = channels_channelParticipant;
export type help_TermsOfService = help_termsOfService;
export type messages_SavedGifs = messages_savedGifsNotModified | messages_savedGifs;
export type InputBotInlineMessage = inputBotInlineMessageMediaAuto | inputBotInlineMessageText | inputBotInlineMessageMediaGeo | inputBotInlineMessageMediaVenue | inputBotInlineMessageMediaContact | inputBotInlineMessageGame | inputBotInlineMessageMediaInvoice | inputBotInlineMessageMediaWebPage;
export type InputBotInlineResult = inputBotInlineResult | inputBotInlineResultPhoto | inputBotInlineResultDocument | inputBotInlineResultGame;
export type BotInlineMessage = botInlineMessageMediaAuto | botInlineMessageText | botInlineMessageMediaGeo | botInlineMessageMediaVenue | botInlineMessageMediaContact | botInlineMessageMediaInvoice | botInlineMessageMediaWebPage;
export type BotInlineResult = botInlineResult | botInlineMediaResult;
export type messages_BotResults = messages_botResults;
export type ExportedMessageLink = exportedMessageLink;
export type MessageFwdHeader = messageFwdHeader;
export type auth_CodeType = auth_codeTypeSms | auth_codeTypeCall | auth_codeTypeFlashCall | auth_codeTypeMissedCall | auth_codeTypeFragmentSms;
export type auth_SentCodeType = auth_sentCodeTypeApp | auth_sentCodeTypeSms | auth_sentCodeTypeCall | auth_sentCodeTypeFlashCall | auth_sentCodeTypeMissedCall | auth_sentCodeTypeEmailCode | auth_sentCodeTypeSetUpEmailRequired | auth_sentCodeTypeFragmentSms | auth_sentCodeTypeFirebaseSms | auth_sentCodeTypeSmsWord | auth_sentCodeTypeSmsPhrase;
export type messages_BotCallbackAnswer = messages_botCallbackAnswer;
export type messages_MessageEditData = messages_messageEditData;
export type InputBotInlineMessageID = inputBotInlineMessageID | inputBotInlineMessageID64;
export type InlineBotSwitchPM = inlineBotSwitchPM;
export type messages_PeerDialogs = messages_peerDialogs;
export type TopPeer = topPeer;
export type TopPeerCategory = topPeerCategoryBotsPM | topPeerCategoryBotsInline | topPeerCategoryCorrespondents | topPeerCategoryGroups | topPeerCategoryChannels | topPeerCategoryPhoneCalls | topPeerCategoryForwardUsers | topPeerCategoryForwardChats | topPeerCategoryBotsApp;
export type TopPeerCategoryPeers = topPeerCategoryPeers;
export type contacts_TopPeers = contacts_topPeersNotModified | contacts_topPeers | contacts_topPeersDisabled;
export type DraftMessage = draftMessageEmpty | draftMessage;
export type messages_FeaturedStickers = messages_featuredStickersNotModified | messages_featuredStickers;
export type messages_RecentStickers = messages_recentStickersNotModified | messages_recentStickers;
export type messages_ArchivedStickers = messages_archivedStickers;
export type messages_StickerSetInstallResult = messages_stickerSetInstallResultSuccess | messages_stickerSetInstallResultArchive;
export type StickerSetCovered = stickerSetCovered | stickerSetMultiCovered | stickerSetFullCovered | stickerSetNoCovered;
export type MaskCoords = maskCoords;
export type InputStickeredMedia = inputStickeredMediaPhoto | inputStickeredMediaDocument;
export type Game = game;
export type InputGame = inputGameID | inputGameShortName;
export type HighScore = highScore;
export type messages_HighScores = messages_highScores;
export type RichText = textEmpty | textPlain | textBold | textItalic | textUnderline | textStrike | textFixed | textUrl | textEmail | textConcat | textSubscript | textSuperscript | textMarked | textPhone | textImage | textAnchor;
export type PageBlock = pageBlockUnsupported | pageBlockTitle | pageBlockSubtitle | pageBlockAuthorDate | pageBlockHeader | pageBlockSubheader | pageBlockParagraph | pageBlockPreformatted | pageBlockFooter | pageBlockDivider | pageBlockAnchor | pageBlockList | pageBlockBlockquote | pageBlockPullquote | pageBlockPhoto | pageBlockVideo | pageBlockCover | pageBlockEmbed | pageBlockEmbedPost | pageBlockCollage | pageBlockSlideshow | pageBlockChannel | pageBlockAudio | pageBlockKicker | pageBlockTable | pageBlockOrderedList | pageBlockDetails | pageBlockRelatedArticles | pageBlockMap;
export type PhoneCallDiscardReason = phoneCallDiscardReasonMissed | phoneCallDiscardReasonDisconnect | phoneCallDiscardReasonHangup | phoneCallDiscardReasonBusy | phoneCallDiscardReasonMigrateConferenceCall;
export type DataJSON = dataJSON;
export type LabeledPrice = labeledPrice;
export type Invoice = invoice;
export type PaymentCharge = paymentCharge;
export type PostAddress = postAddress;
export type PaymentRequestedInfo = paymentRequestedInfo;
export type PaymentSavedCredentials = paymentSavedCredentialsCard;
export type WebDocument = webDocument | webDocumentNoProxy;
export type InputWebDocument = inputWebDocument;
export type InputWebFileLocation = inputWebFileLocation | inputWebFileGeoPointLocation | inputWebFileAudioAlbumThumbLocation;
export type upload_WebFile = upload_webFile;
export type payments_PaymentForm = payments_paymentForm | payments_paymentFormStars | payments_paymentFormStarGift;
export type payments_ValidatedRequestedInfo = payments_validatedRequestedInfo;
export type payments_PaymentResult = payments_paymentResult | payments_paymentVerificationNeeded;
export type payments_PaymentReceipt = payments_paymentReceipt | payments_paymentReceiptStars;
export type payments_SavedInfo = payments_savedInfo;
export type InputPaymentCredentials = inputPaymentCredentialsSaved | inputPaymentCredentials | inputPaymentCredentialsApplePay | inputPaymentCredentialsGooglePay;
export type account_TmpPassword = account_tmpPassword;
export type ShippingOption = shippingOption;
export type InputStickerSetItem = inputStickerSetItem;
export type InputPhoneCall = inputPhoneCall;
export type PhoneCall = phoneCallEmpty | phoneCallWaiting | phoneCallRequested | phoneCallAccepted | phoneCall | phoneCallDiscarded;
export type PhoneConnection = phoneConnection | phoneConnectionWebrtc;
export type PhoneCallProtocol = phoneCallProtocol;
export type phone_PhoneCall = phone_phoneCall;
export type upload_CdnFile = upload_cdnFileReuploadNeeded | upload_cdnFile;
export type CdnPublicKey = cdnPublicKey;
export type CdnConfig = cdnConfig;
export type LangPackString = langPackString | langPackStringPluralized | langPackStringDeleted;
export type LangPackDifference = langPackDifference;
export type LangPackLanguage = langPackLanguage;
export type ChannelAdminLogEventAction = channelAdminLogEventActionChangeTitle | channelAdminLogEventActionChangeAbout | channelAdminLogEventActionChangeUsername | channelAdminLogEventActionChangePhoto | channelAdminLogEventActionToggleInvites | channelAdminLogEventActionToggleSignatures | channelAdminLogEventActionUpdatePinned | channelAdminLogEventActionEditMessage | channelAdminLogEventActionDeleteMessage | channelAdminLogEventActionParticipantJoin | channelAdminLogEventActionParticipantLeave | channelAdminLogEventActionParticipantInvite | channelAdminLogEventActionParticipantToggleBan | channelAdminLogEventActionParticipantToggleAdmin | channelAdminLogEventActionChangeStickerSet | channelAdminLogEventActionTogglePreHistoryHidden | channelAdminLogEventActionDefaultBannedRights | channelAdminLogEventActionStopPoll | channelAdminLogEventActionChangeLinkedChat | channelAdminLogEventActionChangeLocation | channelAdminLogEventActionToggleSlowMode | channelAdminLogEventActionStartGroupCall | channelAdminLogEventActionDiscardGroupCall | channelAdminLogEventActionParticipantMute | channelAdminLogEventActionParticipantUnmute | channelAdminLogEventActionToggleGroupCallSetting | channelAdminLogEventActionParticipantJoinByInvite | channelAdminLogEventActionExportedInviteDelete | channelAdminLogEventActionExportedInviteRevoke | channelAdminLogEventActionExportedInviteEdit | channelAdminLogEventActionParticipantVolume | channelAdminLogEventActionChangeHistoryTTL | channelAdminLogEventActionParticipantJoinByRequest | channelAdminLogEventActionToggleNoForwards | channelAdminLogEventActionSendMessage | channelAdminLogEventActionChangeAvailableReactions | channelAdminLogEventActionChangeUsernames | channelAdminLogEventActionToggleForum | channelAdminLogEventActionCreateTopic | channelAdminLogEventActionEditTopic | channelAdminLogEventActionDeleteTopic | channelAdminLogEventActionPinTopic | channelAdminLogEventActionToggleAntiSpam | channelAdminLogEventActionChangePeerColor | channelAdminLogEventActionChangeProfilePeerColor | channelAdminLogEventActionChangeWallpaper | channelAdminLogEventActionChangeEmojiStatus | channelAdminLogEventActionChangeEmojiStickerSet | channelAdminLogEventActionToggleSignatureProfiles | channelAdminLogEventActionParticipantSubExtend | channelAdminLogEventActionToggleAutotranslation;
export type ChannelAdminLogEvent = channelAdminLogEvent;
export type channels_AdminLogResults = channels_adminLogResults;
export type ChannelAdminLogEventsFilter = channelAdminLogEventsFilter;
export type PopularContact = popularContact;
export type messages_FavedStickers = messages_favedStickersNotModified | messages_favedStickers;
export type RecentMeUrl = recentMeUrlUnknown | recentMeUrlUser | recentMeUrlChat | recentMeUrlChatInvite | recentMeUrlStickerSet;
export type help_RecentMeUrls = help_recentMeUrls;
export type InputSingleMedia = inputSingleMedia;
export type WebAuthorization = webAuthorization;
export type account_WebAuthorizations = account_webAuthorizations;
export type InputMessage = inputMessageID | inputMessageReplyTo | inputMessagePinned | inputMessageCallbackQuery;
export type InputDialogPeer = inputDialogPeer | inputDialogPeerFolder;
export type DialogPeer = dialogPeer | dialogPeerFolder;
export type messages_FoundStickerSets = messages_foundStickerSetsNotModified | messages_foundStickerSets;
export type FileHash = fileHash;
export type InputClientProxy = inputClientProxy;
export type help_TermsOfServiceUpdate = help_termsOfServiceUpdateEmpty | help_termsOfServiceUpdate;
export type InputSecureFile = inputSecureFileUploaded | inputSecureFile;
export type SecureFile = secureFileEmpty | secureFile;
export type SecureData = secureData;
export type SecurePlainData = securePlainPhone | securePlainEmail;
export type SecureValueType = secureValueTypePersonalDetails | secureValueTypePassport | secureValueTypeDriverLicense | secureValueTypeIdentityCard | secureValueTypeInternalPassport | secureValueTypeAddress | secureValueTypeUtilityBill | secureValueTypeBankStatement | secureValueTypeRentalAgreement | secureValueTypePassportRegistration | secureValueTypeTemporaryRegistration | secureValueTypePhone | secureValueTypeEmail;
export type SecureValue = secureValue;
export type InputSecureValue = inputSecureValue;
export type SecureValueHash = secureValueHash;
export type SecureValueError = secureValueErrorData | secureValueErrorFrontSide | secureValueErrorReverseSide | secureValueErrorSelfie | secureValueErrorFile | secureValueErrorFiles | secureValueError | secureValueErrorTranslationFile | secureValueErrorTranslationFiles;
export type SecureCredentialsEncrypted = secureCredentialsEncrypted;
export type account_AuthorizationForm = account_authorizationForm;
export type account_SentEmailCode = account_sentEmailCode;
export type help_DeepLinkInfo = help_deepLinkInfoEmpty | help_deepLinkInfo;
export type SavedContact = savedPhoneContact;
export type account_Takeout = account_takeout;
export type PasswordKdfAlgo = passwordKdfAlgoUnknown | passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow;
export type SecurePasswordKdfAlgo = securePasswordKdfAlgoUnknown | securePasswordKdfAlgoPBKDF2HMACSHA512iter100000 | securePasswordKdfAlgoSHA512;
export type SecureSecretSettings = secureSecretSettings;
export type InputCheckPasswordSRP = inputCheckPasswordEmpty | inputCheckPasswordSRP;
export type SecureRequiredType = secureRequiredType | secureRequiredTypeOneOf;
export type help_PassportConfig = help_passportConfigNotModified | help_passportConfig;
export type InputAppEvent = inputAppEvent;
export type JSONObjectValue = jsonObjectValue;
export type JSONValue = jsonNull | jsonBool | jsonNumber | jsonString | jsonArray | jsonObject;
export type PageTableCell = pageTableCell;
export type PageTableRow = pageTableRow;
export type PageCaption = pageCaption;
export type PageListItem = pageListItemText | pageListItemBlocks;
export type PageListOrderedItem = pageListOrderedItemText | pageListOrderedItemBlocks;
export type PageRelatedArticle = pageRelatedArticle;
export type Page = page;
export type help_SupportName = help_supportName;
export type help_UserInfo = help_userInfoEmpty | help_userInfo;
export type PollAnswer = pollAnswer;
export type Poll = poll;
export type PollAnswerVoters = pollAnswerVoters;
export type PollResults = pollResults;
export type ChatOnlines = chatOnlines;
export type StatsURL = statsURL;
export type ChatAdminRights = chatAdminRights;
export type ChatBannedRights = chatBannedRights;
export type InputWallPaper = inputWallPaper | inputWallPaperSlug | inputWallPaperNoFile;
export type account_WallPapers = account_wallPapersNotModified | account_wallPapers;
export type CodeSettings = codeSettings;
export type WallPaperSettings = wallPaperSettings;
export type AutoDownloadSettings = autoDownloadSettings;
export type account_AutoDownloadSettings = account_autoDownloadSettings;
export type EmojiKeyword = emojiKeyword | emojiKeywordDeleted;
export type EmojiKeywordsDifference = emojiKeywordsDifference;
export type EmojiURL = emojiURL;
export type EmojiLanguage = emojiLanguage;
export type Folder = folder;
export type InputFolderPeer = inputFolderPeer;
export type FolderPeer = folderPeer;
export type messages_SearchCounter = messages_searchCounter;
export type UrlAuthResult = urlAuthResultRequest | urlAuthResultAccepted | urlAuthResultDefault;
export type ChannelLocation = channelLocationEmpty | channelLocation;
export type PeerLocated = peerLocated | peerSelfLocated;
export type RestrictionReason = restrictionReason;
export type InputTheme = inputTheme | inputThemeSlug;
export type Theme = theme;
export type account_Themes = account_themesNotModified | account_themes;
export type auth_LoginToken = auth_loginToken | auth_loginTokenMigrateTo | auth_loginTokenSuccess;
export type account_ContentSettings = account_contentSettings;
export type messages_InactiveChats = messages_inactiveChats;
export type BaseTheme = baseThemeClassic | baseThemeDay | baseThemeNight | baseThemeTinted | baseThemeArctic;
export type InputThemeSettings = inputThemeSettings;
export type ThemeSettings = themeSettings;
export type WebPageAttribute = webPageAttributeTheme | webPageAttributeStory | webPageAttributeStickerSet | webPageAttributeUniqueStarGift | webPageAttributeStarGiftCollection | webPageAttributeStarGiftAuction;
export type messages_VotesList = messages_votesList;
export type BankCardOpenUrl = bankCardOpenUrl;
export type payments_BankCardData = payments_bankCardData;
export type DialogFilter = dialogFilter | dialogFilterDefault | dialogFilterChatlist;
export type DialogFilterSuggested = dialogFilterSuggested;
export type StatsDateRangeDays = statsDateRangeDays;
export type StatsAbsValueAndPrev = statsAbsValueAndPrev;
export type StatsPercentValue = statsPercentValue;
export type StatsGraph = statsGraphAsync | statsGraphError | statsGraph;
export type stats_BroadcastStats = stats_broadcastStats;
export type help_PromoData = help_promoDataEmpty | help_promoData;
export type VideoSize = videoSize | videoSizeEmojiMarkup | videoSizeStickerMarkup;
export type StatsGroupTopPoster = statsGroupTopPoster;
export type StatsGroupTopAdmin = statsGroupTopAdmin;
export type StatsGroupTopInviter = statsGroupTopInviter;
export type stats_MegagroupStats = stats_megagroupStats;
export type GlobalPrivacySettings = globalPrivacySettings;
export type help_CountryCode = help_countryCode;
export type help_Country = help_country;
export type help_CountriesList = help_countriesListNotModified | help_countriesList;
export type MessageViews = messageViews;
export type messages_MessageViews = messages_messageViews;
export type messages_DiscussionMessage = messages_discussionMessage;
export type MessageReplyHeader = messageReplyHeader | messageReplyStoryHeader;
export type MessageReplies = messageReplies;
export type PeerBlocked = peerBlocked;
export type stats_MessageStats = stats_messageStats;
export type GroupCall = groupCallDiscarded | groupCall;
export type InputGroupCall = inputGroupCall | inputGroupCallSlug | inputGroupCallInviteMessage;
export type GroupCallParticipant = groupCallParticipant;
export type phone_GroupCall = phone_groupCall;
export type phone_GroupParticipants = phone_groupParticipants;
export type InlineQueryPeerType = inlineQueryPeerTypeSameBotPM | inlineQueryPeerTypePM | inlineQueryPeerTypeChat | inlineQueryPeerTypeMegagroup | inlineQueryPeerTypeBroadcast | inlineQueryPeerTypeBotPM;
export type messages_HistoryImport = messages_historyImport;
export type messages_HistoryImportParsed = messages_historyImportParsed;
export type messages_AffectedFoundMessages = messages_affectedFoundMessages;
export type ChatInviteImporter = chatInviteImporter;
export type messages_ExportedChatInvites = messages_exportedChatInvites;
export type messages_ExportedChatInvite = messages_exportedChatInvite | messages_exportedChatInviteReplaced;
export type messages_ChatInviteImporters = messages_chatInviteImporters;
export type ChatAdminWithInvites = chatAdminWithInvites;
export type messages_ChatAdminsWithInvites = messages_chatAdminsWithInvites;
export type messages_CheckedHistoryImportPeer = messages_checkedHistoryImportPeer;
export type phone_JoinAsPeers = phone_joinAsPeers;
export type phone_ExportedGroupCallInvite = phone_exportedGroupCallInvite;
export type GroupCallParticipantVideoSourceGroup = groupCallParticipantVideoSourceGroup;
export type GroupCallParticipantVideo = groupCallParticipantVideo;
export type stickers_SuggestedShortName = stickers_suggestedShortName;
export type BotCommandScope = botCommandScopeDefault | botCommandScopeUsers | botCommandScopeChats | botCommandScopeChatAdmins | botCommandScopePeer | botCommandScopePeerAdmins | botCommandScopePeerUser;
export type account_ResetPasswordResult = account_resetPasswordFailedWait | account_resetPasswordRequestedWait | account_resetPasswordOk;
export type ChatTheme = chatTheme | chatThemeUniqueGift;
export type account_ChatThemes = account_chatThemesNotModified | account_chatThemes;
export type SponsoredMessage = sponsoredMessage;
export type messages_SponsoredMessages = messages_sponsoredMessages | messages_sponsoredMessagesEmpty;
export type SearchResultsCalendarPeriod = searchResultsCalendarPeriod;
export type messages_SearchResultsCalendar = messages_searchResultsCalendar;
export type SearchResultsPosition = searchResultPosition;
export type messages_SearchResultsPositions = messages_searchResultsPositions;
export type channels_SendAsPeers = channels_sendAsPeers;
export type users_UserFull = users_userFull;
export type messages_PeerSettings = messages_peerSettings;
export type auth_LoggedOut = auth_loggedOut;
export type ReactionCount = reactionCount;
export type MessageReactions = messageReactions;
export type messages_MessageReactionsList = messages_messageReactionsList;
export type AvailableReaction = availableReaction;
export type messages_AvailableReactions = messages_availableReactionsNotModified | messages_availableReactions;
export type MessagePeerReaction = messagePeerReaction;
export type GroupCallStreamChannel = groupCallStreamChannel;
export type phone_GroupCallStreamChannels = phone_groupCallStreamChannels;
export type phone_GroupCallStreamRtmpUrl = phone_groupCallStreamRtmpUrl;
export type AttachMenuBotIconColor = attachMenuBotIconColor;
export type AttachMenuBotIcon = attachMenuBotIcon;
export type AttachMenuBot = attachMenuBot;
export type AttachMenuBots = attachMenuBotsNotModified | attachMenuBots;
export type AttachMenuBotsBot = attachMenuBotsBot;
export type WebViewResult = webViewResultUrl;
export type WebViewMessageSent = webViewMessageSent;
export type BotMenuButton = botMenuButtonDefault | botMenuButtonCommands | botMenuButton;
export type account_SavedRingtones = account_savedRingtonesNotModified | account_savedRingtones;
export type NotificationSound = notificationSoundDefault | notificationSoundNone | notificationSoundLocal | notificationSoundRingtone;
export type account_SavedRingtone = account_savedRingtone | account_savedRingtoneConverted;
export type AttachMenuPeerType = attachMenuPeerTypeSameBotPM | attachMenuPeerTypeBotPM | attachMenuPeerTypePM | attachMenuPeerTypeChat | attachMenuPeerTypeBroadcast;
export type InputInvoice = inputInvoiceMessage | inputInvoiceSlug | inputInvoicePremiumGiftCode | inputInvoiceStars | inputInvoiceChatInviteSubscription | inputInvoiceStarGift | inputInvoiceStarGiftUpgrade | inputInvoiceStarGiftTransfer | inputInvoicePremiumGiftStars | inputInvoiceBusinessBotTransferStars | inputInvoiceStarGiftResale | inputInvoiceStarGiftPrepaidUpgrade | inputInvoicePremiumAuthCode | inputInvoiceStarGiftDropOriginalDetails | inputInvoiceStarGiftAuctionBid;
export type payments_ExportedInvoice = payments_exportedInvoice;
export type messages_TranscribedAudio = messages_transcribedAudio;
export type help_PremiumPromo = help_premiumPromo;
export type InputStorePaymentPurpose = inputStorePaymentPremiumSubscription | inputStorePaymentGiftPremium | inputStorePaymentPremiumGiftCode | inputStorePaymentPremiumGiveaway | inputStorePaymentStarsTopup | inputStorePaymentStarsGift | inputStorePaymentStarsGiveaway | inputStorePaymentAuthCode;
export type PaymentFormMethod = paymentFormMethod;
export type EmojiStatus = emojiStatusEmpty | emojiStatus | emojiStatusCollectible | inputEmojiStatusCollectible;
export type account_EmojiStatuses = account_emojiStatusesNotModified | account_emojiStatuses;
export type Reaction = reactionEmpty | reactionEmoji | reactionCustomEmoji | reactionPaid;
export type ChatReactions = chatReactionsNone | chatReactionsAll | chatReactionsSome;
export type messages_Reactions = messages_reactionsNotModified | messages_reactions;
export type EmailVerifyPurpose = emailVerifyPurposeLoginSetup | emailVerifyPurposeLoginChange | emailVerifyPurposePassport;
export type EmailVerification = emailVerificationCode | emailVerificationGoogle | emailVerificationApple;
export type account_EmailVerified = account_emailVerified | account_emailVerifiedLogin;
export type PremiumSubscriptionOption = premiumSubscriptionOption;
export type SendAsPeer = sendAsPeer;
export type MessageExtendedMedia = messageExtendedMediaPreview | messageExtendedMedia;
export type StickerKeyword = stickerKeyword;
export type Username = username;
export type ForumTopic = forumTopicDeleted | forumTopic;
export type messages_ForumTopics = messages_forumTopics;
export type DefaultHistoryTTL = defaultHistoryTTL;
export type ExportedContactToken = exportedContactToken;
export type RequestPeerType = requestPeerTypeUser | requestPeerTypeChat | requestPeerTypeBroadcast;
export type EmojiList = emojiListNotModified | emojiList;
export type EmojiGroup = emojiGroup | emojiGroupGreeting | emojiGroupPremium;
export type messages_EmojiGroups = messages_emojiGroupsNotModified | messages_emojiGroups;
export type TextWithEntities = textWithEntities;
export type messages_TranslatedText = messages_translateResult;
export type AutoSaveSettings = autoSaveSettings;
export type AutoSaveException = autoSaveException;
export type account_AutoSaveSettings = account_autoSaveSettings;
export type help_AppConfig = help_appConfigNotModified | help_appConfig;
export type InputBotApp = inputBotAppID | inputBotAppShortName;
export type BotApp = botAppNotModified | botApp;
export type messages_BotApp = messages_botApp;
export type InlineBotWebView = inlineBotWebView;
export type ReadParticipantDate = readParticipantDate;
export type InputChatlist = inputChatlistDialogFilter;
export type ExportedChatlistInvite = exportedChatlistInvite;
export type chatlists_ExportedChatlistInvite = chatlists_exportedChatlistInvite;
export type chatlists_ExportedInvites = chatlists_exportedInvites;
export type chatlists_ChatlistInvite = chatlists_chatlistInviteAlready | chatlists_chatlistInvite;
export type chatlists_ChatlistUpdates = chatlists_chatlistUpdates;
export type bots_BotInfo = bots_botInfo;
export type MessagePeerVote = messagePeerVote | messagePeerVoteInputOption | messagePeerVoteMultiple;
export type StoryViews = storyViews;
export type StoryItem = storyItemDeleted | storyItemSkipped | storyItem;
export type stories_AllStories = stories_allStoriesNotModified | stories_allStories;
export type stories_Stories = stories_stories;
export type StoryView = storyView | storyViewPublicForward | storyViewPublicRepost;
export type stories_StoryViewsList = stories_storyViewsList;
export type stories_StoryViews = stories_storyViews;
export type InputReplyTo = inputReplyToMessage | inputReplyToStory | inputReplyToMonoForum;
export type ExportedStoryLink = exportedStoryLink;
export type StoriesStealthMode = storiesStealthMode;
export type MediaAreaCoordinates = mediaAreaCoordinates;
export type MediaArea = mediaAreaVenue | inputMediaAreaVenue | mediaAreaGeoPoint | mediaAreaSuggestedReaction | mediaAreaChannelPost | inputMediaAreaChannelPost | mediaAreaUrl | mediaAreaWeather | mediaAreaStarGift;
export type PeerStories = peerStories;
export type stories_PeerStories = stories_peerStories;
export type messages_WebPage = messages_webPage;
export type PremiumGiftCodeOption = premiumGiftCodeOption;
export type payments_CheckedGiftCode = payments_checkedGiftCode;
export type payments_GiveawayInfo = payments_giveawayInfo | payments_giveawayInfoResults;
export type PrepaidGiveaway = prepaidGiveaway | prepaidStarsGiveaway;
export type Boost = boost;
export type premium_BoostsList = premium_boostsList;
export type MyBoost = myBoost;
export type premium_MyBoosts = premium_myBoosts;
export type premium_BoostsStatus = premium_boostsStatus;
export type StoryFwdHeader = storyFwdHeader;
export type PostInteractionCounters = postInteractionCountersMessage | postInteractionCountersStory;
export type stats_StoryStats = stats_storyStats;
export type PublicForward = publicForwardMessage | publicForwardStory;
export type stats_PublicForwards = stats_publicForwards;
export type PeerColor = peerColor | peerColorCollectible | inputPeerColorCollectible;
export type help_PeerColorSet = help_peerColorSet | help_peerColorProfileSet;
export type help_PeerColorOption = help_peerColorOption;
export type help_PeerColors = help_peerColorsNotModified | help_peerColors;
export type StoryReaction = storyReaction | storyReactionPublicForward | storyReactionPublicRepost;
export type stories_StoryReactionsList = stories_storyReactionsList;
export type SavedDialog = savedDialog | monoForumDialog;
export type messages_SavedDialogs = messages_savedDialogs | messages_savedDialogsSlice | messages_savedDialogsNotModified;
export type SavedReactionTag = savedReactionTag;
export type messages_SavedReactionTags = messages_savedReactionTagsNotModified | messages_savedReactionTags;
export type OutboxReadDate = outboxReadDate;
export type smsjobs_EligibilityToJoin = smsjobs_eligibleToJoin;
export type smsjobs_Status = smsjobs_status;
export type SmsJob = smsJob;
export type BusinessWeeklyOpen = businessWeeklyOpen;
export type BusinessWorkHours = businessWorkHours;
export type BusinessLocation = businessLocation;
export type InputBusinessRecipients = inputBusinessRecipients;
export type BusinessRecipients = businessRecipients;
export type BusinessAwayMessageSchedule = businessAwayMessageScheduleAlways | businessAwayMessageScheduleOutsideWorkHours | businessAwayMessageScheduleCustom;
export type InputBusinessGreetingMessage = inputBusinessGreetingMessage;
export type BusinessGreetingMessage = businessGreetingMessage;
export type InputBusinessAwayMessage = inputBusinessAwayMessage;
export type BusinessAwayMessage = businessAwayMessage;
export type Timezone = timezone;
export type help_TimezonesList = help_timezonesListNotModified | help_timezonesList;
export type QuickReply = quickReply;
export type InputQuickReplyShortcut = inputQuickReplyShortcut | inputQuickReplyShortcutId;
export type messages_QuickReplies = messages_quickReplies | messages_quickRepliesNotModified;
export type ConnectedBot = connectedBot;
export type account_ConnectedBots = account_connectedBots;
export type messages_DialogFilters = messages_dialogFilters;
export type Birthday = birthday;
export type BotBusinessConnection = botBusinessConnection;
export type InputBusinessIntro = inputBusinessIntro;
export type BusinessIntro = businessIntro;
export type messages_MyStickers = messages_myStickers;
export type InputCollectible = inputCollectibleUsername | inputCollectiblePhone;
export type fragment_CollectibleInfo = fragment_collectibleInfo;
export type InputBusinessBotRecipients = inputBusinessBotRecipients;
export type BusinessBotRecipients = businessBotRecipients;
export type ContactBirthday = contactBirthday;
export type contacts_ContactBirthdays = contacts_contactBirthdays;
export type MissingInvitee = missingInvitee;
export type messages_InvitedUsers = messages_invitedUsers;
export type InputBusinessChatLink = inputBusinessChatLink;
export type BusinessChatLink = businessChatLink;
export type account_BusinessChatLinks = account_businessChatLinks;
export type account_ResolvedBusinessChatLinks = account_resolvedBusinessChatLinks;
export type RequestedPeer = requestedPeerUser | requestedPeerChat | requestedPeerChannel;
export type SponsoredMessageReportOption = sponsoredMessageReportOption;
export type channels_SponsoredMessageReportResult = channels_sponsoredMessageReportResultChooseOption | channels_sponsoredMessageReportResultAdsHidden | channels_sponsoredMessageReportResultReported;
export type ReactionNotificationsFrom = reactionNotificationsFromContacts | reactionNotificationsFromAll;
export type ReactionsNotifySettings = reactionsNotifySettings;
export type AvailableEffect = availableEffect;
export type messages_AvailableEffects = messages_availableEffectsNotModified | messages_availableEffects;
export type FactCheck = factCheck;
export type StarsTransactionPeer = starsTransactionPeerUnsupported | starsTransactionPeerAppStore | starsTransactionPeerPlayMarket | starsTransactionPeerPremiumBot | starsTransactionPeerFragment | starsTransactionPeer | starsTransactionPeerAds | starsTransactionPeerAPI;
export type StarsTopupOption = starsTopupOption;
export type StarsTransaction = starsTransaction;
export type payments_StarsStatus = payments_starsStatus;
export type FoundStory = foundStory;
export type stories_FoundStories = stories_foundStories;
export type GeoPointAddress = geoPointAddress;
export type StarsRevenueStatus = starsRevenueStatus;
export type payments_StarsRevenueStats = payments_starsRevenueStats;
export type payments_StarsRevenueWithdrawalUrl = payments_starsRevenueWithdrawalUrl;
export type payments_StarsRevenueAdsAccountUrl = payments_starsRevenueAdsAccountUrl;
export type InputStarsTransaction = inputStarsTransaction;
export type StarsGiftOption = starsGiftOption;
export type bots_PopularAppBots = bots_popularAppBots;
export type BotPreviewMedia = botPreviewMedia;
export type bots_PreviewInfo = bots_previewInfo;
export type StarsSubscriptionPricing = starsSubscriptionPricing;
export type StarsSubscription = starsSubscription;
export type MessageReactor = messageReactor;
export type StarsGiveawayOption = starsGiveawayOption;
export type StarsGiveawayWinnersOption = starsGiveawayWinnersOption;
export type StarGift = starGift | starGiftUnique;
export type payments_StarGifts = payments_starGiftsNotModified | payments_starGifts;
export type MessageReportOption = messageReportOption;
export type ReportResult = reportResultChooseOption | reportResultAddComment | reportResultReported;
export type messages_BotPreparedInlineMessage = messages_botPreparedInlineMessage;
export type messages_PreparedInlineMessage = messages_preparedInlineMessage;
export type BotAppSettings = botAppSettings;
export type StarRefProgram = starRefProgram;
export type ConnectedBotStarRef = connectedBotStarRef;
export type payments_ConnectedStarRefBots = payments_connectedStarRefBots;
export type payments_SuggestedStarRefBots = payments_suggestedStarRefBots;
export type StarsAmount = starsAmount | starsTonAmount;
export type messages_FoundStickers = messages_foundStickersNotModified | messages_foundStickers;
export type BotVerifierSettings = botVerifierSettings;
export type BotVerification = botVerification;
export type StarGiftAttribute = starGiftAttributeModel | starGiftAttributePattern | starGiftAttributeBackdrop | starGiftAttributeOriginalDetails;
export type payments_StarGiftUpgradePreview = payments_starGiftUpgradePreview;
export type users_Users = users_users | users_usersSlice;
export type payments_UniqueStarGift = payments_uniqueStarGift;
export type messages_WebPagePreview = messages_webPagePreview;
export type SavedStarGift = savedStarGift;
export type payments_SavedStarGifts = payments_savedStarGifts;
export type InputSavedStarGift = inputSavedStarGiftUser | inputSavedStarGiftChat | inputSavedStarGiftSlug;
export type payments_StarGiftWithdrawalUrl = payments_starGiftWithdrawalUrl;
export type PaidReactionPrivacy = paidReactionPrivacyDefault | paidReactionPrivacyAnonymous | paidReactionPrivacyPeer;
export type account_PaidMessagesRevenue = account_paidMessagesRevenue;
export type RequirementToContact = requirementToContactEmpty | requirementToContactPremium | requirementToContactPaidMessages;
export type BusinessBotRights = businessBotRights;
export type DisallowedGiftsSettings = disallowedGiftsSettings;
export type SponsoredPeer = sponsoredPeer;
export type contacts_SponsoredPeers = contacts_sponsoredPeersEmpty | contacts_sponsoredPeers;
export type StarGiftAttributeId = starGiftAttributeIdModel | starGiftAttributeIdPattern | starGiftAttributeIdBackdrop;
export type StarGiftAttributeCounter = starGiftAttributeCounter;
export type payments_ResaleStarGifts = payments_resaleStarGifts;
export type stories_CanSendStoryCount = stories_canSendStoryCount;
export type PendingSuggestion = pendingSuggestion;
export type TodoItem = todoItem;
export type TodoList = todoList;
export type TodoCompletion = todoCompletion;
export type SuggestedPost = suggestedPost;
export type StarsRating = starsRating;
export type StarGiftCollection = starGiftCollection;
export type payments_StarGiftCollections = payments_starGiftCollectionsNotModified | payments_starGiftCollections;
export type StoryAlbum = storyAlbum;
export type stories_Albums = stories_albumsNotModified | stories_albums;
export type SearchPostsFlood = searchPostsFlood;
export type payments_UniqueStarGiftValueInfo = payments_uniqueStarGiftValueInfo;
export type ProfileTab = profileTabPosts | profileTabGifts | profileTabMedia | profileTabFiles | profileTabMusic | profileTabVoice | profileTabLinks | profileTabGifs;
export type users_SavedMusic = users_savedMusicNotModified | users_savedMusic;
export type account_SavedMusicIds = account_savedMusicIdsNotModified | account_savedMusicIds;
export type payments_CheckCanSendGiftResult = payments_checkCanSendGiftResultOk | payments_checkCanSendGiftResultFail;
export type InputChatTheme = inputChatThemeEmpty | inputChatTheme | inputChatThemeUniqueGift;
export type StarGiftUpgradePrice = starGiftUpgradePrice;
export type GroupCallMessage = groupCallMessage;
export type GroupCallDonor = groupCallDonor;
export type phone_GroupCallStars = phone_groupCallStars;
export type RecentStory = recentStory;
export type AuctionBidLevel = auctionBidLevel;
export type StarGiftAuctionState = starGiftAuctionStateNotModified | starGiftAuctionState | starGiftAuctionStateFinished;
export type StarGiftAuctionUserState = starGiftAuctionUserState;
export type payments_StarGiftAuctionState = payments_starGiftAuctionState;
export type StarGiftAuctionAcquiredGift = starGiftAuctionAcquiredGift;
export type payments_StarGiftAuctionAcquiredGifts = payments_starGiftAuctionAcquiredGifts;
export type StarGiftActiveAuctionState = starGiftActiveAuctionState;
export type payments_StarGiftActiveAuctions = payments_starGiftActiveAuctionsNotModified | payments_starGiftActiveAuctions;
export type InputStarGiftAuction = inputStarGiftAuction | inputStarGiftAuctionSlug;
export type Passkey = passkey;
export type account_Passkeys = account_passkeys;
export type account_PasskeyRegistrationOptions = account_passkeyRegistrationOptions;
export type auth_PasskeyLoginOptions = auth_passkeyLoginOptions;
export type InputPasskeyResponse = inputPasskeyResponseRegister | inputPasskeyResponseLogin;
export type InputPasskeyCredential = inputPasskeyCredentialPublicKey | inputPasskeyCredentialFirebasePNV;
export type StarGiftBackground = starGiftBackground;
export type StarGiftAuctionRound = starGiftAuctionRound | starGiftAuctionRoundExtendable;
export type payments_StarGiftUpgradeAttributes = payments_starGiftUpgradeAttributes;
export type messages_EmojiGameOutcome = messages_emojiGameOutcome;
export type messages_EmojiGameInfo = messages_emojiGameUnavailable | messages_emojiGameDiceInfo;
export declare const schema: Schema;
export declare const LAYER = 221;
export {};
//# sourceMappingURL=1_telegram_api.d.ts.map