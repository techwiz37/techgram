"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Composer = void 0;
exports.flatten = flatten;
exports.concat = concat;
exports.skip = skip;
const _0_errors_js_1 = require("../0_errors.js");
const _2_context_js_1 = require("./2_context.js");
const _3_filters_js_1 = require("./3_filters.js");
function flatten(mw) {
    return typeof mw === "function" ? mw : (ctx, next) => mw.middleware()(ctx, next);
}
function concat(left, right) {
    return async (ctx, next) => {
        let called = false;
        await left(ctx, async () => {
            if (called) {
                return;
            }
            else {
                called = true;
                await right(ctx, next);
            }
        });
    };
}
function skip(_ctx, next) {
    return next();
}
class Composer {
    #handle;
    #prefixes;
    set prefixes(value) {
        if (this.#prefixes !== undefined) {
            throw new _0_errors_js_1.InputError("Prefixes already set");
        }
        this.#prefixes = value;
    }
    constructor(...middleware) {
        this.#handle = middleware.length === 0 ? skip : middleware.map(flatten).reduce(concat);
    }
    #lastGetMe;
    async handleUpdate(client, update) {
        if (!this.#lastGetMe && !("connectionState" in update) && (!("authorizationState" in update) || ("authorizationState" in update && update.authorizationState.isAuthorized))) {
            this.#lastGetMe = await client.getMe();
        }
        const ctx = new _2_context_js_1.Context(client, this.#lastGetMe, update);
        const next = () => Promise.resolve();
        await this.#handle(ctx, next);
    }
    middleware() {
        return this.#handle;
    }
    use(...middleware) {
        const composer = new Composer(...middleware);
        this.#handle = concat(this.#handle, flatten(composer));
        return composer;
    }
    branch(predicate, trueHandler_, falseHandler_) {
        const trueHandler = flatten(trueHandler_);
        const falseHandler = flatten(falseHandler_);
        return this.use(async (upd, next) => {
            if (await predicate(upd)) {
                await trueHandler(upd, next);
            }
            else {
                await falseHandler(upd, next);
            }
        });
    }
    filter(predicate, ...middleware) {
        const composer = new Composer(...middleware);
        this.branch(predicate, composer, skip);
        return composer;
    }
    on(filter, ...middleware) {
        return this.filter((ctx) => {
            return (0, _3_filters_js_1.match)(filter, ctx.update);
        }, ...middleware);
    }
    command(commands, ...middleware) {
        const commands__ = typeof commands === "object" && "names" in commands ? commands.names : commands;
        const commands_ = Array.isArray(commands__) ? commands__ : [commands__];
        const prefixes_ = typeof commands === "object" && "prefixes" in commands ? commands.prefixes : (this.#prefixes ?? []);
        const prefixes = Array.isArray(prefixes_) ? prefixes_ : [prefixes_];
        for (const left of prefixes) {
            for (const right of prefixes) {
                if (left === right) {
                    continue;
                }
                if (left.startsWith(right) || right.startsWith(left)) {
                    throw new _0_errors_js_1.InputError("Intersecting prefixes");
                }
            }
        }
        return this.on("message:text").filter((ctx) => {
            const prefixes_ = prefixes.length === 0 ? [!ctx.me?.isBot ? "\\" : "/"] : prefixes;
            if (prefixes_.length === 0) {
                return false;
            }
            const cmd = ctx.update.message.text.split(/\s/, 1)[0];
            const prefix = prefixes_.find((v) => cmd.startsWith(v));
            if (prefix === undefined) {
                return false;
            }
            if (cmd.includes("@")) {
                const username = cmd.split("@", 2)[1];
                if (username.toLowerCase() !== ctx.me.username?.toLowerCase()) {
                    return false;
                }
            }
            const command_ = cmd.split("@", 1)[0].split(prefix, 2)[1].toLowerCase();
            for (const command of commands_) {
                if (typeof command === "string" && (command.toLowerCase() === command_)) {
                    return true;
                }
                else if (command instanceof RegExp && command.test(command_)) {
                    return true;
                }
            }
            return false;
        }, ...middleware);
    }
    callbackQuery(data, ...middleware) {
        const data_ = Array.isArray(data) ? data : [data];
        return this.on("callbackQuery:data").filter((ctx) => {
            for (const data of data_) {
                if (typeof data === "string" && data === ctx.update.callbackQuery.data) {
                    return true;
                }
                else if (data instanceof RegExp && data.test(ctx.update.callbackQuery.data)) {
                    return true;
                }
            }
            return false;
        }, ...middleware);
    }
    inlineQuery(queries, ...middleware) {
        const queries_ = Array.isArray(queries) ? queries : [queries];
        return this.on("inlineQuery").filter((ctx) => {
            for (const query of queries_) {
                if (typeof query === "string" && query === ctx.update.inlineQuery.query) {
                    return true;
                }
                else if (query instanceof RegExp && query.test(ctx.update.inlineQuery.query)) {
                    return true;
                }
            }
            return false;
        }, ...middleware);
    }
}
exports.Composer = Composer;
