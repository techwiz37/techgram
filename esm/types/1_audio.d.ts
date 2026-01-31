import { Api } from "../2_tl.js";
import { type Thumbnail } from "./0_thumbnail.js";
export interface Audio {
    fileId: string;
    fileUniqueId: string;
    duration: number;
    performer?: string;
    title?: string;
    mimeType: string;
    fileSize: number;
    thumbnails: Thumbnail[];
}
export declare function constructAudio(document: Api.document, audioAttribute: Api.documentAttributeAudio | undefined, fileId: string, fileUniqueId: string): Audio;
//# sourceMappingURL=1_audio.d.ts.map