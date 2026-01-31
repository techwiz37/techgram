import type { MaybePromise } from "../1_utilities.ts";
import type { Api, Mtproto } from "../2_tl.ts";
import type { NextFunction } from "./0_utilities.ts";

export interface InvokeErrorHandler<C> {
  (ctx: { client: C; error: unknown; function: Api.AnyFunction | Mtproto.ping; n: number }, next: NextFunction<boolean>): MaybePromise<boolean>;
}

export function skipInvoke<C>(): InvokeErrorHandler<C> {
  return (_ctx, next) => next();
}
