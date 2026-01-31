"use strict";
// deno-lint-ignore-file no-explicit-any
Object.defineProperty(exports, "__esModule", { value: true });
exports.TLWriter = void 0;
const _0_deps_js_1 = require("../0_deps.js");
const _0_errors_js_1 = require("../0_errors.js");
const _0_utilities_js_1 = require("./0_utilities.js");
const _0_int_js_1 = require("../utilities/0_int.js");
const _1_utilities_js_1 = require("../1_utilities.js");
class TLWriter {
    _buffer = new Uint8Array();
    #path = new Array();
    constructor() {
    }
    get buffer() {
        return this._buffer;
    }
    write(buffer) {
        this._buffer = (0, _0_deps_js_1.concat)([this._buffer, buffer]);
        return this;
    }
    writeInt24(int, isSigned = true) {
        this.write((0, _0_int_js_1.intToBytes)(int, 24 / 8, { isSigned, path: this.#path }));
        return this;
    }
    writeInt32(int, isSigned = true) {
        this.write((0, _0_int_js_1.intToBytes)(int, 32 / 8, { isSigned, path: this.#path }));
        return this;
    }
    writeInt64(int, isSigned = true) {
        this.write((0, _0_int_js_1.intToBytes)(int, 64 / 8, { isSigned, path: this.#path }));
        return this;
    }
    writeDouble(double) {
        const buffer = new Uint8Array(8);
        new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength).setFloat64(0, double, true);
        this.write(buffer);
        return this;
    }
    writeInt128(int, isSigned = true) {
        this.write((0, _0_int_js_1.intToBytes)(int, 128 / 8, { isSigned, path: this.#path }));
        return this;
    }
    writeInt256(int, isSigned = true) {
        this.write((0, _0_int_js_1.intToBytes)(int, 256 / 8, { isSigned, path: this.#path }));
        return this;
    }
    writeBytes(bytes) {
        let padding;
        if (bytes.length > 253) {
            this.write(new Uint8Array([254]));
            this.writeInt24(bytes.length);
            padding = bytes.length % 4;
        }
        else {
            this.write(new Uint8Array([bytes.length]));
            padding = (bytes.length + 1) % 4;
        }
        this.write(bytes);
        if (padding > 0) {
            padding = 4 - padding;
            this.write(new Uint8Array(padding));
        }
        return this;
    }
    writeString(string) {
        this.writeBytes((0, _1_utilities_js_1.encodeText)(string));
        return this;
    }
    writeObject(value, schema) {
        this.#serialize(value._, value, schema);
        return this;
    }
    #serialize(type, value, schema) {
        if (this.#serializePrimitive(type, value)) {
            return;
        }
        if (this.#serializeVector(type, value, schema)) {
            return;
        }
        const maybeDefinition = schema.definitions[value._];
        if (!maybeDefinition) {
            throw new _0_errors_js_1.TLError(`Unknown constructor: ${value._}`, this.#path);
        }
        if (type !== "!X" && !this.#isTypeValid(type, value, schema)) {
            throw new _0_errors_js_1.TLError(`Expected ${type} but instead got ${value._}`, this.#path);
        }
        const type__ = value;
        const [id, parameters_] = maybeDefinition;
        this.writeInt32(id, false);
        let isFirstPathElementExisting = false;
        for (let [name, type] of parameters_.values()) {
            if ((0, _0_utilities_js_1.isOptionalParam)(type) && type__[name] === undefined) {
                continue;
            }
            if (type === "#") {
                let flags = 0;
                const flagField_ = name;
                for (const [name, type] of parameters_) {
                    if ((0, _0_utilities_js_1.isOptionalParam)(type)) {
                        const { flagField, bitIndex } = (0, _0_utilities_js_1.analyzeOptionalParam)(type);
                        if (flagField === flagField_) {
                            if (type__[name] !== undefined) {
                                flags |= 1 << bitIndex;
                            }
                        }
                    }
                }
                this.writeInt32(flags);
                continue;
            }
            const pathElement = `[${value._}.]${name}`;
            if (isFirstPathElementExisting) {
                this.#path[this.#path.length - 1] = pathElement;
            }
            else {
                this.#path.push(pathElement);
                isFirstPathElementExisting = true;
            }
            if (type__[name] === undefined && !(0, _0_utilities_js_1.isOptionalParam)(type)) {
                throw new _0_errors_js_1.TLError("Missing required field", this.#path);
            }
            if ((0, _0_utilities_js_1.isOptionalParam)(type)) {
                type = (0, _0_utilities_js_1.getOptionalParamInnerType)(type);
            }
            this.#serialize(type, type__[name], schema);
        }
        return;
    }
    #serializeVector(type, value, schema) {
        const itemType = (0, _0_utilities_js_1.getVectorItemType)(type);
        if (!itemType) {
            return false;
        }
        if (!Array.isArray(value)) {
            throw new _0_errors_js_1.TLError(`Expected an array but received ${(0, _0_utilities_js_1.repr)(value)}`, this.#path);
        }
        this.writeInt32(_0_utilities_js_1.VECTOR, false);
        this.writeInt32(value.length);
        for (const item of value) {
            this.#serialize(itemType, item, schema);
        }
        return true;
    }
    #serializePrimitive(type, value) {
        const valueRepr = (0, _0_utilities_js_1.repr)(value);
        switch (type) {
            case "bytes":
                if ((value instanceof Uint8Array)) {
                    this.writeBytes(value);
                }
                else {
                    throw new _0_errors_js_1.TLError(`Expected Uint8Array but received ${valueRepr}`, this.#path);
                }
                return true;
            case "int128":
                if (typeof value === "bigint") {
                    this.writeInt128(value);
                }
                else {
                    throw new _0_errors_js_1.TLError(`Expected bigint but received ${valueRepr}`, this.#path);
                }
                return true;
            case "int256":
                if (typeof value === "bigint") {
                    this.writeInt256(value);
                }
                else {
                    throw new _0_errors_js_1.TLError(`Expected bigint but received ${valueRepr}`, this.#path);
                }
                return true;
            case "long":
                if (typeof value === "bigint") {
                    this.writeInt64(value);
                }
                else {
                    throw new _0_errors_js_1.TLError(`Expected bigint but received ${valueRepr}`, this.#path);
                }
                return true;
            case "Bool":
                if (typeof value === "boolean") {
                    if (value) {
                        this.writeInt32(_0_utilities_js_1.BOOL_TRUE);
                    }
                    else {
                        this.writeInt32(_0_utilities_js_1.BOOL_FALSE);
                    }
                }
                else {
                    throw new _0_errors_js_1.TLError(`Expected boolean but received ${valueRepr}`, this.#path);
                }
                return true;
            case "int":
                if (value === null) {
                    value = 0;
                }
                if (typeof value === "number") {
                    if (value % 1 === 0) {
                        this.writeInt32(value);
                    }
                    else {
                        throw new _0_errors_js_1.TLError("Expected an integer value but received a floating point", this.#path);
                    }
                }
                else {
                    throw new _0_errors_js_1.TLError(`Expected number but received ${valueRepr}`, this.#path);
                }
                return true;
            case "double":
                if (value === null) {
                    value = 0;
                }
                if (typeof value === "number") {
                    this.writeDouble(value);
                }
                else {
                    throw new _0_errors_js_1.TLError(`Expected number but received ${valueRepr}`, this.#path);
                }
                return true;
            case "string":
                if (typeof value === "string") {
                    this.writeString(value);
                }
                else if (value instanceof Uint8Array) {
                    this.writeBytes(value);
                }
                else {
                    this.writeString("");
                }
                return true;
            case "true":
                if (value !== true) {
                    throw new _0_errors_js_1.TLError(`Expected \`true\` but received ${valueRepr}`, this.#path);
                }
                return true;
            default:
                return false;
        }
    }
    #isTypeValid(type, value, schema) {
        if (type === value._) {
            return true;
        }
        return schema.definitions[value._]?.[2] === type;
    }
}
exports.TLWriter = TLWriter;
