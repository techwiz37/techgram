import { unreachable } from "../0_deps.js";
import { cleanObject } from "../1_utilities.js";
import { Api } from "../2_tl.js";
import { constructInlineKeyboardButton, inlineKeyboardButtonToTlObject } from "./1_inline_keyboard_button.js";
import { constructKeyboardButton, keyboardButtonToTlObject } from "./1_keyboard_button.js";
function constructInlineKeyboardMarkup(keyboard_) {
    const rows = new Array();
    for (const row_ of keyboard_.rows) {
        const row = new Array();
        for (const button_ of row_.buttons) {
            row.push(constructInlineKeyboardButton(button_));
        }
        rows.push(row);
    }
    return { inlineKeyboard: rows };
}
async function inlineKeyboardMarkupToTlObject(keyboard, usernameResolver) {
    const rows_ = new Array();
    for (const row of keyboard.inlineKeyboard) {
        const row_ = new Array();
        for (const button of row) {
            row_.push(await inlineKeyboardButtonToTlObject(button, usernameResolver));
        }
        rows_.push({ _: "keyboardButtonRow", buttons: row_ });
    }
    return { _: "replyInlineMarkup", rows: rows_ };
}
function constructReplyKeyboardMarkup(keyboard_) {
    const rows = new Array();
    for (const row_ of keyboard_.rows) {
        const row = new Array();
        for (const button_ of row_.buttons) {
            row.push(constructKeyboardButton(button_));
        }
        rows.push(row);
    }
    return {
        resizeKeyboard: keyboard_.resize || false,
        oneTimeKeyboard: keyboard_.single_use || false,
        selective: keyboard_.selective || false,
        isPersistent: keyboard_.persistent || false,
        keyboard: rows,
    };
}
function replyKeyboardMarkupToTlObject(replyMarkup) {
    const rows_ = new Array();
    for (const row of replyMarkup.keyboard) {
        const row_ = new Array();
        for (const button of row) {
            row_.push(keyboardButtonToTlObject(button));
        }
        rows_.push({ _: "keyboardButtonRow", buttons: row_ });
    }
    return { _: "replyKeyboardMarkup", resize: replyMarkup.resizeKeyboard || undefined, single_use: replyMarkup.oneTimeKeyboard || undefined, selective: replyMarkup.selective || undefined, persistent: replyMarkup.isPersistent || undefined, rows: rows_, placeholder: replyMarkup.inputFieldPlaceholder };
}
function constructReplyKeyboardRemove(replyMarkup_) {
    return cleanObject({ removeKeyboard: true, selective: replyMarkup_.selective });
}
function replyKeyboardRemoveToTlObject(replyMarkup) {
    return { _: "replyKeyboardHide", selective: replyMarkup.selective || undefined };
}
function constructForceReply(replyMarkup_) {
    const replyMarkup = { forceReply: true };
    if (replyMarkup_.placeholder) {
        replyMarkup.inputFieldPlaceholder = replyMarkup_.placeholder;
    }
    if (replyMarkup_.selective) {
        replyMarkup.selective = true;
    }
    return replyMarkup;
}
function forceReplyToTlObject(replyMarkup) {
    return { _: "replyKeyboardForceReply", selective: replyMarkup.selective || undefined, placeholder: replyMarkup.inputFieldPlaceholder };
}
export function constructReplyMarkup(replyMarkup) {
    if (Api.is("replyKeyboardMarkup", replyMarkup)) {
        return constructReplyKeyboardMarkup(replyMarkup);
    }
    else if (Api.is("replyInlineMarkup", replyMarkup)) {
        return constructInlineKeyboardMarkup(replyMarkup);
    }
    else if (Api.is("replyKeyboardHide", replyMarkup)) {
        return constructReplyKeyboardRemove(replyMarkup);
    }
    else if (Api.is("replyKeyboardForceReply", replyMarkup)) {
        return constructForceReply(replyMarkup);
    }
    else {
        unreachable();
    }
}
export async function replyMarkupToTlObject(replyMarkup, usernameResolver) {
    if ("inlineKeyboard" in replyMarkup) {
        return await inlineKeyboardMarkupToTlObject(replyMarkup, usernameResolver);
    }
    else if ("keyboard" in replyMarkup) {
        return replyKeyboardMarkupToTlObject(replyMarkup);
    }
    else if ("removeKeyboard" in replyMarkup) {
        return replyKeyboardRemoveToTlObject(replyMarkup);
    }
    else if ("forceReply" in replyMarkup) {
        return forceReplyToTlObject(replyMarkup);
    }
    else {
        unreachable();
    }
}
