import { TLError } from "../0_errors.ts";

export type ByteOrder = "little" | "big";

export function modExp(
  a: bigint,
  b: bigint,
  n: bigint,
) {
  a %= n;
  let result = 1n;
  let x = a;
  while (b > 0n) {
    const leastSignificantBit = b % 2n;
    b /= 2n;
    if (leastSignificantBit === 1n) {
      result *= x;
      result %= n;
    }
    x *= x;
    x %= n;
  }
  return result;
}

export function mod(n: bigint, m: bigint): bigint;
export function mod(n: number, m: number): number;
export function mod(n: bigint | number, m: bigint | number) {

  return ((n % m) + m) % m;
}

export interface IntFromBytesParams {

  byteOrder?: ByteOrder;

  isSigned?: boolean;
}

export function intFromBytes(bytes: Uint8Array, { byteOrder = "little", isSigned = true }: IntFromBytesParams = {}) {
  const bytesLength = bytes.length;

  if (byteOrder === "little") {
    bytes = bytes.toReversed();
  }

  let bigIntVar = BigInt("0x" + [...bytes].map((v) => v.toString(16).padStart(2, "0")).join(""));

  if (isSigned && Math.floor(bigIntVar.toString(2).length / 8) >= bytesLength) {
    bigIntVar = bigIntVar - (2n ** (BigInt(bytesLength * 8)));
  }

  return bigIntVar;
}

export function getRandomInt(byteLength: number, isSigned = true) {
  const randomBytes = new Uint8Array(byteLength);
  crypto.getRandomValues(randomBytes);
  return intFromBytes(randomBytes, { isSigned });
}

export function getRandomId(isNumber: true): number;
export function getRandomId(): bigint;
export function getRandomId(isNumber?: boolean): bigint | number {
  if (isNumber) {
    return Number(getRandomInt(4, true));
  } else {
    return getRandomInt(8, true);
  }
}

export function gcd(a: bigint, b: bigint) {
  if (a === 0n) {
    return b;
  }

  while ((a & 1n) === 0n) {
    a >>= 1n;
  }

  while (true) {
    if (a > b) {
      a = (a - b) >> 1n;
      while ((a & 1n) === 0n) {
        a >>= 1n;
      }
    } else if (b > a) {
      b = (b - a) >> 1n;
      while ((b & 1n) === 0n) {
        b >>= 1n;
      }
    } else {
      return a;
    }
  }
}

const bufferFromHexString = (hexString: string) => Uint8Array.from(hexString.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));

export interface BufferFromBigintParams {

  byteOrder?: ByteOrder;

  isSigned?: boolean;

  path?: string[];
}

export function intToBytes(int: bigint | number, byteCount: number, {
  byteOrder = "little",
  isSigned = true,
  path = [],
}: BufferFromBigintParams = {}): Uint8Array<ArrayBuffer> {
  const actualByteCount = Math.ceil(int.toString(2).length / 8);
  if (byteCount < actualByteCount) {
    throw new TLError(`The provided integer is too big for int${byteCount * 8}`, path);
  }

  if (byteCount === 4 || byteCount === 2) { 
    const buffer = new Uint8Array(byteCount);
    const dataView = new DataView(buffer.buffer);
    (byteCount === 2 ? isSigned ? dataView.setInt16 : dataView.setUint16 : isSigned ? dataView.setInt32 : dataView.setUint32).call(dataView, 0, Number(int), byteOrder === "little");
    return buffer;
  }

  int = BigInt(typeof int === "number" ? Math.ceil(int) : int);
  if (byteCount === 8) { 
    const buffer = new Uint8Array(byteCount);
    const dataView = new DataView(buffer.buffer);
    (isSigned ? dataView.setBigInt64 : dataView.setBigUint64).call(dataView, 0, int, byteOrder === "little");
    return buffer;
  }
  if (!isSigned && int < 0n) {
    throw new TLError("Received a signed integer while an unsigned one was expected", path);
  }

  if (isSigned && int < 0n) {
    int = 2n ** BigInt(byteCount * 8) + int;
  }

  const hex = int.toString(16).padStart(byteCount * 2, "0");
  const buffer = bufferFromHexString(hex);

  if (byteOrder === "little") {
    buffer.reverse();
  }

  return buffer;
}
