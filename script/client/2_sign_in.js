"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restartAuth = void 0;
exports.signIn = signIn;
const _0_deps_js_1 = require("../0_deps.js");
const _2_tl_js_1 = require("../2_tl.js");
const _3_errors_js_1 = require("../3_errors.js");
const _4_errors_js_1 = require("../4_errors.js");
exports.restartAuth = Symbol("restartAuth");
async function signIn(client, logger, params) {
    try {
        await client.getMe();
        return;
    }
    catch (err) {
        if ((!(err instanceof _4_errors_js_1.InputError))) {
            throw err;
        }
    }
    if (typeof params === "undefined") {
        const _0_env_js_1 = require("../utilities/0_env.js");
        const botToken = _0_env_js_1.getString("BOT_TOKEN");
        if (botToken) {
            params = { botToken };
        }
        else {
            const phone = _0_env_js_1.getString("PHONE_NUMBER");
            if (phone) {
                const code = _0_env_js_1.getString("VERIFICATION_CODE");
                const password = _0_env_js_1.getString("PASSWORD");
                params = {
                    phone,
                    code: code || (() => Promise.reject(new _4_errors_js_1.InputError("VERIFICATION_CODE environment variable is required for user sign in"))),
                    password: password || ((hint) => Promise.reject(new _4_errors_js_1.InputError(`PASSWORD environment variable is required. Password hint: ${hint || "none"}`))),
                };
            }
            else {
                throw new _4_errors_js_1.InputError("SignInParams must be provided. Either pass params to signIn() or set environment variables: BOT_TOKEN (for bot) or PHONE_NUMBER with VERIFICATION_CODE and optionally PASSWORD (for user)");
            }
        }
    }
    logger.debug("signing in with", typeof params === "string" ? "bot token" : _2_tl_js_1.Api.is("auth.exportedAuthorization", params) ? "exported authorization" : "AuthorizeUserParams");
    if (params && "botToken" in params) {
        const result = await client.checkBotToken(params.botToken);
        if (result.type === "signed_in") {
            return;
        }
        else {
            (0, _0_deps_js_1.unreachable)();
        }
    }
    auth: while (true) {
        try {
            let phone;
            while (true) {
                try {
                    phone = typeof params.phone === "string" ? params.phone : await params.phone();
                    await client.sendCode(phone);
                    break;
                }
                catch (err) {
                    if (err instanceof _3_errors_js_1.PhoneNumberInvalid) {
                        continue;
                    }
                    else {
                        throw err;
                    }
                }
            }
            logger.debug("verification code sent");
            code: while (true) {
                const code = typeof params.code === "string" ? params.code : await params.code();
                const codeCheckResult = await client.checkCode(code);
                if (codeCheckResult.type === "signed_in") {
                    return;
                }
                else if (codeCheckResult.type === "invalid_code") {
                    continue code;
                }
                else if (codeCheckResult.type === "password_required") {
                    break code;
                }
                else {
                    (0, _0_deps_js_1.unreachable)();
                }
            }
            const passwordHint = await client.getPasswordHint();
            password: while (true) {
                const password = typeof params.password === "string" ? params.password : await params.password(passwordHint);
                const passwordCheckResult = await client.checkPassword(password);
                if (passwordCheckResult.type === "signed_in") {
                    return;
                }
                else if (passwordCheckResult.type === "invalid_password") {
                    continue password;
                }
                else {
                    (0, _0_deps_js_1.unreachable)();
                }
            }
        }
        catch (err) {
            if (err === exports.restartAuth) {
                continue auth;
            }
            else {
                throw err;
            }
        }
    }
}
