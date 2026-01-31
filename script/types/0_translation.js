"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructTranslation = constructTranslation;
const _2_tl_js_1 = require("../2_tl.js");
function constructTranslation(langPackString) {
    if (_2_tl_js_1.Api.is("langPackString", langPackString)) {
        return {
            key: langPackString.key,
            value: langPackString.value,
        };
    }
    else if (_2_tl_js_1.Api.is("langPackStringPluralized", langPackString)) {
        return {
            key: langPackString.key,
            value: langPackString.other_value,
            one: langPackString.one_value,
            zero: langPackString.zero_value,
            two: langPackString.two_value,
            few: langPackString.few_value,
            many: langPackString.many_value,
        };
    }
    else {
        return {
            key: langPackString.key,
            value: "",
        };
    }
}
