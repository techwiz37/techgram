import { Api } from "../2_tl.js";
import { type Update } from "../3_types.js";
import type { GetLinkPreviewParams } from "./0_params.js";
import type { UpdateProcessor } from "./0_update_processor.js";
import type { C as C_ } from "./1_types.js";
import type { MessageManager } from "./3_message_manager.js";
type C = C_ & {
    messageManager: MessageManager;
};
declare const linkPreviewManagerUpdates: readonly ["updateWebPage"];
type LinkPreviewManagerUpdate = Api.Types[(typeof linkPreviewManagerUpdates)[number]];
export declare class LinkPreviewManager implements UpdateProcessor<LinkPreviewManagerUpdate> {
    #private;
    constructor(c: C);
    getLinkPreview(text: string, params?: GetLinkPreviewParams): Promise<import("../3_types.js").LinkPreview | null>;
    canHandleUpdate(update: Api.Update): update is LinkPreviewManagerUpdate;
    handleUpdate(update: LinkPreviewManagerUpdate): Update;
}
export {};
//# sourceMappingURL=4_link_preview_manager.d.ts.map