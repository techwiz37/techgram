"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructPollOption = constructPollOption;
const _2_message_entity_js_1 = require("./2_message_entity.js");
function constructPollOption(option, results) {
    const result = results.find((v) => v.option.every((v, i) => option.option[i] === v));
    return {
        text: option.text.text,
        entities: option.text.entities?.map(_2_message_entity_js_1.constructMessageEntity).filter((v) => v !== null),
        voterCount: result?.voters ?? 0,
        isChosen: result?.chosen ?? false,
    };
}
