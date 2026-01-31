export interface MiniAppButtonInfo {

  url: string;
}

export function constructMiniAppButtonInfo(url: string): MiniAppButtonInfo {
  return { url };
}
