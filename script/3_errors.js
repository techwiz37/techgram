"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BroadcastRequired = exports.BroadcastPublicVotersForbidden = exports.BroadcastIdInvalid = exports.BroadcastForbidden = exports.BroadcastCallsDisabled = exports.BotScoreNotModified = exports.BotResponseTimeout = exports.BotPollsDisabled = exports.BotPaymentsDisabled = exports.BotOnesideNotAvail = exports.BotMissing = exports.BotMethodInvalid = exports.BotInvalid = exports.BotInlineDisabled = exports.BotGroupsBlocked = exports.BotGamesDisabled = exports.BotDomainInvalid = exports.BotCommandInvalid = exports.BotCommandDescriptionInvalid = exports.BotChannelsNa = exports.BotsTooMuch = exports.BasePortLocInvalid = exports.BannedRightsInvalid = exports.BankCardNumberInvalid = exports.AutoarchiveNotAvailable = exports.AuthTokenInvalid = exports.AuthTokenExpired = exports.AuthTokenException = exports.AuthTokenAlreadyAccepted = exports.AuthRestart = exports.AuthKeyUnregistered = exports.AuthKeyPermEmpty = exports.AuthKeyInvalid = exports.AuthKeyDuplicated = exports.AuthBytesInvalid = exports.AudioTitleEmpty = exports.AudioContentUrlEmpty = exports.ArticleTitleEmpty = exports.ApiIdPublishedFlood = exports.ApiIdInvalid = exports.AlbumPhotosTooMany = exports.AdminRankInvalid = exports.AdminRankEmojiNotAllowed = exports.AdminIdInvalid = exports.AdminsTooMuch = exports.ActiveUserRequired = exports.AccessTokenInvalid = exports.AccessTokenExpired = exports.AboutTooLong = exports.TelegramError = void 0;
exports.ChatTooBig = exports.ChatTitleEmpty = exports.ChatSendStickersForbidden = exports.ChatSendPollForbidden = exports.ChatSendMediaForbidden = exports.ChatSendInlineForbidden = exports.ChatSendGifsForbidden = exports.ChatSendGameForbidden = exports.ChatRevokeDateUnsupported = exports.ChatRestricted = exports.ChatNotModified = exports.ChatLinkExists = exports.ChatInvitePermanent = exports.ChatInvalid = exports.ChatIdInvalid = exports.ChatIdGenerateFailed = exports.ChatIdEmpty = exports.ChatGuestSendForbidden = exports.ChatGetFailed = exports.ChatForwardsRestricted = exports.ChatForbidden = exports.ChatDiscussionUnallowed = exports.ChatAdminRequired = exports.ChatAdminInviteRequired = exports.ChatAboutTooLong = exports.ChatAboutNotModified = exports.ChannelTooLarge = exports.ChannelTooBig = exports.ChannelPublicGroupNa = exports.ChannelPrivate = exports.ChannelParicipantMissing = exports.ChannelInvalid = exports.ChannelIdInvalid = exports.ChannelForumMissing = exports.ChannelBanned = exports.ChannelsTooMuch = exports.ChannelsAdminPublicTooMuch = exports.ChannelsAdminLocatedTooMuch = exports.CdnUploadTimeout = exports.CdnMethodInvalid = exports.CallProtocolFlagsInvalid = exports.CallPeerInvalid = exports.CallOccupyFailed = exports.CallAlreadyDeclined = exports.CallAlreadyAccepted = exports.ButtonUserPrivacyRestricted = exports.ButtonUrlInvalid = exports.ButtonTypeInvalid = exports.ButtonTextInvalid = exports.ButtonDataInvalid = void 0;
exports.ExternalUrlInvalid = exports.ExportCardInvalid = exports.ExpireForbidden = exports.ExpireDateInvalid = exports.ErrorTextEmpty = exports.EntityMentionUserInvalid = exports.EntityBoundsInvalid = exports.EntitiesTooLong = exports.EncryptionOccupyFailed = exports.EncryptionIdInvalid = exports.EncryptionDeclined = exports.EncryptionAlreadyDeclined = exports.EncryptionAlreadyAccepted = exports.EncryptedMessageInvalid = exports.EmoticonStickerpackMissing = exports.EmoticonInvalid = exports.EmoticonEmpty = exports.EmojiNotModified = exports.EmojiInvalid = exports.EmailVerifyExpired = exports.EmailUnconfirmed = exports.EmailInvalid = exports.EmailHashExpired = exports.EditBotInviteForbidden = exports.DocumentInvalid = exports.DhGAInvalid = exports.DcIdInvalid = exports.DateEmpty = exports.DataTooLong = exports.DataJsonInvalid = exports.DataInvalid = exports.CurrencyTotalAmountInvalid = exports.CreateCallFailed = exports.ContactReqMissing = exports.ContactNameEmpty = exports.ContactIdInvalid = exports.ContactAddMissing = exports.ConnectionSystemLangCodeEmpty = exports.ConnectionSystemEmpty = exports.ConnectionNotInited = exports.ConnectionLayerInvalid = exports.ConnectionLangPackInvalid = exports.ConnectionDeviceModelEmpty = exports.ConnectionAppVersionEmpty = exports.ConnectionApiIdInvalid = exports.CodeInvalid = exports.CodeHashInvalid = exports.CodeEmpty = exports.ChpCallFail = exports.ChatWriteForbidden = void 0;
exports.HideRequesterMissing = exports.HashInvalid = exports.GroupCallInvalid = exports.GroupedMediaInvalid = exports.GroupcallSsrcDuplicateMuch = exports.GroupcallNotModified = exports.GroupcallJoinMissing = exports.GroupcallInvalid = exports.GroupcallForbidden = exports.GroupcallAlreadyStarted = exports.GroupcallAlreadyDiscarded = exports.GroupcallAddParticipantsFailed = exports.GraphOutdatedReload = exports.GraphInvalidReload = exports.GraphExpiredReload = exports.GifIdInvalid = exports.GifContentTypeInvalid = exports.GeoPointInvalid = exports.GameBotInvalid = exports.FromPeerInvalid = exports.FromMessageBotDisabled = exports.FreshResetAuthorisationForbidden = exports.FreshChangePhoneForbidden = exports.FreshChangeAdminsForbidden = exports.FolderIdInvalid = exports.FolderIdEmpty = exports.FirstnameInvalid = exports.FilterTitleEmpty = exports.FilterNotSupported = exports.FilterIncludeEmpty = exports.FilterIdInvalid = exports.FileTitleEmpty = exports.FileReferenceInvalid = exports.FileReferenceExpired = exports.FileReferenceEmpty = exports.FilePartXMissing = exports.FilePartTooBig = exports.FilePartSizeInvalid = exports.FilePartSizeChanged = exports.FilePartLengthInvalid = exports.FilePartInvalid = exports.FilePartEmpty = exports.FilePart_0Missing = exports.FilePartsInvalid = exports.FileIdInvalid = exports.FileEmtpy = exports.FileContentTypeInvalid = exports.FilerefUpgradeNeeded = exports.FieldNameInvalid = exports.FieldNameEmpty = void 0;
exports.MessageAuthorRequired = exports.MemberOccupyPrimaryLocFailed = exports.MemberNoLocation = exports.MegagroupRequired = exports.MegagroupPrehistoryHidden = exports.MegagroupIdInvalid = exports.MediaTtlInvalid = exports.MediaPrevInvalid = exports.MediaNewInvalid = exports.MediaInvalid = exports.MediaGroupedInvalid = exports.MediaEmpty = exports.MediaCaptionTooLong = exports.Md5ChecksumInvalid = exports.MaxQtsInvalid = exports.MaxIdInvalid = exports.MaxDateInvalid = exports.LocationInvalid = exports.LinkNotModified = exports.LimitInvalid = exports.LastnameInvalid = exports.LangPackInvalid = exports.LangCodeNotSupported = exports.LangCodeInvalid = exports.JoinAsPeerInvalid = exports.InvoicePayloadInvalid = exports.InviteRevokedMissing = exports.InviteRequestSent = exports.InviteHashInvalid = exports.InviteHashExpired = exports.InviteHashEmpty = exports.InviteForbiddenWithJoinas = exports.InterdcXCallRichError = exports.InterdcXCallError = exports.InputUserDeactivated = exports.InputTextEmpty = exports.InputRequestTooLong = exports.InputMethodInvalid = exports.InputLayerInvalid = exports.InputFilterInvalid = exports.InputFetchFail = exports.InputFetchError = exports.InputConstructorInvalid = exports.InlineResultExpired = exports.InlineBotRequired = exports.ImportIdInvalid = exports.ImportFormatUnrecognized = exports.ImportFileInvalid = exports.ImageProcessFailed = exports.HistoryGetFailed = void 0;
exports.PhoneCodeEmpty = exports.PersistentTimestampOutdated = exports.PersistentTimestampInvalid = exports.PersistentTimestampEmpty = exports.PeerIdNotSupported = exports.PeerIdInvalid = exports.PeerHistoryEmpty = exports.PeerFlood = exports.PaymentProviderInvalid = exports.PasswordRequired = exports.PasswordRecoveryNa = exports.PasswordRecoveryExpired = exports.PasswordMissing = exports.PasswordHashInvalid = exports.PasswordEmpty = exports.ParticipantVersionOutdated = exports.ParticipantJoinMissing = exports.ParticipantIdInvalid = exports.ParticipantCallFailed = exports.ParticipantsTooFew = exports.PackTitleInvalid = exports.PackShortNameOccupied = exports.PackShortNameInvalid = exports.OptionInvalid = exports.OptionsTooMuch = exports.OffsetPeerIdInvalid = exports.OffsetInvalid = exports.NotAllowed = exports.NextOffsetInvalid = exports.NewSettingsInvalid = exports.NewSettingsEmpty = exports.NewSaltInvalid = exports.NeedMemberInvalid = exports.NeedChatInvalid = exports.MultiMediaTooLong = exports.MtSendQueueTooLong = exports.MsgWaitFailed = exports.MsgTooOld = exports.MsgIdInvalid = exports.MsgidDecreaseRetry = exports.MinDateInvalid = exports.MethodInvalid = exports.MessageTooLong = exports.MessagePollClosed = exports.MessageNotModified = exports.MessageIdInvalid = exports.MessageIdsEmpty = exports.MessageEmpty = exports.MessageEditTimeExpired = exports.MessageDeleteForbidden = void 0;
exports.QuizCorrectAnswerInvalid = exports.QuizCorrectAnswersTooMuch = exports.QuizCorrectAnswersEmpty = exports.QuizAnswerMissing = exports.QueryTooShort = exports.QueryIdInvalid = exports.QueryIdEmpty = exports.PublicKeyRequired = exports.PublicChannelMissing = exports.PtsChangeEmpty = exports.PrivacyValueInvalid = exports.PrivacyTooLong = exports.PrivacyKeyInvalid = exports.PreviousChatImportActiveWaitXmin = exports.PremiumCurrentlyUnavailable = exports.PremiumAccountRequired = exports.PostponedTimeout = exports.PollVoteRequired = exports.PollUnsupported = exports.PollQuestionInvalid = exports.PollOptionInvalid = exports.PollOptionDuplicate = exports.PollAnswerInvalid = exports.PollAnswersInvalid = exports.PinRestricted = exports.PinnedDialogsTooMuch = exports.PhotoThumbUrlEmpty = exports.PhotoSaveFileInvalid = exports.PhotoInvalidDimensions = exports.PhotoInvalid = exports.PhotoIdInvalid = exports.PhotoFileMissing = exports.PhotoExtInvalid = exports.PhotoCropSizeSmall = exports.PhotoCropFileMissing = exports.PhotoContentUrlEmpty = exports.PhotoContentTypeInvalid = exports.PhonePasswordProtected = exports.PhonePasswordFlood = exports.PhoneNumberUnoccupied = exports.PhoneNumberOccupied = exports.PhoneNumberInvalid = exports.PhoneNumberFlood = exports.PhoneNumberBanned = exports.PhoneNumberAppSignupForbidden = exports.PhoneNotOccupied = exports.PhoneHashExpired = exports.PhoneCodeInvalid = exports.PhoneCodeHashEmpty = exports.PhoneCodeExpired = void 0;
exports.SignInFailed = exports.ShortNameOccupied = exports.ShortNameInvalid = exports.ShortnameOccupyFailed = exports.Sha256HashInvalid = exports.SettingsInvalid = exports.SessionRevoked = exports.SessionPasswordNeeded = exports.SessionExpired = exports.SensitiveChangeForbidden = exports.SendMessageTypeInvalid = exports.SendMessageMediaInvalid = exports.SendCodeUnavailable = exports.SendAsPeerInvalid = exports.SecondsInvalid = exports.SearchWithLinkNotSupported = exports.SearchQueryEmpty = exports.ScoreInvalid = exports.ScheduleTooMuch = exports.ScheduleStatusPrivate = exports.ScheduleDateTooLate = exports.ScheduleDateInvalid = exports.ScheduleBotNotAllowed = exports.RsaDecryptFailed = exports.RpcMcgetFail = exports.RpcCallFail = exports.RightForbidden = exports.RightsNotModified = exports.RevoteNotAllowed = exports.ResultTypeInvalid = exports.ResultIdInvalid = exports.ResultIdEmpty = exports.ResultIdDuplicate = exports.ResultsTooMuch = exports.ResetRequestMissing = exports.ReplyMarkupTooLong = exports.ReplyMarkupInvalid = exports.ReplyMarkupGameEmpty = exports.ReplyMarkupBuyEmpty = exports.RegIdGenerateFailed = exports.ReflectorNotAvailable = exports.ReactionInvalid = exports.ReactionEmpty = exports.ReactionsTooMany = exports.RangesInvalid = exports.RandomLengthInvalid = exports.RandomIdInvalid = exports.RandomIdEmpty = exports.RandomIdDuplicate = exports.QuizMultipleInvalid = void 0;
exports.TtlDaysInvalid = exports.ToLangInvalid = exports.TopicDeleted = exports.TokenInvalid = exports.TmpPasswordInvalid = exports.TmpPasswordDisabled = exports.TitleInvalid = exports.TimeTooSmall = exports.TimeTooBig = exports.Timeout = exports.ThemeTitleInvalid = exports.ThemeMimeInvalid = exports.ThemeInvalid = exports.ThemeFormatInvalid = exports.ThemeFileInvalid = exports.TempAuthKeyEmpty = exports.TempAuthKeyAlreadyBound = exports.TakeoutRequired = exports.TakeoutInvalid = exports.SwitchPmTextEmpty = exports.StoreInvalidScalarType = exports.StorageCheckFailed = exports.StickerVideoNowebm = exports.StickerVideoNodoc = exports.StickerVideoBig = exports.StickerThumbTgsNotgs = exports.StickerThumbPngNopng = exports.StickerTgsNotgs = exports.StickerTgsNodoc = exports.StickerPngNopng = exports.StickerPngDimensions = exports.StickerMimeInvalid = exports.StickerInvalid = exports.StickerIdInvalid = exports.StickerGifDimensions = exports.StickerFileInvalid = exports.StickerEmojiInvalid = exports.StickerDocumentInvalid = exports.StickersTooMuch = exports.StickersEmpty = exports.StickersetOwnerAnonymous = exports.StickersetInvalid = exports.StickerpackStickersTooMuch = exports.StartParamTooLong = exports.StartParamInvalid = exports.StartParamEmpty = exports.SrpPasswordChanged = exports.SrpIdInvalid = exports.SmsCodeCreateFailed = exports.SlowmodeMultiMsgsDisabled = void 0;
exports.WallpaperMimeInvalid = exports.WallpaperInvalid = exports.WallpaperFileInvalid = exports.VoiceMessagesForbidden = exports.VideoTitleEmpty = exports.VideoFileInvalid = exports.VideoContentTypeInvalid = exports.UserVolumeInvalid = exports.UserRestricted = exports.UserPrivacyRestricted = exports.UserNotParticipant = exports.UserNotMutualContact = exports.UserKicked = exports.UserIsBot = exports.UserIsBlocked = exports.UserInvalid = exports.UserIdInvalid = exports.UserDeleted = exports.UserDeactivatedBan = exports.UserDeactivated = exports.UserCreator = exports.UserChannelsTooMuch = exports.UserBotRequired = exports.UserBotInvalid = exports.UserBot = exports.UserBlocked = exports.UserBannedInChannel = exports.UserAlreadyParticipant = exports.UserAlreadyInvited = exports.UserAdminInvalid = exports.UsersTooMuch = exports.UsersTooFew = exports.UserpicUploadRequired = exports.UserpicPrivacyRequired = exports.UsernamePurchaseAvailable = exports.UsernameOccupied = exports.UsernameNotOccupied = exports.UsernameNotModified = exports.UsernameInvalid = exports.UsageLimitInvalid = exports.UrlInvalid = exports.UpdateAppToLogin = exports.UntilDateInvalid = exports.UnknownMethod = exports.UnknownError = exports.Timedout = exports.TypeConstructorInvalid = exports.TypesEmpty = exports.TtlPeriodInvalid = exports.TtlMediaInvalid = void 0;
exports.map = exports.YouBlockedUser = exports.WorkerBusyTooLongRetry = exports.WebpushTokenInvalid = exports.WebpushKeyInvalid = exports.WebpushAuthInvalid = exports.WebpageMediaEmpty = exports.WebpageCurlFailed = exports.WebdocumentUrlInvalid = exports.WebdocumentSizeTooBig = exports.WebdocumentMimeInvalid = exports.WebdocumentInvalid = exports.WcConvertUrlInvalid = void 0;
const _0_errors_js_1 = require("./0_errors.js");
const _2_tl_js_1 = require("./2_tl.js");
__exportStar(require("./0_errors.js"), exports);
class TelegramError extends _0_errors_js_1.techgramError {
    errorCode;
    errorMessage;
    constructor(params) {
        super(`${params.error_code}: ${params.error_message} (${(0, _2_tl_js_1.repr)(params.call)})`);
        this.name = "TelegramError";
        this.errorCode = params.error_code;
        this.errorMessage = params.error_message;
        this.cause = params.call;
    }
}
exports.TelegramError = TelegramError;
class AboutTooLong extends TelegramError {
}
exports.AboutTooLong = AboutTooLong;
class AccessTokenExpired extends TelegramError {
}
exports.AccessTokenExpired = AccessTokenExpired;
class AccessTokenInvalid extends TelegramError {
}
exports.AccessTokenInvalid = AccessTokenInvalid;
class ActiveUserRequired extends TelegramError {
}
exports.ActiveUserRequired = ActiveUserRequired;
class AdminsTooMuch extends TelegramError {
}
exports.AdminsTooMuch = AdminsTooMuch;
class AdminIdInvalid extends TelegramError {
}
exports.AdminIdInvalid = AdminIdInvalid;
class AdminRankEmojiNotAllowed extends TelegramError {
}
exports.AdminRankEmojiNotAllowed = AdminRankEmojiNotAllowed;
class AdminRankInvalid extends TelegramError {
}
exports.AdminRankInvalid = AdminRankInvalid;
class AlbumPhotosTooMany extends TelegramError {
}
exports.AlbumPhotosTooMany = AlbumPhotosTooMany;
class ApiIdInvalid extends TelegramError {
}
exports.ApiIdInvalid = ApiIdInvalid;
class ApiIdPublishedFlood extends TelegramError {
}
exports.ApiIdPublishedFlood = ApiIdPublishedFlood;
class ArticleTitleEmpty extends TelegramError {
}
exports.ArticleTitleEmpty = ArticleTitleEmpty;
class AudioContentUrlEmpty extends TelegramError {
}
exports.AudioContentUrlEmpty = AudioContentUrlEmpty;
class AudioTitleEmpty extends TelegramError {
}
exports.AudioTitleEmpty = AudioTitleEmpty;
class AuthBytesInvalid extends TelegramError {
}
exports.AuthBytesInvalid = AuthBytesInvalid;
class AuthKeyDuplicated extends TelegramError {
}
exports.AuthKeyDuplicated = AuthKeyDuplicated;
class AuthKeyInvalid extends TelegramError {
}
exports.AuthKeyInvalid = AuthKeyInvalid;
class AuthKeyPermEmpty extends TelegramError {
}
exports.AuthKeyPermEmpty = AuthKeyPermEmpty;
class AuthKeyUnregistered extends TelegramError {
}
exports.AuthKeyUnregistered = AuthKeyUnregistered;
class AuthRestart extends TelegramError {
}
exports.AuthRestart = AuthRestart;
class AuthTokenAlreadyAccepted extends TelegramError {
}
exports.AuthTokenAlreadyAccepted = AuthTokenAlreadyAccepted;
class AuthTokenException extends TelegramError {
}
exports.AuthTokenException = AuthTokenException;
class AuthTokenExpired extends TelegramError {
}
exports.AuthTokenExpired = AuthTokenExpired;
class AuthTokenInvalid extends TelegramError {
}
exports.AuthTokenInvalid = AuthTokenInvalid;
class AutoarchiveNotAvailable extends TelegramError {
}
exports.AutoarchiveNotAvailable = AutoarchiveNotAvailable;
class BankCardNumberInvalid extends TelegramError {
}
exports.BankCardNumberInvalid = BankCardNumberInvalid;
class BannedRightsInvalid extends TelegramError {
}
exports.BannedRightsInvalid = BannedRightsInvalid;
class BasePortLocInvalid extends TelegramError {
}
exports.BasePortLocInvalid = BasePortLocInvalid;
class BotsTooMuch extends TelegramError {
}
exports.BotsTooMuch = BotsTooMuch;
class BotChannelsNa extends TelegramError {
}
exports.BotChannelsNa = BotChannelsNa;
class BotCommandDescriptionInvalid extends TelegramError {
}
exports.BotCommandDescriptionInvalid = BotCommandDescriptionInvalid;
class BotCommandInvalid extends TelegramError {
}
exports.BotCommandInvalid = BotCommandInvalid;
class BotDomainInvalid extends TelegramError {
}
exports.BotDomainInvalid = BotDomainInvalid;
class BotGamesDisabled extends TelegramError {
}
exports.BotGamesDisabled = BotGamesDisabled;
class BotGroupsBlocked extends TelegramError {
}
exports.BotGroupsBlocked = BotGroupsBlocked;
class BotInlineDisabled extends TelegramError {
}
exports.BotInlineDisabled = BotInlineDisabled;
class BotInvalid extends TelegramError {
}
exports.BotInvalid = BotInvalid;
class BotMethodInvalid extends TelegramError {
}
exports.BotMethodInvalid = BotMethodInvalid;
class BotMissing extends TelegramError {
}
exports.BotMissing = BotMissing;
class BotOnesideNotAvail extends TelegramError {
}
exports.BotOnesideNotAvail = BotOnesideNotAvail;
class BotPaymentsDisabled extends TelegramError {
}
exports.BotPaymentsDisabled = BotPaymentsDisabled;
class BotPollsDisabled extends TelegramError {
}
exports.BotPollsDisabled = BotPollsDisabled;
class BotResponseTimeout extends TelegramError {
}
exports.BotResponseTimeout = BotResponseTimeout;
class BotScoreNotModified extends TelegramError {
}
exports.BotScoreNotModified = BotScoreNotModified;
class BroadcastCallsDisabled extends TelegramError {
}
exports.BroadcastCallsDisabled = BroadcastCallsDisabled;
class BroadcastForbidden extends TelegramError {
}
exports.BroadcastForbidden = BroadcastForbidden;
class BroadcastIdInvalid extends TelegramError {
}
exports.BroadcastIdInvalid = BroadcastIdInvalid;
class BroadcastPublicVotersForbidden extends TelegramError {
}
exports.BroadcastPublicVotersForbidden = BroadcastPublicVotersForbidden;
class BroadcastRequired extends TelegramError {
}
exports.BroadcastRequired = BroadcastRequired;
class ButtonDataInvalid extends TelegramError {
}
exports.ButtonDataInvalid = ButtonDataInvalid;
class ButtonTextInvalid extends TelegramError {
}
exports.ButtonTextInvalid = ButtonTextInvalid;
class ButtonTypeInvalid extends TelegramError {
}
exports.ButtonTypeInvalid = ButtonTypeInvalid;
class ButtonUrlInvalid extends TelegramError {
}
exports.ButtonUrlInvalid = ButtonUrlInvalid;
class ButtonUserPrivacyRestricted extends TelegramError {
}
exports.ButtonUserPrivacyRestricted = ButtonUserPrivacyRestricted;
class CallAlreadyAccepted extends TelegramError {
}
exports.CallAlreadyAccepted = CallAlreadyAccepted;
class CallAlreadyDeclined extends TelegramError {
}
exports.CallAlreadyDeclined = CallAlreadyDeclined;
class CallOccupyFailed extends TelegramError {
}
exports.CallOccupyFailed = CallOccupyFailed;
class CallPeerInvalid extends TelegramError {
}
exports.CallPeerInvalid = CallPeerInvalid;
class CallProtocolFlagsInvalid extends TelegramError {
}
exports.CallProtocolFlagsInvalid = CallProtocolFlagsInvalid;
class CdnMethodInvalid extends TelegramError {
}
exports.CdnMethodInvalid = CdnMethodInvalid;
class CdnUploadTimeout extends TelegramError {
}
exports.CdnUploadTimeout = CdnUploadTimeout;
class ChannelsAdminLocatedTooMuch extends TelegramError {
}
exports.ChannelsAdminLocatedTooMuch = ChannelsAdminLocatedTooMuch;
class ChannelsAdminPublicTooMuch extends TelegramError {
}
exports.ChannelsAdminPublicTooMuch = ChannelsAdminPublicTooMuch;
class ChannelsTooMuch extends TelegramError {
}
exports.ChannelsTooMuch = ChannelsTooMuch;
class ChannelBanned extends TelegramError {
}
exports.ChannelBanned = ChannelBanned;
class ChannelForumMissing extends TelegramError {
}
exports.ChannelForumMissing = ChannelForumMissing;
class ChannelIdInvalid extends TelegramError {
}
exports.ChannelIdInvalid = ChannelIdInvalid;
class ChannelInvalid extends TelegramError {
}
exports.ChannelInvalid = ChannelInvalid;
class ChannelParicipantMissing extends TelegramError {
}
exports.ChannelParicipantMissing = ChannelParicipantMissing;
class ChannelPrivate extends TelegramError {
}
exports.ChannelPrivate = ChannelPrivate;
class ChannelPublicGroupNa extends TelegramError {
}
exports.ChannelPublicGroupNa = ChannelPublicGroupNa;
class ChannelTooBig extends TelegramError {
}
exports.ChannelTooBig = ChannelTooBig;
class ChannelTooLarge extends TelegramError {
}
exports.ChannelTooLarge = ChannelTooLarge;
class ChatAboutNotModified extends TelegramError {
}
exports.ChatAboutNotModified = ChatAboutNotModified;
class ChatAboutTooLong extends TelegramError {
}
exports.ChatAboutTooLong = ChatAboutTooLong;
class ChatAdminInviteRequired extends TelegramError {
}
exports.ChatAdminInviteRequired = ChatAdminInviteRequired;
class ChatAdminRequired extends TelegramError {
}
exports.ChatAdminRequired = ChatAdminRequired;
class ChatDiscussionUnallowed extends TelegramError {
}
exports.ChatDiscussionUnallowed = ChatDiscussionUnallowed;
class ChatForbidden extends TelegramError {
}
exports.ChatForbidden = ChatForbidden;
class ChatForwardsRestricted extends TelegramError {
}
exports.ChatForwardsRestricted = ChatForwardsRestricted;
class ChatGetFailed extends TelegramError {
}
exports.ChatGetFailed = ChatGetFailed;
class ChatGuestSendForbidden extends TelegramError {
}
exports.ChatGuestSendForbidden = ChatGuestSendForbidden;
class ChatIdEmpty extends TelegramError {
}
exports.ChatIdEmpty = ChatIdEmpty;
class ChatIdGenerateFailed extends TelegramError {
}
exports.ChatIdGenerateFailed = ChatIdGenerateFailed;
class ChatIdInvalid extends TelegramError {
}
exports.ChatIdInvalid = ChatIdInvalid;
class ChatInvalid extends TelegramError {
}
exports.ChatInvalid = ChatInvalid;
class ChatInvitePermanent extends TelegramError {
}
exports.ChatInvitePermanent = ChatInvitePermanent;
class ChatLinkExists extends TelegramError {
}
exports.ChatLinkExists = ChatLinkExists;
class ChatNotModified extends TelegramError {
}
exports.ChatNotModified = ChatNotModified;
class ChatRestricted extends TelegramError {
}
exports.ChatRestricted = ChatRestricted;
class ChatRevokeDateUnsupported extends TelegramError {
}
exports.ChatRevokeDateUnsupported = ChatRevokeDateUnsupported;
class ChatSendGameForbidden extends TelegramError {
}
exports.ChatSendGameForbidden = ChatSendGameForbidden;
class ChatSendGifsForbidden extends TelegramError {
}
exports.ChatSendGifsForbidden = ChatSendGifsForbidden;
class ChatSendInlineForbidden extends TelegramError {
}
exports.ChatSendInlineForbidden = ChatSendInlineForbidden;
class ChatSendMediaForbidden extends TelegramError {
}
exports.ChatSendMediaForbidden = ChatSendMediaForbidden;
class ChatSendPollForbidden extends TelegramError {
}
exports.ChatSendPollForbidden = ChatSendPollForbidden;
class ChatSendStickersForbidden extends TelegramError {
}
exports.ChatSendStickersForbidden = ChatSendStickersForbidden;
class ChatTitleEmpty extends TelegramError {
}
exports.ChatTitleEmpty = ChatTitleEmpty;
class ChatTooBig extends TelegramError {
}
exports.ChatTooBig = ChatTooBig;
class ChatWriteForbidden extends TelegramError {
}
exports.ChatWriteForbidden = ChatWriteForbidden;
class ChpCallFail extends TelegramError {
}
exports.ChpCallFail = ChpCallFail;
class CodeEmpty extends TelegramError {
}
exports.CodeEmpty = CodeEmpty;
class CodeHashInvalid extends TelegramError {
}
exports.CodeHashInvalid = CodeHashInvalid;
class CodeInvalid extends TelegramError {
}
exports.CodeInvalid = CodeInvalid;
class ConnectionApiIdInvalid extends TelegramError {
}
exports.ConnectionApiIdInvalid = ConnectionApiIdInvalid;
class ConnectionAppVersionEmpty extends TelegramError {
}
exports.ConnectionAppVersionEmpty = ConnectionAppVersionEmpty;
class ConnectionDeviceModelEmpty extends TelegramError {
}
exports.ConnectionDeviceModelEmpty = ConnectionDeviceModelEmpty;
class ConnectionLangPackInvalid extends TelegramError {
}
exports.ConnectionLangPackInvalid = ConnectionLangPackInvalid;
class ConnectionLayerInvalid extends TelegramError {
}
exports.ConnectionLayerInvalid = ConnectionLayerInvalid;
class ConnectionNotInited extends TelegramError {
}
exports.ConnectionNotInited = ConnectionNotInited;
class ConnectionSystemEmpty extends TelegramError {
}
exports.ConnectionSystemEmpty = ConnectionSystemEmpty;
class ConnectionSystemLangCodeEmpty extends TelegramError {
}
exports.ConnectionSystemLangCodeEmpty = ConnectionSystemLangCodeEmpty;
class ContactAddMissing extends TelegramError {
}
exports.ContactAddMissing = ContactAddMissing;
class ContactIdInvalid extends TelegramError {
}
exports.ContactIdInvalid = ContactIdInvalid;
class ContactNameEmpty extends TelegramError {
}
exports.ContactNameEmpty = ContactNameEmpty;
class ContactReqMissing extends TelegramError {
}
exports.ContactReqMissing = ContactReqMissing;
class CreateCallFailed extends TelegramError {
}
exports.CreateCallFailed = CreateCallFailed;
class CurrencyTotalAmountInvalid extends TelegramError {
}
exports.CurrencyTotalAmountInvalid = CurrencyTotalAmountInvalid;
class DataInvalid extends TelegramError {
}
exports.DataInvalid = DataInvalid;
class DataJsonInvalid extends TelegramError {
}
exports.DataJsonInvalid = DataJsonInvalid;
class DataTooLong extends TelegramError {
}
exports.DataTooLong = DataTooLong;
class DateEmpty extends TelegramError {
}
exports.DateEmpty = DateEmpty;
class DcIdInvalid extends TelegramError {
}
exports.DcIdInvalid = DcIdInvalid;
class DhGAInvalid extends TelegramError {
}
exports.DhGAInvalid = DhGAInvalid;
class DocumentInvalid extends TelegramError {
}
exports.DocumentInvalid = DocumentInvalid;
class EditBotInviteForbidden extends TelegramError {
}
exports.EditBotInviteForbidden = EditBotInviteForbidden;
class EmailHashExpired extends TelegramError {
}
exports.EmailHashExpired = EmailHashExpired;
class EmailInvalid extends TelegramError {
}
exports.EmailInvalid = EmailInvalid;
class EmailUnconfirmed extends TelegramError {
}
exports.EmailUnconfirmed = EmailUnconfirmed;
class EmailVerifyExpired extends TelegramError {
}
exports.EmailVerifyExpired = EmailVerifyExpired;
class EmojiInvalid extends TelegramError {
}
exports.EmojiInvalid = EmojiInvalid;
class EmojiNotModified extends TelegramError {
}
exports.EmojiNotModified = EmojiNotModified;
class EmoticonEmpty extends TelegramError {
}
exports.EmoticonEmpty = EmoticonEmpty;
class EmoticonInvalid extends TelegramError {
}
exports.EmoticonInvalid = EmoticonInvalid;
class EmoticonStickerpackMissing extends TelegramError {
}
exports.EmoticonStickerpackMissing = EmoticonStickerpackMissing;
class EncryptedMessageInvalid extends TelegramError {
}
exports.EncryptedMessageInvalid = EncryptedMessageInvalid;
class EncryptionAlreadyAccepted extends TelegramError {
}
exports.EncryptionAlreadyAccepted = EncryptionAlreadyAccepted;
class EncryptionAlreadyDeclined extends TelegramError {
}
exports.EncryptionAlreadyDeclined = EncryptionAlreadyDeclined;
class EncryptionDeclined extends TelegramError {
}
exports.EncryptionDeclined = EncryptionDeclined;
class EncryptionIdInvalid extends TelegramError {
}
exports.EncryptionIdInvalid = EncryptionIdInvalid;
class EncryptionOccupyFailed extends TelegramError {
}
exports.EncryptionOccupyFailed = EncryptionOccupyFailed;
class EntitiesTooLong extends TelegramError {
}
exports.EntitiesTooLong = EntitiesTooLong;
class EntityBoundsInvalid extends TelegramError {
}
exports.EntityBoundsInvalid = EntityBoundsInvalid;
class EntityMentionUserInvalid extends TelegramError {
}
exports.EntityMentionUserInvalid = EntityMentionUserInvalid;
class ErrorTextEmpty extends TelegramError {
}
exports.ErrorTextEmpty = ErrorTextEmpty;
class ExpireDateInvalid extends TelegramError {
}
exports.ExpireDateInvalid = ExpireDateInvalid;
class ExpireForbidden extends TelegramError {
}
exports.ExpireForbidden = ExpireForbidden;
class ExportCardInvalid extends TelegramError {
}
exports.ExportCardInvalid = ExportCardInvalid;
class ExternalUrlInvalid extends TelegramError {
}
exports.ExternalUrlInvalid = ExternalUrlInvalid;
class FieldNameEmpty extends TelegramError {
}
exports.FieldNameEmpty = FieldNameEmpty;
class FieldNameInvalid extends TelegramError {
}
exports.FieldNameInvalid = FieldNameInvalid;
class FilerefUpgradeNeeded extends TelegramError {
}
exports.FilerefUpgradeNeeded = FilerefUpgradeNeeded;
class FileContentTypeInvalid extends TelegramError {
}
exports.FileContentTypeInvalid = FileContentTypeInvalid;
class FileEmtpy extends TelegramError {
}
exports.FileEmtpy = FileEmtpy;
class FileIdInvalid extends TelegramError {
}
exports.FileIdInvalid = FileIdInvalid;
class FilePartsInvalid extends TelegramError {
}
exports.FilePartsInvalid = FilePartsInvalid;
class FilePart_0Missing extends TelegramError {
}
exports.FilePart_0Missing = FilePart_0Missing;
class FilePartEmpty extends TelegramError {
}
exports.FilePartEmpty = FilePartEmpty;
class FilePartInvalid extends TelegramError {
}
exports.FilePartInvalid = FilePartInvalid;
class FilePartLengthInvalid extends TelegramError {
}
exports.FilePartLengthInvalid = FilePartLengthInvalid;
class FilePartSizeChanged extends TelegramError {
}
exports.FilePartSizeChanged = FilePartSizeChanged;
class FilePartSizeInvalid extends TelegramError {
}
exports.FilePartSizeInvalid = FilePartSizeInvalid;
class FilePartTooBig extends TelegramError {
}
exports.FilePartTooBig = FilePartTooBig;
class FilePartXMissing extends TelegramError {
}
exports.FilePartXMissing = FilePartXMissing;
class FileReferenceEmpty extends TelegramError {
}
exports.FileReferenceEmpty = FileReferenceEmpty;
class FileReferenceExpired extends TelegramError {
}
exports.FileReferenceExpired = FileReferenceExpired;
class FileReferenceInvalid extends TelegramError {
}
exports.FileReferenceInvalid = FileReferenceInvalid;
class FileTitleEmpty extends TelegramError {
}
exports.FileTitleEmpty = FileTitleEmpty;
class FilterIdInvalid extends TelegramError {
}
exports.FilterIdInvalid = FilterIdInvalid;
class FilterIncludeEmpty extends TelegramError {
}
exports.FilterIncludeEmpty = FilterIncludeEmpty;
class FilterNotSupported extends TelegramError {
}
exports.FilterNotSupported = FilterNotSupported;
class FilterTitleEmpty extends TelegramError {
}
exports.FilterTitleEmpty = FilterTitleEmpty;
class FirstnameInvalid extends TelegramError {
}
exports.FirstnameInvalid = FirstnameInvalid;
class FolderIdEmpty extends TelegramError {
}
exports.FolderIdEmpty = FolderIdEmpty;
class FolderIdInvalid extends TelegramError {
}
exports.FolderIdInvalid = FolderIdInvalid;
class FreshChangeAdminsForbidden extends TelegramError {
}
exports.FreshChangeAdminsForbidden = FreshChangeAdminsForbidden;
class FreshChangePhoneForbidden extends TelegramError {
}
exports.FreshChangePhoneForbidden = FreshChangePhoneForbidden;
class FreshResetAuthorisationForbidden extends TelegramError {
}
exports.FreshResetAuthorisationForbidden = FreshResetAuthorisationForbidden;
class FromMessageBotDisabled extends TelegramError {
}
exports.FromMessageBotDisabled = FromMessageBotDisabled;
class FromPeerInvalid extends TelegramError {
}
exports.FromPeerInvalid = FromPeerInvalid;
class GameBotInvalid extends TelegramError {
}
exports.GameBotInvalid = GameBotInvalid;
class GeoPointInvalid extends TelegramError {
}
exports.GeoPointInvalid = GeoPointInvalid;
class GifContentTypeInvalid extends TelegramError {
}
exports.GifContentTypeInvalid = GifContentTypeInvalid;
class GifIdInvalid extends TelegramError {
}
exports.GifIdInvalid = GifIdInvalid;
class GraphExpiredReload extends TelegramError {
}
exports.GraphExpiredReload = GraphExpiredReload;
class GraphInvalidReload extends TelegramError {
}
exports.GraphInvalidReload = GraphInvalidReload;
class GraphOutdatedReload extends TelegramError {
}
exports.GraphOutdatedReload = GraphOutdatedReload;
class GroupcallAddParticipantsFailed extends TelegramError {
}
exports.GroupcallAddParticipantsFailed = GroupcallAddParticipantsFailed;
class GroupcallAlreadyDiscarded extends TelegramError {
}
exports.GroupcallAlreadyDiscarded = GroupcallAlreadyDiscarded;
class GroupcallAlreadyStarted extends TelegramError {
}
exports.GroupcallAlreadyStarted = GroupcallAlreadyStarted;
class GroupcallForbidden extends TelegramError {
}
exports.GroupcallForbidden = GroupcallForbidden;
class GroupcallInvalid extends TelegramError {
}
exports.GroupcallInvalid = GroupcallInvalid;
class GroupcallJoinMissing extends TelegramError {
}
exports.GroupcallJoinMissing = GroupcallJoinMissing;
class GroupcallNotModified extends TelegramError {
}
exports.GroupcallNotModified = GroupcallNotModified;
class GroupcallSsrcDuplicateMuch extends TelegramError {
}
exports.GroupcallSsrcDuplicateMuch = GroupcallSsrcDuplicateMuch;
class GroupedMediaInvalid extends TelegramError {
}
exports.GroupedMediaInvalid = GroupedMediaInvalid;
class GroupCallInvalid extends TelegramError {
}
exports.GroupCallInvalid = GroupCallInvalid;
class HashInvalid extends TelegramError {
}
exports.HashInvalid = HashInvalid;
class HideRequesterMissing extends TelegramError {
}
exports.HideRequesterMissing = HideRequesterMissing;
class HistoryGetFailed extends TelegramError {
}
exports.HistoryGetFailed = HistoryGetFailed;
class ImageProcessFailed extends TelegramError {
}
exports.ImageProcessFailed = ImageProcessFailed;
class ImportFileInvalid extends TelegramError {
}
exports.ImportFileInvalid = ImportFileInvalid;
class ImportFormatUnrecognized extends TelegramError {
}
exports.ImportFormatUnrecognized = ImportFormatUnrecognized;
class ImportIdInvalid extends TelegramError {
}
exports.ImportIdInvalid = ImportIdInvalid;
class InlineBotRequired extends TelegramError {
}
exports.InlineBotRequired = InlineBotRequired;
class InlineResultExpired extends TelegramError {
}
exports.InlineResultExpired = InlineResultExpired;
class InputConstructorInvalid extends TelegramError {
}
exports.InputConstructorInvalid = InputConstructorInvalid;
class InputFetchError extends TelegramError {
}
exports.InputFetchError = InputFetchError;
class InputFetchFail extends TelegramError {
}
exports.InputFetchFail = InputFetchFail;
class InputFilterInvalid extends TelegramError {
}
exports.InputFilterInvalid = InputFilterInvalid;
class InputLayerInvalid extends TelegramError {
}
exports.InputLayerInvalid = InputLayerInvalid;
class InputMethodInvalid extends TelegramError {
}
exports.InputMethodInvalid = InputMethodInvalid;
class InputRequestTooLong extends TelegramError {
}
exports.InputRequestTooLong = InputRequestTooLong;
class InputTextEmpty extends TelegramError {
}
exports.InputTextEmpty = InputTextEmpty;
class InputUserDeactivated extends TelegramError {
}
exports.InputUserDeactivated = InputUserDeactivated;
class InterdcXCallError extends TelegramError {
}
exports.InterdcXCallError = InterdcXCallError;
class InterdcXCallRichError extends TelegramError {
}
exports.InterdcXCallRichError = InterdcXCallRichError;
class InviteForbiddenWithJoinas extends TelegramError {
}
exports.InviteForbiddenWithJoinas = InviteForbiddenWithJoinas;
class InviteHashEmpty extends TelegramError {
}
exports.InviteHashEmpty = InviteHashEmpty;
class InviteHashExpired extends TelegramError {
}
exports.InviteHashExpired = InviteHashExpired;
class InviteHashInvalid extends TelegramError {
}
exports.InviteHashInvalid = InviteHashInvalid;
class InviteRequestSent extends TelegramError {
}
exports.InviteRequestSent = InviteRequestSent;
class InviteRevokedMissing extends TelegramError {
}
exports.InviteRevokedMissing = InviteRevokedMissing;
class InvoicePayloadInvalid extends TelegramError {
}
exports.InvoicePayloadInvalid = InvoicePayloadInvalid;
class JoinAsPeerInvalid extends TelegramError {
}
exports.JoinAsPeerInvalid = JoinAsPeerInvalid;
class LangCodeInvalid extends TelegramError {
}
exports.LangCodeInvalid = LangCodeInvalid;
class LangCodeNotSupported extends TelegramError {
}
exports.LangCodeNotSupported = LangCodeNotSupported;
class LangPackInvalid extends TelegramError {
}
exports.LangPackInvalid = LangPackInvalid;
class LastnameInvalid extends TelegramError {
}
exports.LastnameInvalid = LastnameInvalid;
class LimitInvalid extends TelegramError {
}
exports.LimitInvalid = LimitInvalid;
class LinkNotModified extends TelegramError {
}
exports.LinkNotModified = LinkNotModified;
class LocationInvalid extends TelegramError {
}
exports.LocationInvalid = LocationInvalid;
class MaxDateInvalid extends TelegramError {
}
exports.MaxDateInvalid = MaxDateInvalid;
class MaxIdInvalid extends TelegramError {
}
exports.MaxIdInvalid = MaxIdInvalid;
class MaxQtsInvalid extends TelegramError {
}
exports.MaxQtsInvalid = MaxQtsInvalid;
class Md5ChecksumInvalid extends TelegramError {
}
exports.Md5ChecksumInvalid = Md5ChecksumInvalid;
class MediaCaptionTooLong extends TelegramError {
}
exports.MediaCaptionTooLong = MediaCaptionTooLong;
class MediaEmpty extends TelegramError {
}
exports.MediaEmpty = MediaEmpty;
class MediaGroupedInvalid extends TelegramError {
}
exports.MediaGroupedInvalid = MediaGroupedInvalid;
class MediaInvalid extends TelegramError {
}
exports.MediaInvalid = MediaInvalid;
class MediaNewInvalid extends TelegramError {
}
exports.MediaNewInvalid = MediaNewInvalid;
class MediaPrevInvalid extends TelegramError {
}
exports.MediaPrevInvalid = MediaPrevInvalid;
class MediaTtlInvalid extends TelegramError {
}
exports.MediaTtlInvalid = MediaTtlInvalid;
class MegagroupIdInvalid extends TelegramError {
}
exports.MegagroupIdInvalid = MegagroupIdInvalid;
class MegagroupPrehistoryHidden extends TelegramError {
}
exports.MegagroupPrehistoryHidden = MegagroupPrehistoryHidden;
class MegagroupRequired extends TelegramError {
}
exports.MegagroupRequired = MegagroupRequired;
class MemberNoLocation extends TelegramError {
}
exports.MemberNoLocation = MemberNoLocation;
class MemberOccupyPrimaryLocFailed extends TelegramError {
}
exports.MemberOccupyPrimaryLocFailed = MemberOccupyPrimaryLocFailed;
class MessageAuthorRequired extends TelegramError {
}
exports.MessageAuthorRequired = MessageAuthorRequired;
class MessageDeleteForbidden extends TelegramError {
}
exports.MessageDeleteForbidden = MessageDeleteForbidden;
class MessageEditTimeExpired extends TelegramError {
}
exports.MessageEditTimeExpired = MessageEditTimeExpired;
class MessageEmpty extends TelegramError {
}
exports.MessageEmpty = MessageEmpty;
class MessageIdsEmpty extends TelegramError {
}
exports.MessageIdsEmpty = MessageIdsEmpty;
class MessageIdInvalid extends TelegramError {
}
exports.MessageIdInvalid = MessageIdInvalid;
class MessageNotModified extends TelegramError {
}
exports.MessageNotModified = MessageNotModified;
class MessagePollClosed extends TelegramError {
}
exports.MessagePollClosed = MessagePollClosed;
class MessageTooLong extends TelegramError {
}
exports.MessageTooLong = MessageTooLong;
class MethodInvalid extends TelegramError {
}
exports.MethodInvalid = MethodInvalid;
class MinDateInvalid extends TelegramError {
}
exports.MinDateInvalid = MinDateInvalid;
class MsgidDecreaseRetry extends TelegramError {
}
exports.MsgidDecreaseRetry = MsgidDecreaseRetry;
class MsgIdInvalid extends TelegramError {
}
exports.MsgIdInvalid = MsgIdInvalid;
class MsgTooOld extends TelegramError {
}
exports.MsgTooOld = MsgTooOld;
class MsgWaitFailed extends TelegramError {
}
exports.MsgWaitFailed = MsgWaitFailed;
class MtSendQueueTooLong extends TelegramError {
}
exports.MtSendQueueTooLong = MtSendQueueTooLong;
class MultiMediaTooLong extends TelegramError {
}
exports.MultiMediaTooLong = MultiMediaTooLong;
class NeedChatInvalid extends TelegramError {
}
exports.NeedChatInvalid = NeedChatInvalid;
class NeedMemberInvalid extends TelegramError {
}
exports.NeedMemberInvalid = NeedMemberInvalid;
class NewSaltInvalid extends TelegramError {
}
exports.NewSaltInvalid = NewSaltInvalid;
class NewSettingsEmpty extends TelegramError {
}
exports.NewSettingsEmpty = NewSettingsEmpty;
class NewSettingsInvalid extends TelegramError {
}
exports.NewSettingsInvalid = NewSettingsInvalid;
class NextOffsetInvalid extends TelegramError {
}
exports.NextOffsetInvalid = NextOffsetInvalid;
class NotAllowed extends TelegramError {
}
exports.NotAllowed = NotAllowed;
class OffsetInvalid extends TelegramError {
}
exports.OffsetInvalid = OffsetInvalid;
class OffsetPeerIdInvalid extends TelegramError {
}
exports.OffsetPeerIdInvalid = OffsetPeerIdInvalid;
class OptionsTooMuch extends TelegramError {
}
exports.OptionsTooMuch = OptionsTooMuch;
class OptionInvalid extends TelegramError {
}
exports.OptionInvalid = OptionInvalid;
class PackShortNameInvalid extends TelegramError {
}
exports.PackShortNameInvalid = PackShortNameInvalid;
class PackShortNameOccupied extends TelegramError {
}
exports.PackShortNameOccupied = PackShortNameOccupied;
class PackTitleInvalid extends TelegramError {
}
exports.PackTitleInvalid = PackTitleInvalid;
class ParticipantsTooFew extends TelegramError {
}
exports.ParticipantsTooFew = ParticipantsTooFew;
class ParticipantCallFailed extends TelegramError {
}
exports.ParticipantCallFailed = ParticipantCallFailed;
class ParticipantIdInvalid extends TelegramError {
}
exports.ParticipantIdInvalid = ParticipantIdInvalid;
class ParticipantJoinMissing extends TelegramError {
}
exports.ParticipantJoinMissing = ParticipantJoinMissing;
class ParticipantVersionOutdated extends TelegramError {
}
exports.ParticipantVersionOutdated = ParticipantVersionOutdated;
class PasswordEmpty extends TelegramError {
}
exports.PasswordEmpty = PasswordEmpty;
class PasswordHashInvalid extends TelegramError {
}
exports.PasswordHashInvalid = PasswordHashInvalid;
class PasswordMissing extends TelegramError {
}
exports.PasswordMissing = PasswordMissing;
class PasswordRecoveryExpired extends TelegramError {
}
exports.PasswordRecoveryExpired = PasswordRecoveryExpired;
class PasswordRecoveryNa extends TelegramError {
}
exports.PasswordRecoveryNa = PasswordRecoveryNa;
class PasswordRequired extends TelegramError {
}
exports.PasswordRequired = PasswordRequired;
class PaymentProviderInvalid extends TelegramError {
}
exports.PaymentProviderInvalid = PaymentProviderInvalid;
class PeerFlood extends TelegramError {
}
exports.PeerFlood = PeerFlood;
class PeerHistoryEmpty extends TelegramError {
}
exports.PeerHistoryEmpty = PeerHistoryEmpty;
class PeerIdInvalid extends TelegramError {
}
exports.PeerIdInvalid = PeerIdInvalid;
class PeerIdNotSupported extends TelegramError {
}
exports.PeerIdNotSupported = PeerIdNotSupported;
class PersistentTimestampEmpty extends TelegramError {
}
exports.PersistentTimestampEmpty = PersistentTimestampEmpty;
class PersistentTimestampInvalid extends TelegramError {
}
exports.PersistentTimestampInvalid = PersistentTimestampInvalid;
class PersistentTimestampOutdated extends TelegramError {
}
exports.PersistentTimestampOutdated = PersistentTimestampOutdated;
class PhoneCodeEmpty extends TelegramError {
}
exports.PhoneCodeEmpty = PhoneCodeEmpty;
class PhoneCodeExpired extends TelegramError {
}
exports.PhoneCodeExpired = PhoneCodeExpired;
class PhoneCodeHashEmpty extends TelegramError {
}
exports.PhoneCodeHashEmpty = PhoneCodeHashEmpty;
class PhoneCodeInvalid extends TelegramError {
}
exports.PhoneCodeInvalid = PhoneCodeInvalid;
class PhoneHashExpired extends TelegramError {
}
exports.PhoneHashExpired = PhoneHashExpired;
class PhoneNotOccupied extends TelegramError {
}
exports.PhoneNotOccupied = PhoneNotOccupied;
class PhoneNumberAppSignupForbidden extends TelegramError {
}
exports.PhoneNumberAppSignupForbidden = PhoneNumberAppSignupForbidden;
class PhoneNumberBanned extends TelegramError {
}
exports.PhoneNumberBanned = PhoneNumberBanned;
class PhoneNumberFlood extends TelegramError {
}
exports.PhoneNumberFlood = PhoneNumberFlood;
class PhoneNumberInvalid extends TelegramError {
}
exports.PhoneNumberInvalid = PhoneNumberInvalid;
class PhoneNumberOccupied extends TelegramError {
}
exports.PhoneNumberOccupied = PhoneNumberOccupied;
class PhoneNumberUnoccupied extends TelegramError {
}
exports.PhoneNumberUnoccupied = PhoneNumberUnoccupied;
class PhonePasswordFlood extends TelegramError {
}
exports.PhonePasswordFlood = PhonePasswordFlood;
class PhonePasswordProtected extends TelegramError {
}
exports.PhonePasswordProtected = PhonePasswordProtected;
class PhotoContentTypeInvalid extends TelegramError {
}
exports.PhotoContentTypeInvalid = PhotoContentTypeInvalid;
class PhotoContentUrlEmpty extends TelegramError {
}
exports.PhotoContentUrlEmpty = PhotoContentUrlEmpty;
class PhotoCropFileMissing extends TelegramError {
}
exports.PhotoCropFileMissing = PhotoCropFileMissing;
class PhotoCropSizeSmall extends TelegramError {
}
exports.PhotoCropSizeSmall = PhotoCropSizeSmall;
class PhotoExtInvalid extends TelegramError {
}
exports.PhotoExtInvalid = PhotoExtInvalid;
class PhotoFileMissing extends TelegramError {
}
exports.PhotoFileMissing = PhotoFileMissing;
class PhotoIdInvalid extends TelegramError {
}
exports.PhotoIdInvalid = PhotoIdInvalid;
class PhotoInvalid extends TelegramError {
}
exports.PhotoInvalid = PhotoInvalid;
class PhotoInvalidDimensions extends TelegramError {
}
exports.PhotoInvalidDimensions = PhotoInvalidDimensions;
class PhotoSaveFileInvalid extends TelegramError {
}
exports.PhotoSaveFileInvalid = PhotoSaveFileInvalid;
class PhotoThumbUrlEmpty extends TelegramError {
}
exports.PhotoThumbUrlEmpty = PhotoThumbUrlEmpty;
class PinnedDialogsTooMuch extends TelegramError {
}
exports.PinnedDialogsTooMuch = PinnedDialogsTooMuch;
class PinRestricted extends TelegramError {
}
exports.PinRestricted = PinRestricted;
class PollAnswersInvalid extends TelegramError {
}
exports.PollAnswersInvalid = PollAnswersInvalid;
class PollAnswerInvalid extends TelegramError {
}
exports.PollAnswerInvalid = PollAnswerInvalid;
class PollOptionDuplicate extends TelegramError {
}
exports.PollOptionDuplicate = PollOptionDuplicate;
class PollOptionInvalid extends TelegramError {
}
exports.PollOptionInvalid = PollOptionInvalid;
class PollQuestionInvalid extends TelegramError {
}
exports.PollQuestionInvalid = PollQuestionInvalid;
class PollUnsupported extends TelegramError {
}
exports.PollUnsupported = PollUnsupported;
class PollVoteRequired extends TelegramError {
}
exports.PollVoteRequired = PollVoteRequired;
class PostponedTimeout extends TelegramError {
}
exports.PostponedTimeout = PostponedTimeout;
class PremiumAccountRequired extends TelegramError {
}
exports.PremiumAccountRequired = PremiumAccountRequired;
class PremiumCurrentlyUnavailable extends TelegramError {
}
exports.PremiumCurrentlyUnavailable = PremiumCurrentlyUnavailable;
class PreviousChatImportActiveWaitXmin extends TelegramError {
}
exports.PreviousChatImportActiveWaitXmin = PreviousChatImportActiveWaitXmin;
class PrivacyKeyInvalid extends TelegramError {
}
exports.PrivacyKeyInvalid = PrivacyKeyInvalid;
class PrivacyTooLong extends TelegramError {
}
exports.PrivacyTooLong = PrivacyTooLong;
class PrivacyValueInvalid extends TelegramError {
}
exports.PrivacyValueInvalid = PrivacyValueInvalid;
class PtsChangeEmpty extends TelegramError {
}
exports.PtsChangeEmpty = PtsChangeEmpty;
class PublicChannelMissing extends TelegramError {
}
exports.PublicChannelMissing = PublicChannelMissing;
class PublicKeyRequired extends TelegramError {
}
exports.PublicKeyRequired = PublicKeyRequired;
class QueryIdEmpty extends TelegramError {
}
exports.QueryIdEmpty = QueryIdEmpty;
class QueryIdInvalid extends TelegramError {
}
exports.QueryIdInvalid = QueryIdInvalid;
class QueryTooShort extends TelegramError {
}
exports.QueryTooShort = QueryTooShort;
class QuizAnswerMissing extends TelegramError {
}
exports.QuizAnswerMissing = QuizAnswerMissing;
class QuizCorrectAnswersEmpty extends TelegramError {
}
exports.QuizCorrectAnswersEmpty = QuizCorrectAnswersEmpty;
class QuizCorrectAnswersTooMuch extends TelegramError {
}
exports.QuizCorrectAnswersTooMuch = QuizCorrectAnswersTooMuch;
class QuizCorrectAnswerInvalid extends TelegramError {
}
exports.QuizCorrectAnswerInvalid = QuizCorrectAnswerInvalid;
class QuizMultipleInvalid extends TelegramError {
}
exports.QuizMultipleInvalid = QuizMultipleInvalid;
class RandomIdDuplicate extends TelegramError {
}
exports.RandomIdDuplicate = RandomIdDuplicate;
class RandomIdEmpty extends TelegramError {
}
exports.RandomIdEmpty = RandomIdEmpty;
class RandomIdInvalid extends TelegramError {
}
exports.RandomIdInvalid = RandomIdInvalid;
class RandomLengthInvalid extends TelegramError {
}
exports.RandomLengthInvalid = RandomLengthInvalid;
class RangesInvalid extends TelegramError {
}
exports.RangesInvalid = RangesInvalid;
class ReactionsTooMany extends TelegramError {
}
exports.ReactionsTooMany = ReactionsTooMany;
class ReactionEmpty extends TelegramError {
}
exports.ReactionEmpty = ReactionEmpty;
class ReactionInvalid extends TelegramError {
}
exports.ReactionInvalid = ReactionInvalid;
class ReflectorNotAvailable extends TelegramError {
}
exports.ReflectorNotAvailable = ReflectorNotAvailable;
class RegIdGenerateFailed extends TelegramError {
}
exports.RegIdGenerateFailed = RegIdGenerateFailed;
class ReplyMarkupBuyEmpty extends TelegramError {
}
exports.ReplyMarkupBuyEmpty = ReplyMarkupBuyEmpty;
class ReplyMarkupGameEmpty extends TelegramError {
}
exports.ReplyMarkupGameEmpty = ReplyMarkupGameEmpty;
class ReplyMarkupInvalid extends TelegramError {
}
exports.ReplyMarkupInvalid = ReplyMarkupInvalid;
class ReplyMarkupTooLong extends TelegramError {
}
exports.ReplyMarkupTooLong = ReplyMarkupTooLong;
class ResetRequestMissing extends TelegramError {
}
exports.ResetRequestMissing = ResetRequestMissing;
class ResultsTooMuch extends TelegramError {
}
exports.ResultsTooMuch = ResultsTooMuch;
class ResultIdDuplicate extends TelegramError {
}
exports.ResultIdDuplicate = ResultIdDuplicate;
class ResultIdEmpty extends TelegramError {
}
exports.ResultIdEmpty = ResultIdEmpty;
class ResultIdInvalid extends TelegramError {
}
exports.ResultIdInvalid = ResultIdInvalid;
class ResultTypeInvalid extends TelegramError {
}
exports.ResultTypeInvalid = ResultTypeInvalid;
class RevoteNotAllowed extends TelegramError {
}
exports.RevoteNotAllowed = RevoteNotAllowed;
class RightsNotModified extends TelegramError {
}
exports.RightsNotModified = RightsNotModified;
class RightForbidden extends TelegramError {
}
exports.RightForbidden = RightForbidden;
class RpcCallFail extends TelegramError {
}
exports.RpcCallFail = RpcCallFail;
class RpcMcgetFail extends TelegramError {
}
exports.RpcMcgetFail = RpcMcgetFail;
class RsaDecryptFailed extends TelegramError {
}
exports.RsaDecryptFailed = RsaDecryptFailed;
class ScheduleBotNotAllowed extends TelegramError {
}
exports.ScheduleBotNotAllowed = ScheduleBotNotAllowed;
class ScheduleDateInvalid extends TelegramError {
}
exports.ScheduleDateInvalid = ScheduleDateInvalid;
class ScheduleDateTooLate extends TelegramError {
}
exports.ScheduleDateTooLate = ScheduleDateTooLate;
class ScheduleStatusPrivate extends TelegramError {
}
exports.ScheduleStatusPrivate = ScheduleStatusPrivate;
class ScheduleTooMuch extends TelegramError {
}
exports.ScheduleTooMuch = ScheduleTooMuch;
class ScoreInvalid extends TelegramError {
}
exports.ScoreInvalid = ScoreInvalid;
class SearchQueryEmpty extends TelegramError {
}
exports.SearchQueryEmpty = SearchQueryEmpty;
class SearchWithLinkNotSupported extends TelegramError {
}
exports.SearchWithLinkNotSupported = SearchWithLinkNotSupported;
class SecondsInvalid extends TelegramError {
}
exports.SecondsInvalid = SecondsInvalid;
class SendAsPeerInvalid extends TelegramError {
}
exports.SendAsPeerInvalid = SendAsPeerInvalid;
class SendCodeUnavailable extends TelegramError {
}
exports.SendCodeUnavailable = SendCodeUnavailable;
class SendMessageMediaInvalid extends TelegramError {
}
exports.SendMessageMediaInvalid = SendMessageMediaInvalid;
class SendMessageTypeInvalid extends TelegramError {
}
exports.SendMessageTypeInvalid = SendMessageTypeInvalid;
class SensitiveChangeForbidden extends TelegramError {
}
exports.SensitiveChangeForbidden = SensitiveChangeForbidden;
class SessionExpired extends TelegramError {
}
exports.SessionExpired = SessionExpired;
class SessionPasswordNeeded extends TelegramError {
}
exports.SessionPasswordNeeded = SessionPasswordNeeded;
class SessionRevoked extends TelegramError {
}
exports.SessionRevoked = SessionRevoked;
class SettingsInvalid extends TelegramError {
}
exports.SettingsInvalid = SettingsInvalid;
class Sha256HashInvalid extends TelegramError {
}
exports.Sha256HashInvalid = Sha256HashInvalid;
class ShortnameOccupyFailed extends TelegramError {
}
exports.ShortnameOccupyFailed = ShortnameOccupyFailed;
class ShortNameInvalid extends TelegramError {
}
exports.ShortNameInvalid = ShortNameInvalid;
class ShortNameOccupied extends TelegramError {
}
exports.ShortNameOccupied = ShortNameOccupied;
class SignInFailed extends TelegramError {
}
exports.SignInFailed = SignInFailed;
class SlowmodeMultiMsgsDisabled extends TelegramError {
}
exports.SlowmodeMultiMsgsDisabled = SlowmodeMultiMsgsDisabled;
class SmsCodeCreateFailed extends TelegramError {
}
exports.SmsCodeCreateFailed = SmsCodeCreateFailed;
class SrpIdInvalid extends TelegramError {
}
exports.SrpIdInvalid = SrpIdInvalid;
class SrpPasswordChanged extends TelegramError {
}
exports.SrpPasswordChanged = SrpPasswordChanged;
class StartParamEmpty extends TelegramError {
}
exports.StartParamEmpty = StartParamEmpty;
class StartParamInvalid extends TelegramError {
}
exports.StartParamInvalid = StartParamInvalid;
class StartParamTooLong extends TelegramError {
}
exports.StartParamTooLong = StartParamTooLong;
class StickerpackStickersTooMuch extends TelegramError {
}
exports.StickerpackStickersTooMuch = StickerpackStickersTooMuch;
class StickersetInvalid extends TelegramError {
}
exports.StickersetInvalid = StickersetInvalid;
class StickersetOwnerAnonymous extends TelegramError {
}
exports.StickersetOwnerAnonymous = StickersetOwnerAnonymous;
class StickersEmpty extends TelegramError {
}
exports.StickersEmpty = StickersEmpty;
class StickersTooMuch extends TelegramError {
}
exports.StickersTooMuch = StickersTooMuch;
class StickerDocumentInvalid extends TelegramError {
}
exports.StickerDocumentInvalid = StickerDocumentInvalid;
class StickerEmojiInvalid extends TelegramError {
}
exports.StickerEmojiInvalid = StickerEmojiInvalid;
class StickerFileInvalid extends TelegramError {
}
exports.StickerFileInvalid = StickerFileInvalid;
class StickerGifDimensions extends TelegramError {
}
exports.StickerGifDimensions = StickerGifDimensions;
class StickerIdInvalid extends TelegramError {
}
exports.StickerIdInvalid = StickerIdInvalid;
class StickerInvalid extends TelegramError {
}
exports.StickerInvalid = StickerInvalid;
class StickerMimeInvalid extends TelegramError {
}
exports.StickerMimeInvalid = StickerMimeInvalid;
class StickerPngDimensions extends TelegramError {
}
exports.StickerPngDimensions = StickerPngDimensions;
class StickerPngNopng extends TelegramError {
}
exports.StickerPngNopng = StickerPngNopng;
class StickerTgsNodoc extends TelegramError {
}
exports.StickerTgsNodoc = StickerTgsNodoc;
class StickerTgsNotgs extends TelegramError {
}
exports.StickerTgsNotgs = StickerTgsNotgs;
class StickerThumbPngNopng extends TelegramError {
}
exports.StickerThumbPngNopng = StickerThumbPngNopng;
class StickerThumbTgsNotgs extends TelegramError {
}
exports.StickerThumbTgsNotgs = StickerThumbTgsNotgs;
class StickerVideoBig extends TelegramError {
}
exports.StickerVideoBig = StickerVideoBig;
class StickerVideoNodoc extends TelegramError {
}
exports.StickerVideoNodoc = StickerVideoNodoc;
class StickerVideoNowebm extends TelegramError {
}
exports.StickerVideoNowebm = StickerVideoNowebm;
class StorageCheckFailed extends TelegramError {
}
exports.StorageCheckFailed = StorageCheckFailed;
class StoreInvalidScalarType extends TelegramError {
}
exports.StoreInvalidScalarType = StoreInvalidScalarType;
class SwitchPmTextEmpty extends TelegramError {
}
exports.SwitchPmTextEmpty = SwitchPmTextEmpty;
class TakeoutInvalid extends TelegramError {
}
exports.TakeoutInvalid = TakeoutInvalid;
class TakeoutRequired extends TelegramError {
}
exports.TakeoutRequired = TakeoutRequired;
class TempAuthKeyAlreadyBound extends TelegramError {
}
exports.TempAuthKeyAlreadyBound = TempAuthKeyAlreadyBound;
class TempAuthKeyEmpty extends TelegramError {
}
exports.TempAuthKeyEmpty = TempAuthKeyEmpty;
class ThemeFileInvalid extends TelegramError {
}
exports.ThemeFileInvalid = ThemeFileInvalid;
class ThemeFormatInvalid extends TelegramError {
}
exports.ThemeFormatInvalid = ThemeFormatInvalid;
class ThemeInvalid extends TelegramError {
}
exports.ThemeInvalid = ThemeInvalid;
class ThemeMimeInvalid extends TelegramError {
}
exports.ThemeMimeInvalid = ThemeMimeInvalid;
class ThemeTitleInvalid extends TelegramError {
}
exports.ThemeTitleInvalid = ThemeTitleInvalid;
class Timeout extends TelegramError {
}
exports.Timeout = Timeout;
class TimeTooBig extends TelegramError {
}
exports.TimeTooBig = TimeTooBig;
class TimeTooSmall extends TelegramError {
}
exports.TimeTooSmall = TimeTooSmall;
class TitleInvalid extends TelegramError {
}
exports.TitleInvalid = TitleInvalid;
class TmpPasswordDisabled extends TelegramError {
}
exports.TmpPasswordDisabled = TmpPasswordDisabled;
class TmpPasswordInvalid extends TelegramError {
}
exports.TmpPasswordInvalid = TmpPasswordInvalid;
class TokenInvalid extends TelegramError {
}
exports.TokenInvalid = TokenInvalid;
class TopicDeleted extends TelegramError {
}
exports.TopicDeleted = TopicDeleted;
class ToLangInvalid extends TelegramError {
}
exports.ToLangInvalid = ToLangInvalid;
class TtlDaysInvalid extends TelegramError {
}
exports.TtlDaysInvalid = TtlDaysInvalid;
class TtlMediaInvalid extends TelegramError {
}
exports.TtlMediaInvalid = TtlMediaInvalid;
class TtlPeriodInvalid extends TelegramError {
}
exports.TtlPeriodInvalid = TtlPeriodInvalid;
class TypesEmpty extends TelegramError {
}
exports.TypesEmpty = TypesEmpty;
class TypeConstructorInvalid extends TelegramError {
}
exports.TypeConstructorInvalid = TypeConstructorInvalid;
class Timedout extends TelegramError {
}
exports.Timedout = Timedout;
class UnknownError extends TelegramError {
}
exports.UnknownError = UnknownError;
class UnknownMethod extends TelegramError {
}
exports.UnknownMethod = UnknownMethod;
class UntilDateInvalid extends TelegramError {
}
exports.UntilDateInvalid = UntilDateInvalid;
class UpdateAppToLogin extends TelegramError {
}
exports.UpdateAppToLogin = UpdateAppToLogin;
class UrlInvalid extends TelegramError {
}
exports.UrlInvalid = UrlInvalid;
class UsageLimitInvalid extends TelegramError {
}
exports.UsageLimitInvalid = UsageLimitInvalid;
class UsernameInvalid extends TelegramError {
}
exports.UsernameInvalid = UsernameInvalid;
class UsernameNotModified extends TelegramError {
}
exports.UsernameNotModified = UsernameNotModified;
class UsernameNotOccupied extends TelegramError {
}
exports.UsernameNotOccupied = UsernameNotOccupied;
class UsernameOccupied extends TelegramError {
}
exports.UsernameOccupied = UsernameOccupied;
class UsernamePurchaseAvailable extends TelegramError {
}
exports.UsernamePurchaseAvailable = UsernamePurchaseAvailable;
class UserpicPrivacyRequired extends TelegramError {
}
exports.UserpicPrivacyRequired = UserpicPrivacyRequired;
class UserpicUploadRequired extends TelegramError {
}
exports.UserpicUploadRequired = UserpicUploadRequired;
class UsersTooFew extends TelegramError {
}
exports.UsersTooFew = UsersTooFew;
class UsersTooMuch extends TelegramError {
}
exports.UsersTooMuch = UsersTooMuch;
class UserAdminInvalid extends TelegramError {
}
exports.UserAdminInvalid = UserAdminInvalid;
class UserAlreadyInvited extends TelegramError {
}
exports.UserAlreadyInvited = UserAlreadyInvited;
class UserAlreadyParticipant extends TelegramError {
}
exports.UserAlreadyParticipant = UserAlreadyParticipant;
class UserBannedInChannel extends TelegramError {
}
exports.UserBannedInChannel = UserBannedInChannel;
class UserBlocked extends TelegramError {
}
exports.UserBlocked = UserBlocked;
class UserBot extends TelegramError {
}
exports.UserBot = UserBot;
class UserBotInvalid extends TelegramError {
}
exports.UserBotInvalid = UserBotInvalid;
class UserBotRequired extends TelegramError {
}
exports.UserBotRequired = UserBotRequired;
class UserChannelsTooMuch extends TelegramError {
}
exports.UserChannelsTooMuch = UserChannelsTooMuch;
class UserCreator extends TelegramError {
}
exports.UserCreator = UserCreator;
class UserDeactivated extends TelegramError {
}
exports.UserDeactivated = UserDeactivated;
class UserDeactivatedBan extends TelegramError {
}
exports.UserDeactivatedBan = UserDeactivatedBan;
class UserDeleted extends TelegramError {
}
exports.UserDeleted = UserDeleted;
class UserIdInvalid extends TelegramError {
}
exports.UserIdInvalid = UserIdInvalid;
class UserInvalid extends TelegramError {
}
exports.UserInvalid = UserInvalid;
class UserIsBlocked extends TelegramError {
}
exports.UserIsBlocked = UserIsBlocked;
class UserIsBot extends TelegramError {
}
exports.UserIsBot = UserIsBot;
class UserKicked extends TelegramError {
}
exports.UserKicked = UserKicked;
class UserNotMutualContact extends TelegramError {
}
exports.UserNotMutualContact = UserNotMutualContact;
class UserNotParticipant extends TelegramError {
}
exports.UserNotParticipant = UserNotParticipant;
class UserPrivacyRestricted extends TelegramError {
}
exports.UserPrivacyRestricted = UserPrivacyRestricted;
class UserRestricted extends TelegramError {
}
exports.UserRestricted = UserRestricted;
class UserVolumeInvalid extends TelegramError {
}
exports.UserVolumeInvalid = UserVolumeInvalid;
class VideoContentTypeInvalid extends TelegramError {
}
exports.VideoContentTypeInvalid = VideoContentTypeInvalid;
class VideoFileInvalid extends TelegramError {
}
exports.VideoFileInvalid = VideoFileInvalid;
class VideoTitleEmpty extends TelegramError {
}
exports.VideoTitleEmpty = VideoTitleEmpty;
class VoiceMessagesForbidden extends TelegramError {
}
exports.VoiceMessagesForbidden = VoiceMessagesForbidden;
class WallpaperFileInvalid extends TelegramError {
}
exports.WallpaperFileInvalid = WallpaperFileInvalid;
class WallpaperInvalid extends TelegramError {
}
exports.WallpaperInvalid = WallpaperInvalid;
class WallpaperMimeInvalid extends TelegramError {
}
exports.WallpaperMimeInvalid = WallpaperMimeInvalid;
class WcConvertUrlInvalid extends TelegramError {
}
exports.WcConvertUrlInvalid = WcConvertUrlInvalid;
class WebdocumentInvalid extends TelegramError {
}
exports.WebdocumentInvalid = WebdocumentInvalid;
class WebdocumentMimeInvalid extends TelegramError {
}
exports.WebdocumentMimeInvalid = WebdocumentMimeInvalid;
class WebdocumentSizeTooBig extends TelegramError {
}
exports.WebdocumentSizeTooBig = WebdocumentSizeTooBig;
class WebdocumentUrlInvalid extends TelegramError {
}
exports.WebdocumentUrlInvalid = WebdocumentUrlInvalid;
class WebpageCurlFailed extends TelegramError {
}
exports.WebpageCurlFailed = WebpageCurlFailed;
class WebpageMediaEmpty extends TelegramError {
}
exports.WebpageMediaEmpty = WebpageMediaEmpty;
class WebpushAuthInvalid extends TelegramError {
}
exports.WebpushAuthInvalid = WebpushAuthInvalid;
class WebpushKeyInvalid extends TelegramError {
}
exports.WebpushKeyInvalid = WebpushKeyInvalid;
class WebpushTokenInvalid extends TelegramError {
}
exports.WebpushTokenInvalid = WebpushTokenInvalid;
class WorkerBusyTooLongRetry extends TelegramError {
}
exports.WorkerBusyTooLongRetry = WorkerBusyTooLongRetry;
class YouBlockedUser extends TelegramError {
}
exports.YouBlockedUser = YouBlockedUser;
exports.map = {
    ABOUT_TOO_LONG: AboutTooLong,
    ACCESS_TOKEN_EXPIRED: AccessTokenExpired,
    ACCESS_TOKEN_INVALID: AccessTokenInvalid,
    ACTIVE_USER_REQUIRED: ActiveUserRequired,
    ADMINS_TOO_MUCH: AdminsTooMuch,
    ADMIN_ID_INVALID: AdminIdInvalid,
    ADMIN_RANK_EMOJI_NOT_ALLOWED: AdminRankEmojiNotAllowed,
    ADMIN_RANK_INVALID: AdminRankInvalid,
    ALBUM_PHOTOS_TOO_MANY: AlbumPhotosTooMany,
    API_ID_INVALID: ApiIdInvalid,
    API_ID_PUBLISHED_FLOOD: ApiIdPublishedFlood,
    ARTICLE_TITLE_EMPTY: ArticleTitleEmpty,
    AUDIO_CONTENT_URL_EMPTY: AudioContentUrlEmpty,
    AUDIO_TITLE_EMPTY: AudioTitleEmpty,
    AUTH_BYTES_INVALID: AuthBytesInvalid,
    AUTH_KEY_DUPLICATED: AuthKeyDuplicated,
    AUTH_KEY_INVALID: AuthKeyInvalid,
    AUTH_KEY_PERM_EMPTY: AuthKeyPermEmpty,
    AUTH_KEY_UNREGISTERED: AuthKeyUnregistered,
    AUTH_RESTART: AuthRestart,
    AUTH_TOKEN_ALREADY_ACCEPTED: AuthTokenAlreadyAccepted,
    AUTH_TOKEN_EXCEPTION: AuthTokenException,
    AUTH_TOKEN_EXPIRED: AuthTokenExpired,
    AUTH_TOKEN_INVALID: AuthTokenInvalid,
    AUTOARCHIVE_NOT_AVAILABLE: AutoarchiveNotAvailable,
    BANK_CARD_NUMBER_INVALID: BankCardNumberInvalid,
    BANNED_RIGHTS_INVALID: BannedRightsInvalid,
    BASE_PORT_LOC_INVALID: BasePortLocInvalid,
    BOTS_TOO_MUCH: BotsTooMuch,
    BOT_CHANNELS_NA: BotChannelsNa,
    BOT_COMMAND_DESCRIPTION_INVALID: BotCommandDescriptionInvalid,
    BOT_COMMAND_INVALID: BotCommandInvalid,
    BOT_DOMAIN_INVALID: BotDomainInvalid,
    BOT_GAMES_DISABLED: BotGamesDisabled,
    BOT_GROUPS_BLOCKED: BotGroupsBlocked,
    BOT_INLINE_DISABLED: BotInlineDisabled,
    BOT_INVALID: BotInvalid,
    BOT_METHOD_INVALID: BotMethodInvalid,
    BOT_MISSING: BotMissing,
    BOT_ONESIDE_NOT_AVAIL: BotOnesideNotAvail,
    BOT_PAYMENTS_DISABLED: BotPaymentsDisabled,
    BOT_POLLS_DISABLED: BotPollsDisabled,
    BOT_RESPONSE_TIMEOUT: BotResponseTimeout,
    BOT_SCORE_NOT_MODIFIED: BotScoreNotModified,
    BROADCAST_CALLS_DISABLED: BroadcastCallsDisabled,
    BROADCAST_FORBIDDEN: BroadcastForbidden,
    BROADCAST_ID_INVALID: BroadcastIdInvalid,
    BROADCAST_PUBLIC_VOTERS_FORBIDDEN: BroadcastPublicVotersForbidden,
    BROADCAST_REQUIRED: BroadcastRequired,
    BUTTON_DATA_INVALID: ButtonDataInvalid,
    BUTTON_TEXT_INVALID: ButtonTextInvalid,
    BUTTON_TYPE_INVALID: ButtonTypeInvalid,
    BUTTON_URL_INVALID: ButtonUrlInvalid,
    BUTTON_USER_PRIVACY_RESTRICTED: ButtonUserPrivacyRestricted,
    CALL_ALREADY_ACCEPTED: CallAlreadyAccepted,
    CALL_ALREADY_DECLINED: CallAlreadyDeclined,
    CALL_OCCUPY_FAILED: CallOccupyFailed,
    CALL_PEER_INVALID: CallPeerInvalid,
    CALL_PROTOCOL_FLAGS_INVALID: CallProtocolFlagsInvalid,
    CDN_METHOD_INVALID: CdnMethodInvalid,
    CDN_UPLOAD_TIMEOUT: CdnUploadTimeout,
    CHANNELS_ADMIN_LOCATED_TOO_MUCH: ChannelsAdminLocatedTooMuch,
    CHANNELS_ADMIN_PUBLIC_TOO_MUCH: ChannelsAdminPublicTooMuch,
    CHANNELS_TOO_MUCH: ChannelsTooMuch,
    CHANNEL_BANNED: ChannelBanned,
    CHANNEL_FORUM_MISSING: ChannelForumMissing,
    CHANNEL_ID_INVALID: ChannelIdInvalid,
    CHANNEL_INVALID: ChannelInvalid,
    CHANNEL_PARICIPANT_MISSING: ChannelParicipantMissing,
    CHANNEL_PRIVATE: ChannelPrivate,
    CHANNEL_PUBLIC_GROUP_NA: ChannelPublicGroupNa,
    CHANNEL_TOO_BIG: ChannelTooBig,
    CHANNEL_TOO_LARGE: ChannelTooLarge,
    CHAT_ABOUT_NOT_MODIFIED: ChatAboutNotModified,
    CHAT_ABOUT_TOO_LONG: ChatAboutTooLong,
    CHAT_ADMIN_INVITE_REQUIRED: ChatAdminInviteRequired,
    CHAT_ADMIN_REQUIRED: ChatAdminRequired,
    CHAT_DISCUSSION_UNALLOWED: ChatDiscussionUnallowed,
    CHAT_FORBIDDEN: ChatForbidden,
    CHAT_FORWARDS_RESTRICTED: ChatForwardsRestricted,
    CHAT_GET_FAILED: ChatGetFailed,
    CHAT_GUEST_SEND_FORBIDDEN: ChatGuestSendForbidden,
    CHAT_ID_EMPTY: ChatIdEmpty,
    CHAT_ID_GENERATE_FAILED: ChatIdGenerateFailed,
    CHAT_ID_INVALID: ChatIdInvalid,
    CHAT_INVALID: ChatInvalid,
    CHAT_INVITE_PERMANENT: ChatInvitePermanent,
    CHAT_LINK_EXISTS: ChatLinkExists,
    CHAT_NOT_MODIFIED: ChatNotModified,
    CHAT_RESTRICTED: ChatRestricted,
    CHAT_REVOKE_DATE_UNSUPPORTED: ChatRevokeDateUnsupported,
    CHAT_SEND_GAME_FORBIDDEN: ChatSendGameForbidden,
    CHAT_SEND_GIFS_FORBIDDEN: ChatSendGifsForbidden,
    CHAT_SEND_INLINE_FORBIDDEN: ChatSendInlineForbidden,
    CHAT_SEND_MEDIA_FORBIDDEN: ChatSendMediaForbidden,
    CHAT_SEND_POLL_FORBIDDEN: ChatSendPollForbidden,
    CHAT_SEND_STICKERS_FORBIDDEN: ChatSendStickersForbidden,
    CHAT_TITLE_EMPTY: ChatTitleEmpty,
    CHAT_TOO_BIG: ChatTooBig,
    CHAT_WRITE_FORBIDDEN: ChatWriteForbidden,
    CHP_CALL_FAIL: ChpCallFail,
    CODE_EMPTY: CodeEmpty,
    CODE_HASH_INVALID: CodeHashInvalid,
    CODE_INVALID: CodeInvalid,
    CONNECTION_API_ID_INVALID: ConnectionApiIdInvalid,
    CONNECTION_APP_VERSION_EMPTY: ConnectionAppVersionEmpty,
    CONNECTION_DEVICE_MODEL_EMPTY: ConnectionDeviceModelEmpty,
    CONNECTION_LANG_PACK_INVALID: ConnectionLangPackInvalid,
    CONNECTION_LAYER_INVALID: ConnectionLayerInvalid,
    CONNECTION_NOT_INITED: ConnectionNotInited,
    CONNECTION_SYSTEM_EMPTY: ConnectionSystemEmpty,
    CONNECTION_SYSTEM_LANG_CODE_EMPTY: ConnectionSystemLangCodeEmpty,
    CONTACT_ADD_MISSING: ContactAddMissing,
    CONTACT_ID_INVALID: ContactIdInvalid,
    CONTACT_NAME_EMPTY: ContactNameEmpty,
    CONTACT_REQ_MISSING: ContactReqMissing,
    CREATE_CALL_FAILED: CreateCallFailed,
    CURRENCY_TOTAL_AMOUNT_INVALID: CurrencyTotalAmountInvalid,
    DATA_INVALID: DataInvalid,
    DATA_JSON_INVALID: DataJsonInvalid,
    DATA_TOO_LONG: DataTooLong,
    DATE_EMPTY: DateEmpty,
    DC_ID_INVALID: DcIdInvalid,
    DH_G_A_INVALID: DhGAInvalid,
    DOCUMENT_INVALID: DocumentInvalid,
    EDIT_BOT_INVITE_FORBIDDEN: EditBotInviteForbidden,
    EMAIL_HASH_EXPIRED: EmailHashExpired,
    EMAIL_INVALID: EmailInvalid,
    EMAIL_UNCONFIRMED: EmailUnconfirmed,
    EMAIL_VERIFY_EXPIRED: EmailVerifyExpired,
    EMOJI_INVALID: EmojiInvalid,
    EMOJI_NOT_MODIFIED: EmojiNotModified,
    EMOTICON_EMPTY: EmoticonEmpty,
    EMOTICON_INVALID: EmoticonInvalid,
    EMOTICON_STICKERPACK_MISSING: EmoticonStickerpackMissing,
    ENCRYPTED_MESSAGE_INVALID: EncryptedMessageInvalid,
    ENCRYPTION_ALREADY_ACCEPTED: EncryptionAlreadyAccepted,
    ENCRYPTION_ALREADY_DECLINED: EncryptionAlreadyDeclined,
    ENCRYPTION_DECLINED: EncryptionDeclined,
    ENCRYPTION_ID_INVALID: EncryptionIdInvalid,
    ENCRYPTION_OCCUPY_FAILED: EncryptionOccupyFailed,
    ENTITIES_TOO_LONG: EntitiesTooLong,
    ENTITY_BOUNDS_INVALID: EntityBoundsInvalid,
    ENTITY_MENTION_USER_INVALID: EntityMentionUserInvalid,
    ERROR_TEXT_EMPTY: ErrorTextEmpty,
    EXPIRE_DATE_INVALID: ExpireDateInvalid,
    EXPIRE_FORBIDDEN: ExpireForbidden,
    EXPORT_CARD_INVALID: ExportCardInvalid,
    EXTERNAL_URL_INVALID: ExternalUrlInvalid,
    FIELD_NAME_EMPTY: FieldNameEmpty,
    FIELD_NAME_INVALID: FieldNameInvalid,
    FILEREF_UPGRADE_NEEDED: FilerefUpgradeNeeded,
    FILE_CONTENT_TYPE_INVALID: FileContentTypeInvalid,
    FILE_EMTPY: FileEmtpy,
    FILE_ID_INVALID: FileIdInvalid,
    FILE_PARTS_INVALID: FilePartsInvalid,
    FILE_PART_0_MISSING: FilePart_0Missing,
    FILE_PART_EMPTY: FilePartEmpty,
    FILE_PART_INVALID: FilePartInvalid,
    FILE_PART_LENGTH_INVALID: FilePartLengthInvalid,
    FILE_PART_SIZE_CHANGED: FilePartSizeChanged,
    FILE_PART_SIZE_INVALID: FilePartSizeInvalid,
    FILE_PART_TOO_BIG: FilePartTooBig,
    FILE_PART_X_MISSING: FilePartXMissing,
    FILE_REFERENCE_EMPTY: FileReferenceEmpty,
    FILE_REFERENCE_EXPIRED: FileReferenceExpired,
    FILE_REFERENCE_INVALID: FileReferenceInvalid,
    FILE_TITLE_EMPTY: FileTitleEmpty,
    FILTER_ID_INVALID: FilterIdInvalid,
    FILTER_INCLUDE_EMPTY: FilterIncludeEmpty,
    FILTER_NOT_SUPPORTED: FilterNotSupported,
    FILTER_TITLE_EMPTY: FilterTitleEmpty,
    FIRSTNAME_INVALID: FirstnameInvalid,
    FOLDER_ID_EMPTY: FolderIdEmpty,
    FOLDER_ID_INVALID: FolderIdInvalid,
    FRESH_CHANGE_ADMINS_FORBIDDEN: FreshChangeAdminsForbidden,
    FRESH_CHANGE_PHONE_FORBIDDEN: FreshChangePhoneForbidden,
    FRESH_RESET_AUTHORISATION_FORBIDDEN: FreshResetAuthorisationForbidden,
    FROM_MESSAGE_BOT_DISABLED: FromMessageBotDisabled,
    FROM_PEER_INVALID: FromPeerInvalid,
    GAME_BOT_INVALID: GameBotInvalid,
    GEO_POINT_INVALID: GeoPointInvalid,
    GIF_CONTENT_TYPE_INVALID: GifContentTypeInvalid,
    GIF_ID_INVALID: GifIdInvalid,
    GRAPH_EXPIRED_RELOAD: GraphExpiredReload,
    GRAPH_INVALID_RELOAD: GraphInvalidReload,
    GRAPH_OUTDATED_RELOAD: GraphOutdatedReload,
    GROUPCALL_ADD_PARTICIPANTS_FAILED: GroupcallAddParticipantsFailed,
    GROUPCALL_ALREADY_DISCARDED: GroupcallAlreadyDiscarded,
    GROUPCALL_ALREADY_STARTED: GroupcallAlreadyStarted,
    GROUPCALL_FORBIDDEN: GroupcallForbidden,
    GROUPCALL_INVALID: GroupcallInvalid,
    GROUPCALL_JOIN_MISSING: GroupcallJoinMissing,
    GROUPCALL_NOT_MODIFIED: GroupcallNotModified,
    GROUPCALL_SSRC_DUPLICATE_MUCH: GroupcallSsrcDuplicateMuch,
    GROUPED_MEDIA_INVALID: GroupedMediaInvalid,
    GROUP_CALL_INVALID: GroupCallInvalid,
    HASH_INVALID: HashInvalid,
    HIDE_REQUESTER_MISSING: HideRequesterMissing,
    HISTORY_GET_FAILED: HistoryGetFailed,
    IMAGE_PROCESS_FAILED: ImageProcessFailed,
    IMPORT_FILE_INVALID: ImportFileInvalid,
    IMPORT_FORMAT_UNRECOGNIZED: ImportFormatUnrecognized,
    IMPORT_ID_INVALID: ImportIdInvalid,
    INLINE_BOT_REQUIRED: InlineBotRequired,
    INLINE_RESULT_EXPIRED: InlineResultExpired,
    INPUT_CONSTRUCTOR_INVALID: InputConstructorInvalid,
    INPUT_FETCH_ERROR: InputFetchError,
    INPUT_FETCH_FAIL: InputFetchFail,
    INPUT_FILTER_INVALID: InputFilterInvalid,
    INPUT_LAYER_INVALID: InputLayerInvalid,
    INPUT_METHOD_INVALID: InputMethodInvalid,
    INPUT_REQUEST_TOO_LONG: InputRequestTooLong,
    INPUT_TEXT_EMPTY: InputTextEmpty,
    INPUT_USER_DEACTIVATED: InputUserDeactivated,
    INTERDC_X_CALL_ERROR: InterdcXCallError,
    INTERDC_X_CALL_RICH_ERROR: InterdcXCallRichError,
    INVITE_FORBIDDEN_WITH_JOINAS: InviteForbiddenWithJoinas,
    INVITE_HASH_EMPTY: InviteHashEmpty,
    INVITE_HASH_EXPIRED: InviteHashExpired,
    INVITE_HASH_INVALID: InviteHashInvalid,
    INVITE_REQUEST_SENT: InviteRequestSent,
    INVITE_REVOKED_MISSING: InviteRevokedMissing,
    INVOICE_PAYLOAD_INVALID: InvoicePayloadInvalid,
    JOIN_AS_PEER_INVALID: JoinAsPeerInvalid,
    LANG_CODE_INVALID: LangCodeInvalid,
    LANG_CODE_NOT_SUPPORTED: LangCodeNotSupported,
    LANG_PACK_INVALID: LangPackInvalid,
    LASTNAME_INVALID: LastnameInvalid,
    LIMIT_INVALID: LimitInvalid,
    LINK_NOT_MODIFIED: LinkNotModified,
    LOCATION_INVALID: LocationInvalid,
    MAX_DATE_INVALID: MaxDateInvalid,
    MAX_ID_INVALID: MaxIdInvalid,
    MAX_QTS_INVALID: MaxQtsInvalid,
    MD5_CHECKSUM_INVALID: Md5ChecksumInvalid,
    MEDIA_CAPTION_TOO_LONG: MediaCaptionTooLong,
    MEDIA_EMPTY: MediaEmpty,
    MEDIA_GROUPED_INVALID: MediaGroupedInvalid,
    MEDIA_INVALID: MediaInvalid,
    MEDIA_NEW_INVALID: MediaNewInvalid,
    MEDIA_PREV_INVALID: MediaPrevInvalid,
    MEDIA_TTL_INVALID: MediaTtlInvalid,
    MEGAGROUP_ID_INVALID: MegagroupIdInvalid,
    MEGAGROUP_PREHISTORY_HIDDEN: MegagroupPrehistoryHidden,
    MEGAGROUP_REQUIRED: MegagroupRequired,
    MEMBER_NO_LOCATION: MemberNoLocation,
    MEMBER_OCCUPY_PRIMARY_LOC_FAILED: MemberOccupyPrimaryLocFailed,
    MESSAGE_AUTHOR_REQUIRED: MessageAuthorRequired,
    MESSAGE_DELETE_FORBIDDEN: MessageDeleteForbidden,
    MESSAGE_EDIT_TIME_EXPIRED: MessageEditTimeExpired,
    MESSAGE_EMPTY: MessageEmpty,
    MESSAGE_IDS_EMPTY: MessageIdsEmpty,
    MESSAGE_ID_INVALID: MessageIdInvalid,
    MESSAGE_NOT_MODIFIED: MessageNotModified,
    MESSAGE_POLL_CLOSED: MessagePollClosed,
    MESSAGE_TOO_LONG: MessageTooLong,
    METHOD_INVALID: MethodInvalid,
    MIN_DATE_INVALID: MinDateInvalid,
    MSGID_DECREASE_RETRY: MsgidDecreaseRetry,
    MSG_ID_INVALID: MsgIdInvalid,
    MSG_TOO_OLD: MsgTooOld,
    MSG_WAIT_FAILED: MsgWaitFailed,
    MT_SEND_QUEUE_TOO_LONG: MtSendQueueTooLong,
    MULTI_MEDIA_TOO_LONG: MultiMediaTooLong,
    NEED_CHAT_INVALID: NeedChatInvalid,
    NEED_MEMBER_INVALID: NeedMemberInvalid,
    NEW_SALT_INVALID: NewSaltInvalid,
    NEW_SETTINGS_EMPTY: NewSettingsEmpty,
    NEW_SETTINGS_INVALID: NewSettingsInvalid,
    NEXT_OFFSET_INVALID: NextOffsetInvalid,
    NOT_ALLOWED: NotAllowed,
    OFFSET_INVALID: OffsetInvalid,
    OFFSET_PEER_ID_INVALID: OffsetPeerIdInvalid,
    OPTIONS_TOO_MUCH: OptionsTooMuch,
    OPTION_INVALID: OptionInvalid,
    PACK_SHORT_NAME_INVALID: PackShortNameInvalid,
    PACK_SHORT_NAME_OCCUPIED: PackShortNameOccupied,
    PACK_TITLE_INVALID: PackTitleInvalid,
    PARTICIPANTS_TOO_FEW: ParticipantsTooFew,
    PARTICIPANT_CALL_FAILED: ParticipantCallFailed,
    PARTICIPANT_ID_INVALID: ParticipantIdInvalid,
    PARTICIPANT_JOIN_MISSING: ParticipantJoinMissing,
    PARTICIPANT_VERSION_OUTDATED: ParticipantVersionOutdated,
    PASSWORD_EMPTY: PasswordEmpty,
    PASSWORD_HASH_INVALID: PasswordHashInvalid,
    PASSWORD_MISSING: PasswordMissing,
    PASSWORD_RECOVERY_EXPIRED: PasswordRecoveryExpired,
    PASSWORD_RECOVERY_NA: PasswordRecoveryNa,
    PASSWORD_REQUIRED: PasswordRequired,
    PAYMENT_PROVIDER_INVALID: PaymentProviderInvalid,
    PEER_FLOOD: PeerFlood,
    PEER_HISTORY_EMPTY: PeerHistoryEmpty,
    PEER_ID_INVALID: PeerIdInvalid,
    PEER_ID_NOT_SUPPORTED: PeerIdNotSupported,
    PERSISTENT_TIMESTAMP_EMPTY: PersistentTimestampEmpty,
    PERSISTENT_TIMESTAMP_INVALID: PersistentTimestampInvalid,
    PERSISTENT_TIMESTAMP_OUTDATED: PersistentTimestampOutdated,
    PHONE_CODE_EMPTY: PhoneCodeEmpty,
    PHONE_CODE_EXPIRED: PhoneCodeExpired,
    PHONE_CODE_HASH_EMPTY: PhoneCodeHashEmpty,
    PHONE_CODE_INVALID: PhoneCodeInvalid,
    PHONE_HASH_EXPIRED: PhoneHashExpired,
    PHONE_NOT_OCCUPIED: PhoneNotOccupied,
    PHONE_NUMBER_APP_SIGNUP_FORBIDDEN: PhoneNumberAppSignupForbidden,
    PHONE_NUMBER_BANNED: PhoneNumberBanned,
    PHONE_NUMBER_FLOOD: PhoneNumberFlood,
    PHONE_NUMBER_INVALID: PhoneNumberInvalid,
    PHONE_NUMBER_OCCUPIED: PhoneNumberOccupied,
    PHONE_NUMBER_UNOCCUPIED: PhoneNumberUnoccupied,
    PHONE_PASSWORD_FLOOD: PhonePasswordFlood,
    PHONE_PASSWORD_PROTECTED: PhonePasswordProtected,
    PHOTO_CONTENT_TYPE_INVALID: PhotoContentTypeInvalid,
    PHOTO_CONTENT_URL_EMPTY: PhotoContentUrlEmpty,
    PHOTO_CROP_FILE_MISSING: PhotoCropFileMissing,
    PHOTO_CROP_SIZE_SMALL: PhotoCropSizeSmall,
    PHOTO_EXT_INVALID: PhotoExtInvalid,
    PHOTO_FILE_MISSING: PhotoFileMissing,
    PHOTO_ID_INVALID: PhotoIdInvalid,
    PHOTO_INVALID: PhotoInvalid,
    PHOTO_INVALID_DIMENSIONS: PhotoInvalidDimensions,
    PHOTO_SAVE_FILE_INVALID: PhotoSaveFileInvalid,
    PHOTO_THUMB_URL_EMPTY: PhotoThumbUrlEmpty,
    PINNED_DIALOGS_TOO_MUCH: PinnedDialogsTooMuch,
    PIN_RESTRICTED: PinRestricted,
    POLL_ANSWERS_INVALID: PollAnswersInvalid,
    POLL_ANSWER_INVALID: PollAnswerInvalid,
    POLL_OPTION_DUPLICATE: PollOptionDuplicate,
    POLL_OPTION_INVALID: PollOptionInvalid,
    POLL_QUESTION_INVALID: PollQuestionInvalid,
    POLL_UNSUPPORTED: PollUnsupported,
    POLL_VOTE_REQUIRED: PollVoteRequired,
    POSTPONED_TIMEOUT: PostponedTimeout,
    PREMIUM_ACCOUNT_REQUIRED: PremiumAccountRequired,
    PREMIUM_CURRENTLY_UNAVAILABLE: PremiumCurrentlyUnavailable,
    PREVIOUS_CHAT_IMPORT_ACTIVE_WAIT_XMIN: PreviousChatImportActiveWaitXmin,
    PRIVACY_KEY_INVALID: PrivacyKeyInvalid,
    PRIVACY_TOO_LONG: PrivacyTooLong,
    PRIVACY_VALUE_INVALID: PrivacyValueInvalid,
    PTS_CHANGE_EMPTY: PtsChangeEmpty,
    PUBLIC_CHANNEL_MISSING: PublicChannelMissing,
    PUBLIC_KEY_REQUIRED: PublicKeyRequired,
    QUERY_ID_EMPTY: QueryIdEmpty,
    QUERY_ID_INVALID: QueryIdInvalid,
    QUERY_TOO_SHORT: QueryTooShort,
    QUIZ_ANSWER_MISSING: QuizAnswerMissing,
    QUIZ_CORRECT_ANSWERS_EMPTY: QuizCorrectAnswersEmpty,
    QUIZ_CORRECT_ANSWERS_TOO_MUCH: QuizCorrectAnswersTooMuch,
    QUIZ_CORRECT_ANSWER_INVALID: QuizCorrectAnswerInvalid,
    QUIZ_MULTIPLE_INVALID: QuizMultipleInvalid,
    RANDOM_ID_DUPLICATE: RandomIdDuplicate,
    RANDOM_ID_EMPTY: RandomIdEmpty,
    RANDOM_ID_INVALID: RandomIdInvalid,
    RANDOM_LENGTH_INVALID: RandomLengthInvalid,
    RANGES_INVALID: RangesInvalid,
    REACTIONS_TOO_MANY: ReactionsTooMany,
    REACTION_EMPTY: ReactionEmpty,
    REACTION_INVALID: ReactionInvalid,
    REFLECTOR_NOT_AVAILABLE: ReflectorNotAvailable,
    REG_ID_GENERATE_FAILED: RegIdGenerateFailed,
    REPLY_MARKUP_BUY_EMPTY: ReplyMarkupBuyEmpty,
    REPLY_MARKUP_GAME_EMPTY: ReplyMarkupGameEmpty,
    REPLY_MARKUP_INVALID: ReplyMarkupInvalid,
    REPLY_MARKUP_TOO_LONG: ReplyMarkupTooLong,
    RESET_REQUEST_MISSING: ResetRequestMissing,
    RESULTS_TOO_MUCH: ResultsTooMuch,
    RESULT_ID_DUPLICATE: ResultIdDuplicate,
    RESULT_ID_EMPTY: ResultIdEmpty,
    RESULT_ID_INVALID: ResultIdInvalid,
    RESULT_TYPE_INVALID: ResultTypeInvalid,
    REVOTE_NOT_ALLOWED: RevoteNotAllowed,
    RIGHTS_NOT_MODIFIED: RightsNotModified,
    RIGHT_FORBIDDEN: RightForbidden,
    RPC_CALL_FAIL: RpcCallFail,
    RPC_MCGET_FAIL: RpcMcgetFail,
    RSA_DECRYPT_FAILED: RsaDecryptFailed,
    SCHEDULE_BOT_NOT_ALLOWED: ScheduleBotNotAllowed,
    SCHEDULE_DATE_INVALID: ScheduleDateInvalid,
    SCHEDULE_DATE_TOO_LATE: ScheduleDateTooLate,
    SCHEDULE_STATUS_PRIVATE: ScheduleStatusPrivate,
    SCHEDULE_TOO_MUCH: ScheduleTooMuch,
    SCORE_INVALID: ScoreInvalid,
    SEARCH_QUERY_EMPTY: SearchQueryEmpty,
    SEARCH_WITH_LINK_NOT_SUPPORTED: SearchWithLinkNotSupported,
    SECONDS_INVALID: SecondsInvalid,
    SEND_AS_PEER_INVALID: SendAsPeerInvalid,
    SEND_CODE_UNAVAILABLE: SendCodeUnavailable,
    SEND_MESSAGE_MEDIA_INVALID: SendMessageMediaInvalid,
    SEND_MESSAGE_TYPE_INVALID: SendMessageTypeInvalid,
    SENSITIVE_CHANGE_FORBIDDEN: SensitiveChangeForbidden,
    SESSION_EXPIRED: SessionExpired,
    SESSION_PASSWORD_NEEDED: SessionPasswordNeeded,
    SESSION_REVOKED: SessionRevoked,
    SETTINGS_INVALID: SettingsInvalid,
    SHA256_HASH_INVALID: Sha256HashInvalid,
    SHORTNAME_OCCUPY_FAILED: ShortnameOccupyFailed,
    SHORT_NAME_INVALID: ShortNameInvalid,
    SHORT_NAME_OCCUPIED: ShortNameOccupied,
    SIGN_IN_FAILED: SignInFailed,
    SLOWMODE_MULTI_MSGS_DISABLED: SlowmodeMultiMsgsDisabled,
    SMS_CODE_CREATE_FAILED: SmsCodeCreateFailed,
    SRP_ID_INVALID: SrpIdInvalid,
    SRP_PASSWORD_CHANGED: SrpPasswordChanged,
    START_PARAM_EMPTY: StartParamEmpty,
    START_PARAM_INVALID: StartParamInvalid,
    START_PARAM_TOO_LONG: StartParamTooLong,
    STICKERPACK_STICKERS_TOO_MUCH: StickerpackStickersTooMuch,
    STICKERSET_INVALID: StickersetInvalid,
    STICKERSET_OWNER_ANONYMOUS: StickersetOwnerAnonymous,
    STICKERS_EMPTY: StickersEmpty,
    STICKERS_TOO_MUCH: StickersTooMuch,
    STICKER_DOCUMENT_INVALID: StickerDocumentInvalid,
    STICKER_EMOJI_INVALID: StickerEmojiInvalid,
    STICKER_FILE_INVALID: StickerFileInvalid,
    STICKER_GIF_DIMENSIONS: StickerGifDimensions,
    STICKER_ID_INVALID: StickerIdInvalid,
    STICKER_INVALID: StickerInvalid,
    STICKER_MIME_INVALID: StickerMimeInvalid,
    STICKER_PNG_DIMENSIONS: StickerPngDimensions,
    STICKER_PNG_NOPNG: StickerPngNopng,
    STICKER_TGS_NODOC: StickerTgsNodoc,
    STICKER_TGS_NOTGS: StickerTgsNotgs,
    STICKER_THUMB_PNG_NOPNG: StickerThumbPngNopng,
    STICKER_THUMB_TGS_NOTGS: StickerThumbTgsNotgs,
    STICKER_VIDEO_BIG: StickerVideoBig,
    STICKER_VIDEO_NODOC: StickerVideoNodoc,
    STICKER_VIDEO_NOWEBM: StickerVideoNowebm,
    STORAGE_CHECK_FAILED: StorageCheckFailed,
    STORE_INVALID_SCALAR_TYPE: StoreInvalidScalarType,
    SWITCH_PM_TEXT_EMPTY: SwitchPmTextEmpty,
    TAKEOUT_INVALID: TakeoutInvalid,
    TAKEOUT_REQUIRED: TakeoutRequired,
    TEMP_AUTH_KEY_ALREADY_BOUND: TempAuthKeyAlreadyBound,
    TEMP_AUTH_KEY_EMPTY: TempAuthKeyEmpty,
    THEME_FILE_INVALID: ThemeFileInvalid,
    THEME_FORMAT_INVALID: ThemeFormatInvalid,
    THEME_INVALID: ThemeInvalid,
    THEME_MIME_INVALID: ThemeMimeInvalid,
    THEME_TITLE_INVALID: ThemeTitleInvalid,
    TIMEOUT: Timeout,
    TIME_TOO_BIG: TimeTooBig,
    TIME_TOO_SMALL: TimeTooSmall,
    TITLE_INVALID: TitleInvalid,
    TMP_PASSWORD_DISABLED: TmpPasswordDisabled,
    TMP_PASSWORD_INVALID: TmpPasswordInvalid,
    TOKEN_INVALID: TokenInvalid,
    TOPIC_DELETED: TopicDeleted,
    TO_LANG_INVALID: ToLangInvalid,
    TTL_DAYS_INVALID: TtlDaysInvalid,
    TTL_MEDIA_INVALID: TtlMediaInvalid,
    TTL_PERIOD_INVALID: TtlPeriodInvalid,
    TYPES_EMPTY: TypesEmpty,
    TYPE_CONSTRUCTOR_INVALID: TypeConstructorInvalid,
    Timedout: Timedout,
    Timeout: Timeout,
    UNKNOWN_ERROR: UnknownError,
    UNKNOWN_METHOD: UnknownMethod,
    UNTIL_DATE_INVALID: UntilDateInvalid,
    UPDATE_APP_TO_LOGIN: UpdateAppToLogin,
    URL_INVALID: UrlInvalid,
    USAGE_LIMIT_INVALID: UsageLimitInvalid,
    USERNAME_INVALID: UsernameInvalid,
    USERNAME_NOT_MODIFIED: UsernameNotModified,
    USERNAME_NOT_OCCUPIED: UsernameNotOccupied,
    USERNAME_OCCUPIED: UsernameOccupied,
    USERNAME_PURCHASE_AVAILABLE: UsernamePurchaseAvailable,
    USERPIC_PRIVACY_REQUIRED: UserpicPrivacyRequired,
    USERPIC_UPLOAD_REQUIRED: UserpicUploadRequired,
    USERS_TOO_FEW: UsersTooFew,
    USERS_TOO_MUCH: UsersTooMuch,
    USER_ADMIN_INVALID: UserAdminInvalid,
    USER_ALREADY_INVITED: UserAlreadyInvited,
    USER_ALREADY_PARTICIPANT: UserAlreadyParticipant,
    USER_BANNED_IN_CHANNEL: UserBannedInChannel,
    USER_BLOCKED: UserBlocked,
    USER_BOT: UserBot,
    USER_BOT_INVALID: UserBotInvalid,
    USER_BOT_REQUIRED: UserBotRequired,
    USER_CHANNELS_TOO_MUCH: UserChannelsTooMuch,
    USER_CREATOR: UserCreator,
    USER_DEACTIVATED: UserDeactivated,
    USER_DEACTIVATED_BAN: UserDeactivatedBan,
    USER_DELETED: UserDeleted,
    USER_ID_INVALID: UserIdInvalid,
    USER_INVALID: UserInvalid,
    USER_IS_BLOCKED: UserIsBlocked,
    USER_IS_BOT: UserIsBot,
    USER_KICKED: UserKicked,
    USER_NOT_MUTUAL_CONTACT: UserNotMutualContact,
    USER_NOT_PARTICIPANT: UserNotParticipant,
    USER_PRIVACY_RESTRICTED: UserPrivacyRestricted,
    USER_RESTRICTED: UserRestricted,
    USER_VOLUME_INVALID: UserVolumeInvalid,
    VIDEO_CONTENT_TYPE_INVALID: VideoContentTypeInvalid,
    VIDEO_FILE_INVALID: VideoFileInvalid,
    VIDEO_TITLE_EMPTY: VideoTitleEmpty,
    VOICE_MESSAGES_FORBIDDEN: VoiceMessagesForbidden,
    WALLPAPER_FILE_INVALID: WallpaperFileInvalid,
    WALLPAPER_INVALID: WallpaperInvalid,
    WALLPAPER_MIME_INVALID: WallpaperMimeInvalid,
    WC_CONVERT_URL_INVALID: WcConvertUrlInvalid,
    WEBDOCUMENT_INVALID: WebdocumentInvalid,
    WEBDOCUMENT_MIME_INVALID: WebdocumentMimeInvalid,
    WEBDOCUMENT_SIZE_TOO_BIG: WebdocumentSizeTooBig,
    WEBDOCUMENT_URL_INVALID: WebdocumentUrlInvalid,
    WEBPAGE_CURL_FAILED: WebpageCurlFailed,
    WEBPAGE_MEDIA_EMPTY: WebpageMediaEmpty,
    WEBPUSH_AUTH_INVALID: WebpushAuthInvalid,
    WEBPUSH_KEY_INVALID: WebpushKeyInvalid,
    WEBPUSH_TOKEN_INVALID: WebpushTokenInvalid,
    WORKER_BUSY_TOO_LONG_RETRY: WorkerBusyTooLongRetry,
    YOU_BLOCKED_USER: YouBlockedUser,
};
