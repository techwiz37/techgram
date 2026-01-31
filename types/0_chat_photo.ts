import { cleanObject } from "../1_utilities.ts";
import { Api } from "../2_tl.ts";
import { type FileId, FileType, PhotoSourceType, serializeFileId, toUniqueFileId } from "./_file_id.ts";

export interface ChatPhoto {

  smallFileId: string;

  smallFileUniqueId: string;

  bigFileId: string;

  bigFileUniqueId: string;

  hasVideo: boolean;

  isPersonal: boolean;
}

export function constructChatPhoto(photo: Api.userProfilePhoto | Api.chatPhoto, chatId: number, chatAccessHash: bigint): ChatPhoto {
  const smallFileId_: FileId = {
    type: FileType.ProfilePhoto,
    dcId: photo.dc_id,
    location: { type: "photo", id: photo.photo_id, accessHash: 0n, source: { type: PhotoSourceType.ChatPhotoSmall, chatId: BigInt(chatId), chatAccessHash } },
  };
  const smallFileId = serializeFileId(smallFileId_);
  const smallFileUniqueId = toUniqueFileId(smallFileId_);

  const bigFileId_: FileId = {
    type: FileType.ProfilePhoto,
    dcId: photo.dc_id,
    location: { type: "photo", id: photo.photo_id, accessHash: 0n, source: { type: PhotoSourceType.ChatPhotoBig, chatId: BigInt(chatId), chatAccessHash } },
  };
  const bigFileId = serializeFileId(bigFileId_);
  const bigFileUniqueId = toUniqueFileId(bigFileId_);

  if (Api.is("chatPhoto", photo)) {
    return cleanObject({
      smallFileId,
      smallFileUniqueId,
      bigFileId,
      bigFileUniqueId,
      hasVideo: photo.has_video || false,
      isPersonal: false,
    });
  } else {
    return cleanObject({
      smallFileId,
      smallFileUniqueId,
      bigFileId,
      bigFileUniqueId,
      hasVideo: photo.has_video || false,
      isPersonal: photo.personal ? true : false,
    });
  }
}
