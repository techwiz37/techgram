import type { MaybePromise } from "../1_utilities.ts";
import type { Api } from "../2_tl.ts";
import type { ID } from "./0_id.ts";

export interface InputPeerGetter {
  (id: ID): Promise<Api.InputPeer>;
}

export interface UsernameResolver {
  (username: string): MaybePromise<Api.inputUser>;
}
