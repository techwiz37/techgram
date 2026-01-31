import { pooledMap, SECOND, unreachable } from "../0_deps.ts";

export function drop(maybePromise: unknown) {
  if (maybePromise !== undefined && maybePromise !== null && typeof maybePromise === "object" && maybePromise instanceof Promise) {
    maybePromise.catch(() => {});
  }
}

export function mustPrompt(message: string) {
  const result = prompt(message);
  if (result === null) {
    throw unreachable();
  } else {
    return result;
  }
}

export function mustPromptNumber(message: string) {
  let result = Number(BigInt(mustPrompt(message)));
  while (isNaN(result)) {

    console.log("Expected a number.");
    result = Number(BigInt(mustPrompt(message)));
  }
  return result;
}

export function mustPromptOneOf<T extends readonly string[]>(message: string, choices: T): T[number] {
  let result = prompt(message);
  while (result === null || !choices.includes(result)) {
    result = prompt(message);
  }
  return result;
}

export const ZERO_CHANNEL_ID = -1000000000000;

export function toUnixTimestamp(date: Date) {
  return Math.floor(date.getTime() / SECOND);
}

export function fromUnixTimestamp(date: number) {
  return new Date(date * SECOND);
}

export async function* iterateReadableStream(stream: ReadableStream) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

export async function awaitablePooledMap<T, R>(
  poolLimit: number,
  array: Iterable<T> | AsyncIterable<T>,
  iteratorFn: (data: T) => Promise<R>,
) {
  const iterable = pooledMap(poolLimit, array, iteratorFn);
  if (Array.fromAsync !== undefined) {
    return await Array.fromAsync(iterable);
  } else {
    const values = new Array<R>();
    for await (const value of iterable) {
      values.push(value);
    }
    return values;
  }
}
