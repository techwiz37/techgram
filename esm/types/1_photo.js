import { Api } from "../2_tl.js";
import { getPhotoFileId } from "./_file_id.js";
import { constructThumbnail } from "./0_thumbnail.js";
export function constructPhoto(photo) {
    const { sizes, largest } = getPhotoSizes(photo);
    return {
        ...getPhotoFileId(photo),
        width: largest.w,
        height: largest.h,
        fileSize: largest.size,
        thumbnails: sizes.slice(0, -1).map((v) => constructThumbnail(v, photo)),
    };
}
export function getPhotoSizes(photo) {
    const sizes = photo.sizes
        .map((v) => {
        if (Api.is("photoSizeProgressive", v)) {
            return { _: "photoSize", type: v.type, w: v.w, h: v.h, size: Math.max(...v.sizes) };
        }
        else {
            return v;
        }
    })
        .filter((v) => Api.is("photoSize", v))
        .sort((a, b) => a.size - b.size);
    const largest = sizes.slice(-1)[0];
    return { sizes, largest };
}
