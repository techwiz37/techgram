const encoder = new TextEncoder();
const decoder = new TextDecoder();
export function encodeText(decoded) {
    return encoder.encode(decoded);
}
export function decodeText(encoded) {
    return decoder.decode(encoded);
}
