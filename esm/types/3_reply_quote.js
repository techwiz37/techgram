import { constructMessageEntity } from "./2_message_entity.js";
export function constructReplyQuote(quoteText, quoteOffset, quoteEntities) {
    quoteText ??= "";
    quoteOffset ??= 0;
    quoteEntities ??= [];
    return {
        offset: quoteOffset,
        text: quoteText,
        entities: quoteEntities.map(constructMessageEntity).filter((v) => !!v),
    };
}
