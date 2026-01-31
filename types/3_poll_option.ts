import type { Api } from "../2_tl.ts";
import { constructMessageEntity, type MessageEntity } from "./2_message_entity.ts";

export interface PollOption {

  text: string;

  entities: MessageEntity[];

  voterCount: number;

  isChosen: boolean;
}

export function constructPollOption(option: Api.PollAnswer, results: Array<Api.PollAnswerVoters>): PollOption {
  const result = results.find((v) => v.option.every((v, i) => option.option[i] === v));
  return {
    text: option.text.text,
    entities: option.text.entities?.map(constructMessageEntity).filter((v): v is MessageEntity => v !== null),
    voterCount: result?.voters ?? 0,
    isChosen: result?.chosen ?? false,
  };
}
