"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructSelfDestructOption = constructSelfDestructOption;
exports.selfDestructOptionToInt = selfDestructOptionToInt;
const _0_errors_js_1 = require("../0_errors.js");
const MAX_INT_32 = ~~(0xFFFFFFFF / 2);
function constructSelfDestructOption(ttlSeconds) {
    if (ttlSeconds === MAX_INT_32) {
        return "afterOpen";
    }
    else {
        return ttlSeconds;
    }
}
function selfDestructOptionToInt(option) {
    if (option === "afterOpen") {
        return 2147483647;
    }
    else if (typeof option === "number") {
        if (option === 0) {
            throw new _0_errors_js_1.InputError("Self destruct option cannot be zero.");
        }
        else if (option < 0) {
            throw new _0_errors_js_1.InputError("Self destruct option cannot be negative.");
        }
        else {
            return option;
        }
    }
    else {
        throw new _0_errors_js_1.InputError("Invalid self destruct option.");
    }
}
