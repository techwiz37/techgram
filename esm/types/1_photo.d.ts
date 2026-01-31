import { Api } from "../2_tl.js";
import { type Thumbnail } from "./0_thumbnail.js";
export interface Photo {
    fileId: string;
    fileUniqueId: string;
    width: number;
    height: number;
    fileSize: number;
    thumbnails: Thumbnail[];
}
export declare function constructPhoto(photo: Api.photo): Photo;
export declare function getPhotoSizes(photo: Api.photo): {
    sizes: Api.photoSize[];
    largest: Api.photoSize;
};
//# sourceMappingURL=1_photo.d.ts.map