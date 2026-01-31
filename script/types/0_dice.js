"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructDice = constructDice;
function constructDice(dice_) {
    return { emoji: dice_.emoticon, value: dice_.value };
}
