"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManager = void 0;
const dntShim = __importStar(require("../_dnt.shims.js"));
const _0_deps_js_1 = require("../0_deps.js");
const _0_errors_js_1 = require("../0_errors.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_tl_js_1 = require("../2_tl.js");
const _3_errors_js_1 = require("../3_errors.js");
const _3_transport_js_1 = require("../3_transport.js");
const _3_types_js_1 = require("../3_types.js");
const _4_constants_js_1 = require("../4_constants.js");
const _4_errors_js_1 = require("../4_errors.js");
const _0_utilities_js_1 = require("./0_utilities.js");
class FileManager {
    #c;
    #Lupload;
    static #UPLOAD_MAX_CHUNK_SIZE = 512 * _1_utilities_js_1.kilobyte;
    static #BIG_FILE_THRESHOLD = 10 * _1_utilities_js_1.megabyte;
    constructor(c) {
        this.#c = c;
        const L = (0, _1_utilities_js_1.getLogger)("FileManager").client(c.id);
        this.#Lupload = L.branch("upload");
    }
    #progressIds = new Set();
    getProgressId() {
        let id;
        do {
            id = (0, _1_utilities_js_1.getRandomId)();
        } while (id === 0n || this.#progressIds.has(id));
        this.#progressIds.add(id);
        return Promise.resolve(String(id));
    }
    async upload(file, params, checkName, allowStream = true) {
        if (params?.progressId !== undefined && !this.#progressIds.has(BigInt(params.progressId))) {
            throw new _0_errors_js_1.InputError("Invalid progressId.");
        }
        if (params?.progressId !== undefined) {
            this.#progressIds.delete(BigInt(params.progressId));
        }
        let { size, name, contents } = await _a.#getFileContents(file, params, allowStream);
        if (checkName) {
            name = checkName(name);
        }
        if (size === 0 || size < -1) {
            throw new _0_errors_js_1.InputError("Invalid file size.");
        }
        const poolSize = await this.#c.getUploadPoolSize();
        const chunkSize = params?.chunkSize ?? _a.#UPLOAD_MAX_CHUNK_SIZE;
        _a.validateChunkSize(chunkSize, _a.#UPLOAD_MAX_CHUNK_SIZE);
        const mustTrackProgress = params?.progressId !== undefined;
        const fileId = params?.progressId !== undefined ? BigInt(params.progressId) : (0, _1_utilities_js_1.getRandomId)();
        const isBig = contents instanceof Uint8Array ? contents.length > _a.#BIG_FILE_THRESHOLD : true;
        const whatIsUploaded = contents instanceof Uint8Array ? (isBig ? "big file" : "file") + " of size " + size : "stream";
        this.#Lupload.debug("uploading " + whatIsUploaded + " with chunk size of " + chunkSize + " and pool size of " + poolSize + " and file ID of " + fileId);
        let result;
        if (contents instanceof Uint8Array) {
            result = await this.#uploadBuffer(contents, fileId, mustTrackProgress, chunkSize, poolSize, params?.signal);
        }
        else {
            result = await this.#uploadStream(contents, fileId, mustTrackProgress, chunkSize, poolSize, params?.signal);
        }
        this.#Lupload.debug(`[${fileId}] uploaded ` + result.parts + " part(s)");
        if (result.small) {
            return { _: "inputFile", id: fileId, name, parts: result.parts, md5_checksum: "" };
        }
        else {
            return { _: "inputFileBig", id: fileId, name, parts: result.parts };
        }
    }
    async #uploadStream(stream, fileId, mustTrackProgress, chunkSize, poolSize, signal) {
        let part;
        let promises = new Array();
        let ms = 0.05;
        let uploaded = 0;
        for await (part of (0, _1_utilities_js_1.iterateReadableStream)(stream.pipeThrough(new _1_utilities_js_1.PartStream(chunkSize)))) {
            if (!part.small && part.part > 0) {
                await (0, _0_deps_js_1.delay)(ms);
                ms = Math.max(ms * .8, 0.003);
            }
            promises.push(this.#uploadPart(fileId, part.totalParts, !part.small, part.part, part.bytes, signal).then(() => {
                if (mustTrackProgress) {
                    uploaded += part.bytes.length;
                    this.#c.handleUpdate({
                        uploadProgress: {
                            id: String(fileId),
                            uploaded,
                            total: 0,
                        },
                    });
                }
            }));
            if (promises.length === poolSize * _0_utilities_js_1.UPLOAD_REQUEST_PER_CONNECTION) {
                await Promise.all(promises);
                promises = [];
            }
        }
        await Promise.all(promises);
        return { small: part.small, parts: part.totalParts };
    }
    async #uploadBuffer(buffer, fileId, mustTrackProgress, chunkSize, poolSize, signal) {
        const isBig = buffer.byteLength > _a.#BIG_FILE_THRESHOLD;
        const partCount = Math.ceil(buffer.byteLength / chunkSize);
        let promises = new Array();
        let started = false;
        let ms = 0.05;
        let uploaded = 0;
        main: for (let part = 0; part < partCount;) {
            for (let i = 0; i < poolSize; ++i) {
                for (let i = 0; i < _0_utilities_js_1.UPLOAD_REQUEST_PER_CONNECTION; ++i) {
                    const start = part * chunkSize;
                    const end = start + chunkSize;
                    const bytes = buffer.subarray(start, end);
                    if (!bytes.length) {
                        break main;
                    }
                    if (!started) {
                        started = true;
                    }
                    else if (isBig && part > 0) {
                        await (0, _0_deps_js_1.delay)(ms);
                        ms = Math.max(ms * .8, 0.003);
                    }
                    promises.push(this.#uploadPart(fileId, partCount, isBig, part++, bytes, signal).then(() => {
                        if (mustTrackProgress) {
                            uploaded += bytes.length;
                            this.#c.handleUpdate({
                                uploadProgress: {
                                    id: String(fileId),
                                    uploaded,
                                    total: buffer.length,
                                },
                            });
                        }
                    }));
                    if (promises.length === poolSize * _0_utilities_js_1.UPLOAD_REQUEST_PER_CONNECTION) {
                        await Promise.all(promises);
                        promises = [];
                    }
                }
            }
            await Promise.all(promises);
            promises = [];
        }
        await Promise.all(promises);
        return { small: !isBig, parts: partCount };
    }
    async #uploadPart(fileId, partCount, isBig, index, bytes, signal) {
        let retryIn = 1;
        let errorCount = 0;
        while (true) {
            try {
                signal?.throwIfAborted();
                this.#Lupload.debug(`[${fileId}] uploading part ` + (index + 1));
                if (isBig) {
                    await this.#c.invoke({ _: "upload.saveBigFilePart", file_id: fileId, file_part: index, bytes, file_total_parts: partCount }, { type: "upload" });
                }
                else {
                    await this.#c.invoke({ _: "upload.saveFilePart", file_id: fileId, bytes, file_part: index }, { type: "upload" });
                }
                this.#Lupload.debug(`[${fileId}] uploaded part ` + (index + 1));
                break;
            }
            catch (err) {
                signal?.throwIfAborted();
                this.#Lupload.debug(`[${fileId}] failed to upload part ` + (index + 1));
                ++errorCount;
                if (errorCount > 20) {
                    retryIn = 0;
                    errorCount = 20;
                }
                await this.#handleError(err, retryIn, `[${fileId}-${index + 1}]`);
                retryIn += 2;
                if (retryIn > 11) {
                    retryIn = 11;
                }
            }
        }
    }
    async #handleError(err, retryIn, logPrefix) {
        if (err instanceof _3_errors_js_1.TimeTooBig || err instanceof _3_errors_js_1.TimeTooSmall) {
            throw err;
        }
        else if (err instanceof _4_errors_js_1.FloodWait) {
            this.#Lupload.warning(`${logPrefix} retrying in ${err.seconds} seconds:`, err);
            await (0, _0_deps_js_1.delay)(err.seconds * _0_deps_js_1.SECOND);
        }
        else if (retryIn > 0) {
            this.#Lupload.warning(`${logPrefix} retrying in ${retryIn} seconds:`, err);
            await (0, _0_deps_js_1.delay)(retryIn * _0_deps_js_1.SECOND);
        }
        else {
            throw err;
        }
    }
    static async #getFileContents(source, params, allowStream) {
        let name = params?.fileName?.trim() || "file";
        let contents;
        let size = -1;
        if (source instanceof Uint8Array) {
            contents = source;
            size = source.byteLength;
        }
        else if (source instanceof ReadableStream) {
            if (!allowStream) {
                throw new _0_errors_js_1.InputError("Streamed upload not allowed.");
            }
            contents = source;
        }
        else if (typeof source === "object" && source !== null && (Symbol.iterator in source || Symbol.asyncIterator in source)) {
            if (!allowStream) {
                throw new _0_errors_js_1.InputError("Streamed upload not allowed.");
            }
            contents = new ReadableStream({
                pull: Symbol.asyncIterator in source
                    ? async (controller) => {
                        const { value, done } = await source.next();
                        done ? controller.close() : controller.enqueue(value);
                    }
                    : (controller) => {
                        const { value, done } = source.next();
                        done ? controller.close() : controller.enqueue(value);
                    },
            });
        }
        else {
            let url;
            try {
                url = new URL(source).toString();
            }
            catch {
                let path_;
                if (typeof source === "string") {
                    if ((0, _0_deps_js_1.isAbsolute)(source)) {
                        path_ = source;
                    }
                    else {
                        path_ = join(dntShim.Deno.cwd(), source);
                    }
                    url = (0, _0_deps_js_1.toFileUrl)(path_).toString();
                    name = (0, _0_deps_js_1.basename)(path_);
                }
                else {
                    (0, _0_deps_js_1.unreachable)();
                }
            }
            const response = await fetch(url);
            if (response.body === null) {
                throw new _0_errors_js_1.InputError("Invalid response");
            }
            if (name === "file") {
                const contentType = response.headers.get("content-type")?.split(";")[0].trim();
                if (contentType) {
                    name += (0, _0_deps_js_1.extension)(contentType);
                }
                else {
                    const maybeFileName = new URL(response.url).pathname.split("/")
                        .filter((v) => v)
                        .slice(-1)[0]
                        .trim();
                    if (maybeFileName) {
                        name += (0, _0_deps_js_1.extension)((0, _0_deps_js_1.extname)(maybeFileName));
                    }
                }
            }
            const contentLength = Number(response.headers.get("content-length"));
            if (!isNaN(contentLength)) {
                size = contentLength;
            }
            if (allowStream) {
                contents = response.body;
            }
            else {
                contents = new Uint8Array(await response.arrayBuffer());
            }
        }
        return { size: params?.fileSize ? params.fileSize : size, name, contents };
    }
    async *downloadInner(location, dcId, params) {
        const signal = params?.signal;
        signal?.throwIfAborted();
        const id = "id" in location ? location.id : "photo_id" in location ? location.photo_id : null;
        if (id !== null && this.#c.storage.supportsFiles) {
            const file = await this.#c.storage.getFile(id);
            const partOffset = file === null ? 0 : params?.offset ? Math.ceil(10 / file[1]) - 1 : 0;
            if (file !== null && file[0] > 0) {
                yield* this.#c.storage.iterFileParts(id, file[0], partOffset, signal);
                return;
            }
        }
        const chunkSize = params?.chunkSize ?? _4_constants_js_1.DOWNLOAD_MAX_CHUNK_SIZE;
        _a.validateChunkSize(chunkSize, _4_constants_js_1.DOWNLOAD_MAX_CHUNK_SIZE);
        if (params?.offset !== undefined) {
            _a.validateOffset(params.offset);
        }
        const dc = (0, _3_transport_js_1.getDc)(dcId);
        signal?.throwIfAborted();
        const limit = chunkSize;
        let offset = params?.offset ? BigInt(params.offset) : 0n;
        let part = 0;
        let ms = 0.05;
        while (true) {
            signal?.throwIfAborted();
            let retryIn = 1;
            let errorCount = 0;
            try {
                const file = await this.#c.invoke({ _: "upload.getFile", location, offset, limit }, { dc, type: "download" });
                signal?.throwIfAborted();
                if (_2_tl_js_1.Api.is("upload.file", file)) {
                    yield file.bytes;
                    if (id !== null) {
                        await this.#c.storage.saveFilePart(id, part, file.bytes);
                        signal?.throwIfAborted();
                    }
                    ++part;
                    if (file.bytes.length < limit) {
                        if (id !== null) {
                            await this.#c.storage.setFilePartCount(id, part + 1, chunkSize);
                            signal?.throwIfAborted();
                        }
                        break;
                    }
                    else {
                        offset += BigInt(file.bytes.length);
                    }
                }
                else {
                    (0, _0_deps_js_1.unreachable)();
                }
                await (0, _0_deps_js_1.delay)(ms);
                ms = Math.max(ms * .8, 0.003);
            }
            catch (err) {
                if (typeof err === "object" && err instanceof _0_deps_js_1.AssertionError) {
                    throw err;
                }
                ++errorCount;
                if (errorCount > 20) {
                    retryIn = 0;
                    errorCount = 0;
                }
                await this.#handleError(err, retryIn, `[${id}-${part + 1}]`);
                signal?.throwIfAborted();
                retryIn += 2;
                if (retryIn > 11) {
                    retryIn = 11;
                }
            }
        }
    }
    static validateChunkSize(chunkSize, max) {
        if (chunkSize <= 0) {
            throw new _0_errors_js_1.InputError("chunkSize must be bigger than zero.");
        }
        if (chunkSize % 1 !== 0) {
            throw new _0_errors_js_1.InputError("chunkSize must be a whole number.");
        }
        if (chunkSize > max) {
            throw new _0_errors_js_1.InputError("chunkSize is too big.");
        }
        if ((0, _1_utilities_js_1.mod)(chunkSize, 1024) !== 0) {
            throw new _0_errors_js_1.InputError("chunkSize must be divisible by 1024.");
        }
    }
    static validateOffset(offset) {
        if (offset < 0) {
            throw new _0_errors_js_1.InputError("offset must not be smaller than zero.");
        }
        if (offset % 1 !== 0) {
            throw new _0_errors_js_1.InputError("offset must be a whole number.");
        }
        if ((0, _1_utilities_js_1.mod)(offset, 1024) !== 0) {
            throw new _0_errors_js_1.InputError("offset must be divisible by 1024.");
        }
    }
    async *download(fileId, params) {
        const fileId_ = (0, _3_types_js_1.deserializeFileId)(fileId);
        if (fileId_.location.type === "photo") {
            switch (fileId_.type) {
                case _3_types_js_1.FileType.ProfilePhoto: {
                    if (fileId_.location.source.type !== _3_types_js_1.PhotoSourceType.ChatPhotoBig && fileId_.location.source.type !== _3_types_js_1.PhotoSourceType.ChatPhotoSmall) {
                        (0, _0_deps_js_1.unreachable)();
                    }
                    const big = fileId_.location.source.type === _3_types_js_1.PhotoSourceType.ChatPhotoBig;
                    const peer = await this.#c.getInputPeer(Number(fileId_.location.source.chatId));
                    const location = { _: "inputPeerPhotoFileLocation", big: big ? true : undefined, peer, photo_id: fileId_.location.id };
                    yield* this.downloadInner(location, fileId_.dcId, params);
                    break;
                }
                case _3_types_js_1.FileType.Photo: {
                    let location;
                    if (fileId_.location.source.type === _3_types_js_1.PhotoSourceType.StickerSetThumbnailVersion) {
                        location = {
                            _: "inputStickerSetThumb",
                            stickerset: {
                                _: "inputStickerSetID",
                                id: fileId_.location.source.stickerSetId,
                                access_hash: fileId_.location.source.stickerSetAccessHash,
                            },
                            thumb_version: fileId_.location.source.version,
                        };
                    }
                    else {
                        location = {
                            _: "inputPhotoFileLocation",
                            id: fileId_.location.id,
                            access_hash: fileId_.location.accessHash,
                            file_reference: fileId_.fileReference ?? new Uint8Array(),
                            thumb_size: "thumbnailType" in fileId_.location.source ? String.fromCharCode(fileId_.location.source.thumbnailType) : "",
                        };
                    }
                    yield* this.downloadInner(location, fileId_.dcId, params);
                    break;
                }
                case _3_types_js_1.FileType.Thumbnail: {
                    const location = {
                        _: "inputDocumentFileLocation",
                        id: fileId_.location.id,
                        access_hash: fileId_.location.accessHash,
                        file_reference: fileId_.fileReference ?? new Uint8Array(),
                        thumb_size: "thumbnailType" in fileId_.location.source ? String.fromCharCode(fileId_.location.source.thumbnailType) : (0, _0_deps_js_1.unreachable)(),
                    };
                    yield* this.downloadInner(location, fileId_.dcId, params);
                    break;
                }
            }
        }
        else if (fileId_.location.type === "common") {
            const location = {
                _: "inputDocumentFileLocation",
                id: fileId_.location.id,
                access_hash: fileId_.location.accessHash,
                file_reference: fileId_.fileReference ?? new Uint8Array(),
                thumb_size: "",
            };
            yield* this.downloadInner(location, fileId_.dcId, params);
        }
        else {
            (0, _0_deps_js_1.unreachable)();
        }
    }
    async getStickerSetName(inputStickerSet, hash = 0) {
        const maybeStickerSetName = await this.#c.messageStorage.getStickerSetName(inputStickerSet.id, inputStickerSet.access_hash);
        if (maybeStickerSetName !== null && Date.now() - maybeStickerSetName[1].getTime() < _4_constants_js_1.STICKER_SET_NAME_TTL) {
            return maybeStickerSetName[0];
        }
        else {
            try {
                const stickerSet = await this.#c.invoke({ _: "messages.getStickerSet", stickerset: inputStickerSet, hash });
                const name = _2_tl_js_1.Api.as("messages.stickerSet", stickerSet).set.short_name;
                await this.#c.messageStorage.updateStickerSetName(inputStickerSet.id, inputStickerSet.access_hash, name);
                return name;
            }
            catch (err) {
                if (err instanceof _4_errors_js_1.StickersetInvalid) {
                    return undefined;
                }
                else {
                    throw err;
                }
            }
        }
    }
    static #CUSTOM_EMOJI_TTL = 30 * _0_deps_js_1.MINUTE;
    async getCustomEmojiStickers(id) {
        id = Array.isArray(id) ? id : [id];
        if (!id.length) {
            return [];
        }
        const stickers = new Array();
        let shouldFetch = false;
        for (const id_ of id) {
            const maybeDocument = await this.#c.messageStorage.getCustomEmojiDocument(BigInt(id_));
            if (maybeDocument !== null && Date.now() - maybeDocument[1].getTime() <= _a.#CUSTOM_EMOJI_TTL) {
                const document_ = maybeDocument[0];
                const fileId_ = {
                    type: _3_types_js_1.FileType.Document,
                    dcId: document_.dc_id,
                    fileReference: document_.file_reference,
                    location: { type: "common", id: document_.id, accessHash: document_.access_hash },
                };
                const fileUniqueId = (0, _3_types_js_1.toUniqueFileId)(fileId_);
                const fileId = (0, _3_types_js_1.serializeFileId)(fileId_);
                const sticker = await (0, _3_types_js_1.constructSticker)(document_, fileId, fileUniqueId, this.getStickerSetName.bind(this), id_);
                stickers.push(sticker);
            }
            else {
                shouldFetch = true;
                break;
            }
        }
        if (!shouldFetch) {
            return stickers;
        }
        const documents_ = (await this.#c.invoke({ _: "messages.getCustomEmojiDocuments", document_id: id.map(BigInt) })).map((v) => _2_tl_js_1.Api.as("document", v));
        for (const [i, document_] of documents_.entries()) {
            await this.#c.messageStorage.setCustomEmojiDocument(document_.id, document_);
            const fileId_ = {
                type: _3_types_js_1.FileType.Document,
                dcId: document_.dc_id,
                fileReference: document_.file_reference,
                location: { type: "common", id: document_.id, accessHash: document_.access_hash },
            };
            const fileUniqueId = (0, _3_types_js_1.toUniqueFileId)(fileId_);
            const fileId = (0, _3_types_js_1.serializeFileId)(fileId_);
            const sticker = await (0, _3_types_js_1.constructSticker)(document_, fileId, fileUniqueId, this.getStickerSetName.bind(this), id[i]);
            stickers.push(sticker);
        }
        return stickers;
    }
}
exports.FileManager = FileManager;
_a = FileManager;
