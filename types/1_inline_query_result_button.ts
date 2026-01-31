import type { MiniAppButtonInfo } from "./0_mini_app_button_info.ts";

export interface InlineQueryResultButton {

  text: string;

  miniApp?: MiniAppButtonInfo;

  startParameter?: string;
}
