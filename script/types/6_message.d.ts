import { type MaybePromise } from "../1_utilities.js";
import { Api } from "../2_tl.js";
import { type Contact } from "./0_contact.js";
import { type Dice } from "./0_dice.js";
import { type Invoice } from "./0_invoice.js";
import { type Location } from "./0_location.js";
import { type RefundedPayment } from "./0_refunded_payment.js";
import { type SelfDestructOption } from "./0_self_destruct_option.js";
import { type Voice } from "./0_voice.js";
import { type Animation } from "./1_animation.js";
import { type Audio } from "./1_audio.js";
import { type ChatP, type PeerGetter } from "./1_chat_p.js";
import { type Document } from "./1_document.js";
import { type Giveaway } from "./1_giveaway.js";
import { type MessageReaction } from "./1_message_reaction.js";
import { type Photo } from "./1_photo.js";
import { type Sticker, type StickerSetNameGetter } from "./1_sticker.js";
import { type Venue } from "./1_venue.js";
import { type VideoNote } from "./1_video_note.js";
import { type Video } from "./1_video.js";
import { type MessageEntity } from "./2_message_entity.js";
import { type ReplyMarkup } from "./2_reply_markup.js";
import { type SuccessfulPayment } from "./2_successful_payment.js";
import { type User } from "./2_user.js";
import { type ForwardHeader } from "./3_forward_header.js";
import { type Game } from "./3_game.js";
import { type ReplyQuote } from "./3_reply_quote.js";
import { type Poll } from "./4_poll.js";
import { type LinkPreview } from "./5_link_preview.js";
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
    linkPreview: LinkPreview & {
        url: NonNullable<LinkPreview["url"]>;
    };
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
    userShared: {
        requestId: number;
        userId: number;
    };
}
export interface MessageWriteAccessAllowed extends _MessageBase {
    writeAccessAllowed: {
        miniAppName?: string;
    };
}
export interface MessageForumTopicCreated extends _MessageBase {
    forumTopicCreated: {
        name: string;
        color: number;
        customEmojiId?: string;
    };
}
export interface MessageForumTopicEdited extends _MessageBase {
    forumTopicEdited: {
        name: string;
        customEmojiId?: string;
    };
}
export interface MessageForumTopicClosed extends _MessageBase {
    forumTopicClosed: true;
}
export interface MessageForumTopicReopened extends _MessageBase {
    forumTopicReopened: true;
}
export interface MessageVideoChatScheduled extends _MessageBase {
    videoChatScheduled: {
        startDate: number;
    };
}
export interface MessageVideoChatStarted extends _MessageBase {
    videoChatStarted: true;
}
export interface MessageVideoChatEnded extends _MessageBase {
    videoChatEnded: {
        duration: number;
    };
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
export declare function isMessageType<T extends keyof MessageTypes>(message: Message, type: T): message is MessageTypes[T];
export declare function assertMessageType<T extends keyof MessageTypes>(message: Message, type: T): MessageTypes[T];
export type Message = MessageText | MessageLink | MessagePhoto | MessageDocument | MessageVideo | MessageSticker | MessageAnimation | MessageVoice | MessageAudio | MessageDice | MessageVideoNote | MessageContact | MessageGame | MessagePoll | MessageInvoice | MessageVenue | MessageLocation | MessageNewChatMembers | MessageLeftChatMember | MessageNewChatTitle | MessageNewChatPhoto | MessageDeletedChatPhoto | MessageGroupCreated | MessageSupergroupCreated | MessageChannelCreated | MessageAutoDeleteTimerChanged | MessageChatMigratedTo | MessageChatMigratedFrom | MessagePinnedMessage | MessageUserShared | MessageWriteAccessAllowed | MessageForumTopicCreated | MessageForumTopicEdited | MessageForumTopicClosed | MessageForumTopicReopened | MessageVideoChatScheduled | MessageVideoChatStarted | MessageVideoChatEnded | MessageGiveaway | MessageUnsupported | MessageSuccessfulPayment | MessageRefundedPayment;
export interface MessageGetter {
    (chatId: number, messageId: number): MaybePromise<Message | null>;
}
type Message_MessageGetter = MessageGetter | null;
export declare function constructMessage(message_: Api.Message, getPeer: PeerGetter, getMessage: Message_MessageGetter, getStickerSetName: StickerSetNameGetter, getReply_?: boolean, business?: {
    connectionId: string;
    replyToMessage?: Api.Message;
}, poll?: Api.poll, pollResults?: Api.pollResults): Promise<Message>;
export {};
//# sourceMappingURL=6_message.d.ts.map