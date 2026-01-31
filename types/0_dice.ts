import type { Api } from "../2_tl.ts";

export interface Dice {

  emoji: string;

  value: number;
}

export function constructDice(dice_: Api.messageMediaDice): Dice {
  return { emoji: dice_.emoticon, value: dice_.value };
}
