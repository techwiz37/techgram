import type { MaybePromise } from "../1_utilities.js";
import type { Api, Mtproto } from "../2_tl.js";
import type { NextFunction } from "./0_utilities.js";
export interface InvokeErrorHandler<C> {
    (ctx: {
        client: C;
        error: unknown;
        function: Api.AnyFunction | Mtproto.ping;
        n: number;
    }, next: NextFunction<boolean>): MaybePromise<boolean>;
}
export declare function skipInvoke<C>(): InvokeErrorHandler<C>;
//# sourceMappingURL=1_invoke_middleware.d.ts.map