import type { Api } from "../2_tl.js";
export interface Birthday {
    day: number;
    month: number;
    year?: number;
}
export declare function constructBirthday(birthday: Api.birthday): Birthday;
export declare function birthdayToTlObject(birthday: Birthday): Api.birthday;
//# sourceMappingURL=0_birthday.d.ts.map