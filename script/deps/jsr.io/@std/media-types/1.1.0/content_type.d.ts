import type { db } from "./_db.js";
export type DB = typeof db;
export type ContentTypeToExtension = {
    [K in keyof DB]: DB[K] extends {
        "extensions": readonly string[];
    } ? DB[K]["extensions"][number] : never;
};
export type KnownExtensionOrType = keyof ContentTypeToExtension | ContentTypeToExtension[keyof ContentTypeToExtension] | `.${ContentTypeToExtension[keyof ContentTypeToExtension]}`;
export declare function contentType<T extends (string & {}) | KnownExtensionOrType>(extensionOrType: T): Lowercase<T> extends KnownExtensionOrType ? string : string | undefined;
//# sourceMappingURL=content_type.d.ts.map