import { Api } from "../2_tl.js";
import { type Location } from "./0_location.js";
import type { PeerGetter } from "./1_chat_p.js";
import { type User } from "./2_user.js";
export interface InlineQuery {
    id: string;
    from: User;
    query: string;
    offset: string;
    chatType?: "sender" | "private" | "group" | "supergroup" | "channel";
    location?: Location;
}
export declare function constructInlineQuery(query_: Api.updateBotInlineQuery, getPeer: PeerGetter): InlineQuery;
//# sourceMappingURL=3_inline_query.d.ts.map