import { Api } from "../2_tl.ts";
import { constructLinkPreview, type Update } from "../3_types.ts";
import type { GetLinkPreviewParams } from "./0_params.ts";
import type { UpdateProcessor } from "./0_update_processor.ts";
import type { C as C_ } from "./1_types.ts";
import type { MessageManager } from "./3_message_manager.ts";

type C = C_ & { messageManager: MessageManager };

const linkPreviewManagerUpdates = [
  "updateWebPage",
] as const;

type LinkPreviewManagerUpdate = Api.Types[(typeof linkPreviewManagerUpdates)[number]];

export class LinkPreviewManager implements UpdateProcessor<LinkPreviewManagerUpdate> {
  #c: C;

  constructor(c: C) {
    this.#c = c;
  }

  async getLinkPreview(text: string, params?: GetLinkPreviewParams) {
    const [text_, entities_] = await this.#c.messageManager.parseText(text, params);

    const result = await this.#c.invoke({
      _: "messages.getWebPagePreview",
      message: text_,
      entities: entities_,
    });
    if (Api.is("messageMediaWebPage", result.media)) {
      return constructLinkPreview(result.media, undefined, this.#c.getPeer);
    } else {
      return null;
    }
  }

  canHandleUpdate(update: Api.Update): update is LinkPreviewManagerUpdate {
    return Api.isOneOf(linkPreviewManagerUpdates, update);
  }

  handleUpdate(update: LinkPreviewManagerUpdate): Update {
    const linkPreview = constructLinkPreview({ _: "messageMediaWebPage", webpage: update.webpage }, undefined, this.#c.getPeer);
    return { linkPreview };
  }
}
