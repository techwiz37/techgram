"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructMessageReactionList = constructMessageReactionList;
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_message_reaction_list_item_js_1 = require("./2_message_reaction_list_item.js");
function constructMessageReactionList(messageReactionsList) {
    const reactions = messageReactionsList.reactions.map((v) => (0, _2_message_reaction_list_item_js_1.constructMessageReactionListItem)(v, messageReactionsList));
    const count = messageReactionsList.count;
    const nextOffset = messageReactionsList.next_offset;
    return (0, _1_utilities_js_1.cleanObject)({
        reactions,
        count,
        nextOffset,
    });
}
