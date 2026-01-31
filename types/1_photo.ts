import { Api } from "../2_tl.ts";
import { getPhotoFileId } from "./_file_id.ts";
import { constructThumbnail, type Thumbnail } from "./0_thumbnail.ts";

export interface Photo {

  fileId: string;

  fileUniqueId: string;

  width: number;

  height: number;

  fileSize: number;
  thumbnails: Thumbnail[];
}

export function constructPhoto(photo: Api.photo): Photo {
  const { sizes, largest } = getPhotoSizes(photo);
  return {
    ...getPhotoFileId(photo),
    width: largest.w,
    height: largest.h,
    fileSize: largest.size,
    thumbnails: sizes.slice(0, -1).map((v) => constructThumbnail(v, photo)),
  };
}

export function getPhotoSizes(photo: Api.photo): { sizes: Api.photoSize[]; largest: Api.photoSize } {
  const sizes = photo.sizes
    .map((v) => {
      if (Api.is("photoSizeProgressive", v)) {
        return { _: "photoSize", type: v.type, w: v.w, h: v.h, size: Math.max(...v.sizes) };
      } else {
        return v;
      }
    })
    .filter((v): v is Api.photoSize => Api.is("photoSize", v))
    .sort((a, b) => a.size - b.size);
  const largest = sizes.slice(-1)[0];
  return { sizes, largest };
}
