import { unreachable } from "../0_deps.ts";
import { cleanObject } from "../1_utilities.ts";
import { Api } from "../2_tl.ts";
import type { UsernameResolver } from "./_getters.ts";
import { constructInlineKeyboardButton, type InlineKeyboardButton, inlineKeyboardButtonToTlObject } from "./1_inline_keyboard_button.ts";
import { constructKeyboardButton, type KeyboardButton, keyboardButtonToTlObject } from "./1_keyboard_button.ts";

export interface ReplyMarkupInlineKeyboard {

  inlineKeyboard: InlineKeyboardButton[][];
}

function constructInlineKeyboardMarkup(keyboard_: Api.replyInlineMarkup): ReplyMarkupInlineKeyboard {
  const rows = new Array<InlineKeyboardButton[]>();
  for (const row_ of keyboard_.rows) {
    const row = new Array<InlineKeyboardButton>();
    for (const button_ of row_.buttons) {
      row.push(constructInlineKeyboardButton(button_));
    }
    rows.push(row);
  }
  return { inlineKeyboard: rows };
}

async function inlineKeyboardMarkupToTlObject(keyboard: ReplyMarkupInlineKeyboard, usernameResolver: UsernameResolver): Promise<Api.replyInlineMarkup> {
  const rows_ = new Array<Api.keyboardButtonRow>();
  for (const row of keyboard.inlineKeyboard) {
    const row_ = new Array<Api.KeyboardButton>();
    for (const button of row) {
      row_.push(await inlineKeyboardButtonToTlObject(button, usernameResolver));
    }
    rows_.push({ _: "keyboardButtonRow", buttons: row_ });
  }
  return { _: "replyInlineMarkup", rows: rows_ };
}

export interface ReplyMarkupKeyboard {

  keyboard: KeyboardButton[][];
  isPersistent?: boolean;
  resizeKeyboard?: boolean;
  oneTimeKeyboard?: boolean;
  inputFieldPlaceholder?: string;
  selective?: boolean;
}

function constructReplyKeyboardMarkup(keyboard_: Api.replyKeyboardMarkup): ReplyMarkupKeyboard {
  const rows = new Array<KeyboardButton[]>();
  for (const row_ of keyboard_.rows) {
    const row = new Array<KeyboardButton>();
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

function replyKeyboardMarkupToTlObject(replyMarkup: ReplyMarkupKeyboard): Api.replyKeyboardMarkup {
  const rows_ = new Array<Api.keyboardButtonRow>();
  for (const row of replyMarkup.keyboard) {
    const row_ = new Array<Api.KeyboardButton>();
    for (const button of row) {
      row_.push(keyboardButtonToTlObject(button));
    }
    rows_.push({ _: "keyboardButtonRow", buttons: row_ });
  }
  return { _: "replyKeyboardMarkup", resize: replyMarkup.resizeKeyboard || undefined, single_use: replyMarkup.oneTimeKeyboard || undefined, selective: replyMarkup.selective || undefined, persistent: replyMarkup.isPersistent || undefined, rows: rows_, placeholder: replyMarkup.inputFieldPlaceholder };
}

export interface ReplyMarkupRemoveKeyboard {

  removeKeyboard: true;

  selective?: boolean;
}

function constructReplyKeyboardRemove(replyMarkup_: Api.replyKeyboardHide): ReplyMarkupRemoveKeyboard {
  return cleanObject({ removeKeyboard: true, selective: replyMarkup_.selective });
}

function replyKeyboardRemoveToTlObject(replyMarkup: ReplyMarkupRemoveKeyboard): Api.replyKeyboardHide {
  return { _: "replyKeyboardHide", selective: replyMarkup.selective || undefined };
}

export interface ReplyMarkupForceReply {

  forceReply: true;

  inputFieldPlaceholder?: string;

  selective?: boolean;
}

function constructForceReply(replyMarkup_: Api.replyKeyboardForceReply) {
  const replyMarkup: ReplyMarkupForceReply = { forceReply: true };
  if (replyMarkup_.placeholder) {
    replyMarkup.inputFieldPlaceholder = replyMarkup_.placeholder;
  }
  if (replyMarkup_.selective) {
    replyMarkup.selective = true;
  }
  return replyMarkup;
}

function forceReplyToTlObject(replyMarkup: ReplyMarkupForceReply): Api.replyKeyboardForceReply {
  return { _: "replyKeyboardForceReply", selective: replyMarkup.selective || undefined, placeholder: replyMarkup.inputFieldPlaceholder };
}

export type ReplyMarkup = ReplyMarkupInlineKeyboard | ReplyMarkupKeyboard | ReplyMarkupRemoveKeyboard | ReplyMarkupForceReply;

export function constructReplyMarkup(replyMarkup: Api.ReplyMarkup): ReplyMarkup {
  if (Api.is("replyKeyboardMarkup", replyMarkup)) {
    return constructReplyKeyboardMarkup(replyMarkup);
  } else if (Api.is("replyInlineMarkup", replyMarkup)) {
    return constructInlineKeyboardMarkup(replyMarkup);
  } else if (Api.is("replyKeyboardHide", replyMarkup)) {
    return constructReplyKeyboardRemove(replyMarkup);
  } else if (Api.is("replyKeyboardForceReply", replyMarkup)) {
    return constructForceReply(replyMarkup);
  } else {
    unreachable();
  }
}

export async function replyMarkupToTlObject(replyMarkup: ReplyMarkup, usernameResolver: UsernameResolver): Promise<Api.ReplyMarkup> {
  if ("inlineKeyboard" in replyMarkup) {
    return await inlineKeyboardMarkupToTlObject(replyMarkup, usernameResolver);
  } else if ("keyboard" in replyMarkup) {
    return replyKeyboardMarkupToTlObject(replyMarkup);
  } else if ("removeKeyboard" in replyMarkup) {
    return replyKeyboardRemoveToTlObject(replyMarkup);
  } else if ("forceReply" in replyMarkup) {
    return forceReplyToTlObject(replyMarkup);
  } else {
    unreachable();
  }
}
