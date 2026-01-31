import { type Logger } from "../1_utilities.js";
import type { SignInParams } from "./0_params.js";
import type { ClientGeneric } from "./1_client_generic.js";
export declare const restartAuth: unique symbol;
export declare function signIn(client: ClientGeneric, logger: Logger, params: SignInParams | undefined): Promise<void>;
//# sourceMappingURL=2_sign_in.d.ts.map