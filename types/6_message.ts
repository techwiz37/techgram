import { unreachable } from "../0_deps.ts";
import { cleanObject, getLogger, type MaybePromise, ZERO_CHANNEL_ID } from "../1_utilities.ts";
import { Api } from "../2_tl.ts";
import { type FileId, FileType, toUniqueFileId } from "./_file_id.ts";
import { serializeFileId } from "./_file_id.ts";
import { constructContact, type Contact } from "./0_contact.ts";
import { constructDice, type Dice } from "./0_dice.ts";
import { constructInvoice, type Invoice } from "./0_invoice.ts";
import { constructLocation, type Location } from "./0_location.ts";
import { constructRefundedPayment, type RefundedPayment } from "./0_refunded_payment.ts";
import { constructSelfDestructOption, type SelfDestructOption } from "./0_self_destruct_option.ts";
import { constructVoice, type Voice } from "./0_voice.ts";
import { type Animation, constructAnimation } from "./1_animation.ts";
import { type Audio, constructAudio } from "./1_audio.ts";
import { type ChatP, isChatPUser, type PeerGetter } from "./1_chat_p.ts";
import { constructDocument, type Document } from "./1_document.ts";
import { constructGiveaway, type Giveaway } from "./1_giveaway.ts";
import { constructMessageReaction, type MessageReaction } from "./1_message_reaction.ts";
import { constructPhoto, type Photo } from "./1_photo.ts";
import { constructSticker, type Sticker, type StickerSetNameGetter } from "./1_sticker.ts";
import { constructVenue, type Venue } from "./1_venue.ts";
import { constructVideoNote, type VideoNote } from "./1_video_note.ts";
import { constructVideo, type Video } from "./1_video.ts";
import { constructMessageEntity, type MessageEntity } from "./2_message_entity.ts";
import { constructReplyMarkup, type ReplyMarkup } from "./2_reply_markup.ts";
import { constructSuccessfulPayment, type SuccessfulPayment } from "./2_successful_payment.ts";
import { constructUser2, type User } from "./2_user.ts";
import { constructForwardHeader, type ForwardHeader } from "./3_forward_header.ts";
import { constructGame, type Game } from "./3_game.ts";
import { constructReplyQuote, type ReplyQuote } from "./3_reply_quote.ts";
import { constructPoll, type Poll } from "./4_poll.ts";
import { constructLinkPreview, type LinkPreview } from "./5_link_preview.ts";

const L = getLogger("Message");

export interface _MessageBase {

  isOutgoing: boolean;

  id: number;

  threadId?: number;

  from: ChatP;

  date: number;

  chat: ChatP;

  link?: string;

  forwardFrom?: ForwardHeader;

  isTopicMessage: boolean;

  isAutomaticForward?: boolean;

  replyToMessage?: Message;

  replyToMessageId?: number;

  reactions?: MessageReaction[];

  replyQuote?: ReplyQuote;

  viaBot?: User;

  editDate?: number;

  hasProtectedContent?: boolean;

  mediaGroupId?: string;

  authorSignature?: string;

  views?: number;

  forwards?: number;

  replyMarkup?: ReplyMarkup;

  businessConnectionId?: string;

  senderBoostCount?: number;

  viaBusinessBot?: User;

  effectId?: string;

  scheduled?: boolean;

  selfDestruct?: SelfDestructOption;
}

export interface _MessageMediaBase extends _MessageBase {
  caption?: string;
  captionEntities?: MessageEntity[];
  hasMediaSpoiler?: boolean;
}

export interface MessageText extends _MessageBase {

  text: string;

  entities: MessageEntity[];

  linkPreview?: LinkPreview;
}

export interface MessageLink extends _MessageBase {

  linkPreview: LinkPreview & { url: NonNullable<LinkPreview["url"]> };
}

export interface MessagePhoto extends _MessageMediaBase {

  photo: Photo;
}

export interface MessageDocument extends _MessageMediaBase {

  document: Document;
}

export interface MessageVideo extends _MessageMediaBase {

  video: Video;
}

export interface MessageSticker extends _MessageBase {

  sticker: Sticker;
}

export interface MessageAnimation extends _MessageMediaBase {

  animation: Animation;
}

export interface MessageVoice extends _MessageMediaBase {

  voice: Voice;
}

export interface MessageAudio extends _MessageMediaBase {

  audio: Audio;
}

export interface MessageDice extends _MessageBase {

  dice: Dice;
}

export interface MessageVideoNote extends _MessageBase {

  videoNote: VideoNote;
}

export interface MessageContact extends _MessageBase {

  contact: Contact;
}

export interface MessageGame extends _MessageBase {

  game: Game;
}

export interface MessagePoll extends _MessageBase {

  poll: Poll;
}

export interface MessageInvoice extends _MessageBase {

  invoice: Invoice;
}

export interface MessageVenue extends _MessageBase {

  venue: Venue;
}

export interface MessageLocation extends _MessageBase {

  location: Location;
}

export interface MessageNewChatMembers extends _MessageBase {

  newChatMembers: User[];
}

export interface MessageLeftChatMember extends _MessageBase {

  leftChatMember: User;
}

export interface MessageNewChatTitle extends _MessageBase {

  newChatTitle: string;
}

export interface MessageNewChatPhoto extends _MessageBase {

  newChatPhoto: Photo;
}

export interface MessageDeletedChatPhoto extends _MessageBase {

  deletedChatPhoto: true;
}

export interface MessageGroupCreated extends _MessageBase {

  groupCreated: true;

  newChatMembers: User[];
}

export interface MessageSupergroupCreated extends _MessageBase {

  supergroupCreated: true;
}

export interface MessageChannelCreated extends _MessageBase {

  channelCreated: true;
}

export interface MessageAutoDeleteTimerChanged extends _MessageBase {

  newAutoDeleteTime: number;
}

export interface MessageChatMigratedTo extends _MessageBase {

  chatMigratedTo: number;
}

export interface MessageChatMigratedFrom extends _MessageBase {

  chatMigratedFrom: number;
}

export interface MessagePinnedMessage extends _MessageBase {

  pinnedMessage: Message;
}

export interface MessageUserShared extends _MessageBase {

  userShared: { requestId: number; userId: number };
}

export interface MessageWriteAccessAllowed extends _MessageBase {

  writeAccessAllowed: { miniAppName?: string };
}

export interface MessageForumTopicCreated extends _MessageBase {

  forumTopicCreated: { name: string; color: number; customEmojiId?: string };
}

export interface MessageForumTopicEdited extends _MessageBase {

  forumTopicEdited: { name: string; customEmojiId?: string };
}

export interface MessageForumTopicClosed extends _MessageBase {

  forumTopicClosed: true;
}

export interface MessageForumTopicReopened extends _MessageBase {

  forumTopicReopened: true;
}

export interface MessageVideoChatScheduled extends _MessageBase {

  videoChatScheduled: { startDate: number };
}

export interface MessageVideoChatStarted extends _MessageBase {

  videoChatStarted: true;
}

export interface MessageVideoChatEnded extends _MessageBase {

  videoChatEnded: { duration: number };
}

export interface MessageGiveaway extends _MessageBase {

  giveaway: Giveaway;
}

export interface MessageUnsupported extends _MessageBase {

  unsupported: true;
}

export interface MessageSuccessfulPayment extends _MessageBase {

  successfulPayment: SuccessfulPayment;
}

export interface MessageRefundedPayment extends _MessageBase {

  refundedPayment: RefundedPayment;
}

export interface MessageTypes {
  text: MessageText;
  link: MessageLink;
  photo: MessagePhoto;
  document: MessageDocument;
  video: MessageVideo;
  sticker: MessageSticker;
  animation: MessageAnimation;
  voice: MessageVoice;
  audio: MessageAudio;
  dice: MessageDice;
  videoNote: MessageVideoNote;
  contact: MessageContact;
  game: MessageGame;
  poll: MessagePoll;
  invoice: MessageInvoice;
  venue: MessageVenue;
  location: MessageLocation;
  newChatMembers: MessageNewChatMembers;
  leftChatMember: MessageLeftChatMember;
  newChatTitle: MessageNewChatTitle;
  newChatPhoto: MessageNewChatPhoto;
  deletedChatPhoto: MessageDeletedChatPhoto;
  groupCreated: MessageGroupCreated;
  supergroupCreated: MessageSupergroupCreated;
  channelCreated: MessageChannelCreated;
  newAutoDeleteTime: MessageAutoDeleteTimerChanged;
  chatMigratedTo: MessageChatMigratedTo;
  chatMigratedFrom: MessageChatMigratedFrom;
  pinnedMessage: MessagePinnedMessage;
  userShared: MessageUserShared;
  writeAccessAllowed: MessageWriteAccessAllowed;
  forumTopicCreated: MessageForumTopicCreated;
  forumTopicEdited: MessageForumTopicEdited;
  forumTopicClosed: MessageForumTopicClosed;
  forumTopicReopened: MessageForumTopicReopened;
  videoChatScheduled: MessageVideoChatScheduled;
  videoChatStarted: MessageVideoChatStarted;
  videoChatEnded: MessageVideoChatEnded;
  giveaway: MessageGiveaway;
  unsupported: MessageUnsupported;
  successfulPayment: MessageSuccessfulPayment;
  refundedPayment: MessageRefundedPayment;
}

const keys: Record<keyof MessageTypes, [string, ...string[]]> = {
  text: ["text"],
  link: ["linkPreview"],
  photo: ["photo"],
  document: ["document"],
  video: ["video"],
  sticker: ["sticker"],
  animation: ["animation"],
  voice: ["voice"],
  audio: ["audio"],
  dice: ["dice"],
  videoNote: ["videoNote"],
  contact: ["contact"],
  game: ["game"],
  poll: ["poll"],
  invoice: ["invoice"],
  venue: ["venue"],
  location: ["location"],
  newChatMembers: ["newChatMembers"],
  leftChatMember: ["leftChatMember"],
  newChatTitle: ["newChatTitle"],
  newChatPhoto: ["newChatPhoto"],
  deletedChatPhoto: ["deletedChatPhoto"],
  groupCreated: ["groupCreated", "newChatMembers"],
  supergroupCreated: ["supergroupCreated"],
  channelCreated: ["channelCreated"],
  newAutoDeleteTime: ["newAutoDeleteTime"],
  chatMigratedTo: ["chatMigratedTo"],
  chatMigratedFrom: ["chatMigratedFrom"],
  pinnedMessage: ["pinnedMessage"],
  userShared: ["userShared"],
  writeAccessAllowed: ["writeAccessAllowed"],
  forumTopicCreated: ["forumTopicCreated"],
  forumTopicEdited: ["forumTopicEdited"],
  forumTopicClosed: ["forumTopicClosed"],
  forumTopicReopened: ["forumTopicReopened"],
  videoChatScheduled: ["videoChatScheduled"],
  videoChatStarted: ["videoChatStarted"],
  videoChatEnded: ["videoChatEnded"],
  giveaway: ["giveaway"],
  unsupported: ["unsupported"],
  successfulPayment: ["successfulPayment"],
  refundedPayment: ["refundedPayment"],
};
export function isMessageType<T extends keyof MessageTypes>(message: Message, type: T): message is MessageTypes[T] {
  for (const key of keys[type]) {
    if (!(key in message) || message[key as keyof typeof message] === undefined) {
      return false;
    }
  }
  return true;
}
export function assertMessageType<T extends keyof MessageTypes>(message: Message, type: T): MessageTypes[T] {
  if (!isMessageType(message, type)) {
    unreachable();
  }
  return message;
}

export type Message =
  | MessageText
  | MessageLink
  | MessagePhoto
  | MessageDocument
  | MessageVideo
  | MessageSticker
  | MessageAnimation
  | MessageVoice
  | MessageAudio
  | MessageDice
  | MessageVideoNote
  | MessageContact
  | MessageGame
  | MessagePoll
  | MessageInvoice
  | MessageVenue
  | MessageLocation
  | MessageNewChatMembers
  | MessageLeftChatMember
  | MessageNewChatTitle
  | MessageNewChatPhoto
  | MessageDeletedChatPhoto
  | MessageGroupCreated
  | MessageSupergroupCreated
  | MessageChannelCreated
  | MessageAutoDeleteTimerChanged
  | MessageChatMigratedTo
  | MessageChatMigratedFrom
  | MessagePinnedMessage
  | MessageUserShared
  | MessageWriteAccessAllowed
  | MessageForumTopicCreated
  | MessageForumTopicEdited
  | MessageForumTopicClosed
  | MessageForumTopicReopened
  | MessageVideoChatScheduled
  | MessageVideoChatStarted
  | MessageVideoChatEnded
  | MessageGiveaway
  | MessageUnsupported
  | MessageSuccessfulPayment
  | MessageRefundedPayment;

export interface MessageGetter {
  (chatId: number, messageId: number): MaybePromise<Message | null>;
}

type Message_MessageGetter = MessageGetter | null;

function getSender(message_: Api.message | Api.messageService, getPeer: PeerGetter) {
  const peer = message_.from_id ?? message_.peer_id;
  if (Api.isOneOf(["peerChannel", "peerUser"], peer)) {
    const peer_ = getPeer(peer);
    if (peer_) {
      return { from: peer_[0] };
    } else {
      unreachable();
    }
  } else {
    unreachable();
  }
}

async function getReply(message_: Api.message | Api.messageService, chat: ChatP, getMessage: Message_MessageGetter) {
  if (getMessage && Api.is("messageReplyHeader", message_.reply_to) && message_.reply_to.reply_to_msg_id) {
    let isTopicMessage = false;
    if (message_.reply_to.forum_topic) {
      isTopicMessage = true;
    }
    const replyToMessage = await getMessage(chat.id, message_.reply_to.reply_to_msg_id);
    if (replyToMessage) {
      return { replyToMessage, threadId: message_.reply_to.reply_to_top_id, isTopicMessage };
    } else {
      L.warning("couldn't get replied message");
    }
  }

  return { replyToMessage: undefined, threadId: undefined, isTopicMessage: false };
}

async function constructServiceMessage(message_: Api.messageService, chat: ChatP, getPeer: PeerGetter, getMessage: Message_MessageGetter, getReply_: boolean): Promise<Message> {
  const message: _MessageBase = {
    isOutgoing: message_.out ?? false,
    id: message_.id,
    chat,
    date: message_.date,
    isTopicMessage: message_.reply_to && Api.is("messageReplyHeader", message_.reply_to) && message_.reply_to.forum_topic ? true : false,
    ...getSender(message_, getPeer),
  };

  if (Api.is("messageReplyHeader", message_.reply_to) && message_.reply_to.reply_to_msg_id) {
    message.replyToMessageId = message_.reply_to.reply_to_top_id;
    message.replyToMessageId = message_.reply_to.reply_to_msg_id;
  }
  if (getReply_) {
    Object.assign(message, await getReply(message_, chat, getMessage));
  }

  if (Api.is("messageActionChatAddUser", message_.action) || Api.is("messageActionChatJoinedByLink", message_.action) || Api.is("messageActionChatJoinedByRequest", message_.action)) {
    const newChatMembers = new Array<User>();
    const users = "users" in message_.action ? message_.action.users : [message_.from_id && "user_id" in message_.from_id ? message_.from_id.user_id : unreachable()];
    for (const user_ of users) {
      const peer = getPeer({ _: "peerUser", user_id: user_ });
      if (peer && isChatPUser(peer[0])) {
        const user = constructUser2(peer[0]);
        newChatMembers.push(user);
      } else {
        unreachable();
      }
    }
    return { ...message, newChatMembers };
  } else if (Api.is("messageActionChatDeleteUser", message_.action)) {
    const peer = getPeer({ _: "peerUser", user_id: message_.action.user_id });
    if (peer) {
      const user = constructUser2(peer[0]);
      const leftChatMember = user;
      return { ...message, leftChatMember };
    }
  } else if (Api.is("messageActionChatEditTitle", message_.action)) {
    const newChatTitle = message_.action.title;
    return { ...message, newChatTitle };
  } else if (Api.is("messageActionChatEditPhoto", message_.action)) {
    const newChatPhoto = constructPhoto(Api.as("photo", message_.action.photo));
    return { ...message, newChatPhoto };
  } else if (Api.is("messageActionChatDeletePhoto", message_.action)) {
    const deletedChatPhoto = true;
    return { ...message, deletedChatPhoto };
  } else if (Api.is("messageActionChatCreate", message_.action)) {
    const groupCreated = true;
    const newChatMembers = new Array<User>();
    for (const user_ of message_.action.users) {
      const peer = getPeer({ _: "peerUser", user_id: user_ });
      if (peer) {
        const user = constructUser2(peer[0]);
        newChatMembers.push(user);
      }
    }
    return { ...message, groupCreated, newChatMembers };
  } else if (Api.is("messageActionChannelCreate", message_.action)) {
    if (message.chat.type === "channel") {
      const channelCreated = true;
      return { ...message, channelCreated };
    } else if (message.chat.type === "supergroup") {
      const supergroupCreated = true;
      return { ...message, supergroupCreated };
    } else {

    }
  } else if (Api.is("messageActionChatMigrateTo", message_.action)) {
    const chatMigratedTo = ZERO_CHANNEL_ID + Number(-message_.action.channel_id);
    return { ...message, chatMigratedTo };
  } else if (Api.is("messageActionChannelMigrateFrom", message_.action)) {
    const chatMigratedFrom = Number(-message_.action.chat_id);
    return { ...message, chatMigratedFrom };
  } else if (Api.is("messageActionPinMessage", message_.action)) {
    const { replyToMessage } = await getReply(message_, chat, getMessage);
    if (replyToMessage) {
      const pinnedMessage = replyToMessage;
      return { ...message, pinnedMessage };
    }
  } else if (Api.is("messageActionRequestedPeer", message_.action)) {
    const user = Api.as("peerUser", message_.action.peers[0]);
    const userShared = { requestId: message_.action.button_id, userId: Number(user.user_id) };
    return { ...message, userShared };
  } else if (Api.is("messageActionBotAllowed", message_.action)) {
    const miniAppName = message_.action.app ? Api.as("botApp", message_.action.app).title : undefined;
    const writeAccessAllowed = { miniAppName };
    return { ...message, writeAccessAllowed };
  } else if (Api.is("messageActionTopicCreate", message_.action)) {
    const forumTopicCreated = {
      name: message_.action.title,
      color: message_.action.icon_color,
      cutsomEmojiId: message_.action.icon_emoji_id ? String(message_.action.icon_emoji_id) : undefined,
    };
    return { ...message, forumTopicCreated };
  } else if (Api.is("messageActionTopicEdit", message_.action)) {
    if (message_.action.closed) {
      const forumTopicClosed = true;
      return { ...message, forumTopicClosed };
    } else if (message_.action.title || message_.action.icon_emoji_id) {
      const forumTopicEdited = {
        name: message_.action.title ?? "",
        customEmojiId: message_.action.icon_emoji_id ? String(message_.action.icon_emoji_id) : undefined,
      };
      return { ...message, forumTopicEdited };
    } else {
      const forumTopicReopened = true;
      return { ...message, forumTopicReopened };
    }
  } else if (Api.is("messageActionGroupCallScheduled", message_.action)) {
    const videoChatScheduled = { startDate: message_.action.schedule_date };
    return { ...message, videoChatScheduled };
  } else if (Api.is("messageActionGroupCall", message_.action)) {
    if (message_.action.duration) {
      const videoChatEnded = { duration: message_.action.duration };

      return { ...message, videoChatEnded };
    } else {
      const videoChatStarted = true;
      return { ...message, videoChatStarted };
    }
  } else if (Api.is("messageActionSetMessagesTTL", message_.action)) {
    const newAutoDeleteTime = message_.action.period || 0;
    return { ...message, newAutoDeleteTime };
  } else if (Api.is("messageActionPaymentSentMe", message_.action)) {
    const successfulPayment = constructSuccessfulPayment(message_.action);
    return { ...message, successfulPayment };
  } else if (Api.is("messageActionPaymentRefunded", message_.action)) {
    const refundedPayment = constructRefundedPayment(message_.action);
    return { ...message, refundedPayment };
  }
  return { ...message, unsupported: true };
}

export async function constructMessage(
  message_: Api.Message,
  getPeer: PeerGetter,
  getMessage: Message_MessageGetter,
  getStickerSetName: StickerSetNameGetter,
  getReply_ = true,
  business?: { connectionId: string; replyToMessage?: Api.Message },
  poll?: Api.poll,
  pollResults?: Api.pollResults,
): Promise<Message> {
  if (!(Api.is("message", message_)) && !(Api.is("messageService", message_))) {
    unreachable();
  }

  let link: string | undefined;
  const chat_: ChatP | null = getPeer(message_.peer_id)?.[0] ?? null;
  if (chat_ === null) {
    unreachable();
  }

  if (Api.is("peerChannel", message_.peer_id)) {
    const reply_to_top_id = message_.reply_to && Api.is("messageReplyHeader", message_.reply_to) && message_.reply_to.reply_to_top_id;
    const threadId = reply_to_top_id && typeof reply_to_top_id === "number" ? reply_to_top_id + "/" : "";
    link = `https:
    if ("username" in chat_ && chat_.username) {
      link = link.replace(`/c/${message_.peer_id.channel_id}/`, `/${chat_.username}/`);
    }
  }

  if (Api.is("messageService", message_)) {
    return constructServiceMessage(message_, chat_, getPeer, getMessage, getReply_);
  }

  const message: _MessageBase = {
    isOutgoing: message_.out ?? false,
    id: message_.id,
    chat: chat_,
    link,
    date: message_.date,
    views: message_.views,
    forwards: message_.forwards,
    isTopicMessage: message_.reply_to && Api.is("messageReplyHeader", message_.reply_to) && message_.reply_to.forum_topic ? true : false,
    hasProtectedContent: message_.noforwards || false,
    senderBoostCount: message_.from_boosts_applied,
    effectId: message_.effect ? String(message_.effect) : undefined,
    scheduled: message_.from_scheduled ? true : undefined,
    ...await getSender(message_, getPeer),
  };

  if (message_.reactions) {
    const recentReactions = message_.reactions.recent_reactions ?? [];
    message.reactions = message_.reactions.results.map((v) => constructMessageReaction(v, recentReactions));
  }

  if (Api.is("messageReplyHeader", message_.reply_to) && message_.reply_to.reply_to_msg_id) {
    if (message_.reply_to.quote) {
      message.replyQuote = constructReplyQuote(message_.reply_to.quote_text, message_.reply_to.quote_offset, message_.reply_to.quote_entities);
    }
    message.threadId = message_.reply_to.reply_to_top_id;
    message.replyToMessageId = message_.reply_to.reply_to_msg_id;
  }
  if (business) {
    message.businessConnectionId = business.connectionId;
    if (business.replyToMessage) {
      message.replyToMessageId = business.replyToMessage.id;
      message.replyToMessage = await constructMessage(business.replyToMessage, getPeer, getMessage, getStickerSetName, false, { connectionId: business.connectionId });
    }
  } else if (getReply_) {
    Object.assign(message, await getReply(message_, chat_, getMessage));
  }

  if (message_.reply_markup) {
    message.replyMarkup = constructReplyMarkup(message_.reply_markup);
  }

  if (message_.via_bot_id !== undefined) {
    const peer = getPeer({ _: "peerUser", user_id: message_.via_bot_id });
    if (peer) {
      message.viaBot = constructUser2(peer[0]);
    } else {
      unreachable();
    }
  }
  if (message_.via_business_bot_id !== undefined) {
    const peer = getPeer({ _: "peerUser", user_id: message_.via_business_bot_id });
    if (peer) {
      message.viaBusinessBot = constructUser2(peer[0]);
    } else {
      unreachable();
    }
  }

  if (message_.post_author !== undefined) {
    message.authorSignature = message_.post_author;
  }

  if (Api.is("messageFwdHeader", message_.fwd_from)) {
    message.isAutomaticForward = message_.fwd_from.saved_from_peer !== undefined && message_.fwd_from.saved_from_msg_id !== undefined;
    message.forwardFrom = constructForwardHeader(message_.fwd_from, getPeer);
  }

  if (message_.grouped_id !== undefined) {
    message.mediaGroupId = String(message_.grouped_id);
  }

  if (message_.edit_date) {
    message.editDate = message_.edit_date;
  }

  const messageText = {
    ...message,
    text: message_.message,
    entities: message_.entities?.map(constructMessageEntity).filter((v): v is NonNullable<typeof v> => !!v) ?? [],
  };

  if (message_.message && message_.media === undefined) {
    return cleanObject(messageText);
  }

  const messageMedia: _MessageMediaBase = {
    ...message,
    caption: message_.message,
    captionEntities: message_.entities?.map(constructMessageEntity).filter((v): v is NonNullable<typeof v> => !!v) ?? [],
  };

  if (message_.media && "ttl_seconds" in message_.media && typeof message_.media.ttl_seconds === "number") {
    messageMedia.selfDestruct = constructSelfDestructOption(message_.media.ttl_seconds);
  }

  if (Api.is("messageMediaPhoto", message_.media) || Api.is("messageMediaDocument", message_.media)) {
    messageMedia.hasMediaSpoiler = message_.media.spoiler || false;
  }

  let m: Message | null = null;

  if (Api.is("messageMediaPhoto", message_.media)) {
    if (!message_.media.photo) {
      unreachable();
    }
    const photo = constructPhoto(Api.as("photo", message_.media.photo));
    m = { ...messageMedia, photo };
  } else if (Api.is("messageMediaDice", message_.media)) {
    const dice = constructDice(message_.media);
    m = { ...message, dice };
  } else if (Api.is("messageMediaDocument", message_.media)) {
    const { document } = message_.media;
    if (Api.is("document", document)) {
      const getFileId = (type: FileType): FileId => (
        {
          type,
          dcId: document.dc_id,
          fileReference: document.file_reference,
          location: { type: "common", id: document.id, accessHash: document.access_hash },
        }
      );

      const animated = document.attributes.find((v): v is Api.documentAttributeAnimated => Api.is("documentAttributeAnimated", v));
      const audio = document.attributes.find((v): v is Api.documentAttributeAudio => Api.is("documentAttributeAudio", v));
      const fileName = document.attributes.find((v): v is Api.documentAttributeFilename => Api.is("documentAttributeFilename", v));
      const sticker = document.attributes.find((v): v is Api.documentAttributeSticker => Api.is("documentAttributeSticker", v));
      const video = document.attributes.find((v): v is Api.documentAttributeVideo => Api.is("documentAttributeVideo", v));

      if (animated) {
        const fileId = getFileId(FileType.Animation);
        const animation = constructAnimation(document, video, fileName, serializeFileId(fileId), toUniqueFileId(fileId));
        m = { ...messageMedia, animation };
      } else if (video) {
        if (video.round_message) {
          const fileId = getFileId(FileType.VideoNote);
          const videoNote = constructVideoNote(document, video, serializeFileId(fileId), toUniqueFileId(fileId));
          m = { ...message, videoNote };
        } else {
          const fileId = getFileId(FileType.Video);
          const video_ = constructVideo(document, video, fileName?.file_name, serializeFileId(fileId), toUniqueFileId(fileId));
          m = { ...messageMedia, video: video_ };
        }
      } else if (audio) {
        if (audio.voice) {
          const fileId = getFileId(FileType.VoiceNote);
          const voice = constructVoice(document, audio, serializeFileId(fileId), toUniqueFileId(fileId));
          m = { ...messageMedia, voice };
        } else {
          const fileId = getFileId(FileType.Audio);
          const audio_ = constructAudio(document, audio, serializeFileId(fileId), toUniqueFileId(fileId));
          m = { ...messageMedia, audio: audio_ };
        }
      } else if (sticker) {
        const fileId = getFileId(FileType.Sticker);
        const sticker = await constructSticker(document, serializeFileId(fileId), toUniqueFileId(fileId), getStickerSetName);
        m = { ...message, sticker };
      } else {
        const fileId = getFileId(FileType.Document);
        const document_ = constructDocument(document, fileName ?? ({ _: "documentAttributeFilename", file_name: "Unknown" }), serializeFileId(fileId), toUniqueFileId(fileId));
        m = { ...messageMedia, document: document_ };
      }
    }
  } else if (Api.is("messageMediaContact", message_.media)) {
    const contact = constructContact(message_.media);
    m = { ...messageMedia, contact };
  } else if (Api.is("messageMediaGame", message_.media)) {
    const game = constructGame(message_.media);
    m = { ...message, game };
  } else if (Api.is("messageMediaPoll", message_.media)) {
    if (poll) {
      message_.media.poll = poll;
    }
    if (pollResults) {
      message_.media.results = pollResults;
    }
    const poll_ = constructPoll(message_.media);
    m = { ...message, poll: poll_ };
  } else if (Api.is("messageMediaVenue", message_.media)) {
    const venue = constructVenue(message_.media);
    m = { ...message, venue };
  } else if (Api.is("messageMediaGeo", message_.media) || Api.is("messageMediaGeoLive", message_.media)) {
    const location = constructLocation(message_.media);
    m = { ...message, location };
  } else if (Api.is("messageMediaWebPage", message_.media)) {
    const linkPreview = constructLinkPreview(message_.media, message_.invert_media, getPeer);
    if (message_.message) {
      m = { ...messageText, linkPreview };
    } else {
      m = { ...message, linkPreview: { ...linkPreview, url: linkPreview.url ? linkPreview.url : unreachable() } };
    }
  } else if (Api.is("messageMediaGiveaway", message_.media)) {
    const giveaway = constructGiveaway(message_.media);
    m = { ...message, giveaway };
  } else if (Api.is("messageMediaInvoice", message_.media)) {
    const invoice = constructInvoice(message_.media);
    m = { ...message, invoice };
  }

  if (m === null) {
    const unsupported = true;
    m = { ...message, unsupported };
  }

  return cleanObject(m);
}
