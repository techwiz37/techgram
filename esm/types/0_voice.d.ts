import type { Api } from "../2_tl.js";
export interface Voice {
    fileId: string;
    fileUniqueId: string;
    duration: number;
    mimeType: string;
    fileSize: number;
}
export declare function constructVoice(document: Api.document, audioAttributes: Api.documentAttributeAudio, fileId: string, fileUniqueId: string): Voice;
//# sourceMappingURL=0_voice.d.ts.map