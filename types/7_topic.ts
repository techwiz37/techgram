import { unreachable } from "../0_deps.ts";
import { cleanObject } from "../1_utilities.ts";
import type { ChatP } from "./1_chat_p.ts";
import type { Message, MessageForumTopicCreated, MessageForumTopicEdited } from "./6_message.ts";

export interface Topic {
  id: number;
  date: number;
  creator: ChatP;
  isGeneral: boolean;
  isClosed: boolean;
  isHidden: boolean;
  name: string;
  color: number;
  customEmojiId?: string;
}

export function constructTopic(message: Message): Topic {
  let forumTopicCreated: MessageForumTopicCreated | undefined;
  let forumTopicEdited: MessageForumTopicEdited | undefined;
  if ("forumTopicCreated" in message) {
    forumTopicCreated = message;
  } else if (message.replyToMessage && "forumTopicCreated" in message.replyToMessage) {
    forumTopicCreated = message.replyToMessage;
  } else {
    unreachable();
  }
  if ("forumTopicEdited" in message) {
    forumTopicEdited = message;
  }
  const id = forumTopicCreated.id;
  const date = forumTopicCreated.date;
  const creator = forumTopicCreated.from ? forumTopicCreated.from : message.from;
  const isGeneral = forumTopicCreated.id === 1;
  const isClosed = false;
  const isHidden = false;
  let name = forumTopicCreated.forumTopicCreated.name;
  const color = forumTopicCreated.forumTopicCreated.color;
  let customEmoijId = forumTopicCreated.forumTopicCreated.customEmojiId;
  if (forumTopicEdited) {
    name = forumTopicEdited.forumTopicEdited.name;
    customEmoijId = forumTopicEdited.forumTopicEdited.customEmojiId;
  }
  return cleanObject({
    id,
    date,
    creator: creator!,
    isGeneral,
    isClosed,
    isHidden,
    name,
    color,
    customEmoijId,
  });
}
