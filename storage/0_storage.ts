import type { MaybePromise } from "../1_utilities.ts";

export type StorageKeyPart = string | number | bigint;

export type GetManyFilter = { prefix: readonly StorageKeyPart[] } | { start: readonly StorageKeyPart[]; end: readonly StorageKeyPart[] };

export interface Storage {
  initialize(): MaybePromise<void>;
  set(key: readonly StorageKeyPart[], value: unknown): MaybePromise<void>;
  incr(key: readonly StorageKeyPart[], by: number): MaybePromise<void>;
  get<T>(key: readonly StorageKeyPart[]): MaybePromise<T | null>;
  getMany<T>(prefix: GetManyFilter, params?: { limit?: number; reverse?: boolean }): MaybePromise<Generator<[readonly StorageKeyPart[], T]> | AsyncGenerator<[readonly StorageKeyPart[], T]>>;
  branch(id: string): Storage;
  supportsFiles: boolean;
  mustSerialize: boolean;
  isMemory: boolean;
}
