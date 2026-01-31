import { Api } from "../2_tl.js";
import { type Thumbnail } from "./0_thumbnail.js";
export interface Video {
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
export declare function constructVideo(document: Api.document, videoAttribute: Api.documentAttributeVideo, fileName: string | undefined, fileId: string, fileUniqueId: string): Video;
//# sourceMappingURL=1_video.d.ts.map