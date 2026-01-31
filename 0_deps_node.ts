import { createHash } from "node:crypto";
import { join, extname, basename, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";
import { Readable } from "node:stream";
import { contentType as contentType_ } from "mime-types";
import { extension as extension_ } from "mime-types";
import { LRUCache } from "lru-cache";

export function assert(condition: unknown, message?: string): asserts condition {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

export function assertFalse(condition: unknown, message?: string): asserts condition is false {
  if (condition) {
    throw new Error(message || "Assertion failed");
  }
}

export function assertEquals<T>(actual: T, expected: T, message?: string): void {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, but got ${actual}`);
  }
}

export function unreachable(message?: string): never {
  throw new Error(message || "Unreachable code executed");
}

export class AssertionError extends Error {
  constructor(message?: string) {
    super(message || "Assertion failed");
    this.name = "AssertionError";
  }
}

export { join, extname, basename, isAbsolute };

export function toFileUrl(path: string): URL {
  if (path.startsWith("file://")) {
    return new URL(path);
  }
  return new URL(`file://${path.replace(/\\/g, "/")}`);
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function* pooledMap<T, R>(
  poolLimit: number,
  iterable: Iterable<T>,
  iteratorFn: (item: T) => Promise<R>
): AsyncGenerator<R, void, unknown> {
  const executing: Promise<void>[] = [];
  const results: Promise<R>[] = [];

  for (const item of iterable) {
    const promise = Promise.resolve(iteratorFn(item));
    results.push(promise);

    const execute = promise.then(() => {
      executing.splice(executing.indexOf(execute), 1);
    });
    executing.push(execute);

    if (executing.length >= poolLimit) {
      await Promise.race(executing);
    }
  }

  for (const result of results) {
    yield await result;
  }
}

export function concat(...arrays: Uint8Array[]): Uint8Array {
  const totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

export class LruCache<K, V> {
  private cache: LRUCache<K, V>;

  constructor(max: number | { max?: number; maxSize?: number; ttl?: number }) {
    let config: any;
    
    if (typeof max === "number") {
      config = { max };
    } else {
      config = {};
      if (max.max !== undefined) {
        config.max = max.max;
      }
      if (max.maxSize !== undefined) {
        config.maxSize = max.maxSize;
      }
      if (max.ttl !== undefined) {
        config.ttl = max.ttl;
      }
      
      if (config.max === undefined && config.maxSize === undefined && config.ttl === undefined) {
        config.max = 1000;
      }
    }
    
    this.cache = new LRUCache<K, V>(config);
  }

  get(key: K): V | undefined {
    return this.cache.get(key);
  }

  set(key: K, value: V): void {
    this.cache.set(key, value);
  }

  delete(key: K): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

export async function* iterateReader(reader: ReadableStream<Uint8Array>): AsyncGenerator<Uint8Array, void, unknown> {
  const reader_ = reader.getReader();
  try {
    while (true) {
      const { done, value } = await reader_.read();
      if (done) break;
      yield value;
    }
  } finally {
    reader_.releaseLock();
  }
}

export function format(date: Date, formatString: string): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return formatString
    .replace("YYYY", String(year))
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
}

export const MINUTE = 60 * 1000;
export const SECOND = 1000;

export async function toArrayBuffer(stream: ReadableStream<Uint8Array>): Promise<ArrayBuffer> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of iterateReader(stream)) {
    chunks.push(chunk);
  }
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result.buffer;
}

export function decodeBase64(input: string): Uint8Array {
  return new Uint8Array(Buffer.from(input, "base64"));
}

export function encodeBase64(input: Uint8Array | ArrayBuffer): string {
  const buffer = input instanceof ArrayBuffer ? new Uint8Array(input) : input;
  return Buffer.from(buffer).toString("base64");
}

export function encodeHex(input: Uint8Array | ArrayBuffer): string {
  const buffer = input instanceof ArrayBuffer ? new Uint8Array(input) : input;
  return Buffer.from(buffer).toString("hex");
}

export const contentType: typeof contentType_ = (extensionOrType) => {
  if (extensionOrType === "tgs") {
    return "application/x-tgsticker";
  } else {
    return contentType_(extensionOrType) || "application/octet-stream";
  }
};

export function extension(mimeType: string): string {
  if (mimeType === "application/x-tgsticker") {
    return "tgs";
  } else {
    return extension_(mimeType) || "unknown";
  }
}

import { createCipheriv, createDecipheriv } from "node:crypto";

let tgCryptoInitialized = false;

export async function initTgCrypto(): Promise<void> {
  tgCryptoInitialized = true;
}

function ige256EncryptInternal(data: Uint8Array, key: Uint8Array, iv: Uint8Array): Uint8Array {
  const cipher = createCipheriv("aes-256-cbc", key, iv);
  cipher.setAutoPadding(false);
  
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
  return new Uint8Array(encrypted);
}

function ige256DecryptInternal(data: Uint8Array, key: Uint8Array, iv: Uint8Array): Uint8Array {
  const decipher = createDecipheriv("aes-256-cbc", key, iv);
  decipher.setAutoPadding(false);
  
  const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
  return new Uint8Array(decrypted);
}

export function ige256Encrypt(data: Uint8Array, key: Uint8Array, iv: Uint8Array): Uint8Array {
  if (!tgCryptoInitialized) {
    initTgCrypto();
  }
  
  const result = new Uint8Array(data.length);
  const prevCiphertext = new Uint8Array(iv);
  const prevPlaintext = new Uint8Array(data);
  
  for (let i = 0; i < data.length; i += 16) {
    const block = data.slice(i, i + 16);
    const xorBlock = new Uint8Array(16);
    for (let j = 0; j < 16; j++) {
      xorBlock[j] = block[j] ^ prevCiphertext[j];
    }
    
    const encrypted = ige256EncryptInternal(xorBlock, key, iv);
    for (let j = 0; j < 16; j++) {
      result[i + j] = encrypted[j] ^ prevPlaintext[j];
      prevCiphertext[j] = result[i + j];
      prevPlaintext[j] = block[j];
    }
  }
  
  return result;
}

export function ige256Decrypt(data: Uint8Array, key: Uint8Array, iv: Uint8Array): Uint8Array {
  if (!tgCryptoInitialized) {
    initTgCrypto();
  }
  
  const result = new Uint8Array(data.length);
  const prevCiphertext = new Uint8Array(iv);
  const prevDecrypted = new Uint8Array(data.length);
  
  for (let i = 0; i < data.length; i += 16) {
    const block = data.slice(i, i + 16);
    const xorBlock = new Uint8Array(16);
    for (let j = 0; j < 16; j++) {
      xorBlock[j] = block[j] ^ prevDecrypted[j];
    }
    
    const decrypted = ige256DecryptInternal(xorBlock, key, iv);
    for (let j = 0; j < 16; j++) {
      result[i + j] = decrypted[j] ^ prevCiphertext[j];
      prevCiphertext[j] = block[j];
      prevDecrypted[j] = result[i + j];
    }
  }
  
  return result;
}
