import { cleanObject } from "../1_utilities.ts";
import type { Api } from "../2_tl.ts";
import type { MiniAppMode } from "./0_mini_app_mode.ts";

export interface MiniAppInfo {

  url: string;

  mode: MiniAppMode;

  queryId?: string;
}

export function constructMiniAppInfo(result: Api.webViewResultUrl): MiniAppInfo {
  return cleanObject({
    url: result.url,
    mode: result.fullscreen ? "fullscreen" : result.fullsize ? "default" : "compact",
    queryId: result.query_id ? String(result.query_id) : undefined,
  });
}
