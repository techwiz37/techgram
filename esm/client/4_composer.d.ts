import type { MaybePromise } from "../1_utilities.js";
import type { Update } from "../3_types.js";
import type { NextFunction } from "./0_utilities.js";
import type { ClientGeneric } from "./1_client_generic.js";
import { Context } from "./2_context.js";
import { type FilterQuery, type WithFilter } from "./3_filters.js";
export type MiddlewareFn<C> = (ctx: C, next: NextFunction) => MaybePromise<unknown>;
export interface MiddlewareObj<C> {
    middleware: () => MiddlewareFn<C>;
}
export type Middleware<C> = MiddlewareFn<C> | MiddlewareObj<C>;
export declare function flatten<C>(mw: Middleware<C>): MiddlewareFn<C>;
export declare function concat<C = Update>(left: MiddlewareFn<C>, right: MiddlewareFn<C>): MiddlewareFn<C>;
export declare function skip<C>(_ctx: C, next: NextFunction): Promise<void>;
export declare class Composer<C extends Context> implements MiddlewareObj<C> {
    #private;
    set prefixes(value: string | string[]);
    constructor(...middleware: Middleware<C>[]);
    handleUpdate(client: ClientGeneric, update: Update): Promise<void>;
    middleware(): MiddlewareFn<C>;
    use(...middleware: Middleware<C>[]): Composer<C>;
    branch(predicate: (ctx: C) => MaybePromise<boolean>, trueHandler_: Middleware<C>, falseHandler_: Middleware<C>): Composer<C>;
    filter<D extends C>(predicate: (ctx: C) => ctx is D, ...middleware: Middleware<D>[]): Composer<D>;
    filter(predicate: (ctx: C) => MaybePromise<boolean>, ...middleware: Middleware<C>[]): Composer<C>;
    on<Q extends FilterQuery>(filter: Q, ...middleware: Middleware<WithFilter<C, Q>>[]): Composer<WithFilter<C, Q>>;
    command(commands: string | RegExp | (string | RegExp)[] | {
        names: string | RegExp | (string | RegExp)[];
        prefixes: string | string[];
    }, ...middleware: Middleware<WithFilter<C, "message:text">>[]): Composer<WithFilter<C, "message:text">>;
    callbackQuery(data: string | RegExp | (string | RegExp)[], ...middleware: Middleware<WithFilter<C, "callbackQuery:data">>[]): Composer<WithFilter<C, "callbackQuery:data">>;
    inlineQuery(queries: string | RegExp | (string | RegExp)[], ...middleware: Middleware<WithFilter<C, "inlineQuery">>[]): Composer<WithFilter<C, "inlineQuery">>;
}
//# sourceMappingURL=4_composer.d.ts.map