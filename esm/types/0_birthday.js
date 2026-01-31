import { cleanObject } from "../1_utilities.js";
export function constructBirthday(birthday) {
    return cleanObject({
        day: birthday.day,
        month: birthday.month,
        year: birthday.year,
    });
}
export function birthdayToTlObject(birthday) {
    return {
        _: "birthday",
        day: birthday.day,
        month: birthday.month,
        year: birthday.year,
    };
}
