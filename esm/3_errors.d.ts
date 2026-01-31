import { techgramError } from "./0_errors.js";
export * from "./0_errors.js";
export interface TelegramErrorParams {
    error_code: number;
    error_message: string;
    call: unknown;
}
export declare class TelegramError extends techgramError {
    errorCode: number;
    errorMessage: string;
    constructor(params: TelegramErrorParams);
}
export declare class AboutTooLong extends TelegramError {
}
export declare class AccessTokenExpired extends TelegramError {
}
export declare class AccessTokenInvalid extends TelegramError {
}
export declare class ActiveUserRequired extends TelegramError {
}
export declare class AdminsTooMuch extends TelegramError {
}
export declare class AdminIdInvalid extends TelegramError {
}
export declare class AdminRankEmojiNotAllowed extends TelegramError {
}
export declare class AdminRankInvalid extends TelegramError {
}
export declare class AlbumPhotosTooMany extends TelegramError {
}
export declare class ApiIdInvalid extends TelegramError {
}
export declare class ApiIdPublishedFlood extends TelegramError {
}
export declare class ArticleTitleEmpty extends TelegramError {
}
export declare class AudioContentUrlEmpty extends TelegramError {
}
export declare class AudioTitleEmpty extends TelegramError {
}
export declare class AuthBytesInvalid extends TelegramError {
}
export declare class AuthKeyDuplicated extends TelegramError {
}
export declare class AuthKeyInvalid extends TelegramError {
}
export declare class AuthKeyPermEmpty extends TelegramError {
}
export declare class AuthKeyUnregistered extends TelegramError {
}
export declare class AuthRestart extends TelegramError {
}
export declare class AuthTokenAlreadyAccepted extends TelegramError {
}
export declare class AuthTokenException extends TelegramError {
}
export declare class AuthTokenExpired extends TelegramError {
}
export declare class AuthTokenInvalid extends TelegramError {
}
export declare class AutoarchiveNotAvailable extends TelegramError {
}
export declare class BankCardNumberInvalid extends TelegramError {
}
export declare class BannedRightsInvalid extends TelegramError {
}
export declare class BasePortLocInvalid extends TelegramError {
}
export declare class BotsTooMuch extends TelegramError {
}
export declare class BotChannelsNa extends TelegramError {
}
export declare class BotCommandDescriptionInvalid extends TelegramError {
}
export declare class BotCommandInvalid extends TelegramError {
}
export declare class BotDomainInvalid extends TelegramError {
}
export declare class BotGamesDisabled extends TelegramError {
}
export declare class BotGroupsBlocked extends TelegramError {
}
export declare class BotInlineDisabled extends TelegramError {
}
export declare class BotInvalid extends TelegramError {
}
export declare class BotMethodInvalid extends TelegramError {
}
export declare class BotMissing extends TelegramError {
}
export declare class BotOnesideNotAvail extends TelegramError {
}
export declare class BotPaymentsDisabled extends TelegramError {
}
export declare class BotPollsDisabled extends TelegramError {
}
export declare class BotResponseTimeout extends TelegramError {
}
export declare class BotScoreNotModified extends TelegramError {
}
export declare class BroadcastCallsDisabled extends TelegramError {
}
export declare class BroadcastForbidden extends TelegramError {
}
export declare class BroadcastIdInvalid extends TelegramError {
}
export declare class BroadcastPublicVotersForbidden extends TelegramError {
}
export declare class BroadcastRequired extends TelegramError {
}
export declare class ButtonDataInvalid extends TelegramError {
}
export declare class ButtonTextInvalid extends TelegramError {
}
export declare class ButtonTypeInvalid extends TelegramError {
}
export declare class ButtonUrlInvalid extends TelegramError {
}
export declare class ButtonUserPrivacyRestricted extends TelegramError {
}
export declare class CallAlreadyAccepted extends TelegramError {
}
export declare class CallAlreadyDeclined extends TelegramError {
}
export declare class CallOccupyFailed extends TelegramError {
}
export declare class CallPeerInvalid extends TelegramError {
}
export declare class CallProtocolFlagsInvalid extends TelegramError {
}
export declare class CdnMethodInvalid extends TelegramError {
}
export declare class CdnUploadTimeout extends TelegramError {
}
export declare class ChannelsAdminLocatedTooMuch extends TelegramError {
}
export declare class ChannelsAdminPublicTooMuch extends TelegramError {
}
export declare class ChannelsTooMuch extends TelegramError {
}
export declare class ChannelBanned extends TelegramError {
}
export declare class ChannelForumMissing extends TelegramError {
}
export declare class ChannelIdInvalid extends TelegramError {
}
export declare class ChannelInvalid extends TelegramError {
}
export declare class ChannelParicipantMissing extends TelegramError {
}
export declare class ChannelPrivate extends TelegramError {
}
export declare class ChannelPublicGroupNa extends TelegramError {
}
export declare class ChannelTooBig extends TelegramError {
}
export declare class ChannelTooLarge extends TelegramError {
}
export declare class ChatAboutNotModified extends TelegramError {
}
export declare class ChatAboutTooLong extends TelegramError {
}
export declare class ChatAdminInviteRequired extends TelegramError {
}
export declare class ChatAdminRequired extends TelegramError {
}
export declare class ChatDiscussionUnallowed extends TelegramError {
}
export declare class ChatForbidden extends TelegramError {
}
export declare class ChatForwardsRestricted extends TelegramError {
}
export declare class ChatGetFailed extends TelegramError {
}
export declare class ChatGuestSendForbidden extends TelegramError {
}
export declare class ChatIdEmpty extends TelegramError {
}
export declare class ChatIdGenerateFailed extends TelegramError {
}
export declare class ChatIdInvalid extends TelegramError {
}
export declare class ChatInvalid extends TelegramError {
}
export declare class ChatInvitePermanent extends TelegramError {
}
export declare class ChatLinkExists extends TelegramError {
}
export declare class ChatNotModified extends TelegramError {
}
export declare class ChatRestricted extends TelegramError {
}
export declare class ChatRevokeDateUnsupported extends TelegramError {
}
export declare class ChatSendGameForbidden extends TelegramError {
}
export declare class ChatSendGifsForbidden extends TelegramError {
}
export declare class ChatSendInlineForbidden extends TelegramError {
}
export declare class ChatSendMediaForbidden extends TelegramError {
}
export declare class ChatSendPollForbidden extends TelegramError {
}
export declare class ChatSendStickersForbidden extends TelegramError {
}
export declare class ChatTitleEmpty extends TelegramError {
}
export declare class ChatTooBig extends TelegramError {
}
export declare class ChatWriteForbidden extends TelegramError {
}
export declare class ChpCallFail extends TelegramError {
}
export declare class CodeEmpty extends TelegramError {
}
export declare class CodeHashInvalid extends TelegramError {
}
export declare class CodeInvalid extends TelegramError {
}
export declare class ConnectionApiIdInvalid extends TelegramError {
}
export declare class ConnectionAppVersionEmpty extends TelegramError {
}
export declare class ConnectionDeviceModelEmpty extends TelegramError {
}
export declare class ConnectionLangPackInvalid extends TelegramError {
}
export declare class ConnectionLayerInvalid extends TelegramError {
}
export declare class ConnectionNotInited extends TelegramError {
}
export declare class ConnectionSystemEmpty extends TelegramError {
}
export declare class ConnectionSystemLangCodeEmpty extends TelegramError {
}
export declare class ContactAddMissing extends TelegramError {
}
export declare class ContactIdInvalid extends TelegramError {
}
export declare class ContactNameEmpty extends TelegramError {
}
export declare class ContactReqMissing extends TelegramError {
}
export declare class CreateCallFailed extends TelegramError {
}
export declare class CurrencyTotalAmountInvalid extends TelegramError {
}
export declare class DataInvalid extends TelegramError {
}
export declare class DataJsonInvalid extends TelegramError {
}
export declare class DataTooLong extends TelegramError {
}
export declare class DateEmpty extends TelegramError {
}
export declare class DcIdInvalid extends TelegramError {
}
export declare class DhGAInvalid extends TelegramError {
}
export declare class DocumentInvalid extends TelegramError {
}
export declare class EditBotInviteForbidden extends TelegramError {
}
export declare class EmailHashExpired extends TelegramError {
}
export declare class EmailInvalid extends TelegramError {
}
export declare class EmailUnconfirmed extends TelegramError {
}
export declare class EmailVerifyExpired extends TelegramError {
}
export declare class EmojiInvalid extends TelegramError {
}
export declare class EmojiNotModified extends TelegramError {
}
export declare class EmoticonEmpty extends TelegramError {
}
export declare class EmoticonInvalid extends TelegramError {
}
export declare class EmoticonStickerpackMissing extends TelegramError {
}
export declare class EncryptedMessageInvalid extends TelegramError {
}
export declare class EncryptionAlreadyAccepted extends TelegramError {
}
export declare class EncryptionAlreadyDeclined extends TelegramError {
}
export declare class EncryptionDeclined extends TelegramError {
}
export declare class EncryptionIdInvalid extends TelegramError {
}
export declare class EncryptionOccupyFailed extends TelegramError {
}
export declare class EntitiesTooLong extends TelegramError {
}
export declare class EntityBoundsInvalid extends TelegramError {
}
export declare class EntityMentionUserInvalid extends TelegramError {
}
export declare class ErrorTextEmpty extends TelegramError {
}
export declare class ExpireDateInvalid extends TelegramError {
}
export declare class ExpireForbidden extends TelegramError {
}
export declare class ExportCardInvalid extends TelegramError {
}
export declare class ExternalUrlInvalid extends TelegramError {
}
export declare class FieldNameEmpty extends TelegramError {
}
export declare class FieldNameInvalid extends TelegramError {
}
export declare class FilerefUpgradeNeeded extends TelegramError {
}
export declare class FileContentTypeInvalid extends TelegramError {
}
export declare class FileEmtpy extends TelegramError {
}
export declare class FileIdInvalid extends TelegramError {
}
export declare class FilePartsInvalid extends TelegramError {
}
export declare class FilePart_0Missing extends TelegramError {
}
export declare class FilePartEmpty extends TelegramError {
}
export declare class FilePartInvalid extends TelegramError {
}
export declare class FilePartLengthInvalid extends TelegramError {
}
export declare class FilePartSizeChanged extends TelegramError {
}
export declare class FilePartSizeInvalid extends TelegramError {
}
export declare class FilePartTooBig extends TelegramError {
}
export declare class FilePartXMissing extends TelegramError {
}
export declare class FileReferenceEmpty extends TelegramError {
}
export declare class FileReferenceExpired extends TelegramError {
}
export declare class FileReferenceInvalid extends TelegramError {
}
export declare class FileTitleEmpty extends TelegramError {
}
export declare class FilterIdInvalid extends TelegramError {
}
export declare class FilterIncludeEmpty extends TelegramError {
}
export declare class FilterNotSupported extends TelegramError {
}
export declare class FilterTitleEmpty extends TelegramError {
}
export declare class FirstnameInvalid extends TelegramError {
}
export declare class FolderIdEmpty extends TelegramError {
}
export declare class FolderIdInvalid extends TelegramError {
}
export declare class FreshChangeAdminsForbidden extends TelegramError {
}
export declare class FreshChangePhoneForbidden extends TelegramError {
}
export declare class FreshResetAuthorisationForbidden extends TelegramError {
}
export declare class FromMessageBotDisabled extends TelegramError {
}
export declare class FromPeerInvalid extends TelegramError {
}
export declare class GameBotInvalid extends TelegramError {
}
export declare class GeoPointInvalid extends TelegramError {
}
export declare class GifContentTypeInvalid extends TelegramError {
}
export declare class GifIdInvalid extends TelegramError {
}
export declare class GraphExpiredReload extends TelegramError {
}
export declare class GraphInvalidReload extends TelegramError {
}
export declare class GraphOutdatedReload extends TelegramError {
}
export declare class GroupcallAddParticipantsFailed extends TelegramError {
}
export declare class GroupcallAlreadyDiscarded extends TelegramError {
}
export declare class GroupcallAlreadyStarted extends TelegramError {
}
export declare class GroupcallForbidden extends TelegramError {
}
export declare class GroupcallInvalid extends TelegramError {
}
export declare class GroupcallJoinMissing extends TelegramError {
}
export declare class GroupcallNotModified extends TelegramError {
}
export declare class GroupcallSsrcDuplicateMuch extends TelegramError {
}
export declare class GroupedMediaInvalid extends TelegramError {
}
export declare class GroupCallInvalid extends TelegramError {
}
export declare class HashInvalid extends TelegramError {
}
export declare class HideRequesterMissing extends TelegramError {
}
export declare class HistoryGetFailed extends TelegramError {
}
export declare class ImageProcessFailed extends TelegramError {
}
export declare class ImportFileInvalid extends TelegramError {
}
export declare class ImportFormatUnrecognized extends TelegramError {
}
export declare class ImportIdInvalid extends TelegramError {
}
export declare class InlineBotRequired extends TelegramError {
}
export declare class InlineResultExpired extends TelegramError {
}
export declare class InputConstructorInvalid extends TelegramError {
}
export declare class InputFetchError extends TelegramError {
}
export declare class InputFetchFail extends TelegramError {
}
export declare class InputFilterInvalid extends TelegramError {
}
export declare class InputLayerInvalid extends TelegramError {
}
export declare class InputMethodInvalid extends TelegramError {
}
export declare class InputRequestTooLong extends TelegramError {
}
export declare class InputTextEmpty extends TelegramError {
}
export declare class InputUserDeactivated extends TelegramError {
}
export declare class InterdcXCallError extends TelegramError {
}
export declare class InterdcXCallRichError extends TelegramError {
}
export declare class InviteForbiddenWithJoinas extends TelegramError {
}
export declare class InviteHashEmpty extends TelegramError {
}
export declare class InviteHashExpired extends TelegramError {
}
export declare class InviteHashInvalid extends TelegramError {
}
export declare class InviteRequestSent extends TelegramError {
}
export declare class InviteRevokedMissing extends TelegramError {
}
export declare class InvoicePayloadInvalid extends TelegramError {
}
export declare class JoinAsPeerInvalid extends TelegramError {
}
export declare class LangCodeInvalid extends TelegramError {
}
export declare class LangCodeNotSupported extends TelegramError {
}
export declare class LangPackInvalid extends TelegramError {
}
export declare class LastnameInvalid extends TelegramError {
}
export declare class LimitInvalid extends TelegramError {
}
export declare class LinkNotModified extends TelegramError {
}
export declare class LocationInvalid extends TelegramError {
}
export declare class MaxDateInvalid extends TelegramError {
}
export declare class MaxIdInvalid extends TelegramError {
}
export declare class MaxQtsInvalid extends TelegramError {
}
export declare class Md5ChecksumInvalid extends TelegramError {
}
export declare class MediaCaptionTooLong extends TelegramError {
}
export declare class MediaEmpty extends TelegramError {
}
export declare class MediaGroupedInvalid extends TelegramError {
}
export declare class MediaInvalid extends TelegramError {
}
export declare class MediaNewInvalid extends TelegramError {
}
export declare class MediaPrevInvalid extends TelegramError {
}
export declare class MediaTtlInvalid extends TelegramError {
}
export declare class MegagroupIdInvalid extends TelegramError {
}
export declare class MegagroupPrehistoryHidden extends TelegramError {
}
export declare class MegagroupRequired extends TelegramError {
}
export declare class MemberNoLocation extends TelegramError {
}
export declare class MemberOccupyPrimaryLocFailed extends TelegramError {
}
export declare class MessageAuthorRequired extends TelegramError {
}
export declare class MessageDeleteForbidden extends TelegramError {
}
export declare class MessageEditTimeExpired extends TelegramError {
}
export declare class MessageEmpty extends TelegramError {
}
export declare class MessageIdsEmpty extends TelegramError {
}
export declare class MessageIdInvalid extends TelegramError {
}
export declare class MessageNotModified extends TelegramError {
}
export declare class MessagePollClosed extends TelegramError {
}
export declare class MessageTooLong extends TelegramError {
}
export declare class MethodInvalid extends TelegramError {
}
export declare class MinDateInvalid extends TelegramError {
}
export declare class MsgidDecreaseRetry extends TelegramError {
}
export declare class MsgIdInvalid extends TelegramError {
}
export declare class MsgTooOld extends TelegramError {
}
export declare class MsgWaitFailed extends TelegramError {
}
export declare class MtSendQueueTooLong extends TelegramError {
}
export declare class MultiMediaTooLong extends TelegramError {
}
export declare class NeedChatInvalid extends TelegramError {
}
export declare class NeedMemberInvalid extends TelegramError {
}
export declare class NewSaltInvalid extends TelegramError {
}
export declare class NewSettingsEmpty extends TelegramError {
}
export declare class NewSettingsInvalid extends TelegramError {
}
export declare class NextOffsetInvalid extends TelegramError {
}
export declare class NotAllowed extends TelegramError {
}
export declare class OffsetInvalid extends TelegramError {
}
export declare class OffsetPeerIdInvalid extends TelegramError {
}
export declare class OptionsTooMuch extends TelegramError {
}
export declare class OptionInvalid extends TelegramError {
}
export declare class PackShortNameInvalid extends TelegramError {
}
export declare class PackShortNameOccupied extends TelegramError {
}
export declare class PackTitleInvalid extends TelegramError {
}
export declare class ParticipantsTooFew extends TelegramError {
}
export declare class ParticipantCallFailed extends TelegramError {
}
export declare class ParticipantIdInvalid extends TelegramError {
}
export declare class ParticipantJoinMissing extends TelegramError {
}
export declare class ParticipantVersionOutdated extends TelegramError {
}
export declare class PasswordEmpty extends TelegramError {
}
export declare class PasswordHashInvalid extends TelegramError {
}
export declare class PasswordMissing extends TelegramError {
}
export declare class PasswordRecoveryExpired extends TelegramError {
}
export declare class PasswordRecoveryNa extends TelegramError {
}
export declare class PasswordRequired extends TelegramError {
}
export declare class PaymentProviderInvalid extends TelegramError {
}
export declare class PeerFlood extends TelegramError {
}
export declare class PeerHistoryEmpty extends TelegramError {
}
export declare class PeerIdInvalid extends TelegramError {
}
export declare class PeerIdNotSupported extends TelegramError {
}
export declare class PersistentTimestampEmpty extends TelegramError {
}
export declare class PersistentTimestampInvalid extends TelegramError {
}
export declare class PersistentTimestampOutdated extends TelegramError {
}
export declare class PhoneCodeEmpty extends TelegramError {
}
export declare class PhoneCodeExpired extends TelegramError {
}
export declare class PhoneCodeHashEmpty extends TelegramError {
}
export declare class PhoneCodeInvalid extends TelegramError {
}
export declare class PhoneHashExpired extends TelegramError {
}
export declare class PhoneNotOccupied extends TelegramError {
}
export declare class PhoneNumberAppSignupForbidden extends TelegramError {
}
export declare class PhoneNumberBanned extends TelegramError {
}
export declare class PhoneNumberFlood extends TelegramError {
}
export declare class PhoneNumberInvalid extends TelegramError {
}
export declare class PhoneNumberOccupied extends TelegramError {
}
export declare class PhoneNumberUnoccupied extends TelegramError {
}
export declare class PhonePasswordFlood extends TelegramError {
}
export declare class PhonePasswordProtected extends TelegramError {
}
export declare class PhotoContentTypeInvalid extends TelegramError {
}
export declare class PhotoContentUrlEmpty extends TelegramError {
}
export declare class PhotoCropFileMissing extends TelegramError {
}
export declare class PhotoCropSizeSmall extends TelegramError {
}
export declare class PhotoExtInvalid extends TelegramError {
}
export declare class PhotoFileMissing extends TelegramError {
}
export declare class PhotoIdInvalid extends TelegramError {
}
export declare class PhotoInvalid extends TelegramError {
}
export declare class PhotoInvalidDimensions extends TelegramError {
}
export declare class PhotoSaveFileInvalid extends TelegramError {
}
export declare class PhotoThumbUrlEmpty extends TelegramError {
}
export declare class PinnedDialogsTooMuch extends TelegramError {
}
export declare class PinRestricted extends TelegramError {
}
export declare class PollAnswersInvalid extends TelegramError {
}
export declare class PollAnswerInvalid extends TelegramError {
}
export declare class PollOptionDuplicate extends TelegramError {
}
export declare class PollOptionInvalid extends TelegramError {
}
export declare class PollQuestionInvalid extends TelegramError {
}
export declare class PollUnsupported extends TelegramError {
}
export declare class PollVoteRequired extends TelegramError {
}
export declare class PostponedTimeout extends TelegramError {
}
export declare class PremiumAccountRequired extends TelegramError {
}
export declare class PremiumCurrentlyUnavailable extends TelegramError {
}
export declare class PreviousChatImportActiveWaitXmin extends TelegramError {
}
export declare class PrivacyKeyInvalid extends TelegramError {
}
export declare class PrivacyTooLong extends TelegramError {
}
export declare class PrivacyValueInvalid extends TelegramError {
}
export declare class PtsChangeEmpty extends TelegramError {
}
export declare class PublicChannelMissing extends TelegramError {
}
export declare class PublicKeyRequired extends TelegramError {
}
export declare class QueryIdEmpty extends TelegramError {
}
export declare class QueryIdInvalid extends TelegramError {
}
export declare class QueryTooShort extends TelegramError {
}
export declare class QuizAnswerMissing extends TelegramError {
}
export declare class QuizCorrectAnswersEmpty extends TelegramError {
}
export declare class QuizCorrectAnswersTooMuch extends TelegramError {
}
export declare class QuizCorrectAnswerInvalid extends TelegramError {
}
export declare class QuizMultipleInvalid extends TelegramError {
}
export declare class RandomIdDuplicate extends TelegramError {
}
export declare class RandomIdEmpty extends TelegramError {
}
export declare class RandomIdInvalid extends TelegramError {
}
export declare class RandomLengthInvalid extends TelegramError {
}
export declare class RangesInvalid extends TelegramError {
}
export declare class ReactionsTooMany extends TelegramError {
}
export declare class ReactionEmpty extends TelegramError {
}
export declare class ReactionInvalid extends TelegramError {
}
export declare class ReflectorNotAvailable extends TelegramError {
}
export declare class RegIdGenerateFailed extends TelegramError {
}
export declare class ReplyMarkupBuyEmpty extends TelegramError {
}
export declare class ReplyMarkupGameEmpty extends TelegramError {
}
export declare class ReplyMarkupInvalid extends TelegramError {
}
export declare class ReplyMarkupTooLong extends TelegramError {
}
export declare class ResetRequestMissing extends TelegramError {
}
export declare class ResultsTooMuch extends TelegramError {
}
export declare class ResultIdDuplicate extends TelegramError {
}
export declare class ResultIdEmpty extends TelegramError {
}
export declare class ResultIdInvalid extends TelegramError {
}
export declare class ResultTypeInvalid extends TelegramError {
}
export declare class RevoteNotAllowed extends TelegramError {
}
export declare class RightsNotModified extends TelegramError {
}
export declare class RightForbidden extends TelegramError {
}
export declare class RpcCallFail extends TelegramError {
}
export declare class RpcMcgetFail extends TelegramError {
}
export declare class RsaDecryptFailed extends TelegramError {
}
export declare class ScheduleBotNotAllowed extends TelegramError {
}
export declare class ScheduleDateInvalid extends TelegramError {
}
export declare class ScheduleDateTooLate extends TelegramError {
}
export declare class ScheduleStatusPrivate extends TelegramError {
}
export declare class ScheduleTooMuch extends TelegramError {
}
export declare class ScoreInvalid extends TelegramError {
}
export declare class SearchQueryEmpty extends TelegramError {
}
export declare class SearchWithLinkNotSupported extends TelegramError {
}
export declare class SecondsInvalid extends TelegramError {
}
export declare class SendAsPeerInvalid extends TelegramError {
}
export declare class SendCodeUnavailable extends TelegramError {
}
export declare class SendMessageMediaInvalid extends TelegramError {
}
export declare class SendMessageTypeInvalid extends TelegramError {
}
export declare class SensitiveChangeForbidden extends TelegramError {
}
export declare class SessionExpired extends TelegramError {
}
export declare class SessionPasswordNeeded extends TelegramError {
}
export declare class SessionRevoked extends TelegramError {
}
export declare class SettingsInvalid extends TelegramError {
}
export declare class Sha256HashInvalid extends TelegramError {
}
export declare class ShortnameOccupyFailed extends TelegramError {
}
export declare class ShortNameInvalid extends TelegramError {
}
export declare class ShortNameOccupied extends TelegramError {
}
export declare class SignInFailed extends TelegramError {
}
export declare class SlowmodeMultiMsgsDisabled extends TelegramError {
}
export declare class SmsCodeCreateFailed extends TelegramError {
}
export declare class SrpIdInvalid extends TelegramError {
}
export declare class SrpPasswordChanged extends TelegramError {
}
export declare class StartParamEmpty extends TelegramError {
}
export declare class StartParamInvalid extends TelegramError {
}
export declare class StartParamTooLong extends TelegramError {
}
export declare class StickerpackStickersTooMuch extends TelegramError {
}
export declare class StickersetInvalid extends TelegramError {
}
export declare class StickersetOwnerAnonymous extends TelegramError {
}
export declare class StickersEmpty extends TelegramError {
}
export declare class StickersTooMuch extends TelegramError {
}
export declare class StickerDocumentInvalid extends TelegramError {
}
export declare class StickerEmojiInvalid extends TelegramError {
}
export declare class StickerFileInvalid extends TelegramError {
}
export declare class StickerGifDimensions extends TelegramError {
}
export declare class StickerIdInvalid extends TelegramError {
}
export declare class StickerInvalid extends TelegramError {
}
export declare class StickerMimeInvalid extends TelegramError {
}
export declare class StickerPngDimensions extends TelegramError {
}
export declare class StickerPngNopng extends TelegramError {
}
export declare class StickerTgsNodoc extends TelegramError {
}
export declare class StickerTgsNotgs extends TelegramError {
}
export declare class StickerThumbPngNopng extends TelegramError {
}
export declare class StickerThumbTgsNotgs extends TelegramError {
}
export declare class StickerVideoBig extends TelegramError {
}
export declare class StickerVideoNodoc extends TelegramError {
}
export declare class StickerVideoNowebm extends TelegramError {
}
export declare class StorageCheckFailed extends TelegramError {
}
export declare class StoreInvalidScalarType extends TelegramError {
}
export declare class SwitchPmTextEmpty extends TelegramError {
}
export declare class TakeoutInvalid extends TelegramError {
}
export declare class TakeoutRequired extends TelegramError {
}
export declare class TempAuthKeyAlreadyBound extends TelegramError {
}
export declare class TempAuthKeyEmpty extends TelegramError {
}
export declare class ThemeFileInvalid extends TelegramError {
}
export declare class ThemeFormatInvalid extends TelegramError {
}
export declare class ThemeInvalid extends TelegramError {
}
export declare class ThemeMimeInvalid extends TelegramError {
}
export declare class ThemeTitleInvalid extends TelegramError {
}
export declare class Timeout extends TelegramError {
}
export declare class TimeTooBig extends TelegramError {
}
export declare class TimeTooSmall extends TelegramError {
}
export declare class TitleInvalid extends TelegramError {
}
export declare class TmpPasswordDisabled extends TelegramError {
}
export declare class TmpPasswordInvalid extends TelegramError {
}
export declare class TokenInvalid extends TelegramError {
}
export declare class TopicDeleted extends TelegramError {
}
export declare class ToLangInvalid extends TelegramError {
}
export declare class TtlDaysInvalid extends TelegramError {
}
export declare class TtlMediaInvalid extends TelegramError {
}
export declare class TtlPeriodInvalid extends TelegramError {
}
export declare class TypesEmpty extends TelegramError {
}
export declare class TypeConstructorInvalid extends TelegramError {
}
export declare class Timedout extends TelegramError {
}
export declare class UnknownError extends TelegramError {
}
export declare class UnknownMethod extends TelegramError {
}
export declare class UntilDateInvalid extends TelegramError {
}
export declare class UpdateAppToLogin extends TelegramError {
}
export declare class UrlInvalid extends TelegramError {
}
export declare class UsageLimitInvalid extends TelegramError {
}
export declare class UsernameInvalid extends TelegramError {
}
export declare class UsernameNotModified extends TelegramError {
}
export declare class UsernameNotOccupied extends TelegramError {
}
export declare class UsernameOccupied extends TelegramError {
}
export declare class UsernamePurchaseAvailable extends TelegramError {
}
export declare class UserpicPrivacyRequired extends TelegramError {
}
export declare class UserpicUploadRequired extends TelegramError {
}
export declare class UsersTooFew extends TelegramError {
}
export declare class UsersTooMuch extends TelegramError {
}
export declare class UserAdminInvalid extends TelegramError {
}
export declare class UserAlreadyInvited extends TelegramError {
}
export declare class UserAlreadyParticipant extends TelegramError {
}
export declare class UserBannedInChannel extends TelegramError {
}
export declare class UserBlocked extends TelegramError {
}
export declare class UserBot extends TelegramError {
}
export declare class UserBotInvalid extends TelegramError {
}
export declare class UserBotRequired extends TelegramError {
}
export declare class UserChannelsTooMuch extends TelegramError {
}
export declare class UserCreator extends TelegramError {
}
export declare class UserDeactivated extends TelegramError {
}
export declare class UserDeactivatedBan extends TelegramError {
}
export declare class UserDeleted extends TelegramError {
}
export declare class UserIdInvalid extends TelegramError {
}
export declare class UserInvalid extends TelegramError {
}
export declare class UserIsBlocked extends TelegramError {
}
export declare class UserIsBot extends TelegramError {
}
export declare class UserKicked extends TelegramError {
}
export declare class UserNotMutualContact extends TelegramError {
}
export declare class UserNotParticipant extends TelegramError {
}
export declare class UserPrivacyRestricted extends TelegramError {
}
export declare class UserRestricted extends TelegramError {
}
export declare class UserVolumeInvalid extends TelegramError {
}
export declare class VideoContentTypeInvalid extends TelegramError {
}
export declare class VideoFileInvalid extends TelegramError {
}
export declare class VideoTitleEmpty extends TelegramError {
}
export declare class VoiceMessagesForbidden extends TelegramError {
}
export declare class WallpaperFileInvalid extends TelegramError {
}
export declare class WallpaperInvalid extends TelegramError {
}
export declare class WallpaperMimeInvalid extends TelegramError {
}
export declare class WcConvertUrlInvalid extends TelegramError {
}
export declare class WebdocumentInvalid extends TelegramError {
}
export declare class WebdocumentMimeInvalid extends TelegramError {
}
export declare class WebdocumentSizeTooBig extends TelegramError {
}
export declare class WebdocumentUrlInvalid extends TelegramError {
}
export declare class WebpageCurlFailed extends TelegramError {
}
export declare class WebpageMediaEmpty extends TelegramError {
}
export declare class WebpushAuthInvalid extends TelegramError {
}
export declare class WebpushKeyInvalid extends TelegramError {
}
export declare class WebpushTokenInvalid extends TelegramError {
}
export declare class WorkerBusyTooLongRetry extends TelegramError {
}
export declare class YouBlockedUser extends TelegramError {
}
export declare const map: {
    ABOUT_TOO_LONG: typeof AboutTooLong;
    ACCESS_TOKEN_EXPIRED: typeof AccessTokenExpired;
    ACCESS_TOKEN_INVALID: typeof AccessTokenInvalid;
    ACTIVE_USER_REQUIRED: typeof ActiveUserRequired;
    ADMINS_TOO_MUCH: typeof AdminsTooMuch;
    ADMIN_ID_INVALID: typeof AdminIdInvalid;
    ADMIN_RANK_EMOJI_NOT_ALLOWED: typeof AdminRankEmojiNotAllowed;
    ADMIN_RANK_INVALID: typeof AdminRankInvalid;
    ALBUM_PHOTOS_TOO_MANY: typeof AlbumPhotosTooMany;
    API_ID_INVALID: typeof ApiIdInvalid;
    API_ID_PUBLISHED_FLOOD: typeof ApiIdPublishedFlood;
    ARTICLE_TITLE_EMPTY: typeof ArticleTitleEmpty;
    AUDIO_CONTENT_URL_EMPTY: typeof AudioContentUrlEmpty;
    AUDIO_TITLE_EMPTY: typeof AudioTitleEmpty;
    AUTH_BYTES_INVALID: typeof AuthBytesInvalid;
    AUTH_KEY_DUPLICATED: typeof AuthKeyDuplicated;
    AUTH_KEY_INVALID: typeof AuthKeyInvalid;
    AUTH_KEY_PERM_EMPTY: typeof AuthKeyPermEmpty;
    AUTH_KEY_UNREGISTERED: typeof AuthKeyUnregistered;
    AUTH_RESTART: typeof AuthRestart;
    AUTH_TOKEN_ALREADY_ACCEPTED: typeof AuthTokenAlreadyAccepted;
    AUTH_TOKEN_EXCEPTION: typeof AuthTokenException;
    AUTH_TOKEN_EXPIRED: typeof AuthTokenExpired;
    AUTH_TOKEN_INVALID: typeof AuthTokenInvalid;
    AUTOARCHIVE_NOT_AVAILABLE: typeof AutoarchiveNotAvailable;
    BANK_CARD_NUMBER_INVALID: typeof BankCardNumberInvalid;
    BANNED_RIGHTS_INVALID: typeof BannedRightsInvalid;
    BASE_PORT_LOC_INVALID: typeof BasePortLocInvalid;
    BOTS_TOO_MUCH: typeof BotsTooMuch;
    BOT_CHANNELS_NA: typeof BotChannelsNa;
    BOT_COMMAND_DESCRIPTION_INVALID: typeof BotCommandDescriptionInvalid;
    BOT_COMMAND_INVALID: typeof BotCommandInvalid;
    BOT_DOMAIN_INVALID: typeof BotDomainInvalid;
    BOT_GAMES_DISABLED: typeof BotGamesDisabled;
    BOT_GROUPS_BLOCKED: typeof BotGroupsBlocked;
    BOT_INLINE_DISABLED: typeof BotInlineDisabled;
    BOT_INVALID: typeof BotInvalid;
    BOT_METHOD_INVALID: typeof BotMethodInvalid;
    BOT_MISSING: typeof BotMissing;
    BOT_ONESIDE_NOT_AVAIL: typeof BotOnesideNotAvail;
    BOT_PAYMENTS_DISABLED: typeof BotPaymentsDisabled;
    BOT_POLLS_DISABLED: typeof BotPollsDisabled;
    BOT_RESPONSE_TIMEOUT: typeof BotResponseTimeout;
    BOT_SCORE_NOT_MODIFIED: typeof BotScoreNotModified;
    BROADCAST_CALLS_DISABLED: typeof BroadcastCallsDisabled;
    BROADCAST_FORBIDDEN: typeof BroadcastForbidden;
    BROADCAST_ID_INVALID: typeof BroadcastIdInvalid;
    BROADCAST_PUBLIC_VOTERS_FORBIDDEN: typeof BroadcastPublicVotersForbidden;
    BROADCAST_REQUIRED: typeof BroadcastRequired;
    BUTTON_DATA_INVALID: typeof ButtonDataInvalid;
    BUTTON_TEXT_INVALID: typeof ButtonTextInvalid;
    BUTTON_TYPE_INVALID: typeof ButtonTypeInvalid;
    BUTTON_URL_INVALID: typeof ButtonUrlInvalid;
    BUTTON_USER_PRIVACY_RESTRICTED: typeof ButtonUserPrivacyRestricted;
    CALL_ALREADY_ACCEPTED: typeof CallAlreadyAccepted;
    CALL_ALREADY_DECLINED: typeof CallAlreadyDeclined;
    CALL_OCCUPY_FAILED: typeof CallOccupyFailed;
    CALL_PEER_INVALID: typeof CallPeerInvalid;
    CALL_PROTOCOL_FLAGS_INVALID: typeof CallProtocolFlagsInvalid;
    CDN_METHOD_INVALID: typeof CdnMethodInvalid;
    CDN_UPLOAD_TIMEOUT: typeof CdnUploadTimeout;
    CHANNELS_ADMIN_LOCATED_TOO_MUCH: typeof ChannelsAdminLocatedTooMuch;
    CHANNELS_ADMIN_PUBLIC_TOO_MUCH: typeof ChannelsAdminPublicTooMuch;
    CHANNELS_TOO_MUCH: typeof ChannelsTooMuch;
    CHANNEL_BANNED: typeof ChannelBanned;
    CHANNEL_FORUM_MISSING: typeof ChannelForumMissing;
    CHANNEL_ID_INVALID: typeof ChannelIdInvalid;
    CHANNEL_INVALID: typeof ChannelInvalid;
    CHANNEL_PARICIPANT_MISSING: typeof ChannelParicipantMissing;
    CHANNEL_PRIVATE: typeof ChannelPrivate;
    CHANNEL_PUBLIC_GROUP_NA: typeof ChannelPublicGroupNa;
    CHANNEL_TOO_BIG: typeof ChannelTooBig;
    CHANNEL_TOO_LARGE: typeof ChannelTooLarge;
    CHAT_ABOUT_NOT_MODIFIED: typeof ChatAboutNotModified;
    CHAT_ABOUT_TOO_LONG: typeof ChatAboutTooLong;
    CHAT_ADMIN_INVITE_REQUIRED: typeof ChatAdminInviteRequired;
    CHAT_ADMIN_REQUIRED: typeof ChatAdminRequired;
    CHAT_DISCUSSION_UNALLOWED: typeof ChatDiscussionUnallowed;
    CHAT_FORBIDDEN: typeof ChatForbidden;
    CHAT_FORWARDS_RESTRICTED: typeof ChatForwardsRestricted;
    CHAT_GET_FAILED: typeof ChatGetFailed;
    CHAT_GUEST_SEND_FORBIDDEN: typeof ChatGuestSendForbidden;
    CHAT_ID_EMPTY: typeof ChatIdEmpty;
    CHAT_ID_GENERATE_FAILED: typeof ChatIdGenerateFailed;
    CHAT_ID_INVALID: typeof ChatIdInvalid;
    CHAT_INVALID: typeof ChatInvalid;
    CHAT_INVITE_PERMANENT: typeof ChatInvitePermanent;
    CHAT_LINK_EXISTS: typeof ChatLinkExists;
    CHAT_NOT_MODIFIED: typeof ChatNotModified;
    CHAT_RESTRICTED: typeof ChatRestricted;
    CHAT_REVOKE_DATE_UNSUPPORTED: typeof ChatRevokeDateUnsupported;
    CHAT_SEND_GAME_FORBIDDEN: typeof ChatSendGameForbidden;
    CHAT_SEND_GIFS_FORBIDDEN: typeof ChatSendGifsForbidden;
    CHAT_SEND_INLINE_FORBIDDEN: typeof ChatSendInlineForbidden;
    CHAT_SEND_MEDIA_FORBIDDEN: typeof ChatSendMediaForbidden;
    CHAT_SEND_POLL_FORBIDDEN: typeof ChatSendPollForbidden;
    CHAT_SEND_STICKERS_FORBIDDEN: typeof ChatSendStickersForbidden;
    CHAT_TITLE_EMPTY: typeof ChatTitleEmpty;
    CHAT_TOO_BIG: typeof ChatTooBig;
    CHAT_WRITE_FORBIDDEN: typeof ChatWriteForbidden;
    CHP_CALL_FAIL: typeof ChpCallFail;
    CODE_EMPTY: typeof CodeEmpty;
    CODE_HASH_INVALID: typeof CodeHashInvalid;
    CODE_INVALID: typeof CodeInvalid;
    CONNECTION_API_ID_INVALID: typeof ConnectionApiIdInvalid;
    CONNECTION_APP_VERSION_EMPTY: typeof ConnectionAppVersionEmpty;
    CONNECTION_DEVICE_MODEL_EMPTY: typeof ConnectionDeviceModelEmpty;
    CONNECTION_LANG_PACK_INVALID: typeof ConnectionLangPackInvalid;
    CONNECTION_LAYER_INVALID: typeof ConnectionLayerInvalid;
    CONNECTION_NOT_INITED: typeof ConnectionNotInited;
    CONNECTION_SYSTEM_EMPTY: typeof ConnectionSystemEmpty;
    CONNECTION_SYSTEM_LANG_CODE_EMPTY: typeof ConnectionSystemLangCodeEmpty;
    CONTACT_ADD_MISSING: typeof ContactAddMissing;
    CONTACT_ID_INVALID: typeof ContactIdInvalid;
    CONTACT_NAME_EMPTY: typeof ContactNameEmpty;
    CONTACT_REQ_MISSING: typeof ContactReqMissing;
    CREATE_CALL_FAILED: typeof CreateCallFailed;
    CURRENCY_TOTAL_AMOUNT_INVALID: typeof CurrencyTotalAmountInvalid;
    DATA_INVALID: typeof DataInvalid;
    DATA_JSON_INVALID: typeof DataJsonInvalid;
    DATA_TOO_LONG: typeof DataTooLong;
    DATE_EMPTY: typeof DateEmpty;
    DC_ID_INVALID: typeof DcIdInvalid;
    DH_G_A_INVALID: typeof DhGAInvalid;
    DOCUMENT_INVALID: typeof DocumentInvalid;
    EDIT_BOT_INVITE_FORBIDDEN: typeof EditBotInviteForbidden;
    EMAIL_HASH_EXPIRED: typeof EmailHashExpired;
    EMAIL_INVALID: typeof EmailInvalid;
    EMAIL_UNCONFIRMED: typeof EmailUnconfirmed;
    EMAIL_VERIFY_EXPIRED: typeof EmailVerifyExpired;
    EMOJI_INVALID: typeof EmojiInvalid;
    EMOJI_NOT_MODIFIED: typeof EmojiNotModified;
    EMOTICON_EMPTY: typeof EmoticonEmpty;
    EMOTICON_INVALID: typeof EmoticonInvalid;
    EMOTICON_STICKERPACK_MISSING: typeof EmoticonStickerpackMissing;
    ENCRYPTED_MESSAGE_INVALID: typeof EncryptedMessageInvalid;
    ENCRYPTION_ALREADY_ACCEPTED: typeof EncryptionAlreadyAccepted;
    ENCRYPTION_ALREADY_DECLINED: typeof EncryptionAlreadyDeclined;
    ENCRYPTION_DECLINED: typeof EncryptionDeclined;
    ENCRYPTION_ID_INVALID: typeof EncryptionIdInvalid;
    ENCRYPTION_OCCUPY_FAILED: typeof EncryptionOccupyFailed;
    ENTITIES_TOO_LONG: typeof EntitiesTooLong;
    ENTITY_BOUNDS_INVALID: typeof EntityBoundsInvalid;
    ENTITY_MENTION_USER_INVALID: typeof EntityMentionUserInvalid;
    ERROR_TEXT_EMPTY: typeof ErrorTextEmpty;
    EXPIRE_DATE_INVALID: typeof ExpireDateInvalid;
    EXPIRE_FORBIDDEN: typeof ExpireForbidden;
    EXPORT_CARD_INVALID: typeof ExportCardInvalid;
    EXTERNAL_URL_INVALID: typeof ExternalUrlInvalid;
    FIELD_NAME_EMPTY: typeof FieldNameEmpty;
    FIELD_NAME_INVALID: typeof FieldNameInvalid;
    FILEREF_UPGRADE_NEEDED: typeof FilerefUpgradeNeeded;
    FILE_CONTENT_TYPE_INVALID: typeof FileContentTypeInvalid;
    FILE_EMTPY: typeof FileEmtpy;
    FILE_ID_INVALID: typeof FileIdInvalid;
    FILE_PARTS_INVALID: typeof FilePartsInvalid;
    FILE_PART_0_MISSING: typeof FilePart_0Missing;
    FILE_PART_EMPTY: typeof FilePartEmpty;
    FILE_PART_INVALID: typeof FilePartInvalid;
    FILE_PART_LENGTH_INVALID: typeof FilePartLengthInvalid;
    FILE_PART_SIZE_CHANGED: typeof FilePartSizeChanged;
    FILE_PART_SIZE_INVALID: typeof FilePartSizeInvalid;
    FILE_PART_TOO_BIG: typeof FilePartTooBig;
    FILE_PART_X_MISSING: typeof FilePartXMissing;
    FILE_REFERENCE_EMPTY: typeof FileReferenceEmpty;
    FILE_REFERENCE_EXPIRED: typeof FileReferenceExpired;
    FILE_REFERENCE_INVALID: typeof FileReferenceInvalid;
    FILE_TITLE_EMPTY: typeof FileTitleEmpty;
    FILTER_ID_INVALID: typeof FilterIdInvalid;
    FILTER_INCLUDE_EMPTY: typeof FilterIncludeEmpty;
    FILTER_NOT_SUPPORTED: typeof FilterNotSupported;
    FILTER_TITLE_EMPTY: typeof FilterTitleEmpty;
    FIRSTNAME_INVALID: typeof FirstnameInvalid;
    FOLDER_ID_EMPTY: typeof FolderIdEmpty;
    FOLDER_ID_INVALID: typeof FolderIdInvalid;
    FRESH_CHANGE_ADMINS_FORBIDDEN: typeof FreshChangeAdminsForbidden;
    FRESH_CHANGE_PHONE_FORBIDDEN: typeof FreshChangePhoneForbidden;
    FRESH_RESET_AUTHORISATION_FORBIDDEN: typeof FreshResetAuthorisationForbidden;
    FROM_MESSAGE_BOT_DISABLED: typeof FromMessageBotDisabled;
    FROM_PEER_INVALID: typeof FromPeerInvalid;
    GAME_BOT_INVALID: typeof GameBotInvalid;
    GEO_POINT_INVALID: typeof GeoPointInvalid;
    GIF_CONTENT_TYPE_INVALID: typeof GifContentTypeInvalid;
    GIF_ID_INVALID: typeof GifIdInvalid;
    GRAPH_EXPIRED_RELOAD: typeof GraphExpiredReload;
    GRAPH_INVALID_RELOAD: typeof GraphInvalidReload;
    GRAPH_OUTDATED_RELOAD: typeof GraphOutdatedReload;
    GROUPCALL_ADD_PARTICIPANTS_FAILED: typeof GroupcallAddParticipantsFailed;
    GROUPCALL_ALREADY_DISCARDED: typeof GroupcallAlreadyDiscarded;
    GROUPCALL_ALREADY_STARTED: typeof GroupcallAlreadyStarted;
    GROUPCALL_FORBIDDEN: typeof GroupcallForbidden;
    GROUPCALL_INVALID: typeof GroupcallInvalid;
    GROUPCALL_JOIN_MISSING: typeof GroupcallJoinMissing;
    GROUPCALL_NOT_MODIFIED: typeof GroupcallNotModified;
    GROUPCALL_SSRC_DUPLICATE_MUCH: typeof GroupcallSsrcDuplicateMuch;
    GROUPED_MEDIA_INVALID: typeof GroupedMediaInvalid;
    GROUP_CALL_INVALID: typeof GroupCallInvalid;
    HASH_INVALID: typeof HashInvalid;
    HIDE_REQUESTER_MISSING: typeof HideRequesterMissing;
    HISTORY_GET_FAILED: typeof HistoryGetFailed;
    IMAGE_PROCESS_FAILED: typeof ImageProcessFailed;
    IMPORT_FILE_INVALID: typeof ImportFileInvalid;
    IMPORT_FORMAT_UNRECOGNIZED: typeof ImportFormatUnrecognized;
    IMPORT_ID_INVALID: typeof ImportIdInvalid;
    INLINE_BOT_REQUIRED: typeof InlineBotRequired;
    INLINE_RESULT_EXPIRED: typeof InlineResultExpired;
    INPUT_CONSTRUCTOR_INVALID: typeof InputConstructorInvalid;
    INPUT_FETCH_ERROR: typeof InputFetchError;
    INPUT_FETCH_FAIL: typeof InputFetchFail;
    INPUT_FILTER_INVALID: typeof InputFilterInvalid;
    INPUT_LAYER_INVALID: typeof InputLayerInvalid;
    INPUT_METHOD_INVALID: typeof InputMethodInvalid;
    INPUT_REQUEST_TOO_LONG: typeof InputRequestTooLong;
    INPUT_TEXT_EMPTY: typeof InputTextEmpty;
    INPUT_USER_DEACTIVATED: typeof InputUserDeactivated;
    INTERDC_X_CALL_ERROR: typeof InterdcXCallError;
    INTERDC_X_CALL_RICH_ERROR: typeof InterdcXCallRichError;
    INVITE_FORBIDDEN_WITH_JOINAS: typeof InviteForbiddenWithJoinas;
    INVITE_HASH_EMPTY: typeof InviteHashEmpty;
    INVITE_HASH_EXPIRED: typeof InviteHashExpired;
    INVITE_HASH_INVALID: typeof InviteHashInvalid;
    INVITE_REQUEST_SENT: typeof InviteRequestSent;
    INVITE_REVOKED_MISSING: typeof InviteRevokedMissing;
    INVOICE_PAYLOAD_INVALID: typeof InvoicePayloadInvalid;
    JOIN_AS_PEER_INVALID: typeof JoinAsPeerInvalid;
    LANG_CODE_INVALID: typeof LangCodeInvalid;
    LANG_CODE_NOT_SUPPORTED: typeof LangCodeNotSupported;
    LANG_PACK_INVALID: typeof LangPackInvalid;
    LASTNAME_INVALID: typeof LastnameInvalid;
    LIMIT_INVALID: typeof LimitInvalid;
    LINK_NOT_MODIFIED: typeof LinkNotModified;
    LOCATION_INVALID: typeof LocationInvalid;
    MAX_DATE_INVALID: typeof MaxDateInvalid;
    MAX_ID_INVALID: typeof MaxIdInvalid;
    MAX_QTS_INVALID: typeof MaxQtsInvalid;
    MD5_CHECKSUM_INVALID: typeof Md5ChecksumInvalid;
    MEDIA_CAPTION_TOO_LONG: typeof MediaCaptionTooLong;
    MEDIA_EMPTY: typeof MediaEmpty;
    MEDIA_GROUPED_INVALID: typeof MediaGroupedInvalid;
    MEDIA_INVALID: typeof MediaInvalid;
    MEDIA_NEW_INVALID: typeof MediaNewInvalid;
    MEDIA_PREV_INVALID: typeof MediaPrevInvalid;
    MEDIA_TTL_INVALID: typeof MediaTtlInvalid;
    MEGAGROUP_ID_INVALID: typeof MegagroupIdInvalid;
    MEGAGROUP_PREHISTORY_HIDDEN: typeof MegagroupPrehistoryHidden;
    MEGAGROUP_REQUIRED: typeof MegagroupRequired;
    MEMBER_NO_LOCATION: typeof MemberNoLocation;
    MEMBER_OCCUPY_PRIMARY_LOC_FAILED: typeof MemberOccupyPrimaryLocFailed;
    MESSAGE_AUTHOR_REQUIRED: typeof MessageAuthorRequired;
    MESSAGE_DELETE_FORBIDDEN: typeof MessageDeleteForbidden;
    MESSAGE_EDIT_TIME_EXPIRED: typeof MessageEditTimeExpired;
    MESSAGE_EMPTY: typeof MessageEmpty;
    MESSAGE_IDS_EMPTY: typeof MessageIdsEmpty;
    MESSAGE_ID_INVALID: typeof MessageIdInvalid;
    MESSAGE_NOT_MODIFIED: typeof MessageNotModified;
    MESSAGE_POLL_CLOSED: typeof MessagePollClosed;
    MESSAGE_TOO_LONG: typeof MessageTooLong;
    METHOD_INVALID: typeof MethodInvalid;
    MIN_DATE_INVALID: typeof MinDateInvalid;
    MSGID_DECREASE_RETRY: typeof MsgidDecreaseRetry;
    MSG_ID_INVALID: typeof MsgIdInvalid;
    MSG_TOO_OLD: typeof MsgTooOld;
    MSG_WAIT_FAILED: typeof MsgWaitFailed;
    MT_SEND_QUEUE_TOO_LONG: typeof MtSendQueueTooLong;
    MULTI_MEDIA_TOO_LONG: typeof MultiMediaTooLong;
    NEED_CHAT_INVALID: typeof NeedChatInvalid;
    NEED_MEMBER_INVALID: typeof NeedMemberInvalid;
    NEW_SALT_INVALID: typeof NewSaltInvalid;
    NEW_SETTINGS_EMPTY: typeof NewSettingsEmpty;
    NEW_SETTINGS_INVALID: typeof NewSettingsInvalid;
    NEXT_OFFSET_INVALID: typeof NextOffsetInvalid;
    NOT_ALLOWED: typeof NotAllowed;
    OFFSET_INVALID: typeof OffsetInvalid;
    OFFSET_PEER_ID_INVALID: typeof OffsetPeerIdInvalid;
    OPTIONS_TOO_MUCH: typeof OptionsTooMuch;
    OPTION_INVALID: typeof OptionInvalid;
    PACK_SHORT_NAME_INVALID: typeof PackShortNameInvalid;
    PACK_SHORT_NAME_OCCUPIED: typeof PackShortNameOccupied;
    PACK_TITLE_INVALID: typeof PackTitleInvalid;
    PARTICIPANTS_TOO_FEW: typeof ParticipantsTooFew;
    PARTICIPANT_CALL_FAILED: typeof ParticipantCallFailed;
    PARTICIPANT_ID_INVALID: typeof ParticipantIdInvalid;
    PARTICIPANT_JOIN_MISSING: typeof ParticipantJoinMissing;
    PARTICIPANT_VERSION_OUTDATED: typeof ParticipantVersionOutdated;
    PASSWORD_EMPTY: typeof PasswordEmpty;
    PASSWORD_HASH_INVALID: typeof PasswordHashInvalid;
    PASSWORD_MISSING: typeof PasswordMissing;
    PASSWORD_RECOVERY_EXPIRED: typeof PasswordRecoveryExpired;
    PASSWORD_RECOVERY_NA: typeof PasswordRecoveryNa;
    PASSWORD_REQUIRED: typeof PasswordRequired;
    PAYMENT_PROVIDER_INVALID: typeof PaymentProviderInvalid;
    PEER_FLOOD: typeof PeerFlood;
    PEER_HISTORY_EMPTY: typeof PeerHistoryEmpty;
    PEER_ID_INVALID: typeof PeerIdInvalid;
    PEER_ID_NOT_SUPPORTED: typeof PeerIdNotSupported;
    PERSISTENT_TIMESTAMP_EMPTY: typeof PersistentTimestampEmpty;
    PERSISTENT_TIMESTAMP_INVALID: typeof PersistentTimestampInvalid;
    PERSISTENT_TIMESTAMP_OUTDATED: typeof PersistentTimestampOutdated;
    PHONE_CODE_EMPTY: typeof PhoneCodeEmpty;
    PHONE_CODE_EXPIRED: typeof PhoneCodeExpired;
    PHONE_CODE_HASH_EMPTY: typeof PhoneCodeHashEmpty;
    PHONE_CODE_INVALID: typeof PhoneCodeInvalid;
    PHONE_HASH_EXPIRED: typeof PhoneHashExpired;
    PHONE_NOT_OCCUPIED: typeof PhoneNotOccupied;
    PHONE_NUMBER_APP_SIGNUP_FORBIDDEN: typeof PhoneNumberAppSignupForbidden;
    PHONE_NUMBER_BANNED: typeof PhoneNumberBanned;
    PHONE_NUMBER_FLOOD: typeof PhoneNumberFlood;
    PHONE_NUMBER_INVALID: typeof PhoneNumberInvalid;
    PHONE_NUMBER_OCCUPIED: typeof PhoneNumberOccupied;
    PHONE_NUMBER_UNOCCUPIED: typeof PhoneNumberUnoccupied;
    PHONE_PASSWORD_FLOOD: typeof PhonePasswordFlood;
    PHONE_PASSWORD_PROTECTED: typeof PhonePasswordProtected;
    PHOTO_CONTENT_TYPE_INVALID: typeof PhotoContentTypeInvalid;
    PHOTO_CONTENT_URL_EMPTY: typeof PhotoContentUrlEmpty;
    PHOTO_CROP_FILE_MISSING: typeof PhotoCropFileMissing;
    PHOTO_CROP_SIZE_SMALL: typeof PhotoCropSizeSmall;
    PHOTO_EXT_INVALID: typeof PhotoExtInvalid;
    PHOTO_FILE_MISSING: typeof PhotoFileMissing;
    PHOTO_ID_INVALID: typeof PhotoIdInvalid;
    PHOTO_INVALID: typeof PhotoInvalid;
    PHOTO_INVALID_DIMENSIONS: typeof PhotoInvalidDimensions;
    PHOTO_SAVE_FILE_INVALID: typeof PhotoSaveFileInvalid;
    PHOTO_THUMB_URL_EMPTY: typeof PhotoThumbUrlEmpty;
    PINNED_DIALOGS_TOO_MUCH: typeof PinnedDialogsTooMuch;
    PIN_RESTRICTED: typeof PinRestricted;
    POLL_ANSWERS_INVALID: typeof PollAnswersInvalid;
    POLL_ANSWER_INVALID: typeof PollAnswerInvalid;
    POLL_OPTION_DUPLICATE: typeof PollOptionDuplicate;
    POLL_OPTION_INVALID: typeof PollOptionInvalid;
    POLL_QUESTION_INVALID: typeof PollQuestionInvalid;
    POLL_UNSUPPORTED: typeof PollUnsupported;
    POLL_VOTE_REQUIRED: typeof PollVoteRequired;
    POSTPONED_TIMEOUT: typeof PostponedTimeout;
    PREMIUM_ACCOUNT_REQUIRED: typeof PremiumAccountRequired;
    PREMIUM_CURRENTLY_UNAVAILABLE: typeof PremiumCurrentlyUnavailable;
    PREVIOUS_CHAT_IMPORT_ACTIVE_WAIT_XMIN: typeof PreviousChatImportActiveWaitXmin;
    PRIVACY_KEY_INVALID: typeof PrivacyKeyInvalid;
    PRIVACY_TOO_LONG: typeof PrivacyTooLong;
    PRIVACY_VALUE_INVALID: typeof PrivacyValueInvalid;
    PTS_CHANGE_EMPTY: typeof PtsChangeEmpty;
    PUBLIC_CHANNEL_MISSING: typeof PublicChannelMissing;
    PUBLIC_KEY_REQUIRED: typeof PublicKeyRequired;
    QUERY_ID_EMPTY: typeof QueryIdEmpty;
    QUERY_ID_INVALID: typeof QueryIdInvalid;
    QUERY_TOO_SHORT: typeof QueryTooShort;
    QUIZ_ANSWER_MISSING: typeof QuizAnswerMissing;
    QUIZ_CORRECT_ANSWERS_EMPTY: typeof QuizCorrectAnswersEmpty;
    QUIZ_CORRECT_ANSWERS_TOO_MUCH: typeof QuizCorrectAnswersTooMuch;
    QUIZ_CORRECT_ANSWER_INVALID: typeof QuizCorrectAnswerInvalid;
    QUIZ_MULTIPLE_INVALID: typeof QuizMultipleInvalid;
    RANDOM_ID_DUPLICATE: typeof RandomIdDuplicate;
    RANDOM_ID_EMPTY: typeof RandomIdEmpty;
    RANDOM_ID_INVALID: typeof RandomIdInvalid;
    RANDOM_LENGTH_INVALID: typeof RandomLengthInvalid;
    RANGES_INVALID: typeof RangesInvalid;
    REACTIONS_TOO_MANY: typeof ReactionsTooMany;
    REACTION_EMPTY: typeof ReactionEmpty;
    REACTION_INVALID: typeof ReactionInvalid;
    REFLECTOR_NOT_AVAILABLE: typeof ReflectorNotAvailable;
    REG_ID_GENERATE_FAILED: typeof RegIdGenerateFailed;
    REPLY_MARKUP_BUY_EMPTY: typeof ReplyMarkupBuyEmpty;
    REPLY_MARKUP_GAME_EMPTY: typeof ReplyMarkupGameEmpty;
    REPLY_MARKUP_INVALID: typeof ReplyMarkupInvalid;
    REPLY_MARKUP_TOO_LONG: typeof ReplyMarkupTooLong;
    RESET_REQUEST_MISSING: typeof ResetRequestMissing;
    RESULTS_TOO_MUCH: typeof ResultsTooMuch;
    RESULT_ID_DUPLICATE: typeof ResultIdDuplicate;
    RESULT_ID_EMPTY: typeof ResultIdEmpty;
    RESULT_ID_INVALID: typeof ResultIdInvalid;
    RESULT_TYPE_INVALID: typeof ResultTypeInvalid;
    REVOTE_NOT_ALLOWED: typeof RevoteNotAllowed;
    RIGHTS_NOT_MODIFIED: typeof RightsNotModified;
    RIGHT_FORBIDDEN: typeof RightForbidden;
    RPC_CALL_FAIL: typeof RpcCallFail;
    RPC_MCGET_FAIL: typeof RpcMcgetFail;
    RSA_DECRYPT_FAILED: typeof RsaDecryptFailed;
    SCHEDULE_BOT_NOT_ALLOWED: typeof ScheduleBotNotAllowed;
    SCHEDULE_DATE_INVALID: typeof ScheduleDateInvalid;
    SCHEDULE_DATE_TOO_LATE: typeof ScheduleDateTooLate;
    SCHEDULE_STATUS_PRIVATE: typeof ScheduleStatusPrivate;
    SCHEDULE_TOO_MUCH: typeof ScheduleTooMuch;
    SCORE_INVALID: typeof ScoreInvalid;
    SEARCH_QUERY_EMPTY: typeof SearchQueryEmpty;
    SEARCH_WITH_LINK_NOT_SUPPORTED: typeof SearchWithLinkNotSupported;
    SECONDS_INVALID: typeof SecondsInvalid;
    SEND_AS_PEER_INVALID: typeof SendAsPeerInvalid;
    SEND_CODE_UNAVAILABLE: typeof SendCodeUnavailable;
    SEND_MESSAGE_MEDIA_INVALID: typeof SendMessageMediaInvalid;
    SEND_MESSAGE_TYPE_INVALID: typeof SendMessageTypeInvalid;
    SENSITIVE_CHANGE_FORBIDDEN: typeof SensitiveChangeForbidden;
    SESSION_EXPIRED: typeof SessionExpired;
    SESSION_PASSWORD_NEEDED: typeof SessionPasswordNeeded;
    SESSION_REVOKED: typeof SessionRevoked;
    SETTINGS_INVALID: typeof SettingsInvalid;
    SHA256_HASH_INVALID: typeof Sha256HashInvalid;
    SHORTNAME_OCCUPY_FAILED: typeof ShortnameOccupyFailed;
    SHORT_NAME_INVALID: typeof ShortNameInvalid;
    SHORT_NAME_OCCUPIED: typeof ShortNameOccupied;
    SIGN_IN_FAILED: typeof SignInFailed;
    SLOWMODE_MULTI_MSGS_DISABLED: typeof SlowmodeMultiMsgsDisabled;
    SMS_CODE_CREATE_FAILED: typeof SmsCodeCreateFailed;
    SRP_ID_INVALID: typeof SrpIdInvalid;
    SRP_PASSWORD_CHANGED: typeof SrpPasswordChanged;
    START_PARAM_EMPTY: typeof StartParamEmpty;
    START_PARAM_INVALID: typeof StartParamInvalid;
    START_PARAM_TOO_LONG: typeof StartParamTooLong;
    STICKERPACK_STICKERS_TOO_MUCH: typeof StickerpackStickersTooMuch;
    STICKERSET_INVALID: typeof StickersetInvalid;
    STICKERSET_OWNER_ANONYMOUS: typeof StickersetOwnerAnonymous;
    STICKERS_EMPTY: typeof StickersEmpty;
    STICKERS_TOO_MUCH: typeof StickersTooMuch;
    STICKER_DOCUMENT_INVALID: typeof StickerDocumentInvalid;
    STICKER_EMOJI_INVALID: typeof StickerEmojiInvalid;
    STICKER_FILE_INVALID: typeof StickerFileInvalid;
    STICKER_GIF_DIMENSIONS: typeof StickerGifDimensions;
    STICKER_ID_INVALID: typeof StickerIdInvalid;
    STICKER_INVALID: typeof StickerInvalid;
    STICKER_MIME_INVALID: typeof StickerMimeInvalid;
    STICKER_PNG_DIMENSIONS: typeof StickerPngDimensions;
    STICKER_PNG_NOPNG: typeof StickerPngNopng;
    STICKER_TGS_NODOC: typeof StickerTgsNodoc;
    STICKER_TGS_NOTGS: typeof StickerTgsNotgs;
    STICKER_THUMB_PNG_NOPNG: typeof StickerThumbPngNopng;
    STICKER_THUMB_TGS_NOTGS: typeof StickerThumbTgsNotgs;
    STICKER_VIDEO_BIG: typeof StickerVideoBig;
    STICKER_VIDEO_NODOC: typeof StickerVideoNodoc;
    STICKER_VIDEO_NOWEBM: typeof StickerVideoNowebm;
    STORAGE_CHECK_FAILED: typeof StorageCheckFailed;
    STORE_INVALID_SCALAR_TYPE: typeof StoreInvalidScalarType;
    SWITCH_PM_TEXT_EMPTY: typeof SwitchPmTextEmpty;
    TAKEOUT_INVALID: typeof TakeoutInvalid;
    TAKEOUT_REQUIRED: typeof TakeoutRequired;
    TEMP_AUTH_KEY_ALREADY_BOUND: typeof TempAuthKeyAlreadyBound;
    TEMP_AUTH_KEY_EMPTY: typeof TempAuthKeyEmpty;
    THEME_FILE_INVALID: typeof ThemeFileInvalid;
    THEME_FORMAT_INVALID: typeof ThemeFormatInvalid;
    THEME_INVALID: typeof ThemeInvalid;
    THEME_MIME_INVALID: typeof ThemeMimeInvalid;
    THEME_TITLE_INVALID: typeof ThemeTitleInvalid;
    TIMEOUT: typeof Timeout;
    TIME_TOO_BIG: typeof TimeTooBig;
    TIME_TOO_SMALL: typeof TimeTooSmall;
    TITLE_INVALID: typeof TitleInvalid;
    TMP_PASSWORD_DISABLED: typeof TmpPasswordDisabled;
    TMP_PASSWORD_INVALID: typeof TmpPasswordInvalid;
    TOKEN_INVALID: typeof TokenInvalid;
    TOPIC_DELETED: typeof TopicDeleted;
    TO_LANG_INVALID: typeof ToLangInvalid;
    TTL_DAYS_INVALID: typeof TtlDaysInvalid;
    TTL_MEDIA_INVALID: typeof TtlMediaInvalid;
    TTL_PERIOD_INVALID: typeof TtlPeriodInvalid;
    TYPES_EMPTY: typeof TypesEmpty;
    TYPE_CONSTRUCTOR_INVALID: typeof TypeConstructorInvalid;
    Timedout: typeof Timedout;
    Timeout: typeof Timeout;
    UNKNOWN_ERROR: typeof UnknownError;
    UNKNOWN_METHOD: typeof UnknownMethod;
    UNTIL_DATE_INVALID: typeof UntilDateInvalid;
    UPDATE_APP_TO_LOGIN: typeof UpdateAppToLogin;
    URL_INVALID: typeof UrlInvalid;
    USAGE_LIMIT_INVALID: typeof UsageLimitInvalid;
    USERNAME_INVALID: typeof UsernameInvalid;
    USERNAME_NOT_MODIFIED: typeof UsernameNotModified;
    USERNAME_NOT_OCCUPIED: typeof UsernameNotOccupied;
    USERNAME_OCCUPIED: typeof UsernameOccupied;
    USERNAME_PURCHASE_AVAILABLE: typeof UsernamePurchaseAvailable;
    USERPIC_PRIVACY_REQUIRED: typeof UserpicPrivacyRequired;
    USERPIC_UPLOAD_REQUIRED: typeof UserpicUploadRequired;
    USERS_TOO_FEW: typeof UsersTooFew;
    USERS_TOO_MUCH: typeof UsersTooMuch;
    USER_ADMIN_INVALID: typeof UserAdminInvalid;
    USER_ALREADY_INVITED: typeof UserAlreadyInvited;
    USER_ALREADY_PARTICIPANT: typeof UserAlreadyParticipant;
    USER_BANNED_IN_CHANNEL: typeof UserBannedInChannel;
    USER_BLOCKED: typeof UserBlocked;
    USER_BOT: typeof UserBot;
    USER_BOT_INVALID: typeof UserBotInvalid;
    USER_BOT_REQUIRED: typeof UserBotRequired;
    USER_CHANNELS_TOO_MUCH: typeof UserChannelsTooMuch;
    USER_CREATOR: typeof UserCreator;
    USER_DEACTIVATED: typeof UserDeactivated;
    USER_DEACTIVATED_BAN: typeof UserDeactivatedBan;
    USER_DELETED: typeof UserDeleted;
    USER_ID_INVALID: typeof UserIdInvalid;
    USER_INVALID: typeof UserInvalid;
    USER_IS_BLOCKED: typeof UserIsBlocked;
    USER_IS_BOT: typeof UserIsBot;
    USER_KICKED: typeof UserKicked;
    USER_NOT_MUTUAL_CONTACT: typeof UserNotMutualContact;
    USER_NOT_PARTICIPANT: typeof UserNotParticipant;
    USER_PRIVACY_RESTRICTED: typeof UserPrivacyRestricted;
    USER_RESTRICTED: typeof UserRestricted;
    USER_VOLUME_INVALID: typeof UserVolumeInvalid;
    VIDEO_CONTENT_TYPE_INVALID: typeof VideoContentTypeInvalid;
    VIDEO_FILE_INVALID: typeof VideoFileInvalid;
    VIDEO_TITLE_EMPTY: typeof VideoTitleEmpty;
    VOICE_MESSAGES_FORBIDDEN: typeof VoiceMessagesForbidden;
    WALLPAPER_FILE_INVALID: typeof WallpaperFileInvalid;
    WALLPAPER_INVALID: typeof WallpaperInvalid;
    WALLPAPER_MIME_INVALID: typeof WallpaperMimeInvalid;
    WC_CONVERT_URL_INVALID: typeof WcConvertUrlInvalid;
    WEBDOCUMENT_INVALID: typeof WebdocumentInvalid;
    WEBDOCUMENT_MIME_INVALID: typeof WebdocumentMimeInvalid;
    WEBDOCUMENT_SIZE_TOO_BIG: typeof WebdocumentSizeTooBig;
    WEBDOCUMENT_URL_INVALID: typeof WebdocumentUrlInvalid;
    WEBPAGE_CURL_FAILED: typeof WebpageCurlFailed;
    WEBPAGE_MEDIA_EMPTY: typeof WebpageMediaEmpty;
    WEBPUSH_AUTH_INVALID: typeof WebpushAuthInvalid;
    WEBPUSH_KEY_INVALID: typeof WebpushKeyInvalid;
    WEBPUSH_TOKEN_INVALID: typeof WebpushTokenInvalid;
    WORKER_BUSY_TOO_LONG_RETRY: typeof WorkerBusyTooLongRetry;
    YOU_BLOCKED_USER: typeof YouBlockedUser;
};
//# sourceMappingURL=3_errors.d.ts.map