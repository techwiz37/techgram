import { Api } from "../2_tl.js";
export interface Thumbnail {
    fileId: string;
    fileUniqueId: string;
    width: number;
    height: number;
    fileSize: number;
}
export declare function constructThumbnail(size: Api.photoSize, file: Api.document | Api.photo): Thumbnail;
//# sourceMappingURL=0_thumbnail.d.ts.map