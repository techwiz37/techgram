import { Api } from "../2_tl.js";
import { type Thumbnail } from "./0_thumbnail.js";
export interface Document {
    fileId: string;
    fileUniqueId: string;
    thumbnails: Thumbnail[];
    fileName: string;
    mimeType: string;
    fileSize: number;
}
export declare function constructDocument(document: Api.document, fileNameAttribute: Api.documentAttributeFilename, fileId: string, fileUniqueId: string): Document;
//# sourceMappingURL=1_document.d.ts.map