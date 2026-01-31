import { unreachable } from "../0_deps.js";
import { Api } from "../2_tl.js";
import { constructReaction } from "./0_reaction.js";
import { constructChatP } from "./1_chat_p.js";
export function constructMessageReactionListItem(messagePeerReaction, list) {
    let chat_;
    const peerId = messagePeerReaction.peer_id;
    if (Api.is("peerChannel", peerId)) {
        chat_ = list.chats.find((v) => v.id === peerId.channel_id);
    }
    else if (Api.is("peerUser", peerId)) {
        chat_ = list.users.find((v) => v.id === peerId.user_id);
    }
    else {
        unreachable();
    }
    const chat = constructChatP(chat_);
    const date = messagePeerReaction.date;
    const reaction = constructReaction(messagePeerReaction.reaction);
    const big = !!messagePeerReaction.big;
    const isCreator = !!messagePeerReaction.my;
    const unread = !!messagePeerReaction.unread;
    return {
        chat,
        date,
        reaction,
        big,
        isCreator,
        unread,
    };
}
