import { Api } from "../2_tl.js";
import { constructLinkPreview } from "../3_types.js";
const linkPreviewManagerUpdates = [
    "updateWebPage",
];
export class LinkPreviewManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    async getLinkPreview(text, params) {
        const [text_, entities_] = await this.#c.messageManager.parseText(text, params);
        const result = await this.#c.invoke({
            _: "messages.getWebPagePreview",
            message: text_,
            entities: entities_,
        });
        if (Api.is("messageMediaWebPage", result.media)) {
            return constructLinkPreview(result.media, undefined, this.#c.getPeer);
        }
        else {
            return null;
        }
    }
    canHandleUpdate(update) {
        return Api.isOneOf(linkPreviewManagerUpdates, update);
    }
    handleUpdate(update) {
        const linkPreview = constructLinkPreview({ _: "messageMediaWebPage", webpage: update.webpage }, undefined, this.#c.getPeer);
        return { linkPreview };
    }
}
