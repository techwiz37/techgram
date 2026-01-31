import { Api } from "../2_tl.js";
import { type Location } from "./0_location.js";
import type { PeerGetter } from "./1_chat_p.js";
import { type User } from "./2_user.js";
export interface ChosenInlineResult {
    resultId: string;
    from: User;
    location?: Location;
    inlineMessageId?: string;
    query: string;
}
export declare function constructChosenInlineResult(ubis: Api.updateBotInlineSend, getPeer: PeerGetter): ChosenInlineResult;
//# sourceMappingURL=3_chosen_inline_result.d.ts.map