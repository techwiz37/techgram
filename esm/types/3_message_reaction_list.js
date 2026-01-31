import { cleanObject } from "../1_utilities.js";
import { constructMessageReactionListItem } from "./2_message_reaction_list_item.js";
export function constructMessageReactionList(messageReactionsList) {
    const reactions = messageReactionsList.reactions.map((v) => constructMessageReactionListItem(v, messageReactionsList));
    const count = messageReactionsList.count;
    const nextOffset = messageReactionsList.next_offset;
    return cleanObject({
        reactions,
        count,
        nextOffset,
    });
}
