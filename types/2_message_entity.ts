import { unreachable } from "../0_deps.ts";
import { cleanObject } from "../1_utilities.ts";
import { Api } from "../2_tl.ts";
import type { PeerGetter } from "./1_chat_p.ts";

export type MessageEntityType =
  | "mention"
  | "hashtag"
  | "botCommand"
  | "url"
  | "email"
  | "bold"
  | "italic"
  | "code"
  | "pre"
  | "textLink"
  | "textMention"
  | "cashtag"
  | "phoneNumber"
  | "underline"
  | "strikethrough"
  | "blockquote"
  | "bankCard"
  | "spoiler"
  | "customEmoji";

export interface _MessageEntityBase {
  type: MessageEntityType;
  offset: number;
  length: number;
}

export interface MessageEntityMention extends _MessageEntityBase {

  type: "mention";
}

export interface MessageEntityHashtag extends _MessageEntityBase {

  type: "hashtag";
}

export interface MessageEntityBotCommand extends _MessageEntityBase {

  type: "botCommand";
}

export interface MessageEntityURL extends _MessageEntityBase {

  type: "url";
}

export interface MessageEntityEmailAddress extends _MessageEntityBase {

  type: "email";
}

export interface MessageEntityBold extends _MessageEntityBase {

  type: "bold";
}

export interface MessageEntityItalic extends _MessageEntityBase {

  type: "italic";
}

export interface MessageEntityPre extends _MessageEntityBase {

  type: "pre";

  language: string;
}

export interface MessageEntityCode extends _MessageEntityBase {

  type: "code";
}

export interface MessageEntityTextLink extends _MessageEntityBase {

  type: "textLink";

  url: string;
}

export interface MessageEntityTextMention extends _MessageEntityBase {

  type: "textMention";

  userId: number;
}

export interface MessageEntityCashtag extends _MessageEntityBase {

  type: "cashtag";
}

export interface MessageEntityPhoneNumber extends _MessageEntityBase {

  type: "phoneNumber";
}

export interface MessageEntityUnderline extends _MessageEntityBase {

  type: "underline";
}

export interface MessageEntityStrikethrough extends _MessageEntityBase {

  type: "strikethrough";
}

export interface MessageEntityBlockquote extends _MessageEntityBase {

  type: "blockquote";
  collapsible?: true;
}

export interface MessageEntityBankCard extends _MessageEntityBase {

  type: "bankCard";
}

export interface MessageEntitySpoiler extends _MessageEntityBase {

  type: "spoiler";
}

export interface MessageEntityCustomEmoji extends _MessageEntityBase {

  type: "customEmoji";

  customEmojiId: string;
}

export type MessageEntity =
  | MessageEntityMention
  | MessageEntityHashtag
  | MessageEntityBotCommand
  | MessageEntityURL
  | MessageEntityEmailAddress
  | MessageEntityBold
  | MessageEntityItalic
  | MessageEntityCode
  | MessageEntityPre
  | MessageEntityTextLink
  | MessageEntityTextMention
  | MessageEntityCashtag
  | MessageEntityPhoneNumber
  | MessageEntityUnderline
  | MessageEntityStrikethrough
  | MessageEntityBlockquote
  | MessageEntityBankCard
  | MessageEntitySpoiler
  | MessageEntityCustomEmoji;

export function constructMessageEntity(obj: Api.MessageEntity): MessageEntity | null {
  if (Api.is("messageEntityMention", obj)) {
    return { type: "mention", offset: obj.offset, length: obj.length };
  } else if (Api.is("messageEntityHashtag", obj)) {
    return { type: "hashtag", offset: obj.offset, length: obj.length };
  } else if (Api.is("messageEntityBotCommand", obj)) {
    return { type: "botCommand", offset: obj.offset ?? 0, length: obj.length };
  } else if (Api.is("messageEntityUrl", obj)) {
    return { type: "url", offset: obj.offset, length: obj.length };
  } else if (Api.is("messageEntityEmail", obj)) {
    return { type: "email", offset: obj.offset, length: obj.length };
  } else if (Api.is("messageEntityBold", obj)) {
    return { type: "bold", offset: obj.offset, length: obj.length };
  } else if (Api.is("messageEntityItalic", obj)) {
    return { type: "italic", offset: obj.offset, length: obj.length };
  } else if (Api.is("messageEntityCode", obj)) {
    return { type: "code", offset: obj.offset, length: obj.length };
  } else if (Api.is("messageEntityPre", obj)) {
    return { type: "pre", offset: obj.offset, length: obj.length, language: obj.language };
  } else if (Api.is("messageEntityTextUrl", obj)) {
    return { type: "textLink", offset: obj.offset, length: obj.length, url: obj.url };
  } else if (Api.is("messageEntityMentionName", obj)) {
    return { type: "textMention", offset: obj.offset, length: obj.length, userId: Number(obj.user_id) };
  } else if (Api.is("messageEntityCashtag", obj)) {
    return { type: "cashtag", offset: obj.offset, length: obj.length };
  } else if (Api.is("messageEntityPhone", obj)) {
    return { type: "phoneNumber", offset: obj.offset, length: obj.length };
  } else if (Api.is("messageEntityUnderline", obj)) {
    return { type: "underline", offset: obj.offset, length: obj.length };
  } else if (Api.is("messageEntityStrike", obj)) {
    return { type: "strikethrough", offset: obj.offset, length: obj.length };
  } else if (Api.is("messageEntityBlockquote", obj)) {
    return cleanObject({ type: "blockquote", offset: obj.offset, length: obj.length, collapsible: obj.collapsed ? true : undefined } as const);
  } else if (Api.is("messageEntityBankCard", obj)) {
    return { type: "bankCard", offset: obj.offset, length: obj.length };
  } else if (Api.is("messageEntitySpoiler", obj)) {
    return { type: "spoiler", offset: obj.offset, length: obj.length };
  } else if (Api.is("messageEntityCustomEmoji", obj)) {
    return { type: "customEmoji", offset: obj.offset, length: obj.length, customEmojiId: String(obj.document_id) };
  } else {
    return null;
  }
}

export function messageEntityToTlObject(entity: MessageEntity, getPeer: PeerGetter): Api.MessageEntity {
  const { offset, length } = entity;
  switch (entity.type) {
    case "mention":
      return { _: "messageEntityMention", offset, length };
    case "hashtag":
      return { _: "messageEntityHashtag", offset, length };
    case "botCommand":
      return { _: "messageEntityBotCommand", offset, length };
    case "url":
      return { _: "messageEntityUrl", offset, length };
    case "email":
      return { _: "messageEntityEmail", offset, length };
    case "bold":
      return { _: "messageEntityBold", offset, length };
    case "italic":
      return { _: "messageEntityItalic", offset, length };
    case "code":
      return { _: "messageEntityCode", offset, length };
    case "pre":
      return { _: "messageEntityPre", offset, length, language: entity.language };
    case "textLink": {
      try {
        const url = new URL(entity.url);
        if (url.protocol === "tg:" && url.hostname === "user" && (url.pathname === "/" || url.pathname === "")) {
          const id = Number(url.searchParams.get("id"));
          if (!isNaN(id)) {
            const peer = getPeer({ _: "peerUser", user_id: BigInt(id) });
            if (!peer) {
              unreachable();
            }
            return { _: "inputMessageEntityMentionName", offset, length, user_id: ({ _: "inputUser", user_id: BigInt(peer[0].id), access_hash: peer[1] }) };
          }
        }
      } catch {

      }
      return { _: "messageEntityTextUrl", offset, length, url: entity.url };
    }
    case "textMention": {
      const peer = getPeer({ _: "peerUser", user_id: BigInt(entity.userId) });
      if (!peer) {
        unreachable();
      }
      return { _: "inputMessageEntityMentionName", offset, length, user_id: ({ _: "inputUser", user_id: BigInt(peer[0].id), access_hash: peer[1] }) };
    }
    case "cashtag":
      return { _: "messageEntityCashtag", offset, length };
    case "phoneNumber":
      return { _: "messageEntityPhone", offset, length };
    case "underline":
      return { _: "messageEntityUnderline", offset, length };
    case "strikethrough":
      return { _: "messageEntityStrike", offset, length };
    case "blockquote":
      return { _: "messageEntityBlockquote", offset, length, collapsed: entity.collapsible };
    case "bankCard":
      return { _: "messageEntityBankCard", offset, length };
    case "spoiler":
      return { _: "messageEntitySpoiler", offset, length };
    case "customEmoji":
      return { _: "messageEntityCustomEmoji", offset, length, document_id: BigInt(entity.customEmojiId) };
  }
}

const priorities: Record<MessageEntityType, number> = {
  "mention": 50,
  "hashtag": 50,
  "botCommand": 50,
  "url": 50,
  "email": 50,
  "bold": 90,
  "italic": 91,
  "code": 20,
  "pre": 11,
  "textLink": 49,
  "textMention": 49,
  "cashtag": 50,
  "phoneNumber": 50,
  "underline": 92,
  "strikethrough": 93,
  "blockquote": 0,
  "bankCard": 50,
  "spoiler": 94,
  "customEmoji": 99,
};
export function sortMessageEntities(entities: MessageEntity[]): MessageEntity[] {
  return entities.sort(({ offset, type, length }, other) => {
    if (offset !== other.offset) {
      return offset < other.offset ? -1 : 1;
    }
    if (length !== other.length) {
      return length > other.length ? -1 : 1;
    }
    const priority = priorities[type];
    const otherPriority = priorities[other.type];
    return priority < otherPriority ? -1 : 1;
  });
}
