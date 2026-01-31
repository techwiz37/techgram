import { Api } from "../2_tl.js";
import { type Thumbnail } from "./0_thumbnail.js";
export interface VideoNote {
    fileId: string;
    fileUniqueId: string;
    length: number;
    duration: number;
    thumbnails: Thumbnail[];
    fileName?: string;
    fileSize: number;
}
export declare function constructVideoNote(document: Api.document, videoAttribute: Api.documentAttributeVideo, fileId: string, fileUniqueId: string): VideoNote;
//# sourceMappingURL=1_video_note.d.ts.map