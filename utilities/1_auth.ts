import { assert, assertEquals, concat, ige256Encrypt } from "../0_deps.ts";
import { sha256 } from "./0_hash.ts";
import { intFromBytes, intToBytes, modExp } from "./0_int.ts";

export async function rsaPad(data: Uint8Array, [serverKey, exponent]: [bigint, bigint]) {
  assert(data.length <= 144);

  let keyAesEncryptedInt: bigint;
  let tries = 0;

  do {
    if (++tries === 10) {
      throw new Error("Out of tries");
    }

    const dataWithPadding = concat([data, new Uint8Array(192 - data.length)]);
    const dataPadReversed = new Uint8Array(dataWithPadding).reverse();

    const tempKey = crypto.getRandomValues(new Uint8Array(32));

    const dataWithHash = concat([dataPadReversed, await sha256(concat([tempKey, dataWithPadding]))]);
    const aesEncrypted = ige256Encrypt(dataWithHash, tempKey, new Uint8Array(32));

    const aesEncryptedSha256 = await sha256(aesEncrypted);
    const tempKeyXor = tempKey.map((v, i) => v ^ aesEncryptedSha256[i]);

    const keyAesEncrypted = concat([tempKeyXor, aesEncrypted]);
    assertEquals(keyAesEncrypted.length, 256);

    keyAesEncryptedInt = intFromBytes(keyAesEncrypted, { byteOrder: "big", isSigned: false });
  } while (keyAesEncryptedInt >= serverKey);

  const encryptedDataInt = modExp(keyAesEncryptedInt, exponent, serverKey);
  const encryptedData = intToBytes(encryptedDataInt, 256, { byteOrder: "big", isSigned: false });
  assertEquals(encryptedData.length, 256);

  return encryptedData;
}
