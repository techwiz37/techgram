import { unreachable } from "../0_deps.js";
import { Api } from "../2_tl.js";
import { PhoneNumberInvalid } from "../3_errors.js";
import { InputError } from "../4_errors.js";
import { getString } from "../utilities/0_env.js";
export const restartAuth = Symbol("restartAuth");
export async function signIn(client, logger, params) {
    try {
        await client.getMe();
        return;
    }
    catch (err) {
        if ((!(err instanceof InputError))) {
            throw err;
        }
    }
    if (typeof params === "undefined") {
        const botToken = getString("BOT_TOKEN");
        if (botToken) {
            params = { botToken };
        }
        else {
            const phone = getString("PHONE_NUMBER");
            if (phone) {
                const code = getString("VERIFICATION_CODE");
                const password = getString("PASSWORD");
                params = {
                    phone,
                    code: code || (() => Promise.reject(new InputError("VERIFICATION_CODE environment variable is required for user sign in"))),
                    password: password || ((hint) => Promise.reject(new InputError(`PASSWORD environment variable is required. Password hint: ${hint || "none"}`))),
                };
            }
            else {
                throw new InputError("SignInParams must be provided. Either pass params to signIn() or set environment variables: BOT_TOKEN (for bot) or PHONE_NUMBER with VERIFICATION_CODE and optionally PASSWORD (for user)");
            }
        }
    }
    logger.debug("signing in with", typeof params === "string" ? "bot token" : Api.is("auth.exportedAuthorization", params) ? "exported authorization" : "AuthorizeUserParams");
    if (params && "botToken" in params) {
        const result = await client.checkBotToken(params.botToken);
        if (result.type === "signed_in") {
            return;
        }
        else {
            unreachable();
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
                    if (err instanceof PhoneNumberInvalid) {
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
                    unreachable();
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
                    unreachable();
                }
            }
        }
        catch (err) {
            if (err === restartAuth) {
                continue auth;
            }
            else {
                throw err;
            }
        }
    }
}
