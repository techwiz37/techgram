"use strict";
// deno-lint-ignore-file no-explicit-any
Object.defineProperty(exports, "__esModule", { value: true });
exports.TLReader = void 0;
const _1_utilities_js_1 = require("../1_utilities.js");
const _0_errors_js_1 = require("../0_errors.js");
const _0_utilities_js_1 = require("./0_utilities.js");
class TLReader {
    _buffer;
    #path = new Array();
    constructor(_buffer) {
        this._buffer = _buffer;
    }
    get buffer() {
        return this._buffer;
    }
    read(byteCount) {
        if (this._buffer.byteLength < byteCount) {
            throw new _0_errors_js_1.TLError("No data remaining", this.#path);
        }
        const buffer = this._buffer.slice(0, byteCount);
        this._buffer = this._buffer.subarray(byteCount);
        return buffer;
    }
    unread(count) {
        const newOffest = this._buffer.byteOffset - count;
        if (newOffest < 0) {
            throw new _0_errors_js_1.TLError("No data has been read", this.#path);
        }
        this._buffer = new Uint8Array(this._buffer.buffer, newOffest);
    }
    readInt24(isSigned = true) {
        const buffer = this.read(24 / 8);
        return Number((0, _1_utilities_js_1.intFromBytes)(buffer, { isSigned }));
    }
    readInt32(isSigned = true) {
        const buffer = this.read(32 / 8);
        return Number((0, _1_utilities_js_1.intFromBytes)(buffer, { isSigned }));
    }
    unreadInt32() {
        this.unread(32 / 8);
    }
    readInt64(isSigned = true) {
        const buffer = this.read(64 / 8);
        return (0, _1_utilities_js_1.intFromBytes)(buffer, { isSigned });
    }
    readDouble() {
        const buffer = this.read(8);
        return new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength).getFloat64(0, true);
    }
    readInt128(isSigned = true) {
        const buffer = this.read(128 / 8);
        return (0, _1_utilities_js_1.intFromBytes)(buffer, { isSigned });
    }
    readInt256(isSigned = true) {
        const buffer = this.read(256 / 8);
        return (0, _1_utilities_js_1.intFromBytes)(buffer, { isSigned });
    }
    readBytes() {
        let L = this.read(1)[0];
        let padding;
        if (L > 253) {
            L = this.readInt24();
            padding = L % 4;
        }
        else {
            padding = (L + 1) % 4;
        }
        const bytes = this.read(L);
        if (padding > 0) {
            padding = 4 - padding;
            this.read(padding);
        }
        return bytes;
    }
    readString() {
        return (0, _1_utilities_js_1.decodeText)(this.readBytes());
    }
    async readType(name, schema) {
        if ((0, _0_utilities_js_1.isOptionalParam)(name)) {
            name = (0, _0_utilities_js_1.getOptionalParamInnerType)(name);
        }
        const primitive = this.#deserializePrimitive(name);
        if (primitive !== undefined) {
            return primitive;
        }
        const id = this.readInt32(false);
        if (name === _0_utilities_js_1.X) {
            const typeName = schema.identifierToName[id];
            if (!typeName) {
                throw new _0_errors_js_1.TLError(`Unknown constructor ID: ${(0, _0_utilities_js_1.constructorIdToHex)(id)}`, this.#path);
            }
            this.unreadInt32();
            return await this.readType(typeName, schema);
        }
        if (id === _0_utilities_js_1.VECTOR) {
            return await this.#deserializeVector(name, schema);
        }
        const definition = schema.definitions[name];
        if (definition) {
            return await this.#deserializeType(name, definition, id, schema);
        }
        const deserializedEnum = await this.#deserializeEnum(name, id, schema);
        if (deserializedEnum !== undefined) {
            return deserializedEnum;
        }
        throw new _0_errors_js_1.TLError(`Unknown type: ${name}#${(0, _0_utilities_js_1.constructorIdToHex)(id)}`, this.#path);
    }
    async #deserializeEnum(type, id, schema) {
        const name = schema.identifierToName[id];
        if (!name) {
            return;
        }
        const definition = schema.definitions[name];
        if (definition[2] !== type) {
            return;
        }
        return await this.#deserializeType(name, definition, id, schema);
    }
    async #deserializeType(type, desc, id, schema) {
        if (desc[0] !== id) {
            throw new _0_errors_js_1.TLError(`Expected constructor with ID ${(0, _0_utilities_js_1.constructorIdToHex)(desc[0])} but received ${(0, _0_utilities_js_1.constructorIdToHex)(id)}`, this.#path);
        }
        let isFirstPathElementExisting = false;
        const type_ = { _: type };
        const flagFields = {};
        for (const [name, fieldType] of desc[1]) {
            if ((0, _0_utilities_js_1.isOptionalParam)(fieldType)) {
                const { flagField, bitIndex } = (0, _0_utilities_js_1.analyzeOptionalParam)(fieldType);
                const bits = flagFields[flagField];
                if ((bits & (1 << bitIndex)) === 0) {
                    continue;
                }
            }
            if (fieldType === "#") {
                flagFields[name] = this.readInt32();
                continue;
            }
            const pathElement = `[${type}.]${name}`;
            if (isFirstPathElementExisting) {
                this.#path[this.#path.length - 1] = pathElement;
            }
            else {
                this.#path.push(pathElement);
                isFirstPathElementExisting = true;
            }
            const value = await this.readType(fieldType, schema);
            if (typeof value !== "boolean" || value) {
                type_[name] = value;
            }
        }
        return type_;
    }
    async #deserializeVector(type, schema) {
        const itemType = (0, _0_utilities_js_1.getVectorItemType)(type);
        if (!itemType) {
            throw new _0_errors_js_1.TLError(`Expected Vector but received ${type}`, this.#path);
        }
        const size = this.readInt32();
        const array = new Array();
        for (let i = 0; i < size; ++i) {
            array.push(await this.readType(itemType, schema));
        }
        return array;
    }
    #deserializePrimitive(type) {
        switch (type) {
            case "bytes":
                return this.readBytes();
            case "int128":
                return this.readInt128();
            case "int256":
                return this.readInt256();
            case "double":
                return this.readDouble();
            case "long":
                return this.readInt64();
            case "true":
                return true;
            case "int":
                return this.readInt32();
            case "Bool": {
                const id = this.readInt32(false);
                if (id === _0_utilities_js_1.BOOL_TRUE) {
                    return true;
                }
                else if (id === _0_utilities_js_1.BOOL_FALSE) {
                    return false;
                }
                else {
                    throw new _0_errors_js_1.TLError(`Expected boolTrue or boolFalse but received ${(0, _0_utilities_js_1.constructorIdToHex)(id)}`, this.#path);
                }
            }
            case "string":
                return this.readString();
        }
    }
}
exports.TLReader = TLReader;
