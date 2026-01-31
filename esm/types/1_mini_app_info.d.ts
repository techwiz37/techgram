import type { Api } from "../2_tl.js";
import type { MiniAppMode } from "./0_mini_app_mode.js";
export interface MiniAppInfo {
    url: string;
    mode: MiniAppMode;
    queryId?: string;
}
export declare function constructMiniAppInfo(result: Api.webViewResultUrl): MiniAppInfo;
//# sourceMappingURL=1_mini_app_info.d.ts.map