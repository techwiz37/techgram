import * as dntShim from "../_dnt.shims.js";
import { pooledMap, SECOND, unreachable } from "../0_deps.js";
export function drop(maybePromise) {
    if (maybePromise !== undefined && maybePromise !== null && typeof maybePromise === "object" && maybePromise instanceof Promise) {
        maybePromise.catch(() => { });
    }
}
export function mustPrompt(message) {
    const result = dntShim.prompt(message);
    if (result === null) {
        throw unreachable();
    }
    else {
        return result;
    }
}
export function mustPromptNumber(message) {
    let result = Number(BigInt(mustPrompt(message)));
    while (isNaN(result)) {
        console.log("Expected a number.");
        result = Number(BigInt(mustPrompt(message)));
    }
    return result;
}
export function mustPromptOneOf(message, choices) {
    let result = dntShim.prompt(message);
    while (result === null || !choices.includes(result)) {
        result = dntShim.prompt(message);
    }
    return result;
}
export const ZERO_CHANNEL_ID = -1000000000000;
export function toUnixTimestamp(date) {
    return Math.floor(date.getTime() / SECOND);
}
export function fromUnixTimestamp(date) {
    return new Date(date * SECOND);
}
export async function* iterateReadableStream(stream) {
    const reader = stream.getReader();
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done)
                return;
            yield value;
        }
    }
    finally {
        reader.releaseLock();
    }
}
export async function awaitablePooledMap(poolLimit, array, iteratorFn) {
    const iterable = pooledMap(poolLimit, array, iteratorFn);
    if (Array.fromAsync !== undefined) {
        return await Array.fromAsync(iterable);
    }
    else {
        const values = new Array();
        for await (const value of iterable) {
            values.push(value);
        }
        return values;
    }
}
