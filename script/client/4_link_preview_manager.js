"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkPreviewManager = void 0;
const _2_tl_js_1 = require("../2_tl.js");
const _3_types_js_1 = require("../3_types.js");
const linkPreviewManagerUpdates = [
    "updateWebPage",
];
class LinkPreviewManager {
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
        if (_2_tl_js_1.Api.is("messageMediaWebPage", result.media)) {
            return (0, _3_types_js_1.constructLinkPreview)(result.media, undefined, this.#c.getPeer);
        }
        else {
            return null;
        }
    }
    canHandleUpdate(update) {
        return _2_tl_js_1.Api.isOneOf(linkPreviewManagerUpdates, update);
    }
    handleUpdate(update) {
        const linkPreview = (0, _3_types_js_1.constructLinkPreview)({ _: "messageMediaWebPage", webpage: update.webpage }, undefined, this.#c.getPeer);
        return { linkPreview };
    }
}
exports.LinkPreviewManager = LinkPreviewManager;
