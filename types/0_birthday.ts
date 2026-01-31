import { cleanObject } from "../1_utilities.ts";
import type { Api } from "../2_tl.ts";

export interface Birthday {
  day: number;
  month: number;
  year?: number;
}

export function constructBirthday(birthday: Api.birthday): Birthday {
  return cleanObject({
    day: birthday.day,
    month: birthday.month,
    year: birthday.year,
  });
}

export function birthdayToTlObject(birthday: Birthday): Api.birthday {
  return {
    _: "birthday",
    day: birthday.day,
    month: birthday.month,
    year: birthday.year,
  };
}
