import type { MaybePromise } from "../1_utilities.js";
import type { Api } from "../2_tl.js";
import type { ID } from "./0_id.js";
export interface InputPeerGetter {
    (id: ID): Promise<Api.InputPeer>;
}
export interface UsernameResolver {
    (username: string): MaybePromise<Api.inputUser>;
}
//# sourceMappingURL=_getters.d.ts.map