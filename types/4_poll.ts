import { cleanObject } from "../1_utilities.ts";
import type { Api } from "../2_tl.ts";
import { constructMessageEntity, type MessageEntity } from "./2_message_entity.ts";
import { constructPollOption, type PollOption } from "./3_poll_option.ts";

export interface Poll {

  id: string;

  question: string;

  questionEntities: MessageEntity[];

  options: PollOption[];

  totalVoterCount: number;

  isClosed: boolean;

  isAnonymous: boolean;

  type: "regular" | "quiz";

  allowMultipleAnswers?: boolean;

  correctOptionIndex?: number;

  explanation?: string;

  explanationEntities?: MessageEntity[];

  openPeriod?: number;

  closeDate?: number;
}

export function constructPoll(media_: Api.messageMediaPoll): Poll {
  const poll = media_.poll;
  const correctOption = media_.results.results?.find((v) => v.correct)?.option;
  const correctOptionIndex = correctOption !== undefined ? poll.answers.findIndex((v) => v.option.every((v, i) => correctOption[i] === v)) : undefined;
  return cleanObject({
    id: String(poll.id),
    question: poll.question.text,
    questionEntities: poll.question.entities.map(constructMessageEntity).filter((v): v is MessageEntity => v !== null),
    options: poll.answers.map((v) => constructPollOption(v, media_.results.results ?? [])),
    totalVoterCount: media_.results.total_voters ?? 0,
    isClosed: poll.closed || false,
    isAnonymous: !poll.public_voters,
    type: poll.quiz ? "quiz" : "regular",
    allowMultipleAnswers: poll.quiz ? undefined : poll.multiple_choice || false,
    correctOptionIndex,
    explanation: media_.results.solution,
    explanationEntities: media_.results.solution_entities?.map(constructMessageEntity).filter((v): v is MessageEntity => v !== null),
    openPeriod: poll.close_period,
    closeDate: poll.close_date,
  });
}
