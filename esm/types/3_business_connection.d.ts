import type { Api } from "../2_tl.js";
import { type PeerGetter } from "./1_chat_p.js";
import { type User } from "./2_user.js";
export interface BusinessConnection {
    id: string;
    user: User;
    date: number;
    canReply: boolean;
    isEnabled: boolean;
}
export declare function constructBusinessConnection(connection: Api.botBusinessConnection, getPeer: PeerGetter): BusinessConnection;
//# sourceMappingURL=3_business_connection.d.ts.map