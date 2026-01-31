import { cleanObject } from "../1_utilities.ts";
import type { Api } from "../2_tl.ts";
import { type ChatP, constructChatP, type PeerGetter } from "./1_chat_p.ts";
import { constructMessageEntity, type MessageEntity } from "./2_message_entity.ts";
import { constructGift, type Gift } from "./4_gift.ts";

export interface ClaimedGift {

  date: number;

  gift: Gift;

  public: boolean;

  sender?: ChatP;

  message?: string;

  entities?: MessageEntity[];

  messageId?: number;

  convertionStars?: number;
}

export function constructClaimedGift(savedStarGift: Api.SavedStarGift, fromPeer: Api.User | Api.Chat | undefined, getPeer: PeerGetter): ClaimedGift {
  const gift = constructGift(savedStarGift.gift, getPeer);
  const date = savedStarGift.date;
  const public_ = !!savedStarGift.unsaved;
  const sender = fromPeer ? constructChatP(fromPeer) : undefined;
  const message = savedStarGift.message?.text;
  const entities = savedStarGift.message ? savedStarGift.message.entities.map(constructMessageEntity).filter((v): v is MessageEntity => !!v) : undefined;
  const messageId = savedStarGift.msg_id;
  const conversionStars = savedStarGift.convert_stars;
  return cleanObject({
    date,
    gift,
    public: public_,
    sender,
    message,
    entities,
    messageId,
    conversionStars,
  });
}
