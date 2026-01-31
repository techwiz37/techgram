import { Api } from "../2_tl.js";
import { type Thumbnail } from "./0_thumbnail.js";
export interface Animation {
    fileId: string;
    fileUniqueId: string;
    width: number;
    height: number;
    duration: number;
    thumbnails: Thumbnail[];
    fileName?: string;
    mimeType: string;
    fileSize: number;
}
export declare function constructAnimation(document: Api.document, videoAttribute: Api.documentAttributeVideo | undefined, fileAttribute: Api.documentAttributeFilename | undefined, fileId: string, fileUniqueId: string): Animation;
//# sourceMappingURL=1_animation.d.ts.map