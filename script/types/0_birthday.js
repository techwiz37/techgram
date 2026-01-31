"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructBirthday = constructBirthday;
exports.birthdayToTlObject = birthdayToTlObject;
const _1_utilities_js_1 = require("../1_utilities.js");
function constructBirthday(birthday) {
    return (0, _1_utilities_js_1.cleanObject)({
        day: birthday.day,
        month: birthday.month,
        year: birthday.year,
    });
}
function birthdayToTlObject(birthday) {
    return {
        _: "birthday",
        day: birthday.day,
        month: birthday.month,
        year: birthday.year,
    };
}
