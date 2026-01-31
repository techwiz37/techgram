// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
const REMOVED = 1;
const COMMON = 2;
const ADDED = 3;
export function createCommon(A, B) {
    const common = [];
    if (A.length === 0 || B.length === 0)
        return [];
    for (let i = 0; i < Math.min(A.length, B.length); i += 1) {
        const a = A[i];
        const b = B[i];
        if (a !== undefined && a === b) {
            common.push(a);
        }
        else {
            return common;
        }
    }
    return common;
}
export function assertFp(value) {
    if (value == null ||
        typeof value !== "object" ||
        typeof value?.y !== "number" ||
        typeof value?.id !== "number") {
        throw new Error(`Unexpected value, expected 'FarthestPoint': received ${typeof value}`);
    }
}
export function backTrace(A, B, current, swapped, routes, diffTypesPtrOffset) {
    const M = A.length;
    const N = B.length;
    const result = [];
    let a = M - 1;
    let b = N - 1;
    let j = routes[current.id];
    let type = routes[current.id + diffTypesPtrOffset];
    while (true) {
        if (!j && !type)
            break;
        const prev = j;
        if (type === REMOVED) {
            result.unshift({
                type: swapped ? "removed" : "added",
                value: B[b],
            });
            b -= 1;
        }
        else if (type === ADDED) {
            result.unshift({
                type: swapped ? "added" : "removed",
                value: A[a],
            });
            a -= 1;
        }
        else {
            result.unshift({ type: "common", value: A[a] });
            a -= 1;
            b -= 1;
        }
        j = routes[prev];
        type = routes[prev + diffTypesPtrOffset];
    }
    return result;
}
export function createFp(k, M, routes, diffTypesPtrOffset, ptr, slide, down) {
    if (slide && slide.y === -1 && down && down.y === -1) {
        return { y: 0, id: 0 };
    }
    const isAdding = (down?.y === -1) ||
        k === M ||
        (slide?.y ?? 0) > (down?.y ?? 0) + 1;
    if (slide && isAdding) {
        const prev = slide.id;
        ptr++;
        routes[ptr] = prev;
        routes[ptr + diffTypesPtrOffset] = ADDED;
        return { y: slide.y, id: ptr };
    }
    if (down && !isAdding) {
        const prev = down.id;
        ptr++;
        routes[ptr] = prev;
        routes[ptr + diffTypesPtrOffset] = REMOVED;
        return { y: down.y + 1, id: ptr };
    }
    throw new Error("Unexpected missing FarthestPoint");
}
export function diff(A, B) {
    const prefixCommon = createCommon(A, B);
    A = A.slice(prefixCommon.length);
    B = B.slice(prefixCommon.length);
    const swapped = B.length > A.length;
    [A, B] = swapped ? [B, A] : [A, B];
    const M = A.length;
    const N = B.length;
    if (!M && !N && !prefixCommon.length)
        return [];
    if (!N) {
        return [
            ...prefixCommon.map((value) => ({ type: "common", value })),
            ...A.map((value) => ({ type: swapped ? "added" : "removed", value })),
        ];
    }
    const offset = N;
    const delta = M - N;
    const length = M + N + 1;
    const fp = Array.from({ length }, () => ({ y: -1, id: -1 }));
    const routes = new Uint32Array((M * N + length + 1) * 2);
    const diffTypesPtrOffset = routes.length / 2;
    let ptr = 0;
    function snake(k, A, B, slide, down) {
        const M = A.length;
        const N = B.length;
        const fp = createFp(k, M, routes, diffTypesPtrOffset, ptr, slide, down);
        ptr = fp.id;
        while (fp.y + k < M && fp.y < N && A[fp.y + k] === B[fp.y]) {
            const prev = fp.id;
            ptr++;
            fp.id = ptr;
            fp.y += 1;
            routes[ptr] = prev;
            routes[ptr + diffTypesPtrOffset] = COMMON;
        }
        return fp;
    }
    let currentFp = fp[delta + offset];
    assertFp(currentFp);
    let p = -1;
    while (currentFp.y < N) {
        p = p + 1;
        for (let k = -p; k < delta; ++k) {
            const index = k + offset;
            fp[index] = snake(k, A, B, fp[index - 1], fp[index + 1]);
        }
        for (let k = delta + p; k > delta; --k) {
            const index = k + offset;
            fp[index] = snake(k, A, B, fp[index - 1], fp[index + 1]);
        }
        const index = delta + offset;
        fp[delta + offset] = snake(delta, A, B, fp[index - 1], fp[index + 1]);
        currentFp = fp[delta + offset];
        assertFp(currentFp);
    }
    return [
        ...prefixCommon.map((value) => ({ type: "common", value })),
        ...backTrace(A, B, currentFp, swapped, routes, diffTypesPtrOffset),
    ];
}
